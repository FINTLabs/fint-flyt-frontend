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
        status: null,
        tertiaryClass: "3class",
        tertiaryClassification: "everdeen",
        tertiaryTitle: "tertTitle",
        title: "Title of case"
    },
    comment: "form to test mapping",
    recordData: {
        accessCode: "code89",
        administrativeUnit: "unit33",
        caseWorker: "boba",
        paragraph: "p34",
        publicTitle: "public record title",
        recordStatus: "N",
        recordType: "A",
        title: "record title",
        mainDocument: {
            title: "record title",
            documentStatus: "D9",
            documentType: "cat8",
            format: "www.kodeverk.no/A",
            variant: "www.kodeverk.no/PDF",
            file: "$ifg{formPdf}",
        },
        attachmentDocuments: {
            title: "$ifg{name}",
            documentStatus: "D9",
            documentType: "cat8",
            format: "www.kodeverk.no/P",
            variant: "$igf{type}",
            file: "$igf{file}"
        },
        correspondent: {
            accessCode: "code2",
            address: "highstreet 22",
            city: "Moria",
            contactPerson: "donna",
            email: "hello@world.no",
            name: "Anakin Skywalker",
            nationalIdentityNumber: "123456789",
            organisationNumber: null,
            paragraph: "p3",
            phoneNumber: "12345678",
            mobilePhoneNumber: "12345678",
            postalCode: "1234",
            protected: true,
        }

    }
}

export const MOCK_CONFIG_FORMDATA_FOR_PATCH: IFormConfiguration = {
    completed: false,
    metadataId: 1,
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
    recordData: {
        accessCode: "code89",
        administrativeUnit: "unit33",
        caseWorker: "boba",
        paragraph: "p34",
        publicTitle: "public record title",
        recordStatus: "N",
        recordType: "A",
        title: "record title",
        mainDocument: {
            title: "record title",
            documentStatus: "D9",
            documentType: "cat8",
            format: "form",
            variant: "var",
            file: "fil",
        },
        attachmentDocuments: {
            title: "record title",
            documentStatus: "D9",
            documentType: "cat8",
            format: "form",
            variant: "var",
            file: "fil",
        },
        correspondent: {
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
            mobilePhoneNumber: "12345678",
            postalCode: "1234",
            protected: true,
        }
    }
}


export const MOCK_NEW_FORMDATA: IFormConfiguration = {
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
    "recordData": {
        "accessCode": null,
        "administrativeUnit": null,
        "caseWorker": null,
        "paragraph": null,
        "publicTitle": null,
        "recordStatus": null,
        "recordType": null,
        "title": "foo $if{bar}",
        "mainDocument": {
            "title": "foo $if{bar}",
            "documentStatus": null,
            "documentType": null,
            "format": null,
            "variant": null,
            "file": null
        },
        "attachmentDocuments": {
            "title": null,
            "documentStatus": null,
            "documentType": null,
            "format": null,
            "variant": null,
            "file": null
        },
        "correspondent": {
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
            "mobilePhoneNumber": null,
            "postalCode": null,
            "protected": true,
        },
    }
}

export const MOCK_BY_ID_FORMDATA: IFormConfiguration = {
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
    "recordData": {
        "accessCode": null,
        "administrativeUnit": null,
        "caseWorker": null,
        "paragraph": null,
        "publicTitle": null,
        "recordStatus": null,
        "recordType": null,
        "title": "foo $if{bar}",
        "mainDocument": {
            "title": "foo $if{bar}",
            "documentStatus": null,
            "documentType": null,
            "format": null,
            "variant": null,
            "file": null
        },
        "attachmentDocuments": {
            "title": null,
            "documentStatus": null,
            "documentType": null,
            "format": null,
            "variant": null,
            "file": null
        },
        "correspondent": {
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
            "mobilePhoneNumber": null,
            "postalCode": null,
            "protected": true,
        }
    }
}
