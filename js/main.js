document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DA PÁGINA ---
    const gallery = document.querySelector('.thumbnail-gallery');
    if (!gallery) return;
    const todasAsImagens = gallery.querySelectorAll('img');

    // --- ELEMENTOS DO LIGHTBOX ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxThumbnailsContainer = lightbox.querySelector('.lightbox-thumbnails'); // Novo container
    const btnFechar = lightbox.querySelector('.fechar');
    const btnAnterior = lightbox.querySelector('.anterior');
    const btnProximo = lightbox.querySelector('.proximo');

    // --- ESTADO ---
    let indiceAtual = 0;
    let thumbnailsGeradas = false; // Flag para controlar a geração das miniaturas

    if (todasAsImagens.length === 0) return;

    // --- FUNÇÕES ---

    // Nova função para criar as miniaturas dentro do lightbox
    function gerarLightboxThumbnails() {
        lightboxThumbnailsContainer.innerHTML = ''; // Limpa o container
        todasAsImagens.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.src = img.src;
            thumb.alt = img.alt;
            thumb.addEventListener('click', () => {
                atualizarLightbox(index);
            });
            lightboxThumbnailsContainer.appendChild(thumb);
        });
        thumbnailsGeradas = true;
    }

    function atualizarLightbox(index) {
        if (index >= todasAsImagens.length) index = 0;
        if (index < 0) index = todasAsImagens.length - 1;
        
        indiceAtual = index;
        lightboxImg.src = todasAsImagens[indiceAtual].src;

        // Atualiza a classe 'active' nas miniaturas do lightbox
        const lightboxThumbs = lightboxThumbnailsContainer.querySelectorAll('img');
        lightboxThumbs.forEach((thumb, i) => {
            if (i === indiceAtual) {
                thumb.classList.add('active');
                // Faz o scroll da miniatura ativa para o centro da visão
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function abrirLightbox(index) {
        // Gera as miniaturas apenas na primeira vez que o lightbox é aberto
        if (!thumbnailsGeradas) {
            gerarLightboxThumbnails();
        }
        atualizarLightbox(index);
        lightbox.style.display = 'flex';
    }

    function fecharLightbox() {
        lightbox.style.display = 'none';
    }

    function mostrarProximaImagem() {
        atualizarLightbox(indiceAtual + 1);
    }

    function mostrarImagemAnterior() {
        atualizarLightbox(indiceAtual - 1);
    }

    // --- CONFIGURAÇÃO DE EVENTOS ---

    todasAsImagens.forEach((img, index) => {
        img.addEventListener('click', () => {
            abrirLightbox(index);
        });
    });

    btnFechar.addEventListener('click', fecharLightbox);
    btnProximo.addEventListener('click', mostrarProximaImagem);
    btnAnterior.addEventListener('click', mostrarImagemAnterior);

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight' || e.key === 'd') mostrarProximaImagem();
            else if (e.key === 'ArrowLeft' || e.key === 'a') mostrarImagemAnterior();
            else if (e.key === 'Escape') fecharLightbox();
        }
    });
});