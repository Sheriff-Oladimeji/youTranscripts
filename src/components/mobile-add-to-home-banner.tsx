"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function MobileAddToHomeBanner() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      {/* Banner only shows on mobile screens via CSS media query */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-0 left-0 right-0 bg-yellow-400 text-black py-3 px-4 z-50 hidden max-md:flex items-center justify-center"
      >
        <Plus className="h-5 w-5 mr-2" />
        <span className="font-medium">Add This Site to Home Screen</span>
      </button>

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="py-4">
            <div className="flex items-center justify-center mb-2">
              <h2 className="text-xl font-bold">
                {" "}
                📲  Quick Access on Your Phone
              </h2>
            </div>

            <div className="border-t border-b py-4 my-4">
              <p>
                Add YouTranscripts to your home screen and open transcripts with{" "}
                <strong>one tap</strong>—no browser, no search.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">Android (Chrome)</h3>
                <ol className="list-decimal pl-8 mt-2 space-y-2">
                  <li>Tap ⋮ menu (top-right)</li>
                  <li>
                    Choose <strong>Add to Home screen</strong>
                  </li>
                  <li>
                    Tap <strong>Add</strong>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold text-lg">iPhone (Safari)</h3>
                <ol className="list-decimal pl-8 mt-2 space-y-2">
                  <li>
                    Tap <strong>Share</strong>
                  </li>
                  <li>
                    Scroll to <strong>Add to Home Screen</strong>
                  </li>
                  <li>
                    Tap <strong>Add</strong>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
