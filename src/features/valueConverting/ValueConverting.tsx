import React, {useState} from 'react';
import ValueConvertingTable from "./components/ValueConvertingTable";
import ValueConvertingForm from "./components/ValueConvertingForm";
import ValueConvertingRepository from "../../shared/repositories/ValueConvertingRepository";
import {RouteComponent} from "../main/Route";
import PageTemplate from "../../components/templates/PageTemplate";

const ValueConverting: RouteComponent = () => {
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false)
    return (
        <PageTemplate keyPrefix={'pages.valueConverting'}>
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