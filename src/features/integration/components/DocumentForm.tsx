import {FormControl, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React from 'react';
import {dropdownPlaceholder} from "../util/DefaultValues";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    return (
        <FormGroup className={props.style.formControl}>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentData.title", e.target.value as string)}
                           size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Status</InputLabel>
                <Select value={props.watch("documentData.documentStatus")}
                        label={"Status"}
                        onChange={(e: SelectChangeEvent) => props.setValue("documentData.documentStatus", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Tilgangskode</InputLabel>
                <Select value={props.watch("documentData.accessCode")}
                        label={"Tilgangskode"}
                        onChange={(e: SelectChangeEvent) => props.setValue("documentData.accessCode", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Hjemmel</InputLabel>
                <Select value={props.watch("documentData.paragraph")}
                        label={"Hjemmel"}
                        onChange={(e: SelectChangeEvent) => props.setValue("documentData.paragraph", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Variant</InputLabel>
                <Select value={props.watch("documentData.variant")}
                        label={"Variant"}
                        onChange={(e: SelectChangeEvent) => props.setValue("documentData.variant", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Format</InputLabel>
                <Select value={props.watch("documentData.format")}
                        label={"Format"}
                        onChange={(e: SelectChangeEvent) => props.setValue("documentData.format", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

        </FormGroup>
    );
}

export default DocumentForm;