import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function isNumber(val: any) {
    return !isNaN(Number(val))
}

export function LatValidator(control: AbstractControl): ValidationErrors | null {

    if (isNumber(control.value)) {
        if (control.value >= 90.0 || control.value <= -90.0) {
            return { latInvalid: true };
        } else return null;
    } else {
        return { notNumber: true };
    }
}

export function LngValidator(control: AbstractControl): ValidationErrors | null {
    // if not number
    if (isNumber(control.value)) {
        if (control.value >= 180.0 || control.value <= -180.0) {
            return { lngInvalid: true };
        } else return null;
    } else {
        return { notNumber: true };
    }
}