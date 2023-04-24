import './style.css'
import { TesteVelocidade } from './teste-velocidade'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1 class="title">Teste de velocidade</h1>
    <div class="card">
      <div id="teste-velocidade"></div>
    </div>
    <p class="read-the-docs">
      Faça o teste agora mesmo
    </p>
  </div>
`

new TesteVelocidade(document.querySelector('#teste-velocidade')!);
