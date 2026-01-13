import { VersionEntry } from './types';

export const ABOUT_VERSIONS =
    "FLYT er under kontinuerlig utvikling og det blir stadig lagt til ny funksjonalitet samt forbedret brukeropplevelse basert på brukernes innspill - Denne siden beskriver  " +
    "større endringer og feilrettinger i FLYT";



export const VERSION_DATA: VersionEntry[] = [
    {
        heading: 'Januar 2026',
        updates: [
            {
                title: 'Visuelle endringer:',
                text: 'Flere rammer rundt tabeller og elementer er fjernet, og fargebruken er justert for bedre samsvar med Novarias profil.',
            },
            {
                title: 'Dashboard:',
                text: 'Nytt design og optimalisert datainnhenting for raskere innlasting.',
            },
            {
                title: 'Ytelse i tabeller:',
                text: 'Tabeller lastes nå betydelig raskere med redusert ventetid før visning.',
            },
            {
                title: 'Designendringer i tabellene:',
                text: 'Ny lastingsindikator gjør at tabellen vises før all data er ferdig innlastet.',
            },
            {
                title: 'Filtrering i instans-tabellen:',
                text: 'Sidepanelet er erstattet av en modal. Filterknappen viser nå antall aktive filtre.',
            },
            {
                title: 'Konfigurasjonssiden:',
                text: 'Små visuelle justeringer for et mer helhetlig uttrykk.',
            },
            {
                title: 'Layout:',
                text: 'Alle sider følger nå en enhetlig layout for konsekvent plassering av elementer.',
            },
            {
                title: 'Kommentarer i konfigurasjonsversjonstabeller:',
                text: 'Lange kommentarer trunkeres med ellipsis for å hindre layoutfeil som skjulte handlingsknappen.',
            },
        ],
    },
    {
        heading: 'Desember 2025',
        updates: [
            {
                text: 'Omskriving av pakker og versjonsoppdateringer.',
            },
        ],
    },
    {
        heading: 'Oktober 2025',
        updates: [
            {
                title: 'Endringshistorikk:',
                text: 'Du kan nå se hvem som har gjort endringer i konfigurasjoner og når de ble gjort.',
            },
        ],
    },
    {
        heading: 'Juni 2025',
        updates: [
            {
                title: 'Skjema for ny integrasjon:',
                text: 'Skjemaet for å opprette en ny integrasjon er nå oppdatert slik at man ikke lengre kan velge en integrasjon fra en kilde som allerede finnes. Integrasjonen vil være synlig i nedtrekksfeltet, men ikke mulig å velge.',
            },
            {
                text: 'I tillegg er det samme skjemaet nå forbedret med en rekke små endringer for å gjøre det mer brukervennlig.',
            },
        ],
    },
    {
        heading: 'Mai 2025',
        updates: [
            {
                title: 'Utlogging:',
                text: 'Det er nå mulig å logge ut fra FLYT via en knapp i menyen.',
            },
            {
                text: 'Små designforbedringer på menyen.',
            },
            {
                text: 'Opprydding av versjonslogger på ulike språk',
            },
        ],
    },
    {
        heading: 'April 2025',
        updates: [
            {
                text: 'Støtte for filtrering i instansoversikten',
            },
            {
                text: 'Lagt til flere detaljer i dashbordet for diverse statuser på instanser',
            },
        ],
    },
    {
        heading: 'Februar 2025',
        updates: [
            {
                text: 'Konverter til nytt Novari-tema',
            },
            {
                text: 'Flyttet rullefelt til vindu, still fokus',
            },
        ],
    },
    {
        heading: 'Oktober 2024',
        updates: [
            {
                text: 'Støtte for VIGO OT',
            },
            {
                text: 'Lagt til bedre og mer presis feilhåndtering',
            },
        ],
    },
    {
        heading: 'September 2024',
        updates: [
            {
                text: 'Sletting av mellomlagrede instanser',
            },
            {
                text: 'Lagt til tilgangsstyring på kildeapplikasjon',
            },
        ],
    },
    {
        heading: 'August 2024',
        updates: [
            {
                text: 'Lagt til manuell behandling av instanser',
            },
        ],
    },
    {
        heading: 'April 2024',
        updates: [
            {
                title: '10.4:',
                text: 'Ny verdikonvertering krever unikt navn for å gjøre dem enklere å bruke i konfigurasjoner',
            },
        ],
    },
    {
        heading: 'Februar 2024',
        updates: [
            {
                title: '3.2:',
                text: 'Navneendring i konfigurasjonsoppsett, "dynamisk verdi" heter nå "egendefinert verdi".',
            },
        ],
    },
    {
        heading: 'Januar 2024',
        updates: [
            {
                title: '20.1:',
                text: 'Lagt til mulighet for å velge å vise flere instanser og integrasjoner per side i tabellene',
            },
            {
                title: '11.1:',
                text: 'Fjernet menyvalget for "NY" og opprettet knapp for ny integrasjon på integrasjonssiden.',
            },
            {
                title: '5.1:',
                text: 'Oppdatert/nytt design på sidene for ny integrasjon og konfigurasjonsoppsett, språkvalg på menybar',
            },
            {
                title: '5.1:',
                text: 'Nytt utseende på Dashbord - Innhold fra supportsiden ligger nå her.',
            },
        ],
    },
    {
        heading: 'Desember 2023',
        updates: [
            {
                title: '27.12:',
                text: 'Lagt til støtte for engelsk språk i FLYT.',
            },
            {
                title: '12.12:',
                text: 'Nytt design av integrasjonsoversikten.',
            },
            {
                title: '11.12:',
                text: 'Lagt til støtte for nynorsk språk i FLYT.',
            },
            {
                title: '8.12:',
                text: 'Forbedret visning av verdikonvertering med flere verdier. Nytt design av instanssiden hvor all informasjon er samlet på én flate.',
            },
            {
                title: '1.12:',
                text: 'La til ny side med visning av versjoner og hva som er nytt i FLYT.',
            },
        ],
    },
    {
        heading: 'November 2023',
        updates: [
            {
                title: '30.11:',
                text: 'Nytt design av vertikonverteringssiden og oppdaterete feilmeldinger for instans som feilet ved innsending.',
            },
            {
                title: '27.11:',
                text: 'Nytt design på supportsiden.',
            },
            {
                title: '23.11:',
                text: 'Diverse feilrettinger og noe endring av brukergrensesnittet.',
            },
        ],
    },
];
