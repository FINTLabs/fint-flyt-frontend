import { ISourceApplication } from '../../features/configuration/types/SourceApplication';
import { ISelect } from '../types/Select';

export const sourceApplicationsToSelectable = (sourceApplications: ISourceApplication[]): ISelect[] => {
    return sourceApplications.map((sourceApp) => {
        return {
            value: sourceApp.id.toString(),
            label: sourceApp.displayName,
        };
    });
};