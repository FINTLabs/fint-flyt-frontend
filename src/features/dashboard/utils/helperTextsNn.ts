export const FLYT_DESCRIPTION_NN = "Fint Flyt er ei integrasjonsplattform utvikla for å forenkle og redusere talet på integrasjonar mellom fagsystem. " +
    "Behovet for overføring av data mellom fagsystem i fylkeskommunane aukar i takt med digitaliseringa av offentleg sektor. For å møte dette behovet på ein effektiv måte, vart ideen om Fint Flyt til. \n" +
    "Fylkeskommunane handsamar i dag store mengder data med alt frå søknader, løyve, tilvisingar, samtykke, rapportar m.m. I dei fleste tilfelle må desse dataene overførast til andre system som til dømes ulike arkivsystem eller økonomisystem for fakturering og utbetaling. I fylkeskommunane vert det nytta svært mange ulike fagsystem som ikkje nødvendigvis snakkar same språk. ";

export const FAQ_NN: { header: string, content: string }[] = [
    {
        header: "Korleis brukar eg metadata?",
        content: "Metadata kan nyttast i alle eigendefinerte felt. I utgåande data er det alle tekstfeltene, og i tillegg dei nedtrekksmenyane der du kan velje 'dynamisk verdi'. Dette gjer at brukaren kan byggje opp titlar, personalia eller andre felt med informasjon frå innsendt data."
    },
    {
        header: "Kva tyder symbola som dukkar opp når eg nyttar metadata?",
        content: "Dei eigendefinerte felta tillèt både fri tekst og å nytte data frå skjema. For at ein datamaskin skal kunne skilje fri tekst frå metadata, viser metadata seg på denne forma: '$if{metadata-id}'. På den måten kan systemet gjenkjenne desse referansane og bytte ut innhaldet med data frå innsendt instans. Difor er det viktig å halde forma til metadata-referansar når ein redigerer eller legg til fri tekst i eit eigendefinert felt."
    },
    {
        header: "Kva er ein verdikonvertering og korleis brukar eg den?",
        content: "Verdikonvertering er eit felt som lèt deg bruke ein definert regel for å konvertere kvar førekomst av ein verdi. Verdikonverteringar vert sett opp i menyen for verdikonvertering og brukast på same måte som metadata. Dra inn verdikonverteringa du vil nyttje, etterfylgt av verdien som skal konverterast."
    },
    {
        header: "Kvifor kan ikkje Flyt gi feilmelding når eg set opp ei konfigurasjon med kombinasjon av kodeverk eller verdiar som destinasjonen ikkje tillèt?",
        content: "Flyt vil berre ha moglegheit til å omforme data etter reglar som vert sett opp i konfigurasjonen. Flyt er ikkje kopla til destinasjonen med informasjon om kva som vert akseptert/ikkje akseptert. Flyt mottar data, omformar etter gitt konfigurasjon og sender det vidare. Dersom destinasjonen avviser innsendinga, vil det visast ei feilmelding i instansoversikta."
    }
]
