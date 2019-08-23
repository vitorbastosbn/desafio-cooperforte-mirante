import { ClienteService } from './../../../service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  static readonly TELEFONES = 'telefones';
  static readonly TELEFONE = 'telefone';
  static readonly EMAILS = 'emails';
  static readonly EMAIL = 'email';

  formulario: FormGroup;
  telefones: string[] = [];
  emails: string[] = [];
  loading: boolean;
  isMobile: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { this.isMobile = window.innerWidth > 800 ? false : true; }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9áàâãéèêíïóôõöúçñ ]+$'),
      ]],
      cpf: [null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]],
      endereco: this.formBuilder.group({
        cep: [null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ]],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required],
        complemento: [null]
      }),
      contato: this.formBuilder.group({
        telefone: [null, [
          Validators.minLength(10),
          Validators.maxLength(11)
        ]],
        telefones: [null, Validators.minLength(1)],
        email: [null, Validators.email],
        emails: [null, Validators.minLength(1)]
      },
        {
          validators: [this.validaTelefone, this.validaEmail]
        })
    });
  }

  validaTelefone(control: any) {
    if (control.controls !== undefined && control.controls !== null) {
      if (control.controls[ClienteComponent.TELEFONES].value === null && control.controls[ClienteComponent.TELEFONE].value === null) {
        control.controls[ClienteComponent.TELEFONE].setErrors({ required: true });
        return;
      }
    }
    return null;
  }

  validaEmail(control: any) {
    if (control.controls !== undefined && control.controls !== null) {
      if (control.controls[ClienteComponent.EMAILS].value === null && control.controls[ClienteComponent.EMAIL].value === null) {
        control.controls[ClienteComponent.EMAIL].setErrors({ required: true });
        return;
      }
    }
    return null;
  }

  onSubmit() {
    this.clienteService.cadastrar(this.formulario).subscribe(
      (data) => { console.log('Dados -> ', data); },
      (error) => { console.log('Error -> ', error); }
    );

  }

  onReset() {
    this.formulario.reset();
    this.telefones = [];
    this.emails = [];
  }

  consultarCep() {
    this.loading = true;
    this.clienteService.consultarCEP(this.formulario.value.endereco.cep).subscribe(
      (data: any) => {
        this.formulario.patchValue({
          endereco: {
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          }
        });
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      (error) => {
        console.log(error); this.loading = false;
      }
    );
  }

  adicionarTelefone(campo: string) {
    if (!this.getErrorMessage(campo)) {
      this.telefones.push(this.formulario.value.contato.telefone);

      this.formulario.patchValue({
        contato: {
          telefone: null,
          telefones: this.telefones
        }
      });
    }
  }

  removerTelefone(index: number) {
    this.formulario.patchValue({
      contato: {
        telefones: this.telefones.splice(index, 1)
      }
    });
  }

  adicionarEmail(campo: string) {
    if (!this.getErrorMessage(campo)) {
      this.emails.push(this.formulario.value.contato.email);

      this.formulario.patchValue({
        contato: {
          email: null,
          emails: this.emails
        }
      });
    }
  }

  removerEmail(index: number) {
    this.formulario.patchValue({
      contato: {
        emails: this.emails.splice(index, 1)
      }
    });
  }

  getErrorMessage(campo: string) {
    return this.formulario.get(campo).hasError('required') ? 'Este campo é obrigatório.' :
      this.formulario.get(campo).hasError('minlength') ? 'Este valor é muito pequeno.' :
        this.formulario.get(campo).hasError('maxlength') ? 'Este valor é muito grande.' :
          this.formulario.get(campo).hasError('email') ? 'Formato de e-mail inválido.' :
            this.formulario.get(campo).getError('pattern') !== null ?
              this.formulario.get(campo).getError('pattern').requiredPattern ===
                '^[a-zA-Z0-9áàâãéèêíïóôõöúçñ ]+$' ? 'Caracter inválido.' : '' : '';
  }

}
