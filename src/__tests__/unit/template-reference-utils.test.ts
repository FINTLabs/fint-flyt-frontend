import {
    getConfigurationPathFromTemplatePath,
    getTemplatePathFromTemplateReference
} from "../../features/configuration/util/TemplateReferenceUtils";
import {IMappingTemplate, ValueType} from "../../features/configuration/types/FormTemplate";


describe('Template reference utils', () => {

    describe('getTemplatePathFromTemplateReference', () => {

        test('static reference', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
            const reference: string = '/sak.journalposter.1.tittel';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '1', 'tittel'])
        });

        test('reference with single component', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
            const reference: string = 'tittel';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '1', 'tittel'])
        });

        test('reference with multiple components', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
            const reference: string = 'part.tittel';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '1', 'part', 'tittel'])
        });

        test('reference with only dynamic path level', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1', 'part'];
            const reference: string = '../';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '1'])
        });

        test('reference with single dynamic path level', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1', 'part'];
            const reference: string = '../tittel';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '1', 'tittel'])
        });

        test('reference with multiple dynamic path levels', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1', 'part'];
            const reference: string = '../../2';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '2'])
        });

        test('reference with dynamic collection index n', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
            const reference: string = '../n.tittel';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '1', 'tittel'])
        });

        test('reference with dynamic collection index n+1', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
            const reference: string = '../n+1.tittel';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '2', 'tittel'])
        });

        test('reference with dynamic collection index n-1', () => {
            const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
            const reference: string = '../n-1.tittel';
            expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
                .toEqual(['sak', 'journalposter', '0', 'tittel'])
        });
    })

    describe('getConfigurationPathFromTemplatePath', () => {
        let template: IMappingTemplate;
        beforeEach(() => {
            template = {
                displayName: 'MappingTemplateDisplayName',
                rootObjectTemplate: {
                    objectTemplates: [
                        {
                            order: 0,
                            elementConfig: {
                                key: 'sak',
                                displayName: '',
                                description: ''
                            },
                            template: {
                                valueTemplates: [
                                    {
                                        order: 0,
                                        elementConfig: {
                                            key: 'tittel',
                                            displayName: '',
                                            description: ''
                                        },
                                        template: {
                                            type: ValueType.DYNAMIC_STRING
                                        }
                                    }
                                ],
                                valueCollectionTemplates: [
                                    {
                                        order: 1,
                                        elementConfig: {
                                            key: 'kontaktpersoner',
                                            displayName: '',
                                            description: ''
                                        },
                                        template: {
                                            elementTemplate: {
                                                type: ValueType.DYNAMIC_STRING
                                            }
                                        }
                                    }
                                ],
                                objectCollectionTemplates: [
                                    {
                                        order: 2,
                                        elementConfig: {
                                            key: 'journalposter',
                                            displayName: '',
                                            description: ''
                                        },
                                        template: {
                                            elementTemplate: {
                                                valueTemplates: [
                                                    {
                                                        order: 0,
                                                        elementConfig: {
                                                            key: 'tittel',
                                                            displayName: '',
                                                            description: ''
                                                        },
                                                        template: {
                                                            type: ValueType.DYNAMIC_STRING
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
        })

        test('value', () => {

            const templatePath: string[] = ['sak', 'tittel'];

            const configurationPath: string[] = getConfigurationPathFromTemplatePath(template, templatePath);

            expect(configurationPath).toEqual([
                'objectMappingPerKey',
                'sak',
                'valueMappingPerKey',
                'tittel',
                'mappingString'
            ])
        })

        test('value collection', () => {

            const templatePath: string[] = ['sak', 'kontaktpersoner', '2'];

            const configurationPath: string[] = getConfigurationPathFromTemplatePath(template, templatePath);

            expect(configurationPath).toEqual([
                'objectMappingPerKey',
                'sak',
                'valueCollectionMappingPerKey',
                'kontaktpersoner',
                '2',
                'mappingString'
            ])
        })

        test('object collection', () => {

            const templatePath: string[] = ['sak', 'journalposter', '0', 'tittel'];

            const configurationPath: string[] = getConfigurationPathFromTemplatePath(template, templatePath);

            expect(configurationPath).toEqual([
                'objectMappingPerKey',
                'sak',
                'objectCollectionMappingPerKey',
                'journalposter',
                '0',
                'valueMappingPerKey',
                'tittel',
                'mappingString'
            ])
        })

    });

})
