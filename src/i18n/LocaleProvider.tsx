import { useEffect, type ReactNode } from "react";
import { LocaleContext, useI18n, type Locale } from ".";

function MetaSync() {
  const { locale, t } = useI18n();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [locale, t]);
  return null;
}

export default function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <LocaleContext.Provider value={locale}>
      <MetaSync />
      {children}
    </LocaleContext.Provider>
  );
}
