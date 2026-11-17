import type { ProductId } from "../products";

export type ProductText = {
  eyebrow: string;
  category: string;
  name: string;
  tagline: string;
  intro: string;
  highlights: { title: string; text: string }[];
  specs?: { label: string; value: string }[];
  specsNote?: string;
  compounds?: { family: string; examples: string; benefits: string }[];
  applications: string[];
  orderUnit: string;
};

export const it = {
  meta: {
    title: "Coffee Core — Diamo una seconda vita al caffè",
    description:
      "Coffee Core trasforma i fondi di caffè in ingredienti premium per la cosmesi, olio e pellet di biomassa. Upcycling a zero waste.",
  },
  nav: {
    tech: "Tecnologia",
    products: "Prodotti",
    rd: "R&D",
    partner: "Partner",
    contactCta: "Contattaci",
    contacts: "Contatti",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    language: "Lingua",
  },
  hero: {
    eyebrow: "Upcycling · Zero waste · Made in Italy",
    titleA: "Diamo una seconda",
    titleB: "vita al caffè",
    body: "Coffee Core è una **società benefit** che vede nel fondo di caffè una risorsa preziosa. Con una tecnologia brevettata ne ricaviamo **ingredienti premium e tracciabili** per la cosmetica, la nutraceutica, l'alimentare e **nuovi materiali per l'industria**. Il nostro obiettivo è lo **zero waste**: ogni frazione trova valore, niente finisce in discarica.",
    ctaProducts: "Scopri i prodotti",
    ctaPartner: "Diventa partner di filiera",
  },
  proof: {
    partners: "I nostri partner",
    claims: ["Processo brevettato", "Solvent free", "Zero waste", "Made in Italy"],
  },
  context: {
    eyebrow: "Il contesto",
    titleA: "Dal problema",
    titleB: "all'opportunità",
    body: "Ogni tazzina di caffè cela un costo nascosto per il Pianeta: **grandi quantità d'acqua**, emissioni di CO₂ e, soprattutto, tonnellate di fondi esausti che ogni anno finiscono in discarica, rilasciando **16 milioni di m³ di metano**.",
    stats: [
      { unit: "litri d'acqua", note: "per ogni tazzina" },
      { unit: "g di CO₂", note: "per ogni tazzina" },
      { unit: "m³ di metano", note: "anno / bar italiani" },
    ],
    quote:
      "I consumatori premiano i marchi capaci di dimostrare **sostenibilità lungo l'intera filiera**. La cosmetica è chiamata a sostituire materie prime ad alto impatto con **ingredienti tracciabili e circolari**.",
  },
  tech: {
    eyebrow: "La nostra tecnologia",
    titleA: "Dalla Natura,",
    titleB: "il principio attivo",
    body: "Estraiamo **polifenoli ad alto potere antiossidante** direttamente dai residui di caffè, non dal caffè verde, più costoso e in competizione con la filiera alimentare. Un processo brevettato in condizioni mild preserva l'integrità dei principi attivi, garantendo elevate concentrazioni senza solventi chimici aggressivi.",
    steps: [
      { title: "Raccolta", text: "Fondi di caffè post-espresso da torrefazioni e partner di filiera, con logistica tracciata." },
      { title: "Estrazione", text: "Processo brevettato, mild e solvent free, a basso impatto energetico." },
      { title: "Formulazione", text: "Estratto secco standardizzato, olio e pellet: ogni frazione trova valore." },
    ],
    actives: [
      { title: "Polifenoli", text: "Antiossidanti concentrati" },
      { title: "Melanoidine", text: "Effetto anti-age" },
      { title: "UV protection", text: "Filtro naturale" },
    ],
    zeroWaste: {
      title: "Zero waste",
      text: "Il residuo solido diventa **pellet di biomassa** per energia e calore, riducendo l'impronta ambientale.",
    },
    solventFree: {
      title: "Solvent free",
      text: "**Nessun solvente chimico** nel processo: sicurezza e purezza garantite senza intaccare la qualità del prodotto.",
    },
  },
  triple: {
    eyebrow: "I nostri prodotti",
    titleA: "Tripla soluzione",
    titleB: "zero waste",
    body: "Dallo stesso fondo di caffè nascono tre prodotti. Nessuna frazione viene scartata: ciò che non diventa ingrediente cosmetico diventa energia.",
    center: "Fondi di caffè",
    discover: "Scopri e ordina",
  },
  science: {
    eyebrow: "Caratterizzazione scientifica",
    title: "Cosa c'è dentro il nostro estratto",
    body: "In collaborazione con l'**Università degli Studi di Milano** abbiamo caratterizzato i nostri estratti con un'analisi metabolomica untargeted in **HPLC-HRMS**.",
    bodyMore:
      "I composti più abbondanti appartengono alle famiglie bioattive tipiche del caffè, in accordo con la letteratura scientifica più recente.",
    cta: "Scopri l'estratto secco",
  },
  market: {
    eyebrow: "Il nostro mercato",
    title: "A chi ci rivolgiamo",
    items: [
      {
        title: "Brand cosmetici",
        text: "Aziende vegan-friendly e green-oriented che cercano formule ricche di antiossidanti con claim di sostenibilità certificata.",
      },
      {
        title: "Nutraceutica",
        text: "Estratti ricchi di polifenoli per integratori e functional food, con tracciabilità completa della materia prima.",
      },
      {
        title: "Torrefattori & raccolta",
        text: "Partnership con torrefattori e piattaforme di raccolta: riduci i costi di smaltimento e apri a uno storytelling green.",
      },
    ],
  },
  rd: {
    eyebrow: "Ricerca & Sviluppo",
    titleA: "La nostra R&D",
    titleB: "non si ferma mai",
    body: "Siamo sempre in esplorazione di nuovi modi per valorizzare al massimo i fondi di caffè. Insieme ai nostri partner universitari studiamo ogni frazione della materia prima per trasformarla in qualcosa di utile.",
    cardTitle: "Verso il materiale grafenico",
    cardBody:
      "Le proprietà dei fondi di caffè, **ricchi di cellulosa e carbonio**, li rendono un candidato ideale per la produzione di **materiale grafenico**: una nuova frontiera che apre l'upcycling del caffè a elettronica, accumulo di energia e materiali avanzati.",
    tags: ["Cellulosa", "Carbonio", "Materiali avanzati"],
  },
  partner: {
    eyebrow: "Partner di filiera",
    title: "Vuoi diventare partner di filiera?",
    body: "Cerchiamo torrefazioni e brand che vogliono trasformare uno scarto in opportunità concreta. Unisciti alla nostra rete: riduci i costi di smaltimento e sviluppiamo insieme prodotti upcycled ad alto valore aggiunto.",
    bullets: ["Meno costi di smaltimento", "Uno storytelling green concreto", "Co-sviluppo di nuovi prodotti"],
    cta: "Scrivici",
  },
  contact: {
    eyebrow: "Contatti",
    title: "Parliamone",
    subtitle: "Raccontaci il tuo caso d'uso o una possibile collaborazione.",
    name: "Nome e Cognome*",
    email: "Email*",
    phone: "Telefono",
    company: "Azienda",
    message: "Messaggio*",
    privacyBefore: "Dichiaro di aver letto l'",
    privacyLink: "informativa privacy",
    privacyAfter: " e acconsento al trattamento dei dati per evadere la richiesta.",
    submit: "Invia",
    thanks: "Grazie! Ti ricontatteremo al più presto.",
    address: "Via Primo Mazzolari snc, 66100 Chieti, presso il Parco Scientifico e Tecnologico d'Abruzzo",
  },
  footer: {
    tagline: "Diamo una seconda vita al caffè: dal fondo esausto a ingredienti premium, tracciabili e a zero waste.",
    products: "Prodotti",
    contacts: "Contatti",
    address: "Via Primo Mazzolari snc, 66100 Chieti (CH)",
    privacy: "Privacy",
  },
  productPage: {
    allProducts: "Tutti i prodotti",
    order: "Ordina",
    requestDatasheet: "Richiedi la scheda tecnica",
    specs: "Specifiche",
    applications: "Applicazioni",
    performance: "Performance scientifica",
    sameSourceTitle: "Dalla stessa materia prima",
    sameSourceBody:
      "Ogni lotto nasce da fondi di caffè post-espresso raccolti presso torrefazioni e partner di filiera italiani. Lo stesso fondo alimenta l'intera filiera Coffee Core: estratto secco, olio e pellet, senza scarti.",
    sameSourceNote: "Scheda tecnica e campionatura disponibili su richiesta.",
    orderNow: "Ordina ora",
    orderCtaBody: "Ricevi un'offerta su misura, con disponibilità, prezzi e campionatura.",
    alsoEyebrow: "Tripla soluzione zero waste",
    alsoTitle: "Scopri anche",
  },
  order: {
    eyebrow: "Ordina",
    intro: "Compila il modulo: ti invieremo un'offerta dedicata con disponibilità, prezzi e scheda tecnica.",
    name: "Nome e Cognome*",
    company: "Azienda*",
    email: "Email*",
    phone: "Telefono",
    quantity: "Quantità indicativa",
    notes: "Note (applicazione, tempistiche, campionatura…)",
    privacyBefore: "Dichiaro di aver letto l'",
    privacyLink: "informativa privacy",
    privacyAfter: ".",
    submit: "Invia richiesta d'ordine",
    sending: "Invio…",
    thanks: "Grazie! Abbiamo ricevuto la tua richiesta: ti ricontatteremo a breve con disponibilità, prezzi e scheda tecnica.",
    close: "Chiudi",
  },
  datasheet: {
    eyebrow: "Scheda tecnica",
    intro: "Lasciaci i tuoi contatti: ti invieremo la scheda tecnica del prodotto via email.",
    notes: "Applicazione o informazioni aggiuntive (facoltativo)",
    submit: "Richiedi la scheda tecnica",
    thanks: "Grazie! Abbiamo ricevuto la tua richiesta: ti invieremo a breve la scheda tecnica via email.",
  },
  products: {
    "estratto-secco": {
      eyebrow: "Coffee Core Extract",
      category: "Cosmesi & nutraceutica",
      name: "Estratto secco",
      tagline: "Estratto secco ricco in polifenoli da fondi di caffè",
      intro:
        "Con il nostro processo brevettato a basso impatto energetico estraiamo polifenoli ad altissima efficacia dai residui di caffè post-espresso, non dal caffè verde, più costoso e in competizione con la filiera alimentare. Un processo in condizioni mild e senza solventi chimici aggressivi preserva l'integrità dei principi attivi e dà vita a un estratto secco standardizzato, premium e tracciabile.",
      highlights: [
        { title: "Antiossidante", text: "Polifenoli concentrati contro lo stress ossidativo e i radicali liberi." },
        { title: "SPF-boosting", text: "Melanoidine e acidi fenolici come filtro naturale a supporto dei filtri UV." },
        { title: "Anti-glicazione", text: "Previene la glicazione UV-indotta che irrigidisce collagene ed elastina." },
      ],
      specs: [
        { label: "Polifenoli totali", value: "17.1 mg/g GAE" },
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
        {
          family: "Caffeina e Trigonellina",
          examples: "Alcaloidi tipici del caffè",
          benefits:
            "La caffeina stimola il microcircolo e favorisce la lipolisi: è l'attivo di riferimento nei trattamenti anticellulite e decongestionanti per il contorno occhi. La trigonellina idrata e condiziona la pelle, supportando la funzione barriera.",
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
    olio: {
      eyebrow: "Coffee Core Oil",
      category: "Cosmesi & nutraceutica",
      name: "Olio di caffè",
      tagline: "Ingrediente sostenibile per cosmesi e nutraceutica",
      intro:
        "Dai fondi di caffè recuperiamo anche la frazione lipidica: un olio dal caratteristico colore ambrato, ricco di acidi grassi, fitosteroli e tocoferoli. Un ingrediente circolare e tracciabile che offre a skincare e haircare un'alternativa sostenibile agli oli vegetali ad alto impatto.",
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
    pellet: {
      eyebrow: "Coffee Core Pellet",
      category: "Energia",
      name: "Pellet da biomassa di caffè",
      tagline: "Energia e calore dal residuo solido",
      intro:
        "Dopo l'estrazione, il residuo solido dei fondi di caffè non diventa un rifiuto: lo trasformiamo in pellet di biomassa per la produzione di energia e calore. È l'ultimo anello del nostro processo a zero waste, che riduce l'impronta ambientale ed evita il conferimento in discarica e le relative emissioni di metano.",
      highlights: [
        { title: "Alto potere calorifico", text: "I fondi di caffè sono una biomassa densa di energia, ideale per la combustione." },
        { title: "Zero waste", text: "Chiude il ciclo: ogni frazione del fondo di caffè viene valorizzata." },
        { title: "Tracciabile", text: "Materia prima raccolta da torrefazioni e partner di filiera italiani, con logistica tracciata." },
      ],
      applications: [
        "Caldaie e stufe a biomassa",
        "Riscaldamento civile e industriale",
        "Co-combustione con altre biomasse",
      ],
      orderUnit: "tonnellate",
    },
  } as Record<ProductId, ProductText>,
};

export type Dictionary = typeof it;
