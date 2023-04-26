import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Box, Button} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import ValueConvertingRepository from "../../../shared/repositories/ValueConvertingRepository";
import {IValueConverting} from "../types/ValueConverting";

type Props = {
    setExistingValueConverting: any
}

const ValueConvertingPanel: React.FunctionComponent<any> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [rows, setRows] = useState([])

    useEffect(() => {
        ValueConvertingRepository.getValueConvertings(0, 100, 'fromApplicationId', 'ASC', true)
            .then(response => {
                setRows(response.data.content)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])


    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
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
            renderCell: (params) => (
                <EditButtonToggle setExistingValueConverting={props.setExistingValueConverting} row={params.row}/>)
        }
    ]

    function EditButtonToggle(props: GridCellParams["row"]) {
        return <Button
            size="small"
            variant="contained"
            onClick={() => {
                ValueConvertingRepository.getValueConverting(props.row.id)
                    .then(response => {
                        props.setExistingValueConverting(response.data.content)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }}
        >Vis
        </Button>
    }

    return (
        <>
            <Box sx={{height: 800, width: '100%', backgroundColor: 'white'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </Box>
        </>
    );
}

export default withRouter(ValueConvertingPanel);