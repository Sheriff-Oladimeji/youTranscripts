import { Rocket } from "lucide-react";

export default function PromotionalSection() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="w-[90%] mx-auto">
        <div className="bg-red-600 text-white rounded-xl p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Effortlessly Generate YouTube Transcripts with Copy and
              Translation Features! <Rocket className="inline h-6 w-6 ml-2" />
            </h2>
            <p className="max-w-[800px] text-lg">
              Use <strong>YouTranscripts</strong> to effortlessly extract the
              transcript from any YouTube video. But that&apos;s not all!
              We&apos;ve added powerful new features to make learning, creating,
              and sharing easier than ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
