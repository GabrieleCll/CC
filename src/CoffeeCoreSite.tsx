import { useMemo, useState } from "react";
import { Package, Cog, FlaskConical, BottleWine } from "lucide-react";

import PrivacyPage from "./PrivacyPage";
import EnhancedCapsulesPage from "./EnhancedCapsulesPage";


/**
 * Coffee Core — Single Page Website (Single React Component)
 * ---------------------------------------------------------
 * - TailwindCSS utility classes for styling
 * - Montserrat font imported via <style> tag
 * - Color palette inspired by the two images the user provided
 * - "Fake door" CTA on products: opens a modal and sends a POST to `/api/notify`
 *   so you can wire a serverless function (e.g., Netlify / Vercel) to email the admin
 * - If the POST fails, we gracefully fallback to a `mailto:` link for manual reporting
 *
 * How to wire the email notification (example):
 *   1) Create an endpoint at `/api/notify` that accepts `{ product, email, ts }`.
 *   2) In that function, send an email to your admin (e.g., with SendGrid, SES, Mailgun).
 *   3) Return { ok: true } on success.
 */

export default function CoffeeCoreSite() {
  // Router minimale: se path è /privacy mostra la pagina Privacy, se path è /bevande mostra la pagina EnhancedCapsules, altrimenti la homepage
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/bevande') return <EnhancedCapsulesPage />;

  const [open, setOpen] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null as null | Product);
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  type Product = {
    id: string;
    name: string;
    status: "presente" | "futuro";
    summary: string;
    tag: string;
    color: string; // tailwind bg-*
  };

  const palette = {
    darkBrown: "#684330",
    leafGreen: "#57992D",
    cream: "#FBEFD9",
    terracotta: "#DE7C5A",
    teal: "#3B7080",
    sage: "#B3D69B",
    forest: "#455D51",
    straw: "#D8C27A",
    plum: "#5F464B",
    brick: "#8E4A49",
  } as const;

  const products = useMemo<Product[]>(
    () => [
      {
        id: "antiossidanti",
        name: "Antiossidanti & Bioattivi (upcycled)",
        status: "presente",
        summary:
          "Estratti ad alto valore da scarti di caffè per nutraceutica, food & beverage e cosmetica.",
        tag: "Core",
        color: "bg-[#57992D]",
      },
      {
        id: "pellet",
        name: "Pellet da scarti di caffè",
        status: "futuro",
        summary:
          "Combustibile sostenibile e tracciabile ottenuto dal residuo di lavorazione.",
        tag: "R&D",
        color: "bg-[#8E4A49]",
      },
      {
        id: "bevande",
        name: "Bevande con bioattivi aggiunti",
        status: "futuro",
        summary:
          "Linea di drink funzionali con antiossidanti naturali estratti dal caffè.",
        tag: "R&D",
        color: "bg-[#3B7080]",
      },
      {
        id: "oli-cosmesi",
        name: "Oli per la cosmesi",
        status: "futuro",
        summary:
          "Oli e lipidi da fondi di caffè per skincare e haircare con ingredienti circolari.",
        tag: "R&D",
        color: "bg-[#D8C27A]",
      },
    ],
    []
  );

  const jumpAndHighlight = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // aggiunge un'animazione di evidenziazione temporanea
    el.classList.add("cc-highlight");
    window.setTimeout(() => el.classList.remove("cc-highlight"), 650);
    };

  const handleFakeDoor = async (p: Product) => {
    setClickedProduct(p);
    setOpen(true);
    setSubmitting(true);
    setSubmitMsg(null);

    try {
      const res = await fetch("https://cc-web-service-9c1f.onrender.com/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: p.id,
          email: "gabrieleciullo95@gmail.com",
        }),
      });
      if (res.ok) {
        setSubmitMsg(
          "Grazie, abbiamo registrato il tuo interesse! Non appena il prodotto sarà disponibile ti ricontatteremo."
        );
      } else {
        setSubmitMsg(null);
        throw new Error("notify failed");
      }
    } catch (e) {
      // Fallback: proponi mailto
      setSubmitMsg(null);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <main className="min-h-screen bg-[#FBEFD9]" style={{ fontFamily: "Montserrat, ui-sans-serif, system-ui" }}>
      {/* Import Montserrat */}
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');
      @keyframes ccPulse { 0%{box-shadow:0 0 0 0 rgba(87,153,45,0.4)} 70%{box-shadow:0 0 0 12px rgba(87,153,45,0)} 100%{box-shadow:0 0 0 0 rgba(87,153,45,0)} }
      .cc-highlight{ border-radius:1rem; animation: ccPulse 1.2s ease-in-out 1; background: rgba(179,214,155,0.18); }
      `}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/60 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Coffee Core" className="h-8 w-8 rounded-2xl" />
            <span className="text-xl font-bold tracking-tight text-[#684330]">Coffee Core</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#mission" className="hover:underline">Missione</a>
            <a href="#process" className="hover:underline">Processo</a>
            <a href="#prodotti" className="hover:underline">Prodotti</a>
            <a href="#contatti" className="hover:underline">Contatti</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 z-0 pointer-events-none" aria-hidden>
          <svg className="w-[140%] h-[140%] -translate-x-12 -translate-y-8" viewBox="0 0 800 600" fill="none">
            <circle cx="150" cy="150" r="120" fill={palette.leafGreen} />
            <circle cx="350" cy="220" r="180" fill={palette.teal} />
            <circle cx="700" cy="100" r="110" fill={palette.straw} />
          </svg>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 z-10">
          <div className="grid md:grid-cols-2 items-center gap-10">
            <div>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight text-[#455D51]">
                Diamo una <span className="text-[#57992D]">seconda vita</span> al caffè
              </h1>
              <p className="mt-6 text-lg text-[#5F464B] max-w-prose">
                Coffee Core è una <strong>green company</strong> che trasforma gli scarti di caffè in ingredienti funzionali:
                <em> antiossidanti, bioattivi e oli</em>. L'upcycling è il nostro core business: dal rifiuto, valore reale.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#prodotti" className="px-5 py-3 rounded-2xl bg-[#57992D] text-white font-medium shadow hover:translate-y-0.5 transition">
                  Esplora i prodotti
                </a>
                <a href="#cta" className="px-5 py-3 rounded-2xl bg-white text-[#3B7080] border border-[#3B7080]/20 font-medium shadow-sm hover:bg-[#3B7080]/5 transition">
                  Parliamo di partnership
                </a>
              </div>
            </div>
            <aside className="rounded-3xl p-6 sm:p-8 bg-white/70 border border-black/5 shadow-xl">
              <h3 className="text-xl font-semibold text-[#684330]">Impatto circolare</h3>
              <ul className="mt-4 space-y-3 text-[#5F464B]">
                <li>♻️ Upcycling degli scarti di caffè</li>
                <li>🌿 Ingredienti naturali per nutraceutica e cosmetica</li>
                <li>⚗️ Estrazioni a basso impatto energetico</li>
                <li>📦 Filiera tracciabile e partnering con torrefazioni</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-[#455D51]">Missione</h2>
            <p className="mt-4 text-[#5F464B] leading-7">
              Ridurre gli sprechi alimentari valorizzando i sottoprodotti del caffè. Con tecnologie
              di estrazione mirate, isoliamo <strong>antiossidanti</strong> e composti <strong>bioattivi</strong> per
              applicazioni che spaziano dal food alla cosmetica, in un'ottica di <em>economia circolare</em>.
            </p>
          </div>
          <div className="rounded-2xl p-6 bg-[#B3D69B] text-[#455D51] shadow">
            <p className="font-medium">Numeri attesi</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>−60% rifiuti organici conferiti</li>
              <li>+45% resa di estrazione target</li>
              <li>0 solventi clorurati nei processi</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-20 bg-white/70 border-y border-black/5">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
<h2 className="text-3xl font-bold text-[#455D51]">Dal fondo al valore</h2>
<div className="mt-8 grid md:grid-cols-4 gap-6">
<div className="rounded-2xl p-5 shadow border border-black/5 bg-[#D8C27A] flex flex-col items-start">
<Package className="h-8 w-8 text-white mb-2" />
<p className="text-lg font-semibold text-white drop-shadow-sm">Raccolta</p>
<p className="mt-2 text-white/90 text-sm leading-6">Scarti da torrefazioni e bar, con logistica tracciata.</p>
</div>
<div className="rounded-2xl p-5 shadow border border-black/5 bg-[#57992D] opacity-75 flex flex-col items-start">
<Cog className="h-8 w-8 text-white mb-2" />
<p className="text-lg font-semibold text-white drop-shadow-sm">Pre-trattamento</p>
<p className="mt-2 text-white/90 text-sm leading-6">Essiccazione e selezione per massima resa.</p>
</div>
<div className="rounded-2xl p-5 shadow border border-black/5 bg-[#57992D] flex flex-col items-start">
<FlaskConical className="h-8 w-8 text-white mb-2" />
<p className="text-lg font-semibold text-white drop-shadow-sm">Estrazione</p>
<p className="mt-2 text-white/90 text-sm leading-6">Processi a basso impatto.</p>
</div>
<div className="rounded-2xl p-5 shadow border border-black/5 bg-[#455D51] flex flex-col items-start">
<BottleWine className="h-8 w-8 text-white mb-2" />
<p className="text-lg font-semibold text-white drop-shadow-sm">Formulazione</p>
<p className="mt-2 text-white/90 text-sm leading-6">Ingredienti per diversi settori.</p>
</div>
</div>
</div>
</section>

      {/* PRODUCTS */}
      <section id="prodotti" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#455D51]">Prodotti</h2>
            <p className="mt-2 text-[#5F464B]">Presenti e futuri: raccontiamo dove siamo e dove andiamo.</p>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {products.map((p) => (
            <article key={p.id} className={`rounded-3xl border border-black/5 shadow overflow-hidden ${p.color}`}>
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white drop-shadow-sm">{p.name}</h3>
                  {/* <span className={`text-xs px-2 py-1 rounded-full bg-white/30 text-white backdrop-blur`}>{p.status}</span> */}
                </div>
                <p className="mt-3 text-white/90 leading-6 flex-1">{p.summary}</p>
                <div className="mt-6 flex items-center justify-between">
                  {/* <span className="text-xs uppercase tracking-wide text-white/70">{p.tag}</span> */}
                  <button
                    onClick={() => p.id === 'bevande' ? (window.location.href = '/bevande') : handleFakeDoor(p)}
                    className="justify-self-start md:justify-self-end px-5 py-3 rounded-2xl bg-white text-[#455D51] font-medium shadow hover:translate-y-0.5 transition"
                  >
                    Scopri di più →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="cta" className="scroll-mt-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <div className="rounded-3xl overflow-hidden bg-[#455D51]">
      <div className="grid md:grid-cols-2">
        {/* Colonna IMMAGINE: occupa tutta la metà sinistra */}
        <div className="relative min-h-[440px] md:min-h-[640px]">
          <img
            src="/partner.jpg"               // metti qui il tuo file (in /public)
            alt="Partner di filiera"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Colonna TESTO: spaziosa */}
        <div className="p-10 md:p-16 text-white flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl font-bold">
            Vuoi diventare partner di filiera?
          </h3>
          <p className="mt-4 text-white/85 text-lg leading-relaxed max-w-prose">
            Cerchiamo torrefazioni, bar e brand che vogliono trasformare uno scarto in
            opportunità concreta. Unisciti alla nostra rete e sviluppiamo insieme
            prodotti upcycled ad alto valore aggiunto.
          </p>
          <div className="mt-8">
            <button
              onClick={() => jumpAndHighlight('contatti')}
              className="px-5 py-3 rounded-2xl bg-white text-[#455D51] font-medium shadow hover:translate-y-0.5 transition"
            >
              Scrivici
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CONTACTS */}
      <section id="contatti" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-[#455D51]">Contatti</h2>
            <p className="mt-3 text-[#5F464B]">Parliamo del tuo caso d'uso o di una possibile collaborazione.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const payload = Object.fromEntries(fd.entries());
                // tentativo invio opzionale a un endpoint
                fetch("https://cc-web-service-9c1f.onrender.com/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product: "contact", ...payload }),
                }).catch(() => {});
                (e.currentTarget as HTMLFormElement).reset();
                alert("Grazie! Ti ricontatteremo al più presto.");
              }}
              className="mt-6 grid sm:grid-cols-2 gap-4"
            >
              <input name="name" required placeholder="Nome e Cognome*" className="px-4 py-3 rounded-xl bg-white border border-black/10" />
              <input name="email" required type="email" placeholder="Email*" className="px-4 py-3 rounded-xl bg-white border border-black/10" />
              <input name="phone" placeholder="Telefono" className="px-4 py-3 rounded-xl bg-white border border-black/10" />
              <input name="company" placeholder="Azienda" className="px-4 py-3 rounded-xl bg-white border border-black/10" />
              <textarea name="message" required placeholder="Messaggio*" rows={5} className="sm:col-span-2 px-4 py-3 rounded-xl bg-white border border-black/10" />

              {/* Flag privacy prima del pulsante invia */}
              <label className="sm:col-span-2 flex items-start gap-3 text-sm text-[#5F464B]">
              <input type="checkbox" name="privacyAccepted" required className="h-4 w-4" />
                <span>
                  Dichiaro di aver letto l' <a href="/privacy" className="underline" target="_blank" rel="noopener noreferrer">informativa privacy</a> e acconsento al trattamento dei dati per evadere la richiesta.
                </span>
              </label>

              <button className="sm:col-span-2 justify-self-start px-5 py-3 rounded-2xl bg-[#57992D] text-white font-medium shadow hover:translate-y-0.5 transition">
                Invia
              </button>
            </form>
          </div>
          <aside className="rounded-2xl p-6 bg-white border border-black/5 shadow">
            <p className="font-semibold text-[#684330]">Dati aziendali</p>
            <ul className="mt-3 text-sm text-[#5F464B] space-y-1">
              <li>
               <div className="display: flex">
                <img src="/logo_brown.svg" alt="Coffee Core" className="h-4 w-4 mr-1" /> 
                <strong>Coffee Core s.r.l. SB</strong>
              </div> 
              </li>
              <li>P.IVA: 02792950699</li>
              <li>Email: gabrieleciullo95@gmail.com</li>
              <li>Sede: Via Primo Mazzolari SNC, 66100 Chieti (presso il Parco Scientifico e Tecnologico d'Abruzzo)</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-[#5F464B] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Coffee Core — Upcycled by design.</p>
          <div className="flex gap-2">
          <a href="https://www.linkedin.com/company/coffeecore" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0A66C2] hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.73c0-1.13-.02-2.59-1.58-2.59-1.59 0-1.84 1.24-1.84 2.51v4.81h-3v-9h2.89v1.23h.04c.4-.76 1.37-1.56 2.83-1.56 3.03 0 3.59 2 3.59 4.59v4.74z"/>
              </svg>
              LinkedIn
              </a>
              <span>·</span>
              <a href="/privacy" className="underline decoration-dotted">Privacy</a>
            {/* <a href="#" className="underline decoration-dotted">Cookie</a> */}
          </div>
        </div>
      </footer>

      {/* MODAL: Fake Door */}
      {open && clickedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 grid place-items-center p-4" role="dialog" aria-modal>
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl border border-black/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#455D51]">{clickedProduct.name}</h3>
                <p className="text-sm text-[#5F464B] mt-1">Prodotto in arrivo: grazie per l'interesse!</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-xl bg-black/5 hover:bg-black/10">✕</button>
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-[#5F464B]">
                Stiamo raccogliendo i clic per dare priorità allo sviluppo. Lascia la tua email se vuoi essere tra i primi a provarlo.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  const email = String(fd.get("email") || "");
                  setSubmitting(true);
                  setSubmitMsg(null);
                  try {
                    const res = await fetch("https://cc-web-service-9c1f.onrender.com/api/notify", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ product: clickedProduct.id, email}),
                    });
                    if (res.ok) {
                      setSubmitMsg("Perfetto! Ti avviseremo appena disponibile.");
                    } else {
                      setSubmitMsg(null);
                      throw new Error("fail");
                    }
                  } catch (err) {
                    setSubmitMsg(null);
                    // show mailto fallback
                    const subject = encodeURIComponent(`Interesse: ${clickedProduct.name}`);
                    const body = encodeURIComponent("Vorrei saperne di più su questo prodotto quando sarà pronto.");
                    window.location.href = `mailto:gabrieleciullo95@gmail.com?subject=${subject}&body=${body}`;
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input name="email" type="email" required placeholder="La tua email" className="flex-1 px-4 py-3 rounded-xl bg-[#FBEFD9] border border-black/10" />
                <button disabled={submitting} className="px-5 py-3 rounded-2xl bg-[#57992D] text-white font-medium shadow disabled:opacity-60">
                  {submitting ? "Invio…" : "Avvisami"}
                </button>
              </form>
              {submitMsg && <p className="text-sm text-[#455D51]">{submitMsg}</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
