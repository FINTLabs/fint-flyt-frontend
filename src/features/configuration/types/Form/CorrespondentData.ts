import IShieldingData from "./ShieldingData";

export default interface ICorrespondentData {
    shielding?: IShieldingData;
    type: string | null;
    organisationNumber: string | null;
    nationalIdentityNumber: string | null;
    name: string | null;
    address: string | null;
    postalCode: string | null;
    city: string | null;
    contactPerson: string | null;
    phoneNumber: string | null;
    mobilePhoneNumber: string | null;
    email: string | null;
}
