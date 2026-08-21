import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import useValueConvertingRepository from '../../shared/api/useValueConvertingRepository';
import { TableLayoutWrapper } from '../../shared/components/table/TableLayoutWrapper';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import ValueConvertingForm from './components/ValueConvertingForm';
import ValueConvertingTable from './components/ValueConvertingTable';
import { ValueConvertingToolbar } from './components/ValueConvertingToolbar';
import { ValueConvertingFilterProvider } from './filter/FilterContext';
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

    const showForm = existingValueConverting || newValueConverting;

    return (
        <>
            {showForm ? (
                <ValueConvertingForm
                    existingValueConverting={existingValueConverting ?? undefined}
                    setNewValueConverting={setNewValueConverting}
                    setExistingValueConverting={setExistingValueConverting}
                />
            ) : (
                <ValueConvertingFilterProvider>
                    <TableLayoutWrapper
                        toolbar={
                            <ValueConvertingToolbar
                                onNewConverting={() => setNewValueConverting(true)}
                            />
                        }
                    >
                        <ValueConvertingTable
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
                    </TableLayoutWrapper>
                </ValueConvertingFilterProvider>
            )}
        </>
    );
};

export default ValueConverting;
