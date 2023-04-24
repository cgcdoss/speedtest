import { Grafico } from "./grafico/grafico";

export class TesteVelocidade {

    private _grafico: Grafico;
    private _amostras: Array<number> = [];
    private readonly TOTAL_AMOSTRAS = 15;
    private _btn = this._getBtn;
    private _status = this._getStatus;
    private _barraProgressoWrapper!: HTMLDivElement;
    private _barraProgresso!: HTMLDivElement;

    constructor(private _element: HTMLDivElement) {
        this._grafico = new Grafico(this._element);

        this._element.append(this._btn);
        this._element.append(this._status);
        this._setBarraProgressoElement();
        this._btn.click(); // Para iniciar o site já com o teste sendo executado
    }

    private get _getBtn() {
        const btn = document.createElement('button');
        btn.textContent = 'Começar';
        btn.addEventListener('click', () => {
            if (this._emExecucao) {
                this._parar();
            } else {
                this._iniciar();
            }
        });

        return btn;
    }

    private get _getStatus() {
        const status = document.createElement('h2');
        status.classList.add('status');

        return status;
    }

    private _setBarraProgressoElement(): void {
        this._barraProgressoWrapper = document.createElement('div');
        this._barraProgresso = document.createElement('div');

        this._barraProgressoWrapper.classList.add('barra-progresso-wrapper');
        this._barraProgresso.classList.add('barra-progresso');

        this._barraProgressoWrapper.append(this._barraProgresso);
        this._element.append(this._barraProgressoWrapper);
    }

    private _setStatus(status: string) {
        return this._element.querySelector('.status')!.textContent = status;
    }

    private _setProgresso(progresso: number): void {
        this._barraProgresso.style.width = `${progresso}%`;
    }

    private _iniciar() {
        this._amostras = [];
        this._grafico.removerBotaoEGrafico();
        this._setProgresso(0);
        this._setStatus('Carregando');
        this._testarVelocidade();
        this._btn.textContent = 'Parar';
    }

    private _parar() {
        this._btn.textContent = 'Começar';
        setTimeout(() => {
            this._setStatus(this._getMedia);
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
                const velocidade = (buffer.byteLength / tempo / 1000000) * 8; // calcula a velocidade em Mbps
                this._setStatus(`${velocidade.toFixed(2)} Mbps`);
                this._amostras.push(+velocidade.toFixed(2));
                this._setProgresso(this._amostras.length / this.TOTAL_AMOSTRAS * 100);

                if (this._amostras.length === this.TOTAL_AMOSTRAS) {
                    this._setStatus(this._getMedia);
                    this._btn.textContent = 'Começar';
                    this._grafico.botaoExibirGrafico(this._amostras);
                    return;
                }

                setTimeout(() => {
                    this._testarVelocidade();
                }, 300);
            }).catch(() => {
                this._setStatus('Erro ao calcular');
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

}
