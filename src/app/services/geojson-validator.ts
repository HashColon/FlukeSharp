import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as GJV from 'geojson-validation'

export function GeoJsonValidator(control: AbstractControl): ValidationErrors | null {
    try {
        JSON.parse(control.value);
    } catch (e) {
        //        console.log('JI!: ' + control.value);
        return { jsonInvalid: true };
    }

    if (!GJV.valid(JSON.parse(control.value))) {
        //      console.log("GJI!: " + control.value);
        return { geoJsonInvalid: true };
    }
    //console.log("NULL!");
    return null;
};