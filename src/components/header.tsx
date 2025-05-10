"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import I18nLink from "@/components/i18n-link";
import LanguageSwitcher from "@/components/language-switcher";
import { useT } from "@/i18n/client";

interface HeaderProps {
  lng?: string;
}

export default function Header({ lng }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useT();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-[95%] mx-auto flex h-16 items-center justify-between">
        {/* Left: Hamburger Menu */}
        <div>
          <Button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            variant="secondary"
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Middle: Logo */}
        <div className="flex items-center">
          <div className="rounded">
            <Image
              src="/logo.png"
              alt="YouTranscripts Logo"
              width={30}
              height={30}
            />
          </div>
          <I18nLink href="/" className="text-xl font-bold">
            YouTranscripts
          </I18nLink>
        </div>

        {/* Right: Theme Toggle and Language Switcher */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Navigation Menu (Hidden by default, shown when menu is open) */}
        <nav
          className={`${
            isMenuOpen
              ? "absolute top-16 left-0 right-0 bg-background border-b z-50"
              : "hidden"
          }`}
        >
          <ul className="flex flex-col p-4 space-y-3">
            <I18nLink
              href="/about"
              className="text-foreground hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.about")}
            </I18nLink>
            <I18nLink
              href="/terms"
              className="text-foreground hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.terms")}
            </I18nLink>
            <I18nLink
              href="/privacy"
              className="text-foreground hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.privacy")}
            </I18nLink>
            <I18nLink
              href="/contact"
              className="text-foreground hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.contact")}
            </I18nLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
