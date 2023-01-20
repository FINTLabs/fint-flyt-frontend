import {IFormConfiguration, IFormIntegration} from "../../features/integration/types/Form/FormData";
import {CreationStrategy} from "../../features/integration/types/CreationStrategy";

export const MOCK_INTEGRATION_FORMDATA: IFormIntegration = {
    sourceApplicationIntegrationId: 'TEST234',
    destination: 'fylkesrad',
    sourceApplicationId: 'ACOS'
}

export const MOCK_INTEGRATION_FORMDATA2: IFormIntegration = {
    sourceApplicationIntegrationId: 'TEST345',
    destination: 'fylkesrad',
    sourceApplicationId: 'ACOS'
}

export const MOCK_CONFIG_FORMDATA: IFormConfiguration = {
    completed: false,
    metadataId: 1,
    applicantData: {
        accessCode: "code2",
        address: "highstreet 22",
        city: "Moria",
        contactPerson: "donna",
        email: "hello@world.no",
        name: "Anakin Skywalker",
        nationalIdentityNumber: "123456789",
        organisationNumber: "",
        paragraph: "p3",
        phoneNumber: "12345678",
        postalCode: "1234",
        protected: true,
    },
    caseData: {
        caseNumber: null,
        accessCode: "code42",
        administrativeUnit: "unit4",
        archiveUnit: "unit3",
        caseCreationStrategy: CreationStrategy.NEW,
        caseType: "casetype",
        caseWorker: "rand",
        paragraph: "number6",
        primaryClass: "1class",
        primaryClassification: "prim",
        primaryTitle: "primTitle",
        publicTitle: "public title",
        recordUnit: "unit0",
        secondaryClass: "2class",
        secondaryClassification: "rose",
        secondaryTitle: "secTitle",
        status: "",
        tertiaryClass: "3class",
        tertiaryClassification: "everdeen",
        tertiaryTitle: "tertTitle",
        title: "Title of case"
    },
    comment: "form to test mapping",
    documentData: {
        documentStatus: "D9",
        documentType: "cat8",
        title: "document title",
        variant: "var"
    },
    recordData: {
        accessCode: "code89",
        administrativeUnit: "unit33",
        caseWorker: "boba",
        paragraph: "p34",
        publicTitle: "public record title",
        recordStatus: "N",
        recordType: "A",
        title: "record title"
    }
}

export const MOCK_CONFIG_FORMDATA_FOR_PATCH: IFormConfiguration = {
    completed: false,
    metadataId: 1,
    applicantData: {
        accessCode: "code2",
        address: "highstreet 22",
        city: "Moria",
        contactPerson: "donna",
        email: "hello@world.no",
        name: "Anakin Skywalker",
        nationalIdentityNumber: "123456789",
        organisationNumber: "",
        paragraph: "p3",
        phoneNumber: "12345678",
        postalCode: "1234",
        protected: true,
    },
    caseData: {
        caseNumber: null,
        accessCode: "code42",
        administrativeUnit: "unit4",
        archiveUnit: "unit3",
        caseCreationStrategy: CreationStrategy.NEW,
        caseType: "casetype",
        caseWorker: "rand",
        paragraph: "number6",
        primaryClass: "1class",
        primaryClassification: "prim",
        primaryTitle: "primTitle",
        publicTitle: "public title",
        recordUnit: "unit0",
        secondaryClass: "2class",
        secondaryClassification: "rose",
        secondaryTitle: "secTitle",
        status: "",
        tertiaryClass: "3class",
        tertiaryClassification: "everdeen",
        tertiaryTitle: "tertTitle",
        title: "Title of case"
    },
    comment: "form to test mapping",
    documentData: {
        documentStatus: "D9",
        documentType: "cat8",
        title: "document title",
        variant: "var"
    },
    recordData: {
        accessCode: "code89",
        administrativeUnit: "unit33",
        caseWorker: "boba",
        paragraph: "p34",
        publicTitle: "public record title",
        recordStatus: "N",
        recordType: "A",
        title: "record title"
    }
}


export const MOCK_NEW_FORMDATA: IFormConfiguration = {
    "applicantData": {
        "accessCode": null,
        "address": null,
        "city": null,
        "contactPerson": null,
        "email": null,
        "name": null,
        "nationalIdentityNumber": null,
        "organisationNumber": null,
        "paragraph": null,
        "phoneNumber": null,
        "postalCode": null,
        "protected": true,
    },
    "caseData": {
        "accessCode": null,
        "administrativeUnit": null,
        "archiveUnit": null,
        "caseCreationStrategy": "NEW",
        "caseNumber": null,
        "caseType": null,
        "caseWorker": null,
        "paragraph": null,
        "primaryClass": null,
        "primaryClassification": null,
        "primaryTitle": null,
        "publicTitle": null,
        "recordUnit": "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191",
        "secondaryClass": null,
        "secondaryClassification": null,
        "secondaryTitle": null,
        "status": null,
        "tertiaryClass": null,
        "tertiaryClassification": null,
        "tertiaryTitle": null,
        "title": "$if{foo} $if{bar}"
    },
    "comment": "Ikke ferdigstilt",
    "completed": false,
    "documentData": {
        "documentStatus": null,
        "documentType": null,
        "title": null,
        "variant": null
    },
    "recordData": {
        "accessCode": null,
        "administrativeUnit": null,
        "caseWorker": null,
        "paragraph": null,
        "publicTitle": null,
        "recordStatus": null,
        "recordType": null,
        "title": "foo $if{bar}"
    }
}

export const MOCK_BY_ID_FORMDATA: IFormConfiguration = {
    "applicantData": {
        "accessCode": null,
        "address": null,
        "city": null,
        "contactPerson": null,
        "email": null,
        "name": null,
        "nationalIdentityNumber": null,
        "organisationNumber": null,
        "paragraph": null,
        "phoneNumber": null,
        "postalCode": null,
        "protected": true,
    },
    "caseData": {
        "accessCode": null,
        "administrativeUnit": null,
        "archiveUnit": null,
        "caseCreationStrategy": "BY_ID",
        "caseNumber": "2022/163",
        "caseType": null,
        "caseWorker": null,
        "paragraph": null,
        "primaryClass": null,
        "primaryClassification": null,
        "primaryTitle": null,
        "publicTitle": null,
        "recordUnit": null,
        "secondaryClass": null,
        "secondaryClassification": null,
        "secondaryTitle": null,
        "status": null,
        "tertiaryClass": null,
        "tertiaryClassification": null,
        "tertiaryTitle": null,
        "title": null
    },
    "comment": "Ikke ferdigstilt",
    "completed": false,
    "documentData": {
        "documentStatus": null,
        "documentType": null,
        "title": null,
        "variant": null
    },
    "recordData": {
        "accessCode": null,
        "administrativeUnit": null,
        "caseWorker": null,
        "paragraph": null,
        "publicTitle": null,
        "recordStatus": null,
        "recordType": null,
        "title": "foo $if{bar}"
    }
}
