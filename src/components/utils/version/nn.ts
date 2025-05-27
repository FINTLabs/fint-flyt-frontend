import { VersionEntry } from './types';

export const ABOUT_VERSIONS_NN =
    "FLYT er under kontinuerleg utvikling og det blir stadig lagt til ny funksjonalitet og forbetra brukaroppleving basert på innspel frå brukarar. Denne sida beskriv større endringar og feilrettingar i FLYT";

export const VERSION_DATA_NN: VersionEntry[] = [
    {
        heading: "Versjon 10.5 - Februar 2025",
        updates: [
            "Konverter til nytt Novari-tema",
            "Flytta rullefelt til vindauge, set fokus",
        ],
    },
    {
        heading: "Versjon 10.4 - April 2024",
        updates: [
            "10.4 Ny verdikonvertering krev unikt namn for å gjera dei enklare å bruka i konfigurasjonar",
        ],
    },
    {
        heading: "Februar 2024",
        updates: [
            "3.2 Navneendring i konfigurasjonsoppsett, \"dynamisk verdi\" heiter nå \"eigendefinert verdi\"",
        ],
    },
    {
        heading: "Januar 2024",
        updates: [
            "20.1 Lagt til moglegheit for å velja å visa fleire instansar og integrasjonar per side i tabellane",
            "11.1 Fjerna menyvalet for \"NY\" og oppretta knapp for ny integrasjon på integrasjonssidaa",
            "5.1 Oppdatert/nytt design på sidene for ny integrasjon og konfigurasjonsoppsett, språkval på menybar",
            "5.1 Nytt utseende på Dashbordet - Innhald frå supportsida ligg no her",
        ],
    },
    {
        heading: "Desember 2023",
        updates: [
            "27.12 Lagt til støtte for engelsk språk i Flyt",
            "12.12 Nytt design av integrasjonsoversikta",
            "11.12 Lagt til støtte for nynorsk språk i Flyt",
            "8.12 Forbetra visning av verdikonvertering med fleire verdiar. Nytt design av instanssida der all informasjon er samla på éi flate.",
            "1.12 La til ny side med visning av versjonar og kva som er nytt i Flyt",
        ],
    },
    {
        heading: "November 2023",
        updates: [
            "30.11  Nytt design av vertikonverteringsida og oppdaterte feilmeldingar for instans som feila ved innsending",
            "27.11  Nytt design av supportsida",
            "23.11  Diverse feilrettingar og noko endring av brukargrensesnittet",
        ],
    },
];
