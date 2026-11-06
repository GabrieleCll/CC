import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileText, FlaskConical, Leaf, ShoppingBag } from "lucide-react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import OrderModal, { type RequestKind } from "./components/OrderModal";
import { Reveal } from "./components/Motion";
import type { ProductId } from "./products";
import { warmUpApi } from "./api";
import { rich, useI18n } from "./i18n";

export default function ProductPage({ id }: { id: ProductId }) {
  const [request, setRequest] = useState<RequestKind | null>(null);
  const { t, products, href } = useI18n();
  const p = t.productPage;
  const product = products.find((x) => x.id === id)!;
  const others = products.filter((x) => x.id !== id);

  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    warmUpApi();
    document.title = `${product.name} — Coffee Core`;
  }, [product]);

  const OrderButton = ({ light = false }: { light?: boolean }) => (
    <button
      onClick={() => setRequest("order")}
      className={[
        "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold shadow-lg transition hover:-translate-y-0.5",
        light ? "bg-white text-cc-brown hover:bg-cc-cream" : "bg-cc-green text-white hover:bg-cc-forest",
      ].join(" ")}
    >
      <ShoppingBag className="h-5 w-5" />
      {p.order}
    </button>
  );

  return (
    <main className="min-h-screen bg-cc-cream pb-[4.5rem] md:pb-0">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-cc-espresso text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-14 md:pb-28">
          <a href={href("/#prodotti")} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {p.allProducts}
          </a>
          <div className="mt-6 sm:mt-8 grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-14 items-center">
            <div>
              <Reveal>
                <p className="cc-eyebrow text-cc-sage">{product.eyebrow}</p>
                <h1 className="mt-3 text-5xl sm:text-7xl font-extrabold leading-[0.98] tracking-tight">{product.name}</h1>
                <p className="mt-5 text-xl sm:text-2xl font-light italic text-cc-sage">{product.tagline}</p>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-7 text-lg leading-8 text-white/85 max-w-prose">{product.intro}</p>
              </Reveal>
              <Reveal delay={200} className="mt-9 flex flex-wrap gap-5 items-center">
                <OrderButton />
                <button
                  onClick={() => setRequest("datasheet")}
                  className="inline-flex items-center gap-2 font-semibold text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                >
                  <FileText className="h-4 w-4" />
                  {p.requestDatasheet}
                </button>
              </Reveal>
            </div>
            <Reveal delay={150} className="relative mx-auto w-full max-w-[16rem] sm:max-w-md md:max-w-none">
              <div className="absolute -inset-3 sm:-inset-6 rounded-full border border-dashed border-cc-sage/40 animate-[spin_60s_linear_infinite] motion-reduce:animate-none" aria-hidden />
              <div className="relative aspect-square overflow-hidden rounded-full shadow-2xl ring-8 ring-white/10" style={{ background: product.accent }}>
                <img src={product.pageImage} alt={product.name} className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-cc-teal text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid md:grid-cols-3 gap-4 sm:gap-6">
          {product.highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 120} className="rounded-3xl bg-white/10 border border-white/15 p-7">
              <Leaf className="h-6 w-6 text-cc-sage" />
              <h3 className="mt-4 text-xl font-bold">{h.title}</h3>
              <p className="mt-2 text-white/80 leading-7">{h.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMPOUNDS */}
      {product.compounds && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-3 gap-10">
            <div>
              <p className="cc-eyebrow text-cc-green">{t.science.eyebrow}</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight text-cc-brown">{t.science.title}</h2>
              <p className="mt-5 leading-7">
                {rich(t.science.body)} {t.science.bodyMore}
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-4 border border-cc-brown/10">
                <FlaskConical className="h-8 w-8 text-cc-teal shrink-0" />
                <img src="/img/logo-unimi.webp" alt="Università degli Studi di Milano" className="h-10 w-auto" />
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              {product.compounds.map((c, i) => (
                <Reveal
                  as="article"
                  key={c.family}
                  delay={(i % 2) * 120}
                  className={[
                    "rounded-3xl bg-white p-7 border border-cc-brown/10 shadow-sm",
                    i === product.compounds!.length - 1 && product.compounds!.length % 2 === 1 ? "sm:col-span-2" : "",
                  ].join(" ")}
                >
                  <span className="text-sm font-bold text-cc-green">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-xl font-bold text-cc-brown">{c.family}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-cc-teal font-semibold">{c.examples}</p>
                  <p className="mt-3 leading-7">{c.benefits}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPECS + APPLICATIONS */}
      <section className={product.compounds ? "bg-white/60 border-y border-cc-brown/10" : ""}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid md:grid-cols-2 gap-6 sm:gap-8">
          {product.specs ? (
            <div className="rounded-3xl bg-cc-teal text-white p-8 border-4 border-cc-green/70">
              <h2 className="text-2xl font-bold uppercase tracking-wide">{p.specs}</h2>
              <dl className="mt-6 divide-y divide-white/15">
                {product.specs.map((s) => (
                  <div key={s.label} className="py-3 grid grid-cols-2 gap-4">
                    <dt className="font-semibold">{s.label}</dt>
                    <dd className="text-cc-sage font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
              {product.specsNote && <p className="mt-6 text-sm text-cc-sage text-center">{product.specsNote}</p>}
            </div>
          ) : (
            <div className="rounded-3xl bg-cc-brown text-white p-8">
              <h2 className="text-2xl font-bold uppercase tracking-wide">{p.sameSourceTitle}</h2>
              <p className="mt-5 leading-7 text-white/85">{p.sameSourceBody}</p>
              <p className="mt-4 leading-7 text-white/85">{p.sameSourceNote}</p>
              <button
                onClick={() => setRequest("datasheet")}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-cc-brown font-semibold hover:bg-cc-cream transition-colors"
              >
                <FileText className="h-5 w-5" />
                {p.requestDatasheet}
              </button>
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex-1 rounded-3xl bg-white p-8 border-2 border-cc-teal/40">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-cc-teal">{p.applications}</h2>
              <ul className="mt-6 space-y-3">
                {product.applications.map((a) => (
                  <li key={a} className="flex items-start gap-3 font-medium text-cc-brown">
                    <Check className="h-5 w-5 mt-0.5 text-cc-green shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {product.specs && (
              <div className="rounded-3xl bg-white p-8 border-2 border-cc-teal/40">
                <h2 className="text-2xl font-bold uppercase tracking-wide text-cc-teal">{p.performance}</h2>
                <p className="mt-4 font-semibold text-cc-brown">
                  {product.highlights.map((h) => h.title).join(" · ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ORDER CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="rounded-[2rem] sm:rounded-[2.5rem] px-6 py-12 sm:px-8 sm:py-14 md:px-16 text-white text-center" style={{ background: product.accent }}>
          <p className="cc-eyebrow text-white/80">{p.orderNow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">{product.name}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg">{p.orderCtaBody}</p>
          <div className="mt-8">
            <OrderButton light />
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <p className="cc-eyebrow text-cc-green">{p.alsoEyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-cc-brown">{p.alsoTitle}</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          {others.map((o) => (
            <a key={o.id} href={href(o.path)} className="group flex items-center gap-5 rounded-3xl bg-white p-4 border border-cc-brown/10 hover:shadow-lg transition">
              <img src={o.image} alt="" className="h-24 w-24 object-contain" />
              <div className="flex-1">
                <p className="text-lg font-bold text-cc-brown">{o.name}</p>
                <p className="text-sm">{o.tagline}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-cc-brown group-hover:translate-x-1 transition" />
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />

      <div
        className={[
          "md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-cc-brown/10 bg-cc-cream/95 backdrop-blur px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-3 transition-transform duration-300",
          showBar && !request ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
        aria-hidden={!showBar}
      >
        <img src={product.image} alt="" className="h-10 w-10 rounded-full object-contain p-1" style={{ background: product.accent }} />
        <p className="flex-1 min-w-0 truncate font-bold text-cc-brown">{product.name}</p>
        <button
          onClick={() => setRequest("order")}
          tabIndex={showBar ? 0 : -1}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cc-green text-white font-semibold shadow"
        >
          <ShoppingBag className="h-4 w-4" />
          {p.order}
        </button>
      </div>

      {request && <OrderModal product={product} kind={request} onClose={() => setRequest(null)} />}
    </main>
  );
}
