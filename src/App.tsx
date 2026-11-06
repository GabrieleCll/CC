import CoffeeCoreSite from "./CoffeeCoreSite";
import PrivacyPage from "./PrivacyPage";
import ProductPage from "./ProductPage";
import CosmprofSurvey from "./cosmoprof_survey_gsheet.jsx";
import { findProductIdByPath } from "./products";
import { splitLocale } from "./i18n";
import LocaleProvider from "./i18n/LocaleProvider";

function App() {
  const { locale, path } = splitLocale(window.location.pathname);

  if (path === "/privacy") return <PrivacyPage />;
  if (path === "/survey-cosmoprof") return <CosmprofSurvey />;

  // The "supercaffè" capsules were retired: send old links to the homepage.
  if (path === "/bevande") {
    window.location.replace(locale === "en" ? "/en" : "/");
    return null;
  }

  const productId = findProductIdByPath(path);

  return (
    <LocaleProvider locale={locale}>
      {productId ? <ProductPage id={productId} /> : <CoffeeCoreSite />}
    </LocaleProvider>
  );
}

export default App;
