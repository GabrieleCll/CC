import { useI18n } from "../i18n";

export default function SiteFooter() {
  const { t, products, href } = useI18n();

  return (
    <footer className="bg-cc-espresso text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/logo-light.svg" alt="" className="h-10 w-10" />
            <span className="text-xl font-medium text-white">Coffee Core</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <p className="cc-eyebrow text-cc-sage">{t.footer.products}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.id}>
                <a href={href(p.path)} className="hover:text-white">{p.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="cc-eyebrow text-cc-sage">{t.footer.contacts}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Coffee Core s.r.l. SB</li>
            <li>P.IVA 02792950699</li>
            <li>
              <a href="mailto:info@coffeecore.it" className="hover:text-white">info@coffeecore.it</a>
            </li>
            <li>{t.footer.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Coffee Core — Upcycled by design.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/coffeecore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.73c0-1.13-.02-2.59-1.58-2.59-1.59 0-1.84 1.24-1.84 2.51v4.81h-3v-9h2.89v1.23h.04c.4-.76 1.37-1.56 2.83-1.56 3.03 0 3.59 2 3.59 4.59v4.74z" />
              </svg>
              LinkedIn
            </a>
            <a href="/privacy" className="underline decoration-dotted hover:text-white">{t.footer.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
