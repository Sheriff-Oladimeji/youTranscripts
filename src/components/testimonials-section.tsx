"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

export default function TestimonialsSection() {
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
      name: "Andrew K",
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

        <div className="mt-10">
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-6 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 h-full flex flex-col">
                      <div className="flex mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="mr-3">
                          <Image
                            src="https://images.unsplash.com/photo-1656874576047-db8076ad06a1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt={`${testimonial.name} avatar`}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 h-10 w-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 h-10 w-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
