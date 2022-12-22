export default interface IApplicantData {
    protected?: boolean;
    organisationNumber: string | null;
    nationalIdentityNumber: string | null;
    name: string | null;
    address: string | null;
    postalCode: string | null;
    city: string | null;
    contactPerson: string | null;
    phoneNumber: string | null;
    email: string | null;
    accessCode: string | null;
    paragraph: string | null;
}
