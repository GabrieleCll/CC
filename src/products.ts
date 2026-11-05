export type ProductId = "estratto-secco" | "olio" | "pellet";

export type Compound = {
  family: string;
  examples: string;
  benefits: string;
};

export type Product = {
  id: ProductId;
  path: string;
  eyebrow: string;
  category: string;
  name: string;
  tagline: string;
  intro: string;
  image: string;
  accent: string;
  highlights: { title: string; text: string }[];
  specs?: { label: string; value: string }[];
  specsNote?: string;
  compounds?: Compound[];
  applications: string[];
  orderUnit: string;
};

export const products: Product[] = [
  {
    id: "estratto-secco",
    path: "/estratto-secco",
    eyebrow: "Coffee Core Extract",
    category: "Cosmesi & nutraceutica",
    name: "Estratto secco",
    tagline: "Estratto secco ricco in polifenoli da fondi di caffè",
    intro:
      "Con il nostro processo brevettato a basso impatto energetico estraiamo polifenoli ad altissima efficacia dai residui di caffè post-espresso, non dal caffè verde, più costoso e in competizione con la filiera alimentare. Un processo in condizioni mild e senza solventi chimici aggressivi preserva l'integrità dei principi attivi e dà vita a un estratto secco standardizzato, premium e tracciabile.",
    image: "/img/extract-petri.webp",
    accent: "#57992D",
    highlights: [
      { title: "Antiossidante", text: "Polifenoli concentrati contro lo stress ossidativo e i radicali liberi." },
      { title: "SPF-boosting", text: "Melanoidine e acidi fenolici come filtro naturale a supporto dei filtri UV." },
      { title: "Anti-glicazione", text: "Previene la glicazione UV-indotta che irrigidisce collagene ed elastina." },
    ],
    specs: [
      { label: "Polifenoli totali", value: "36.65 mg/g GAE" },
      { label: "Umidità", value: "< 7%" },
      { label: "pH stabile", value: "4-9 · ottimale 7-9" },
      { label: "Dose d'uso", value: "0.5-3%" },
      { label: "Solubilità", value: "Idrosolubile e oil-dispersibile" },
      { label: "Shelf life", value: "24 mesi" },
      { label: "Origine", value: "Italia" },
    ],
    specsNote: "100% origine vegetale · Vegan · Non OGM · Biodegradabile",
    compounds: [
      {
        family: "Caffeina e Trigonellina",
        examples: "Alcaloidi tipici del caffè",
        benefits:
          "La caffeina stimola il microcircolo e favorisce la lipolisi: è l'attivo di riferimento nei trattamenti anticellulite e decongestionanti per il contorno occhi. La trigonellina idrata e condiziona la pelle, supportando la funzione barriera.",
      },
      {
        family: "Acidi clorogenici e neoclorogenici",
        examples: "Acido clorogenico (5-CQA), acido neoclorogenico (3-CQA)",
        benefits:
          "Tra gli antiossidanti naturali più potenti: neutralizzano i radicali liberi, contrastano il photo-aging indotto dai raggi UV, hanno azione lenitiva e contribuiscono a uniformare il tono della pelle.",
      },
      {
        family: "Acidi caffeici e ferulici",
        examples: "Acido caffeico, acido ferulico, metil caffeato",
        benefits:
          "Proteggono collagene ed elastina dallo stress ossidativo. L'acido ferulico stabilizza le vitamine C ed E nelle formule e ne potenzia l'efficacia fotoprotettiva; l'acido caffeico ha spiccata azione antinfiammatoria.",
      },
      {
        family: "Cumarine e derivati",
        examples: "4-idrossicumarina, 6,7-diidrossi-4-metilcumarina",
        benefits:
          "Composti antiossidanti con azione lenitiva e di supporto al microcircolo: ideali in formule drenanti, anti-gonfiore e per pelli sensibili.",
      },
      {
        family: "Esteri dell'acido chinico",
        examples: "Acidi cumaroilchinici e caffeoilchinici",
        benefits:
          "Rafforzano il profilo antiossidante complessivo dell'estratto, contribuiscono all'assorbimento della radiazione UV e aiutano a contrastare la glicazione, uno dei principali meccanismi dell'invecchiamento cutaneo.",
      },
    ],
    applications: [
      "Skin care e sieri anti-età",
      "Trattamenti anticellulite",
      "UV protection e SPF-boosting",
      "Contorno occhi",
      "Maschere viso",
      "Nutraceutica e functional food",
    ],
    orderUnit: "kg",
  },
  {
    id: "olio",
    path: "/olio",
    eyebrow: "Coffee Core Oil",
    category: "Cosmesi",
    name: "Olio di caffè",
    tagline: "Ingrediente sostenibile per la cosmesi",
    intro:
      "Dai fondi di caffè recuperiamo anche la frazione lipidica: un olio dal caratteristico colore ambrato, ricco di acidi grassi, fitosteroli e tocoferoli. Un ingrediente circolare e tracciabile che offre a skincare e haircare un'alternativa sostenibile agli oli vegetali ad alto impatto.",
    image: "/img/oil.webp",
    accent: "#684330",
    highlights: [
      { title: "Nutriente", text: "Acidi grassi essenziali che nutrono e ammorbidiscono pelle e capelli." },
      { title: "Protettivo", text: "Fitosteroli e tocoferoli supportano la barriera cutanea e contrastano l'ossidazione." },
      { title: "Circolare", text: "Recuperato dallo stesso fondo di caffè da cui otteniamo l'estratto secco." },
    ],
    applications: [
      "Oli e sieri viso",
      "Creme corpo ed emollienti",
      "Haircare e oli per capelli",
      "Balsami labbra",
      "Prodotti solari e after-sun",
    ],
    orderUnit: "litri",
  },
  {
    id: "pellet",
    path: "/pellet",
    eyebrow: "Coffee Core Pellet",
    category: "Energia",
    name: "Pellet da biomassa di caffè",
    tagline: "Energia e calore dal residuo solido",
    intro:
      "Dopo l'estrazione, il residuo solido dei fondi di caffè non diventa un rifiuto: lo trasformiamo in pellet di biomassa per la produzione di energia e calore. È l'ultimo anello del nostro processo a zero waste, che riduce l'impronta ambientale ed evita il conferimento in discarica e le relative emissioni di metano.",
    image: "/img/pellet.webp",
    accent: "#DE7C5A",
    highlights: [
      { title: "Alto potere calorifico", text: "I fondi di caffè sono una biomassa densa di energia, ideale per la combustione." },
      { title: "Zero waste", text: "Chiude il ciclo: ogni frazione del fondo di caffè viene valorizzata." },
      { title: "Tracciabile", text: "Materia prima raccolta da bar e torrefazioni italiane, con logistica tracciata." },
    ],
    applications: [
      "Caldaie e stufe a biomassa",
      "Riscaldamento civile e industriale",
      "Co-combustione con altre biomasse",
    ],
    orderUnit: "tonnellate",
  },
];

export const findProductByPath = (path: string) => products.find((p) => p.path === path);
