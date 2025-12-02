import {SxProps, Theme} from "@mui/material";

export const autoCompleteSX: SxProps<Theme> = {
    backgroundColor: 'white',
    width: (theme: Theme) => theme.spacing(44)
}

export const selectSX: SxProps<Theme> = {
    backgroundColor: 'white',
    width: (theme: Theme) => theme.spacing(44)
}

export const searchResultSX: SxProps<Theme> = {
    fontSize: (theme: Theme) => theme.spacing(1.75),
    padding: (theme: Theme) => theme.spacing(.2),
    marginLeft: (theme: Theme) => theme.spacing(1)
}
