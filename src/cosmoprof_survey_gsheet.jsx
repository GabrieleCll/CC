import { useState, useEffect } from "react";

// ⚠️ INCOLLA QUI L'URL DEL TUO GOOGLE APPS SCRIPT DEPLOYMENT
// Esempio: "https://script.google.com/macros/s/AKfycbx.../exec"
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxE42pUtNEO6eaAbCOKMlp5Cv62M4phNkYK0MLST1QsAw4217rOYUG6msxANhexuKr2/exec";

const STEPS = [
  { id: "welcome", label: "Benvenuto" },
  { id: "profile", label: "Profilo" },
  { id: "needs", label: "Bisogni" },
  { id: "values", label: "Valori" },
  { id: "pricing", label: "Prodotto" },
  { id: "contact", label: "Contatto" },
  { id: "thanks", label: "Grazie" },
];

const AGE_RANGES = ["18–25", "26–35", "36–45", "46–55", "55+"];
const SKIN_TYPES = [
  { label: "Secca", icon: "🏜️" },
  { label: "Mista", icon: "🌤️" },
  { label: "Grassa", icon: "💧" },
  { label: "Sensibile", icon: "🌸" },
  { label: "Non so", icon: "🤷" },
];

const CONCERNS = [
  { label: "Invecchiamento e rughe", icon: "⏳" },
  { label: "Macchie e discromie", icon: "🔵" },
  { label: "Pelle spenta / opaca", icon: "😶" },
  { label: "Cellulite", icon: "🦵" },
  { label: "Protezione solare / UV", icon: "☀️" },
  { label: "Acne / imperfezioni", icon: "🔴" },
  { label: "Disidratazione", icon: "🥀" },
];

const NATURAL_SCALE = [
  { value: 1, label: "Poco importante" },
  { value: 2, label: "Abbastanza" },
  { value: 3, label: "Importante" },
  { value: 4, label: "Molto importante" },
  { value: 5, label: "Indispensabile" },
];

const UPCYCLE_OPTIONS = [
  { value: "yes_strong", label: "Sì, decisamente", icon: "💚" },
  { value: "yes_equal", label: "Sì, a parità di efficacia", icon: "👍" },
  { value: "indifferent", label: "Mi è indifferente", icon: "😐" },
  { value: "no", label: "No", icon: "👎" },
];

const PRICE_RANGES = ["Sotto 20€", "20–35€", "35–50€", "Oltre 50€"];

const INTEREST_OPTIONS = [
  { value: "yes", label: "Sì, assolutamente!", icon: "🤩" },
  { value: "maybe", label: "Forse, vorrei saperne di più", icon: "🤔" },
  { value: "no", label: "No, grazie", icon: "🙅" },
];

function CoffeePattern() {
  return (
    <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.03, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="beans" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <ellipse cx="20" cy="20" rx="8" ry="12" fill="#3E2723" transform="rotate(-30 20 20)" />
          <line x1="15" y1="14" x2="25" y2="26" stroke="#5D4037" strokeWidth="1" transform="rotate(-30 20 20)" />
          <ellipse cx="60" cy="55" rx="8" ry="12" fill="#3E2723" transform="rotate(20 60 55)" />
          <line x1="55" y1="49" x2="65" y2="61" stroke="#5D4037" strokeWidth="1" transform="rotate(20 60 55)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#beans)" />
    </svg>
  );
}

