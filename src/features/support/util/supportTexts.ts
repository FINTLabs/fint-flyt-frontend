export const USER_GUIDE = [
    "Gå til 'Ny' i menyen",
    "Velg kildeapplikasjon, integrasjon og destinasjon",
    "Når du trykker 'Opprett', blir integrasjonen opprettet i Flyt, og du vil få mulighet til å legge til en konfigurasjon nå, eller senere ved å finne integrasjonen du nettopp opprettet i 'integrasjoner' i menyen",
    "Fyll ut konfigurasjonsoppsettet etter integrasjonens behov, her kan du benytte metadata og gjøre verdikonverteringer. Dersom du skal ferdigstille og aktivere velger du det i sjekkboksene nederst på siden. Det er ikke mulig å aktivere før du har valgt fullført. Det er ikke påkrevd å aktivere en konfigurasjon ved ferdigstilling, men Flyt vil ikke motta og behandle instanser for en intagrasjon, før den har en aktiv konfigurasjon",
    "Dersom du vil legge til, endre eller se på konfigurasjonene til en integrasjon, gå til 'Integrasjoner' i menyen, velg integrasjonen du vil se på og trykk 'Vis'. Da vil du få oversikt over utkast, ferdigstilte og hvilken konfigurasjon som er eventuelt er aktiv." +
    "Velg rediger om du vil fortesette arbeidet med en påbegynt konfigurasjon eller velg ny dersom du vil opprette en helt ny. Da vil du kunne velge å begynne med en blank konfigurasjon eller basere deg på en tidligere versjon. Merk at du ikke kan redigere en ferdigstilt konfigurasjon",
]

export const WORD_LIST = [
    "Integrasjon - Hvor data som skal omformes kommer fra, hvor den skal og hva den vil inneholde.",
    "Konfigurasjon - Hvordan dataen skal omformes fra kilde til destinasjon",
    "Metadata - I fint Flyt er metadata informasjon om innholdet i data som skal omformes. Metadata beskriver dataen som kommer inn til Flyt, mens konfigurasjonen beskriver hvordan utgående data skal være ",
    "Instans - Hver innsending av data for én integrasjon er en instans. Innholdet i innstansen blir omformet og videresent",
    "Verdikonvertering - Siden Flyt er platformuavhengig og ikke 'vet' hva som blir sendt inn eller hva destinsjonen godtar, vil det av og til dukke opp behov for verdikonvertering. Da vil vi sette opp et regelsett som betyr at for hver forekomst av en gitt data/verdi, vil verdien bli omformet eller konvertert til noe annet. Eksempler på dette er dersom et arkiv kun godtar enkelte mediatyper, eller dersom destinasjon kun godtar format som for eksempel stor/liten bokstav.",
    "Kildeapplikasjon - En kildeapplikasjon er fagsystemet hvor data som trenger omforming oppstår.",
    "Destinasjon - Hvor data skal sendes etter omforming i Flyt",
    "Egendefinert felt/verdi - For å benytte metadata i konfigurasjonen må vi ha felter som tillatter både fritekst og referanser til metadata. Dette kalles i Flyt egendefinerte felter. "
]

export const STATUS_DESCRIPTIONS = [
    "Instans mottatt - Instans ankommet FINT-Flyt fra fagsystem.",
    "Instans mellomlagret - Instans mellomlagret i fil-lagring, minne og i database.",
    "Instans konvertert - Instans behandlet og data konvertert i henhold til konfigurasjonen.",
    "Instans klar for sending til destinasjon - Instans er ferdigbehandlet i FINT-Flyt og blir sendt videre automatisk til fagsystem. Blir instansen hengende igjen på denne statusen har det skjedd en feil og dere må ta kontakt med Novari support <a href='https://support.jira.novari.no/servicedesk/customer/portals' target='_top'>her</a>",
    "Instans godtatt av destinasjon - Tilbakemelding fra fagsystem om at instans er sendt og alt gikk bra.",
    "Mellomlagring av instans slettet - Opprydning i henhold til GDPR om at vi sletter filer og instans etter den er videresendt med suksess.",
    "Feilet under sending til destinasjon - Feilmelding fra fagssystem havner ofte her. Dersom den er manglerfull eller uforståeling, ta kontakt med Novari.",
]
