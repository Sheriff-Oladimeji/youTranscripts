"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function MobileAddToHomeBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
      setIsVisible(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 text-black py-3 px-4 flex items-center justify-between z-50 md:hidden">
        <div className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          <span className="font-medium">Add This Site to Home Screen</span>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-black text-white px-3 py-1 rounded-md text-sm font-medium"
        >
          Learn How
        </button>
      </div>

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Quick Access on Your Phone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-center">
              Add YouTranscripts to your home screen and open transcripts with <strong>one tap</strong>—no browser, no search.
            </p>

            <div className="space-y-4 mt-6">
              <div>
                <h3 className="font-bold">Android (Chrome)</h3>
                <ol className="list-decimal pl-5 mt-2 space-y-2">
                  <li>Tap ⋮ menu (top-right)</li>
                  <li>Choose <strong>Add to Home screen</strong></li>
                  <li>Tap <strong>Add</strong></li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold">iPhone (Safari)</h3>
                <ol className="list-decimal pl-5 mt-2 space-y-2">
                  <li>Tap <strong>Share</strong></li>
                  <li>Scroll to <strong>Add to Home Screen</strong></li>
                  <li>Tap <strong>Add</strong></li>
                </ol>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
                <div className="flex justify-center space-x-6">
                  <div className="flex flex-col items-center">
                    <span className="text-xl">⏱️</span>
                    <span className="text-sm mt-1">Save time</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl">💡</span>
                    <span className="text-sm mt-1">Stay in flow</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl">📈</span>
                    <span className="text-sm mt-1">Work smarter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
