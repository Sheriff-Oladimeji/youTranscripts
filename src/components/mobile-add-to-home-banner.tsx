"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useT } from "@/i18n/client";

export default function MobileAddToHomeBanner() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useT();

  return (
    <>
      {/* Banner only shows on mobile screens via CSS media query */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-0 left-0 right-0 bg-yellow-400 text-black py-3 px-4 z-50 hidden max-md:flex items-center justify-center"
      >
        <Plus className="h-5 w-5 mr-2" />
        <span className="font-medium">{t("mobileAdd.title")}</span>
      </button>

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="py-4">
            <div className="flex items-center justify-center mb-2">
              <h2 className="text-xl font-bold"> 📲 {t("mobileAdd.title")}</h2>
            </div>

            <div className="border-t border-b py-4 my-4">
              <p>{t("mobileAdd.instructions")}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">
                  {t("mobileAdd.androidTitle")}
                </h3>
                <ol className="list-decimal pl-8 mt-2 space-y-2">
                  <li>{t("mobileAdd.menuTop")}</li>
                  <li>{t("mobileAdd.android")}</li>
                  <li>{t("mobileAdd.tapAdd")}</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold text-lg">{t("mobileAdd.iosTitle")}</h3>
                <ol className="list-decimal pl-8 mt-2 space-y-2">
                  <li>{t("mobileAdd.tapShare")}</li>
                  <li>{t("mobileAdd.ios")}</li>
                  <li>{t("mobileAdd.tapAdd")}</li>
                </ol>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
