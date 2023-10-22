import React from 'react'
import {ClassNameMap} from "@mui/styles";
import { Typography } from '@mui/material';
import { TitleVariant } from '../../../../util/styles/theme/types';

interface FlyTitleComponentProps {
    classes: ClassNameMap;
    id?: string,
    title: string;
    children?: React.ReactElement,
    variant?: TitleVariant;
}

const FlytTitleComponent = ({ children, variant}: FlyTitleComponentProps) => {
  return (
    <Typography variant={variant}>
    {children}
    </Typography>
  )
}

export default FlytTitleComponent;