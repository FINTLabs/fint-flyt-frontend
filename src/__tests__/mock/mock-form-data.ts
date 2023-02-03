import {IFormConfiguration, IFormIntegration} from "../../features/configuration/types/Form/FormData";
import {CreationStrategy} from "../../features/configuration/types/CreationStrategy";

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
        id: null,
        caseCreationStrategy: CreationStrategy.NEW,
        newCase: {
            administrativeUnit: "unit4",
            archiveUnit: "unit3",
            caseType: "casetype",
            caseWorker: "rand",
            publicTitle: "public title",
            recordUnit: "unit0",
            status: null,
            title: "Title of case",
            shielding: {
                accessCode: "code42",
                paragraph: "number6",
            },
            classes: [
                {
                    order: 0,
                    classification: "prim",
                    class: "1class",
                    title: "primTitle",
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    order: 1,
                    classification: "rose",
                    class: "2class",
                    title: "secTitle",
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    order: 2,
                    classification: "everdeen",
                    class: "3class",
                    title: "tertTitle",
                    shielding: { accessCode: null, paragraph: null }
                }
            ]
        }
    },
    comment: "form to test mapping",
    recordData: {
        administrativeUnit: "unit33",
        caseWorker: "boba",
        publicTitle: "public record title",
        recordStatus: "N",
        recordType: "A",
        shielding: {
            accessCode: "code89",
            paragraph: "p34",
        },
        title: "record title",
        mainDocument: {
            title: "record title",
            documentStatus: "D9",
            documentType: "cat8",
            role: "www.kodeverk.no/H",
            fileFormat: "www.kodeverk.no/A",
            variant: "www.kodeverk.no/PDF",
            file: "$if{skjemaPdf}",
        },
        attachmentDocuments: {
            title: "$ifg{name}",
            documentStatus: "D9",
            documentType: "cat8",
            role: "www.kodeverk.no/V",
            fileFormat: "www.kodeverk.no/PDF",
            variant: "www.kodeverk.no/PDF",
            file: "$icf{0}{fil}"
        },
        correspondent: {
            address: "highstreet 22",
            city: "Moria",
            contactPerson: "donna",
            email: "hello@world.no",
            name: "Anakin Skywalker",
            nationalIdentityNumber: "123456789",
            organisationNumber: null,
            phoneNumber: "12345678",
            mobilePhoneNumber: "12345678",
            postalCode: "1234",
            shielding: {
                accessCode: "code2",
                paragraph: "p3",
            },
            type: 'avsender'
        }

    }
}

export const MOCK_CONFIG_FORMDATA_SHIELDED_FALSE: IFormConfiguration = {
    completed: false,
    caseData: {
        id: null,
        caseCreationStrategy: CreationStrategy.NEW,
        newCase: {
            administrativeUnit: "unit4",
            archiveUnit: "unit3",
            caseType: "casetype",
            caseWorker: "rand",
            publicTitle: "public title",
            recordUnit: "unit0",
            status: null,
            title: "Title of case",
            shielding: {
                accessCode: "code42",
                paragraph: "number6",
            },
            classes: [
                {
                    order: 0,
                    classification: "prim",
                    class: "1class",
                    title: "primTitle",
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    order: 1,
                    classification: "rose",
                    class: "2class",
                    title: "secTitle",
                    shielding: { accessCode: null, paragraph: null }

                },
                {
                    order: 2,
                    classification: "everdeen",
                    class: "3class",
                    title: "tertTitle",
                    shielding: { accessCode: null, paragraph: null }

                }
            ]
        }

    },
    comment: "form to test mapping",
    recordData: {
        shielding: {
            accessCode: "code89",
            paragraph: "p34",
        },
        administrativeUnit: "unit33",
        caseWorker: "boba",
        publicTitle: "public record title",
        recordStatus: "N",
        recordType: "A",
        title: "record title",
        mainDocument: {
            title: "record title",
            documentStatus: "D9",
            documentType: "cat8",
            role: "www.kodeverk.no/H",
            fileFormat: "www.kodeverk.no/A",
            variant: "www.kodeverk.no/PDF",
            file: "$if{skjemaPdf}",
        },
        attachmentDocuments: {
            title: "$ifg{name}",
            documentStatus: "D9",
            documentType: "cat8",
            role: "www.kodeverk.no/V",
            fileFormat: "www.kodeverk.no/PDF",
            variant: "www.kodeverk.no/PDF",
            file: "$icf{0}{fil}"
        },
        correspondent: {
            address: "highstreet 22",
            city: "Moria",
            contactPerson: "donna",
            email: "hello@world.no",
            name: "Anakin Skywalker",
            nationalIdentityNumber: "123456789",
            organisationNumber: null,
            phoneNumber: "12345678",
            mobilePhoneNumber: "12345678",
            postalCode: "1234",
            shielding: {
                accessCode: null,
                paragraph: null
            },
            type: 'avsender'
        }

    }
}

