import { createContext, useContext } from "react";
import { it, type Dictionary } from "./it";
import { en } from "./en";
import { productBases, type Product } from "../products";

export type Locale = "it" | "en";

const dictionaries: Record<Locale, Dictionary> = { it, en };

const localizedProducts = Object.fromEntries(
  (Object.keys(dictionaries) as Locale[]).map((l) => [
    l,
    productBases.map((b) => ({ ...b, ...dictionaries[l].products[b.id] })),
  ]),
) as Record<Locale, Product[]>;

export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/en" || clean.startsWith("/en/")) {
    return { locale: "en", path: clean.slice(3) || "/" };
  }
  return { locale: "it", path: clean };
}

// Accepts "/", "/estratto-secco", "/#prodotti" and returns the same page in the given locale.
export function localizePath(path: string, locale: Locale) {
  if (locale === "it") return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

export const LocaleContext = createContext<Locale>("it");

export function useI18n() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: dictionaries[locale],
    products: localizedProducts[locale],
    href: (path: string) => localizePath(path, locale),
  };
}

/** Renders `**bold**` segments of a dictionary string as <strong>. */
export function rich(text: string, strongClassName?: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={strongClassName}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
