import { useCommonStyles } from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const valueConvertingStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...useCommonStyles(theme),
        valueConvertingBox: {
            height: theme.spacing(75),
            width: '100%',
            backgroundColor: 'white',
            border: 'solid 1px',
            borderColor: 'lightgrey',
            borderRadius: theme.spacing(0.5),
        },
        configurationBox: {
            width: theme.spacing(44)
        },
        headerContainer: {
            display: 'flex',
            width: theme.spacing(44),
            flexDirection: 'row',
            justifyContent: 'space-between',
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

        wrapperVerticalMargin: {
            marginBottom: theme.spacing(2)
        },
        valueConvertingWrapper: {
            display: 'grid',
            border: 'none',
            margin: '0',
            padding: '0'
        },
    })
);