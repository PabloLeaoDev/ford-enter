import { Component } from '@angular/core';

@Component({
  selector: 'app-contato',
  imports: [],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

}

// import { Component, OnInit, Renderer2 } from '@angular/core';

// @Component({
//   selector: 'app-meu-componente',
//   templateUrl: './meu-componente.component.html',
// })
// export class MeuComponenteComponent implements OnInit {

//   constructor(private renderer: Renderer2) {}

//   ngOnInit() {
//     const script = this.renderer.createElement('script');
//     script.src = 'assets/js/script.js';
//     script.onload = () => {
//       console.log('Script carregado!');
//     };
//     this.renderer.appendChild(document.body, script);
//   }
// }
