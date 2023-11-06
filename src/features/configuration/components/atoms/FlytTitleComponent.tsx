import React from 'react'
import {ClassNameMap} from "@mui/styles";
import { Typography } from '@mui/material';
import { TitleVariant } from '../../../../util/styles/theme/types';
import theme, { useCommonStyles } from '../../../../util/styles/theme/theme';


interface FlyTitleComponentProps {
    classes: ClassNameMap;
    id?: string,
    title: string;
    children?: React.ReactElement,
    variant?: TitleVariant;
}

const FlytTitleComponent = ({ children, variant, title}: FlyTitleComponentProps) => {
  const mainTheme = useCommonStyles(theme);
  return (
    <Typography variant={variant} style={mainTheme.titleMarginStyle}>
    {children}
    {title}
    </Typography>
  )
}

export default FlytTitleComponent;