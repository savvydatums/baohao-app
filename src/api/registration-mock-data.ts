import { TGroupRegistered, TResendEmail } from './../model/types';
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
    result: { userId: 12345, emailId:43210 },
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
    result: { ticket_number: '12345-XXXX-XXXX', emailId:43210 },
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

/**
 * Resend Password
 * METHOD: POST
 * PAYLOAD:
  {
    emailId: number
    
};
**/

export const ResendEmailMockResponse: TResendEmail = {
    result : {
        email_status: "complete"
    },
        error: null
}