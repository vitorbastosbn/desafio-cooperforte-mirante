export function getErrorMessage(errors: any) {
    if (errors !== null) {
        switch (Object.keys(errors)[0]) {
            case 'required':
                return 'Este campo é obrigatório.';
            case 'minlength':
                return 'Este valor é muito pequeno.';
            case 'maxlength':
                return 'Este valor é muito grande.';
            case 'email':
                return 'Formato de e-mail inválido.';
            case 'pattern':
                if (errors.pattern.requiredPattern === '^[a-zA-Z0-9áàâãéèêíïóôõöúçñ ]+$') { return 'Caracter inválido.'; }
                break;
            default:
                break;
        }
    }
}