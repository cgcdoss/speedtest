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
        const tamanhoArquivo = 43.5 * 1024 * 1024;
        const inicio = performance.now();

        fetch(url, { cache: 'no-cache' }).then(() => {
            const fim = performance.now();
            const tempo = (fim - inicio) / 1000; // tempo em segundos
            const velocidade = tamanhoArquivo / tempo / 1024 / 1024; // velocidade em Mbps
            setStatus(`Velocidade de download: ${velocidade.toFixed(2)} Mbps`);
        });
    }

    function setStatus(status: string) {
        return element.querySelector('.status')!.textContent = status;
    }
}
