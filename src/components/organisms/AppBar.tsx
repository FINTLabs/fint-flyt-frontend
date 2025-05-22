import MenuItems from '../molecules/MenuItems';
import { Dropdown, Heading, HStack, InternalHeader, Spacer } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { LanguageIcon, LeaveIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';

export const AppBar = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'menu' });

    return (
        <InternalHeader>
            <InternalHeader.Title href="/">
                <Heading size={'medium'} style={{ color: '#6B133D' }}>
                    FINT Flyt
                </Heading>
            </InternalHeader.Title>
            <MenuItems />
            <Spacer />
            <Dropdown>
                <InternalHeader.Button as={Dropdown.Toggle}>
                    <HStack gap={'1'} align={'center'}>
                        <LanguageIcon aria-hidden />
                        {t('language')}
                    </HStack>
                </InternalHeader.Button>
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Item onClick={() => changeLanguage('no')}>
                            {t('norwegian')}
                        </Dropdown.Menu.GroupedList.Item>
                        <Dropdown.Menu.GroupedList.Item onClick={() => changeLanguage('nn')}>
                            {t('norwegianNN')}
                        </Dropdown.Menu.GroupedList.Item>
                        <Dropdown.Menu.GroupedList.Item onClick={() => changeLanguage('en')}>
                            {t('english')}
                        </Dropdown.Menu.GroupedList.Item>
                    </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
            </Dropdown>
            <InternalHeader.Button as={Link} to={`/_oauth/logout`} replace={true}>
                <HStack gap={'1'} align={'center'}>
                    <LeaveIcon aria-hidden />
                    {t('logout')}
                </HStack>
            </InternalHeader.Button>

        </InternalHeader>
    );
};
