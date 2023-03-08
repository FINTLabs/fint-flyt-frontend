import {IFormConfiguration} from "../../configuration/types/Form/FormData";
import {ICollectionMapping, IConfiguration, IObjectMapping} from "../../configuration/types/Configuration";

export function toFormData(data: IConfiguration): IFormConfiguration {
    const caseFields: IObjectMapping = data.mapping?.objectMappingPerKey['sak'] ? data.mapping?.objectMappingPerKey['sak'] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const recordFields: IObjectMapping = data.mapping?.objectMappingPerKey['journalpost'] ? data.mapping?.objectMappingPerKey['journalpost'] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const caseNewCaseFields: IObjectMapping = caseFields.objectMappingPerKey['ny'] ? caseFields.objectMappingPerKey['ny'] :  {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const caseClassesFields: IObjectMapping[] = caseNewCaseFields.objectCollectionMappingPerKey['klasse']?.elementMappings ? caseNewCaseFields.objectCollectionMappingPerKey['klasse']?.elementMappings  :  []
    const caseShieldingFields: IObjectMapping = caseNewCaseFields.objectMappingPerKey['skjerming'] ? caseNewCaseFields.objectMappingPerKey['skjerming'] :  {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const recordShieldingFields: IObjectMapping = recordFields.objectMappingPerKey['skjerming'] ? recordFields.objectMappingPerKey['skjerming'] :  {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}

    const documentDescription: ICollectionMapping<IObjectMapping> = recordFields.objectCollectionMappingPerKey['dokumentbeskrivelse'] ? recordFields.objectCollectionMappingPerKey['dokumentbeskrivelse'] : {elementMappings: [], fromCollectionMappings: []};
    const mainDocumentFields: IObjectMapping = documentDescription.elementMappings[0] ? documentDescription.elementMappings[0] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const mainDocumentObjectFields: IObjectMapping = mainDocumentFields.objectCollectionMappingPerKey['dokumentobjekt']?.elementMappings[0] ? mainDocumentFields.objectCollectionMappingPerKey['dokumentobjekt'].elementMappings[0] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const attachmentDocumentFields: IObjectMapping = documentDescription.fromCollectionMappings[0]?.elementMapping ? documentDescription.fromCollectionMappings[0].elementMapping : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const attachmentDocumentObjectFields: IObjectMapping = attachmentDocumentFields.objectCollectionMappingPerKey['dokumentobjekt']?.elementMappings[0] ? attachmentDocumentFields.objectCollectionMappingPerKey['dokumentobjekt'].elementMappings[0] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}

    const correspondent: ICollectionMapping<IObjectMapping> = recordFields.objectCollectionMappingPerKey['korrespondansepart'] ? recordFields.objectCollectionMappingPerKey['korrespondansepart'] : {elementMappings: [], fromCollectionMappings: []};
    const correspondentFields: IObjectMapping = correspondent.elementMappings[0] ? correspondent.elementMappings[0] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}

    const addressFields: IObjectMapping = correspondentFields.objectMappingPerKey['adresse'] ? correspondentFields.objectMappingPerKey['adresse'] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const contactFields: IObjectMapping = correspondentFields.objectMappingPerKey['kontaktinformasjon'] ? correspondentFields.objectMappingPerKey['kontaktinformasjon'] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}
    const correspondentShieldingFields: IObjectMapping = correspondentFields.objectMappingPerKey['skjerming'] ? correspondentFields.objectMappingPerKey['skjerming'] : {objectMappingPerKey: {}, objectCollectionMappingPerKey: {}, valueMappingPerKey: {}, valueCollectionMappingPerKey: {}}


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
