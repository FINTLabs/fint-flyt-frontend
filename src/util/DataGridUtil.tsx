import {Tooltip} from "@mui/material";

export const renderCellWithTooltip = (content: string) => (
    <Tooltip title={content}>
        <span>{content}</span>
    </Tooltip>
);

export function getSourceApplicationDisplayName(id: number): string {
    if (id === 1) return 'ACOS';
    if (id === 2) return 'eGrunnerverv';
    if (id === 3) return 'RF13.50'
    else return "ukjent";
}

export function getDestinationDisplayName(id: string): string {
    if (id === 'fylkesrad') return 'Fylkesråd';
    else return "ukjent";
}

export function getStateDisplayName(id: string): string {
    if (id === 'ACTIVE') return 'Aktiv';
    if (id === 'DEACTIVATED') return 'Deaktivert';
    else return "ukjent";
}