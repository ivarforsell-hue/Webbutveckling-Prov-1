// ═══════════════════════════════════════
//  Webb101 – script.js
// ═══════════════════════════════════════
function visaHint() {
  document.getElementById("fraga-hint").classList.remove("dold");
  document.getElementById("hint-btn").classList.add("dold");
}
function toggleEl(el) {
    el.classList.toggle("open");
  }
// ── Navigation ──────────────────────────
function visaSektion(namn) {
    document.querySelectorAll(".sektion").forEach(s => s.classList.remove("aktiv"));
    document.getElementById("sektion-" + namn).classList.add("aktiv");
  
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("btn-" + namn).classList.add("active");
  
    if (namn === "ova") initOva();
  }
  
  // ── Quiz data ────────────────────────────
  const fragor = [
    // Filer & mappar
    {
      kategori: "Filer & Mappar",
      fraga: "Vad ska startsidan alltid heta?",
      hint: "",
      svar: ["index.html"],
      forklaring: "Webbservern letar automatiskt efter en fil som heter index.html i en mapp."
    },
    {
      kategori: "Filer & Mappar",
      fraga: "Hur ska filnamn skrivas – med stora eller små bokstäver?",
      hint: "",
      svar: ["lowercase", "små bokstäver", "gemener", "små"],
      forklaring: "Använd alltid lowercase (gemener) och undvik mellanslag. Använd bindestreck (-) istället."
    },
  
    // HTML grundstruktur
    {
      kategori: "HTML-grundstruktur",
      fraga: "Vad är den allra första raden i ett HTML-dokument?",
      hint: "Börjar med <! ...",
      svar: ["<!doctype html>", "<!DOCTYPE html>"],
      forklaring: "<!DOCTYPE html> talar om för webbläsaren att det är ett HTML5-dokument."
    },
    {
      kategori: "HTML-grundstruktur",
      fraga: "Vilket attribut använder man på <script> för att den ska köras EFTER HTML:en laddats?",
      hint: "Ett booleskt attribut...",
      svar: ["defer"],
      forklaring: "defer gör att skriptet körs efter att HTML:en är tolkad. Utan defer kan JS köras innan elementen finns."
    },
    {
      kategori: "HTML-grundstruktur",
      fraga: "Vilket element kopplar in en CSS-fil till HTML-sidan?",
      hint: "<l... rel=\"stylesheet\" href=\"style.css\">",
      svar: ["link", "<link>"],
      forklaring: "<link rel=\"stylesheet\" href=\"style.css\"> placeras i <head> och kopplar in stilmallen."
    },
  
    // Syntax
    {
      kategori: "HTML-syntax",
      fraga: "Vad kallas ett element som INTE har en sluttagg?",
      hint: "Engelskt ord används...",
      svar: ["void element", "void", "tomt element"],
      forklaring: "Void elements (tomma element) som <img>, <input>, <br> har ingen sluttagg och inget innehåll."
    },
    {
      kategori: "HTML-syntax",
      fraga: "Vad kallas ett attribut som bara behöver vara närvarande, utan värde? T.ex. 'required'",
      hint: "Tänk sant/falskt...",
      svar: ["booleskt attribut", "boolean attribut", "booleskt", "boolean"],
      forklaring: "Booleska attribut som required, disabled, checked behöver inget värde – närvaron räcker."
    },
    {
      kategori: "HTML-syntax",
      fraga: "Vilka fyra delar har ett normalt HTML-element?",
      hint: "Starttagg, ___, ___, Sluttagg",
      svar: ["starttagg attribut innehåll sluttagg", "starttagg, attribut, innehåll, sluttagg"],
      forklaring: "Ett normalt element har: Starttagg, Attribut (i starttaggen), Innehåll och Sluttagg."
    },
  
    // Vanliga element
    {
      kategori: "HTML-element",
      fraga: "Vilket element används för en OORDNAD lista (med punkter)?",
      hint: "u...",
      svar: ["ul", "<ul>"],
      forklaring: "<ul> = unordered list. Varje punkt är ett <li>-element inuti."
    },
    {
      kategori: "HTML-element",
      fraga: "Vilket element används för en ORDNAD lista (med siffror)?",
      hint: "o...",
      svar: ["ol", "<ol>"],
      forklaring: "<ol> = ordered list. Varje objekt är ett <li>-element inuti."
    },
    {
      kategori: "HTML-element",
      fraga: "Vilket element representerar en rubrikcell i en tabell?",
      hint: "t...",
      svar: ["th", "<th>"],
      forklaring: "<th> = table header. Används för rubrikceller i en tabell, till skillnad från <td> (data)."
    },
    {
      kategori: "HTML-element",
      fraga: "Vilket element är en block-behållare utan semantisk betydelse?",
      hint: "d...",
      svar: ["div", "<div>"],
      forklaring: "<div> är en generisk block-behållare. Används för att gruppera element för styling."
    },
    {
      kategori: "HTML-element",
      fraga: "Vilket element är en INLINE-behållare utan semantisk betydelse?",
      hint: "s...",
      svar: ["span", "<span>"],
      forklaring: "<span> är en generisk inline-behållare. Används för att stila delar av text."
    },
  
    // Entiteter
    {
      kategori: "HTML-entiteter",
      fraga: "Hur skriver du tecknet < i HTML-kod (utan att starta en tagg)?",
      hint: "&...",
      svar: ["&lt;"],
      forklaring: "&lt; är HTML-entiteten för < (less-than). Utan den tror webbläsaren att det är en tagg."
    },
    {
      kategori: "HTML-entiteter",
      fraga: "Hur skriver du tecknet > i HTML-kod?",
      hint: "&...",
      svar: ["&gt;"],
      forklaring: "&gt; är HTML-entiteten för > (greater-than)."
    },
  
    // CSS syntax
    {
      kategori: "CSS-syntax",
      fraga: "Vad kallas delen inom { } i en CSS-regel?",
      hint: "Dekla...",
      svar: ["deklarationsblock", "declarations block"],
      forklaring: "Allt inom { } kallas deklarationsblock. Det innehåller en eller flera deklarationer."
    },
    {
      kategori: "CSS-syntax",
      fraga: "Vad kallas en CSS-rad som t.ex. 'color: red;'?",
      hint: "Dekla...",
      svar: ["deklaration"],
      forklaring: "En deklaration består av egenskapsnamn + värde, t.ex. color: red; och avslutas med semikolon."
    },
    {
      kategori: "CSS-syntax",
      fraga: "Hur skriver man en CSS-shorthand för margin med 10px topp/botten och 20px vänster/höger?",
      hint: "margin: __ __;",
      svar: ["margin: 10px 20px", "margin: 10px 20px;"],
      forklaring: "margin: 10px 20px; = 10px topp&botten, 20px vänster&höger. Det är shorthand-notation."
    },
  
    // Selektorer
    {
      kategori: "CSS-selektorer",
      fraga: "Hur selekterar du alla element med klassen 'rubrik' i CSS?",
      hint: "Börjar med en punkt...",
      svar: [".rubrik", ".rubrik { }"],
      forklaring: ".klass är en klassselektor. Punkten (.) framför namnet väljer alla element med den klassen."
    },
    {
      kategori: "CSS-selektorer",
      fraga: "Hur selekterar du ett element med id='huvud' i CSS?",
      hint: "Börjar med #...",
      svar: ["#huvud", "#huvud { }"],
      forklaring: "#id är en id-selektor. Brädgården (#) väljer ett specifikt element med det id:t."
    },
    {
      kategori: "CSS-selektorer",
      fraga: "Vilken kombinator väljer DIREKTA barn (child)?",
      hint: "Ett enda tecken...",
      svar: [">"],
      forklaring: "div > p väljer bara <p> som är direkta barn till <div>, inte djupare avkomlingar."
    },
    {
      kategori: "CSS-selektorer",
      fraga: "Vilken kombinator väljer avkomlingar (descendant)?",
      hint: "Det enklaste möjliga...",
      svar: ["mellanslag", " ", "space"],
      forklaring: "div p (med mellanslag) väljer alla <p> inuti en <div>, oavsett djup."
    },
    {
      kategori: "CSS-selektorer",
      fraga: "Vilken kombinator väljer NÄSTA syskon (next-sibling)?",
      hint: "Ett tecken efter h1...",
      svar: ["+"],
      forklaring: "h1 + p väljer den <p> som kommer direkt efter ett <h1>."
    },
    {
      kategori: "CSS-selektorer",
      fraga: "Vilken kombinator väljer ALLA efterkommande syskon?",
      hint: "h1 _ p",
      svar: ["~"],
      forklaring: "h1 ~ p väljer alla <p> som är syskon och kommer efter ett <h1>."
    },
  
    // Specificitet
    {
      kategori: "Specificitet",
      fraga: "Vilket har högst specificitet: ID, klass eller typ?",
      hint: "#id vs .klass vs p",
      svar: ["id", "#id"],
      forklaring: "ID har högst specificitet (0,1,0,0), sedan klass (0,0,1,0), sedan typ (0,0,0,1)."
    },
  
    // Pseudoklasser
    {
      kategori: "Pseudoklasser",
      fraga: "Vilken pseudoklass väljer det N:te barnet?",
      hint: ":nth-...",
      svar: [":nth-child", "nth-child"],
      forklaring: ":nth-child(n) väljer det n:te barnet. T.ex. li:nth-child(2) väljer den andra <li>."
    },
    {
      kategori: "Pseudoklasser",
      fraga: "Vilken pseudoklass UTESLUTER element? T.ex. välj alla p utom .intro",
      hint: ":n...",
      svar: [":not", "not"],
      forklaring: ":not(.intro) väljer alla element som INTE har klassen intro."
    },
  
    // Pseudoelement
    {
      kategori: "Pseudoelement",
      fraga: "Vilket pseudoelement stilsätter det FÖRSTA tecknet i ett textstycke?",
      hint: "::first-...",
      svar: ["::first-letter", "first-letter"],
      forklaring: "p::first-letter väljer bara det första tecknet i ett <p>-element."
    },
    {
      kategori: "Pseudoelement",
      fraga: "Vilket pseudoelement lägger till innehåll FÖRE ett element?",
      hint: "::b...",
      svar: ["::before", "before"],
      forklaring: "::before lägger till genererat innehåll före elementet. Kräver content-egenskapen."
    },
  
    // Block vs Inline
    {
      kategori: "Block vs Inline",
      fraga: "Är <div> ett block- eller inline-element?",
      hint: "",
      svar: ["block", "blockelement"],
      forklaring: "<div> är ett block-element. Det tar upp hela bredden och börjar på ny rad."
    },
    {
      kategori: "Block vs Inline",
      fraga: "Är <span> ett block- eller inline-element?",
      hint: "",
      svar: ["inline", "inlineelement"],
      forklaring: "<span> är ett inline-element. Det tar bara upp sitt eget utrymme i texten."
    },
  
    // CSS-variabler
    {
      kategori: "CSS-variabler",
      fraga: "Hur ANVÄNDER man en CSS-variabel som heter --primär?",
      hint: "var(...)",
      svar: ["var(--primär)", "var(--primaer)"],
      forklaring: "CSS-variabler används med var(--variabelnamn). De definieras vanligtvis i :root { }."
    },
    {
      kategori: "CSS-variabler",
      fraga: "I vilket selektor brukar man DEFINIERA CSS-variabler för hela sidan?",
      hint: "Rot-elementet...",
      svar: [":root", ":root { }"],
      forklaring: ":root representerar HTML-elementet och ger variabler global räckvidd."
    },
  
    // JavaScript & DOM
    {
      kategori: "JavaScript & DOM",
      fraga: "Vilket JS-kommando väljer ett element med id='titel'?",
      hint: "document.querySelector(...)",
      svar: ["document.queryselector(\"#titel\")", "document.querySelector('#titel')", "document.querySelector(\"#titel\")"],
      forklaring: "document.querySelector(\"#titel\") returnerar det första elementet med id=\"titel\"."
    },
    {
      kategori: "JavaScript & DOM",
      fraga: "Hur ändrar du textinnehållet i ett element med JavaScript?",
      hint: "element. ... = \"text\"",
      svar: ["textcontent", ".textcontent", "element.textContent"],
      forklaring: "element.textContent = \"Ny text\" byter ut textinnehållet i elementet."
    },
    {
      kategori: "JavaScript & DOM",
      fraga: "Vilket JS-kommando SKAPAR ett nytt element?",
      hint: "document.create...",
      svar: ["document.createelement", "document.createElement(\"div\")"],
      forklaring: "document.createElement(\"div\") skapar ett nytt <div>-element (utan att lägga till det i DOM:en)."
    },
    {
      kategori: "JavaScript & DOM",
      fraga: "Hur lyssnar man på ett klick på ett element med JS?",
      hint: "element.addEventListener(...)",
      svar: ["addeventlistener", "addEventListener", "addEventListener(\"click\", ...)"],
      forklaring: "element.addEventListener(\"click\", funktion) kopplar en händelselyssnare till elementet."
    },
    {
      kategori: "JavaScript & DOM",
      fraga: "Vilken klass används för att avkoda sökparametrar från en URL?",
      hint: "new URL...",
      svar: ["urlsearchparams", "URLSearchParams", "new URLSearchParams"],
      forklaring: "new URLSearchParams(window.location.search) ger åtkomst till URL-parametrar som ?namn=Kalle."
    }
  ];
  
  // ── Quiz state ───────────────────────────
  let fragorBlandade = [];
  let nuvarandeIndex  = 0;
  let poang           = 0;
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
  const f = fragorBlandade[qIndex];
  document.getElementById("fraga-nr").textContent = qIndex + 1;
  document.getElementById("fraga-kategori").textContent = f.kategori;
  document.getElementById("fraga-text").textContent = f.fraga;

  // Återställ hint
  const hintDiv = document.getElementById("fraga-hint");
  const hintBtn = document.getElementById("hint-btn");
  hintDiv.textContent = f.hint;
  hintDiv.classList.add("dold");

  // Visa knappen bara om det finns en ledtråd
  if (f.hint && f.hint.trim() !== "") {
    hintBtn.classList.remove("dold");
  } else {
    hintBtn.classList.add("dold");
  }

  document.getElementById("progress-fill").style.width = (qIndex / fragorBlandade.length * 100) + "%";

  const input = document.getElementById("svar-input");
  input.value = ""; input.disabled = false; input.focus();
  document.getElementById("kolla-btn").style.display = "inline-block";
  document.getElementById("svar-area").style.display = "flex";

  const fb = document.getElementById("feedback-box");
  fb.classList.add("dold"); fb.classList.remove("ratt","fel");
  input.onkeydown = e => { if (e.key === "Enter") kollaSvar(); };
}
  
  function normalisera(str) {
    return str.toLowerCase().trim().replace(/\s+/g, " ");
  }
  
  function kollaSvar() {
    const input = document.getElementById("svar-input");
    const svar  = normalisera(input.value);
    if (!svar) return;
  
    const f = fragorBlandade[nuvarandeIndex];
    const ratt = f.svar.some(s => normalisera(s) === svar ||
      normalisera(s).includes(svar) ||
      svar.includes(normalisera(s).split(" ")[0])
    );
  
    // Disable input
    input.disabled = true;
    document.getElementById("kolla-btn").style.display = "none";
  
    const fb = document.getElementById("feedback-box");
    fb.classList.remove("dold", "ratt", "fel");
    fb.classList.add(ratt ? "ratt" : "fel");
  
    document.getElementById("feedback-rubrik").textContent = ratt
      ? "✅ Rätt!" : "❌ Inte riktigt...";
  
    const rattSvar = f.svar[0];
    document.getElementById("feedback-text").textContent = ratt
      ? f.forklaring
      : `Rätt svar: ${rattSvar}\n\n${f.forklaring}`;
  
    if (ratt) poang++;
  }
  
  function nastaFraga() {
    nuvarandeIndex++;
    if (nuvarandeIndex >= fragorBlandade.length) {
      visaKlar();
    } else {
      visaFraga();
    }
  }
  
  function visaKlar() {
    document.getElementById("fraga-container").classList.add("dold");
    const klarBox = document.getElementById("klar-box");
    klarBox.classList.remove("dold");
  
    const total = fragorBlandade.length;
    const procent = Math.round((poang / total) * 100);
    let emoji = procent >= 80 ? "🔥" : procent >= 60 ? "👍" : "📖";
  
    document.getElementById("poang-text").textContent =
      `Du fick ${poang} av ${total} rätt (${procent}%) ${emoji}`;
  
    document.getElementById("progress-fill").style.width = "100%";
    ovningenStartad = false;
  }
  
