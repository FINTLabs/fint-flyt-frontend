import * as React from "react";
import { useForm } from "react-hook-form";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {
    Button,
    FormControl, FormControlLabel, FormGroup,
    FormHelperText, FormLabel,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select, SelectChangeEvent, TextField,
    Typography
} from "@mui/material";

type FormValues = {
    casetypeToArchive: string;
    selectedForm: string;
    title: string;
    officialTitle: string;
    casetype: string;
};

const forms = [
    { label: "TT-skjema", value: "TT" },
    { label: "Moroskjema", value: "fun_form" },
    { label: "Fellesskjema", value: "joint_form" }
];
const casetypesToArchive = [
    {label: 'Som ny sak',value: 'NEW',  description: 'Innsendt skjema oppretter en ny sak i Elements'},
    {label: 'På eksisterende sak', value: 'EXISTING',  description: 'Innsendt skjema gjenfinner eksisterende sak i ' +
            'Elements basert på informasjon i skjemaet. Dersom det ikke fins en eksisterende sak opprettes en ny sak' },
    {label: 'På eksisterende sak', value: 'COLLECTION', description: 'Innsendt skjema skal leveres til en forhåndsdefinert samlesak'}

];
const casetypes = [{label: 'Sakstype Foo', value: 'SAK1'},{label: 'Sakstype Bar', value: 'SAK2'}]


const NewIntegration: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: { casetypeToArchive: 'NEW', selectedForm: '', title: '', officialTitle: '', casetype:'' }
    });
    const selectedForm = watch("selectedForm");
    const casetype = watch("casetype");

    const [activeStep, setActiveStep] = React.useState(0);
    const onSubmit = handleSubmit((data) => console.log(JSON.stringify(data, null)));

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    React.useEffect(() => {
        register("casetypeToArchive", {
            validate: (value) => !!value || "This is required."
        });
        register("selectedForm", {
            validate: (value) => !!value || "This is required."
        });
    }, [register]);

    return (
        <div>
            <Typography variant={"h6"}>React Hook Form - NestedValue</Typography>
            <form className="form" onSubmit={onSubmit}>
                {activeStep === 0 && <section>
                    <FormControl fullWidth size="small" sx={{ mt: 3 }}>
                        <InputLabel>Skjema</InputLabel>
                        <Select
                            value={selectedForm}
                            onChange={(e: SelectChangeEvent) => setValue("selectedForm", e.target.value as string)}
                            error={Boolean(errors?.selectedForm)}
                        >
                            {forms.map((item, index) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={Boolean(errors?.selectedForm)}>
                            {errors?.selectedForm?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl component="fieldset" sx={{ width: 750 }}>
                        <FormLabel>Velg hvordan skjema skal sendes til arkivet</FormLabel>
                        <RadioGroup onChange={(e) => setValue("casetypeToArchive", e.target.value as string)} defaultValue={casetypesToArchive[0].value} sx={{maxWidth: 400}}>
                            {casetypesToArchive.map((configuration, index) => (
                                <div key={index}>
                                    <FormControlLabel value={configuration.value} control={<Radio />} label={configuration.label} />
                                    <Typography sx={{ fontSize: 14 }}>{configuration.description}</Typography>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </section>}
                {activeStep=== 1 &&
                <section>
                    <FormGroup>
                        <FormControl>
                            <TextField size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
                            <TextField size="small" variant="outlined" label="Offentlig tittel" sx={{ mb: 3 }}/>
                            <InputLabel sx={{ mb: 3 }}>Sakstype</InputLabel>
                            <Select size="small" sx={{ mb: 3 }}
                                    value={casetype}
                                    onChange={(e: SelectChangeEvent) => setValue("casetype", e.target.value as string)}
                                    error={Boolean(errors?.casetype)}
                            >
                                {casetypes.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormGroup>
                </section>}
                <Button disabled={activeStep===0} onClick={handleBack} type="button" className="button">Tilbake</Button>
                <Button onClick={handleNext} type="button" className="button">Neste</Button>

                <input type="submit" className="button"/>
            </form>
        </div>
    );
}

export default withRouter(NewIntegration);