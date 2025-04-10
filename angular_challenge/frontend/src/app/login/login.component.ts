import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DivInput } from './login.component.types';

@Component({
  selector: 'app-login',
  imports: [NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  inputs: Array<DivInput> = [
    {
      imgSrcOne: '',
      placeholder: 'Insira seu e-mail',
      imgSrcTwo: ''
    },
    {
      imgSrcOne: '',
      placeholder: 'Insira sua senha',
      imgSrcTwo: ''
    }
  ];
}
