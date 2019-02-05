import {
    TGroupRegistered,
    TResendEmail,
    TLoggedInUser,
    TRegistered
} from './../model/types';


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

const LoggedInStatus = {
    'INACTIVE': 'INACTIVE',
    'ACTIVE': 'ACTIVE',
    'PROCESSING': 'PROCESSING'
}

export const LoggedInMockInActiveResponse: TLoggedInUser = {
    result: {
        token: 'JKSHJFGBH3t47n34j4nj34',
        userId: 12345,
        status: LoggedInStatus.INACTIVE
    },
    error: null
}

export const LoggedInMockActiveResponse: TLoggedInUser = {
    result: {
        token: 'JKSHJFGBH3t47n34j4nj34',
        userId: 12345,
        status: LoggedInStatus.ACTIVE
    },
    error: null
}

export const LoggedInMockProcessingResponse : TLoggedInUser = {
    result: {
        token: 'JKSHJFGBH3t47n34j4nj34',
        userId: 12345,
        status: LoggedInStatus.PROCESSING
    },
    error: null
}
