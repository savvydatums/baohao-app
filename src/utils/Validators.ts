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
            console.log('password match: false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('password match: true');
            return null
        }
    }
}