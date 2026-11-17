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
import { CountUp, Reveal } from "./components/Motion";
import { sendNotify, warmUpApi } from "./api";
import { rich, useI18n } from "./i18n";

const impactStats = [
  { icon: Droplets, value: 130, suffix: "" },
  { icon: Cloud, value: 280, suffix: "" },
  { icon: Flame, value: 16, suffix: "M" },
];

const activeIcons = [ShieldCheck, Sparkles, Sun];

const stepImages = ["/img/step-raccolta.webp", "/img/step-estrazione.webp", "/img/step-formulazione.webp"];

const marketIcons = [Sparkles, Leaf, Factory];

const partnerIcons = [Building2, Recycle, FlaskConical];

const institutions = [
  { src: "/img/logo-sapienza.webp", alt: "Sapienza Università di Roma" },
  { src: "/img/logo-pstda.webp", alt: "Parco Scientifico e Tecnologico d'Abruzzo" },
  { src: "/img/logo-unimi.webp", alt: "Università degli Studi di Milano" },
];

const inputClass = "px-4 py-3 rounded-xl bg-white border border-cc-brown/15 focus:outline-none focus:border-cc-green";

export default function CoffeeCoreSite() {
  const { t, products, href } = useI18n();
  const extract = products.find((p) => p.id === "estratto-secco")!;

  useEffect(() => {
    warmUpApi();
  }, []);

  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);

  const jumpAndHighlight = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("cc-highlight");
    window.setTimeout(() => el.classList.remove("cc-highlight"), 650);
  };

  return (
    <main className="min-h-screen bg-cc-cream overflow-x-clip">
      <SiteHeader />

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden bg-cc-espresso text-white">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] max-w-[64rem] overflow-hidden opacity-60 lg:opacity-100">
          <img
            src="/img/hero-beans.webp"
            alt=""
            className="h-full w-full object-cover object-[70%_40%] animate-[ccKenBurns_18s_ease-out_both] motion-reduce:animate-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cc-espresso via-cc-espresso/40 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cc-espresso/70 to-transparent" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[min(88vh,52rem)] py-16 sm:py-24 lg:py-32 flex items-center">
          <div className="max-w-2xl">
            <Reveal>
              <p className="cc-eyebrow text-cc-sage">{t.hero.eyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-5 text-5xl sm:text-7xl xl:text-8xl font-extrabold leading-[0.98] tracking-tight">
                {t.hero.titleA} <span className="font-light italic text-cc-sage">{t.hero.titleB}</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 text-lg sm:text-xl leading-8 text-white/85 max-w-xl">{rich(t.hero.body, "text-white")}</p>
            </Reveal>
            <Reveal delay={300} className="mt-10 flex flex-wrap gap-4">
              <a href="#prodotti" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-cc-green text-white font-semibold shadow-lg hover:bg-cc-forest transition-colors">
                {t.hero.ctaProducts} <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#partner" className="px-7 py-4 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
                {t.hero.ctaPartner}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROOF BAR */}
      <section className="bg-white border-b border-cc-brown/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row items-center gap-6 xl:gap-10">
          <p className="cc-eyebrow text-cc-brown/60 shrink-0">{t.proof.partners}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {institutions.map((i) => (
              <img key={i.alt} src={i.src} alt={i.alt} className="h-9 sm:h-10 w-auto object-contain" />
            ))}
          </div>
          <ul className="xl:ml-auto flex flex-wrap justify-center gap-2">
            {t.proof.claims.map((c) => (
              <li key={c} className="rounded-full border border-cc-green/40 px-3 py-1 text-xs font-semibold text-cc-forest">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTESTO */}
      <section id="contesto" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 items-end">
          <Reveal>
            <p className="cc-eyebrow text-cc-brown/70">{t.context.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-[1.02] tracking-tight text-cc-brown">
              {t.context.titleA} <br />
              <span className="font-light italic">{t.context.titleB}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg leading-8">{rich(t.context.body)}</p>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-16 grid grid-cols-3 border-y border-cc-brown/15 divide-x divide-cc-brown/15">
          {impactStats.map(({ icon: Icon, value, suffix }, i) => (
            <Reveal key={value} delay={i * 120} className="py-7 px-3 sm:py-10 sm:px-10 first:pl-0">
              <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-cc-terracotta" />
              <p className="mt-3 sm:mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-cc-brown">
                <CountUp to={value} suffix={suffix} />
              </p>
              <p className="mt-2 text-[0.7rem] sm:text-sm font-bold uppercase tracking-wide leading-tight text-cc-brown">{t.context.stats[i].unit}</p>
              <p className="mt-1 text-xs sm:text-sm">{t.context.stats[i].note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 max-w-3xl">
          <p className="text-xl sm:text-2xl font-light leading-9 text-cc-brown">{rich(t.context.quote, "font-bold")}</p>
        </Reveal>
      </section>

      {/* TECNOLOGIA */}
      <section id="tecnologia" className="scroll-mt-20 bg-cc-teal text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-14 items-end">
            <Reveal>
              <p className="cc-eyebrow text-white/70">{t.tech.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-[1.02] tracking-tight">
                {t.tech.titleA} <br />
                <span className="font-light italic">{t.tech.titleB}</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg leading-8 text-white/85">{rich(t.tech.body, "text-white")}</p>
            </Reveal>
          </div>

          <div className="mt-10 sm:mt-16 grid md:grid-cols-3 gap-6">
            {t.tech.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="group relative overflow-hidden rounded-[2rem]">
                <img src={stepImages[i]} alt="" className="h-80 w-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold text-cc-sage">{i + 1}</span>
                    <span className="text-2xl font-bold">{s.title}</span>
                  </p>
                  <p className="mt-2 text-white/85 leading-7">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 sm:mt-16 grid grid-cols-2 lg:grid-cols-5 gap-px overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-white/15">
            {t.tech.actives.map(({ title, text }, i) => {
              const Icon = activeIcons[i];
              return (
                <div key={title} className={`bg-cc-teal p-5 sm:p-7 ${i === 2 ? "col-span-2 lg:col-span-1" : ""}`}>
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-cc-sage" />
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base font-bold uppercase tracking-wide">{title}</p>
                  <p className="mt-1 text-sm text-white/75">{text}</p>
                </div>
              );
            })}
            <div className="col-span-2 lg:col-span-1 bg-cc-teal p-5 sm:p-7">
              <Recycle className="h-6 w-6 sm:h-7 sm:w-7 text-cc-sage" />
              <p className="mt-3 sm:mt-4 text-sm sm:text-base font-bold uppercase tracking-wide">{t.tech.zeroWaste.title}</p>
              <p className="mt-1 text-sm text-white/75">{rich(t.tech.zeroWaste.text, "text-white")}</p>
            </div>
            <div className="col-span-2 lg:col-span-1 bg-cc-teal p-5 sm:p-7">
              <Leaf className="h-6 w-6 sm:h-7 sm:w-7 text-cc-sage" />
              <p className="mt-3 sm:mt-4 text-sm sm:text-base font-bold uppercase tracking-wide">{t.tech.solventFree.title}</p>
              <p className="mt-1 text-sm text-white/75">{rich(t.tech.solventFree.text, "text-white")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRIPLA SOLUZIONE */}
      <section id="prodotti" className="scroll-mt-20 relative overflow-hidden bg-cc-night text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 md:pb-24">
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="cc-eyebrow text-cc-sage">{t.triple.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-[1.02] tracking-tight">
              {t.triple.titleA}
              <span className="block font-light italic text-cc-sage">{t.triple.titleB}</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">{t.triple.body}</p>
          </Reveal>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-[8rem] size-[max(90rem,130vw)] -translate-x-1/2 rounded-full bg-cc-green/90" aria-hidden />
            <div className="hidden md:block absolute left-1/2 top-[11rem] size-[max(90rem,130vw)] -translate-x-1/2 rounded-full bg-cc-cream" aria-hidden />
            <div
              className="md:hidden absolute -inset-x-4 sm:-inset-x-6 top-40 -bottom-16 rounded-t-[50%_4rem] bg-cc-cream shadow-[0_-1.25rem_0_0_rgba(87,153,45,0.9)]"
              aria-hidden
            />
            <Reveal delay={100} className="relative mx-auto mt-10 sm:mt-14 grid h-52 w-52 sm:h-64 sm:w-64 place-items-center rounded-full bg-cc-sand shadow-2xl">
              <p className="absolute top-7 cc-eyebrow text-cc-brown">{t.triple.center}</p>
              <img src="/img/grounds-pile.webp" alt={t.triple.center} className="w-4/5 mt-6 object-contain" />
            </Reveal>

            <svg className="hidden md:block -mt-10 h-24 w-full text-cc-brown/60" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" aria-hidden>
              {["M530 0 C 300 15, 200 45, 200 96", "M600 10 L 600 96", "M670 0 C 900 15, 1000 45, 1000 96"].map((d) => (
                <path key={d} d={d} stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>

            <div className="relative mt-12 md:mt-2 grid md:grid-cols-3 gap-14 md:gap-8">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={200 + i * 120} className={i === 1 ? "md:translate-y-16" : ""}>
                  <a href={href(p.path)} className="group flex flex-col items-center text-center">
                    <div
                      className="grid aspect-square w-52 sm:w-64 place-items-center rounded-full shadow-2xl ring-8 ring-cc-cream group-hover:scale-105 transition duration-500"
                      style={{ background: p.accent }}
                    >
                      <img src={p.image} alt={p.name} className="w-3/4 object-contain drop-shadow-xl" />
                    </div>
                    <p className="mt-6 cc-eyebrow" style={{ color: p.accent }}>{p.category}</p>
                    <h3 className="mt-2 text-2xl font-extrabold text-cc-brown">{p.name}</h3>
                    <p className="mt-2 max-w-xs leading-7 text-cc-plum">{p.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-semibold" style={{ color: p.accent }}>
                      {t.triple.discover} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCIENZA */}
      {extract.compounds && (
        <section id="scienza" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14">
            <Reveal>
              <p className="cc-eyebrow text-cc-green">{t.science.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-cc-brown">{t.science.title}</h2>
              <p className="mt-6 leading-8">{rich(t.science.body)}</p>
              <a href={href(extract.path)} className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-cc-brown text-white font-semibold hover:bg-cc-espresso transition-colors">
                {t.science.cta} <ArrowRight className="h-5 w-5" />
              </a>
            </Reveal>
            <ol className="border-t border-cc-brown/15">
              {extract.compounds.map((c, i) => (
                <Reveal as="li" key={c.family} delay={i * 80} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-cc-brown/15 py-6">
                  <span className="text-sm font-bold text-cc-green pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-cc-brown group-hover:text-cc-green transition-colors">{c.family}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide font-semibold text-cc-teal">{c.examples}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* MERCATO */}
      <section id="mercato" className="scroll-mt-20 bg-cc-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <Reveal>
            <p className="cc-eyebrow text-cc-brown/70">{t.market.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-[1.02] tracking-tight text-cc-brown">{t.market.title}</h2>
          </Reveal>
          <div className="mt-10 sm:mt-14 grid md:grid-cols-3 gap-10">
            {t.market.items.map(({ title, text }, i) => {
              const Icon = marketIcons[i];
              return (
                <Reveal key={title} delay={i * 120} className="border-t-2 border-cc-brown pt-8">
                  <Icon className="h-8 w-8 text-cc-green" />
                  <h3 className="mt-5 text-2xl font-bold text-cc-brown">{title}</h3>
                  <p className="mt-3 leading-7">{text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* R&D */}
      <section id="ricerca" className="scroll-mt-20 relative overflow-hidden bg-cc-espresso text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="cc-eyebrow text-cc-sage">{t.rd.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-[1.02] tracking-tight">
              {t.rd.titleA} <span className="font-light italic text-cc-sage">{t.rd.titleB}</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">{t.rd.body}</p>
          </Reveal>
          <Reveal delay={150} className="rounded-[2rem] bg-white/5 border border-white/15 p-8 sm:p-10 backdrop-blur">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cc-green">
                <Atom className="h-7 w-7" />
              </span>
              <p className="text-2xl font-bold">{t.rd.cardTitle}</p>
            </div>
            <p className="mt-6 leading-8 text-white/85">{rich(t.rd.cardBody, "text-white")}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {t.rd.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/25 px-4 py-1.5 text-white/85">{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTNER DI FILIERA */}
      <section id="partner" className="scroll-mt-20 relative overflow-hidden bg-cc-forest text-white">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] max-w-[64rem] overflow-hidden opacity-30 lg:opacity-100">
          <img src="/partner.jpg" alt="" className="h-full w-full object-cover object-[50%_35%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-cc-forest via-cc-forest/30 to-transparent" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-36">
          <Reveal className="max-w-xl">
            <p className="cc-eyebrow text-cc-sage">{t.partner.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">{t.partner.title}</h2>
            <p className="mt-6 text-white/85 text-lg leading-8">{t.partner.body}</p>
            <ul className="mt-6 space-y-2 text-white/85">
              {t.partner.bullets.map((b, i) => {
                const Icon = partnerIcons[i];
                return (
                  <li key={b} className="flex items-center gap-3"><Icon className="h-5 w-5 text-cc-sage" /> {b}</li>
                );
              })}
            </ul>
            <button
              onClick={() => jumpAndHighlight("contatti")}
              className="mt-10 px-7 py-4 rounded-full bg-white text-cc-forest font-semibold shadow hover:bg-cc-cream transition-colors"
            >
              {t.partner.cta}
            </button>
          </Reveal>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid md:grid-cols-3 gap-10">
          <Reveal className="md:col-span-2">
            <p className="cc-eyebrow text-cc-green">{t.contact.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-cc-brown">{t.contact.title}</h2>
            <p className="mt-3 text-lg">{t.contact.subtitle}</p>

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
                alert(t.contact.thanks);
              }}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              <input name="name" required placeholder={t.contact.name} className={inputClass} />
              <input name="email" required type="email" placeholder={t.contact.email} className={inputClass} />
              <input name="phone" placeholder={t.contact.phone} className={inputClass} />
              <input name="company" placeholder={t.contact.company} className={inputClass} />
              <textarea name="message" required placeholder={t.contact.message} rows={5} className={`sm:col-span-2 ${inputClass}`} />

              <label className="sm:col-span-2 flex items-start gap-3 text-sm">
                <input type="checkbox" name="privacyAccepted" required className="mt-0.5 h-4 w-4" />
                <span>
                  {t.contact.privacyBefore}
                  <a href="/privacy" className="underline" target="_blank" rel="noopener noreferrer">{t.contact.privacyLink}</a>
                  {t.contact.privacyAfter}
                </span>
              </label>

              <button className="sm:col-span-2 justify-self-start px-7 py-4 rounded-full bg-cc-green text-white font-semibold shadow hover:bg-cc-forest transition-colors">
                {t.contact.submit}
              </button>
            </form>
          </Reveal>

          <Reveal delay={150} className="self-start rounded-[2rem] bg-cc-brown p-8 text-white">
            <img src="/logo-light.svg" alt="" className="h-12 w-12" />
            <p className="mt-4 text-xl font-bold">Coffee Core s.r.l. SB</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              <li>P.IVA 02792950699</li>
              <li>
                <a href="mailto:info@coffeecore.it" className="underline decoration-white/30 hover:decoration-white">info@coffeecore.it</a>
              </li>
              <li>{t.contact.address}</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
