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

const titleMarginStyle = {
  marginBottom: '10px', 
};

const FlytTitleComponent = ({ children, variant, title}: FlyTitleComponentProps) => {
  return (
    <Typography variant={variant} style={titleMarginStyle}>
    {children}
    {title}
    </Typography>
  )
}

export default FlytTitleComponent;