import './style.css'
import { setTeste } from './teste-velocidade'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Teste de velocidade</h1>
    <div class="card">
      <div id="teste-velocidade"></div>
    </div>
    <p class="read-the-docs">
      Faça o teste agora mesmo
    </p>
  </div>
`

setTeste(document.querySelector('#teste-velocidade')!);