function ProgressBar({ current, total }) {
  const pct = (current / (total - 1)) * 100;
  return (
    <div style={{ width: "100%", height: 4, background: "#E8DDD3", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #5D4037, #8D6E63)", borderRadius: 2, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

function Chip({ selected, onClick, children, style: extraStyle }) {
  return (
    <button onClick={onClick} style={{
      padding: "10px 18px", borderRadius: 99,
      border: selected ? "2px solid #5D4037" : "2px solid #D7CCC8",
      background: selected ? "#5D4037" : "#FFFAF5",
      color: selected ? "#FFF" : "#4E342E",
      fontSize: 15, fontFamily: "'DM Sans', sans-serif",
      cursor: "pointer", transition: "all 0.2s ease",
      fontWeight: selected ? 600 : 400, ...extraStyle,
    }}>
      {children}
    </button>
  );
}

function CardOption({ selected, onClick, children, style: extraStyle }) {
  return (
    <button onClick={onClick} style={{
      padding: "14px 18px", borderRadius: 14,
      border: selected ? "2px solid #5D4037" : "2px solid #E8DDD3",
      background: selected ? "linear-gradient(135deg, #5D4037, #6D4C41)" : "#FFFAF5",
      color: selected ? "#FFF" : "#4E342E",
      fontSize: 15, fontFamily: "'DM Sans', sans-serif",
      cursor: "pointer", transition: "all 0.25s ease",
      fontWeight: selected ? 600 : 400,
      textAlign: "left", width: "100%",
      display: "flex", alignItems: "center", gap: 10, ...extraStyle,
    }}>
      {children}
    </button>
  );
}

function SliderScale({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      {options.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 16px", borderRadius: 12,
          border: value === opt.value ? "2px solid #5D4037" : "2px solid #E8DDD3",
          background: value === opt.value ? "#5D4037" : "#FFFAF5",
          color: value === opt.value ? "#FFF" : "#4E342E",
          cursor: "pointer", fontSize: 15, fontFamily: "'DM Sans', sans-serif",
          fontWeight: value === opt.value ? 600 : 400,
          transition: "all 0.2s ease", width: "100%",
        }}>
          <span style={{
            width: 28, height: 28, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: value === opt.value ? "rgba(255,255,255,0.2)" : "#E8DDD3",
            fontSize: 13, fontWeight: 700,
          }}>{opt.value}</span>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)",
        borderTopColor: "#FFF", borderRadius: "50%",
        animation: "ccSpin 0.7s linear infinite",
      }} />
      <style>{`@keyframes ccSpin { to { transform: rotate(360deg); } }`}</style>
      Invio in corso...
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  const bg = type === "error" ? "#C62828" : "#2E7D32";
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      padding: "12px 24px", borderRadius: 12, background: bg, color: "#FFF",
      fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)", zIndex: 9999,
      animation: "ccToastIn 0.3s ease", maxWidth: "90vw", textAlign: "center",
    }}>
      {type === "error" ? "⚠️" : "✅"} {message}
      <style>{`@keyframes ccToastIn { from { opacity:0; transform: translateX(-50%) translateY(12px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}

export default function CosmprofSurvey() {
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [data, setData] = useState({
    age: null, skinType: null, concerns: [], naturalImportance: null,
    upcycleInterest: null, priceRange: null, trialInterest: null,
    email: "", name: "",
  });

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Retry offline queue when connection returns
  useEffect(() => {
    const handleOnline = async () => {
      if (offlineQueue.length === 0) return;
      const queue = [...offlineQueue];
      setOfflineQueue([]);
      let sent = 0;
      for (const payload of queue) {
        try {
          await sendToSheet(payload);
          sent++;
        } catch {
          setOfflineQueue((q) => [...q, payload]);
        }
      }
      if (sent > 0) setToast({ message: `${sent} rispost${sent > 1 ? "e" : "a"} in coda inviat${sent > 1 ? "e" : "a"}!`, type: "success" });
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [offlineQueue]);

  const goTo = (dir) => {
    setFade(false);
    setTimeout(() => {
      setStep((s) => dir === "next" ? Math.min(s + 1, STEPS.length - 1) : Math.max(s - 1, 0));
      setFade(true);
    }, 250);
  };

  const toggleConcern = (label) => {
    setData((d) => ({
      ...d,
      concerns: d.concerns.includes(label) ? d.concerns.filter((c) => c !== label) : [...d.concerns, label],
    }));
  };

  const sendToSheet = async (payload) => {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL non configurato");
      return { status: "skipped" };
    }
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { status: "ok" };
  };

  const handleSubmit = async () => {
    setSending(true);
    const payload = { ...data };
    try {
      if (!navigator.onLine) {
        setOfflineQueue((q) => [...q, payload]);
        setSessionCount((c) => c + 1);
        setToast({ message: "Offline — risposta salvata, verrà inviata con la connessione", type: "success" });
      } else {
        await sendToSheet(payload);
        setSessionCount((c) => c + 1);
        setToast({ message: GOOGLE_SCRIPT_URL ? "Risposta salvata su Google Sheet!" : "Registrata (configura URL per Google Sheet)", type: "success" });
      }
      goTo("next");
    } catch (err) {
      console.error("Errore invio:", err);
      setOfflineQueue((q) => [...q, payload]);
      setSessionCount((c) => c + 1);
      setToast({ message: "Errore di rete — salvata in coda, verrà reinviata", type: "error" });
      goTo("next");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setData({
      age: null, skinType: null, concerns: [], naturalImportance: null,
      upcycleInterest: null, priceRange: null, trialInterest: null, email: "", name: "",
    });
    setFade(false);
    setTimeout(() => { setStep(0); setFade(true); }, 250);
  };

  const canProceed = () => {
    switch (STEPS[step].id) {
      case "welcome": return true;
      case "profile": return data.age && data.skinType;
      case "needs": return data.concerns.length > 0;
      case "values": return data.naturalImportance && data.upcycleInterest;
      case "pricing": return data.priceRange && data.trialInterest;
      case "contact": return true;
      default: return true;
    }
  };

  const sty = {
    sectionTitle: {
      fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600,
      color: "#3E2723", marginBottom: 14, marginTop: 0, lineHeight: 1.35,
    },
    input: {
      width: "100%", padding: "14px 16px", borderRadius: 12,
      border: "2px solid #D7CCC8", background: "#FFFAF5", fontSize: 15,
      fontFamily: "'DM Sans', sans-serif", color: "#3E2723",
      outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
    },
  };

  const btnEnabled = canProceed() && !sending;
  const btnPrimary = {
    padding: "14px 32px", borderRadius: 99, border: "none",
    background: btnEnabled ? "linear-gradient(135deg, #5D4037, #4E342E)" : "#BCAAA4",
    color: "#FFF", fontSize: 16, fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600, cursor: btnEnabled ? "pointer" : "not-allowed",
    transition: "all 0.3s ease", opacity: btnEnabled ? 1 : 0.6,
    minWidth: 140, display: "flex", alignItems: "center", justifyContent: "center",
  };

  const isFirst = step === 0;
  const isLast = STEPS[step].id === "thanks";
  const isSubmit = STEPS[step].id === "contact";

  const renderStep = () => {
    switch (STEPS[step].id) {
      case "welcome":
        return (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 56 }}>☕</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#3E2723", lineHeight: 1.2, margin: 0 }}>Coffee Core</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#6D4C41", lineHeight: 1.6, maxWidth: 340, margin: 0 }}>
              Aiutaci a capire le tue esigenze in tema di skincare e antiossidanti naturali.<br /><br /><strong>Bastano 60 secondi!</strong>
            </p>
            <div style={{ marginTop: 8, padding: "10px 20px", borderRadius: 10, background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)", border: "1px solid #C8E6C9", fontSize: 13, color: "#33691E", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
              🌱 Polifenoli antiossidanti estratti dai fondi di caffè — economia circolare per la tua pelle
            </div>
          </div>
        );

      case "profile":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h2 style={sty.sectionTitle}>Qual è la tua fascia d'età?</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {AGE_RANGES.map((a) => <Chip key={a} selected={data.age === a} onClick={() => setData((d) => ({ ...d, age: a }))}>{a}</Chip>)}
              </div>
            </div>
            <div>
              <h2 style={sty.sectionTitle}>Come descriveresti la tua pelle?</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SKIN_TYPES.map((s) => <CardOption key={s.label} selected={data.skinType === s.label} onClick={() => setData((d) => ({ ...d, skinType: s.label }))}><span style={{ fontSize: 20 }}>{s.icon}</span> {s.label}</CardOption>)}
              </div>
            </div>
          </div>
        );

      case "needs":
        return (
          <div>
            <h2 style={sty.sectionTitle}>Quali sono le tue principali preoccupazioni per la pelle?</h2>
            <p style={{ fontSize: 13, color: "#8D6E63", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Seleziona tutte quelle che ti riguardano</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CONCERNS.map((c) => <CardOption key={c.label} selected={data.concerns.includes(c.label)} onClick={() => toggleConcern(c.label)}><span style={{ fontSize: 20 }}>{c.icon}</span> {c.label}</CardOption>)}
            </div>
          </div>
        );

      case "values":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h2 style={sty.sectionTitle}>Quanto è importante per te che un cosmetico contenga ingredienti naturali?</h2>
              <SliderScale value={data.naturalImportance} onChange={(v) => setData((d) => ({ ...d, naturalImportance: v }))} options={NATURAL_SCALE} />
            </div>
            <div>
              <h2 style={sty.sectionTitle}>Sceglieresti un prodotto sapendo che il suo principio attivo deriva dal recupero dei fondi di caffè?</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {UPCYCLE_OPTIONS.map((o) => <CardOption key={o.value} selected={data.upcycleInterest === o.value} onClick={() => setData((d) => ({ ...d, upcycleInterest: o.value }))}><span style={{ fontSize: 20 }}>{o.icon}</span> {o.label}</CardOption>)}
              </div>
            </div>
          </div>
        );

      case "pricing":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h2 style={sty.sectionTitle}>Per un siero viso antiossidante naturale e sostenibile, quale prezzo ritieni ragionevole?</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PRICE_RANGES.map((p) => <Chip key={p} selected={data.priceRange === p} onClick={() => setData((d) => ({ ...d, priceRange: p }))} style={{ flex: "1 1 40%", textAlign: "center" }}>{p}</Chip>)}
              </div>
            </div>
            <div>
              <h2 style={sty.sectionTitle}>Ti piacerebbe provare un cosmetico a base di polifenoli estratti dal caffè?</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {INTEREST_OPTIONS.map((o) => <CardOption key={o.value} selected={data.trialInterest === o.value} onClick={() => setData((d) => ({ ...d, trialInterest: o.value }))}><span style={{ fontSize: 20 }}>{o.icon}</span> {o.label}</CardOption>)}
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={sty.sectionTitle}>Vuoi rimanere aggiornato/a?</h2>
            <p style={{ fontSize: 14, color: "#6D4C41", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              Lascia il tuo nome e la tua email per ricevere aggiornamenti e anteprime sui nostri prodotti. <em>(opzionale)</em>
            </p>
            <input type="text" placeholder="Il tuo nome" value={data.name} onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))} style={sty.input} />
            <input type="email" placeholder="La tua email" value={data.email} onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))} style={sty.input} />
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FFF3E0", border: "1px solid #FFE0B2", fontSize: 12, color: "#E65100", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
              🔒 I tuoi dati saranno utilizzati esclusivamente per comunicazioni relative ai prodotti Coffee Core e non saranno condivisi con terzi.
            </div>
          </div>
        );

      case "thanks":
        return (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 64 }}>🌿</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#3E2723", margin: 0 }}>Grazie!</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#6D4C41", lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
              Le tue risposte sono preziose per aiutarci a creare i prodotti che desideri davvero.
            </p>
            <div style={{ marginTop: 8, padding: "14px 20px", borderRadius: 12, background: "linear-gradient(135deg, #EFEBE9, #FFF8E1)", fontSize: 13, color: "#5D4037", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
              ☕ Vieni a scoprire il nostro processo di estrazione dei polifenoli dal caffè nel nostro stand!
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
              <div style={{ padding: "8px 14px", borderRadius: 8, background: "#E8F5E9", fontSize: 13, color: "#2E7D32", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                ✅ Inviate: {sessionCount}
              </div>
              {offlineQueue.length > 0 && (
                <div style={{ padding: "8px 14px", borderRadius: 8, background: "#FFF3E0", fontSize: 13, color: "#E65100", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                  ⏳ In coda: {offlineQueue.length}
                </div>
              )}
            </div>
            <button onClick={handleReset} style={{
              padding: "14px 32px", borderRadius: 99, border: "none",
              background: "linear-gradient(135deg, #5D4037, #8D6E63)",
              color: "#FFF", fontSize: 16, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, cursor: "pointer", marginTop: 12,
            }}>
              Nuovo questionario →
            </button>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(180deg, #FFF8F0 0%, #EFEBE9 100%)",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      padding: "24px 16px", fontFamily: "'DM Sans', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <CoffeePattern />
      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

        {/* Connection indicator */}
        {!isLast && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginBottom: 8, fontSize: 11, color: "#8D6E63", fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: GOOGLE_SCRIPT_URL ? (navigator.onLine ? "#4CAF50" : "#FF9800") : "#BDBDBD" }} />
            {!GOOGLE_SCRIPT_URL ? "Google Sheet non configurato" : navigator.onLine ? "Google Sheet connesso" : "Offline — salvataggio locale"}
          </div>
        )}

        {/* Progress */}
        {!isLast && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#8D6E63", fontWeight: 500 }}>{step > 0 ? `${step} / ${STEPS.length - 2}` : ""}</span>
              <span style={{ fontSize: 12, color: "#8D6E63", fontWeight: 500 }}>COSMOPROF 2026</span>
            </div>
            {step > 0 && <ProgressBar current={step} total={STEPS.length - 1} />}
          </div>
        )}

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)",
          borderRadius: 20, padding: "28px 22px",
          boxShadow: "0 4px 24px rgba(62,39,35,0.08)",
          border: "1px solid rgba(215,204,200,0.5)",
          opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.25s ease", minHeight: 300,
        }}>
          {renderStep()}
        </div>

        {/* Navigation */}
        {!isLast && (
          <div style={{ display: "flex", justifyContent: step > 0 ? "space-between" : "center", marginTop: 20, gap: 12 }}>
            {step > 0 && (
              <button onClick={() => goTo("back")} disabled={sending} style={{
                padding: "12px 24px", borderRadius: 99, border: "2px solid #D7CCC8",
                background: "transparent", color: "#5D4037", fontSize: 15,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.5 : 1,
              }}>
                ← Indietro
              </button>
            )}
            <button onClick={isSubmit ? handleSubmit : () => goTo("next")} disabled={!btnEnabled} style={btnPrimary}>
              {sending ? <Spinner /> : isFirst ? "Iniziamo! ☕" : isSubmit ? "Invia ✓" : "Avanti →"}
            </button>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
