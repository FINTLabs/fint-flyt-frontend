import {SxProps, Theme} from "@mui/material";

export const toggleButtonSX: SxProps<Theme> = {
    height: (theme: Theme) => theme.spacing(5),
    width: (theme: Theme) => theme.spacing(44),
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid',
    marginBottom: (theme: Theme) => theme.spacing(2),
    justifyContent: 'space-between',
    "&:hover": {
        backgroundColor: 'white',
        color: 'black',
    },
    "&.Mui-selected": {
        color: 'white',
        backgroundColor: (theme: Theme) => theme.palette.primary.main,
    },
    "&.Mui-selected:hover": {
        color: 'white',
        backgroundColor: (theme: Theme) => theme.palette.primary.main,
    }
}

export const metadataPanelSX: SxProps<Theme> = {
    position: 'sticky',
    maxHeight: (theme: Theme) => theme.spacing(122),
    minWidth: (theme: Theme) => theme.spacing(40),
    overflow: 'auto'
}

export const iconButtonSX: SxProps<Theme> = {
    cursor: 'pointer',
    m: 2
}

export const flexCenterSX: SxProps<Theme> = {
    display: "flex",
    alignItems: 'center',
    mb: 1
}

export const autoCompleteSX: SxProps<Theme> = {
    backgroundColor: 'white',
    width: (theme: Theme) => theme.spacing(44)
}