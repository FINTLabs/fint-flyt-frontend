import MenuItems from "../molecules/MenuItems";
import {Button, Dropdown, Heading, InternalHeader, Label, Spacer} from "@navikt/ds-react";
import {useNavigate} from "react-router-dom";
import {LanguageIcon} from '@navikt/aksel-icons';
import {useTranslation} from "react-i18next";
import {changeLanguage} from "i18next";

export const AppBar = () => {
    const history = useNavigate();
    const {t} = useTranslation('translations', {keyPrefix: 'menu'});

    return (
        <InternalHeader style={{backgroundColor: "#FCF5ED"}}>
            <Button
                variant="tertiary"
                size={"small"}
                onClick={() => {
                    history("/");
                }}
            >
                <Heading size={"medium"} style={{color:"#6B133D"}}>FINT Flyt</Heading>
            </Button>
            <MenuItems/>
            <Spacer/>
            <Dropdown>
                <InternalHeader.Button as={Dropdown.Toggle}>
                    <LanguageIcon aria-hidden style={{color:"#000000"}}/>
                    <Label style={{color:"#000000"}}>{t('language')}</Label>
                </InternalHeader.Button>
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Item onClick={() => changeLanguage("no")}>
                            {t('norwegian')}
                        </Dropdown.Menu.GroupedList.Item>
                        <Dropdown.Menu.GroupedList.Item onClick={() => changeLanguage("nn")}>
                            {t('norwegianNN')}
                        </Dropdown.Menu.GroupedList.Item>
                        <Dropdown.Menu.GroupedList.Item onClick={() => changeLanguage("en")}>
                            {t('english')}
                        </Dropdown.Menu.GroupedList.Item>
                    </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
            </Dropdown>
        </InternalHeader>
    );
};
