// noinspection SpellCheckingInspection

import {ISelect} from "../types/InputField";
import {CreationStrategy} from "../types/CreationStrategy";
import {IFormConfiguration} from "../types/Form/FormData";
import {IConfiguration} from "../types/Configuration";
import {IInstanceElementMetadata, IIntegrationMetadata, Type} from "../types/IntegrationMetadata";
import {IIntegration} from "../../integration/types/Integration";

export const defaultConfigurationValues: IFormConfiguration = {
    comment: '',
    completed: false,
    caseData: {
        caseCreationStrategy: CreationStrategy.NEW,
        id: undefined,
        newCase: {
            title: null,
            publicTitle: null,
            caseType: null,
            administrativeUnit:null,
            archiveUnit:null,
            recordUnit: null,
            status: null,
            caseWorker: null,
            shielding: {
                accessCode: null,
                paragraph: null
            },
            classes: [
                {
                    classification: null,
                    order: 0,
                    class: null,
                    title: null,
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    classification: null,
                    order: 1,
                    class: null,
                    title: null,
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    classification: null,
                    order: 2,
                    class: null,
                    title: null,
                    shielding: { accessCode: null, paragraph: null }
                },
            ]
        }

    },
    recordData: {
        title: null,
        publicTitle: null,
        administrativeUnit: null,
        recordStatus: null,
        recordType: null,
        caseWorker: null,
        shielding: {
            accessCode: null,
            paragraph: null
        },
        mainDocument: {
            title: null,
            documentStatus: null,
            documentType: null,
            role: null,
            fileFormat: null,
            variant: null,
            file: null
        },
        attachmentDocuments: {
            title: null,
            documentStatus: null,
            documentType: null,
            role: null,
            fileFormat: null,
            variant: null,
            file: null
        },
        correspondent: {
            shielding: {
                accessCode: null,
                paragraph: null
            },
            type: null,
            organisationNumber: null,
            nationalIdentityNumber: null,
            name: null,
            address: null,
            postalCode: null,
            city: null,
            contactPerson: null,
            phoneNumber: null,
            mobilePhoneNumber: null,
            email: null
        }
    }
}

