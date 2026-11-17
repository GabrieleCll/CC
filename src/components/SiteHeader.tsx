import { useState } from "react";
import { Menu, X } from "lucide-react";
import { localizePath, splitLocale, useI18n, type Locale } from "../i18n";

const locales: Locale[] = ["it", "en"];

function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  const { path } = splitLocale(window.location.pathname);

  return (
    <div role="group" aria-label={t.nav.language} className={`flex items-center gap-1 text-xs font-bold uppercase ${className}`}>
      {locales.map((l) => (
        <a
          key={l}
          href={localizePath(path, l) + window.location.hash}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={[
            "px-2 py-1 rounded-full transition-colors",
            l === locale ? "bg-cc-brown text-white" : "text-cc-brown/70 hover:text-cc-green",
          ].join(" ")}
        >
          {l}
        </a>
      ))}
    </div>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t, href } = useI18n();

  const links = [
    { href: href("/#tecnologia"), label: t.nav.tech },
    { href: href("/#prodotti"), label: t.nav.products },
    { href: href("/#ricerca"), label: t.nav.rd },
    { href: href("/#partner"), label: t.nav.partner },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cc-cream/85 backdrop-blur border-b border-cc-brown/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 py-3">
        <a href={href("/")} className="flex items-center gap-3">
          <img src="/logo.svg" alt="" className="h-9 w-9" />
          <span className="text-xl font-medium tracking-tight text-cc-brown">Coffee Core</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cc-brown">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-cc-green transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href={href("/#contatti")}
            className="px-5 py-2.5 rounded-full bg-cc-brown text-white hover:bg-cc-espresso transition-colors"
          >
            {t.nav.contactCta}
          </a>
          <LanguageSwitch className="-ml-3" />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitch />
          <button
            className="p-2 rounded-lg text-cc-brown hover:bg-cc-brown/10"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-cc-brown/10 bg-cc-cream px-4 py-4 flex flex-col gap-1 text-cc-brown font-medium">
          {[...links, { href: href("/#contatti"), label: t.nav.contacts }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
