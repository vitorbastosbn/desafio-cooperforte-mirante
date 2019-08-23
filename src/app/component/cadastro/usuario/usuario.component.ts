import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  loading: boolean;
  formulario: FormGroup;
  isMobile: boolean;
  perfis = [
    {
      id: 1,
      nome: 'ADMIN'
    },
    {
      id: 2,
      nome: 'CONSULTA'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) { this.isMobile = window.innerWidth > 800 ? false : true; }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      usuario: [null, [
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.required
      ]],
      senha: [null, [
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.required
      ]]
    });
  }

  onSubmit() {

  }

  onReset() {
    this.formulario.reset();
  }

  getErrorMessage(campo: string) {
    return this.formulario.get(campo).hasError('required') ? 'Este campo é obrigatório.' :
      this.formulario.get(campo).hasError('minlength') ? 'Este valor é muito pequeno.' :
        this.formulario.get(campo).hasError('maxlength') ? 'Este valor é muito grande.' : '';
  }

}
