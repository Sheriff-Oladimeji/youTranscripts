export type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Tanya M.",
    role: "Research Assistant",
    content:
      "Instead of rewatching long videos, I just search the transcript to find the part I need. It's like Ctrl+F for YouTube. Love it!",
    rating: 5,
    avatar: "/testimonial/tanya.jpg"
  },
  {
    name: "Matt",
    role: "Content Writer",
    content:
      "I often watch industry videos to get content ideas. Now I use YouTranscripts to grab the text and brainstorm faster.",
    rating: 5,
    avatar: "/testimonial/matt.jpg"
  },
  {
    name: "Steve T.",
    role: "Small Business Owner",
    content:
      "I'm not very tech-savvy, but this tool just works. Paste the link, click a button, and done. Can't believe something so simple saves so much effort.",
    rating: 5,
    avatar: "/testimonial/steve.jpg"
  },
  {
    name: "Jessica S.",
    role: "College Student",
    content:
      "I just needed the text from a 60-minute video for quick reference, and YouTranscripts did it in seconds. No need to watch the whole video again. Huge time-saver!",
    rating: 5,
    avatar: "/testimonial/jessica.jpg"
  },
  {
    name: "Saurabh",
    role: "Strategy Analyst",
    content:
      "We analyze industry interviews and podcasts from YouTube using YouTranscripts. It's a game-changer for research and presentation prep.",
    rating: 5,
    avatar: "/testimonial/saurabh.jpg"
  },
];
