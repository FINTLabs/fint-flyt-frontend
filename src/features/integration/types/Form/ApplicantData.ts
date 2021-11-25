import {propertyString} from "../../util/util";

export default interface IApplicantData {
    name: propertyString;
    address: propertyString;
    postalCode: propertyString;
    city: propertyString;
    contact: propertyString;
    phoneNumber: propertyString;
    email: propertyString;
    hidden: string;
}