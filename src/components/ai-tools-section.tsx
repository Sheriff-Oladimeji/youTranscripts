import { Bot } from "lucide-react";

export default function AiToolsSection() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="w-[90%] mx-auto">
        <div className="bg-yellow-100 dark:bg-yellow-950/30 text-foreground rounded-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center">
            Pair YouTube Transcript with AI tools{" "}
            <Bot className="ml-2 h-6 w-6" />
          </h2>

          <div className="space-y-6 max-w-[800px] mx-auto">
            <p className="text-lg">
              Using AI to learn, create content, and take notes is the future.
            </p>

            <p className="text-lg">
              You can use the transcript with other AI tools to generate
              summaries, notes, blog posts, and more. Simply copy the transcript
              and paste it into your favorite AI tool with a prompt like:
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-lg italic">
                &quot;Summarize this YouTube transcript in 5 bullet points&quot;
              </p>
            </div>

            <p className="text-lg">
              Or use our built-in AI Prompt Library to get started quickly!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
