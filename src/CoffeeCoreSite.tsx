import { useEffect } from "react";
import {
  ArrowRight,
  Atom,
  Building2,
  Droplets,
  Factory,
  Flame,
  FlaskConical,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  Sun,
  Cloud,
} from "lucide-react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { products } from "./products";
import { sendNotify, warmUpApi } from "./api";

const impactStats = [
  { icon: Droplets, value: "130", unit: "litri d'acqua", note: "per ogni tazzina" },
  { icon: Cloud, value: "280", unit: "g di CO₂", note: "per ogni tazzina" },
  { icon: Flame, value: "16M", unit: "m³ di metano", note: "anno / bar italiani" },
];

const actives = [
  { icon: ShieldCheck, title: "Polifenoli", text: "Antiossidanti concentrati" },
  { icon: Sparkles, title: "Melanoidine", text: "Effetto anti-age" },
  { icon: Sun, title: "UV protection", text: "Filtro naturale" },
];

const steps = [
  { img: "/img/step-raccolta.webp", title: "Raccolta", text: "Fondi di caffè post-espresso da bar e torrefazioni, con logistica tracciata." },
  { img: "/img/step-estrazione.webp", title: "Estrazione", text: "Processo brevettato, mild e solvent free, a basso impatto energetico." },
  { img: "/img/step-formulazione.webp", title: "Formulazione", text: "Estratto secco standardizzato, olio e pellet: ogni frazione trova valore." },
];

const markets = [
  {
    icon: Sparkles,
    title: "Brand cosmetici",
    text: "Aziende vegan-friendly e green-oriented che cercano formule ricche di antiossidanti con claim di sostenibilità certificata.",
  },
  {
    icon: Leaf,
    title: "Nutraceutica",
    text: "Estratti ricchi di polifenoli per integratori e functional food, con tracciabilità completa della materia prima.",
  },
  {
    icon: Factory,
    title: "Torrefattori & raccolta",
    text: "Partnership con torrefattori e piattaforme di raccolta: riduci i costi di smaltimento e apri a uno storytelling green.",
  },
];

const institutions = [
  { src: "/img/logo-sapienza.webp", alt: "Sapienza Università di Roma" },
  { src: "/img/logo-pstda.webp", alt: "Parco Scientifico e Tecnologico d'Abruzzo" },
  { src: "/img/logo-unimi.webp", alt: "Università degli Studi di Milano" },
];

const inputClass = "px-4 py-3 rounded-xl bg-white border border-cc-brown/15 focus:outline-none focus:border-cc-green";

