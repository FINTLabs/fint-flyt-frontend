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
    const pathPattern = templatePathToRegex(templatePath);

    // Exact path match (hosts may differ; compared after strip)
    const fullMatch = selectedPath.match(new RegExp(`^${pathPattern}$`));
    if (fullMatch) {
        return { identifierType: fullMatch[1], identifierValue: fullMatch[2] };
    }

    // Same template path as a suffix (extra leading segments allowed), but still
    // require the fixed path before {identifierType} — not only the last two segments.
    if (templatePath.includes('{identifierType}')) {
        const suffixMatch = selectedPath.match(new RegExp(`${pathPattern}$`));
        if (suffixMatch) {
            return { identifierType: suffixMatch[1], identifierValue: suffixMatch[2] };
        }
    }

    return null;
}

function isAllowedIdentifierType(
    identifierType: string,
    identifierTypes: string[] | undefined
): boolean {
    return Boolean(identifierTypes?.length && identifierTypes.includes(identifierType));
}

/** Seed UrlTemplateBuilder fields from a selected value, or fall back to the first identifier type. */
export function getInitialIdentifiers(
    selectedValue: string | null | undefined,
    referenceTemplate?: IReferenceTemplate | null
): { identifierType: string | undefined; identifierValue: string } {
    const fallbackType = referenceTemplate?.identifierTypes?.[0];
    if (selectedValue && referenceTemplate?.urlTemplate) {
        const parsed = extractIdentifiersFromValue(selectedValue, referenceTemplate.urlTemplate);
        if (
            parsed &&
            isAllowedIdentifierType(parsed.identifierType, referenceTemplate.identifierTypes)
        ) {
            return parsed;
        }
    }
    return { identifierType: fallbackType, identifierValue: '' };
}

export function matchesReferenceTemplate(
    mappingString: string,
    referenceTemplate?: IReferenceTemplate | null
): boolean {
    if (!referenceTemplate?.urlTemplate) {
        return false;
    }
    const parsed = extractIdentifiersFromValue(mappingString, referenceTemplate.urlTemplate);
    return Boolean(
        parsed?.identifierType &&
            parsed?.identifierValue &&
            isAllowedIdentifierType(parsed.identifierType, referenceTemplate.identifierTypes)
    );
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