export const defaultConfigurationValuesAV: IFormConfiguration = {
    comment: '',
    completed: false,
    caseData: {
        caseCreationStrategy: CreationStrategy.NEW,
        id: undefined,
        newCase: {
            title: null,
            publicTitle: null,
            caseType: null,
            administrativeUnit:null,
            archiveUnit:null,
            recordUnit: null,
            status: null,
            caseWorker: null,
            shielding: {
                accessCode: null,
                paragraph: null
            },
            classes: [
                {
                    classification: null,
                    order: 0,
                    class: null,
                    title: null,
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    classification: null,
                    order: 1,
                    class: null,
                    title: null,
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    classification: null,
                    order: 2,
                    class: null,
                    title: null,
                    shielding: { accessCode: null, paragraph: null }
                },
            ]
        }

    },
    recordData: {
        title: null,
        publicTitle: null,
        administrativeUnit: null,
        recordStatus: null,
        recordType: null,
        caseWorker: null,
        shielding: {
            accessCode: null,
            paragraph: null
        },
        mainDocument: {
            title: null,
            documentStatus: null,
            documentType: null,
            role: 'https://beta.felleskomponent.no/arkiv/kodeverk/tilknyttetregistreringsom/systemid/H',
            fileFormat: 'https://beta.felleskomponent.no/arkiv/kodeverk/format/systemid/RA-PDF',
            variant: 'https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/A',
            file: '$if{skjemaPdf}'
        },
        attachmentDocuments: {
            title: '$icf{0}{navn}',
            documentStatus: null,
            documentType: null,
            role: 'https://beta.felleskomponent.no/arkiv/kodeverk/tilknyttetregistreringsom/systemid/V',
            fileFormat: 'https://beta.felleskomponent.no/arkiv/kodeverk/format/systemid/PROD',
            variant: 'https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/P',
            file: '$icf{0}{fil}'
        },
        correspondent: {
            shielding: {
                accessCode: null,
                paragraph: null
            },
            type: 'https://beta.felleskomponent.no/arkiv/kodeverk/korrespondanseparttype/systemid/EA',
            organisationNumber: null,
            nationalIdentityNumber: null,
            name: null,
            address: null,
            postalCode: null,
            city: null,
            contactPerson: null,
            phoneNumber: null,
            mobilePhoneNumber: null,
            email: null
        }
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
    {label: '[P] Produksjonsformat', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/P'},
    {label: '[A] Arkivformat', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/A'}
]

export const formatOptions: ISelect[] = [
    {label: '[PDF] Portable document format', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/format/systemid/PDF'},
    {label: '[PROD] Produksjonsformat', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/format/systemid/PROD'}
]
export const correspondentTypeOptions: ISelect[] = [
    {label: 'EA Avsender', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/korrespondanseparttype/systemid/EA'}
]

export const roleOptions: ISelect[] = [
    {label: '[H] Hoveddokument', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/tilknyttetregistreringsom/systemid/H'},
    {label: '[V] Vedlegg', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/tilknyttetregistreringsom/systemid/V'}
]

export const variant: string = 'https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/P'
export const format: string = 'https://beta.felleskomponent.no/arkiv/kodeverk/format/systemid/PDF'
export const correspondentType: string = 'https://beta.felleskomponent.no/arkiv/kodeverk/korrespondanseparttype/systemid/EA'
export const mainRole: string = 'https://beta.felleskomponent.no/arkiv/kodeverk/tilknyttetregistreringsom/systemid/H'
export const mainFormat: string = 'https://beta.felleskomponent.no/arkiv/kodeverk/format/systemid/PDF'
export const attachmentRole: string = 'https://beta.felleskomponent.no/arkiv/kodeverk/tilknyttetregistreringsom/systemid/V'

export const creationStrategies: ISelect[] = [
    {label: 'Ny sak', value: 'NEW',  description: "selects.creationStrategies.newDesc"},
    {label: 'På ekisterende sak basert på søkekriterier, ellers ny sak (kommer)', value: 'BY_SEARCH_OR_NEW',  description: "selects.creationStrategies.existingDesc", disabled: true},
    {label: 'På eksisterende sak (samlesak) basert på saksnummer', value: 'BY_ID', description: "selects.creationStrategies.collectionDesc"}
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

export const MOCK_INSTANCE_ELEMENT_METADATA: IInstanceElementMetadata[] =
    [
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
                            "type": Type.FILE,
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

export const MOCK_NEWCONFIGURATIONS: IConfiguration[] = [
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
            caseConfiguration: {caseCreationStrategy: CreationStrategy.BY_ID, id: '2022/123'}
        },*/
    {
        id: 'id00',
        integrationId: '999',
        version: null,
        comment: 'Opprette konfigurasjon',
        completed: false,
        mapping: {
            valueMappingPerKey: {},
            valueCollectionMappingPerKey: {},
            objectMappingPerKey: {},
            objectCollectionMappingPerKey: {},
        }
    },
    {
        id: 'id0',
        integrationId: '999',
        version: null,
        comment: 'Første versjon - avventer endringer',
        completed: false,
        mapping: {
            valueMappingPerKey: {},
            valueCollectionMappingPerKey: {},
            objectMappingPerKey: {},
            objectCollectionMappingPerKey: {},
        }
    },
    {
        id: 'id1',
        integrationId: '999',
        version: null,
        completed: false,
        comment: 'Opprettet ny pga x, y, z',
        mapping: {
            valueMappingPerKey: {},
            valueCollectionMappingPerKey: {},
            objectMappingPerKey: {},
            objectCollectionMappingPerKey: {},
        }
    },
    {
        id: 'id2',
        integrationId: '999',
        version: 1,
        completed: true,
        comment: 'Ferdigstilt ',
        mapping: {
            valueMappingPerKey: {},
            valueCollectionMappingPerKey: {},
            objectMappingPerKey: {},
            objectCollectionMappingPerKey: {},
        }
    },
    {
        id: 'id3',
        integrationId: '999',
        version: 2,
        completed: true,
        comment: 'Ferdigstilt versjon 2',
        mapping: {
            valueMappingPerKey: {},
            valueCollectionMappingPerKey: {},
            objectMappingPerKey: {},
            objectCollectionMappingPerKey: {},
        }
    }
]
/*
export const EXAMPLE_FORM: IFormConfiguration = {
    "caseData": {
        "id": undefined,
        "administrativeUnit": '',
        "archiveUnit": '',
        "caseCreationStrategy": CreationStrategy.NEW,
        "caseType": '',
        "caseWorker": '',
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
        "title": "{foo} {bar} {bubu}",
        "shielding": {
            "accessCode": '',
            "paragraph": ''
        },
    },
    "comment": "Ferdigstilt ",
    "completed": true,
    "integrationId": 'TEST999',
    "recordData": {
        "accessCode": '',
        "administrativeUnit": '',
        "caseWorker": '',
        "paragraph": '',
        "publicTitle": '',
        "recordStatus": '',
        "recordType": '',
        "title": "{foo} bar",
        "shielding": {
            "accessCode": '',
            "paragraph": ''
        },
        "attachmentDocuments": {
            "title": '',
            "documentStatus": '',
            "documentType": '',
            "role": '',
            "fileFormat": '',
            "variant": '',
            "file": ''
        },
        "mainDocument": {
            "title": '',
            "documentStatus": '',
            "documentType": '',
            "role": '',
            "fileFormat": '',
            "variant": '',
            "file": '',
        },
        "correspondent": {
            "shielding": {
                "accessCode": '',
                "paragraph": ''
            },
            "type": '',
            "organisationNumber": '',
            "nationalIdentityNumber": '',
            "name": '',
            "address": '',
            "postalCode": '',
            "city": '',
            "contactPerson": '',
            "phoneNumber": '',
            "mobilePhoneNumber": '',
            "email": '',
            "accessCode": '',
            "paragraph": ''
        }
    }
}
*/
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

