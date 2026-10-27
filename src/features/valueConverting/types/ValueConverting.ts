import { ICreatedByActor } from '../../../shared/types/audit';

export interface IValueConverting {
    id: number;
    displayName: string;
    fromApplicationId: number;
    fromTypeId: string;
    toApplicationId: string;
    toTypeId: string;
    convertingMap: Record<string, string>;
    createdAt: string | null;
    createdBy: string | null;
    createdByActor: ICreatedByActor | null;
    lastModifiedAt: string | null;
    lastModifiedBy: string | null;
    lastModifiedByActor: ICreatedByActor | null;
}
