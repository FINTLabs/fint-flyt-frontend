import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ValueConvertingTable from "./components/ValueConvertingTable";
import ValueConvertingForm from "./components/ValueConvertingForm";
import {ConfigurationFormStyles} from "../../util/styles/ConfigurationFormStyles";
import ValueConvertingRepository from "../../shared/repositories/ValueConvertingRepository";
import {RouteComponent} from "../main/Route";

const useStyles = ConfigurationFormStyles

const ValueConverting: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false)
    const [view, setView] = useState<boolean>(false);
    const classes = useStyles();
    return (
        <>
            {existingValueConverting ?
                <ValueConvertingForm existingValueConverting={existingValueConverting}
                                     setNewValueConverting={setNewValueConverting}
                                     setExistingValueConverting={setExistingValueConverting}
                                     view={view}
                />
                :
                newValueConverting ?
                    <ValueConvertingForm setNewValueConverting={setNewValueConverting}
                                         existingValueConverting={undefined}
                                         setExistingValueConverting={setExistingValueConverting} view={false}/>
                    :
                    <>
                        <h2 className={classes.title2} id="value-converting-panel-header">{t('panelHeader')}</h2>
                        <ValueConvertingTable setNewValueConverting={setNewValueConverting}
                                              onValueConvertingSelected={(id: number, view: boolean) => {
                                                  return ValueConvertingRepository.getValueConverting(id)
                                                      .then(response => {
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

export default ValueConverting;