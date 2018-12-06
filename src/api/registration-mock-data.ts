import { TLoggedInUser } from "../model/types";

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

// RESPONSE:
export const registrationMockResponse:TLoggedInUser = {
    result: { token: 'JKSHJFGBH3t47n34j4nj34', userId: 12345 },
    error: null
}
