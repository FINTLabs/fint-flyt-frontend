import {ISelect} from "../types/InputField";
import {ITag} from "../types/Tag";

export const defaultValues = {
    selectedForm: '',
    caseData: {
        caseCreationStrategy: 'NEW',
        administrativeUnit:'',
        archiveUnit:'',
        caseType: '',
        recordUnit: '',
        accessCode: '',
        paragraph: '',
        caseWorker: '',
        primaryClass: '',
        secondaryClass: '',
    },
    recordData: {
        category: '',
        administrativeUnit: '',
        status: '',
        caseWorker: '',
        accessCode: '',
        paragraph: '',
    },
    documentData: {
        documentStatus: '',
        accessCode: '',
        paragraph: '',
        variant: '',
        format: '',
    },
    applicantData: {
        accessCode: '',
        paragraph: '',
    }
}

export const dropdownPlaceholder: ISelect[] = [
    {label: 'Alternativ 1', value: '0'},
    {label: 'Alternativ 2', value: '1'},
    {label: 'Alternativ 3', value: '2'},
    {label: 'Alternativ 4', value: '3'},
    {label: 'Alternativ 5', value: '4'},
    {label: 'Alternativ 6', value: '5'},
    {label: 'Alternativ 7', value: '6'},
    {label: 'Alternativ 8', value: '7'},
    {label: 'Alternativ 9', value: '8'},
    {label: 'Alternativ 10', value: '9'}
]

export const creationStrategies: ISelect[] = [
    {label: 'Som ny sak',value: 'NEW',  description: 'Innsendt skjema oppretter en ny sak i Elements'},
    {label: 'På eksisterende sak', value: 'EXISTING',  description: 'Innsendt skjema gjenfinner eksisterende sak i ' +
            'Elements basert på informasjon i skjemaet. Dersom det ikke fins en eksisterende sak opprettes en ny sak' },
    {label: 'På samlesak', value: 'COLLECTION', description: 'Innsendt skjema skal leveres til en forhåndsdefinert samlesak'}
];

export const forms: ISelect[] = [
    { label: "TT-skjema", value: "TT" },
    { label: "Skjema1", value: "1_form" },
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
    {value:"{fornavn}",  name:"Fornavn"},
    {value:"{etternavn}",  name:"Etternavn"},
    {value:"{fodselsnummer}",  name:"Fødselsnummer"},
    {value:"{adresse}",  name:"Adresse"},
    {value:"{postnummer}",  name:"Postnummer"},
    {value:"{poststed}",  name:"Poststed"},
    {value:"{telefonnummer}",  name:"Telefonnummer"},
    {value:"{email}",  name:"Email"}
]