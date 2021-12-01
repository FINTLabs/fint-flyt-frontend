import {PropertyString} from "../Property";

export default interface IApplicantData {
    name: PropertyString;
    address: PropertyString;
    postalCode: PropertyString;
    city: PropertyString;
    phoneNumber: PropertyString;
    email: PropertyString;
    accessCode: string;
    paragraph: string;
}