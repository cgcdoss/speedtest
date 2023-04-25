import { Grafico } from "./grafico/grafico";

export class TesteVelocidade {

    private _grafico: Grafico;
    private _amostras: Array<number> = [];
    private readonly TOTAL_AMOSTRAS = 15;

    constructor(private _element: HTMLDivElement) {
        this._grafico = new Grafico(this._element);

        this._setupElements();
        this._btn.click(); // Para iniciar o site já com o teste sendo executado
    }

    private _setupElements(): void {
        this._setBtnElement();
        this._setStatusElement();
        this._setBarraProgressoElement();
    }

    private _setBtnElement(): void {
        const btn = document.createElement('button');
        btn.id = 'btn-toggle';
        btn.textContent = 'Começar';
        btn.addEventListener('click', () => {
            if (this._emExecucao) {
                this._parar();
            } else {
                this._iniciar();
            }
        });
        this._element.append(btn);
    }

    private _setStatusElement(): void {
        const status = document.createElement('h2');
        status.classList.add('status');
        this._element.append(status);
    }

    private _setBarraProgressoElement(): void {
        const barraProgressoWrapper = document.createElement('div');
        const barraProgresso = document.createElement('div');

        barraProgressoWrapper.classList.add('barra-progresso-wrapper');
        barraProgresso.classList.add('barra-progresso');

        barraProgressoWrapper.append(barraProgresso);
        this._element.append(barraProgressoWrapper);
    }

    private _setStatusText(status: string) {
        return this._status.textContent = status;
    }

    private _setProgresso(progresso: number): void {
        this._barraProgresso.style.width = `${progresso}%`;
    }

    private _iniciar(): void {
        this._amostras = [];
        this._grafico.removerBotaoEGrafico();
        this._setProgresso(0);
        this._setStatusText('Carregando');
        this._testarVelocidade();
        this._btn.textContent = 'Parar';
    }

    private _parar() {
        this._btn.textContent = 'Começar';
        setTimeout(() => {
            this._setStatusText(this._getMedia);
        }, 500);
    }

    private _testarVelocidade() {
        const url = 'https://raw.githubusercontent.com/cgcdoss/teste-velocidade/master/public/5mb.jpg';
        const parametroParaEvitarCache = `timestamp=${new Date().getTime()}`;
        const inicio = performance.now();

        fetch(`${url}?${parametroParaEvitarCache}`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao tentar');
                }

                return response;
            })
            .then(response => response.arrayBuffer())
            .then(buffer => {
                if (!this._emExecucao) return;

                const fim = performance.now();
                const tempo = (fim - inicio) / 1000; // converte de milissegundos para segundos
                const umMega = 1000000;
                const velocidade = (buffer.byteLength / tempo / umMega) * 8; // calcula a velocidade em Mbps
                this._setStatusText(`${velocidade.toFixed(2)} Mbps`);
                this._amostras.push(+velocidade.toFixed(2));
                this._setProgresso(this._amostras.length / this.TOTAL_AMOSTRAS * 100);

                if (this._amostras.length === this.TOTAL_AMOSTRAS) {
                    this._setStatusText(this._getMedia);
                    this._btn.textContent = 'Começar';
                    this._grafico.botaoExibirGrafico(this._amostras);
                    return;
                }

                setTimeout(() => {
                    this._testarVelocidade();
                }, 300);
            }).catch(() => {
                this._setStatusText('Erro ao calcular');
                this._btn.textContent = 'Começar';
            });
    }

    private get _emExecucao() {
        return this._btn.textContent!.includes('Parar');
    }

    private get _getMedia() {
        const media = this._amostras.reduce((prev, curr) => prev + curr) / this._amostras.length;
        return media.toFixed(2) + ' Mbps';
    }

    private get _btn(): HTMLButtonElement {
        return document.querySelector('#btn-toggle')!;
    }

    private get _status(): HTMLHeadingElement {
        return document.querySelector('.status')!;
    }

    private get _barraProgresso(): HTMLDivElement {
        return document.querySelector('.barra-progresso')!;
    }

}