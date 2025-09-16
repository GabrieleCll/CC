

export default function PrivacyPage() {
return (
<main className="min-h-screen bg-white" style={{ fontFamily: "Montserrat, ui-sans-serif, system-ui" }}>
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');
`}</style>
<header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-black/5">
<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
<a href="/" className="flex items-center gap-3">
  <img src="/logo.svg" alt="Coffee Core" className="h-8 w-8 rounded-2xl" />
  <span className="text-xl font-bold tracking-tight text-[#684330]">Coffee Core</span>
</a>
<a href="/" className="text-sm underline decoration-dotted">← Torna al sito</a>
</div>
</header>


<section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
<h1 className="text-3xl font-bold text-[#455D51]">Privacy Policy</h1>
<h1 className="text-l font-bold text-[#455D51] mt-4">Relativa al trattamento dei dati personali resa agli interessati ai sensi dell'art. 13 del regolamento europeo 2016/679</h1>
<p className="mt-2 text-sm text-[#5F464B]">Ultimo aggiornamento: {new Date().toLocaleDateString()}</p>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Premessa</h2>
<p className="mt-4">
Questa pagina descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito di Coffee Core.
Le informazioni sono fornite ai sensi della normativa vigente in materia di protezione dei dati personali.</p>
</div>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Titolare del trattamento</h2>
<p className="mt-4">
Il Titolare del Trattamento è Coffee Core s.r.l. SB – Via Primo Mazzolari SNC, 66100 Chieti (CH). Eventuali richieste di informazioni e/o chiarimenti possono essere inviate a info@coffeecore.it
</p>
</div>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Dati trattati e finalità</h2>
<ul className="mt-4">
<li>Dati di navigazione (log tecnici, indirizzo IP) – sicurezza e statistiche aggregate.</li>
<li>Dati forniti volontariamente (modulo contatti) – riscontro alle richieste.</li>
<li>Cookie e tecnologie similari – funzionali e, se presenti, analitici/marketing previa base giuridica.</li>
</ul>
</div>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Basi giuridiche</h2>
<p className="mt-4">
Esecuzione di misure precontrattuali/contrattuali, obblighi di legge, legittimo interesse o consenso ove richiesto.</p>
</div>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Conservazione</h2>
<p className="mt-4">
  I trattamenti effettuati tramite l’ausilio di strumenti cartacei/informatici con modalità e strumenti volti a garantire la massima sicurezza e riservatezza, 
  non prevedono l’impiego di processi decisionali automatizzati. I trattamenti avvengono ad opera di soggetti autorizzati che agiscono sotto la responsabilità 
  del Titolare e di soggetti che agiscono quali Responsabili o Titolari autonomi. 
  I dati saranno conservati per un periodo non superiore agli scopi per i quali i dati sono stati raccolti e successivamente trattati.</p>
</div>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Diritti degli interessati</h2>
<p className="mt-4">
  Il Regolamento Europeo 2016/679 riconosce agli interessati i seguenti diritti che possono essere esercitati nei confronti del Titolare:
  <li className="ml-8">diritto di accesso ai propri dati;</li>
  <li className="ml-8">diritto di rettifica dei dati inesatti o l’integrazione di quelli incompleti;</li>
  <li className="ml-8">diritto di cancellazione dei propri dati personali (nei casi previsti dalla normativa);</li>
  <li className="ml-8">diritto alla limitazione del trattamento dei propri dati personali (sempre nei casi previsti dalla normativa);</li>
  <li className="ml-8">diritto alla portabilità dei dati;</li>
</p>
<p>Per esercitare tali diritti l’interessato potrà inviare una mail all’indirizzo di posta elettronica: info@coffeecore.it</p>
<p>Inoltre il Titolare interromperà il Trattamento nel momento in cui pervenga da parte sua la comunicazione di revoca del consenso precedentemente manifestato ove il consenso rappresenti base giuridica del Trattamento.</p>
<p>Qualora contatti il Titolare è pregato di fornire l’indirizzo di posta elettronica, il nominativo, l’indirizzo e/o i numeri di telefono, al fine di permettere la corretta gestione della richiesta.</p>
</div>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Destinatari</h2>
<p className="mt-4">
  Fornitori di servizi tecnici/hosting e soggetti autorizzati al trattamento. I dati non sono diffusi.</p>
</div>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Trasferimenti extra-UE</h2>
<p className="mt-4">Si precisa che le attività e i trattamenti effettuati non comportano il trasferimento di dati all’estero.</p>
</div>

<div className="prose prose-neutral max-w-none mt-6">
<h2 className="text-l font-bold text-[#455D51] mt-4">Aggiornamenti</h2>
<p className="mt-4">La presente informativa può essere aggiornata. Si invita a verificarne periodicamente il contenuto.</p>
</div>
</section>


<footer className="border-t border-black/5">
<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-[#5F464B] flex items-center justify-between">
<span>© {new Date().getFullYear()} Coffee Core</span>
<a href="/" className="underline decoration-dotted">Home</a>
</div>
</footer>
</main>
);
}