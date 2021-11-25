import {
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import React from 'react';

const dropdownOptions = [
    {label: 'Foo', value: 'foo'},
    {label: 'Bar', value: 'bar'},
    {label: 'Bubu', value: 'bubu'}
]


const CaseForm: React.FunctionComponent<any> = (props) => {

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {props.caseCreationStrategy === 'EXISTING' &&
                <FormControl>
                    <TextField
                        onChange={(e) => props.setValue("id", e.target.value as string)}
                        size="small" variant="outlined" label="SaksId" sx={{ mb: 3 }}/>
                </FormControl>}
                <FormControl>
                    <TextField onChange={(e) => props.setValue("caseData.title.value", e.target.value as string)}
                               size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("caseData.publicTitle.value", e.target.value as string)}
                               size="small" variant="outlined" label="Offentlig tittel" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel>Sakstype</InputLabel>
                    <Select
                        value={props.watch("caseData.caseType")}
                        label={"Sakstype"}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.caseType", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel>Administrativ enhet</InputLabel>
                    <Select
                        value={props.watch("caseData.administrativeUnit")}
                        label={"Administrativ enhet"}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.administrativeUnit", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel id="archive-section-label">Arkivdel</InputLabel>
                    <Select
                        labelId="archive-section-label"
                        label={"Arkivdel"}
                        value={props.watch("caseData.archiveUnit")}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.archiveUnit", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel>Journalenhet</InputLabel>
                    <Select
                        label={"Journalenhet"}
                        value={props.watch("caseData.recordUnit")}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.recordUnit", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel>Tilgangskode</InputLabel>
                    <Select
                        label={"Tilgangskode"}
                        value={props.watch("caseData.accessCode")}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.accessCode", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel>Hjemmel</InputLabel>
                    <Select
                        label={"Hjemmel"}
                        value={props.watch("caseData.paragraph")}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.paragraph", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel>Saksansvarlig</InputLabel>
                    <Select
                        label={"Saksansvarlig"}
                        value={props.watch("caseData.caseWorker")}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.caseWorker", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("caseData.classification.value", e.target.value as string)}
                               size="small" variant="outlined" label="Klassering(Ordningsprinsipp)" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel>Primærklassering</InputLabel>
                    <Select
                        label={"Primærklassering"}
                        value={props.watch("caseData.primaryClass")}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.primaryClass", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ mb: 3 }}>
                    <InputLabel>Sekundærklassering</InputLabel>
                    <Select
                        label={"Sekundærklassering"}
                        value={props.watch("caseData.secondaryClass")}
                        onChange={(e: SelectChangeEvent) => props.setValue("caseData.secondaryClass", e.target.value as string)}
                    >
                        {dropdownOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("caseData.createdBy", e.target.value as string)}
                               size="small" variant="outlined" label="Opprettet av" sx={{ mb: 3 }}/>
                </FormControl>
            </FormGroup>
        </div>
    );
}

export default CaseForm;