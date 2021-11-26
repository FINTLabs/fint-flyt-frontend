import {FormControl, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React from 'react';
import {dropdownPlaceholder} from "../util/DefaultValues";

const RecordForm: React.FunctionComponent<any> = (props) => {
    return (
        <FormGroup className={props.style.formControl}>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordData.title", e.target.value as string)}
                           size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordData.publicTitle", e.target.value as string)}
                           size="small" variant="outlined" label="Offentlig tittel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Kategori</InputLabel>
                <Select value={props.watch("recordData.category")}
                        label={"Kategori"}
                        onChange={(e: SelectChangeEvent) => props.setValue("recordData.category", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Administrativ enhet</InputLabel>
                <Select
                    value={props.watch("recordData.administrativeUnit")}
                    label={"Administrativ enhet"}
                    onChange={(e: SelectChangeEvent) => props.setValue("recordData.administrativeUnit", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={props.watch("recordData.status")}
                    label={"Status"}
                    onChange={(e: SelectChangeEvent) => props.setValue("recordData.status", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Tilgangskode</InputLabel>
                <Select
                    value={props.watch("recordData.accessCode")}
                    label={"Tilgangskode"}
                    onChange={(e: SelectChangeEvent) => props.setValue("recordData.accessCode", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>Hjemmel</InputLabel>
                <Select
                    value={props.watch("recordData.paragraph")}
                    label={"Hjemmel"}
                    onChange={(e: SelectChangeEvent) => props.setValue("recordData.paragraph", e.target.value as string)}
                >
                    {dropdownPlaceholder.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FormGroup>
    );
}

export default RecordForm;