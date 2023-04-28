import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const fontFamily: string = ["Nunito Sans", 'sans-serif'].join(',')

export const valueConvertingStyles = makeStyles((theme: Theme) =>
    createStyles({
        configurationBox: {
            width: theme.spacing(44)
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
        title: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            padding: 0,
            fontSize: theme.spacing(2),
            marginTop: theme.spacing(0)
        },
        title2: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2.6),
            padding: 0,
            marginTop: theme.spacing(0),
            fontWeight: 'normal'
        },
        title4: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2),
            padding: 0,
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(2),
            fontWeight: 'normal'
        },
        listBorderless: {
            listStyle: 'none',
            padding: 'unset',
            margin: 'unset',
            border: 'none'
        },
        listItem: {
            paddingBottom: theme.spacing(2)
        },
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
            "&:disabled": {
                cursor: 'auto',
                backgroundColor: 'lightgray',
                color: 'gray'
            },
            "&:last-child": {
                marginLeft: theme.spacing(2)
            }
        },
        wrapperVerticalMargin: {
            marginBottom: theme.spacing(2)
        },
        valueConvertingWrapper: {
            display: 'grid',
            border: 'none',
            margin: '0',
            padding: '0'
        }
    })
);