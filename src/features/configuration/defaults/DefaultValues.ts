// noinspection SpellCheckingInspection
import {ISelect} from "../types/Select";
import {IInstanceElementMetadata, IMetadata, Type} from "../types/Metadata/Metadata";

export const variant: string = 'https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/P'
export const format: string = 'https://beta.felleskomponent.no/arkiv/kodeverk/format/systemid/PDF'

export const sourceApplications: ISelect[] = [
    { label: "ACOS", value: "1" },
    { label: "eGrunnerverv", value: "2" }
];

export const destinations: ISelect[] = [
    { label: "Fylkesråd", value: "fylkesrad" }
];

//TODO after removing old forms
export const SOURCE_FORM_NO_VALUES: IMetadata =
    {
        sourceApplicationId: "string",
        sourceApplicationIntegrationId: "string",
        sourceApplicationIntegrationUri: "string",
        integrationDisplayName: "INGEN DATA",
        instanceElementMetadata: [],
        version: 0
    }

export const MOCK_INSTANCE_ELEMENT_METADATA: IInstanceElementMetadata[] =
    [
        {
            "key": null,
            "type": Type.STRING,
            "displayName": "Integrasjon",
            "children": [
                {
                    "key": "SkjemaPdf",
                    "type": Type.FILE,
                    "displayName": "skjemaPdf",
                    "disabled": true,
                    "children": []
                },
                {
                    "key": null,
                    "type": Type.STRING,
                    "displayName": "Vedlegg",
                    "children": [
                        {
                            "key": "Navn",
                            "type": Type.STRING,
                            "displayName": "navn",
                            "disabled": true,
                            "children": []
                        },
                        {
                            "key": "Type",
                            "type": Type.STRING,
                            "displayName": "type",
                            "disabled": true,
                            "children": []
                        },
                        {
                            "key": "Enkoding",
                            "type": Type.STRING,
                            "displayName": "enkoding",
                            "disabled": true,
                            "children": []
                        },
                        {
                            "key": "Fil",
                            "type": Type.FILE,
                            "displayName": "fil",
                            "disabled": true,
                            "children": []
                        }
                    ]
                },
                {
                    "key": null,
                    "type": Type.STRING,
                    "displayName": "Steg",
                    "children": [
                        {
                            "key": null,
                            "type": Type.STRING,
                            "displayName": "Personalia",
                            "children": [
                                {
                                    "key": "skjema.Fornavn",
                                    "type": Type.STRING,
                                    "displayName": "Fornavn",
                                    "children": []
                                },
                                {
                                    "key": "skjema.Etternavn",
                                    "type": Type.STRING,
                                    "displayName": "Etternavn",
                                    "children": []
                                },
                                {
                                    "key": "skjema.Fdato",
                                    "type": Type.DATE,
                                    "displayName": "Fødselsdato",
                                    "children": []
                                },
                                {
                                    "key": "skjema.Fodselsnummer",
                                    "type": Type.INTEGER,
                                    "displayName": "Fødselsnummer",
                                    "children": []
                                },
                                {
                                    "key": "skjema.Adresse",
                                    "type": Type.STRING,
                                    "displayName": "Adresse",
                                    "children": []
                                },
                                {
                                    "key": "skjema.Postnr",
                                    "type": Type.STRING,
                                    "displayName": "Postnummer",
                                    "children": []
                                },
                                {
                                    "key": "skjema.Poststed",
                                    "type": Type.STRING,
                                    "displayName": "Poststed",
                                    "children": []
                                },
                                {
                                    "key": "skjema.Epost",
                                    "type": Type.EMAIL,
                                    "displayName": "Epost",
                                    "children": []
                                },
                                {
                                    "key": "skjema.TlfNummer",
                                    "type": Type.PHONE,
                                    "displayName": "Telefonnummer",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "key": null,
                    "type": Type.STRING,
                    "displayName": "Organisasjon",
                    "children": [
                        {
                            "key": "skjema.Orgsnummer",
                            "type": Type.INTEGER,
                            "displayName": "Organisasjonsnummer",
                            "children": []
                        },
                        {
                            "key": "skjema.Adresse2",
                            "type": Type.STRING,
                            "displayName": "Adresse",
                            "children": []
                        },
                        {
                            "key": "skjema.Postnr2",
                            "type": Type.STRING,
                            "displayName": "Postnummer",
                            "children": []
                        },
                        {
                            "key": "skjema.Poststed2",
                            "type": Type.STRING,
                            "displayName": "Poststed",
                            "children": []
                        },
                        {
                            "key": "skjema.Kontaktperson",
                            "type": Type.STRING,
                            "displayName": "Kontaktperson",
                            "children": []
                        },
                        {
                            "key": "skjema.TlfNummer2",
                            "type": Type.PHONE,
                            "displayName": "Telefonnummer",
                            "children": []
                        }
                    ]
                },
                {
                    "key": null,
                    "type": Type.STRING,
                    "displayName": "Referanse",
                    "children": [
                        {
                            "key": null,
                            "type": Type.STRING,
                            "displayName": "Referansenummer",
                            "children": [
                                {
                                    "key": "skjema.Refnr",
                                    "type": Type.INTEGER,
                                    "displayName": "ReferanseId",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "key": null,
                            "type": Type.STRING,
                            "displayName": "Referansegruppe",
                            "children": [
                                {
                                    "key": "skjema.Kontaktperson3",
                                    "type": Type.STRING,
                                    "displayName": "Kontaktperson",
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]


export const fieldHelp = {
    comment: 'Kommentar',
    version: '',
    sourceApplicationId: 'Kildeapplikasjon, f.eks ACOS',
    sourceApplicationIntegrationId: 'Integrasjon, f.eks VIK103',
    destination: 'fylkesting, fylkesråd, kollektiv ++',
    caseData: {
        caseCreationStrategy: 'Avleveringslogikk ...',
        id: ' må være på formatet saksår/sekvensnr, f.eks 2021/12345',
        title: 'Tittel kan være en konkret tekststreng, eller en kombinasjon\n' +
            ' av flere metadatafelt. (Settes opp i henhold til skriveregler for type sak.\n' +
            '  (Se Noark))',
        publicTitle: 'Se Noark (Del av tittel som skal skjermes)',
        status: '-',
        caseType: 'Eksempel: Kompetanse, personal, rekrutering etc.',
        administrativeUnit:'Avdeling eller enhet som skal behandle saken.',
        archiveUnit:'Eksempel: kompetanse, sakarkiv, personal',
        recordUnit: 'Navnet på journalførende enhet.\n' +
            'Eksempel: Viken fylkesråd',
        accessCode: 'Dersom noe skjermes må man også sette tilgangskode. \n' +
            'Eksempel: Unntatt offentlighet, personal, varslingssak, ugradert. ',
        paragraph: 'Dersom det settes tilgangskode må det også settes hjemmel. \n' +
            'Det må være en lovmessig hjemmel for skjerming eller begrenset tilgang. \n' +
            '\n' +
            'Eksempel:\n' +
            '\n' +
            'Offl. §13 ',
        caseWorker: 'Konkret saksbehandler eller ufordelt.',
        classification: 'Det må kunne settes flere klasseringer på en sak,\n' +
            ' slik at sjemaet kan lete fram riktig sak.\n' +
            'Eksempel: Primærkode=K-koder, \n' +
            'Sekundærkode=organisasjonsnummer eller personnummer',
        class: 'Vi må kunne fylle ut verdi og betegnelse.\n' +
            'Eksempel: K-kode: Verdi 003, Betegnelse: Målbruk.\n' +
            'Person: verdi: fødselsnummer, betegnelse = personnavn.',
    },
    recordData: {
        title: 'Tittel kan være en konkret tekststreng, eller en kombinasjon\n' +
            ' av flere metadatafelt. (Settes opp i henhold til skriveregler for type sak.\n' +
            '  (Se Noark))',
        publicTitle: 'Se Noark (Del av tittel som skal skjermes)',
        type: 'I, U, N, X',
        administrativeUnit: 'Enheten/avdelingen. Nedtrekksmeny fra Elements',
        status: 'R,F,E,J',
        caseWorker: 'En sak kan ha en ansvarlig saksbehandler men det kan være ulike saksbehandlere på ulike journalposter.',
        accessCode: 'Eksempel: Unntatt offentlighet, persona,l varslingssak, ugradert. ',
        paragraph: 'Eksempel: Offl. §13 ',
        mainDocument: {
            title: 'Tittel kan være en konkret tekststreng, eller en kombinasjon\n' +
                ' av flere metadatafelt. (Settes opp i henhold til skriveregler for type sak.\n' +
                '  (Se Noark))',
            documentStatus: 'Eksempel: B, F',
            accessCode: 'Eksempel: Unntatt offentlighet, persona,l varslingssak, ugradert. ',
            paragraph: 'Eksempel: Offl. §13',
            format: 'Filformat, f.eks PDF',
            variant: 'Arkivformat/ produksjonsformat / offentlig variant',
            file: 'Fil'
        },
        attachmentDocuments: {
            title: 'Tittel kan være en konkret tekststreng, eller en kombinasjon\n' +
                ' av flere metadatafelt. (Settes opp i henhold til skriveregler for type sak.\n' +
                '  (Se Noark))',
            documentStatus: 'Eksempel: B, F',
            accessCode: 'Eksempel: Unntatt offentlighet, persona,l varslingssak, ugradert. ',
            paragraph: 'Eksempel: Offl. §13',
            format: 'Filformat, f.eks PDF',
            variant: 'Arkivformat/ produksjonsformat / offentlig variant',
            file: 'Fil'
        },
        correspondent: {
            type: 'Person eller organisasjon/bedrift',
            organisationNumber: 'Orgnr for avsenderbedrift',
            nationalIdentityNumber: 'Fødselsnummer for avsender',
            name: 'Navn på bedrift/org, eller person',
            address: 'Postadresse',
            postalCode: 'Postkode',
            city: 'Poststed',
            contactPerson: 'Navn på søker er ikke alltid lik med kontaktperson',
            phoneNumber: 'Telefonnummer',
            email: 'epostadresse',
            accessCode: 'velge om avsender skal være skjermet',
            paragraph: 'Denne skal fjernes',
        }
    }
}


export function getSourceApplicationDisplayName(id: any): string {
    if (id === 1) return 'ACOS';
    if (id === 2) return 'eGrunnerverv';
    else return "ukjent";
}

export function getDestinationDisplayName(id: any): string {
    if (id === 'fylkesrad') return 'Fylkesråd';
    else return "ukjent";
}

export function getStateDisplayName(id: any): string {
    if (id === 'ACTIVE') return 'Aktiv';
    if (id === 'DEACTIVATED') return 'Deaktivert';
    else return "ukjent";
}

