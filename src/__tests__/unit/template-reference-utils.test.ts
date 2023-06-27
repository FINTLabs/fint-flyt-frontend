import {getTemplatePathFromTemplateReference} from "../../features/configuration/util/TemplateReferenceUtils";


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


})
