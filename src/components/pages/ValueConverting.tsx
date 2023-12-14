import React, {useState} from 'react';
import ValueConvertingTable from "../../features/valueConverting/components/ValueConvertingTable";
import ValueConvertingForm from "../../features/valueConverting/components/ValueConvertingForm";
import ValueConvertingRepository from "../../api/ValueConvertingRepository";
import PageTemplate from "../templates/PageTemplate";
import {RouteComponent} from "../../routes/Route";

const ValueConverting: RouteComponent = () => {
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false)
    return (
        <PageTemplate id={'value-converting'} keyPrefix={'pages.valueConverting'}
                      headingHelpText={{title: "Verdikonverteringer informasjon", info: 'help.valueConverting'}}>
            {existingValueConverting || newValueConverting ?
                <ValueConvertingForm
                    existingValueConverting={existingValueConverting ?? undefined}
                    setNewValueConverting={setNewValueConverting}
                    setExistingValueConverting={setExistingValueConverting}
                />
                :
                <ValueConvertingTable
                    setNewValueConverting={setNewValueConverting}
                    onValueConvertingSelected={(id: number) => {
                        return ValueConvertingRepository.getValueConverting(id)
                            .then(response => {
                                setExistingValueConverting(response.data);
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    }
                    }/>
            }
        </PageTemplate>
    );
}

export default ValueConverting;