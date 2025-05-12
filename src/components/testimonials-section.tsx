"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  testimonials as fallbackTestimonials,
  Testimonial,
} from "@/constants/testimonials";
import { useT } from "@/i18n/client";

interface TestimonialsSectionProps {
  lng?: string;
}

interface TranslatedTestimonial {
  name: string;
  role: string;
  content: string;
  rating?: number;
  avatar?: string;
}

export default function TestimonialsSection({ lng }: TestimonialsSectionProps) {
  const { t } = useT();

  // Get translated testimonials or use fallback
  const translatedTestimonials =
    (t("testimonials.items", { returnObjects: true }) as
      | TranslatedTestimonial[]
      | undefined) || fallbackTestimonials;

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
          <p className="text-red-500 font-medium mb-2">
            {t("testimonials.subtitle")}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {t("testimonials.title")}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-1">
            {renderStars(5)}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {t("testimonials.rating")}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t("testimonials.reviews")}
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
                {translatedTestimonials.map(
                  (testimonial: TranslatedTestimonial, index: number) => {
                    // Get the corresponding fallback testimonial for the avatar
                    const fallbackTestimonial =
                      fallbackTestimonials[index] || fallbackTestimonials[0];

                    return (
                      <CarouselItem
                        key={index}
                        className="pl-6 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 h-full flex flex-col">
                          <div className="flex mb-3">
                            {renderStars(
                              testimonial.rating || fallbackTestimonial.rating
                            )}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                            &quot;{testimonial.content}&quot;
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="mr-3">
                              <Avatar>
                                <AvatarImage
                                  src={
                                    testimonial.avatar ||
                                    fallbackTestimonial.avatar
                                  }
                                  alt={`${testimonial.name} avatar`}
                                />
                                <AvatarFallback>
                                  {testimonial.name.split(" ")[0][0]}
                                </AvatarFallback>
                              </Avatar>
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
                    );
                  }
                )}
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
