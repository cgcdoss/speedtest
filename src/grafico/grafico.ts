import './grafico.css';

export function setGrafico(element: HTMLDivElement) {
    function botaoExibirGrafico(amostras: Array<number>) {
        const botao = document.createElement('button');
        botao.classList.add('botao-grafico');
        botao.style.marginTop = '2rem';
        botao.textContent = 'Exibir Gráfico';
        botao.addEventListener('click', () => {
            montarGrafico(amostras);
            botao.remove();
        });

        element.append(botao);
    }

    function montarGrafico(amostras: Array<number>) {
        const grafico = document.createElement('div');
        grafico.classList.add('grafico');

        const divs = amostras.map(a => {
            const div = document.createElement('div');
            div.style.height = obterAlturaBarra(amostras, a) + 'px';
            div.textContent = a.toString();
            return div;
        });

        grafico.append(...divs);
        element.parentElement?.parentElement?.append(grafico);
    }

    function removerBotaoEGrafico() {
        document.querySelector('.grafico')?.remove();
        document.querySelector('.botao-grafico')?.remove();
    }

    /**
     * Tratar para que o gráfico não fique muito alto ou muito baixo
     * @param amostras 
     * @param altura 
     * @returns 
     */
    function obterAlturaBarra(amostras: number[], altura: number): number {
        if (amostras.some(a => a > 250)) {
            return altura / 2;
        }

        /* if (amostras.some(a => a < 70)) {
            return altura * 2;
        } */

        return altura;
    }

    return {
        botaoExibirGrafico,
        removerBotaoEGrafico,
    };
}
