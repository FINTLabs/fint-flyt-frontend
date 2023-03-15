import {SxProps, Theme} from "@mui/material";

export const toggleButtonSX: SxProps<Theme> = {
    height: '40px',
    width: '350px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid',
    marginBottom: '16px',
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