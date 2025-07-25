document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DA PÁGINA ---
    const mainImage = document.getElementById('main-portfolio-image');
    const pageThumbnailsContainer = document.querySelector('.page-thumbnails');
    const pageThumbnails = pageThumbnailsContainer.querySelectorAll('img');

    // --- ELEMENTOS DO LIGHTBOX ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnFechar = lightbox.querySelector('.fechar');
    const btnAnterior = lightbox.querySelector('.anterior');
    const btnProximo = lightbox.querySelector('.proximo');

    // --- ESTADO ---
    let indiceAtual = 0;
    const todasAsImagens = Array.from(pageThumbnails);

    // Se não houver imagens, não faz nada.
    if (todasAsImagens.length === 0) {
        mainImage.style.display = 'none'; // Esconde a área de imagem principal
        return;
    }

    // --- FUNÇÕES ---

    function mostrarImagem(index) {
        // Valida o índice para o caso de chegar no fim ou no começo
        if (index >= todasAsImagens.length) {
            index = 0; // Volta para a primeira
        }
        if (index < 0) {
            index = todasAsImagens.length - 1; // Vai para a última
        }
        
        indiceAtual = index;
        
        // Atualiza a imagem principal na página
        mainImage.src = todasAsImagens[indiceAtual].src;
        
        // Atualiza a miniatura ativa na página
        pageThumbnails.forEach((thumb, i) => {
            if (i === indiceAtual) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });

        // Atualiza a imagem dentro do lightbox (se ele estiver aberto)
        lightboxImg.src = todasAsImagens[indiceAtual].src;
    }

    function abrirLightbox() {
        mostrarImagem(indiceAtual); // Garante que a imagem certa está no lightbox
        lightbox.style.display = 'flex';
    }

    function fecharLightbox() {
        lightbox.style.display = 'none';
    }

    function mostrarProximaImagem() {
        mostrarImagem(indiceAtual + 1);
    }

    function mostrarImagemAnterior() {
        mostrarImagem(indiceAtual - 1);
    }


    // --- CONFIGURAÇÃO INICIAL E EVENTOS ---

    // Adiciona evento de clique para cada miniatura na página
    todasAsImagens.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            mostrarImagem(index);
            
            // >>> LINHA ADICIONADA: Faz o scroll automático <<<
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // Adiciona evento para abrir o lightbox ao clicar na imagem principal
    mainImage.addEventListener('click', abrirLightbox);

    // Eventos dos botões do Lightbox
    btnFechar.addEventListener('click', fecharLightbox);
    btnProximo.addEventListener('click', mostrarProximaImagem);
    btnAnterior.addEventListener('click', mostrarImagemAnterior);

    // Permite navegar com as setas do teclado quando o lightbox está aberto
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                mostrarProximaImagem();
            } else if (e.key === 'ArrowLeft') {
                mostrarImagemAnterior();
            } else if (e.key === 'Escape') {
                fecharLightbox();
            }
        }
    });

    // Inicia o visualizador com a primeira imagem
    mostrarImagem(0);

});