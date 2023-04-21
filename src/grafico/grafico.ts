import './grafico.css';

export function setGrafico(element: HTMLDivElement) {
    function botaoExibirGrafico(amostras: Array<number>) {
        const botao = document.createElement('button');
        botao.classList.add('botao-grafico');
        botao.addEventListener('click', () => {
            montarGrafico(amostras);
            botao.remove();
        });
        botao.textContent = 'Exibir Gráfico';
        botao.style.marginTop = '2rem';

        element.append(botao);
    }

    function montarGrafico(amostras: Array<number>) {
        const grafico = document.createElement('div');
        grafico.classList.add('grafico');

        amostras.forEach(v => {
            const div = document.createElement('div');
            div.style.height = obterAlturaBarra(amostras, v) + 'px';
            div.textContent = v.toString();
            grafico.append(div);
        });

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
