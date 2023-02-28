export function setTeste(element: HTMLDivElement): any {
    const btn = document.createElement('button');
    btn.textContent = 'Começar';
    btn.addEventListener('click', testarVelocidade);
    element.append(btn);

    const status = document.createElement('h2');
    status.classList.add('status');
    element.append(status);

    function testarVelocidade() {
        setStatus('Carregando');

        const url = '/video-teste.mp4';
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
            });
    }

    function setStatus(status: string) {
        return element.querySelector('.status')!.textContent = status;
    }
}
