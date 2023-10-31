import React from 'react';
import {Box, Typography} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {RouteComponent} from "../main/Route";
import AccordionComponent from "./components/AccordionComponent";
import {SUPPORT_CONTENT} from "./supportTexts";
import theme, { useCommonStyles } from '../../util/styles/theme/theme';

const Support: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.support'});
    const view = true;
    const maintheme = useCommonStyles(theme);
    
    return view ? (
        <Box id={'support-page'}>
            <Typography id={'support-header'} variant={"h6"}>{t('header')}</Typography>
            <Box id={'support-content'} sx={{mt: 2}}>
                <AccordionComponent data={SUPPORT_CONTENT} classes={maintheme.card} />
            </Box>
        </Box>
    ) : (<>
            <Typography variant={"h6"}>{t('header')}</Typography>
        </>
    );
}

export default Support;