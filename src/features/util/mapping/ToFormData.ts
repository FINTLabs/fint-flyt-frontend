import {IFormConfiguration} from "../../configuration/types/OldForm/FormData";
import {IConfiguration} from "../../configuration/types/Configuration";
import {IElementCollectionMapping, IElementMapping} from "../../configuration/types/Configuration";

export function toFormData(data: IConfiguration): IFormConfiguration {
    const caseFields: IElementMapping = data.mapping?.elementMappingPerKey['sak'] ? data.mapping?.elementMappingPerKey['sak'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}};
    const recordFields: IElementMapping = data.mapping?.elementMappingPerKey['journalpost'] ? data.mapping?.elementMappingPerKey['journalpost'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}};
    const caseNewCaseFields: IElementMapping = caseFields.elementMappingPerKey['ny'] ? caseFields.elementMappingPerKey['ny'] :  {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const caseClassesFields: IElementMapping[] = caseNewCaseFields.elementCollectionMappingPerKey['klasse']?.elementMappings ? caseNewCaseFields.elementCollectionMappingPerKey['klasse']?.elementMappings  :  []
    const caseShieldingFields: IElementMapping = caseNewCaseFields.elementMappingPerKey['skjerming'] ? caseNewCaseFields.elementMappingPerKey['skjerming'] :  {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const recordShieldingFields: IElementMapping = recordFields.elementMappingPerKey['skjerming'] ? recordFields.elementMappingPerKey['skjerming'] :  {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}};

    const documentDescription: IElementCollectionMapping = recordFields.elementCollectionMappingPerKey['dokumentbeskrivelse'] ? recordFields.elementCollectionMappingPerKey['dokumentbeskrivelse'] : {elementMappings: [], elementsFromCollectionMappings: []};
    const mainDocumentFields: IElementMapping = documentDescription.elementMappings[0] ? documentDescription.elementMappings[0] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const mainDocumentObjectFields: IElementMapping = mainDocumentFields.elementCollectionMappingPerKey['dokumentobjekt']?.elementMappings[0] ? mainDocumentFields.elementCollectionMappingPerKey['dokumentobjekt'].elementMappings[0] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const attachmentDocumentFields: IElementMapping = documentDescription.elementsFromCollectionMappings[0]?.elementMapping ? documentDescription.elementsFromCollectionMappings[0].elementMapping : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const attachmentDocumentObjectFields: IElementMapping = attachmentDocumentFields.elementCollectionMappingPerKey['dokumentobjekt']?.elementMappings[0] ? attachmentDocumentFields.elementCollectionMappingPerKey['dokumentobjekt'].elementMappings[0] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}

    const correspondent: IElementCollectionMapping = recordFields.elementCollectionMappingPerKey['korrespondansepart'] ? recordFields.elementCollectionMappingPerKey['korrespondansepart'] : {elementMappings: [], elementsFromCollectionMappings: []};
    const correspondentFields: IElementMapping = correspondent.elementMappings[0] ? correspondent.elementMappings[0] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}

    const addressFields: IElementMapping = correspondentFields.elementMappingPerKey['adresse'] ? correspondentFields.elementMappingPerKey['adresse'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const contactFields: IElementMapping = correspondentFields.elementMappingPerKey['kontaktinformasjon'] ? correspondentFields.elementMappingPerKey['kontaktinformasjon'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}
    const correspondentShieldingFields: IElementMapping = correspondentFields.elementMappingPerKey['skjerming'] ? correspondentFields.elementMappingPerKey['skjerming'] : {elementMappingPerKey: {}, elementCollectionMappingPerKey: {}, valueMappingPerKey: {}}


    return {
        comment: data.comment,
        completed: data.completed,
        caseData: {
            caseCreationStrategy: null,
            id: caseFields.valueMappingPerKey['id']?.mappingString ? caseFields.valueMappingPerKey['id']?.mappingString : null,
            newCase: {
                title: caseNewCaseFields.valueMappingPerKey['tittel']?.mappingString ? caseNewCaseFields.valueMappingPerKey['tittel']?.mappingString : null,
                publicTitle: caseNewCaseFields.valueMappingPerKey['offentligTittel']?.mappingString ? caseNewCaseFields.valueMappingPerKey['offentligTittel']?.mappingString : null,
                caseType: caseNewCaseFields.valueMappingPerKey['saksmappetype']?.mappingString ? caseNewCaseFields.valueMappingPerKey['saksmappetype']?.mappingString : null,
                administrativeUnit: caseNewCaseFields.valueMappingPerKey['administrativenhet']?.mappingString ? caseNewCaseFields.valueMappingPerKey['administrativenhet']?.mappingString : null,
                archiveUnit: caseNewCaseFields.valueMappingPerKey['arkivdel']?.mappingString ? caseNewCaseFields.valueMappingPerKey['arkivdel']?.mappingString : null,
                recordUnit: caseNewCaseFields.valueMappingPerKey['journalenhet']?.mappingString ? caseNewCaseFields.valueMappingPerKey['journalenhet']?.mappingString : null,
                status: caseNewCaseFields.valueMappingPerKey['saksstatus']?.mappingString ? caseNewCaseFields.valueMappingPerKey['saksstatus']?.mappingString : null,
                caseWorker: caseNewCaseFields.valueMappingPerKey['saksansvarlig']?.mappingString ? caseNewCaseFields.valueMappingPerKey['saksansvarlig']?.mappingString : null,
                shielding: {
                    accessCode: caseShieldingFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString ? caseShieldingFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString : null,
                    paragraph: caseShieldingFields.valueMappingPerKey['skjermingshjemmel']?.mappingString ? caseShieldingFields.valueMappingPerKey['skjermingshjemmel']?.mappingString : null,
                },
                classes: [
                    {
                        order: 0,
                        classification: caseClassesFields[0]?.valueMappingPerKey['klassifikasjonssystem']?.mappingString ? caseClassesFields[0].valueMappingPerKey['klassifikasjonssystem']?.mappingString : null,
                        class: caseClassesFields[0]?.valueMappingPerKey['klasseId']?.mappingString ? caseClassesFields[0].valueMappingPerKey['klasseId']?.mappingString : null,
                        title: caseClassesFields[0]?.valueMappingPerKey['tittel']?.mappingString ? caseClassesFields[0].valueMappingPerKey['tittel']?.mappingString : null,
                        shielding: {accessCode: null, paragraph: null}
                    },
                    {
                        order: 1,
                        classification: caseClassesFields[1]?.valueMappingPerKey['klassifikasjonssystem']?.mappingString ? caseClassesFields[1].valueMappingPerKey['klassifikasjonssystem']?.mappingString : null,
                        class: caseClassesFields[1]?.valueMappingPerKey['klasseId']?.mappingString ? caseClassesFields[1].valueMappingPerKey['klasseId']?.mappingString : null,
                        title: caseClassesFields[1]?.valueMappingPerKey['tittel']?.mappingString ? caseClassesFields[1].valueMappingPerKey['tittel']?.mappingString : null,
                        shielding: {accessCode: null, paragraph: null}

                    },
                    {
                        order: 2,
                        classification: caseClassesFields[2]?.valueMappingPerKey['klassifikasjonssystem']?.mappingString ? caseClassesFields[2].valueMappingPerKey['klassifikasjonssystem']?.mappingString : null,
                        class: caseClassesFields[2]?.valueMappingPerKey['klasseId']?.mappingString ? caseClassesFields[2].valueMappingPerKey['klasseId']?.mappingString : null,
                        title: caseClassesFields[2]?.valueMappingPerKey['tittel']?.mappingString ? caseClassesFields[2].valueMappingPerKey['tittel']?.mappingString : null,
                        shielding: {accessCode: null, paragraph: null}
                    }
                ]
            }
        },
        recordData: {
            title: recordFields.valueMappingPerKey['tittel']?.mappingString ? recordFields.valueMappingPerKey['tittel']?.mappingString : null,
            publicTitle: recordFields.valueMappingPerKey['offentligTittel']?.mappingString ? recordFields.valueMappingPerKey['offentligTittel']?.mappingString : null,
            administrativeUnit: recordFields.valueMappingPerKey['administrativenhet']?.mappingString ? recordFields.valueMappingPerKey['administrativenhet']?.mappingString : null,
            recordStatus: recordFields.valueMappingPerKey['journalstatus']?.mappingString ? recordFields.valueMappingPerKey['journalstatus']?.mappingString : null,
            recordType: recordFields.valueMappingPerKey['journalposttype']?.mappingString ? recordFields.valueMappingPerKey['journalposttype']?.mappingString : null,
            caseWorker: recordFields.valueMappingPerKey['saksbehandler']?.mappingString ? recordFields.valueMappingPerKey['saksbehandler']?.mappingString : null,
           shielding: {
               accessCode: recordShieldingFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString ? recordShieldingFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString : null,
               paragraph: recordShieldingFields.valueMappingPerKey['skjermingshjemmel']?.mappingString ? recordShieldingFields.valueMappingPerKey['skjermingshjemmel']?.mappingString : null,
           },
            mainDocument: {
                title: mainDocumentFields.valueMappingPerKey['tittel']?.mappingString ? mainDocumentFields.valueMappingPerKey['tittel']?.mappingString : null,
                documentStatus: mainDocumentFields.valueMappingPerKey['dokumentstatus']?.mappingString ? mainDocumentFields.valueMappingPerKey['dokumentstatus']?.mappingString : null,
                documentType: mainDocumentFields.valueMappingPerKey['dokumentType']?.mappingString ? mainDocumentFields.valueMappingPerKey['dokumentType']?.mappingString : null,
                role: mainDocumentFields.valueMappingPerKey['tilknyttetRegistreringSom']?.mappingString ? mainDocumentFields.valueMappingPerKey['tilknyttetRegistreringSom']?.mappingString : null,
                fileFormat: mainDocumentObjectFields.valueMappingPerKey['filformat']?.mappingString ? mainDocumentObjectFields.valueMappingPerKey['filformat']?.mappingString : null,
                variant: mainDocumentObjectFields.valueMappingPerKey['variantformat']?.mappingString ? mainDocumentObjectFields.valueMappingPerKey['variantformat']?.mappingString : null,
                file: mainDocumentObjectFields.valueMappingPerKey['fil']?.mappingString ? mainDocumentObjectFields.valueMappingPerKey['fil']?.mappingString : null
            },
            attachmentDocuments: {
                title: attachmentDocumentFields.valueMappingPerKey['tittel']?.mappingString ? attachmentDocumentFields.valueMappingPerKey['tittel']?.mappingString : null,
                documentStatus: attachmentDocumentFields.valueMappingPerKey['dokumentstatus']?.mappingString ? attachmentDocumentFields.valueMappingPerKey['dokumentstatus']?.mappingString : null,
                documentType: attachmentDocumentFields.valueMappingPerKey['dokumentType']?.mappingString ? attachmentDocumentFields.valueMappingPerKey['dokumentType']?.mappingString : null,
                role: attachmentDocumentFields.valueMappingPerKey['tilknyttetRegistreringSom']?.mappingString ? attachmentDocumentFields.valueMappingPerKey['tilknyttetRegistreringSom']?.mappingString : null,
                fileFormat: attachmentDocumentObjectFields.valueMappingPerKey['filformat']?.mappingString ? attachmentDocumentObjectFields.valueMappingPerKey['filformat']?.mappingString : null,
                variant: attachmentDocumentObjectFields.valueMappingPerKey['variantformat']?.mappingString ? attachmentDocumentObjectFields.valueMappingPerKey['variantformat']?.mappingString : null,
                file: attachmentDocumentObjectFields.valueMappingPerKey['fil']?.mappingString ? attachmentDocumentObjectFields.valueMappingPerKey['fil']?.mappingString : null
            },
            correspondent: {
                shielding: {
                    accessCode: correspondentShieldingFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString ? correspondentShieldingFields.valueMappingPerKey['tilgangsrestriksjon']?.mappingString : null,
                    paragraph: correspondentShieldingFields.valueMappingPerKey['skjermingshjemmel']?.mappingString ? correspondentShieldingFields.valueMappingPerKey['skjermingshjemmel']?.mappingString : null,
                },
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
            }
        }
    }
}
