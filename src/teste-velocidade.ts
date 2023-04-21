import { setGrafico } from "./grafico/grafico";

export function setTeste(element: HTMLDivElement): any {
    const grafico = setGrafico(element);

    let amostras: Array<number> = [];
    const TOTAL_AMOSTRAS = 15;

    let btn: HTMLButtonElement;
    let status: HTMLHeadingElement;
    let barraProgressoWrapper: HTMLDivElement;
    let barraProgresso: HTMLDivElement;

    const helper = {
        get emExecucao(): boolean {
            return btn.textContent!.includes('Parar');
        },
        get media(): string {
            const media = amostras.reduce((prev, curr) => prev + curr) / amostras.length;
            return media.toFixed(2) + ' Mbps';
        },
    };

    function setBtnElement(): void {
        btn = document.createElement('button');
        btn.textContent = 'Começar';
        btn.addEventListener('click', () => {
            if (!helper.emExecucao) {
                iniciar();
            } else {
                parar();
            }
        });
        element.append(btn);
    }

    function iniciar() {
        amostras = [];
        grafico.removerBotaoEGrafico();
        setProgresso(0);
        setStatus('Carregando');
        testarVelocidade();
        btn.textContent = 'Parar';
    }

    function parar() {
        btn.textContent = 'Começar';
        setTimeout(() => {
            setStatus(helper.media);
        }, 500);
    }

    function setStatusElement(): void {
        status = document.createElement('h2');
        status.classList.add('status');
        element.append(status);
    }

    function setBarraProgressoElement(): void {
        barraProgressoWrapper = document.createElement('div');
        barraProgresso = document.createElement('div');

        barraProgressoWrapper.classList.add('barra-progresso-wrapper');
        barraProgresso.classList.add('barra-progresso');

        barraProgressoWrapper.append(barraProgresso);
        element.append(barraProgressoWrapper);
    }

    function setProgresso(progresso: number): void {
        barraProgresso.style.width = `${progresso}%`;
    }

    function testarVelocidade() {
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
                if (!helper.emExecucao) return;

                const fim = performance.now();
                const tempo = (fim - inicio) / 1000; // converte de milissegundos para segundos
                const velocidade = (buffer.byteLength / tempo / 1000000) * 8; // calcula a velocidade em Mbps
                setStatus(`${velocidade.toFixed(2)} Mbps`);
                amostras.push(+velocidade.toFixed(2));
                setProgresso(amostras.length / TOTAL_AMOSTRAS * 100);

                if (amostras.length === TOTAL_AMOSTRAS) {
                    setStatus(helper.media);
                    btn.textContent = 'Começar';
                    grafico.botaoExibirGrafico(amostras);
                    return;
                }

                setTimeout(() => {
                    testarVelocidade();
                }, 300);
            }).catch(() => {
                setStatus('Erro ao calcular');
                btn.textContent = 'Começar';
            });
    }

    function setStatus(status: string) {
        return element.querySelector('.status')!.textContent = status;
    }

    setBtnElement();
    setStatusElement();
    setBarraProgressoElement();
    btn!.click(); // Para iniciar o site já com o teste sendo executado
}
