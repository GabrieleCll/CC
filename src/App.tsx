import CoffeeCoreSite from "./CoffeeCoreSite";
import PrivacyPage from "./PrivacyPage";
import ProductPage from "./ProductPage";
import CosmprofSurvey from "./cosmoprof_survey_gsheet.jsx";
import { findProductByPath } from "./products";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/privacy") return <PrivacyPage />;
  if (path === "/survey-cosmoprof") return <CosmprofSurvey />;

  // The "supercaffè" capsules were retired: send old links to the homepage.
  if (path === "/bevande") {
    window.location.replace("/");
    return null;
  }

  const product = findProductByPath(path);
  if (product) return <ProductPage product={product} />;

  return <CoffeeCoreSite />;
}

export default App;
