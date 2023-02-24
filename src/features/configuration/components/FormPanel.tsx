import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const FormPanel: React.FunctionComponent<any> = (props) => {
    const [classIndexes, setClassIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const addClass = () => {
        // @ts-ignore
        setClassIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeClass = (index: any) => () => {
        setClassIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    const clearClasses = () => {
        setClassIndexes([]);
    };


    interface fieldContent {
        title: string;
        name: string;
    }

    interface fieldGroup {
        key: string,
        fields: fieldContent[]
    }

    const fieldGroups: fieldGroup[] = [
        {key: 'sak', fields: [
                {title: 'Tittel', name: 'tittel'},
                {title: 'Offentlig tittel', name: 'offentligTittel'},
                {title: 'Saksmappetype', name: 'saksmappetype'},
                {title: 'Administrativ enhet', name: 'administrativenhet'},
                {title: 'Ansvarlig saksbehandler', name: 'ansvarligsaksbehandler'},
                {title: 'Arkivdel', name: 'arkivdel'},
                {title: 'Journalenhet', name: 'journalenhet'},
                {title: 'Saksstatus', name: 'saksstatus'}
            ]},
        {key: 'skjerming', fields: [
                {title: 'Tilgangsrestriksjon', name: 'tilgangsrestriksjon'},
                {title: 'Skjermingshjemmel', name: 'skjermingshjemmel'}
            ]
        }
    ]

    const classes: fieldGroup = {
        key: "klasse",
        fields: [
            {title: 'Klassifikasjonssystem', name: 'klassifikasjonssystem'},
            {title: 'KlasseId', name: 'klasseId'},
            {title: 'Tittel', name: 'tittel'},
            {title: 'Rekkefølge', name: 'rekkefølge'}
        ]
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fieldGroups.map(fieldGroup => {
                return(
                    <fieldset name={fieldGroup.key} key={fieldGroup.key} style={{display: "grid"}}>
                        {fieldGroup.fields.map(field => {
                            return (
                                <label>
                                    {field.title}:
                                    <input
                                        type="text"
                                        {...register(`${fieldGroup.key}.${field.name}`)}
                                        name={`${fieldGroup.key}.${field.name}`}
                                    />
                                </label>
                            )
                        })}
                    </fieldset>
                )
            })}
            {classIndexes.map(index => {
                const fieldSetName = `${classes.key}[${index}]`;
                return (
                    <fieldset name={fieldSetName} key={fieldSetName} style={{display: "grid"}}>
                        {classes.fields.map(field => {
                            return(
                                <label>
                                    {field.title} {index}:
                                    <input
                                        type="text"
                                        {...register(`${fieldSetName}.${field.name}`)}
                                        name={`${fieldSetName}.${field.name}`}
                                    />
                                </label>
                            )
                        })}
                        <button type="button" onClick={removeClass(index)} style={{width: "max-content"}}>
                            Fjern
                        </button>
                    </fieldset>
                );
            })}

            <button type="button" onClick={addClass}>
                Legg til klassering
            </button>
            <button type="button" onClick={clearClasses}>
                Fjern klasser
            </button>
            <input type="submit" />
        </form>
    );
}
export default FormPanel;
