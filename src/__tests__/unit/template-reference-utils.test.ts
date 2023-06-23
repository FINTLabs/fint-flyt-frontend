import {getTemplatePathFromTemplateReference} from "../../features/configuration/util/TemplateReferenceUtils";


describe('', () => {

    test('template path from template reference 1', () => {
        const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
        const reference: string = '/sak.journalposter.1.tittel';
        expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
            .toEqual(['sak', 'journalposter', '1', 'tittel'])
    });

    test('template path from template reference 2', () => {
        const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
        const reference: string = 'tittel';
        expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
            .toEqual(['sak', 'journalposter', '1', 'tittel'])
    });

    test('template path from template reference 3', () => {
        const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
        const reference: string = '../n.tittel';
        expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
            .toEqual(['sak', 'journalposter', '1', 'tittel'])
    });

    test('template path from template reference 4', () => {
        const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
        const reference: string = '../n+1.tittel';
        expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
            .toEqual(['sak', 'journalposter', '2', 'tittel'])
    });

    test('template path from template reference 5', () => {
        const referenceOriginPath: string[] = ['sak', 'journalposter', '1'];
        const reference: string = '../n-1.tittel';
        expect(getTemplatePathFromTemplateReference(referenceOriginPath, reference))
            .toEqual(['sak', 'journalposter', '0', 'tittel'])
    });

})
