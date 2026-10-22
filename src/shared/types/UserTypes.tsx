import { ICreatedByActor } from "./audit";

    export interface IUser {
    objectIdentifier: string,
    email: string,
    name: string,
    sourceApplicationIds: number[]
}

export interface UserData {
    objectIdentifier: string,
    email: string,
    name: string,
    sourceApplicationIds: number[],
    createdAt: string | null,
    createdBy: string,
    createdByActor: ICreatedByActor;
    lastModifiedAt: string | null,
    lastModifiedBy: string,
    lastModifiedByActor: {
        type: string,
        oid: string,
    }

}