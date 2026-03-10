// ══════════════════════════════════════
//  Webb101 – script.js
// ══════════════════════════════════════

function visaSektion(namn) {
  document.querySelectorAll(".sektion").forEach(s => s.classList.remove("aktiv"));
  document.getElementById("sektion-" + namn).classList.add("aktiv");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("btn-" + namn).classList.add("active");
  if (namn === "ova") initOva();
}

function toggleEl(el) {
  el.classList.toggle("open");
}

const fragor = [
  // Filer & mappar
  {
    kategori: "Filer & Mappar",
    fraga: "Vad ska startsidan alltid heta?",
    hint: "Tänk på vad en webbserver letar efter automatiskt...",
    svar: ["index.html"],
    forklaring: "Webbservern letar automatiskt efter en fil som heter index.html i en mapp."
  },
  {
    kategori: "Filer & Mappar",
    fraga: "Hur ska filnamn skrivas – med stora eller små bokstäver?",
    hint: "Det motsatta från hur du skriver i början av en mening...",
    svar: ["lowercase", "små bokstäver", "gemener", "små"],
    forklaring: "Använd alltid lowercase (gemener) och undvik mellanslag. Använd bindestreck (-) istället."
  },

  // HTML grundstruktur
  {
    kategori: "HTML-grundstruktur",
    fraga: "Vad är den allra första raden i ett HTML-dokument?",
    hint: "Det är inte ett vanligt element – det börjar med ett utropstecken...",
    svar: ["<!doctype html>", "<!DOCTYPE html>"],
    forklaring: "<!DOCTYPE html> talar om för webbläsaren att det är ett HTML5-dokument."
  },
  {
    kategori: "HTML-grundstruktur",
    fraga: "Vilket attribut på script-elementet gör att det körs EFTER HTML:en laddats?",
    hint: "Det är ett booleskt attribut – du behöver inte ge det något värde...",
    svar: ["defer"],
    forklaring: "defer gör att skriptet körs efter att HTML:en är tolkad. Utan defer kan JS köras innan elementen finns."
  },
  {
    kategori: "HTML-grundstruktur",
    fraga: "Vilket element kopplar in en CSS-fil till HTML-sidan?",
    hint: "Det sitter i head och har ett rel-attribut...",
    svar: ["link", "<link>"],
    forklaring: "<link rel='stylesheet' href='style.css'> placeras i <head> och kopplar in stilmallen."
  },

  // Syntax
  {
    kategori: "HTML-syntax",
    fraga: "Vad kallas ett element som INTE har en sluttagg, t.ex. img och input?",
    hint: "Tänk på det engelska ordet för 'tomt' eller 'ogiltigt'...",
    svar: ["void element", "void", "tomt element"],
    forklaring: "Void elements som <img>, <input>, <br> har ingen sluttagg och inget innehåll."
  },
  {
    kategori: "HTML-syntax",
    fraga: "Vad kallas ett attribut som bara behöver vara närvarande utan värde, t.ex. 'required'?",
    hint: "Tänk sant eller falskt – antingen finns det eller inte...",
    svar: ["booleskt attribut", "boolean attribut", "booleskt", "boolean"],
    forklaring: "Booleska attribut som required, disabled, checked behöver inget värde – närvaron räcker."
  },
  {
    kategori: "HTML-syntax",
    fraga: "Vilka fyra delar har ett normalt HTML-element?",
    hint: "Det börjar och slutar med något, har text i mitten och extra info i öppningen...",
    svar: ["starttagg attribut innehåll sluttagg", "starttagg, attribut, innehåll, sluttagg"],
    forklaring: "Ett normalt element har: Starttagg, Attribut (i starttaggen), Innehåll och Sluttagg."
  },

  // Vanliga element
  {
    kategori: "HTML-element",
    fraga: "Vilket element används för en OORDNAD lista med punkter?",
    hint: "Tänk 'unordered' – bara första bokstaven plus ett l...",
    svar: ["ul", "<ul>"],
    forklaring: "<ul> = unordered list. Varje punkt är ett <li>-element inuti."
  },
  {
    kategori: "HTML-element",
    fraga: "Vilket element används för en ORDNAD lista med siffror?",
    hint: "Tänk 'ordered' – bara första bokstaven plus ett l...",
    svar: ["ol", "<ol>"],
    forklaring: "<ol> = ordered list. Varje objekt är ett <li>-element inuti."
  },
  {
    kategori: "HTML-element",
    fraga: "Vilket element representerar en rubrikcell i en tabell?",
    hint: "Två bokstäver – t och sedan första bokstaven i 'header'...",
    svar: ["th", "<th>"],
    forklaring: "<th> = table header. Används för rubrikceller, till skillnad från <td> (data)."
  },
  {
    kategori: "HTML-element",
    fraga: "Vilket element är en block-behållare utan semantisk betydelse?",
    hint: "Tre bokstäver, börjar på d – används överallt för layout...",
    svar: ["div", "<div>"],
    forklaring: "<div> är en generisk block-behållare. Används för att gruppera element för styling."
  },
  {
    kategori: "HTML-element",
    fraga: "Vilket element är en INLINE-behållare utan semantisk betydelse?",
    hint: "Fyra bokstäver, börjar på s – används inuti text för att stila enstaka ord...",
    svar: ["span", "<span>"],
    forklaring: "<span> är en generisk inline-behållare. Används för att stila delar av text."
  },

  // Entiteter
  {
    kategori: "HTML-entiteter",
    fraga: "Hur skriver du tecknet < i HTML utan att starta en tagg?",
    hint: "Det börjar med & och slutar med semikolon – tänk 'less than' förkortat...",
    svar: ["&lt;"],
    forklaring: "&lt; är HTML-entiteten för <. Utan den tror webbläsaren att det är en tagg."
  },
  {
    kategori: "HTML-entiteter",
    fraga: "Hur skriver du tecknet > i HTML?",
    hint: "Som förra frågan fast motsatsen – 'greater than' förkortat...",
    svar: ["&gt;"],
    forklaring: "&gt; är HTML-entiteten för >."
  },

  // CSS syntax
  {
    kategori: "CSS-syntax",
    fraga: "Vad kallas delen inom { } i en CSS-regel?",
    hint: "Två ord – det 'deklarerar' saker, och det är ett 'block'...",
    svar: ["deklarationsblock", "declarations block"],
    forklaring: "Allt inom { } kallas deklarationsblock. Det innehåller en eller flera deklarationer."
  },
  {
    kategori: "CSS-syntax",
    fraga: "Vad kallas en enskild CSS-rad som t.ex. 'color: red;'?",
    hint: "Ett ord – du 'deklarerar' något, en sådan rad är en...",
    svar: ["deklaration"],
    forklaring: "En deklaration består av egenskapsnamn + värde, avslutas med semikolon."
  },
  {
    kategori: "CSS-syntax",
    fraga: "Hur skriver man margin shorthand med 10px topp/botten och 20px vänster/höger?",
    hint: "Två värden med mellanslag – först vertikalt, sedan horisontellt...",
    svar: ["margin: 10px 20px", "margin: 10px 20px;"],
    forklaring: "margin: 10px 20px; = 10px topp & botten, 20px vänster & höger."
  },

  // Selektorer
  {
    kategori: "CSS-selektorer",
    fraga: "Hur selekterar du alla element med klassen 'rubrik' i CSS?",
    hint: "Ett enda tecken sätts framför klassnamnet – vilket tecken används för klasser?",
    svar: [".rubrik", ".rubrik { }"],
    forklaring: ".klass är en klassselektor. Punkten (.) framför väljer alla element med den klassen."
  },
  {
    kategori: "CSS-selektorer",
    fraga: "Hur selekterar du ett element med id='huvud' i CSS?",
    hint: "Inte punkt den här gången – tänk brädgård eller hashtag...",
    svar: ["#huvud", "#huvud { }"],
    forklaring: "#id är en id-selektor. # väljer ett specifikt element med det id:t."
  },
  {
    kategori: "CSS-selektorer",
    fraga: "Vilken kombinator väljer DIREKTA barn men inte djupare avkomlingar?",
    hint: "Ett enda tecken som ser ut som en pil åt höger...",
    svar: [">"],
    forklaring: "div > p väljer bara <p> som är direkta barn till <div>, inte djupare avkomlingar."
  },
  {
    kategori: "CSS-selektorer",
    fraga: "Vilken kombinator väljer avkomlingar på alla nivåer?",
    hint: "Det enklaste möjliga – du trycker det utan att hålla shift eller alt...",
    svar: ["mellanslag", " ", "space"],
    forklaring: "div p (med mellanslag) väljer alla <p> inuti en <div>, oavsett djup."
  },
  {
    kategori: "CSS-selektorer",
    fraga: "Vilken kombinator väljer elementet som kommer DIREKT efter ett syskon?",
    hint: "Matematik – du lägger till något...",
    svar: ["+"],
    forklaring: "h1 + p väljer den <p> som kommer direkt efter ett <h1>."
  },
  {
    kategori: "CSS-selektorer",
    fraga: "Vilken kombinator väljer ALLA efterkommande syskon, inte bara det nästa?",
    hint: "Ser ut som en liten våg på tangentbordet...",
    svar: ["~"],
    forklaring: "h1 ~ p väljer alla <p> som är syskon och kommer efter ett <h1>."
  },

  // Specificitet
  {
    kategori: "Specificitet",
    fraga: "Vilket har högst specificitet: ID, klass eller typ?",
    hint: "Vilket är mest specifikt – att peka på en person med namn, titel eller yrke?",
    svar: ["id", "#id"],
    forklaring: "ID har högst specificitet (0,1,0,0), sedan klass (0,0,1,0), sedan typ (0,0,0,1)."
  },

  // Pseudoklasser
  {
    kategori: "Pseudoklasser",
    fraga: "Vilken pseudoklass väljer det N:te barnet?",
    hint: "Börjar med kolon – tänk 'number-th child' på engelska...",
    svar: [":nth-child", "nth-child"],
    forklaring: ":nth-child(n) väljer det n:te barnet. T.ex. li:nth-child(2) väljer den andra <li>."
  },
  {
    kategori: "Pseudoklasser",
    fraga: "Vilken pseudoklass UTESLUTER element – välj alla p utom .intro?",
    hint: "Tänk på det engelska ordet för 'inte' – tre bokstäver...",
    svar: [":not", "not"],
    forklaring: ":not(.intro) väljer alla element som INTE har klassen intro."
  },

  // Pseudoelement
  {
    kategori: "Pseudoelement",
    fraga: "Vilket pseudoelement stilsätter det FÖRSTA tecknet i ett stycke?",
    hint: "Dubbla kolon – 'first' och vad ett tecken kallas på engelska...",
    svar: ["::first-letter", "first-letter"],
    forklaring: "p::first-letter väljer bara det första tecknet i ett <p>-element."
  },
  {
    kategori: "Pseudoelement",
    fraga: "Vilket pseudoelement lägger till innehåll FÖRE ett element?",
    hint: "Dubbla kolon – det engelska ordet för 'innan'...",
    svar: ["::before", "before"],
    forklaring: "::before lägger till genererat innehåll före elementet. Kräver content-egenskapen."
  },

  // Block vs Inline
  {
    kategori: "Block vs Inline",
    fraga: "Är div ett block- eller inline-element?",
    hint: "Det tar hela bredden och trycker ner nästa element till en ny rad...",
    svar: ["block", "blockelement"],
    forklaring: "<div> är ett block-element. Det tar upp hela bredden och börjar på ny rad."
  },
  {
    kategori: "Block vs Inline",
    fraga: "Är span ett block- eller inline-element?",
    hint: "Det stannar i texten som ett ord bland andra ord – det bryter inte raden...",
    svar: ["inline", "inlineelement"],
    forklaring: "<span> är ett inline-element. Det tar bara upp sitt eget utrymme i texten."
  },

  // CSS-variabler
  {
    kategori: "CSS-variabler",
    fraga: "Hur ANVÄNDER man en CSS-variabel som heter --primär?",
    hint: "Det är en CSS-funktion med tre bokstäver som lindar in variabelnamnet...",
    svar: ["var(--primär)", "var(--primaer)"],
    forklaring: "CSS-variabler används med var(--variabelnamn). De definieras vanligtvis i :root { }."
  },
  {
    kategori: "CSS-variabler",
    fraga: "I vilket selektor definierar man CSS-variabler för hela sidan?",
    hint: "Det representerar HTML-dokumentets rot – kolon och ett engelskt ord...",
    svar: [":root", ":root { }"],
    forklaring: ":root representerar HTML-elementet och ger variabler global räckvidd."
  },

  // JavaScript & DOM
  {
    kategori: "JavaScript & DOM",
    fraga: "Vilket JS-kommando väljer ett element med id='titel'?",
    hint: "document punkt något med 'query' i namnet, sen #titel i citattecken...",
    svar: ["document.queryselector(\"#titel\")", "document.querySelector('#titel')", "document.querySelector(\"#titel\")"],
    forklaring: "document.querySelector(\"#titel\") returnerar det första elementet med id=\"titel\"."
  },
  {
    kategori: "JavaScript & DOM",
    fraga: "Vilken egenskap ändrar textinnehållet i ett element med JavaScript?",
    hint: "Två ord ihopskrivna med stor bokstav i mitten – 'text' och vad innehåll kallas...",
    svar: ["textcontent", ".textcontent", "element.textContent"],
    forklaring: "element.textContent = 'Ny text' byter ut textinnehållet i elementet."
  },
  {
    kategori: "JavaScript & DOM",
    fraga: "Vilket JS-kommando SKAPAR ett nytt element utan att lägga till det på sidan?",
    hint: "document punkt 'create' och sedan vad man kallar ett HTML-element på engelska...",
    svar: ["document.createelement", "document.createElement(\"div\")"],
    forklaring: "document.createElement('div') skapar ett nytt element utan att lägga till det i DOM:en."
  },
  {
    kategori: "JavaScript & DOM",
    fraga: "Vilket metodnamn kopplar en funktion till en händelse som t.ex. klick?",
    hint: "Tre ord ihopskrivna – 'add', 'event' och 'listener'...",
    svar: ["addeventlistener", "addEventListener", "addEventListener(\"click\", ...)"],
    forklaring: "element.addEventListener('click', funktion) kopplar en händelselyssnare till elementet."
  },
  {
    kategori: "JavaScript & DOM",
    fraga: "Vilken klass används för att avkoda sökparametrar från en URL?",
    hint: "Tre ord utan mellanslag – tänk vad en URL har efter frågetecknet...",
    svar: ["urlsearchparams", "URLSearchParams", "new URLSearchParams"],
    forklaring: "new URLSearchParams(window.location.search) ger åtkomst till URL-parametrar som ?namn=Kalle."
  }
];

