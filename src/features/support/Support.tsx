import React from 'react';
import {Box, Typography} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {SupportStyles} from "../../util/styles/Support.styles";
import {RouteComponent} from "../main/Route";
import SupportSectionComponent, {AccordionData} from "./components/SupportSectionComponent";
import {FAQ, FLYT_DESCRIPTION, USER_GUIDE, WORD_LIST} from "./supportTexts";

const useStyles = SupportStyles

const Support: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.support'});
    const classes = useStyles();
    const view = true;

    const content: AccordionData[] = [
        {
            id: "1",
            summary: "Hva er FINT Flyt",
            details: FLYT_DESCRIPTION
        },
        {
            id: "2",
            summary: "Brukerveiledning",
            summary2: "Hvordan opprette en integrasjon og konfigurasjon",
            details: USER_GUIDE
        },
        {
            id: "3",
            summary: "Ordbok",
            summary2: "Begrep og definisjoner i Flyt",
            details: "Under finner du en liste over ord, begrep og konsepter som brukes mye i Flyt",
            listItems: WORD_LIST
        },
        {
            id: "4",
            summary: "FAQ",
            summary2: "Ofte stilte spørsmål",
            details: "",
            listItems: FAQ
        },
        {
            id: "5",
            summary: "Hjelp og support",
            summary2: "Finner du ikke svaret på det du lurer på?",
            details: "LOL synd for deg"
        }
    ];

    return view ? (
        <>
            <Typography variant={"h6"}>{t('header')}</Typography>
            <Box sx={{mt: 2}}>
                <SupportSectionComponent data={content} classes={classes}/>
            </Box>
        </>
    ) : (<>
            <Typography variant={"h6"}>{t('header')}</Typography>
        </>
    );
}

export default Support;