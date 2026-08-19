import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import useValueConvertingRepository from '../../shared/api/useValueConvertingRepository';
import PageTemplate from '../../shared/components/layout/PageTemplate';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import ValueConvertingForm from './components/ValueConvertingForm';
import ValueConvertingTable from './components/ValueConvertingTable';
import { IValueConverting } from './types/ValueConverting';

const ValueConverting: React.FC = () => {
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
                          textKey: 'button.newConverting',
                          onClick: () => setNewValueConverting(true),
                          helpTextKey: 'help.new',
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
