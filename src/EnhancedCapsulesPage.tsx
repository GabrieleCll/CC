import { useEffect, useState } from "react";

export default function EnhancedCapsulesPage() {
  const [revealImg, setRevealImg] = useState(false);

  useEffect(() => {
    // Rispetta preferenze di ridotta animazione
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setRevealImg(true), reduce ? 0 : 200); // trigger dopo 200ms
    return () => clearTimeout(t);
  }, []);
  return (
    <main className="min-h-screen bg-[#FBEFD9]" style={{ fontFamily: "Montserrat, ui-sans-serif, system-ui" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');`}</style>

      {/* HEADER MINI */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Coffee Core" className="h-8 w-8 rounded-2xl" />
            <span className="text-xl font-bold tracking-tight text-[#684330]">Coffee Core</span>
          </a>
          <a href="/" className="text-sm underline decoration-dotted">← Torna al sito</a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Mockup / immagine */}
          <div className="relative overflow-hidden">
            <img
              src="/enhanced-mockup.png"
              alt="Mockup capsule Enhanced"
              style={{ willChange: "transform, opacity" }}
              className={[
                "w-full h-full object-cover",
                "transition-all duration-700 ease-out",
                revealImg ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              ].join(" ")}
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#455D51] leading-tight">
              Capsule espresso “Enhanced”<br/>con antiossidanti upcycled
            </h1>
            <p className="mt-5 text-lg text-[#5F464B]">
              Espresso top di gamma. In più, antiossidanti <em>upcycled</em> dal caffè.
            </p>

            <ul className="mt-6 space-y-2 text-[#455D51]">
              <li>• Caffè selezionato, tostato in Italia</li>
              <li>• Antiossidanti da sottoprodotti di caffè (upcycling)</li>
              <li>• Compatibili Nespresso®*</li>
            </ul>

            {/* Prezzo + CTA (smoke test) */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // ✓ capisco quale bottone ha inviato il form
                const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
                const onlyInfo = submitter?.value === "notify" ? true : false;

                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const payload = Object.fromEntries(fd.entries());
                try {
                  const res = await fetch("https://cc-web-service-9c1f.onrender.com/api/pre-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                      email: payload.email,
                      cap: payload.cap,
                      price: payload.price,
                      onlyInfo: onlyInfo
                    }),
                  });

                  if (!res.ok) throw new Error(String(res.status));

                  (e.currentTarget as HTMLFormElement).reset();

                  alert(
                    !onlyInfo
                    ? "Grazie! Abbiamo registrato il pre-ordine; ti avviseremo non appena il prodotto sarà disponibile."
                    : "Grazie! Ti avviseremo non appena il prodotto sarà disponibile."
                  );
                } catch {
                  alert("Ops, non siamo riusciti a inviare la richiesta. Riprova più tardi.");
                }
              }}
              className="mt-8 grid gap-4 max-w-md"
            >
              <fieldset className="rounded-2xl bg-white border border-black/10 p-4">
                <legend className="text-sm font-medium text-[#455D51]">Pacchetti</legend>
                <div className="mt-3 grid gap-3 text-sm">
                  <label className="flex items-center gap-2"><input type="radio" name="price" value="0.60" defaultChecked /> €6,00 (10 capsule)</label>
                  <label className="flex items-center gap-2"><input type="radio" name="price" value="0.45" /> €9,00 (20 capsule)</label>
                  <label className="flex items-center gap-2"><input type="radio" name="price" value="0.35" /> €17,50 (50 capsule)</label>
                </div>
              </fieldset>

              <input name="email" type="email" required placeholder="Email" className="px-4 py-3 rounded-xl bg-white border border-black/10" />
              <input name="cap" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="CAP (opzionale)" className="px-4 py-3 rounded-xl bg-white border border-black/10" />

              {/* Privacy flag */}
              <label className="flex items-start gap-3 text-sm text-[#5F464B]">
                <input type="checkbox" required className="mt-1 h-4 w-4" />
                <span>Dichiaro di aver letto l’<a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">informativa privacy</a>.</span>
              </label>

              <div className="flex gap-3">
                <button type="submit"
                        name="intent"
                        value="preorder"
                        className="px-5 py-3 rounded-2xl bg-[#57992D] text-white font-medium shadow hover:translate-y-0.5 transition">
                  Pre-ordina ora
                </button>
                <button type="submit"
                        name="intent"
                        value="notify"
                        className="px-5 py-3 rounded-2xl bg-white text-[#3B7080] border border-[#3B7080]/20 font-medium shadow"
                  onClick={() => alert('Grazie! Ti avviseremo al lancio.')}
                >
                  Avvisami al lancio
                </button>
              </div>

              <p className="text-xs text-[#5F464B]">
                *Nessuna indicazione di beneficio per la salute. Compatibilità con sistemi Nespresso® non affiliata al marchio. 
                Info su ingredienti e allergeni nell’etichetta.
              </p>
            </form>
          </div>

        </div>

        {/* Come funziona */}
        <div className="mt-14 rounded-3xl bg-white/70 border border-black/5 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#455D51]">Come funziona</h2>
          <ol className="mt-4 list-decimal ml-6 space-y-2 text-[#5F464B]">
            <li>Recuperiamo sottoprodotti del caffè → estraiamo frazioni antiossidanti → le re-integriamo.</li>
            <li>Nessun retrogusto aggiunto.</li>
            <li>Trasparenza: recuperiamo X g di sottoprodotto / 10 capsule.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
