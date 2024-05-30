import {GridCellParams} from "@mui/x-data-grid";
import * as React from "react";
import {ReactElement, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Dropdown, HStack, Link, Loader, Pagination, SortState, Table} from "@navikt/ds-react";
import moment from "moment";
import {eventComparator, getSourceApplicationDisplayNameById} from "../../../util/TableUtil";
import {IEvent} from "../types/Event";
import ErrorDialogComponent from "./ErrorDialogComponent";
import InstancePanel from "./InstancePanel";
import {GetIcon} from "../util/InstanceUtils";
import {Button} from "@navikt/ds-react/esm/button";
import InstanceRepository from "../repository/InstanceRepository";
import EventRepository from "../../../api/EventRepository";
import {IIntegrationMetadata} from "../../configuration/types/Metadata/IntegrationMetadata";
import {SourceApplicationContext} from "../../../context/SourceApplicationContext";
import {CustomSelect} from "../../../components/organisms/CustomSelect";
import {IAlertMessage, Page} from "../../../components/types/TableTypes";
import {MenuElipsisVerticalCircleIcon} from "@navikt/aksel-icons";
import CustomStatusDialogComponent from "./CustomStatusDialogComponent";

interface Props {
    onError: (error: IAlertMessage | undefined) => void;
}

const InstanceTable: React.FunctionComponent<Props> = ({onError}) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'})
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [openCustomDialog, setOpenCustomDialog] = React.useState(false);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SortState | undefined>({orderBy: 'timestamp', direction: "descending"});
    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error']
    const [instancesPage, setInstancesPage] = useState<Page<IEvent>>()
    const [rowCount, setRowCount] = useState<string>("10")
    const selectOptions = [{value: "", label: t('numberPerPage'), disabled: true}, {
        value: "10",
        label: "10"
    }, {value: "25", label: "25"}, {value: "50", label: "50"}, {value: "100", label: "100"}]
    const [disabledRetryButtons, setDisabledRetryButtons] = useState(new Array(Number(rowCount)).fill(false));
    const {allMetadata} = useContext(SourceApplicationContext)

    useEffect(() => {
        if (instancesPage?.totalElements && (instancesPage.totalElements < Number(rowCount))) {
            setPage(1)
        }
        setInstancesPage({content: []})
        getLatestInstances(rowCount, sort);
    }, [page, setPage, sort, rowCount])

    const handleRetryButtonClick = (index: number) => {
        const newDisabledButtons = [...disabledRetryButtons];
        newDisabledButtons[index] = true;
        setDisabledRetryButtons(newDisabledButtons);
    };

    const getLatestInstances = async (rowCount: string, sort?: SortState) => {
        onError(undefined)
        try {
            const eventResponse = await EventRepository.getLatestEvents(page - 1, Number(rowCount), sort ? sort.orderBy : "timestamp", sort ? (sort.direction === "ascending" ? "ASC" : "DESC") : "DESC")
            const events: Page<IEvent> = eventResponse.data;
            if (allMetadata && events) {
                allMetadata.forEach((value: IIntegrationMetadata) => {
                    eventResponse.data.content.forEach((event: IEvent) => {
                        if (event.instanceFlowHeaders.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                            event.displayName = value.integrationDisplayName;
                        }
                    });
                });
                events.content.slice()
                    .sort((a, b) => {
                        if (sort) {
                            return sort.direction === "ascending"
                                ? eventComparator(b, a, sort.orderBy)
                                : eventComparator(a, b, sort.orderBy);
                        }
                        return 1;
                    });
                setInstancesPage(events);
            } else {
                onError({message: t('errorMessage')});
                setInstancesPage({content: []});
            }
        } catch (e) {
            onError({message: t('errorMessage')});
            setInstancesPage({content: []});
            console.error('Error: ', e);
        }
    }

    const handleSort = (sortKey: string) => {
        setSort(prevSort => {
            return prevSort && sortKey === prevSort.orderBy && prevSort.direction === "descending"
                ? undefined
                : {
                    orderBy: sortKey,
                    direction:
                        prevSort && sortKey === prevSort.orderBy && prevSort.direction === "ascending"
                            ? "descending"
                            : "ascending",
                };
        });
    };

    const resend = (instanceId: string) => {
        InstanceRepository.resendInstance(instanceId)
            .then(response => {
                console.log('resend instance', response)
            })
            .catch(e => {
                console.error(e)
            })
    }

    return instancesPage ? (
        <Box>
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                <ErrorAlertDialog row={selectedRow}/>
                <CustomStatusDialog row={selectedRow}/>
                <Table sort={sort} onSortChange={(sortKey) => handleSort(sortKey ? sortKey : "timestamp")}
                       id={"instance-table"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader/>
                            <Table.ColumnHeader>{t('table.column.sourceApplicationId')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.sourceApplicationIntegrationIdDisplayName')}</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="timestamp"
                                                sortable>{t('table.column.timestamp')}</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="type"
                                                sortable>{t('table.column.status')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.actions')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.archiveInstanceId')}</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {instancesPage?.content?.map((value, i) => {
                            return (
                                <Table.ExpandableRow expandOnRowClick key={i} content={<InstancePanel
                                    id={'instance-panel-' + i}
                                    onError={(error) => {
                                        onError(error)
                                    }}
                                    instanceId={value.instanceFlowHeaders.sourceApplicationInstanceId}
                                    sourceApplicationId={value.instanceFlowHeaders.sourceApplicationId}
                                />}>
                                    <Table.DataCell
                                        scope="row">{getSourceApplicationDisplayNameById(String(value.instanceFlowHeaders.sourceApplicationId))}</Table.DataCell>
                                    <Table.DataCell>{value.displayName}</Table.DataCell>
                                    <Table.DataCell>{moment(value.timestamp).format('DD/MM/YY HH:mm')}</Table.DataCell>
                                    <Table.DataCell>
                                        {GetIcon(value)}
                                        {t(value.name)} {" "}
                                        {(value.type === 'ERROR' && value.errors.length > 0) &&
                                            <Link style={{cursor: "pointer"}}
                                                  onClick={() => {
                                                      setSelectedRow(value);
                                                      setOpenErrorDialog(true)
                                                  }}>
                                                {t('showError')}</Link>
                                        }
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {(value.type === 'ERROR') &&
                                            actionMenu(value, i)
                                        }
                                    </Table.DataCell>
                                    <Table.DataCell>{value.instanceFlowHeaders.archiveInstanceId}</Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box>
            <HStack justify={"center"} style={{marginTop: '16px'}}>
                {instancesPage?.totalElements &&
                    <CustomSelect
                        options={selectOptions}
                        onChange={setRowCount}
                        label={t('numberPerPage')}
                        hideLabel={true}
                        default={rowCount}
                    />}
                {instancesPage?.totalElements && instancesPage?.totalElements > Number(rowCount) &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        count={instancesPage?.totalPages ?? 1}
                        size="small"
                    />}
            </HStack>

        </Box>
    ) : <Loader/>;

    function actionMenu(event: IEvent, id: number): ReactElement {
        return (
            <div id={id + "-action-toggle"} className="min-h-32">
                <Dropdown>
                    <Button as={Dropdown.Toggle} variant="tertiary-neutral"
                            icon={<MenuElipsisVerticalCircleIcon aria-hidden/>}/>
                    <Dropdown.Menu>
                        <Dropdown.Menu.List>
                            <Dropdown.Menu.List.Item
                                id={'retryButton'}
                                disabled={errorsNotForRetry.includes(event.name) || disabledRetryButtons[id]}
                                onClick={() => {
                                    resend(event.instanceFlowHeaders.instanceId);
                                    handleRetryButtonClick(id)
                                }}>
                                {t('retry')}
                            </Dropdown.Menu.List.Item>
                        </Dropdown.Menu.List>
                        <Dropdown.Menu.Divider/>
                        <Dropdown.Menu.List>
                            <Dropdown.Menu.List.Item id={'statusButton'} onClick={() => {
                                setSelectedRow(event);
                                setOpenCustomDialog(true)
                            }}>
                                {t('customStatus')}
                            </Dropdown.Menu.List.Item>
                        </Dropdown.Menu.List>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );

    }

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <ErrorDialogComponent open={openErrorDialog} row={props.row} setOpenErrorDialog={setOpenErrorDialog}/>
        )
    }

    function CustomStatusDialog(props: GridCellParams['row']) {
        return (
            <>
                {props.row &&
                    <CustomStatusDialogComponent open={openCustomDialog} row={props.row}
                                                 setOpenCustomDialog={setOpenCustomDialog}/>
                }
            </>
        )
    }
}

export default InstanceTable;