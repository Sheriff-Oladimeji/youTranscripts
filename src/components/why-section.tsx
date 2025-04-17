import { ThumbsUp } from "lucide-react";

export default function WhySection() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="w-[90%] mx-auto">
        <div className="bg-purple-600 text-white rounded-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center">
            Why you need YouTranscripts? <ThumbsUp className="ml-2 h-6 w-6" />
          </h2>

          <div className="space-y-6 max-w-[800px] mx-auto">
            <p className="text-lg">
              YouTube videos are invaluable for learning and entertainment.
              However, sometimes you need to <strong>take notes</strong> or
              share the content with someone who{" "}
              <strong>prefers reading</strong>. YouTranscripts makes it a breeze
              to obtain the transcript from any YouTube video.
            </p>

            <div className="bg-green-500 text-white rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold mb-4">For Note Takers 📝</h3>
            </div>

            <p className="text-lg">
              It can be challenging to follow along with a video while taking
              notes. With the transcript, you can easily{" "}
              <strong>copy and paste</strong> the text into your notes. Even
              better, you can{" "}
              <strong>paste the YouTube transcript into chatGPT</strong> or
              other AI tools to quickly <strong>make notes for you</strong>.
              Some Podcasts are uploaded on YouTube, and you can get their
              transcript to use for note-taking.
            </p>

            <p className="text-lg">
              We also provide an embedded player where you can view the video
              and transcript simultaneously. You can click on any line in the
              transcript to jump to that part in the video.
            </p>

            <p className="text-lg">
              If the video is not in your native language, you can{" "}
              <strong>translate the transcript to your language</strong>, making
              learning and note-taking a breeze.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
