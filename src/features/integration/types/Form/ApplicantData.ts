import {PropertyString} from "../Property";

export default interface IApplicantData {
    name: PropertyString;
    address: PropertyString;
    postalCode: PropertyString;
    city: PropertyString;
    contact: PropertyString;
    phoneNumber: PropertyString;
    email: PropertyString;
    hidden: string;
}