import {Button, Toolbar} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import MenuItems from "../../features/main/MenuItems";
import {Box} from "@navikt/ds-react";
import React from "react";

export const AppBar = () => {
    return <Box style={{backgroundColor: "#1F4F59"}}>
        <Toolbar id={"toolbar"}>
            <Button component={RouterLink} to="/">
                <img src="https://cdn.flais.io/media/fint-by-vigo-white.svg" alt="logo"
                     style={{width: 80, marginRight: '32px'}}/>
            </Button>
            <nav>
                <MenuItems/>
            </nav>
        </Toolbar>
    </Box>
}

