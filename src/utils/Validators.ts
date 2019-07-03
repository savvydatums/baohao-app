export const regexValidator = {
    "registration": /^(?=.{8,})$/,
    "password": /^(?=.{8,})$/
}

import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static matchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag

		let numberArray = password.match(/\d/g);
		let letterArray = password.match(/([A-Za-z])/g);
		let has2number = numberArray && numberArray.length >= 2;
		let has2letter = letterArray && letterArray.length >= 2;

		if (!has2number || !has2letter) {
			AC.get('password').setErrors({ incorrect: true })
		} else if(password != confirmPassword) {
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            return null
		}
	}

}