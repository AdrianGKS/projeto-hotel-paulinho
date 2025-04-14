document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
        const images = carousel.querySelectorAll(".carousel-images img");
        const prevBtn = carousel.querySelector(".carousel-btn.prev");
        const nextBtn = carousel.querySelector(".carousel-btn.next");
        const indicatorsContainer = carousel.querySelector(".carousel-indicators");
        let currentIndex = 0;
        let interval;

        // Criar indicadores dinamicamente
        images.forEach((_, index) => {
            const indicator = document.createElement("button");
            if (index === 0) indicator.classList.add("active");
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = indicatorsContainer.querySelectorAll("button");

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle("active", i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle("active", i === index);
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        function startCarousel() {
            interval = setInterval(nextImage, 2000);
        }

        function stopCarousel() {
            clearInterval(interval);
        }

        // Eventos dos botões de navegação
        nextBtn.addEventListener("click", () => {
            stopCarousel();
            nextImage();
            startCarousel();
        });

        prevBtn.addEventListener("click", () => {
            stopCarousel();
            prevImage();
            startCarousel();
        });

        // Eventos dos indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                stopCarousel();
                currentIndex = index;
                showImage(currentIndex);
                startCarousel();
            });
        });

        // Inicializar o carrossel
        showImage(currentIndex);
        startCarousel();
    });
});