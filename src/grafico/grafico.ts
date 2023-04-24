import './grafico.css';

export class Grafico {

    constructor(private _element: HTMLDivElement) { }

    public botaoExibirGrafico(amostras: Array<number>) {
        const botao = document.createElement('button');
        botao.classList.add('botao-grafico');
        botao.style.marginTop = '2rem';
        botao.textContent = 'Exibir Gráfico';
        botao.addEventListener('click', () => {
            this._montarGrafico(amostras);
            botao.remove();
        });

        this._element.append(botao);
    }

    private _montarGrafico(amostras: Array<number>) {
        const grafico = document.createElement('div');
        grafico.classList.add('grafico');

        const divs = amostras.map(altura => {
            const div = document.createElement('div');
            div.style.height = this._obterAlturaBarra(amostras, altura) + 'px';

            const paragrafo = document.createElement('p');
            paragrafo.textContent = altura.toString();

            div.append(paragrafo);
            return div;
        });

        grafico.append(...divs);
        this._element.parentElement?.parentElement?.append(grafico);
    }

    public removerBotaoEGrafico() {
        document.querySelector('.grafico')?.remove();
        document.querySelector('.botao-grafico')?.remove();
    }

    /**
     * Tratar para que o gráfico não fique muito alto ou muito baixo
     * @param amostras 
     * @param altura 
     * @returns 
     */
    private _obterAlturaBarra(amostras: number[], altura: number): number {
        if (amostras.some(a => a > 250)) {
            return altura / 2;
        }

        /* if (amostras.some(a => a < 70)) {
            return altura * 2;
        } */

        return altura;
    }

}
