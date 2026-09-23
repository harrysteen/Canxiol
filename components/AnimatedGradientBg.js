'use client';
import { useEffect, useRef } from 'react';

// ── Exact Figma WGSL (WebGPU path) ───────────────────────────────
const WGSL = `
diagnostic(off,derivative_uniformity);
struct Uniforms {
  frameData: vec4f, inputDimsData: vec4f,
  ramp_c0: vec4f, ramp_c1: vec4f, ramp_c2: vec4f, ramp_c3: vec4f,
  ramp_c4: vec4f, ramp_c5: vec4f, ramp_c6: vec4f, ramp_c7: vec4f,
  ramp_pos0: vec4f, ramp_pos1: vec4f, ramp_count: vec4f,
  speed: vec4f, direction: vec4f, distortion: vec4f, patternScale: vec4f,
};
@group(0) @binding(0) var<uniform> u: Uniforms;
struct VsIn { @location(0) pos: vec2f, @location(1) uv: vec2f };
struct VsOut { @builtin(position) position: vec4f, @location(0) uv: vec2f };
fn rampStopPos(i: u32) -> f32 {
  let lane = i & 3u;
  if (i < 4u) { return u.ramp_pos0[lane]; }
  return u.ramp_pos1[lane];
}
fn rampRamp(t: f32) -> vec4f {
  var colors = array<vec4f,8>(u.ramp_c0,u.ramp_c1,u.ramp_c2,u.ramp_c3,
                               u.ramp_c4,u.ramp_c5,u.ramp_c6,u.ramp_c7);
  let n = u32(u.ramp_count.x);
  if (n == 0u) { return vec4f(0.0); }
  if (n == 1u || t <= rampStopPos(0u)) { return colors[0]; }
  let last = n - 1u;
  if (t >= rampStopPos(last)) { return colors[last]; }
  for (var i = 0u; i < last; i = i + 1u) {
    let p1 = rampStopPos(i + 1u);
    if (t <= p1) {
      let p0 = rampStopPos(i);
      return mix(colors[i], colors[i+1u], (t-p0)/max(p1-p0, 1e-5));
    }
  }
  return colors[last];
}
fn m289v3(x: vec3f) -> vec3f { return x - floor(x*(1.0/289.0))*289.0; }
fn m289v2(x: vec2f) -> vec2f { return x - floor(x*(1.0/289.0))*289.0; }
fn perm(x: vec3f) -> vec3f { return m289v3(((x*34.0)+1.0)*x); }
fn snoise(v: vec2f) -> f32 {
  let C = vec4f(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  var i = floor(v + dot(v, C.yy));
  let x0 = v - i + dot(i, C.xx);
  var i1: vec2f;
  if (x0.x > x0.y) { i1 = vec2f(1.0,0.0); } else { i1 = vec2f(0.0,1.0); }
  let x12 = vec4f(x0.x+C.x-i1.x, x0.y+C.x-i1.y, x0.x+C.z, x0.y+C.z);
  i = m289v2(i);
  let p = perm(perm(i.y+vec3f(0.0,i1.y,1.0))+i.x+vec3f(0.0,i1.x,1.0));
  var m = max(vec3f(0.5)-vec3f(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),vec3f(0.0));
  m = m*m; m = m*m;
  let xv = vec3f(2.0*fract(p*C.www)-1.0);
  let h = abs(xv)-0.5; let ox = floor(xv+0.5); let a0 = xv-ox;
  m = m * (1.79284291400159 - 0.85373472095314*(a0*a0+h*h));
  return 130.0*dot(m, vec3f(a0.x*x0.x+h.x*x0.y, a0.y*x12.x+h.y*x12.y, a0.z*x12.z+h.z*x12.w));
}
@vertex fn vs_main(in: VsIn) -> VsOut {
  var out: VsOut; out.position=vec4f(in.pos,0.0,1.0); out.uv=in.uv; return out;
}
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let time = u.frameData.x;
  let inputDims = max(u.inputDimsData.xy, vec2f(1.0));
  let aspect = inputDims.x / max(inputDims.y, 1.0);
  let spd = u.speed.x; let dir_d = u.direction.x; let dist = u.distortion.x; let sc = u.patternScale.x;
  let t = time * spd * 0.001;
  let rad = dir_d * 3.14159265 / 180.0;
  let dir = vec2f(cos(rad), sin(rad));
  let p = uv * vec2f(aspect, 1.0) * sc;
  var grad = dot(p, dir) * 0.5 + 0.5 + t * 0.3;
  let n1 = snoise(p * 1.5 + vec2f(t * 0.7, t * 0.5));
  let n2 = snoise(p * 3.0 + vec2f(-t * 0.3, t * 0.8));
  grad = grad + (n1 * 0.6 + n2 * 0.4) * dist;
  return rampRamp(fract(grad));
}
`;

