"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Miguel",
      role: "Linguistics professor and researcher",
      content:
        "Being able to quickly discover if there is any information in a long YouTube lecture that I need to listen to. This tool saves me hours of time every week!",
      rating: 5,
    },
    {
      name: "Robert David",
      role: "Creative Director",
      content:
        "I love your integration of tools and intuitive minimal and efficient UI flow, currently working on getting back in the game and definitely looking forward getting a subscription to your service once I'm back.",
      rating: 5,
    },
    {
      name: "Andrey K",
      role: "Community Manager",
      content:
        "In combination with other LLM tools it saves a lot of time when going through lots of videos on a quest of gathering feedback and insights from users.",
      rating: 5,
    },
    {
      name: "Angela",
      role: "Marketing Specialist",
      content:
        "I love how fast and accurate the transcripts are. The best part is the ability to translate them for the subtitles of our videos.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Content Creator",
      content:
        "This tool has completely transformed my workflow. I can quickly extract key points from long videos and repurpose them for my blog.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Journalist",
      content:
        "As a journalist, accuracy is everything. This transcript tool helps me quote sources correctly without spending hours on manual transcription.",
      rating: 4,
    },
  ];

  // Calculate visible slides based on screen size
  const [visibleSlides, setVisibleSlides] = useState(3);

  // Set default visible slides based on screen size
  useState(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    }
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= testimonials.length - visibleSlides ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleSlides : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-red-500 fill-red-500" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <section className="w-full py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="w-[90%] max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-red-500 font-medium mb-2">Testimonials</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Don&apos;t take our word for it, here&apos;s what our users say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-1">
            {renderStars(5)}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Rated 4.6 out of 5 stars
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Based on 2,363 reviews
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleSlides)
                }%)`,
                width: `${(testimonials.length * 100) / visibleSlides}%`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  style={{ width: `${100 / visibleSlides}%` }}
                  className="px-4"
                >
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 h-full flex flex-col">
                    <div className="flex mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
