import React from 'react';
import {Box, Typography} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {SupportStyles} from "../../util/styles/Support.styles";
import {RouteComponent} from "../main/Route";
import AccordionComponent from "./components/AccordionComponent";
import {SUPPORT_CONTENT} from "./supportTexts";

const useStyles = SupportStyles

const Support: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.support'});
    const classes = useStyles();
    const view = true;

    return view ? (
        <>
            <Typography variant={"h6"}>{t('header')}</Typography>
            <Box sx={{mt: 2}}>
                <AccordionComponent data={SUPPORT_CONTENT} classes={classes}/>
            </Box>
        </>
    ) : (<>
            <Typography variant={"h6"}>{t('header')}</Typography>
        </>
    );
}

export default Support;