export const MOCK_CONFIG_FORMDATA_FOR_PATCH: IFormConfiguration = {
    completed: false,
    metadataId: 1,
    caseData: {
        id: null,
        caseCreationStrategy: CreationStrategy.NEW,
        newCase: {
            administrativeUnit: "unit4",
            archiveUnit: "unit3",
            caseType: "casetype",
            caseWorker: "rand",
            publicTitle: "public title",
            recordUnit: "unit0",
            status: "",
            title: "Title of case",
            shielding: {
                accessCode: "code42",
                paragraph: "number6",
            },
            classes: [
                {
                    order: 0,
                    classification: "prim",
                    class: "1class",
                    title: "primTitle",
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    order: 1,
                    classification: "rose",
                    class: "2class",
                    title: "secTitle",
                    shielding: { accessCode: null, paragraph: null }
                },
                {
                    order: 2,
                    classification: "everdeen",
                    class: "3class",
                    title: "tertTitle",
                    shielding: { accessCode: null, paragraph: null }
                }
            ]
        }
    },
    comment: "form to test mapping",
    recordData: {
        shielding: {
            accessCode: "code89",
            paragraph: "p34",
        },
        administrativeUnit: "unit33",
        caseWorker: "boba",
        publicTitle: "public record title",
        recordStatus: "N",
        recordType: "A",
        title: "record title",
        mainDocument: {
            title: "record title",
            documentStatus: "D9",
            documentType: "cat8",
            role: "www.kodeverk.no/H",
            fileFormat: "form",
            variant: "var",
            file: "fil",
        },
        attachmentDocuments: {
            title: "record title",
            documentStatus: "D9",
            documentType: "cat8",
            role: "www.kodeverk.no/V",
            fileFormat: "form",
            variant: "var",
            file: "fil",
        },
        correspondent: {
            address: "highstreet 22",
            city: "Moria",
            contactPerson: "donna",
            email: "hello@world.no",
            name: "Anakin Skywalker",
            nationalIdentityNumber: "123456789",
            organisationNumber: "",
            phoneNumber: "12345678",
            mobilePhoneNumber: "12345678",
            postalCode: "1234",
            shielding: {
                accessCode: "code2",
                paragraph: "p3",
            },
            type: 'avsender'
        }
    }
}


export const MOCK_NEW_FORMDATA: IFormConfiguration = {
    "caseData": {

        "caseCreationStrategy": null,
        "id": "2022/123",
        "newCase": {
            "shielding": {
                "accessCode": "code42",
                "paragraph": "number6",
            },
            "administrativeUnit": "unit4",
            "archiveUnit": "unit3",
            "caseType": "casetype",
            "caseWorker": "rand",
            "publicTitle": "public title",
            "recordUnit": "unit0",
            "status": null,
            "title": "Title of case",
            "classes": [
                {
                    "order": 0,
                    "classification": "prim",
                    "class": "1class",
                    "title": "primTitle",
                    "shielding": { "accessCode": null, "paragraph": null }
                },
                {
                    "order": 1,
                    "classification": "rose",
                    "class": "2class",
                    "title": "secTitle",
                    "shielding": { "accessCode": null, "paragraph": null }
                },
                {
                    "order": 2,
                    "classification": "everdeen",
                    "class": "3class",
                    "title": "tertTitle",
                    "shielding": { "accessCode": null, "paragraph": null }
                }
            ]
        }

    },
    "comment": "Ikke ferdigstilt",
    "completed": false,
    "recordData": {
        "administrativeUnit": "unit33",
        "caseWorker": "boba",
        "publicTitle": "public record title",
        "recordStatus": "N",
        "recordType": "A",
        "title": "record title",
        "shielding": {
            "accessCode": "code89",
            "paragraph": "p34",
        },
        "mainDocument": {
            "documentStatus": "D9",
            "documentType": "cat8",
            "file": "$if{skjemaPdf}",
            "fileFormat": "www.kodeverk.no/A",
            "role": "www.kodeverk.no/H",
            "title": "record title",
            "variant": "www.kodeverk.no/PDF"
        },
        "attachmentDocuments": {
            "documentStatus": "D9",
            "documentType": "cat8",
            "file": "$icf{0}{fil}",
            "fileFormat": "www.kodeverk.no/PDF",
            "role": "www.kodeverk.no/V",
            "title": "$ifg{name}",
            "variant": "www.kodeverk.no/PDF"
        },
        "correspondent": {
            "shielding": {
                "accessCode": "code2",
                "paragraph": "p3",
            },
            "address": "highstreet 22",
            "city": "Moria",
            "contactPerson": "donna",
            "email": "hello@world.no",
            "mobilePhoneNumber": "12345678",
            "name": "Anakin Skywalker",
            "nationalIdentityNumber": "123456789",
            "organisationNumber": null,
            "phoneNumber": "12345678",
            "postalCode": "1234",
            "type": "avsender"
        },
    }
}

