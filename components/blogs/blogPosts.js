// Shared blog data — used by the home page blog section, the /blogs page
// and the individual article pages at /blogs/[slug].
//
// `content` is a list of blocks rendered by BlogArticle:
//   { type: 'p',  text, strong?, gap? } paragraph; `strong` is a bold lead-in before `text`,
//                                   `gap` adds space after it
//   { type: 'h2', text }            section heading
//   { type: 'ul', items: [...] }    bullet list; an item is a string or { strong, text }
//   { type: 'callout', lines: [...] } bold closing statement
//   { type: 'callout', groups: [[...], [...]] } bold closing statement in spaced groups of lines
// Optional: `articleTitle` overrides `title` on the article page,
// `spacedParagraphs` adds a gap between paragraphs.
// Posts without `content` are listed but don't link to an article page yet.
export const blogPosts = [
  {
    id: 1,
    slug: 'student-anxiety-can-hide-behind-a-life-that-looks-fine',
    image: '/images/blog_img_1.png',
    title: 'Student anxiety can hide behind a life that looks fine.',
    articleTitle: 'When Student Life Looks Fine, But Doesn’t Feel Fine',
    excerpt: 'Student anxiety can hide behind a life that looks fine, making it important to recognise when everyday pressure becomes something more.',
    author: 'Ms. Vrinda Singla',
    authorCredentials: '(MSc Clinical Psychology, UK)',
    date: '18 September 2026',
    readTime: '4 min read',
    avatar: '/images/blog_avatar.jpg',
    spacedParagraphs: true,
    content: [
      { type: 'p', text: 'Can a student be attending every class, submitting every assignment on time, and still be quietly anxious underneath it all? Often, yes because student anxiety is rarely only about exams.' },
      { type: 'p', text: 'For young adults aged 18 and above, college life in India comes with more than a syllabus. There’s the pressure of choosing the right stream or college, often after years of competitive coaching. There’s adjusting to hostel or PG life, away from a joint family for the first time. There’s a part-time job or internship squeezed alongside coursework, the quiet awareness of what tuition costs a family, and the looming question of placements or what comes next. Anxiety often hides behind behaviours that look like diligence rewriting the same paragraph of an assignment, saying yes to every group project, replaying a conversation with a professor or roommate long after it’s over.' },

      { type: 'h2', text: 'The Question Behind the Worry' },
      { type: 'p', text: 'Underneath most of it sits one repeating question: “Am I falling behind?” Am I falling behind in this course. Am I falling behind the cousin everyone keeps comparing me to. Am I about to disappoint parents who gave up a great deal for this degree. It is normal to wonder this occasionally, it becomes heavier when the mind keeps circling the same worry, long after any reassurance should have settled it.' },

      { type: 'h2', text: 'How It Can Show Up, Even When Life Looks Fine' },
      { type: 'p', text: 'Anxiety at this stage often hides in plain sight inside a student who is still attending, still submitting, still showing up on time, still saying “all is well” on the family call. But it can bring a racing heart before a seminar, a stomach that won’t settle before a deadline, sleepless nights before nothing, a mind too crowded to absorb a single page. It is entirely possible to be doing well on paper while quietly struggling underneath.' },

      { type: 'h2', text: 'Signs Worth Taking Seriously' },
      { type: 'p', text: 'Feeling stretched during a demanding term is normal. It’s worth paying attention when the worry doesn’t lift once the deadline passes, when it disrupts sleep, appetite, or focus, or when it starts pulling you away from classes, friendships, or things you used to enjoy' },

      { type: 'h2', text: 'A Kinder Question to Ask Yourself' },
      { type: 'p', text: 'Instead of only asking, “Am I managing my coursework?”, try asking, “Am I actually okay?” That question, asked honestly, is often the first real step toward feeling better not the last resort people sometimes imagine it to be, and not something to hide out of fear of what family or relatives might think.' },
      { type: 'p', text: 'Anxiety is a real, treatable health condition, not a reflection of how capable a student you are, and certainly not something to be ashamed of. If it has quietly become part of your everyday routine, speaking with a psychiatrist can offer real clarity, someone who can help you make sense of what you’re carrying, without judgment.' },
      {
        type: 'callout',
        lines: [
          'You do not need your entire degree, career, or future mapped out to deserve support. You only need to be honest enough to ask for it and that honesty is where things genuinely start to get lighter.'
        ]
      }
    ]
  },
  {
    id: 2,
    slug: 'anxiety-remains-unrecognised-until-it-gets-too-loud-to-ignore',
    image: '/images/blog_img_2.png',
    title: 'The Anxiety remains unrecognised – Until It Gets Too Loud to Ignore',
    excerpt: 'Anxiety often goes unrecognised, but recognising it early and seeking help can make a difference.',
    author: 'Ms. Vrinda Singla',
    authorCredentials: '(MSc Clinical Psychology, UK)',
    date: '18 September 2026',
    readTime: '4 min read',
    avatar: '/images/blog_avatar.jpg',
    content: [
      { type: 'p', text: 'In most Indian families, anxiety rarely gets called by its real name. It hides behind gentler words. “It’s just stress.” “They’re going through a phase.” “They’re overthinking again.”' },
      { type: 'p', text: 'What almost never gets recognised as the truth: anxiety is a medical condition. It sits in the nervous system the same way high blood pressure sits in the arteries or diabetes sits in blood sugar. It is just a medical condition and treatable.' },

      { type: 'h2', text: 'Why families stay quiet' },
      { type: 'p', text: 'Parents and spouses who avoid Psychiatric help are not being careless. Broadly speaking, two reasons usually hold them back.' },
      {
        type: 'ul',
        items: [
          'The fear of being labelled - a world where relatives and friends gossip and employers ask questions. People worry it will follow them into marriage prospects, promotions, or how neighbours see the family.',
          'The idea that anxiety is a character flaw of a weak personality- Somewhere along the way, many of us believe that a strong person simply pushes through and gets better. Feeling anxious, in this view, means you didn’t try hard enough and mentally weak.'
        ]
      },
      { type: 'p', text: 'Neither of these are valid reasons. Struggling with anxiety is not weakness. It means your brain’s stress response has been running too hot for too long and needs proper care, exactly like any other organ that stops working the way it should. As in any medical condition, you wouldn’t think twice about seeing a doctor and Anxiety deserves the same response. Reach out to Psychiatrist.' },

      { type: 'h2', text: 'Why acting early matters – Time is the essence' },
      { type: 'p', text: 'The first step is simply recognising what’s happening and deciding to get qualified medical guidance. The sooner that happens, the easier the recovery.' },
      { type: 'p', text: 'Getting that guidance has also become easier than it used to be.' },
      { type: 'p', strong: 'You can see Healthcare specialist close to you', text: ' - A psychiatrist near your home or office is often just a short drive away, and the visit is no different from any other doctor’s appointment.' },
      { type: 'p', strong: 'Or you can see someone from your home', text: ' – Telehealth consultations mean you can speak to an experienced Psychiatrist privately.' },
      { type: 'p', text: 'You also don’t need to wait for a crisis or breakdown before reaching out for medical guidance. A persistent unease is reason enough to start the conversation.' },

      { type: 'h2', text: 'Signs Worth Taking Seriously' },
      { type: 'p', text: 'Feeling stretched during a demanding term is normal. It’s worth paying attention when the worry doesn’t lift once the deadline passes, when it disrupts sleep, appetite, or focus, or when it starts pulling you away from classes, friendships, or things you used to enjoy' },

      { type: 'h2', text: 'Taking the first real step' },
      { type: 'p', text: 'Seeking help early isn’t difficult. It’s a practical move to protect the life you’re already living. If you’ve decided you want to take control of this, tell someone you trust first. A conversation with a parent, a sibling, spouse, or a close friend can make the decision to see a Psychiatrist feel far less isolating.' },
      {
        type: 'callout',
        lines: [
          'If being low, unexplained tension or unfounded worry has become part of your everyday life, you don’t have to sit with it alone.',
          'A psychiatrist can offer treatment that are safe, tested, to help you getting back your life and peace.'
        ]
      }
    ]
  },
  {
    id: 3,
    slug: 'anxiety-isnt-a-personality-flaw-its-a-medical-condition',
    image: '/images/blog_img_3.png',
    title: "Anxiety Isn't a Personality Flaw. It's a Medical Condition, Like Any Other",
    excerpt: 'Anxiety is a medical condition, not a personality flaw.',
    author: 'Ms. Vrinda Singla',
    authorCredentials: '(MSc Clinical Psychology, UK)',
    date: '18 September 2026',
    readTime: '4 min read',
    avatar: '/images/blog_avatar.jpg',
    content: [
      { type: 'p', gap: true, text: 'Your heart pounds before a routine meeting. Your chest tightens for no clear reason. You lie awake at midnight replaying a conversation from three days ago, and you can’t explain why it won’t leave your head.' },
      { type: 'p', gap: true, text: 'In that moment, the instinct is to ask: why am I overreacting? Why can’t I just snap out of it?' },
      { type: 'p', text: 'Here’s the medical answer. Anxiety isn’t a character flaw or a lack of willpower. It’s a physical response from a nervous system that has become too sensitive to stress.' },

      { type: 'h2', text: 'Your brain has a built-in alarm' },
      { type: 'p', text: 'Deep in your brain sits a detector whose only job is to keep you safe. When it senses stress, it releases cortisol and adrenaline, and your body reacts within seconds:' },
      {
        type: 'ul',
        items: [
          { strong: 'Heart and breathing:', text: ' a racing heart, shallow breaths, tightness in the chest' },
          { strong: 'Stomach and muscles:', text: ' nausea, stomach upset, muscles that stay tense for no reason' }
        ]
      },
      { type: 'p', text: 'The problem is that this alarm can’t tell the difference between real danger and an unread email sitting in your inbox or un-attended work that is not so important. It fires the same way for all the situations.' },

      { type: 'h2', text: 'What it costs you over time' },
      { type: 'p', text: 'Left unmanaged, anxiety works its way into every part of your life.' },
      { type: 'p', strong: 'At work', text: ', it shows up as decision fatigue and procrastination dressed up as perfectionism. You will redo the same task five times because you can’t trust that it’s good enough.' },
      { type: 'p', strong: 'In relationships,', text: ' it pulls you into your head. You withdraw from people, or you replay a five-minute conversation for hours, looking for a meaning that was never there.' },
      { type: 'p', strong: 'In your body,', text: ' it drains you. Chronic fatigue, disrupted sleep, and a stomach that never quite settles become the background noise of daily life.' },

      { type: 'h2', text: 'Some practical tips may help' },
      { type: 'p', text: 'Anxiety lives in your biology, not your logic, so reasoning your way out of it rarely works. What does work is giving your body a different signal to respond to.' },
      { type: 'p', strong: 'The physiological sigh.', text: ' Take two quick inhales through your nose, then one long, slow exhale through your mouth. It lowers your heart rate almost immediately.' },
      { type: 'p', gap: true, strong: 'The 5-4-3-2-1 method.', text: ' Name five things you can see, four you can touch, three you can hear, two you can smell, one you can taste. It pulls your brain out of the spiral and back into the room you’re sitting in.' },
      { type: 'p', text: 'These help in the moment. They are not a substitute for qualified medical help.' },

      { type: 'h2', text: 'When to see a psychiatrist' },
      { type: 'p', text: 'These tools calm a single spike of anxiety. They won’t fix anxious thoughts that has been running on high alert for months. That takes a psychiatrist, someone trained to look at what’s actually driving your alarm system and recalibrate it, whether that means therapy, medication, or both.' },
      {
        type: 'callout',
        groups: [
          [
            'Anxiety left alone doesn’t stay the same size/level.',
            'It tends to grow, quietly narrowing or limiting - what you’re willing to do, where you’re willing to go, who you’re willing to talk to and how you try to isolate yourself from your dear ones.'
          ],
          [
            'Getting help early keeps your world from shrinking any further, and it starts with your conviction and just one conversation. Psychiatrist is just like any other healthcare professional;',
            'their guidance will help to get back your peaceful life.'
          ]
        ]
      }
    ]
  }
];

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function postHref(post) {
  return post.content ? `/blogs/${post.slug}` : null;
}
