// noinspection SpellCheckingInspection

import {ISelect} from "../types/InputField";
import {CreationStrategy} from "../types/CreationStrategy";
import {IFormConfiguration} from "../types/Form/FormData";
import {ApplicantType} from "../types/ApplicantType";
import {IIntegrationMetadata, Type} from "../types/IntegrationMetadata";
import {IIntegration} from "../types/Integration";
import {FieldConfigurationType, newIConfiguration} from "../types/Configuration";

export const defaultConfigurationValues: IFormConfiguration = {
    comment: '',
    completed: false,
    caseData: {
        caseCreationStrategy: CreationStrategy.NEW,
        caseNumber: undefined,
        title: null,
        publicTitle: null,
        caseType: null,
        administrativeUnit:null,
        archiveUnit:null,
        recordUnit: null,
        status: null,
        accessCode: null,
        paragraph: null,
        caseWorker: null,
        primaryClassification: null,
        secondaryClassification: null,
        tertiaryClassification: null,
        primaryClass: null,
        secondaryClass: null,
        tertiaryClass: null,
        primaryTitle: null,
        secondaryTitle: null,
        tertiaryTitle: null
    },
    recordData: {
        title: null,
        publicTitle: null,
        administrativeUnit: null,
        recordStatus: null,
        recordType: null,
        caseWorker: null,
        accessCode: null,
        paragraph: null
    },
    mainDocumentData: {
        documentStatus: null,
        documentType: null,
        variant: null
    },
    attachmentDocumentsData: {
        documentStatus: null,
        documentType: null,
        variant: null
    },
    applicantData: {
        protected: false,
        type: ApplicantType.PERSON,
        organisationNumber: null,
        nationalIdentityNumber: null,
        name: null,
        address: null,
        postalCode: null,
        city: null,
        contactPerson: null,
        phoneNumber: null,
        email: null,
        accessCode: null,
        paragraph: null
    }
}

export const dropdownPlaceholder: ISelect[] = [
    {label: 'Alternativ 1', value: 'alt1'},
    {label: 'Alternativ 2', value: 'alt2'},
    {label: 'Alternativ 3', value: 'alt3'},
    {label: 'Alternativ 4', value: 'alt4'},
    {label: 'Alternativ 5', value: 'alt5'},
    {label: 'Alternativ 6', value: 'alt6'},
    {label: 'Alternativ 7', value: 'alt7'},
    {label: 'Alternativ 8', value: 'alt8'},
    {label: 'Alternativ 9', value: 'alt9'},
    {label: 'Alternativ 10', value: 'alt10'}
]

