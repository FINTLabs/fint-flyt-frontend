import IShieldingData from "./ShieldingData";
import {IClassData} from "./ClassData";

export default interface ICaseData {
    caseCreationStrategy: string | null;
    id: string | null | undefined;
    title: string | null;
    publicTitle: string | null;
    caseType: string | null;
    administrativeUnit: string | null;
    archiveUnit: string | null;
    recordUnit: string | null;
    status: string | null;
    shielding?: IShieldingData;
    caseWorker: string | null;
    classes: IClassData[];
}
