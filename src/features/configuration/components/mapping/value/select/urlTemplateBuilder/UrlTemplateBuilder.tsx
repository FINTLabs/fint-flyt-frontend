import { Detail, HStack, TextField, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useEffect, useMemo, useState } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { IReferenceTemplate } from '../../../../../types/FormTemplate';

type Props = {
    fieldState: ControllerFieldState | undefined;
    disabled?: boolean;
    name: string;
    referenceTemplate?: IReferenceTemplate | null;
    selectedValue?: string | null;
};

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

    const typeIdx = templatePath.indexOf('{identifierType}');
    if (typeIdx === -1) {
        return null;
    }
    const suffix = templatePath.slice(typeIdx); // e.g. "{identifierType}/{identifierValue}"
    const suffixMatch = selectedPath.match(new RegExp(`${templatePathToRegex('/' + suffix)}$`));
    if (suffixMatch) {
        return { identifierType: suffixMatch[1], identifierValue: suffixMatch[2] };
    }

    return null;
}

function buildUrlPreview(
    urlTemplate: string | undefined,
    identifierType: string | undefined,
    identifierValue: string
): string {
    if (!urlTemplate) {
        return '';
    }

    // Avoid URL.pathname — it encodes { } so placeholders no longer match.
    const path = removeHostFromUrl(urlTemplate);

    return path
        .replaceAll('{identifierType}', identifierType ?? '')
        .replaceAll('{identifierValue}', identifierValue);
}

const UrlTemplateBuilder = ({
    fieldState,
    disabled,
    name,
    referenceTemplate,
    selectedValue,
}: Props) => {
    const identifierTypes = referenceTemplate?.identifierTypes ?? [];
    const [selectedIdentifierType, setSelectedIdentifierType] = useState<string | undefined>(
        identifierTypes[0]
    );
    const [identifierValue, setIdentifierValue] = useState('');

    useEffect(() => {
        if (selectedValue && referenceTemplate?.urlTemplate) {
            const parsed = extractIdentifiersFromValue(
                selectedValue,
                referenceTemplate.urlTemplate
            );
            if (parsed) {
                setSelectedIdentifierType(parsed.identifierType);
                setIdentifierValue(parsed.identifierValue);
            }
            return;
        }

        if (identifierTypes.length > 0) {
            setSelectedIdentifierType((current) =>
                current && identifierTypes.includes(current) ? current : identifierTypes[0]
            );
        }
    }, [selectedValue, referenceTemplate?.urlTemplate, identifierTypes]);

    const urlPreview = useMemo(
        () =>
            buildUrlPreview(
                referenceTemplate?.urlTemplate,
                selectedIdentifierType,
                identifierValue
            ),
        [referenceTemplate?.urlTemplate, selectedIdentifierType, identifierValue]
    );

    return (
        <VStack gap="1" id={'url-template-builder-' + name}>
            <HStack gap="2" wrap={false}>
                <UNSAFE_Combobox
                    id={name + '-identifier-type'}
                    size="small"
                    label="Kildesystemid"
                    options={identifierTypes}
                    selectedOptions={selectedIdentifierType ? [selectedIdentifierType] : []}
                    onToggleSelected={(option, isSelected) => {
                        setSelectedIdentifierType(isSelected ? option : undefined);
                    }}
                    hideLabel
                    disabled={disabled}
                />
                <TextField
                    id={name + '-identifier-value'}
                    size="small"
                    label="Kildeidentifikator"
                    hideLabel
                    disabled={disabled}
                    value={identifierValue}
                    onChange={(e) => setIdentifierValue(e.target.value)}
                />
            </HStack>
            {urlPreview && (
                <Detail textColor="subtle" data-testid={name + '-url-preview'}>
                    {urlPreview}
                </Detail>
            )}
        </VStack>
    );
};

export default UrlTemplateBuilder;
