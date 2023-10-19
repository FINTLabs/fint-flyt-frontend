import React from 'react'
import {ClassNameMap} from "@mui/styles";
import { Typography } from '@mui/material';



interface FlyTitleComponentProps {
    classes: ClassNameMap;
    id?: string,
    title: string;
    children?: React.ReactElement,
    variant?: string;
}

const FlytTitleComponent = ({ children, variant}: FlyTitleComponentProps) => {
  return (
    <Typography>
    {children}
    </Typography>
   
  )
}

export default FlytTitleComponent