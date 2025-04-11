import { Camera } from "lucide-react";

export default function ContentCreatorsSection() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="w-[90%] mx-auto">
        <div className="bg-green-100 dark:bg-green-950/30 text-foreground rounded-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center">
            For Content Creators <Camera className="ml-2 h-6 w-6" />
          </h2>

          <div className="space-y-6 max-w-[800px] mx-auto">
            <p className="text-lg">
              Content creators can use this tool to research and create content
              effortlessly. Simply add your YouTube video URL and get the
              transcript. You can use the transcript to craft blog posts,
              articles, or detailed show notes related to your video content.
            </p>

            <p className="text-lg font-medium">Some ideas that we love:</p>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-xl">•</span>
                <div>
                  <strong>Create Quiz, Meme, Infographic</strong>, and more from
                  the transcript. Reuse old content to increase engagement!
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-xl">•</span>
                <div>
                  <strong>Summarize the transcript</strong> and add it to the
                  video description to{" "}
                  <strong>rank higher in search engines</strong>.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-xl">•</span>
                <div>
                  Extract key points from the transcript to{" "}
                  <strong>create engaging social media posts</strong> that
                  entice viewers to watch the full video.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-xl">•</span>
                <div>
                  Use the transcript as a foundation for blog posts, articles,
                  or detailed show notes related to your video content.{" "}
                  <strong>
                    Some people prefer reading over watching videos
                  </strong>
                  . This will help you reach a wider audience.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-xl">•</span>
                <div>
                  Add summaries and key points to blog posts, tweets,
                  newsletter, and more.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
