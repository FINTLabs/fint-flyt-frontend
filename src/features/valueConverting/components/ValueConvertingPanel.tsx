import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Box, Button} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import ValueConvertingRepository from "../../../shared/repositories/ValueConvertingRepository";
import {getDestinationDisplayName, getSourceApplicationDisplayName} from "../../configuration/defaults/DefaultValues";
import {IValueConverting} from "../types/ValueConverting";
import {GridValueGetterParams} from "@mui/x-data-grid/models/params/gridCellParams";

type Props = {
    onValueConvertingSelected: (id: number) => void;
}

const ValueConvertingPanel: React.FunctionComponent<any> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [rows, setRows] = useState<IValueConverting[] | undefined>(undefined)

    useEffect(() => {
        ValueConvertingRepository.getValueConvertings(0, 100, 'fromApplicationId', 'ASC', true)
            .then(response => {
                let data = response.data
                if(data.content) {
                    setRows(data.content)
                }
                else {
                    setRows([])
                }
            })
            .catch(e => {
                console.log(e)
                setRows([])
            })
    }, [])


    const columns: GridColDef<IValueConverting, string>[] = [
        {field: 'id', headerName: 'ID', width: 90, editable: false},
        {
            field: 'displayName',
            headerName: 'Navn',
            width: 150,
            editable: false,
        },
        {
            field: 'fromApplicationId',
            headerName: 'Fra applikasjon',
            width: 150,
            editable: false,
            valueGetter: (params: GridValueGetterParams<string, IValueConverting>) => getSourceApplicationDisplayName(params.row.fromApplicationId)
        },
        {
            field: 'fromTypeId',
            headerName: 'Fra type',
            width: 150,
            editable: false,
        },
        {
            field: 'toApplicationId',
            headerName: 'Til applikasjon',
            width: 110,
            editable: false,
            valueGetter: (params: GridValueGetterParams<string, IValueConverting>) => getDestinationDisplayName(params.row.toApplicationId)
        },
        {
            field: 'toTypeId',
            headerName: 'Til type',
            width: 110,
            editable: false,
        },
        {
            field: 'details',
            headerName: 'Vis',
            minWidth: 150,
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params: GridCellParams<any, IValueConverting>) => (
                <EditButtonToggle row={params.row}/>)
        }
    ]

    function EditButtonToggle(rowProps: GridCellParams["row"]) {
        return <Button
            size="small"
            variant="contained"
            onClick={() => {
                props.onValueConvertingSelected(rowProps.row.id)
            }}
        >Vis
        </Button>
    }

    return (
        <>
            <Box sx={{height: 800, width: '100%', backgroundColor: 'white'}}>
                <DataGrid
                    loading={rows === undefined}
                    rows={rows ? rows : []}
                    columns={columns}
                />
            </Box>
        </>
    );
}

export default withRouter(ValueConvertingPanel);