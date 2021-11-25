import {FormControl, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React from 'react';
import {dropdownPlaceholder} from "../util/DefaultValues";

const ApplicantForm: React.FunctionComponent<any> = (props) => {
    return (
        <FormGroup className={props.style.formControl}>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.name.value", e.target.value as string)}
                           size="small" variant="outlined" label="Navn" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.address.value", e.target.value as string)}
                           size="small" variant="outlined" label="Adresse" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.postalCode.value", e.target.value as string)}
                           size="small" variant="outlined" label="Postnummer" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.city.value", e.target.value as string)}
                           size="small" variant="outlined" label="By" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.contact.value", e.target.value as string)}
                           size="small" variant="outlined" label="Kontaktperson" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.phoneNumber.value", e.target.value as string)}
                           size="small" variant="outlined" label="Telefonnummer" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.email.value", e.target.value as string)}
                           size="small" variant="outlined" label="Epost" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Skjerming</InputLabel>
                <Select
                    value={props.watch("applicantData.hidden")}
                    label={"Skjerming"}
                    onChange={(e: SelectChangeEvent) => props.setValue("applicantData.hidden", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FormGroup>
    );
}

export default ApplicantForm;