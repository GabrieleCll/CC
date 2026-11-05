import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FlaskConical, Leaf, ShoppingBag } from "lucide-react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import OrderModal from "./components/OrderModal";
import { products, type Product } from "./products";
import { warmUpApi } from "./api";

export default function ProductPage({ product }: { product: Product }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const others = products.filter((p) => p.id !== product.id);

  useEffect(() => {
    warmUpApi();
    document.title = `${product.name} — Coffee Core`;
  }, [product]);

  const OrderButton = ({ light = false }: { light?: boolean }) => (
    <button
      onClick={() => setOrderOpen(true)}
      className={[
        "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold shadow-lg transition hover:-translate-y-0.5",
        light ? "bg-white text-cc-brown hover:bg-cc-cream" : "bg-cc-green text-white hover:bg-cc-forest",
      ].join(" ")}
    >
      <ShoppingBag className="h-5 w-5" />
      Ordina
    </button>
  );

  return (
    <main className="min-h-screen bg-cc-cream">
      <SiteHeader />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-14 md:pb-24">
        <a href="/#prodotti" className="inline-flex items-center gap-2 text-sm font-medium text-cc-brown/70 hover:text-cc-brown">
          <ArrowLeft className="h-4 w-4" /> Tutti i prodotti
        </a>
        <div className="mt-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="cc-eyebrow" style={{ color: product.accent }}>{product.eyebrow}</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight text-cc-brown">
              {product.name}
            </h1>
            <p className="mt-4 text-xl font-semibold italic text-cc-teal">{product.tagline}</p>
            <p className="mt-6 text-lg leading-8 max-w-prose">{product.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <OrderButton />
              <a href="/#contatti" className="font-semibold text-cc-brown underline underline-offset-4 decoration-cc-brown/30 hover:decoration-cc-brown">
                Richiedi la scheda tecnica
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] opacity-20 blur-2xl" style={{ background: product.accent }} aria-hidden />
            <div className="relative rounded-[2.5rem] bg-white shadow-2xl p-8">
              <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-cc-teal text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-3 gap-6">
          {product.highlights.map((h) => (
            <div key={h.title} className="rounded-3xl bg-white/10 border border-white/15 p-7">
              <Leaf className="h-6 w-6 text-cc-sage" />
              <h3 className="mt-4 text-xl font-bold">{h.title}</h3>
              <p className="mt-2 text-white/80 leading-7">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPOUNDS */}
      {product.compounds && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-3 gap-10">
            <div>
              <p className="cc-eyebrow text-cc-green">Caratterizzazione scientifica</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight text-cc-brown">
                Cosa c'è dentro il nostro estratto
              </h2>
              <p className="mt-5 leading-7">
                In collaborazione con l'<strong>Università degli Studi di Milano</strong> abbiamo caratterizzato i nostri
                estratti con un'analisi metabolomica untargeted in <strong>HPLC-HRMS</strong>. I composti più abbondanti
                appartengono alle famiglie bioattive tipiche del caffè, in accordo con la letteratura scientifica più recente.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-4 border border-cc-brown/10">
                <FlaskConical className="h-8 w-8 text-cc-teal shrink-0" />
                <img src="/img/logo-unimi.webp" alt="Università degli Studi di Milano" className="h-10 w-auto" />
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              {product.compounds.map((c, i) => (
                <article
                  key={c.family}
                  className={[
                    "rounded-3xl bg-white p-7 border border-cc-brown/10 shadow-sm",
                    i === product.compounds!.length - 1 && product.compounds!.length % 2 === 1 ? "sm:col-span-2" : "",
                  ].join(" ")}
                >
                  <span className="text-sm font-bold text-cc-green">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-xl font-bold text-cc-brown">{c.family}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-cc-teal font-semibold">{c.examples}</p>
                  <p className="mt-3 leading-7">{c.benefits}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPECS + APPLICATIONS */}
      <section className={product.compounds ? "bg-white/60 border-y border-cc-brown/10" : ""}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-8">
          {product.specs ? (
            <div className="rounded-3xl bg-cc-teal text-white p-8 border-4 border-cc-green/70">
              <h2 className="text-2xl font-bold uppercase tracking-wide">Specifiche</h2>
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
              <h2 className="text-2xl font-bold uppercase tracking-wide">Dalla stessa materia prima</h2>
              <p className="mt-5 leading-7 text-white/85">
                Ogni lotto nasce da fondi di caffè post-espresso raccolti presso bar e torrefazioni italiane. Lo stesso fondo
                alimenta l'intera filiera Coffee Core: estratto secco, olio e pellet, senza scarti.
              </p>
              <p className="mt-4 leading-7 text-white/85">
                Scheda tecnica e campionatura disponibili su richiesta.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex-1 rounded-3xl bg-white p-8 border-2 border-cc-teal/40">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-cc-teal">Applicazioni</h2>
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
                <h2 className="text-2xl font-bold uppercase tracking-wide text-cc-teal">Performance scientifica</h2>
                <p className="mt-4 font-semibold text-cc-brown">
                  {product.highlights.map((h) => h.title).join(" · ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ORDER CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-[2.5rem] px-8 py-14 md:px-16 text-white text-center" style={{ background: product.accent }}>
          <p className="cc-eyebrow text-white/80">Ordina ora</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">{product.name}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg">
            Ricevi un'offerta su misura, con disponibilità, prezzi e campionatura.
          </p>
          <div className="mt-8">
            <OrderButton light />
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <p className="cc-eyebrow text-cc-green">Tripla soluzione zero waste</p>
        <h2 className="mt-2 text-2xl font-bold text-cc-brown">Scopri anche</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          {others.map((p) => (
            <a key={p.id} href={p.path} className="group flex items-center gap-5 rounded-3xl bg-white p-4 border border-cc-brown/10 hover:shadow-lg transition">
              <img src={p.image} alt="" className="h-24 w-24 object-contain" />
              <div className="flex-1">
                <p className="text-lg font-bold text-cc-brown">{p.name}</p>
                <p className="text-sm">{p.tagline}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-cc-brown group-hover:translate-x-1 transition" />
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />

      {orderOpen && <OrderModal product={product} onClose={() => setOrderOpen(false)} />}
    </main>
  );
}