// ── Quiz-logik ──────────────────────────
let fragorBlandade = [];
let nuvarandeIndex = 0;
let poang = 0;
let ovningenStartad = false;

function initOva() {
  if (ovningenStartad) return;
  ovningenStartad = true;
  startaOm();
}

function startaOm() {
  fragorBlandade = blanda([...fragor]);
  nuvarandeIndex = 0;
  poang = 0;
  document.getElementById("klar-box").classList.add("dold");
  document.getElementById("fraga-container").classList.remove("dold");
  document.getElementById("total-fragor").textContent = fragorBlandade.length;
  visaFraga();
}

function blanda(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function visaFraga() {
  const f = fragorBlandade[nuvarandeIndex];
  document.getElementById("fraga-nr").textContent = nuvarandeIndex + 1;
  document.getElementById("fraga-kategori").textContent = f.kategori;
  document.getElementById("fraga-text").textContent = f.fraga;

  const hintDiv = document.getElementById("fraga-hint");
  const hintBtn = document.getElementById("hint-btn");
  hintDiv.textContent = f.hint;
  hintDiv.classList.add("dold");

  if (f.hint && f.hint.trim() !== "") {
    hintBtn.classList.remove("dold");
  } else {
    hintBtn.classList.add("dold");
  }

  document.getElementById("progress-fill").style.width =
    (nuvarandeIndex / fragorBlandade.length * 100) + "%";

  const input = document.getElementById("svar-input");
  input.value = "";
  input.disabled = false;
  input.focus();

  document.getElementById("kolla-btn").style.display = "inline-block";
  document.getElementById("svar-area").style.display = "flex";

  const fb = document.getElementById("feedback-box");
  fb.classList.add("dold");
  fb.classList.remove("ratt", "fel");

  input.onkeydown = e => { if (e.key === "Enter") kollaSvar(); };
}

function visaHint() {
  document.getElementById("fraga-hint").classList.remove("dold");
  document.getElementById("hint-btn").classList.add("dold");
}

function norm(s) {
  return s.toLowerCase().trim().replace(/\s+/g, " ").replace(/[.,;:!?]/g, "");
}

function kollaSvar() {
  const input = document.getElementById("svar-input");
  const svar = norm(input.value);
  if (!svar) return;

  const f = fragorBlandade[nuvarandeIndex];
  const ratt = f.svar.some(s => {
    const n = norm(s);
    return svar === n || svar.includes(n) || n.includes(svar);
  });

  input.disabled = true;
  document.getElementById("kolla-btn").style.display = "none";

  const fb = document.getElementById("feedback-box");
  fb.classList.remove("dold", "ratt", "fel");
  fb.classList.add(ratt ? "ratt" : "fel");

  document.getElementById("feedback-rubrik").textContent = ratt ? "✅ Rätt!" : "❌ Inte riktigt...";
  document.getElementById("feedback-text").textContent = ratt
    ? f.forklaring
    : `Rätt svar: ${f.svar[0]}\n\n${f.forklaring}`;

  if (ratt) poang++;
}

function nastaFraga() {
  nuvarandeIndex++;
  if (nuvarandeIndex >= fragorBlandade.length) visaKlar();
  else visaFraga();
}

function visaKlar() {
  document.getElementById("fraga-container").classList.add("dold");
  document.getElementById("klar-box").classList.remove("dold");
  document.getElementById("progress-fill").style.width = "100%";

  const total = fragorBlandade.length;
  const procent = Math.round((poang / total) * 100);
  const emoji = procent >= 80 ? "🔥" : procent >= 60 ? "👍" : "📖";

  document.getElementById("poang-text").textContent =
    `Du fick ${poang} av ${total} rätt (${procent}%) ${emoji}`;

  ovningenStartad = false;
}
