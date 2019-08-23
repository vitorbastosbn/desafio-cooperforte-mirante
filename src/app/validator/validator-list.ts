import { FormGroup } from '@angular/forms';

export function validarListaEmailTelefone(control: FormGroup) {
    const TELEFONES = 'telefones';
    const TELEFONE = 'telefone';
    const EMAILS = 'emails';
    const EMAIL = 'email';

    if (control.controls !== undefined && control.controls !== null) {
        if (control.controls[TELEFONES].value === null && control.controls[TELEFONE].value === null) {
            control.controls[TELEFONE].setErrors({ required: true });
        }

        if (control.controls[EMAILS].value === null && control.controls[EMAIL].value === null) {
            control.controls[EMAIL].setErrors({ required: true });
        }

        if (control.controls[EMAIL].getError('required') || control.controls[TELEFONE].getError('required')) { return; }
    }
    return null;
}