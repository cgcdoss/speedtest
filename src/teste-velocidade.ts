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
        const inicio = performance.now();

        fetch(url, { cache: 'no-cache' }).then((response) => {
            const fim = performance.now();
            const tempo = (fim - inicio) / 1000; // converte de milissegundos para segundos
            const velocidade = (+response.headers.get("Content-Length")! / tempo / 1000000) * 8; // calcula a velocidade em Mbps
            setStatus(`Velocidade de download: ${velocidade.toFixed(2)} Mbps`);
        });
    }

    function setStatus(status: string) {
        return element.querySelector('.status')!.textContent = status;
    }
}
