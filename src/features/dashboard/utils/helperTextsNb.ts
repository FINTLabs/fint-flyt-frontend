export const FLYT_DESCRIPTION = "Fint Flyt er en integrasjonsplattform utviklet for å forenkle og redusere antall integrasjoner mellom fagsystemer. " +
    "Behovet for overføring av data mellom fagsystemer i fylkeskommunene øker i takt med digitaliseringen av offentlig sektor. For å møte dette behovet på en effektiv måte, ble idéen om Fint Flyt til. \n" +
    "Fylkeskommunene behandler i dag store mengder data med alt fra søknader, tillatelser, henvisninger, samtykke, rapporter m.m. I de fleste tilfeller må disse dataene overføres til andre systemer som f.eks ulike  arkivsystem eller økonomisystem for fakturering og utbetaling. I fylkeskommunene brukes det svært mange forskjellige fagsystemer som ikke nødvendigvis snakker samme språk. "

export const FAQ: { header: string, content: string }[] = [
    {
        header: "Hvordan bruker jeg metadata?",
        content: "Metadata kan brukes i alle egendefinerte felt. I utgående data er det alle tekstfeltene, og i tillegg de nedtrekksmenyene hvor du kan velge 'egendefinert verdi'. Dette gjør at bruker kan bygge opp titler, personalia eller andre felter med informasjon fra innsendt data"
    },
    {
        header: "Hva betyr symbolene som dukker opp når jeg bruker metadata?",
        content: "De egendefinerte feltene tillater både fri tekst og å benytte data fra skjema. For at en datamaskin skal kunne skille fritekst fra metadata vises metadata på dette formatet: '$if{metadata-id}. På den måten kan systemet gjenkjenne disse referansene og bytte ut innholdet med data fra innsendt instans. Det er derfor viktig at man beholder formatet til metadata-referanser når man redigerer eller legger til fritekst i et egendefinert felt"
    },
    {
        header: "Hva er en verdikonvertering og hvordan bruker jeg den?",
        content: "Verdikonvertering er et felt som lar deg bruke en definert regel for å konvertere hver forekomst av en verdi. Verdikonverteringer settes opp i menyen for verdikonvertering og brukes på samme måte som metadata, dra inn verdikonverteringen du ønsker å benytte, etterfulgt av verdien som skal konverteres"
    },
    {
        header: "Hvorfor kan ikke Flyt gi feilmelding når jeg setter opp en konfigurasjon med kombinasjon av kodeverk eller verdier som destinasjon ikke tillater?",
        content: "Flyt vil kun ha mulighet til å omforme data etter regler som settes opp i konfigurajonen. Flyt er ikke koblet på destinasjon med informasjon om hva som godtas/godtas ikke. Flyt mottar data, omformer etter gitt konfigurajon og sender den videre. Dersom destinasjonen avviser innsendingen vil det vises feilmelding i instansoversikten."
    }
]