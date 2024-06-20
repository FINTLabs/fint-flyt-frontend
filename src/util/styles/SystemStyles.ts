import {SxProps, Theme} from "@mui/material";

export const toggleButtonSX: SxProps<Theme> = {
    height: (theme: Theme) => theme.spacing(5),
    width: (theme: Theme) => theme.spacing(44),
    border: '2px solid',
    color: 'white',
    borderColor: '#398085',
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    justifyContent: 'space-between',
    "&:hover": {
        color: 'white',
        borderColor: '#398085',
        backgroundColor: (theme: Theme) => theme.palette.primary.main,
    },
    "&.Mui-selected": {
        color: 'white',
        backgroundColor: '#398085',
        borderColor: (theme: Theme) => theme.palette.primary.main,
    },
    "&.Mui-selected:hover": {
        color: 'white',
        backgroundColor: '#398085',
        borderColor: (theme: Theme) => theme.palette.primary.main,
    }
}

export const iconButtonSX: SxProps<Theme> = {
    cursor: 'pointer',
    margin: (theme: Theme) => theme.spacing(0)
}

export const autoCompleteSX = (warning?: boolean): SxProps<Theme> => ({
    backgroundColor: 'white',
    width: (theme: Theme) => theme.spacing(warning ? 40 : 44)
})

export const selectSX: SxProps<Theme> = {
    backgroundColor: 'white',
    width: (theme: Theme) => theme.spacing(44)
}

export const searchResultSX: SxProps<Theme> = {
    fontSize: (theme: Theme) => theme.spacing(1.75),
    padding: (theme: Theme) => theme.spacing(.2),
    marginLeft: (theme: Theme) => theme.spacing(1)
}

export const errorMsgSX: SxProps<Theme> = {
    color: 'orangered',
    fontSize: (theme: Theme) => theme.spacing(1.75),
    padding: (theme: Theme) => theme.spacing(.2),
    marginLeft: (theme: Theme) => theme.spacing(1),
    width: (theme: Theme) => theme.spacing(40)
}

export const tagSX: SxProps<Theme> = {
    width: 'fit-content',
    cursor: 'move',
    backgroundColor: 'white',
    borderRadius: (theme: Theme) => theme.spacing(0.5),
    marginLeft: (theme: Theme) => theme.spacing(0),
    margin: (theme: Theme) => theme.spacing(0)
}