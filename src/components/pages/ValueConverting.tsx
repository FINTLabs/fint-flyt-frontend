import React, { useContext, useEffect, useState } from 'react';
import PageTemplate from '../../components/templates/PageTemplate';
import ValueConvertingForm from '../../features/valueConverting/components/ValueConvertingForm';
import { RouteComponent } from '../../routes/Route';
import ValueConvertingTable from '../../features/valueConverting/components/ValueConvertingTable';
import { useTranslation } from 'react-i18next';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { useNavigate } from 'react-router';
import useValueConvertingRepository from '../../api/useValueConvertingRepository';
import { IValueConverting } from '../../features/valueConverting/types/ValueConverting';

const ValueConverting: RouteComponent = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });
    const ValueConvertingRepository = useValueConvertingRepository();
    const [existingValueConverting, setExistingValueConverting] = useState<
        IValueConverting | undefined
    >(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false);
    const { authorized, getAuthorization } = useContext(AuthorizationContext);
    const history = useNavigate();

    useEffect(() => {
        if (authorized === false) {
            history('/forbidden');
        }
    }, [authorized]);

    useEffect(() => {
        getAuthorization();
    }, []);

    return (
        <PageTemplate
            id={'valueConverting'}
            keyPrefix={'pages.valueConverting'}
            headerButton={
                !existingValueConverting && !newValueConverting
                    ? {
                          text: t('button.newConverting'),
                          onClick: () => setNewValueConverting(true),
                          buttonHelpText: { title: 'Knapp informasjon', info: t('help.new') },
                          id: 'new-button',
                      }
                    : undefined
            }
        >
            {existingValueConverting || newValueConverting ? (
                <ValueConvertingForm
                    existingValueConverting={existingValueConverting ?? undefined}
                    setNewValueConverting={setNewValueConverting}
                    setExistingValueConverting={setExistingValueConverting}
                />
            ) : (
                <ValueConvertingTable
                    setNewValueConverting={setNewValueConverting}
                    onValueConvertingSelected={(id: number) => {
                        return ValueConvertingRepository.getValueConverting(id)
                            .then((response) => {
                                setExistingValueConverting(response.data);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }}
                />
            )}
        </PageTemplate>
    );
};

export default ValueConverting;
