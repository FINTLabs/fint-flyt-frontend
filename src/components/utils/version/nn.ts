import { VersionEntry } from './types';

export const ABOUT_VERSIONS_NN =
    'FLYT er under kontinuerleg utvikling og det blir stadig lagt til ny funksjonalitet og forbetra brukaroppleving basert på innspel frå brukarar. Denne sida beskriv større endringar og feilrettingar i FLYT';

export const VERSION_DATA_NN: VersionEntry[] = [

    {
        heading: "Januar 2026",
        updates: [
            {
                title: "Visuelle endringar:",
                text: "Fleire rammer rundt tabellar og element er fjerna, og fargebruken er justert for betre samsvar med Novaria-profilen."
            },
            {
                title: "Dashboard:",
                text: "Nytt design og optimalisert datainnhenting for raskare innlasting."
            },
            {
                title: "Yting i tabellar:",
                text: "Tabellar lastar no merkbart raskare med redusert ventetid før vising."
            },
            {
                title: "Designendringar i tabellane:",
                text: "Ny lastingsindikator gjer at tabellen blir vist før all data er ferdig innlasta."
            },
            {
                title: "Filtrering i instans-tabellen:",
                text: "Sidepanelet er erstatta av ein modal. Filterknappen viser no talet på aktive filter."
            },
            {
                title: "Konfigurasjonssida:",
                text: "Små visuelle justeringar for eit meir heilskapleg uttrykk."
            },
            {
                title: "Layout:",
                text: "Alle sider følgjer no ein einskapleg layout for konsekvent plassering av element."
            },
            {
                title: "Kommentarar i konfigurasjonsversjonstabellar:",
                text: "Lange kommentarar blir trunkerte med ellipsis for å hindre layoutfeil som skjulte handlingsknappen."
            }
        ]
    },
    {
        heading: "Desember 2025",
        updates: [
            {
                text: "Omskriving av pakkar og oppdatering av versjonar."
            }
        ]
    },
    {
        heading: 'Oktober 2025',
        updates: [
            {
                text: 'Du kan no sjå kven som har gjort endringar i konfigurasjonar, og når dei vart gjort.',
            },
        ],
    },
    {
        heading: 'Juni 2025',
        updates: [
            {
                text: 'Skjemaet for å opprette ein ny integrasjon er no oppdatert slik at ein ikkje lenger kan velja ein integrasjon frå ei kjelde som allereie finst. Integrasjonen vil vera synleg i nedtrekksfeltet, men ikkje mogleg å velja.',
            },
            {
                text: 'I tillegg er det same skjemaet no forbetra med ei rekkje små endringar for å gjera det meir brukarvennleg.',
            },
        ],
    },
    {
        heading: 'Mai 2025',
        updates: [
            { text: 'Det er no mogleg å logge ut frå FLYT via ein knapp i menyen.' },
            { text: 'Små designforbetringar på menyen.' },
            { text: 'Opprydding av versjonsloggar på ulike språk' },
        ],
    },
    {
        heading: 'April 2025',
        updates: [
            { text: 'Støtte for filtrering i instansoversikta' },
            { text: 'Lagt til fleire detaljar i dashbordet for ulike statusar på instansar' },
        ],
    },
    {
        heading: 'Februar 2025',
        updates: [
            { text: 'Konverter til nytt Novari-tema' },
            { text: 'Flytta rullefelt til vindauge, set fokus' },
        ],
    },
    {
        heading: 'Oktober 2024',
        updates: [
            { text: 'Støtte for VIGO OT' },
            { text: 'Lagt til betre og meir presis feilhandsaming' },
        ],
    },
    {
        heading: 'September 2024',
        updates: [
            { text: 'Sletting av mellomlagra instansar' },
            { text: 'Lagt til tilgangsstyring på kjeldeapplikasjon' },
        ],
    },
    {
        heading: 'August 2024',
        updates: [{ text: 'Lagt til manuell handsaming av instansar' }],
    },
    {
        heading: 'April 2024',
        updates: [
            {
                title: '10.4:',
                text: 'Ny verdikonvertering krev unikt namn for å gjera dei enklare å bruka i konfigurasjonar',
            },
        ],
    },
    {
        heading: 'Februar 2024',
        updates: [
            {
                title: '3.2:',
                text: 'Navneendring i konfigurasjonsoppsett, "dynamisk verdi" heiter nå "eigendefinert verdi"',
            },
        ],
    },
    {
        heading: 'Januar 2024',
        updates: [
            {
                title: '20.1:',
                text: 'Lagt til moglegheit for å velja å visa fleire instansar og integrasjonar per side i tabellane',
            },
            {
                title: '11.1:',
                text: 'Fjerna menyvalet for "NY" og oppretta knapp for ny integrasjon på integrasjonssidaa',
            },
            {
                title: '5.1:',
                text: 'Oppdatert/nytt design på sidene for ny integrasjon og konfigurasjonsoppsett, språkval på menybar',
            },
            {
                title: '5.1:',
                text: 'Nytt utseende på Dashbordet - Innhald frå supportsida ligg no her',
            },
        ],
    },
    {
        heading: 'Desember 2023',
        updates: [
            { title: '27.12:', text: 'Lagt til støtte for engelsk språk i Flyt' },
            { title: '12.12:', text: 'Nytt design av integrasjonsoversikta' },
            { title: '11.12:', text: 'Lagt til støtte for nynorsk språk i Flyt' },
            {
                title: '8.12:',
                text: 'Forbetra visning av verdikonvertering med fleire verdiar. Nytt design av instanssida der all informasjon er samla på éi flate.',
            },
            {
                title: '1.12:',
                text: 'La til ny side med visning av versjonar og kva som er nytt i Flyt',
            },
        ],
    },
    {
        heading: 'November 2023',
        updates: [
            {
                title: '30.11:',
                text: 'Nytt design av vertikonverteringsida og oppdaterte feilmeldingar for instans som feila ved innsending',
            },
            { title: '27.11:', text: 'Nytt design av supportsida' },
            {
                title: '23.11:',
                text: 'Diverse feilrettingar og noko endring av brukargrensesnittet',
            },
        ],
    },
];
