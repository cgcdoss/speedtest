export function setTeste(element: HTMLDivElement): any {
    let amostras: Array<number> = [];
    const TOTAL_AMOSTRAS = 15;

    let btn: HTMLButtonElement;
    let status: HTMLHeadingElement;
    let barraProgressoWrapper: HTMLDivElement;
    let barraProgresso: HTMLDivElement;

    function setBtnElement(): void {
        btn = document.createElement('button');
        btn.textContent = 'Começar';
        btn.addEventListener('click', () => {
            if (btn.textContent?.includes('Começar')) {
                amostras = [];
                setProgresso(0);
                setStatus('Carregando');
                testarVelocidade();
                btn.textContent = 'Parar';
            } else {
                btn.textContent = 'Começar';
                setTimeout(() => {
                    setStatus(getMedia());
                }, 700);
            }
        });
        element.append(btn);
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
        const url = 'https://raw.githubusercontent.com/jrquick17/ng-speed-test/02c59e4afde67c35a5ba74014b91d44b33c0b3fe/demo/src/assets/5mb.jpg?nnn=0.6578724231971347';
        const parametroParaEvitarCache = `timestamp=${new Date().getTime()}`;
        const inicio = performance.now();

        fetch(`${url}?${parametroParaEvitarCache}`, { cache: 'no-store', })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao tentar');
                }

                return response;
            })
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const fim = performance.now();
                const tempo = (fim - inicio) / 1000; // converte de milissegundos para segundos
                const velocidade = (buffer.byteLength / tempo / 1000000) * 8; // calcula a velocidade em Mbps
                setStatus(`${velocidade.toFixed(2)} Mbps`);
                amostras.push(+velocidade.toFixed(2));
                setProgresso(amostras.length / TOTAL_AMOSTRAS * 100);

                if (amostras.length === TOTAL_AMOSTRAS) {
                    setStatus(getMedia());
                    btn.textContent = 'Começar';
                    return;
                }

                setTimeout(() => {
                    if (btn.textContent?.includes('Parar'))
                        testarVelocidade();
                }, 500);
            });
    }

    function setStatus(status: string) {
        return element.querySelector('.status')!.textContent = status;
    }

    function getMedia(): string {
        const media = amostras.reduce((prev, curr) => prev + curr) / amostras.length;
        return media.toFixed(2) + ' Mbps';
    }

    setBtnElement();
    setStatusElement();
    setBarraProgressoElement();
    // @ts-ignore
    btn.click(); // Para iniciar o site já com o teste sendo executado
}
