import { Detail, ErrorMessage, HStack, TextField, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IReferenceTemplate } from '../../../../../types/FormTemplate';

type Props = {
    fieldState: ControllerFieldState | undefined;
    disabled?: boolean;
    name: string;
    referenceTemplate?: IReferenceTemplate | null;
    selectedValue?: string | null;
    onChange?: (value: string) => void;
};

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

function buildUrlPreview(
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

const UrlTemplateBuilder = ({
    fieldState,
    disabled,
    name,
    referenceTemplate,
    selectedValue,
    onChange,
}: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });
    const identifierTypes = referenceTemplate?.identifierTypes ?? [];
    const [selectedIdentifierType, setSelectedIdentifierType] = useState<string | undefined>(
        identifierTypes[0]
    );
    const [identifierValue, setIdentifierValue] = useState('');
    const lastEmittedUrl = useRef<string | null>(null);
    const hasError = Boolean(fieldState?.error);
    const errorId = `error-message-${name}`;

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

    useEffect(() => {
        if (disabled || selectedValue || !onChange || !referenceTemplate?.urlTemplate) {
            return;
        }
        const nextUrl = buildFullUrl(
            referenceTemplate.urlTemplate,
            selectedIdentifierType,
            identifierValue
        );
        if (nextUrl === lastEmittedUrl.current) {
            return;
        }
        lastEmittedUrl.current = nextUrl;
        onChange(nextUrl);
    }, [
        disabled,
        selectedValue,
        onChange,
        referenceTemplate?.urlTemplate,
        selectedIdentifierType,
        identifierValue,
    ]);

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
                    error={hasError}
                />
                <TextField
                    id={name + '-identifier-value'}
                    size="small"
                    label="Kildeidentifikator"
                    hideLabel
                    disabled={disabled}
                    value={identifierValue}
                    onChange={(e) => setIdentifierValue(e.target.value)}
                    error={hasError}
                />
            </HStack>
            {urlPreview && (
                <Detail textColor="subtle" data-testid={name + '-url-preview'}>
                    {urlPreview}
                </Detail>
            )}
            {hasError && (
                <ErrorMessage id={errorId} size="small" data-testid="error-message">
                    {t('label.formatError')}
                </ErrorMessage>
            )}
        </VStack>
    );
};

export default UrlTemplateBuilder;