export const MOCK_NEW_FORMDATA_FROM_EMPTY_CONFIG: IFormConfiguration = {
    "caseData": {
        "caseCreationStrategy": null,
        "id": null,
        "newCase": {
            "administrativeUnit": null,
            "archiveUnit": null,
            "caseType": null,
            "caseWorker": null,
            "publicTitle": null,
            "recordUnit": null,
            "status": null,
            "title": null,
            "shielding": {
                "accessCode": null,
                "paragraph": null,
            },
            "classes": [
                {
                    "order": 0,
                    "classification": null,
                    "class": null,
                    "title": null,
                    "shielding": { "accessCode": null, "paragraph": null }
                },
                {
                    "order": 1,
                    "classification": null,
                    "class": null,
                    "title": null,
                    "shielding": { "accessCode": null, "paragraph": null }
                },
                {
                    "order": 2,
                    "classification": null,
                    "class": null,
                    "title": null,
                    "shielding": { "accessCode": null, "paragraph": null }
                }
            ]
        }
    },
    "comment": "form to test empty mapping",
    "completed": false,
    "recordData": {
        "administrativeUnit": null,
        "caseWorker": null,
        "publicTitle": null,
        "recordStatus": null,
        "recordType": null,
        "title": null,
        "shielding": {
            "accessCode": null,
            "paragraph": null,
        },
        "mainDocument": {
            "documentStatus": null,
            "documentType": null,
            "file": null,
            "fileFormat": null,
            "role": null,
            "title": null,
            "variant": null,
        },
        "attachmentDocuments": {
            "documentStatus": null,
            "documentType": null,
            "file": null,
            "fileFormat": null,
            "role": null,
            "title": null,
            "variant": null,
        },
        "correspondent": {
            "address": null,
            "city": null,
            "contactPerson": null,
            "email": null,
            "mobilePhoneNumber": null,
            "name": null,
            "nationalIdentityNumber": null,
            "organisationNumber": null,
            "phoneNumber": null,
            "postalCode": null,
            "shielding": {
                "accessCode": null,
                "paragraph": null,
            },
            "type": null
        },
    }
}

export const MOCK_BY_ID_FORMDATA: IFormConfiguration = {
    "caseData": {
        "caseCreationStrategy": "BY_ID",
        "id": "2022/163",
        "newCase": {
            "administrativeUnit": null,
            "archiveUnit": null,
            "caseType": null,
            "caseWorker": null,
            "publicTitle": null,
            "recordUnit": null,
            "status": null,
            "title": null,
            "shielding": {
                "accessCode": null,
                "paragraph": null,
            },
            "classes": [
                {
                    "order": 0,
                    "classification": null,
                    "class": null,
                    "title": null,
                    "shielding": { "accessCode": null, "paragraph": null }
                },
                {
                    "order": 1,
                    "classification": null,
                    "class": null,
                    "title": null,
                    "shielding": { "accessCode": null, "paragraph": null }
                },
                {
                    "order": 2,
                    "classification": null,
                    "class": null,
                    "title": null,
                    "shielding": { "accessCode": null, "paragraph": null }
                }
            ]
        }

    },
    "comment": "Ikke ferdigstilt",
    "completed": false,
    "recordData": {
        "administrativeUnit": null,
        "caseWorker": null,
        "publicTitle": null,
        "recordStatus": null,
        "recordType": null,
        "title": "foo $if{bar}",
        "shielding": {
            "accessCode": null,
            "paragraph": null,
        },
        "mainDocument": {
            "title": "foo $if{bar}",
            "documentStatus": null,
            "documentType": null,
            "role": null,
            "fileFormat": null,
            "variant": null,
            "file": null
        },
        "attachmentDocuments": {
            "title": null,
            "documentStatus": null,
            "documentType": null,
            "role": null,
            "fileFormat": null,
            "variant": null,
            "file": null
        },
        "correspondent": {
            "address": null,
            "city": null,
            "contactPerson": null,
            "email": null,
            "name": null,
            "nationalIdentityNumber": null,
            "organisationNumber": null,
            "phoneNumber": null,
            "mobilePhoneNumber": null,
            "postalCode": null,
            "shielding": {
                "accessCode": null,
                "paragraph": null,
            },
            "type": null
        }
    }
}
