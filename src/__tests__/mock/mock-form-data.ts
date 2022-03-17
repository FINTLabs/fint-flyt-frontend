import IFormData from "../../features/integration/types/Form/FormData";
import {CreationStrategy} from "../../features/integration/types/CreationStrategy";

export const MOCK_FORMDATA: IFormData = {
    name: 'testform',
    description: 'form to test mapping',
    published: false,
    caseData: {
        caseCreationStrategy: CreationStrategy.NEW,
        title: 'Title of case',
        publicTitle: 'public title',
        caseType: 'casetype',
        administrativeUnit: 'unit4',
        archiveUnit: 'unit3',
        recordUnit: 'unit0',
        accessCode: 'code42',
        paragraph: 'number6',
        caseWorker: 'rand',
        primaryClassification: 'prim',
        secondaryClassification: 'rose',
        status: '',
        primaryClass: '1class',
        secondaryClass: '2class',
    },
    recordData: {
        title: 'record title',
        publicTitle: 'public record title',
        type: 'cat8',
        administrativeUnit: 'unit33',
        recordStatus: 'N',
        accessCode: 'code89',
        caseWorker: 'boba',
        paragraph: 'p34',
    },
    documentData: {
        title: 'document title',
        documentStatus: 'D9',
        accessCode: 'code2',
        paragraph: 'p07',
        variant: 'var'
    },
    applicantData: {
        type: 'PERSON',
        name: 'Anakin Skywalker',
        address: 'highstreet 22',
        postalCode: '1234',
        city: 'Moria',
        contactPerson: 'donna',
        phoneNumber: '12345678',
        email: 'hello@world.no',
        accessCode: 'code2',
        paragraph: 'p3',
    },
    sourceApplication: 'Acos',
    sourceApplicationIntegrationId: 'VIK116'
}

export const MOCK_FORMDATA_NOT_PUBLISHED: IFormData = {
    name: 'testform',
    description: 'form to test mapping not published',
    published: false,
    caseData: {
        caseCreationStrategy: CreationStrategy.NEW,
        title: 'Title of case',
        publicTitle: 'public title',
        caseType: 'casetype',
        administrativeUnit: 'unit4',
        archiveUnit: 'unit3',
        recordUnit: 'unit0',
        accessCode: 'code42',
        paragraph: 'number6',
        caseWorker: 'rand',
        primaryClassification: 'prim',
        secondaryClassification: 'rose',
        primaryClass: '1class',
        secondaryClass: '2class',
    },
    recordData: {
        title: 'record title',
        publicTitle: 'public record title',
        type: 'cat8',
        administrativeUnit: 'unit33',
        recordStatus: 'N',
        caseWorker: 'boba',
        accessCode: 'code89',
        paragraph: 'p34',
    },
    documentData: {
        title: 'document title',
        documentStatus: 'D9',
        accessCode: 'code2',
        paragraph: 'p07',
        variant: 'var'
    },
    applicantData: {
        type: 'PERSON',
        name: 'Anakin Skywalker',
        address: 'highstreet 22',
        postalCode: '1234',
        city: 'Moria',
        contactPerson: 'donna',
        phoneNumber: '12345678',
        email: 'hello@world.no',
        accessCode: 'code2',
        paragraph: 'p3',
    }
}

export const MOCK_FORMDATA_PUBLISHED: IFormData = {
    name: 'testform',
    description: 'form to test mapping published',
    published: true,
    caseData: {
        caseCreationStrategy: CreationStrategy.NEW,
        title: 'Title of case',
        publicTitle: 'public title',
        caseType: 'casetype',
        administrativeUnit: 'unit4',
        archiveUnit: 'unit3',
        recordUnit: 'unit0',
        accessCode: 'code42',
        paragraph: 'number6',
        caseWorker: 'rand',
        primaryClassification: 'prim',
        secondaryClassification: 'rose',
        primaryClass: '1class',
        secondaryClass: '2class',
    },
    recordData: {
        title: 'record title',
        publicTitle: 'public record title',
        type: 'cat8',
        administrativeUnit: 'unit33',
        recordStatus: 'N',
        caseWorker: 'leia',
        accessCode: 'code89',
        paragraph: 'p34',
    },
    documentData: {
        title: 'document title',
        documentStatus: 'D9',
        accessCode: 'code2',
        paragraph: 'p07',
        variant: 'var'
    },
    applicantData: {
        type: 'PERSON',
        name: 'Anakin Skywalker',
        address: 'highstreet 22',
        postalCode: '1234',
        city: 'Moria',
        contactPerson: 'bella',
        phoneNumber: '12345678',
        email: 'hello@world.no',
        accessCode: 'code2',
        paragraph: 'p3',
    }
}


export const MOCK_FORMDATA_WITH_TAGS: IFormData = {
    "applicantData": {
        "accessCode": "code2",
        "address": "highstreet 22",
        "city": "Moria",
        "contactPerson": "donna",
        "email": "hello@world.no",
        "name": "Luke Skywalker",
        "organisationNumber": "123456789",
        "paragraph": "p3",
        "phoneNumber": "12345678",
        "postalCode": "1234",
        "type": "ORGANISATION"
    },
    "caseData": {
        "accessCode": "code42",
        "administrativeUnit": "unit4",
        "archiveUnit": "unit3",
        "caseCreationStrategy": "NEW",
        "caseType": "casetype",
        "caseWorker": "rand",
        "paragraph": "number6",
        "primaryClass": "1class",
        "primaryClassification": "prim",
        "publicTitle": "public title also with {two} {tags}",
        "recordUnit": "unit0",
        "secondaryClass": "2class",
        "secondaryClassification": "rose",
        "status": "",
        "title": "Title of case with {tags}"
    },
    "description": "form to test mapping with form tags",
    "documentData": {
        "accessCode": "code3",
        "documentStatus": "D9",
        "paragraph": "p02",
        "title": "document title",
        "variant": "var6"
    },
    "published": false,
    "name": "testform with tags",
    "recordData": {
        "accessCode": "code89",
        "administrativeUnit": "unit33",
        "caseWorker": "mando",
        "paragraph": "p34",
        "publicTitle": "{singletag}",
        "recordStatus": "N",
        "title": "{just} {tags}",
        "type": "cat8"
    },
    "sourceApplication": "Acos",
    "sourceApplicationIntegrationId": "VIK116"
}