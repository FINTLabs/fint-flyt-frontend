import React, {useState} from 'react';
import {Link as RouterLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {Button} from "@mui/material";
import {useTranslation} from 'react-i18next';
import ValueConvertingPanel from "./components/ValueConvertingPanel";
import ValueConvertingForm from "./components/ValueConvertingForm";
import {configurationFormStyles} from "../configuration/styles/ConfigurationForm.styles";
import ValueConvertingRepository from "../../shared/repositories/ValueConvertingRepository";

const useStyles = configurationFormStyles

const ValueConverting: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const classes = useStyles();
    return (
        <>
            {existingValueConverting ?
                <ValueConvertingForm existingValueConverting={existingValueConverting}
                                     setExistingValueConverting={setExistingValueConverting}
                />
                :
                <>
                    <h2 className={classes.title2} id="value-converting-panel-header">{t('panelHeader')}</h2>
                    <ValueConvertingPanel onValueConvertingSelected={(id: number) => {
                        return ValueConvertingRepository.getValueConverting(id)
                            .then(response => {
                                console.log(response)
                                setExistingValueConverting(response.data);
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    }
                    }/>
                    <Button sx={{mt: 3}} size="medium" variant="contained" component={RouterLink}
                            to={'/valueconverting/new'}>Ny</Button>
                </>
            }</>
    );
}

export default withRouter(ValueConverting);