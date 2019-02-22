import {
    TGroupRegistered,
    TResendEmail,
    TLoggedInUser,
    TRegistered
} from './../model/types';
import { ResponseStatus, temp_cookie } from './Comms';


/**
 * User Registration
 * METHOD: POST
 * PAYLOAD:
  {
    registration_id: "string", ==> equal 'username'
    password: "string",
    lastname: "string",
    firstname: "string",
    email: "string",
    mobile: "string",
    company_name: "string", // change
    job_title: "string", // change
    birth: "string", // dob change
    gender: "string"
};

https://13.70.23.104/wordpress/index.php/wp-json/wp/v2/users/register
{
  "registration_id": "testyuser_editor12", ==> // original username
  "email":"222@mail.com",
  "password": "P@ssw0rd",
  "lastname": "string",
  "firstname": "string",
  "mobile": "string",
  "company": "string",
  "jobtitle": "string",
  "dob": "string",
  "gender": "string",
  "role":"editor"
}

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

/**
 * UserLogin inactive, processing and active status
 * METHOD: POST
 * PAYLOAD:
  {
    registration_id: "string",
    password: "string"
};
**/
// use this for login and get user Info
// https://13.70.23.104/wordpress/index.php/api/auth/generate_auth_cookie
// form data: {
//     "username": "testyuser_editor2",
//     "password": "P@ssw0rd",
//     "seconds": "600",
// }

// this should get it from https://13.70.23.104/wordpress/index.php/api/auth/generate_auth_cookie
const LoggedInStatus = {
    'PENDING': 'PENDING', // status => inactive
    'PROCESSING': 'PROCESSING', // payment succees --> not collected
    'DENY': 'DENY', // => payment deny
    'APPROVED': 'APPROVED', // status => approved -> has data
}

export const LoggedInMockInActiveResponse: TLoggedInUser = {
    user: {
        status: LoggedInStatus.PENDING,
    },
    cookie: temp_cookie,
    status: ResponseStatus.OK
}

export const LoggedInMockActiveResponse: TLoggedInUser = {
    user: {
        status: LoggedInStatus.APPROVED,
    },
    cookie: temp_cookie,
    status: ResponseStatus.OK
}

export const LoggedInMockProcessingResponse : TLoggedInUser = {
    user: {
        status: LoggedInStatus.PROCESSING,
    },
    cookie: temp_cookie,
    status: ResponseStatus.OK
}