export default function CoffeeCoreSite() {
  useEffect(() => {
    warmUpApi();
  }, []);

  const jumpAndHighlight = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("cc-highlight");
    window.setTimeout(() => el.classList.remove("cc-highlight"), 650);
  };

  return (
    <main className="min-h-screen bg-cc-cream">
      <SiteHeader />

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden bg-cc-espresso text-white">
        <img src="/img/hero-beans.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-cc-espresso via-cc-espresso/80 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
          <div className="max-w-2xl">
            <p className="cc-eyebrow text-cc-sage">Upcycling · Zero waste · Made in Italy</p>
            <h1 className="mt-5 text-5xl sm:text-7xl font-extrabold leading-[1.02] tracking-tight">
              Diamo una seconda <span className="text-cc-sage">vita al caffè</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl leading-8 text-white/90">
              Coffee Core è una <strong>società benefit</strong> che trasforma i fondi di caffè in ingredienti premium e
              tracciabili per cosmesi, nutraceutica ed energia. Puntiamo allo <strong>zero waste</strong>: dal singolo fondo
              ricaviamo estratto secco, olio e pellet, senza lasciare nulla in discarica.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#prodotti" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-cc-green text-white font-semibold shadow-lg hover:bg-cc-forest transition-colors">
                Scopri i prodotti <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#partner" className="px-7 py-4 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
                Diventa partner di filiera
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTESTO */}
      <section id="contesto" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="cc-eyebrow text-cc-brown/70">Il contesto</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight text-cc-brown">
              Dal problema <br />
              <span className="font-light italic">all'opportunità</span>
            </h2>
            <p className="mt-6 text-lg leading-8">
              Ogni tazzina di caffè cela un costo nascosto per il Pianeta: <strong>grandi quantità d'acqua</strong>,
              emissioni di CO₂ e, soprattutto, tonnellate di fondi esausti che ogni anno finiscono in discarica,
              rilasciando <strong>16 milioni di m³ di metano</strong>.
            </p>
            <p className="mt-5 border-l-4 border-cc-green bg-white/60 py-4 pl-5 pr-4 leading-7">
              I consumatori premiano i marchi capaci di dimostrare <strong>sostenibilità lungo l'intera filiera</strong>.
              La cosmetica è chiamata a sostituire materie prime ad alto impatto con{" "}
              <strong>ingredienti tracciabili e circolari</strong>.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {impactStats.map(({ icon: Icon, value, unit, note }) => (
              <div key={unit} className="rounded-3xl bg-white p-5 sm:p-7 text-center shadow-sm border border-cc-brown/10">
                <Icon className="mx-auto h-8 w-8 text-cc-terracotta" />
                <p className="mt-4 text-3xl sm:text-5xl font-extrabold text-cc-brown">{value}</p>
                <p className="mt-2 text-[0.65rem] sm:text-xs font-bold uppercase tracking-wide text-cc-brown">{unit}</p>
                <p className="mt-1 text-xs">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECNOLOGIA */}
      <section id="tecnologia" className="scroll-mt-20 bg-cc-teal text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <p className="cc-eyebrow text-white/70">La nostra tecnologia</p>
              <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
                Dalla Natura, <br />
                <span className="font-light italic">il principio attivo</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/90">
                Estraiamo <strong className="text-white">polifenoli ad altissimo potere antiossidante</strong> direttamente dagli
                scarti di caffè, non dal caffè verde, più costoso e in competizione con la filiera alimentare. Un processo
                brevettato in condizioni mild preserva l'integrità dei principi attivi, garantendo concentrazioni record senza
                solventi chimici aggressivi.
              </p>
            </div>
            <div className="grid gap-5">
              <div className="grid grid-cols-3 gap-4">
                {actives.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-3xl bg-white/10 border border-white/20 p-5 text-center">
                    <Icon className="mx-auto h-8 w-8 text-cc-sage" />
                    <p className="mt-3 text-sm font-bold uppercase tracking-wide">{title}</p>
                    <p className="mt-1 text-xs text-white/75">{text}</p>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/10 border border-white/20 p-6">
                  <p className="flex items-center gap-2 font-bold uppercase tracking-wide">
                    <Recycle className="h-5 w-5 text-cc-sage" /> Zero waste
                  </p>
                  <p className="mt-3 text-white/85 leading-7">
                    Il residuo solido diventa <strong className="text-white">pellet di biomassa</strong> per energia e calore,
                    riducendo l'impronta ambientale.
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 border border-white/20 p-6">
                  <p className="flex items-center gap-2 font-bold uppercase tracking-wide">
                    <Leaf className="h-5 w-5 text-cc-sage" /> Solvent free
                  </p>
                  <p className="mt-3 text-white/85 leading-7">
                    <strong className="text-white">Nessun solvente chimico</strong> nel processo: sicurezza e purezza garantite
                    senza intaccare la qualità del prodotto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-3xl bg-cc-cream text-cc-plum overflow-hidden">
                <img src={s.img} alt="" className="h-52 w-full object-cover" />
                <div className="p-6">
                  <p className="flex items-baseline gap-3 text-cc-brown">
                    <span className="text-3xl font-extrabold text-cc-green">{i + 1}</span>
                    <span className="text-xl font-bold">{s.title}</span>
                  </p>
                  <p className="mt-2 leading-7">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODOTTI */}
      <section id="prodotti" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="cc-eyebrow text-cc-green">I nostri prodotti</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight text-cc-brown">
            Tripla soluzione <span className="text-cc-green">zero waste</span>
          </h2>
          <p className="mt-5 text-lg leading-8">
            Dallo stesso fondo di caffè nascono tre prodotti. Nessuna frazione viene scartata: ciò che non diventa
            ingrediente cosmetico diventa energia.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <a
              key={p.id}
              href={p.path}
              className="group flex flex-col rounded-[2rem] bg-white overflow-hidden border border-cc-brown/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-contain p-6 group-hover:scale-105 transition duration-500" />
                <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white" style={{ background: p.accent }}>
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-bold text-cc-brown">{p.name}</h3>
                <p className="mt-2 leading-7 flex-1">{p.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold" style={{ color: p.accent }}>
                  Scopri e ordina <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* MERCATO */}
      <section id="mercato" className="scroll-mt-20 bg-cc-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid lg:grid-cols-3 gap-10">
          <div>
            <p className="cc-eyebrow text-cc-brown/70">Il nostro mercato</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight text-cc-brown">A chi ci rivolgiamo</h2>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-5">
            {markets.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-white p-7 border-l-4 border-cc-straw shadow-sm">
                <Icon className="h-7 w-7 text-cc-green" />
                <h3 className="mt-4 text-lg font-bold text-cc-teal">{title}</h3>
                <p className="mt-2 leading-7 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D */}
      <section id="ricerca" className="scroll-mt-20 relative overflow-hidden bg-cc-night text-white">
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-cc-green/25 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="cc-eyebrow text-cc-sage">Ricerca & Sviluppo</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
              La nostra R&D <span className="text-cc-sage">non si ferma mai</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/85">
              Siamo sempre in esplorazione di nuovi modi per valorizzare al massimo i fondi di caffè. Insieme ai nostri
              partner universitari studiamo ogni frazione della materia prima per trasformarla in qualcosa di utile.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white/5 border border-white/15 p-8 sm:p-10">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cc-green">
                <Atom className="h-7 w-7" />
              </span>
              <p className="text-2xl font-bold">Verso il materiale grafenico</p>
            </div>
            <p className="mt-6 leading-8 text-white/85">
              Le proprietà dei fondi di caffè, <strong className="text-white">ricchi di cellulosa e carbonio</strong>, li
              rendono un candidato ideale per la produzione di <strong className="text-white">materiale grafenico</strong>:
              una nuova frontiera che apre l'upcycling del caffè a elettronica, accumulo di energia e materiali avanzati.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {["Cellulosa", "Carbonio", "Materiali avanzati"].map((t) => (
                <span key={t} className="rounded-full border border-white/25 px-4 py-1.5 text-white/85">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER DI FILIERA */}
      <section id="partner" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="rounded-[2.5rem] overflow-hidden bg-cc-forest">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[360px] md:min-h-[560px]">
              <img src="/partner.jpg" alt="Partner di filiera" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-10 md:p-16 text-white flex flex-col justify-center">
              <p className="cc-eyebrow text-cc-sage">Partner di filiera</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">Vuoi diventare partner di filiera?</h2>
              <p className="mt-5 text-white/85 text-lg leading-8 max-w-prose">
                Cerchiamo torrefazioni, bar e brand che vogliono trasformare uno scarto in opportunità concreta. Unisciti alla
                nostra rete: riduci i costi di smaltimento e sviluppiamo insieme prodotti upcycled ad alto valore aggiunto.
              </p>
              <ul className="mt-6 space-y-2 text-white/85">
                <li className="flex items-center gap-3"><Building2 className="h-5 w-5 text-cc-sage" /> Meno costi di smaltimento</li>
                <li className="flex items-center gap-3"><Recycle className="h-5 w-5 text-cc-sage" /> Uno storytelling green concreto</li>
                <li className="flex items-center gap-3"><FlaskConical className="h-5 w-5 text-cc-sage" /> Co-sviluppo di nuovi prodotti</li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={() => jumpAndHighlight("contatti")}
                  className="px-7 py-4 rounded-full bg-white text-cc-forest font-semibold shadow hover:bg-cc-cream transition-colors"
                >
                  Scrivici
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER ISTITUZIONALI */}
      <section className="border-y border-cc-brown/10 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="cc-eyebrow text-center text-cc-brown">I nostri partner</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            {institutions.map((i) => (
              <img key={i.alt} src={i.src} alt={i.alt} className="h-14 sm:h-16 w-auto object-contain mix-blend-multiply" />
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <p className="cc-eyebrow text-cc-green">Contatti</p>
            <h2 className="mt-3 text-4xl font-extrabold text-cc-brown">Parliamone</h2>
            <p className="mt-3 text-lg">Raccontaci il tuo caso d'uso o una possibile collaborazione.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
                sendNotify({
                  product: "contact",
                  email: payload.email,
                  name: payload.name,
                  phone: payload.phone,
                  company: payload.company,
                  message: payload.message,
                }).catch(() => {});
                form.reset();
                alert("Grazie! Ti ricontatteremo al più presto.");
              }}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              <input name="name" required placeholder="Nome e Cognome*" className={inputClass} />
              <input name="email" required type="email" placeholder="Email*" className={inputClass} />
              <input name="phone" placeholder="Telefono" className={inputClass} />
              <input name="company" placeholder="Azienda" className={inputClass} />
              <textarea name="message" required placeholder="Messaggio*" rows={5} className={`sm:col-span-2 ${inputClass}`} />

              <label className="sm:col-span-2 flex items-start gap-3 text-sm">
                <input type="checkbox" name="privacyAccepted" required className="mt-0.5 h-4 w-4" />
                <span>
                  Dichiaro di aver letto l'{" "}
                  <a href="/privacy" className="underline" target="_blank" rel="noopener noreferrer">informativa privacy</a> e
                  acconsento al trattamento dei dati per evadere la richiesta.
                </span>
              </label>

              <button className="sm:col-span-2 justify-self-start px-7 py-4 rounded-full bg-cc-green text-white font-semibold shadow hover:bg-cc-forest transition-colors">
                Invia
              </button>
            </form>
          </div>

          <aside className="self-start rounded-3xl bg-cc-brown p-8 text-white">
            <img src="/logo-light.svg" alt="" className="h-12 w-12" />
            <p className="mt-4 text-xl font-bold">Coffee Core s.r.l. SB</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              <li>P.IVA 02792950699</li>
              <li>
                <a href="mailto:info@coffeecore.it" className="underline decoration-white/30 hover:decoration-white">info@coffeecore.it</a>
              </li>
              <li>Via Primo Mazzolari snc, 66100 Chieti, presso il Parco Scientifico e Tecnologico d'Abruzzo</li>
            </ul>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
