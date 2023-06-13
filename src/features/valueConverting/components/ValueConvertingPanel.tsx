import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useHistory, withRouter} from 'react-router-dom';
import {Box, Button, Menu, MenuItem} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import ValueConvertingRepository from "../../../shared/repositories/ValueConvertingRepository";
import {getDestinationDisplayName, getSourceApplicationDisplayName} from "../../configuration/defaults/DefaultValues";
import {IValueConverting} from "../types/ValueConverting";
import {GridValueGetterParams} from "@mui/x-data-grid/models/params/gridCellParams";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type Props = {
    onValueConvertingSelected: (id: number, view: boolean) => void;
}

const ValueConvertingPanel: React.FunctionComponent<any> = (props: Props) => {
    let history = useHistory();
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [rows, setRows] = useState<IValueConverting[] | undefined>(undefined)
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const [anchorSubEl, setAnchorSubEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorElement);
    const openSub = Boolean(anchorSubEl);
    const handleNewConfigClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };
    const handleNewConfigClose = () => {
        setAnchorElement(null);
    };
    const handleNewConfigSubClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorSubEl(event.currentTarget);
    };
    const handleNewConfigSubClose = () => {
        setAnchorSubEl(null);
    };

    useEffect(() => {
        ValueConvertingRepository.getValueConvertings(0, 100, 'fromApplicationId', 'ASC', true)
            .then(response => {
                let data = response.data
                if (data.content) {
                    setRows(data.content)
                } else {
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
                props.onValueConvertingSelected(rowProps.row.id, true)
            }}
        >Vis
        </Button>
    }

    async function handleNewOrEditConvertingClick(id: any) {
        props.onValueConvertingSelected(id, false)
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
            <Button
                sx={{mt: 5}}
                id="root-button"
                variant="contained"
                aria-controls={open ? 'positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleNewConfigClick}
                endIcon={<ArrowRightIcon/>}
            >
                {t('button.newConverting')}
            </Button>
            <Menu
                id="positioned-menu"
                aria-labelledby="positioned-button"
                anchorEl={anchorElement}
                open={open}
                onClose={handleNewConfigClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem component={RouterLink} to='/valueconverting/new'
                          onClick={handleNewConfigClose}>
                    <Button id="blank-button">
                        {t('button.blankConverting')}
                    </Button>
                </MenuItem>

                <MenuItem>
                    <Button
                        disabled={!rows}
                        id="based-on-button"
                        aria-controls={openSub ? 'positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSub ? 'true' : undefined}
                        onClick={handleNewConfigSubClick}
                        endIcon={<ArrowRightIcon/>}
                    >
                        {t('button.templateConverting')}
                    </Button>
                    <Menu
                        sx={{padding: 'none'}}
                        id="positioned-menu"
                        aria-labelledby="positioned-button"
                        anchorEl={anchorSubEl}
                        open={openSub}
                        onClose={handleNewConfigSubClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {rows && rows.map((row: any, index: number) => {
                                return <MenuItem onClick={handleNewConfigSubClose} sx={{padding: 'none'}}
                                                 disableGutters={true} divider={true} dense={true} key={index}>
                                    <Button id={"version-button-" + index} sx={{width: '140px', height: 'webkit-fill-available'}}
                                            onClick={() => {
                                                handleNewOrEditConvertingClick(row.id).then(() => history.push('/valueconverting'))
                                            }}>
                                        {t('button.id')} {row.id}
                                    </Button>
                                </MenuItem>
                            }
                        )}
                    </Menu>
                </MenuItem>
            </Menu>
        </>
    );
}

export default withRouter(ValueConvertingPanel);