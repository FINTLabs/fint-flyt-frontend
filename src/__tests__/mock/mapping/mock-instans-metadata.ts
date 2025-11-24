import {
    IInstanceMetadataContent,
    ValueType,
} from '../../../features/configuration/types/Metadata/IntegrationMetadata';

export const MOCK_INSTANCE_METADATA: IInstanceMetadataContent = {
    instanceValueMetadata: [
        {
            displayName: 'Skjema-PDF',
            type: ValueType.FILE,
            key: 'skjemaPdf',
        },
    ],
    instanceObjectCollectionMetadata: [
        {
            displayName: 'Vedlegg',
            objectMetadata: {
                instanceValueMetadata: [
                    {
                        displayName: 'Navn',
                        type: ValueType.STRING,
                        key: 'navn',
                    },
                    {
                        displayName: 'Type',
                        type: ValueType.STRING,
                        key: 'type',
                    },
                    {
                        displayName: 'Enkoding',
                        type: ValueType.STRING,
                        key: 'enkoding',
                    },
                    {
                        displayName: 'Fil',
                        type: ValueType.FILE,
                        key: 'fil',
                    },
                ],
                instanceObjectCollectionMetadata: [
                    {
                        displayName: 'Vedlegg i vedlegg',
                        objectMetadata: {
                            instanceValueMetadata: [
                                {
                                    displayName: 'Navn',
                                    type: ValueType.STRING,
                                    key: 'navn',
                                },
                                {
                                    displayName: 'Type',
                                    type: ValueType.STRING,
                                    key: 'type',
                                },
                                {
                                    displayName: 'Enkoding',
                                    type: ValueType.STRING,
                                    key: 'enkoding',
                                },
                                {
                                    displayName: 'Fil',
                                    type: ValueType.FILE,
                                    key: 'fil',
                                },
                            ],
                            instanceObjectCollectionMetadata: [],
                            categories: [],
                        },
                        key: 'ViV',
                    },
                ],
                categories: [],
            },
            key: 'vedlegg',
        },
        {
            displayName: 'Vedlegg2',
            objectMetadata: {
                instanceValueMetadata: [
                    {
                        displayName: 'Navn',
                        type: ValueType.STRING,
                        key: 'navn',
                    },
                    {
                        displayName: 'Type',
                        type: ValueType.STRING,
                        key: 'type',
                    },
                    {
                        displayName: 'Enkoding',
                        type: ValueType.STRING,
                        key: 'enkoding',
                    },
                    {
                        displayName: 'Fil',
                        type: ValueType.FILE,
                        key: 'fil',
                    },
                ],
                instanceObjectCollectionMetadata: [],
                categories: [],
            },
            key: 'vedlegg2',
        },
    ],
    categories: [
        {
            displayName: 'Innledning',
            content: {
                instanceValueMetadata: [],
                instanceObjectCollectionMetadata: [],
                categories: [
                    {
                        displayName: 'Opplysninger',
                        content: {
                            instanceValueMetadata: [
                                {
                                    displayName: 'Fødselsnummer',
                                    type: ValueType.STRING,
                                    key: 'fodselsnummer',
                                },
                                {
                                    displayName: 'Navn',
                                    type: ValueType.STRING,
                                    key: 'navn',
                                },
                                {
                                    displayName: 'Etternavn',
                                    type: ValueType.STRING,
                                    key: 'etternavn',
                                },
                                {
                                    displayName: 'Adresse',
                                    type: ValueType.STRING,
                                    key: 'adresse',
                                },
                                {
                                    displayName: 'PostNr',
                                    type: ValueType.STRING,
                                    key: 'postnr_sted.PostNr',
                                },
                                {
                                    displayName: 'PostSted',
                                    type: ValueType.STRING,
                                    key: 'postnr_sted.PostSted',
                                },
                                {
                                    displayName: 'E-post',
                                    type: ValueType.STRING,
                                    key: 'e_post',
                                },
                                {
                                    displayName: 'Telefon',
                                    type: ValueType.STRING,
                                    key: 'telefon',
                                },
                                {
                                    displayName: 'Referansenummer',
                                    type: ValueType.STRING,
                                    key: 'referansenummer',
                                },
                                {
                                    displayName: 'Organisasjonsnr',
                                    type: ValueType.STRING,
                                    key: 'organisasjonsnr',
                                },
                                {
                                    displayName: 'Organisasjonsnavn',
                                    type: ValueType.STRING,
                                    key: 'organisasjonsnavn',
                                },
                            ],
                            instanceObjectCollectionMetadata: [],
                            categories: [],
                        },
                    },
                    {
                        displayName: 'Vedlegg',
                        content: {
                            instanceValueMetadata: [
                                {
                                    displayName: 'Tittel',
                                    type: ValueType.STRING,
                                    key: 'skjema.Tittel',
                                },
                            ],
                            instanceObjectCollectionMetadata: [],
                            categories: [],
                        },
                    },
                    {
                        displayName: 'Vedlegg2',
                        content: {
                            instanceValueMetadata: [
                                {
                                    displayName: 'Tittel',
                                    type: ValueType.STRING,
                                    key: 'skjema.Tittel_2',
                                },
                            ],
                            instanceObjectCollectionMetadata: [],
                            categories: [],
                        },
                    },
                ],
            },
        },
    ],
};
