import {IFormConfiguration} from "../../configuration/types/Form/FormData";
import {IConfiguration} from "../../configuration/types/Configuration";
import {IElementCollectionMapping, IElementMapping} from "../../configuration/types/AVConfiguration";

export function toFormData(data: IConfiguration): IFormConfiguration {
    const caseFields: IElementMapping = data.mapping?.elementMappingPerKey['sak'] ? data.mapping?.elementMappingPerKey['sak'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}};
    const recordFields: IElementMapping = data.mapping?.elementMappingPerKey['journalpost'] ? data.mapping?.elementMappingPerKey['journalpost'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}};

    const documentDescription: IElementCollectionMapping = recordFields.elementCollectionMappingPerKey['dokumentbeskrivelse'] ? recordFields.elementCollectionMappingPerKey['dokumentbeskrivelse'] : {elementMappings: [], elementsFromCollectionMappings: []};
    const mainDocumentFields: IElementMapping = documentDescription.elementMappings[0] ? documentDescription.elementMappings[0] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const mainDocumentObjectFields: IElementMapping = mainDocumentFields.elementCollectionMappingPerKey['dokumentobjekt']?.elementMappings[0] ? mainDocumentFields.elementCollectionMappingPerKey['dokumentobjekt'].elementMappings[0] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const attachmentDocumentFields: IElementMapping = documentDescription.elementsFromCollectionMappings[0]?.elementMapping ? documentDescription.elementsFromCollectionMappings[0].elementMapping : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const attachmentDocumentObjectFields: IElementMapping = attachmentDocumentFields.elementCollectionMappingPerKey['dokumentobjekt']?.elementMappings[0] ? attachmentDocumentFields.elementCollectionMappingPerKey['dokumentobjekt'].elementMappings[0] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}

    const correspondent: IElementCollectionMapping = recordFields.elementCollectionMappingPerKey['korrespondansepart'] ? recordFields.elementCollectionMappingPerKey['korrespondansepart'] : {elementMappings: [], elementsFromCollectionMappings: []};
    const correspondentFields: IElementMapping = correspondent.elementMappings[0] ? correspondent.elementMappings[0] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}

    const addressFields: IElementMapping = correspondentFields.elementMappingPerKey['adresse'] ? correspondentFields.elementMappingPerKey['adresse'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const contactFields: IElementMapping = correspondentFields.elementMappingPerKey['kontaktinformasjon'] ? correspondentFields.elementMappingPerKey['kontaktinformasjon'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const protectionFields: IElementMapping = correspondentFields.elementMappingPerKey['skjerming'] ? correspondentFields.elementMappingPerKey['skjerming'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}


    return {
        comment: data.comment,
        completed: data.completed,
        caseData: {
            caseCreationStrategy: null,
            id: caseFields.valueMappingPerKey['id']?.mappingString ? caseFields.valueMappingPerKey['id']?.mappingString : null,
            title: caseFields.valueMappingPerKey['tittel']?.mappingString ? caseFields.valueMappingPerKey['tittel']?.mappingString : null,
            publicTitle: caseFields.valueMappingPerKey['offentligTittel']?.mappingString ? caseFields.valueMappingPerKey['offentligTittel']?.mappingString : null,
            caseType: caseFields.valueMappingPerKey['saksmappetype']?.mappingString ? caseFields.valueMappingPerKey['saksmappetype']?.mappingString : null,
            administrativeUnit: caseFields.valueMappingPerKey['administrativenhet']?.mappingString ? caseFields.valueMappingPerKey['administrativenhet']?.mappingString : null,
            archiveUnit: caseFields.valueMappingPerKey['arkivdel']?.mappingString ? caseFields.valueMappingPerKey['arkivdel']?.mappingString : null,
            recordUnit: caseFields.valueMappingPerKey['journalenhet']?.mappingString ? caseFields.valueMappingPerKey['journalenhet']?.mappingString : null,
            status: caseFields.valueMappingPerKey['status']?.mappingString ? caseFields.valueMappingPerKey['status']?.mappingString : null,
            accessCode: caseFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString ? caseFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString : null,
            paragraph: caseFields.valueMappingPerKey['skjermingshjemmel']?.mappingString ? caseFields.valueMappingPerKey['skjermingshjemmel']?.mappingString : null,
            caseWorker: caseFields.valueMappingPerKey['saksansvarlig']?.mappingString ? caseFields.valueMappingPerKey['saksansvarlig']?.mappingString : null,
            primaryClassification: caseFields.valueMappingPerKey['primarordningsprinsipp']?.mappingString ? caseFields.valueMappingPerKey['primarordningsprinsipp']?.mappingString : null,
            secondaryClassification: caseFields.valueMappingPerKey['sekundarordningsprinsipp']?.mappingString ? caseFields.valueMappingPerKey['sekundarordningsprinsipp']?.mappingString : null,
            tertiaryClassification: caseFields.valueMappingPerKey['tertiarordningsprinsipp']?.mappingString ? caseFields.valueMappingPerKey['tertiarordningsprinsipp']?.mappingString : null,
            primaryClass: caseFields.valueMappingPerKey['primarklasse']?.mappingString ? caseFields.valueMappingPerKey['primarklasse']?.mappingString : null,
            secondaryClass: caseFields.valueMappingPerKey['sekundarklasse']?.mappingString ? caseFields.valueMappingPerKey['sekundarklasse']?.mappingString : null,
            tertiaryClass: caseFields.valueMappingPerKey['tertiarklasse']?.mappingString ? caseFields.valueMappingPerKey['tertiarklasse']?.mappingString : null,
            primaryTitle: caseFields.valueMappingPerKey['primartittel']?.mappingString ? caseFields.valueMappingPerKey['primartittel']?.mappingString : null,
            secondaryTitle: caseFields.valueMappingPerKey['sekundartittel']?.mappingString ? caseFields.valueMappingPerKey['sekundartittel']?.mappingString : null,
            tertiaryTitle: caseFields.valueMappingPerKey['tertiartittel']?.mappingString ? caseFields.valueMappingPerKey['tertiartittel']?.mappingString : null
        },
        recordData: {
            title: recordFields.valueMappingPerKey['tittel']?.mappingString ? recordFields.valueMappingPerKey['tittel']?.mappingString : null,
            publicTitle: recordFields.valueMappingPerKey['offentligTittel']?.mappingString ? recordFields.valueMappingPerKey['offentligTittel']?.mappingString : null,
            administrativeUnit: recordFields.valueMappingPerKey['administrativenhet']?.mappingString ? recordFields.valueMappingPerKey['administrativenhet']?.mappingString : null,
            recordStatus: recordFields.valueMappingPerKey['journalstatus']?.mappingString ? recordFields.valueMappingPerKey['journalstatus']?.mappingString : null,
            recordType: recordFields.valueMappingPerKey['journalposttype']?.mappingString ? recordFields.valueMappingPerKey['journalposttype']?.mappingString : null,
            caseWorker: recordFields.valueMappingPerKey['saksbehandler']?.mappingString ? recordFields.valueMappingPerKey['saksbehandler']?.mappingString : null,
            accessCode: recordFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString ? recordFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString : null,
            paragraph: recordFields.valueMappingPerKey['skjermingshjemmel']?.mappingString ? recordFields.valueMappingPerKey['skjermingshjemmel']?.mappingString : null,
            mainDocument: {
                title: mainDocumentFields.valueMappingPerKey['tittel']?.mappingString ? mainDocumentFields.valueMappingPerKey['tittel']?.mappingString : null,
                documentStatus: mainDocumentFields.valueMappingPerKey['dokumentstatus']?.mappingString ? mainDocumentFields.valueMappingPerKey['dokumentstatus']?.mappingString : null,
                documentType: mainDocumentFields.valueMappingPerKey['dokumentType']?.mappingString ? mainDocumentFields.valueMappingPerKey['dokumentType']?.mappingString : null,
                role: mainDocumentFields.valueMappingPerKey['tilknyttetRegistreringSom']?.mappingString ? mainDocumentFields.valueMappingPerKey['tilknyttetRegistreringSom']?.mappingString : null,
                format: mainDocumentObjectFields.valueMappingPerKey['format']?.mappingString ? mainDocumentObjectFields.valueMappingPerKey['format']?.mappingString : null,
                variant: mainDocumentObjectFields.valueMappingPerKey['variantformat']?.mappingString ? mainDocumentObjectFields.valueMappingPerKey['variantformat']?.mappingString : null,
                file: mainDocumentObjectFields.valueMappingPerKey['fil']?.mappingString ? mainDocumentObjectFields.valueMappingPerKey['fil']?.mappingString : null
            },
            attachmentDocuments: {
                title: attachmentDocumentFields.valueMappingPerKey['tittel']?.mappingString ? attachmentDocumentFields.valueMappingPerKey['tittel']?.mappingString : null,
                documentStatus: attachmentDocumentFields.valueMappingPerKey['dokumentstatus']?.mappingString ? attachmentDocumentFields.valueMappingPerKey['dokumentstatus']?.mappingString : null,
                documentType: attachmentDocumentFields.valueMappingPerKey['dokumentType']?.mappingString ? attachmentDocumentFields.valueMappingPerKey['dokumentType']?.mappingString : null,
                role: attachmentDocumentFields.valueMappingPerKey['tilknyttetRegistreringSom']?.mappingString ? attachmentDocumentFields.valueMappingPerKey['tilknyttetRegistreringSom']?.mappingString : null,
                format: attachmentDocumentObjectFields.valueMappingPerKey['format']?.mappingString ? attachmentDocumentObjectFields.valueMappingPerKey['format']?.mappingString : null,
                variant: attachmentDocumentObjectFields.valueMappingPerKey['variantformat']?.mappingString ? attachmentDocumentObjectFields.valueMappingPerKey['variantformat']?.mappingString : null,
                file: attachmentDocumentObjectFields.valueMappingPerKey['fil']?.mappingString ? attachmentDocumentObjectFields.valueMappingPerKey['fil']?.mappingString : null
            },
            correspondent: {
                protected: (protectionFields.valueMappingPerKey['tilgangsrestriksjon'] || protectionFields.valueMappingPerKey['skjermingshjemmel']) !== undefined,
                type: correspondentFields.valueMappingPerKey['korrespondanseparttype']?.mappingString ? correspondentFields.valueMappingPerKey['korrespondanseparttype']?.mappingString : null,
                organisationNumber: correspondentFields.valueMappingPerKey['organisasjonsnummer']?.mappingString ? correspondentFields.valueMappingPerKey['organisasjonsnummer']?.mappingString : null,
                nationalIdentityNumber: correspondentFields.valueMappingPerKey['fødselsnummer']?.mappingString ? correspondentFields.valueMappingPerKey['fødselsnummer']?.mappingString : null,
                name: correspondentFields.valueMappingPerKey['korrespondansepartNavn']?.mappingString ? correspondentFields.valueMappingPerKey['korrespondansepartNavn']?.mappingString : null,
                contactPerson: correspondentFields.valueMappingPerKey['kontaktperson']?.mappingString ? correspondentFields.valueMappingPerKey['kontaktperson']?.mappingString : null,
                address: addressFields.valueMappingPerKey['adresselinje']?.mappingString ? addressFields.valueMappingPerKey['adresselinje']?.mappingString : null,
                postalCode:addressFields.valueMappingPerKey['postnummer']?.mappingString ? addressFields.valueMappingPerKey['postnummer']?.mappingString : null,
                city: addressFields.valueMappingPerKey['poststed']?.mappingString ? addressFields.valueMappingPerKey['poststed']?.mappingString : null,
                phoneNumber: contactFields.valueMappingPerKey['telefonnummer']?.mappingString ? contactFields.valueMappingPerKey['telefonnummer']?.mappingString : null,
                mobilePhoneNumber: contactFields.valueMappingPerKey['mobiltelefonnummer']?.mappingString ? contactFields.valueMappingPerKey['mobiltelefonnummer']?.mappingString : null,
                email: contactFields.valueMappingPerKey['epostadresse']?.mappingString ? contactFields.valueMappingPerKey['epostadresse']?.mappingString : null,
                accessCode: protectionFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString ? protectionFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString : null,
                paragraph: protectionFields.valueMappingPerKey['skjermingshjemmel']?.mappingString ? protectionFields.valueMappingPerKey['skjermingshjemmel']?.mappingString : null,
            }
        }
    }
}
