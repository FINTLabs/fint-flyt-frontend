import { Detail, ErrorMessage, HStack, TextField, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useMemo, useRef, useState } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IReferenceTemplate } from '../../../../../types/FormTemplate';
import {
    buildFullUrl,
    buildUrlPreview,
    getInitialIdentifiers,
    matchesReferenceTemplate,
} from '../../../../../util/urlTemplateUtils';

type Props = {
    fieldState: ControllerFieldState | undefined;
    disabled?: boolean;
    name: string;
    referenceTemplate?: IReferenceTemplate | null;
    selectedValue?: string | null;
    onChange?: (value: string) => void;
};

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

    const initial = useMemo(
        () => getInitialIdentifiers(selectedValue, referenceTemplate),
        // Only on mount or when urlTemplate identity changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [referenceTemplate?.urlTemplate]
    );
    const [selectedIdentifierType, setSelectedIdentifierType] = useState<string | undefined>(
        initial.identifierType
    );
    const [identifierValue, setIdentifierValue] = useState(initial.identifierValue);
    const lastEmittedUrl = useRef<string | null>(selectedValue ?? null);

    const formHasError = Boolean(fieldState?.error);
    const typeMissing = formHasError && !selectedIdentifierType;
    const valueMissing = formHasError && !identifierValue.trim();
    const errorId = `error-message-${name}`;

    const selectedOptions = useMemo(
        () => (selectedIdentifierType ? [selectedIdentifierType] : []),
        [selectedIdentifierType]
    );

    const emitUrl = (identifierType: string | undefined, value: string) => {
        if (disabled || !onChange || !referenceTemplate?.urlTemplate) {
            return;
        }
        const nextUrl =
            identifierType && value.trim()
                ? buildFullUrl(referenceTemplate.urlTemplate, identifierType, value)
                : '';
        if (nextUrl === lastEmittedUrl.current) {
            return;
        }
        lastEmittedUrl.current = nextUrl;
        onChange(nextUrl);
    };

    const urlPreview = useMemo(
        () =>
            buildUrlPreview(
                referenceTemplate?.urlTemplate,
                selectedIdentifierType,
                identifierValue
            ),
        [referenceTemplate?.urlTemplate, selectedIdentifierType, identifierValue]
    );

    // For a selected dropdown option that does not match the reference template,
    // do not show a misleading preview built from fallback defaults.
    const showUrlPreview =
        Boolean(urlPreview) &&
        (!disabled || matchesReferenceTemplate(selectedValue ?? '', referenceTemplate));

    return (
        <VStack gap="1" id={'url-template-builder-' + name}>
            <HStack gap="2" wrap={false}>
                <UNSAFE_Combobox
                    id={name + '-identifier-type'}
                    size="small"
                    label="Kildesystemid"
                    options={identifierTypes}
                    selectedOptions={selectedOptions}
                    onToggleSelected={(option, isSelected) => {
                        if (isSelected) {
                            if (option === selectedIdentifierType) {
                                return;
                            }
                            setSelectedIdentifierType(option);
                            emitUrl(option, identifierValue);
                            return;
                        }
                        if (option !== selectedIdentifierType) {
                            return;
                        }
                    }}
                    hideLabel
                    disabled={disabled}
                    error={typeMissing}
                />
                <TextField
                    id={name + '-identifier-value'}
                    size="small"
                    label="Kildeidentifikator"
                    hideLabel
                    disabled={disabled}
                    value={identifierValue}
                    onChange={(e) => {
                        const nextValue = e.target.value;
                        setIdentifierValue(nextValue);
                        emitUrl(selectedIdentifierType, nextValue);
                    }}
                    error={valueMissing}
                />
            </HStack>
            {showUrlPreview && (
                <Detail textColor="subtle" data-testid={name + '-url-preview'}>
                    {urlPreview}
                </Detail>
            )}
            {typeMissing && (
                <ErrorMessage id={`${errorId}-type`} size="small" data-testid="error-message">
                    {t('label.formatError')}
                </ErrorMessage>
            )}
            {valueMissing && (
                <ErrorMessage id={`${errorId}-value`} size="small" data-testid="error-message">
                    {t('label.formatError')}
                </ErrorMessage>
            )}
        </VStack>
    );
};

export default UrlTemplateBuilder;
