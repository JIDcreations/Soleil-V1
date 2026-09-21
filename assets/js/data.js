/* ==========================================================================
   Soleil hifi — enige bron voor praktische info, aanbod en prijzen.
   Enkel inhoud die op de huidige site staat. null = te bevestigen door de klant.
   ========================================================================== */

window.SOLEIL = {
  info: {
    since: null,           // 25 of 27 jaar → jaartal opvragen
    owner: null,           // naam zaakvoerder
    street: "Rivierstraat 70",
    city: "9080 Beervelde",
    phone: "0470 22 92 02",
    phoneHref: "tel:+32470229202",
    email: "info@instituutsoleil.be",
    booking: "https://booking.optios.net/18875",
    webshop: "https://www.webshopsoleil.be/",
    route: "https://www.google.com/maps/dir/?api=1&destination=Rivierstraat+70+9080+Beervelde",
    instagram: "https://www.instagram.com/instituutsoleil/",
    facebook: "https://www.facebook.com/Instituut-Soleil-1582526178629782/",
    vat: null              // BE 0837.999.331 of .371?
  },

  // d: 0 = zondag … 6 = zaterdag. Te bevestigen: de huidige site toont twee versies.
  hours: [
    { day: "Maandag", d: 1, open: "09:00", close: "18:00" },
    { day: "Dinsdag", d: 2, open: "08:00", close: "18:30" },
    { day: "Woensdag", d: 3 },
    { day: "Donderdag", d: 4, open: "08:00", close: "18:30" },
    { day: "Vrijdag", d: 5, open: "08:30", close: "18:00" },
    { day: "Zaterdag", d: 6, open: "09:00", close: "13:00", note: "Namiddag op afspraak" },
    { day: "Zondag", d: 0 }
  ],

  // Huidbehandelingen: elk een eigen pagina.
  skin: [
    {
      slug: "huidanalyse", img: "huidanalyse-scan", name: "Huidanalyse & Discovery", url: "huidanalyse.html",
      line: "Het vertrekpunt voor elke nieuwe klant.", from: 25, duration: "30–90 min"
    },
    {
      slug: "gelaatsverzorging", img: "gelaatsverzorging", name: "Gelaatsverzorging", url: "behandeling.html?b=gelaatsverzorging",
      line: "Skin Relax, op maat van je huid.", from: 65, duration: "60 of 90 min",
      intro: "Een diepgaande verzorging met Environ, Exuviance en Isov, afgestemd op wat je huid op dat moment nodig heeft.",
      forWho: ["Je wilt je huid gezond houden", "Je huid voelt dof of droog", "Je zoekt een moment van rust"],
      what: "Reiniging, exfoliatie, massage en een masker op maat. Uit te breiden met een oogcontourbehandeling, LED-licht of een chemische peeling.",
      prices: [["Skin Relax", "60 min", 65], ["Skin Relax", "90 min", 95], ["Extra: oogcontour (microneedling, serum, oogpatch)", "15 min", 25], ["Extra: LED + aangepast masker", "20 min", 45], ["Extra: chemische peeling", "20 min", 40]]
    },
    {
      slug: "huidverbetering", img: "microneedling", name: "Huidverbetering", url: "behandeling.html?b=huidverbetering",
      line: "Microneedling en peelings voor een specifiek huidprobleem.", from: null, duration: "Op consult",
      intro: "Voor wie fijne lijntjes wil verfijnen of een specifiek huidprobleem wil aanpakken. Als huidexpert geloof ik niet in een quick fix, wel in de juiste behandeling en advies op maat.",
      forWho: ["Acne", "Pigmentatie en melasma", "Doffe huid", "Huidveroudering en fijne lijntjes"],
      what: "We starten altijd met een skin consult. Samen stellen we een traject op, met voorbereidende producten voor thuis. 75% van het resultaat komt van wat je thuis doet.",
      prices: [["Skin consult (intake)", "40 min", 25], ["Microneedling", "", null], ["Chemische peeling", "", null]]
    },
    {
      slug: "neo-lift", img: "neo-lift", name: "Neo-Lift", url: "behandeling.html?b=neo-lift",
      line: "Stevigheid en volume, zonder naalden.", from: null, duration: "Te bevestigen",
      intro: "Neo-Lift combineert radiofrequentie en elektrostimulatie. Zo werk je aan de aanmaak van collageen en elastine én aan de versteviging van de dieperliggende spieren.",
      forWho: ["Huidverslapping en volumeverlies", "Rimpels en fijne lijntjes", "Verstevigen van gezicht- en halscontouren"],
      what: "Korte, aangename en niet-invasieve behandelingen. Na de behandeling kan je meteen verder met je dag.",
      prices: [["Neo-Lift", "", null], ["Kuur", "", null]]
    }
  ],

  // Verwennen: één pagina.
  pamper: [
    { id: "arrangementen", img: "arrangementen", name: "Arrangementen", line: "Solo of met twee in de duo-cabine.", from: 100 },
    { id: "lichaam", img: "massage-lichaam", name: "Massage & lichaam", line: "Massage, peeling en warme pakking.", from: 35 },
    { id: "ontharing", img: "ontharing", name: "Ontharing", line: "Hars en wax. Laser via een partner.", from: 10 },
    { id: "handen", img: "handen-voeten", name: "Handen & voeten", line: "Manicure, pedicure met gelaatsverzorging.", from: 25 },
    { id: "makeup", img: "make-up", name: "Make-up", line: "Workshops en feestmake-up.", from: 20 }
  ],

  arrangements: [
    { name: "Mini", duration: "1u15", solo: 100, duo: null, items: ["Skin Relax basisverzorging", "Epilatie wenkbrauwen", "Korte rugmassage", "Relaxmoment met drankje"] },
    { name: "Feeling", duration: "1u30", solo: 115, duo: 220, items: ["Relaxerende rugmassage", "Warme rugpakking", "Skin Relax basisverzorging", "Epilatie wenkbrauwen", "Relaxmoment met drankje"] },
    { name: "Soleil", duration: "2u", solo: 165, duo: null, items: ["Relaxerende rugmassage", "Skin Relax 90 min", "Epilatie wenkbrauwen", "Luxe manicure met pakking", "Relaxmoment met drankje"] },
    { name: "Relax", duration: "2u – 2u30", solo: 150, duo: 290, items: ["Lichaamspeeling", "Warme lichaamspakking + douche", "Skin Relax basisverzorging", "Epilatie wenkbrauwen", "Relaxmoment met drankje"] },
    { name: "Anti-stress", duration: "2u30", solo: 200, duo: null, items: ["Relaxerende rugmassage", "Warme rugpakking", "Skin Relax standaard", "Epilatie wenkbrauwen", "Luxe manicure met pakking", "Korte voetmassage"] }
  ],

  services: {
    lichaam: [["Massage", "25 min", 35], ["Lichaamspeeling met douche", "30 min", 40], ["Lichaamspakking + douche", "40 min", 40], ["Lichaamspeeling + pakking", "60 min", 80]],
    ontharing: [["Onderbenen", "", 25], ["Onderbenen + achterzijde bil", "", 38], ["Volledige benen", "", 48], ["Bikini sliprand", "", 15], ["Bikini brazilian", "", 40], ["Oksels", "", 15], ["Wenkbrauwen", "", 15], ["Bovenlip, kin of wang", "per zone", 10], ["Volledig gelaat", "", 35]],
    handen: [["Basis manicure", "30 min", 25], ["Manicure + lakken", "30 min", 35], ["Pedicure", "45 min", 35], ["Pedicure + lakken", "45 min", 45]],
    makeup: [["Basisworkshop", "30 min", 20], ["Intense workshop", "60–90 min", 50], ["Feestmake-up", "30 min", 30]]
  },

  analyse: [
    { name: "Skin consult", duration: "30 min", price: 25, items: ["Intakegesprek", "Advies over behandelingen", "Advies voor thuis"], note: "Gratis bij aankoop van 3 producten." },
    { name: "Discovery", duration: null, price: 100, rec: true, items: ["Huidscan met 3D-foto's", "Korte kennismakingsbehandeling", "Persoonlijk advies en plan"], note: "Aanbevolen voor je eerste bezoek." },
    { name: "Huidscan + uitleg", duration: "60 min", price: 50, items: ["Uitgebreide huidscan met foto's", "Uitleg van de analyse", "Advies op maat"], note: "Gratis bij aankoop van €150 producten of een kuur." }
  ],

  journal: [
    { slug: "peelen-na-de-zomer", img: "peeling", cat: "Huidtips", date: "2026-09-02", title: "Waarom peelen na de zomer zo belangrijk is" },
    { slug: "huid-na-de-zomer", img: "gelaatsverzorging", cat: "Huidtips", date: "2026-08-26", title: "Huid verzorgen na de zomer" },
    { slug: "collageen", img: "producten-environ", cat: "Huidtips", date: "2026-06-12", title: "Activeer je eigen collageenvorming" },
    { slug: "neo-lift", img: "neo-lift", cat: "Nieuw", date: "2026-04-03", title: "Nieuw in het instituut: Neo-Lift" },
    { slug: "darmen", img: "productadvies", cat: "Huidtips", date: "2026-02-10", title: "Gezonde darmen, gezonde huid" },
    { slug: "huidanalyse", img: "huidanalyse-scan", cat: "Nieuw", date: "2025-11-05", title: "Nieuw: huidanalyse met Lightskin 3D" }
  ]
};
