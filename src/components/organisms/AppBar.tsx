import MenuItems from '../molecules/MenuItems';
import {
    Button,
    Dropdown,
    Heading,
    HStack,
    InternalHeader,
    Label,
    Select,
    Spacer,
} from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { LanguageIcon, LeaveIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import * as React from 'react';

export const AppBar = () => {
    const history = useNavigate();
    const { t } = useTranslation('translations', { keyPrefix: 'menu' });

    return (
        <InternalHeader style={{ backgroundColor: '#FCF5ED' }}>
            <Button
                variant="tertiary"
                size={'small'}
                onClick={() => {
                    history('/');
                }}>
                <Heading size={'medium'} style={{ color: '#6B133D' }}>
                    FINT Flyt
                </Heading>
            </Button>
            <MenuItems />
            <Spacer />
            <HStack gap={'4'} align={'center'}>
                <Button
                    size={'small'}
                    variant="tertiary"
                    icon={<LeaveIcon aria-hidden />}
                    rel="external noopener noreferrer"
                    as="a"
                    href={`/_oauth/logout`}>
                    Logg ut
                </Button>
                <HStack gap={'0'} align={'center'}>
                    <LanguageIcon aria-hidden style={{ color: '#000000' }} />
                    <Select
                        className={'language-select'}
                        label="Velg bostedsland"
                        hideLabel
                        size={'small'}
                        onChange={(e) => changeLanguage(e.target.value)}>
                        <option value="no">{t('norwegian')}</option>
                        <option value="nn">{t('norwegianNN')}</option>
                        <option value="en">{t('english')}</option>
                    </Select>
                </HStack>
            </HStack>
        </InternalHeader>
    );
};
