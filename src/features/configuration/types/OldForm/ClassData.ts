import IShieldingData from "./ShieldingData";

export interface IClassData {
    classification: string | null;
    order: number | null;
    class: string | null;
    title: string | null;
    shielding: IShieldingData;
}