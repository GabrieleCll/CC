import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Product } from "../products";
import { sendNotify } from "../api";

type Props = {
  product: Product;
  onClose: () => void;
};

const inputClass = "w-full px-4 py-3 rounded-xl bg-cc-cream border border-cc-brown/15 focus:outline-none focus:border-cc-green";

export default function OrderModal({ product, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const message = [
      `Richiesta d'ordine: ${product.name}`,
      `Quantità: ${get("quantity") || "-"} ${product.orderUnit}`,
      `Note: ${get("notes") || "-"}`,
    ].join("\n");

    setStatus("sending");
    try {
      const res = await sendNotify({
        product: `ordine-${product.id}`,
        email: get("email"),
        name: get("name"),
        phone: get("phone"),
        company: get("company"),
        message,
      });
      if (!res.ok) throw new Error("notify failed");
      setStatus("sent");
    } catch {
      setStatus("idle");
      const subject = encodeURIComponent(`Ordine: ${product.name}`);
      window.location.href = `mailto:info@coffeecore.it?subject=${subject}&body=${encodeURIComponent(message)}`;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal
      aria-labelledby="order-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="cc-eyebrow" style={{ color: product.accent }}>Ordina</p>
            <h3 id="order-title" className="mt-1 text-2xl font-bold text-cc-brown">{product.name}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-black/5 hover:bg-black/10" aria-label="Chiudi">
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "sent" ? (
          <div className="mt-6 space-y-4">
            <p className="text-cc-forest">
              Grazie! Abbiamo ricevuto la tua richiesta: ti ricontatteremo a breve con disponibilità, prezzi e scheda tecnica.
            </p>
            <button onClick={onClose} className="px-6 py-3 rounded-full bg-cc-green text-white font-semibold">
              Chiudi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
            <p className="text-sm text-cc-plum">
              Compila il modulo: ti invieremo un'offerta dedicata con disponibilità, prezzi e scheda tecnica.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <input name="name" required placeholder="Nome e Cognome*" className={inputClass} />
              <input name="company" required placeholder="Azienda*" className={inputClass} />
              <input name="email" type="email" required placeholder="Email*" className={inputClass} />
              <input name="phone" placeholder="Telefono" className={inputClass} />
            </div>
            <input
              name="quantity"
              placeholder={`Quantità indicativa (${product.orderUnit})`}
              className={inputClass}
            />
            <textarea name="notes" rows={3} placeholder="Note (applicazione, tempistiche, campionatura…)" className={inputClass} />
            <label className="flex items-start gap-3 text-sm text-cc-plum">
              <input type="checkbox" required className="mt-1 h-4 w-4" />
              <span>
                Dichiaro di aver letto l'
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">informativa privacy</a>.
              </span>
            </label>
            <button
              disabled={status === "sending"}
              className="mt-2 justify-self-start px-7 py-3 rounded-full bg-cc-green text-white font-semibold shadow hover:bg-cc-forest transition-colors disabled:opacity-60"
            >
              {status === "sending" ? "Invio…" : "Invia richiesta d'ordine"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
