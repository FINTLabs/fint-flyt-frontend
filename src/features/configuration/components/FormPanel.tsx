import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Typography} from "@mui/material";

export interface IFormPanel {
    header: string,
    expandable: boolean,
    fields: FieldContent[];
    groups: FieldGroup[];
    panels: IFormPanel[];
}

export interface ISelectable {
    key: string;
    value: string
}

export interface FieldContent {
    label: string;
    name: string;
    type: string;
    selectables?: ISelectable[];
}

export interface FieldGroup {
    key: string,
    expandable: boolean,
    groups?: FieldGroup[];
    fields: FieldContent[]
}

const FormPanel: React.FunctionComponent<any> = (props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const test: IFormPanel = {
        header: 'Sak',
        expandable: false,
        fields: [
            {label: 'Tittel', name: 'tittel', type: 'text'},
            {label: 'Offentlig tittel', name: 'offentligTittel', type: 'text'}
        ],
        groups: [
            {
                key: 'skjerming',
                expandable: false,
                fields: [
                    {label: 'Tilgangsrestriksjon', name: 'tilgangsrestriksjon', type: 'text'},
                    {label: 'Skjermingshjemmel', name: 'skjermingshjemmel', type: 'text'}
                ]
            },
        ],
        panels: [
            {
                header: 'klassering',
                expandable: false,
                fields: [
                    {label: 'Klassifikasjonssystem', name: 'klassifikasjonssystem', type: 'text'},
                    {label: 'KlasseId', name: 'klasseId', type: 'text'},
                    {label: 'Tittel', name: 'tittel', type: 'text'},
                    {label: 'Rekkefølge', name: 'rekkefølge', type: 'text'}
                ],
                groups: [],
                panels: []
            },
            {
                header: 'journalpost',
                expandable: true,
                fields: [
                    {label: 'Tittel', name: 'tittel', type: 'text'},
                    {label: 'Offentlig tittel', name: 'offentligTittel', type: 'text'},
                ],
                groups: [],
                panels: [
                    {
                        header: 'dokumentbeskrivelse',
                        expandable: true,
                        fields: [
                            {label: 'Tittel', name: 'tittel', type: 'text'},
                            {label: 'dokuemntstatus', name: 'Dokumentstatus', type: 'text'},
                        ],
                        groups: [],
                        panels: []
                    }
                ]
            }
        ]
    }

    const fieldGroupsRecord: FieldGroup[] = [
        {
            key: 'journalpost',
            expandable: true,
            fields: [
                {label: 'Tittel', name: 'tittel', type: 'text'},
                {label: 'Offentlig tittel', name: 'offentligTittel', type: 'text'}
            ],
            groups: [
                {
                    key: 'korrespondansepart',
                    expandable: true,
                    fields: [
                        {label: 'korrespondansepartNavn', name: 'korrespondansepartnavn', type: 'text'},
                        {label: 'kontaktperson', name: 'Kontaktperson', type: 'text'},
                        {label: 'fødselsnummer', name: 'Fødselsnummer', type: 'text'}
                    ]
                }
            ]
        }
    ]

    const fieldGroupsCase: FieldGroup[] = [
        {
            key: 'sak',
            expandable: false,
            fields: [
                {label: 'Sakslogikk', name: 'sakslogikk', type: 'select', selectables: [
                        {key: 'Ny sak', value: 'NEW'},
                        {key: 'Eksisterende sak basert på søk eller ny sak', value: 'BY_SEARCH_OR_NEW'},
                        {key: 'Eksisterende sak basert på saksnummer', value: 'BY_ID'}
                    ]},
                {label: 'Tittel', name: 'tittel', type: 'text'},
                {label: 'Offentlig tittel', name: 'offentligTittel', type: 'text'},
                {label: 'Saksmappetype', name: 'saksmappetype', type: 'select', selectables: [
                        {key: 'N/A - Møte- og utvalg', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/saksmappetype/systemid/MM'},
                        {key: 'Kompetanse', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/saksmappetype/systemid/KO'},
                        {key: 'Personal', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/saksmappetype/systemid/P'},
                    ]},
                {label: 'Ansvarlig saksbehandler', name: 'ansvarligsaksbehandler', type: 'select', selectables: [
                        {key: 'Mona Monsen', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/ansvarligsaksbehandler/systemid/MM'},
                        {key: 'Kjell Olsen', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/ansvarligsaksbehandler/systemid/KO'},
                        {key: 'Ingen', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/ansvarligsaksbehandler/systemid/I'},
                    ]},
                {label: 'Arkivdel', name: 'arkivdel', type: 'select', selectables: [
                        {key: 'Test arkivdel', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/arkivdel/systemid/MM'}
                    ]},
                {label: 'Journalenhet', name: 'journalenhet', type: 'select', selectables: [
                        {key: 'Enhet 1', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/arkivdel/systemid/MM'},
                        {key: 'Kompetanse', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/arkivdel/systemid/KO'},
                        {key: 'Personal', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/arkivdel/systemid/P'},
                    ]},
                {label: 'Saksstatus', name: 'saksstatus', type: 'select', selectables: [
                        {key: 'Avsluttet', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/saksstatus/systemid/MM'},
                        {key: 'Ferdigstilt', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/saksstatus/systemid/KO'},
                        {key: 'Under behandlng', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/saksstatus/systemid/P'},
                    ]}
            ],
            groups: []
        },
        {
            key: 'skjerming',
            expandable: false,
            fields: [
                {label: 'Tilgangsrestriksjon', name: 'tilgangsrestriksjon', type: 'text'},
                {label: 'Skjermingshjemmel', name: 'skjermingshjemmel', type: 'text'}
            ]
        }
    ]

    const classGroup: FieldGroup = {
        key: "klasse",
        expandable: false,
        fields: [
            {label: 'Klassifikasjonssystem', name: 'klassifikasjonssystem', type: 'select', selectables: [
                    {key: 'Emnekode', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/klassifikasjonssystem/systemid/E'},
                    {key: 'Tilleggskode', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/klassifikasjonssystem/systemid/T'},
                ]},
            /*            {label: 'KlasseId', name: 'klasseId', type: 'select', selectables: [
                                {key: 'Emnekode 1', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/klassifikasjonssystem/systemid/E'},
                                {key: 'Emnekode 2', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/klassifikasjonssystem/systemid/T'},
                            ]},*/
            {label: 'KlasseId', name: 'klasseId', type: 'text'},
            {label: 'Tittel', name: 'tittel', type: 'text'},
            {label: 'Rekkefølge', name: 'rekkefølge', type: 'text'}
        ]
    }

    const partGroup: FieldGroup = {
        key: "part",
        expandable: false,
        fields: [
            {label: 'Partrolle', name: 'partRolle', type: 'select', selectables: [
                    {key: 'Korrespondanse', value: 'https://beta.felleskomponent.no/arkiv/kodeverk/partRolle/systemid/K'},
                ]},
            {label: 'Partnavn', name: 'partnavn', type: 'text'},
            {label: 'Kontaktperson', name: 'kontaktperson', type: 'text'}
        ]
    }


    /*
    * Panel
    *   header
    *   generer felter - valueTemplates og selectableValueTemplates
    *   generer link/felt som åpner nytt panel - objectTemplates og objectCollectionTemplates
    * subpanel med inputfelt(er) - objectTemplates
    *   header - fra elementkonfig
    *   generer felter - valueTemplates og selectableValueTemplates
    *   generer subheader og felter fra objectTemplates
    *   generer subpaneler med objectTemplates og objectCollectionTemplates
    *   generer link/felt som åpner subpanel - objectTemplates og objectCollectionTemplates
    * subpanel av inputfelt gruppe(r) -
    *   header - elementConfig displayname
    *   generer gruppe av felter - objectCollectionTemplates
    *
    *   knapper for å legge til nye grupper
    *   generer link/felt som åpner subpanel  objectCollectionTemplates
    *
    * */


    function Panel(props: {fieldGroups: FieldGroup[] }) {
        return (
            <div>
                {props.fieldGroups.map((fieldGroup: FieldGroup) => {
                    return(
                        <FieldSetMaker fieldGroup={fieldGroup}/>
                    )
                })}
            </div>
        )
    }

    function GroupPanel(props: {fieldGroup: FieldGroup}) {
        const [groupIndexes, setGroupIndexes] = React.useState([]);
        const [counter, setCounter] = React.useState(0);

        const addGroup = () => {
            // @ts-ignore
            setGroupIndexes(prevIndexes => [...prevIndexes, counter]);
            setCounter(prevCounter => prevCounter + 1);
        };

        const removeGroup = (index: any) => () => {
            setGroupIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
            setCounter(prevCounter => prevCounter - 1);
        };

        const clearGroups = () => {
            setGroupIndexes([]);
            setCounter(0)
        };

        return (
            <div style={{border: 'solid 1px', padding: '10px', marginTop: '10px'}}>
                <Typography>{props.fieldGroup.key}</Typography>
                {groupIndexes.map(index => {
                    return (
                        <FieldGroupMaker key={index} fieldGroup={props.fieldGroup} index={index} removeGroup={removeGroup}/>
                    )
                })}
                <button type="button" onClick={addGroup}>
                    Legg til {props.fieldGroup.key}
                </button>
                <button type="button" onClick={clearGroups}>
                    Fjern alle
                </button>
            </div>
        )
    }

    function FieldSetMaker(props: {fieldGroup: FieldGroup}) {
        const fieldGroup = props.fieldGroup
        return (
            <>
                <Typography>{fieldGroup.key}</Typography>
                <fieldset name={fieldGroup.key} key={fieldGroup.key} style={{display: "grid"}}>
                    {fieldGroup.fields.map(field => {
                        return (
                            <label>
                                {field.label}:
                                {field.type === 'text' ?
                                    <input
                                        type={field.type}
                                        {...register(`${fieldGroup.key}.${field.name}`)}
                                        name={`${fieldGroup.key}.${field.name}`}
                                    /> :
                                    <select
                                        {...register(`${fieldGroup.key}.${field.name}`)}
                                        name={`${fieldGroup.key}.${field.name}`}>
                                        {field.selectables && field.selectables.map(selectable => {
                                            return(
                                                <option key={selectable.key} value={selectable.value}>{selectable.key}</option>
                                            )
                                        })}
                                    </select>
                                }
                            </label>
                        )
                    })}
                </fieldset>
            </>
        )
    }

    function FieldGroupMaker(props: {fieldGroup: FieldGroup, index: number, removeGroup: Function}) {
        const fieldSetName = `${props.fieldGroup.key}[${props.index}]`;
        return (
            <>
                <Typography>{fieldSetName}</Typography>
                <fieldset name={fieldSetName} key={fieldSetName} style={{display: "grid"}}>
                    {props.fieldGroup.fields.map(field => {
                        return(
                            <label key={`${field.label} ${props.index}`}>
                                {field.label} {props.index}:
                                {field.type === 'text' ?
                                    <input
                                        type={field.type}
                                        {...register(`${fieldSetName}.${field.name}`)}
                                        name={`${fieldSetName}.${field.name}`}
                                    />
                                    :
                                    <select
                                        {...register(`${fieldSetName}.${field.name}`)}
                                        name={`${fieldSetName}.${field.name}`}>
                                        {field.selectables && field.selectables.map(selectable => {
                                            return(
                                                <option key={selectable.key} value={selectable.value}>{selectable.key}</option>
                                            )
                                        })}
                                    </select>
                                }
                            </label>
                        )
                    })}
                    <button type="button" onClick={props.removeGroup(props.index)} style={{width: "max-content"}}>
                        Fjern
                    </button>
                </fieldset>
            </>
        );
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{padding: '10px', border: 'solid 1px', marginBottom: '10px'}}>
                <Panel fieldGroups={fieldGroupsCase}/>
                <GroupPanel fieldGroup={partGroup}/>
                <GroupPanel fieldGroup={classGroup}/>
                <button type="button">Journalpost</button>
            </div>
            <div>
                <Panel fieldGroups={fieldGroupsRecord}/>
            </div>
            <input type="submit" />
        </form>
    );
}

export default FormPanel;
