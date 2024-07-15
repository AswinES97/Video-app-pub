import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export interface ILogin {
    email?: string | null | undefined
    password?: string | null | undefined
}

export interface ISignup {
    username: string | null
    email?: string | null | undefined
    password?: string | null | undefined
    confirm_password: string | null | undefined
}

export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
    ): ValidationErrors | null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirm_password')
    console.log(password, confirmPassword);

    if (password?.value === confirmPassword?.value) {
        return null
    }
    else {
        return { passwordMissmatch: true }
    }

}