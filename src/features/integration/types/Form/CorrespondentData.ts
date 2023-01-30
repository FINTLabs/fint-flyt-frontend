export default interface ICorrespondentData {
    protected?: boolean;
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
    accessCode: string | null;
    paragraph: string | null;
}
