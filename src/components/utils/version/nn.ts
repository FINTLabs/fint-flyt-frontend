import { VersionEntry } from './types';

export const ABOUT_VERSIONS_NN =
    'FLYT er under kontinuerleg utvikling og det blir stadig lagt til ny funksjonalitet og forbetra brukaroppleving basert på innspel frå brukarar. Denne sida beskriv større endringar og feilrettingar i FLYT';

export const VERSION_DATA_NN: VersionEntry[] = [
    {
        heading: 'Oktober 2025',
        updates: [
            'Du kan no sjå kven som har gjort endringar i konfigurasjonar, og når dei vart gjort.',
        ],
    },
    {
        heading: 'Juni 2025',
        updates: [
            'Skjemaet for å opprette ein ny integrasjon er no oppdatert slik at ein ikkje lenger kan velja ein integrasjon frå ei kjelde som allereie finst. Integrasjonen vil vera synleg i nedtrekksfeltet, men ikkje mogleg å velja.',
            'I tillegg er det same skjemaet no forbetra med ei rekkje små endringar for å gjera det meir brukarvennleg.',
        ],
    },
    {
        heading: 'Mai 2025',
        updates: [
            'Det er no mogleg å logge ut frå FLYT via ein knapp i menyen.',
            'Små designforbetringar på menyen.',
            'Opprydding av versjonsloggar på ulike språk',
        ],
    },
    {
        heading: 'April 2025',
        updates: [
            'Støtte for filtrering i instansoversikta',
            'Lagt til fleire detaljar i dashbordet for ulike statusar på instansar',
        ],
    },
    {
        heading: 'Februar 2025',
        updates: ['Konverter til nytt Novari-tema', 'Flytta rullefelt til vindauge, set fokus'],
    },
    {
        heading: 'Oktober 2024',
        updates: ['Støtte for VIGO OT', 'Lagt til betre og meir presis feilhandsaming'],
    },
    {
        heading: 'September 2024',
        updates: [
            'Sletting av mellomlagra instansar',
            'Lagt til tilgangsstyring på kjeldeapplikasjon',
        ],
    },
    {
        heading: 'August 2024',
        updates: ['Lagt til manuell handsaming av instansar'],
    },
    {
        heading: 'April 2024',
        updates: [
            '10.4 Ny verdikonvertering krev unikt namn for å gjera dei enklare å bruka i konfigurasjonar',
        ],
    },
    {
        heading: 'Februar 2024',
        updates: [
            '3.2 Navneendring i konfigurasjonsoppsett, "dynamisk verdi" heiter nå "eigendefinert verdi"',
        ],
    },
    {
        heading: 'Januar 2024',
        updates: [
            '20.1 Lagt til moglegheit for å velja å visa fleire instansar og integrasjonar per side i tabellane',
            '11.1 Fjerna menyvalet for "NY" og oppretta knapp for ny integrasjon på integrasjonssidaa',
            '5.1 Oppdatert/nytt design på sidene for ny integrasjon og konfigurasjonsoppsett, språkval på menybar',
            '5.1 Nytt utseende på Dashbordet - Innhald frå supportsida ligg no her',
        ],
    },
    {
        heading: 'Desember 2023',
        updates: [
            '27.12 Lagt til støtte for engelsk språk i Flyt',
            '12.12 Nytt design av integrasjonsoversikta',
            '11.12 Lagt til støtte for nynorsk språk i Flyt',
            '8.12 Forbetra visning av verdikonvertering med fleire verdiar. Nytt design av instanssida der all informasjon er samla på éi flate.',
            '1.12 La til ny side med visning av versjonar og kva som er nytt i Flyt',
        ],
    },
    {
        heading: 'November 2023',
        updates: [
            '30.11  Nytt design av vertikonverteringsida og oppdaterte feilmeldingar for instans som feila ved innsending',
            '27.11  Nytt design av supportsida',
            '23.11  Diverse feilrettingar og noko endring av brukargrensesnittet',
        ],
    },
];
