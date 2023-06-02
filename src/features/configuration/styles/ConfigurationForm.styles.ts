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
            maxWidth: 'calc(100vw/1.6)',
            overflow: 'auto'
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
            justifyContent: 'space-between',
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
            padding: 0,
            fontSize: theme.spacing(2),
            marginTop: theme.spacing(0)
        },
        title1: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(3),
            padding: 0,
            marginTop: theme.spacing(0),
            fontWeight: 'normal'
        },
        title2: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2.6),
            padding: 0,
            marginTop: theme.spacing(0),
            fontWeight: 'normal'
        },
        title3: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2.2),
            padding: 0,
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(2),
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
        categoryHeader: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2),
            padding: 0,
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(.5),
            fontWeight: 'normal'
        },
        titlePath: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2),
            padding: 0,
            marginTop: theme.spacing(0),
            fontWeight: 'normal'
        },
        path: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(1.5),
            marginTop: theme.spacing(-2),
            marginBottom: theme.spacing(2),
            color: theme.palette.primary.main
        },
        pathChunk: {
            margin: 0
        },
        column: {
            maxHeight: 'calc(100vh/1.5)',
            minWidth: theme.spacing(58),
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'grid',
            backgroundColor: 'white',
            height: 'fit-content',
            marginRight: theme.spacing(2),
            "&:last-child": {
                marginRight: theme.spacing(2)
            }
        },
        columnItem: {
            backgroundColor: '#EBF4F5',
            marginTop: theme.spacing(2),
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            marginRight: 'inherit'
        },
        fieldSet: {
            display: 'grid',
            border: 'none',
            margin: '0',
            padding: '0'
        },
        listBorderless: {
            listStyle: 'none',
            padding: 'unset',
            margin: 'unset',
            border: 'none'
        },
        arrayObjectWrapper: {
            backgroundColor: 'white',
            border: 'solid 1px black',
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