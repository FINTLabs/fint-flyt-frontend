export const FLYT_DESCRIPTION = "Fint Flyt er en integrasjonsplattform utviklet for å forenkle og redusere antall integrasjoner mellom fagsystemer. \n" +
    "\n" +
    "Behovet for overføring av data mellom fagsystemer i fylkeskommunene øker i takt med digitaliseringen av offentlig sektor. For å møte dette behovet på en effektiv måte, ble idéen om Fint Flyt til. \n" +
    "\n" +
    "Fylkeskommunene behandler i dag store mengder data med alt fra søknader, tillatelser, henvisninger, samtykke, rapporter m.m. I de fleste tilfeller må disse dataene overføres til andre systemer som f.eks ulike  arkivsystem eller økonomisystem for fakturering og utbetaling. I fylkeskommunene brukes det svært mange forskjellige fagsystemer som ikke nødvendigvis snakker samme språk. "

export const USER_GUIDE = "How to Flyt"

export const WORD_LIST = [
    "Integrasjon - Beskriver data som skal omformes. Hvor den kommer fra, hvor den skal og hva den vil inneholde.",
    "Konfigurasjon - Hvordan integrasjonen skal omforme dataen fra kilde til destinasjon",
    "Metadata - I fint Flyt er metadata informasjon som fins om hvilken data som skal omformes. Metadata beskriver dataen som kommer inn til Flyt, mens konfigurasjonen beskriver hvordan utgående data skal være ",
    "Instans - ",
    "Verdikonvertering - Siden Flyt er platformuavhengig og ikke \"vet\" hva som blir sendt inn eller hva destinsjonen godtar, vil det av og til dukke opp behov for verdikonvertering. Da vil vi sette opp et regelsett som betyr at for hver forekomst av dette, vil verdien bli omformet eller konvertert til noe annet. Eksempler på dette er dersom et arkiv kun godtar enkelte mediatyper, eller dersom destinasjon kun godtar format som foe eksempel stor/liten bokstav.",
    "Kildeapplikasjon - En kildeapplikasjon er fagsystemet hvor data som trenger omforming oppstår.",
    "Destinasjon - Hvor data skal etter omforming i Flyt",
    "Dynamisk felt/verdi - For å benytte metadata i konfigurasjonen må vi ha felter som tillatter både firtekst og referanser til metadata. Dette kalles i Flyt dynamiske felter. Her vil verdien som 'holder' på metadataen bli byttet ut for hver instans"
]

export const FAQ = [
    "Hvordan bruker jeg metadata? - ",
    "Hva betyr symbolene som dukker opp når jeg bruker metadata? - ",
    "Hva er en verdikonvertering og hvordan bruker jeg den? - ",
    "Hvorfor kan ikke FINT gi feilmelding når jeg setter opp en kombinasjon av kodeverk som destinasjon ikke tillater? - ",
]