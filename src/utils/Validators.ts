export const regexValidator = {
    "registration": /^(?=.{8,})$/,
    "password": /^(?=.{8,})$/
}

import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static matchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}