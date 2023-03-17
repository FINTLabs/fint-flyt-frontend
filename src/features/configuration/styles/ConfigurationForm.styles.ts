import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const fontFamily: string = ["Nunito Sans", 'sans-serif'].join(',')

export const configurationFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(100)
        },
        row: {
            display: 'flex',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
        },
        panelContainer: {
            backgroundColor: 'white',
            padding: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            marginLeft: theme.spacing(1),
            borderRadius: theme.spacing(0.5),
            height: 'fit-content',
        },
        panel: {
            opacity: 0.99,
            padding: theme.spacing(2),
            height: 'fit-content',
            overflow: 'auto',
            maxHeight: theme.spacing(100),
            backgroundColor: '#EBF4F5',
            borderRadius: theme.spacing(0.5),
            border: 'solid 1px',
            '&:not(:first-child)': {
                marginTop: theme.spacing(2)
            }
        },
        valueMappingContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        label: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2)
        },
        select: {
            backgroundColor: 'white',
            width: theme.spacing(44),
            height: theme.spacing(4),
            borderRadius: theme.spacing(0.5),
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5)
        },
        input: {
            width: theme.spacing(44),
            borderRadius: theme.spacing(0.5),
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
            height: theme.spacing(3)
        },
        title: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(2)
        },
        column: {
            maxHeight: 'calc(100vh/1.5)',
            minWidth: theme.spacing(56),
            overflow: 'auto',
            display: 'grid',
            backgroundColor: 'white',
            height: 'fit-content',
            marginRight: theme.spacing(2),
            "&:last-child": {
                marginRight: 0
            }
        },
        columnItem: {
            backgroundColor: '#EBF4F5',
            marginTop: theme.spacing(2),
            border: '1px solid black',
            borderRadius: theme.spacing(0.5)
        },
        fieldSet: {
            display: 'grid',
            border: 'none',
        },
        list: {
            backgroundColor: 'white',
            listStyle: 'none',
            padding: 'unset',
            border: 'solid 1px black',
            borderRadius: theme.spacing(0.5),
            margin: theme.spacing(2)
        },
        listItem: {
            "&:first-child": {
                marginTop: '16px'
            }
        },
        collectionButton: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.spacing(0.5),
            color: 'white',
            cursor: 'pointer',
            padding: theme.spacing(1),
            fontSize: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(2),
            width: 'fit-content'
        },
        button: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.spacing(0.5),
            color: 'white',
            cursor: 'pointer',
            padding: theme.spacing(1),
            fontSize: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(2),
            width: 'fit-content'
        },
        formFooter: {},
        submitButton: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.spacing(0.5),
            color: 'white',
            cursor: 'pointer',
            padding: theme.spacing(1),
            fontSize: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(2),
            width: 'fit-content',
            height: 'fit-content',
            "&:last-child": {
                marginLeft: theme.spacing(2)
            }
        }
    })
);