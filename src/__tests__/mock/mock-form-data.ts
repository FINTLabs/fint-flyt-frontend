import {IFormConfiguration, IFormIntegration} from "../../features/integration/types/Form/FormData";

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
        nationalIdentityNumber: "",
        organisationNumber: "",
        paragraph: "p3",
        phoneNumber: "12345678",
        postalCode: "1234",
        protected: true,
        type: "PERSON"
    },
    caseData: {
        accessCode: "code42",
        administrativeUnit: "unit4",
        archiveUnit: "unit3",
        caseCreationStrategy: "NEW",
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
        accessCode: "code2",
        documentStatus: "D9",
        documentCategory: "cat1",
        paragraph: "p07",
        title: "document title",
        variant: "var"
    },
    recordData: {
        accessCode: "code89",
        administrativeUnit: "unit33",
        caseWorker: "boba",
        documentType: "cat8",
        paragraph: "p34",
        publicTitle: "public record title",
        recordStatus: "N",
        recordType: "A",
        title: "record title"
    }
}

export const MOCK_NEW_FORMDATA: IFormConfiguration = {
    "applicantData": {
        "accessCode": "",
        "address": "",
        "city": "",
        "contactPerson": "",
        "email": "",
        "name": "",
        "nationalIdentityNumber": "",
        "organisationNumber": "",
        "paragraph": "",
        "phoneNumber": "",
        "postalCode": "",
        "protected": true
    },
    "caseData": {
        "accessCode": "",
        "administrativeUnit": "",
        "archiveUnit": "",
        "caseCreationStrategy": "NEW",
        "caseType": "",
        "caseWorker": "",
        "paragraph": "",
        "primaryClass": "",
        "primaryClassification": "",
        "primaryTitle": "",
        "publicTitle": "",
        "recordUnit": "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191",
        "secondaryClass": "",
        "secondaryClassification": "",
        "secondaryTitle": "",
        "status": "",
        "tertiaryClass": "",
        "tertiaryClassification": "",
        "tertiaryTitle": "",
        "title": "$iem{foo} $iem{bar}"
    },
    "comment": "Ferdigstilt ",
    "completed": true,
    "documentData": {
        "accessCode": "",
        "documentCategory": "",
        "documentStatus": "",
        "paragraph": "",
        "title": "",
        "variant": ""
    },
    "recordData": {
        "accessCode": "",
        "administrativeUnit": "",
        "caseWorker": "",
        "documentType": "",
        "paragraph": "",
        "publicTitle": "",
        "recordStatus": "",
        "recordType": "",
        "title": "foo $iem{bar}"
    }
}