export const variantOptions: ISelect[] = [
    {label: 'Produksjonsformat', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/P'}
]

export const creationStrategies: ISelect[] = [
    {label: 'selects.creationStrategies.new', value: 'NEW',  description: "selects.creationStrategies.newDesc"},
    {label: 'selects.creationStrategies.existing', value: 'BY_SEARCH_OR_NEW',  description: "selects.creationStrategies.existingDesc", disabled: true},
    {label: 'selects.creationStrategies.collection', value: 'BY_ID', description: "selects.creationStrategies.collectionDesc"}
];

export const applicantOptions: ISelect[] = [
    {label: 'selects.applicantOptions.individual',value: 'PERSON'},
    {label: 'selects.applicantOptions.organisation', value: 'ORGANISATION'}
];

export const sourceApplications: ISelect[] = [
    { label: "ACOS", value: "1" },
    { label: "eGrunnerverv", value: "2" }
];

export const destinations: ISelect[] = [
    { label: "Fylkesråd", value: "fylkesrad" }
];

//TODO after removing old forms
export const SOURCE_FORM_NO_VALUES: IIntegrationMetadata[] = [
    {
        sourceApplicationId: "string",
        sourceApplicationIntegrationId: "string",
        sourceApplicationIntegrationUri: "string",
        integrationDisplayName: "INGEN DATA",
        instanceElementMetadata: [],
        version: 0
    }
]

export const MOCK_SOURCE_FORM: IIntegrationMetadata[] =
    [
        {
            "sourceApplicationId":"1",
            "sourceApplicationIntegrationId":"PROD0195",
            "sourceApplicationIntegrationUri":"",
            "integrationDisplayName":"Oversett lister med datakilder",
            instanceElementMetadata:[
                {
                    "key":null,
                    "type": Type.STRING,
                    "displayName":"Første kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Arkivsystem",
                            "children":[
                                {
                                    "key":"Nedtrekk",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknapp",
                                    "type": Type.STRING,
                                    "displayName":"Radioknapp",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Stedsnavn",
                            "children":[
                                {
                                    "key":"Nedtrekk2",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste",
                                    "type": Type.STRING,
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser2",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Med grab - sted",
                            "children":[
                                {
                                    "key":"Nedtrekk5",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk6",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "key":null,
                    "type": Type.STRING,
                    "displayName":"Ny første kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk3",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste2",
                                    "type": Type.STRING,
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser3",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Med Grab",
                            "children":[
                                {
                                    "key":"Nedtrekk4",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste3",
                                    "type": Type.STRING,
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkboks2",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkboks",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "key":null,
                    "type": Type.STRING,
                    "displayName":"Andre kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk7",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste4",
                                    "type": Type.STRING,
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser4",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk8",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                }
            ],
            "version":1
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
        caseNumber: ' må være på formatet saksår/sekvensnr, f.eks 2021/12345',
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
    },
    mainDocumentData: {
        title: 'Tittel kan være en konkret tekststreng, eller en kombinasjon\n' +
            ' av flere metadatafelt. (Settes opp i henhold til skriveregler for type sak.\n' +
            '  (Se Noark))',
        documentStatus: 'Eksempel: B, F',
        accessCode: 'Eksempel: Unntatt offentlighet, persona,l varslingssak, ugradert. ',
        paragraph: 'Eksempel: Offl. §13',
        variant: 'Arkivformat/ produksjonsformat / offentlig variant'
    },
    applicantData: {
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

export const MOCK_INTEGRATIONS: IIntegration[] = [
    {
        id: '488',
        destination: 'fylkesråd',
        sourceApplicationId: 'ACOS',
        sourceApplicationIntegrationId: 'TEST0488'
    },
    {
        id: '234',
        destination: 'fylkesråd',
        sourceApplicationId: 'ACOS',
        sourceApplicationIntegrationId: 'TEST234'
    },
    {
        id: '345',
        destination: 'fylkesråd',
        sourceApplicationId: 'ACOS',
        sourceApplicationIntegrationId: 'TEST345'
    },
    {
        id: '999',
        destination: 'fylkesråd',
        sourceApplicationId: 'ACOS',
        sourceApplicationIntegrationId: 'TEST999',
        activeConfigurationId: 'id2'
    },
    {
        id: '567',
        destination: 'fylkesråd',
        sourceApplicationId: 'ACOS',
        sourceApplicationIntegrationId: 'TEST567'
    },
    {
        id: '678',
        destination: 'fylkesråd',
        sourceApplicationId: 'ACOS',
        sourceApplicationIntegrationId: 'TEST678'
    },
]

export const MOCK_NEWCONFIGURATIONS: newIConfiguration[] = [
    /*    {
            integrationId: '678',
            version: 1,
            completed: false,
            caseConfiguration: {caseCreationStrategy: CreationStrategy.NEW, fields: []}
        },
        {
            integrationId: '456',
            version: 1,
            completed: false,
            caseConfiguration: {caseCreationStrategy: CreationStrategy.BY_ID, caseNumber: '2022/123'}
        },*/
    {
        id: 'id00',
        integrationId: '999',
        version: null,
        comment: 'Opprette konfigurasjon',
        completed: false,
        elements: []
    },
    {
        id: 'id0',
        integrationId: '999',
        version: null,
        comment: 'Første versjon - avventer endringer',
        completed: false,
        elements: []
    },
    {
        id: 'id1',
        integrationId: '999',
        version: null,
        completed: false,
        comment: 'Opprettet ny pga x, y, z',
        elements: [
            {
                key: 'case',
                fieldConfigurations: [
                    {
                        key: 'creationStrategy',
                        type: FieldConfigurationType.STRING,
                        value: CreationStrategy.NEW,
                    },
                    {
                        key: 'tittel',
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: "$if{foo} $if{bar} $if{bubu}",
                    },
                ]
            }
        ]
    },
    {
        id: 'id2',
        integrationId: '999',
        version: 1,
        completed: true,
        comment: 'Ferdigstilt ',
        elements: [
            {
                key: 'case',
                fieldConfigurations: [
                    {
                        key: 'tittel',
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: "$if{foo} $if{bar} $if{bubu}",
                    },
                    {
                        key: 'offentligTittel',
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: "$if{foo} test",
                    },
                    {
                        key: "administrativenhet",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/193",
                    },
                    {
                        key: "journalenhet",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/241",
                    },
                    {
                        key: "status",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/kodeverk/saksstatus/systemid/F",
                    },
                    {
                        key: "primarordningsprinsipp",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/EMNE",
                    },
                    {
                        key: "arkivdel",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/noark/arkivdel/systemid/OESMU"
                    },
                ]
            }
        ]
    },
    {
        id: 'id3',
        integrationId: '999',
        version: 2,
        completed: true,
        comment: 'Ferdigstilt versjon 2',
        elements: [
            {
                key: 'case',
                fieldConfigurations: [
                    {
                        key: 'tittel',
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: "$if{foo} $if{bar} $if{bubu}",
                    },
                    {
                        key: 'offentligTittel',
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: "$if{foo} test",
                    },
                    {
                        key: "administrativenhet",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/193",
                    },
                    {
                        key: "journalenhet",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/241",
                    },
                    {
                        key: "status",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/kodeverk/saksstatus/systemid/F",
                    },
                    {
                        key: "primarordningsprinsipp",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/EMNE",
                    },
                    {
                        key: "arkivdel",
                        type: FieldConfigurationType.STRING,
                        value: "https://beta.felleskomponent.no/arkiv/noark/arkivdel/systemid/OESMU"
                    },
                ]
            }
        ]
    }
]

export const EXAMPLE_FORM: IFormConfiguration = {
    "applicantData": {
        "type": ApplicantType.PERSON,
        "protected": false,
        "organisationNumber": '',
        "nationalIdentityNumber": '',
        "name": '',
        "address": '',
        "postalCode": '',
        "city": '',
        "contactPerson": '',
        "phoneNumber": '',
        "email": '',
        "accessCode": '',
        "paragraph": ''
    },
    "attachmentDocumentsData": {
        "documentStatus": '',
        "documentType": '',
        "variant": '',
    },
    "caseData": {
        "caseNumber": undefined,
        "accessCode": '',
        "administrativeUnit": '',
        "archiveUnit": '',
        "caseCreationStrategy": CreationStrategy.NEW,
        "caseType": '',
        "caseWorker": '',
        "paragraph": '',
        "primaryClass": '',
        "primaryClassification": '',
        "primaryTitle": '',
        "publicTitle": "{foo} {bar} {bubu}",
        "recordUnit": "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191",
        "secondaryClass": '',
        "secondaryClassification": '',
        "secondaryTitle": '',
        "status": '',
        "tertiaryClass": '',
        "tertiaryClassification": '',
        "tertiaryTitle": '',
        "title": "{foo} {bar} {bubu}"
    },
    "comment": "Ferdigstilt ",
    "completed": true,
    "mainDocumentData": {
        "documentStatus": '',
        "documentType": '',
        "variant": '',
    },
    "integrationId": 'TEST999',
    "recordData": {
        "accessCode": '',
        "administrativeUnit": '',
        "caseWorker": '',
        "paragraph": '',
        "publicTitle": '',
        "recordStatus": '',
        "recordType": '',
        "title": "{foo} bar"
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

