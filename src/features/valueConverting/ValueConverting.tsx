import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import useValueConvertingRepository from '../../shared/api/useValueConvertingRepository';
import AlertMessage from '../../shared/components/AlertMessage';
import { TableLayoutWrapper } from '../../shared/components/table/TableLayoutWrapper';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { defaultAlert } from '../../shared/defaults/alertMessages';
import { IAlertContent } from '../../shared/types/AlertContent';
import ValueConvertingForm from './components/ValueConvertingForm';
import ValueConvertingTable from './components/ValueConvertingTable';
import { ValueConvertingToolbar } from './components/ValueConvertingToolbar';
import { ValueConvertingFilterProvider } from './tableToolbar/FilterContext';
import { IValueConverting } from './types/ValueConverting';

const ValueConverting: React.FC = () => {
    const ValueConvertingRepository = useValueConvertingRepository();
    const [existingValueConverting, setExistingValueConverting] = useState<
        IValueConverting | undefined
    >(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState(false);
    const [alertContent, setAlertContent] = useState<IAlertContent>(defaultAlert);
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

    const closeForm = () => {
        setExistingValueConverting(undefined);
        setNewValueConverting(false);
        setIsEdit(false);
    };

    const openExistingValueConverting = (id: number, edit: boolean) => {
        return ValueConvertingRepository.getValueConverting(id)
            .then((response) => {
                setIsEdit(edit);
                setExistingValueConverting(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleAlert = (content: IAlertContent) => {
        setAlertContent(content);
    };

    const handleFormSuccess = (content: IAlertContent) => {
        setAlertContent(content);
        closeForm();
    };

    const showForm = existingValueConverting || newValueConverting;

    return (
        <>
            <AlertMessage
                id="valueconverting"
                open={alertContent.severity !== 'announcement'}
                onClose={() => setAlertContent(defaultAlert)}
                status={alertContent.severity}
                title={alertContent.message}
                content={alertContent.content}
            />
            {showForm ? (
                <ValueConvertingForm
                    existingValueConverting={existingValueConverting ?? undefined}
                    setNewValueConverting={setNewValueConverting}
                    setExistingValueConverting={setExistingValueConverting}
                    isEdit={isEdit}
                    onAlert={handleAlert}
                    onSuccess={handleFormSuccess}
                />
            ) : (
                <ValueConvertingFilterProvider>
                    <TableLayoutWrapper
                        toolbar={
                            <ValueConvertingToolbar
                                onNewConverting={() => {
                                    setIsEdit(false);
                                    setNewValueConverting(true);
                                }}
                            />
                        }
                    >
                        <ValueConvertingTable
                            onValueConvertingSelected={(id: number) =>
                                openExistingValueConverting(id, false)
                            }
                            onValueConvertingEdit={(id: number) =>
                                openExistingValueConverting(id, true)
                            }
                            onAlert={handleAlert}
                        />
                    </TableLayoutWrapper>
                </ValueConvertingFilterProvider>
            )}
        </>
    );
};

export default ValueConverting;