// ── WebGL2 fallback: GLSL ES 3.0 ─────────────────────────────────
const VERT2 = `#version 300 es
in vec2 a_pos;
in vec2 a_uv;
out vec2 v_uv;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); v_uv = a_uv; }`;

// NOTE: uniform arrays MUST use [0] index when querying getUniformLocation
const FRAG2 = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fc;
uniform float u_time;
uniform float u_speed;
uniform float u_dir;
uniform float u_dist;
uniform float u_scale;
uniform vec2  u_res;
uniform int   u_cnt;
uniform vec4  u_col[8];
uniform float u_pos[8];

vec3 m3(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec2 m2(vec2 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec3 pm(vec3 x){ return m3(((x*34.0)+1.0)*x); }

float sn(vec2 v){
  vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = vec4(x0.x+C.x-i1.x, x0.y+C.x-i1.y, x0.x+C.z, x0.y+C.z);
  i = m2(i);
  vec3 p = pm(pm(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(vec3(0.5) - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), vec3(0.0));
  m = m * m;
  m = m * m;
  vec3 xv = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(xv) - 0.5;
  vec3 a0 = xv - floor(xv + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  return 130.0 * dot(m, vec3(a0.x*x0.x+h.x*x0.y, a0.y*x12.x+h.y*x12.y, a0.z*x12.z+h.z*x12.w));
}

vec4 ramp(float t) {
  if (u_cnt == 0) return vec4(0.0);
  if (u_cnt == 1 || t <= u_pos[0]) return u_col[0];
  int last = u_cnt - 1;
  if (t >= u_pos[last]) return u_col[last];
  for (int i = 0; i < 7; i++) {
    if (i >= last) break;
    float p1 = u_pos[i + 1];
    if (t <= p1) {
      float p0 = u_pos[i];
      return mix(u_col[i], u_col[i+1], (t - p0) / max(p1 - p0, 1e-5));
    }
  }
  return u_col[last];
}

void main(){
  float asp = u_res.x / max(u_res.y, 1.0);
  float t   = u_time * u_speed * 0.001;
  float rad = u_dir * 3.14159265 / 180.0;
  vec2  dir = vec2(cos(rad), sin(rad));
  vec2  p   = v_uv * vec2(asp, 1.0) * u_scale;
  float grad = dot(p, dir) * 0.5 + 0.5 + t * 0.3;
  float n1 = sn(p * 1.5 + vec2(t * 0.7, t * 0.5));
  float n2 = sn(p * 3.0 + vec2(-t * 0.3, t * 0.8));
  grad += (n1 * 0.6 + n2 * 0.4) * u_dist;
  fc = ramp(fract(grad));
}`;

// ── Gradient packing (matches Figma gradientParam layout) ─────────
function packGrad(stops) {
  const out = new Float32Array(44);
  const n   = Math.min(stops.length, 8);
  for (let i = 0; i < n; i++) {
    const { color: c, position: p } = stops[i];
    out[i*4]   = c.r ?? 0;
    out[i*4+1] = c.g ?? 0;
    out[i*4+2] = c.b ?? 0;
    out[i*4+3] = c.a ?? 1;
    out[32+i]  = p   ?? 0;
  }
  out[40] = n;
  return out;
}

const DEF_STOPS = [
  { position: 0.0,  color: { r: 0.969, g: 0.937, b: 0.953, a: 1 } }, // #F7EFF3 (0%)
  { position: 0.33, color: { r: 0.953, g: 0.914, b: 0.937, a: 1 } }, // #F3E9EF (33%)
  { position: 0.66, color: { r: 0.984, g: 0.953, b: 0.973, a: 1 } }, // #FBF3F8 (66%)
  { position: 1.0,  color: { r: 0.949, g: 0.898, b: 0.929, a: 1 } }, // #F2E5ED (100%)
];

export default function AnimatedGradientBg({
  speed      = 0.5,
  direction  = 0,
  distortion = 0.15,
  scale      = 1.5,
  stops      = DEF_STOPS,
}) {
  const ref = useRef(null);
  const raf = useRef(null);
  const t0  = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let live = true;
    let destroy = () => {};

    (async () => {
      // ── WebGPU path (Chrome/Edge 113+) ──────────────────────────
      if (typeof navigator !== 'undefined' && navigator.gpu) {
        try {
          const adapter = await navigator.gpu.requestAdapter();
          if (!adapter) throw new Error('no GPU adapter');
          const device = await adapter.requestDevice();
          const ctx    = canvas.getContext('webgpu');
          const fmt    = navigator.gpu.getPreferredCanvasFormat();
          ctx.configure({ device, format: fmt, alphaMode: 'opaque' });

          const mod  = device.createShaderModule({ code: WGSL });
          const quad = device.createBuffer({ size: 96, usage: GPUBufferUsage.VERTEX, mappedAtCreation: true });
          new Float32Array(quad.getMappedRange()).set([
            -1,-1,0,1,  1,-1,1,1,  -1,1,0,0,
            -1, 1,0,0,  1,-1,1,1,   1,1,1,0,
          ]);
          quad.unmap();
          const uBuf = device.createBuffer({ size: 272, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });

          let pipe = null, pf = null;
          function rsz() { canvas.width=canvas.offsetWidth||1; canvas.height=canvas.offsetHeight||1; }
          rsz();
          const ro = new ResizeObserver(rsz); ro.observe(canvas);

          function frame(ts) {
            if (!live) return;
            if (!t0.current) t0.current = ts;
            const w = canvas.width, h = canvas.height;
            const gd = packGrad(stops);
            const u  = new Float32Array(68);
            u[0] = ts-t0.current; u[1] = w; u[2] = h;
            u[4] = w; u[5] = h;
            for (let i = 0; i < 44; i++) u[8+i] = gd[i];
            u[52]=speed; u[56]=direction; u[60]=distortion; u[64]=scale;
            device.queue.writeBuffer(uBuf, 0, u);

            if (!pipe || pf !== fmt) {
              pipe = device.createRenderPipeline({
                layout: 'auto',
                vertex: {
                  module: mod, entryPoint: 'vs_main',
                  buffers: [{ arrayStride: 16, attributes: [
                    { shaderLocation: 0, format: 'float32x2', offset: 0 },
                    { shaderLocation: 1, format: 'float32x2', offset: 8 },
                  ]}],
                },
                fragment: { module: mod, entryPoint: 'fs_main', targets: [{ format: fmt }] },
                primitive: { topology: 'triangle-list' },
              });
              pf = fmt;
            }
            const bg  = device.createBindGroup({ layout: pipe.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: uBuf } }] });
            const enc = device.createCommandEncoder();
            const pass = enc.beginRenderPass({ colorAttachments: [{ view: ctx.getCurrentTexture().createView(), loadOp: 'clear', clearValue: {r:0,g:0,b:0,a:1}, storeOp: 'store' }] });
            pass.setPipeline(pipe); pass.setBindGroup(0, bg); pass.setVertexBuffer(0, quad); pass.draw(6); pass.end();
            device.queue.submit([enc.finish()]);
            raf.current = requestAnimationFrame(frame);
          }
          raf.current = requestAnimationFrame(frame);
          destroy = () => { live=false; cancelAnimationFrame(raf.current); ro.disconnect(); device.destroy(); };
          return;
        } catch (e) {
          console.warn('WebGPU failed, falling back to WebGL2:', e.message || e);
        }
      }

      // ── WebGL2 path (universal fallback) ────────────────────────
      // KEY: { alpha: false } makes canvas fully opaque — prevents body
      // background from bleeding through transparent canvas pixels.
      const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, premultipliedAlpha: false });
      if (!gl) { console.warn('WebGL2 not supported'); return; }

      // ── Compile shaders with error logging ──────────────────────
      function mkShader(type, src) {
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          console.error('Shader compile error:', gl.getShaderInfoLog(sh));
          gl.deleteShader(sh);
          return null;
        }
        return sh;
      }
      const vs = mkShader(gl.VERTEX_SHADER,   VERT2);
      const fs = mkShader(gl.FRAGMENT_SHADER, FRAG2);
      if (!vs || !fs) return;

      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('GL link error:', gl.getProgramInfoLog(prog));
        return;
      }
      gl.useProgram(prog);

      // ── Vertex buffer ────────────────────────────────────────────
      const vb = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vb);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1,-1, 0,1,   1,-1, 1,1,   -1,1, 0,0,
        -1, 1, 0,0,   1,-1, 1,1,    1,1, 1,0,
      ]), gl.STATIC_DRAW);
      const ap = gl.getAttribLocation(prog, 'a_pos');
      gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 16, 0);
      const au = gl.getAttribLocation(prog, 'a_uv');
      gl.enableVertexAttribArray(au);  gl.vertexAttribPointer(au, 2, gl.FLOAT, false, 16, 8);

      // ── Uniform locations ────────────────────────────────────────
      // CRITICAL: Array uniforms need explicit [0] index for getUniformLocation
      // to work reliably across all WebGL2 implementations.
      const L = {
        time: gl.getUniformLocation(prog, 'u_time'),
        res:  gl.getUniformLocation(prog, 'u_res'),
        spd:  gl.getUniformLocation(prog, 'u_speed'),
        dir:  gl.getUniformLocation(prog, 'u_dir'),
        dist: gl.getUniformLocation(prog, 'u_dist'),
        scl:  gl.getUniformLocation(prog, 'u_scale'),
        cnt:  gl.getUniformLocation(prog, 'u_cnt'),
        col:  gl.getUniformLocation(prog, 'u_col[0]'),   // explicit [0]
        pos:  gl.getUniformLocation(prog, 'u_pos[0]'),   // explicit [0]
      };

      // ── Resize handler ───────────────────────────────────────────
      function rsz() {
        canvas.width  = canvas.offsetWidth  || 1;
        canvas.height = canvas.offsetHeight || 1;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      rsz();
      const ro = new ResizeObserver(rsz); ro.observe(canvas);

      // ── Render loop ──────────────────────────────────────────────
      gl.clearColor(0, 0, 0, 1); // opaque black clear (hidden by shader)

      function frame(ts) {
        if (!live) return;
        if (!t0.current) t0.current = ts;
        const timeMs = ts - t0.current;

        gl.clear(gl.COLOR_BUFFER_BIT);

        // Scalar uniforms
        gl.uniform1f(L.time, timeMs);
        gl.uniform2f(L.res,  canvas.width, canvas.height);
        gl.uniform1f(L.spd,  speed);
        gl.uniform1f(L.dir,  direction);
        gl.uniform1f(L.dist, distortion);
        gl.uniform1f(L.scl,  scale);
        gl.uniform1i(L.cnt,  stops.length);

        // Pack color and position arrays
        const cd = new Float32Array(32);
        const pd = new Float32Array(8);
        stops.forEach((s, i) => {
          cd[i*4]   = s.color.r ?? 0;
          cd[i*4+1] = s.color.g ?? 0;
          cd[i*4+2] = s.color.b ?? 0;
          cd[i*4+3] = s.color.a ?? 1;
          pd[i]     = s.position ?? 0;
        });
        gl.uniform4fv(L.col, cd); // sets u_col[0] through u_col[n-1]
        gl.uniform1fv(L.pos, pd); // sets u_pos[0] through u_pos[n-1]

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        raf.current = requestAnimationFrame(frame);
      }
      raf.current = requestAnimationFrame(frame);
      destroy = () => { live=false; cancelAnimationFrame(raf.current); ro.disconnect(); };
    })();

    return () => destroy();
  }, [speed, direction, distortion, scale, stops]);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}