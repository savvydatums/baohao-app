import { TGroupRegistered } from './../model/types';
import { TLoggedInUser, TRegistered } from "../model/types";

export const LoggedInStatus = {
    'INACTIVE' : 'INACTIVE',
    'ACTIVE': 'ACTIVE',
    'PROCESSING' : 'PROCESSING'
}

/**
 * User Registration
 * METHOD: POST
 * PAYLOAD:
  {
    registration_id: "string",
    password: "string",
    lastname: "string",
    firstname: "string",
    email: "string",
    mobile: "string",
    company: "string",
    jobtitle: "string",
    dob: "string",
    gender: "string"
};
**/
export const registrationMockResponse: TRegistered = {
    result: { userId: 12345 },
    error: null
}


/**
 * Group Registration
 * METHOD: POST
 * PAYLOAD:
  {
    name: "string",
    email: "string",
    mobile: "string",
    message: "string"
};
**/

export const groupRegistrationMockResponse: TGroupRegistered = {
    result: { ticket_number: '12345-XXXX-XXXX' },
    error: null
}


/**
 * Group Registration
 * METHOD: POST
 * PAYLOAD:
  {
    registration_id: "string",
    password: "string"
};
**/

export const LoggedInMockResponse: TLoggedInUser = {
result : {
    token: 'JKSHJFGBH3t47n34j4nj34',
    userId: 12345,
    status : LoggedInStatus.INACTIVE
},
    error: null
}