import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarListaEmailTelefone } from 'src/app/validator/validator-list';
import { ClienteService } from './../../../service/cliente.service';
import { getErrorMessage } from 'src/app/utils/message-error';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

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
          validators: [validarListaEmailTelefone]
        })
    });
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
    if (!this.verificarHintErro(campo)) {
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
    if (!this.verificarHintErro(campo)) {
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

  verificarHintErro(campo1: string, campo2?: string): string {
    return getErrorMessage(
      this.formulario.controls[campo1] !== undefined ?
        this.formulario.controls[campo1].get(campo2) !== null ? this.formulario.controls[campo1].get(campo2).errors :
          this.formulario.controls[campo1].errors : null
    );
  }

}
