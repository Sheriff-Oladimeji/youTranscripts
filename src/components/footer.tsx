export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container px-4 md:px-6">
        <div className="text-sm text-muted-foreground mb-4">
          <p className="mb-4">
            Disclaimer: YouTubeTranscriptTool.com is an independent service and
            is not associated or affiliated with YouTube or Google. Any brand
            names or logos displayed on this site are used for illustrative
            purposes only and do not imply endorsement or partnership.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Copyright © {new Date().getFullYear()} - All rights reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms and Conditions
            </a>
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
