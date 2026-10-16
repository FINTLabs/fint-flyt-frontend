import { ValueType as ConfigurationValueType } from '../types/Configuration';
import { IReferenceTemplate } from '../types/FormTemplate';
import { ISelectable } from '../types/Selectable';

export type ResolvedSelectableInputType =
    'SELECT' | 'URL_TEMPLATE' | 'DYNAMIC' | 'VALUE_CONVERTING';

export function buildFullUrl(
    urlTemplate: string,
    identifierType: string | undefined,
    identifierValue: string
): string {
    return urlTemplate
        .replaceAll('{identifierType}', identifierType ?? '')
        .replaceAll('{identifierValue}', identifierValue);
}

function removeHostFromUrl(url: string): string {
    return url.replace(/^https?:\/\/[^/]+/, '');
}

function templatePathToRegex(templatePath: string): string {
    return templatePath
        .replaceAll('{identifierType}', '<<<TYPE>>>')
        .replaceAll('{identifierValue}', '<<<VALUE>>>')
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replaceAll('<<<TYPE>>>', '([^/]+)')
        .replaceAll('<<<VALUE>>>', '([^/]+)');
}

export function extractIdentifiersFromValue(
    selectedValue: string,
    urlTemplate: string
): { identifierType: string; identifierValue: string } | null {
    const templatePath = removeHostFromUrl(urlTemplate);
    const selectedPath = removeHostFromUrl(selectedValue);

    const fullMatch = selectedPath.match(new RegExp(`^${templatePathToRegex(templatePath)}$`));
    if (fullMatch) {
        return { identifierType: fullMatch[1], identifierValue: fullMatch[2] };
    }

    const identifierTypeIndex = templatePath.indexOf('{identifierType}');
    if (identifierTypeIndex === -1) {
        return null;
    }
    const suffix = templatePath.slice(identifierTypeIndex);
    const identifiersMatch = selectedPath.match(
        new RegExp(`${templatePathToRegex('/' + suffix)}$`)
    );
    if (identifiersMatch) {
        return { identifierType: identifiersMatch[1], identifierValue: identifiersMatch[2] };
    }

    return null;
}

export function matchesReferenceTemplate(
    mappingString: string,
    referenceTemplate?: IReferenceTemplate | null
): boolean {
    if (!referenceTemplate?.urlTemplate) {
        return false;
    }
    const parsed = extractIdentifiersFromValue(mappingString, referenceTemplate.urlTemplate);
    return Boolean(parsed?.identifierType && parsed?.identifierValue);
}

/**
 * API stores URL templates as STRING. On load, resolve which UI mode to use:
 * 1. mappingString found in selectables → SELECT
 * 2. else matches referenceTemplate → URL_TEMPLATE
 * 3. else → DYNAMIC
 */
export function resolveSelectableInputType(
    configurationType: ConfigurationValueType | undefined,
    mappingString: string | null | undefined,
    selectables: ISelectable[],
    referenceTemplate?: IReferenceTemplate | null
): ResolvedSelectableInputType {
    if (configurationType === ConfigurationValueType.VALUE_CONVERTING) {
        return 'VALUE_CONVERTING';
    }
    if (configurationType === ConfigurationValueType.DYNAMIC_STRING) {
        return 'DYNAMIC';
    }

    if (
        configurationType === ConfigurationValueType.STRING ||
        configurationType === ConfigurationValueType.URL_TEMPLATE ||
        configurationType === undefined
    ) {
        if (mappingString && selectables.some((selectable) => selectable.value === mappingString)) {
            return 'SELECT';
        }
        if (mappingString && matchesReferenceTemplate(mappingString, referenceTemplate)) {
            return 'URL_TEMPLATE';
        }
        if (mappingString) {
            return 'DYNAMIC';
        }
        return 'SELECT';
    }

    throw new Error('Invalid configurationValueType');
}

export function buildUrlPreview(
    urlTemplate: string | undefined,
    identifierType: string | undefined,
    identifierValue: string
): string {
    if (!urlTemplate) {
        return '';
    }

    const path = removeHostFromUrl(urlTemplate);

    return path
        .replaceAll('{identifierType}', identifierType ?? '')
        .replaceAll('{identifierValue}', identifierValue);
}
