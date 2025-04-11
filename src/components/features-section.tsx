import { Copy, Globe, Clipboard } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 bg-background" id="features">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
          <Clipboard className="h-12 w-12 mb-4 text-red-600" />
          <h3 className="text-xl font-bold mb-2">One-click Copy</h3>
          <p>Copy the entire transcript with a single click for easy access.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
          <Copy className="h-12 w-12 mb-4 text-red-600" />
          <h3 className="text-xl font-bold mb-2">Supports Translation</h3>
          <p>Translate transcripts to over 125 languages instantly.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
          <Globe className="h-12 w-12 mb-4 text-red-600" />
          <h3 className="text-xl font-bold mb-2">Multiple Languages</h3>
          <p>Access transcripts in all available languages from YouTube.</p>
        </div>
      </div>
    </section>
  )
}
