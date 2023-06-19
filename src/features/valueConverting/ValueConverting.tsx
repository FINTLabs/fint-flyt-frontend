import React, {useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import ValueConvertingTable from "./components/ValueConvertingTable";
import ValueConvertingForm from "./components/ValueConvertingForm";
import {configurationFormStyles} from "../styles/ConfigurationForm.styles";
import ValueConvertingRepository from "../../shared/repositories/ValueConvertingRepository";

const useStyles = configurationFormStyles

const ValueConverting: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const [view, setView] = useState<boolean>(false);
    const classes = useStyles();
    return (
        <>
            {existingValueConverting ?
                <ValueConvertingForm existingValueConverting={existingValueConverting}
                                     setExistingValueConverting={setExistingValueConverting}
                                     view={view}
                />
                :
                <>
                    <h2 className={classes.title2} id="value-converting-panel-header">{t('panelHeader')}</h2>
                    <ValueConvertingTable onValueConvertingSelected={(id: number, view: boolean) => {
                        return ValueConvertingRepository.getValueConverting(id)
                            .then(response => {
                                console.log(response)
                                setView(view)
                                setExistingValueConverting(response.data);
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    }
                    }/>
                </>
            }</>
    );
}

export default withRouter(ValueConverting);