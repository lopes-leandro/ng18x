import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static minLength(min: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value || control.value.length < min) {
                return {minLength: {required: min, actual: control.value ? control.value.length : 0}};
            }
            return null;
        }
    }

    static requiredArray(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const array = control.value as any[];
            if (!array || array.length === 0) {
                return { requiredArray: true };
            }
            return null;
        }
    }

    static patterValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null
            }

            const valid = regex.test(control.value);
            return valid ? null : error;
        }
    }
}
