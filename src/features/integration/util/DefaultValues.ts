import {ISelect} from "../types/InputField";
import {ITag} from "../types/Tag";
import {CreationStrategy} from "../types/CreationStrategy";
import IFormData from "../types/Form/FormData";

export const defaultValues: IFormData = {
    name: '',
    description: '',
    version: '',
    selectedForm: '',
    caseData: {
        caseCreationStrategy: CreationStrategy.NEW,
        caseNumber: '',
        title: '',
        publicTitle: '',
        caseType: '',
        administrativeUnit:'',
        archiveUnit:'',
        recordUnit: '',
        status: '',
        accessCode: '',
        paragraph: '',
        caseWorker: '',
        primaryClassification: '',
        secondaryClassification: '',
        primaryClass: '',
        secondaryClass: '',
    },
    recordData: {
        title: '',
        publicTitle: '',
        category: '',
        administrativeUnit: '',
        recordStatus: '',
        accessCode: '',
        paragraph: '',
    },
    documentData: {
        title: '',
        documentStatus: '',
        accessCode: '',
        paragraph: '',
        variant: ''
    },
    applicantData: {
        type: 'PERSON',
        organisationNumber: '',
        name: '',
        address: '',
        postalCode: '',
        city: '',
        phoneNumber: '',
        email: '',
        accessCode: '',
        paragraph: '',
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

export const creationStrategies: ISelect[] = [
    {label: 'Som ny sak',value: 'NEW',  description: 'Innsendt skjema oppretter en ny sak i Elements'},
    {label: 'På eksisterende sak', value: 'EXISTING',  description: 'Innsendt skjema gjenfinner eksisterende sak i ' +
            'Elements basert på informasjon i skjemaet. Dersom det ikke fins en eksisterende sak opprettes en ny sak' },
    {label: 'På samlesak', value: 'COLLECTION', description: 'Innsendt skjema skal leveres til en forhåndsdefinert samlesak. ' +
            'Her må du opplyse om saksnummer'}
];

export const applicantOptions: ISelect[] = [
    {label: 'Privatperson',value: 'PERSON'},
    {label: 'Organisasjon', value: 'ORGANISATION'}
];

export const forms: ISelect[] = [
    { label: "TT-skjema", value: "TT" },
    { label: "Skjema1", value: "1_form" },
    { label: "Skjema33", value: "form3" },
    { label: "Skjema2", value: "2_form" }
];

export const caseWorkers: ISelect[] = [
    {label: 'Brendan Costanza', value: 'hotdog'},
    {label: 'Diana Seelix', value: 'hardball'},
    {label: 'Dwight Saunders', value: 'flattop'},
    {label: 'Kara Thrace', value: 'starbuck'},
    {label: 'Karl Agathon', value: 'helo'},
    {label: 'Lee Adama', value: 'apollo'},
    {label: 'Louanne Katraine', value: 'kat'},
    {label: 'Marcia Case', value: 'showboat'},
    {label: 'Samuel Anders', value: 'longshot'},
    {label: 'Sharon Valerii', value: 'boomer'},
    {label: 'Sharon Agathon', value: 'athena'},
    {label: 'Paolo McKay', value: 'redwing'},
    {label: 'William Adama', value: 'husker'}
]

export const tagList: ITag[] = [
    {value:"{fodselsnummer}",  name:"Fødselsnummer"},
    {value:"{fornavn}",  name:"Fornavn"},
    {value:"{etternavn}",  name:"Etternavn"},
    {value:"{adresse}",  name:"Adresse"},
    {value:"{postnummer}",  name:"Postnummer"},
    {value:"{poststed}",  name:"Poststed"},
    {value:"{telefonnummer}",  name:"Telefonnummer"},
    {value:"{email}",  name:"Email"},
    {value:"{organisasjonsnummer}",  name:"Organisasjonsnummer"}
]

export const TaglistPopoverContent: string = 'I tekstfeltene til i de ulike postene kan du benytte data fra skjema for å utfylle disse. \n\n' +
    'Naviger til feltet du ønsker å fylle,og dra inn tag fra listen under.'
