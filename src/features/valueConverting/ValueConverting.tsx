import React, {useState} from 'react';
import {Link as RouterLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {Button, Typography} from "@mui/material";
import {useTranslation} from 'react-i18next';
import ValueConvertingPanel from "./components/ValueConvertingPanel";
import ValueConvertingForm from "./components/ValueConvertingForm";

const ValueConverting: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    return (
        <>
            <Typography>{t('header')}</Typography>
            {existingValueConverting ?
                <ValueConvertingForm existingValueConverting={existingValueConverting}
                                     setExistingValueConverting={setExistingValueConverting}/>
                :
                <>
                    <ValueConvertingPanel setExistingValueConverting={setExistingValueConverting}/>
                    <Button sx={{mt: 3}} size="medium" variant="contained" component={RouterLink}
                            to={'/valueconverting/new'}>Ny</Button>
                </>
            }</>
    );
}

export default withRouter(ValueConverting);