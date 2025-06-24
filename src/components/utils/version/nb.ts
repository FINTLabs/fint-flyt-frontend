import { VersionEntry } from './types';

export const ABOUT_VERSIONS =
    "FLYT er under kontinuerlig utvikling og det blir stadig lagt til ny funksjonalitet samt forbedret brukeropplevelse basert på brukernes innspill - Denne siden beskriver  " +
    "større endringer og feilrettinger i FLYT";

export const VERSION_DATA: VersionEntry[] = [
    {
        heading: "Juni 2025",
        updates: [
            "Skjemaet for å opprette en ny integrasjon er nå oppdatert slik at man ikke lengre kan velge en integrasjon fra en kilde som allerede finnes. Integrasjonen vil være synlig i nedtrekksfeltet, men ikke mulig å velge.",
            "I tillegg er det samme skjemaet nå forbedret med en rekke små endringer for å gjøre det mer brukervennlig.",
        ]
    },
    {
        heading: "Mai 2025",
        updates: [
            "Det er nå mulig å logge ut fra FLYT via en knapp i menyen.",
            "Små designforbedringer på menyen.",
            "Opprydding av versjonslogger på ulike språk",
        ]
    },
    {
        heading: "April 2025",
        updates: [
            "Støtte for filtrering i instansoversikten",
            "Lagt til flere detaljer i dashbordet for diverse statuser på instanser",
        ],
    },
    {
        heading: "Februar 2025",
        updates: [
            "Konverter til nytt Novari-tema",
            "Flyttet rullefelt til vindu, still fokus",
        ],
    },
    {
        heading: "Oktober 2024",
        updates: [
            "Støtte for VIGO OT",
            "Lagt til bedre og mer presis feilhåndtering",
        ],
    },
    {
        heading: "September 2024",
        updates: [
            "Sletting av mellomlagrede instanser",
            "Lagt til tilgangsstyring på kildeapplikasjon",
        ],
    },
    {
        heading: "August 2024",
        updates: [
            "Lagt til manuell behandling av instanser",
        ],
    },
    {
        heading: "April 2024",
        updates: [
            "10.4 Ny verdikonvertering krever unikt navn for å gjøre dem enklere å bruke i konfigurasjoner",
        ],
    },
    {
        heading: "Februar 2024",
        updates: [
            "3.2 Navneendring i konfigurasjonsoppsett, \"dynamisk verdi\" heter nå \"egendefinert verdi\"",
        ],
    },
    {
        heading: "Januar 2024",
        updates: [
            "20.1 Lagt til mulighet for å velge å vise flere instanser og integrasjoner per side i tabellene",
            "11.1 Fjernet menyvalget for \"NY\" og opprettet knapp for ny integrasjon på integrasjonssiden",
            "5.1 Oppdatert/nytt design på sidene for ny integrasjon og konfigurasjonsoppsett, språkvalg på menybar",
            "5.1 Nytt utsende på Dashbord - Innhold fra supportsiden ligger nå her",
        ],
    },
    {
        heading: "Desember 2023",
        updates: [
            "27.12 Lagt til støtte for engelsk språk i Flyt",
            "12.12 Nytt design av integrasjonsoversikten",
            "11.12 Lagt til støtte for nynorsk språk i Flyt",
            "8.12 Forbedret visning av verdikonvertering med flere verdier. Nytt design av instanssiden hvor all informasjon er samlet på én flate.",
            "1.12 La til ny side med visning av versjoner og hva som er nytt i Flyt",
        ],
    },
    {
        heading: "November 2023",
        updates: [
            "30.11  Nytt design av vertikonvertering siden og oppdaterete feilmeldinger for instans som feilet ved innsending",
            "27.11  Nytt design av support siden",
            "23.11  Diverse feilrettinger og noe endring av brukergrensesnittet",
        ],
    },
];