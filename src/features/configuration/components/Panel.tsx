import * as React from "react";
import {FormProvider, useForm} from "react-hook-form";
import ObjectComponent from "./ObjectComponent";
import {testObjectTemplateSak} from "../defaults/FormTemplates";

const Panel: React.FunctionComponent<any> = () => {
    const methods = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <ObjectComponent
                    template={testObjectTemplateSak}
                />
                <input type="submit"/>
            </form>
        </FormProvider>
    );
}
export default Panel;