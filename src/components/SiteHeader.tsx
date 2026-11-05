import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#tecnologia", label: "Tecnologia" },
  { href: "/#prodotti", label: "Prodotti" },
  { href: "/#ricerca", label: "R&D" },
  { href: "/#partner", label: "Partner" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cc-cream/85 backdrop-blur border-b border-cc-brown/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 py-3">
        <a href="/" className="flex items-center gap-3">
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
            href="/#contatti"
            className="px-5 py-2.5 rounded-full bg-cc-brown text-white hover:bg-cc-espresso transition-colors"
          >
            Contattaci
          </a>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg text-cc-brown hover:bg-cc-brown/10"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-cc-brown/10 bg-cc-cream px-4 py-4 flex flex-col gap-1 text-cc-brown font-medium">
          {[...links, { href: "/#contatti", label: "Contatti" }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
