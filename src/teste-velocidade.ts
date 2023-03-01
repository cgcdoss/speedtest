export function setTeste(element: HTMLDivElement): any {
    const btn = document.createElement('button');
    btn.textContent = 'Começar';
    btn.addEventListener('click', () => {
        if (btn.textContent?.includes('Começar')) {
            setStatus('Carregando');
            testarVelocidade()
            btn.textContent = 'Parar';
        } else {
            btn.textContent = 'Começar';
        }
    });
    element.append(btn);

    const status = document.createElement('h2');
    status.classList.add('status');
    element.append(status);

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
                setStatus(`Velocidade de download: ${velocidade.toFixed(2)} Mbps`);

                if (btn.textContent?.includes('Parar'))
                    setTimeout(() => {
                        testarVelocidade();
                    }, 500);
            });
    }

    function setStatus(status: string) {
        return element.querySelector('.status')!.textContent = status;
    }

    btn.click(); // Para iniciar o site já com o teste sendo executado
}
