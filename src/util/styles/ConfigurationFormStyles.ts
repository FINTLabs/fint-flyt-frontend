import {useCommonStyles} from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const ConfigurationFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...useCommonStyles(theme),
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
        listBorderless: {
            listStyle: 'none',
            padding: 'unset',
            margin: 'unset',
            border: 'none'
        },
        arrayObjectWrapper: {
            backgroundColor: 'white',
            border: 'solid 1px lightgrey',
            borderRadius: theme.spacing(0.5),
            padding: 'unset',
            // paddingTop: theme.spacing(2),
            // paddingBottom: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        arrayValueWrapper: {
            padding: 'unset',
            marginBottom: theme.spacing(2)
        },
        listItem: {},
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
        formFooter: {
            marginLeft: theme.spacing(1)
        },

        fieldsetElement: {
            marginBottom: theme.spacing(2),
            "&:last-child": {
                marginBottom: theme.spacing(0)
            }
        },
        wrapperPadding: {
            padding: theme.spacing(2),
        },
        wrapperVerticalMargin: {
            marginBottom: theme.spacing(2)
        },
        tagWrapper: {
            marginBottom: theme.spacing(.5),
            "&:last-child": {
                marginBottom: theme.spacing(0)
            }
        }
    })
);