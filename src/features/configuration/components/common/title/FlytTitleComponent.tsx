import React from 'react'
import {ClassNameMap} from "@mui/styles";

interface FlyTitleComponentProps {
    classes: ClassNameMap;
    id?: string,
    title: string;
    children: React.ReactElement,
    variant: "h1" | "h2" | "h3";
}

const FlytTitleComponent = ({ children}: FlyTitleComponentProps) => {
  return (
    <div>
    {children}
    </div>
  )
}

export default FlytTitleComponent