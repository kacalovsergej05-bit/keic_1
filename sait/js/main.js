document.addEventListener('DOMContentLoaded', function() {
    // Находим ВСЕ блоки с классом katalog
    const allCatalogs = document.querySelectorAll('.katalog');
    
    allCatalogs.forEach((catalog, catalogIndex) => {
        // Находим карточки ТОЛЬКО в этом каталоге
        const kartochki = catalog.querySelectorAll('.kartochka');
        const leftBtn = catalog.querySelector('.left-b');
        const rightBtn = catalog.querySelector('.right-b');
        
        if (!leftBtn || !rightBtn || kartochki.length === 0) return;
        
        let currentIndex = 0;
        const visibleCount = 4;
        const total = kartochki.length;
        
        // Функция показа карточек
        function showCards() {
            // Сначала скрываем все карточки в ЭТОМ каталоге
            for (let i = 0; i < total; i++) {
                kartochki[i].style.display = 'none';
            }
            
            // Показываем нужные
            for (let i = 0; i < visibleCount; i++) {
                let index = (currentIndex + i) % total;
                kartochki[index].style.display = 'block';
            }
        }
        
        // Кнопка "вправо"
        rightBtn.onclick = function() {
            currentIndex++;
            if (currentIndex >= total) {
                currentIndex = 0;
            }
            showCards();
        };
        
        // Кнопка "влево"
        leftBtn.onclick = function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = total - 1;
            }
            showCards();
        };
        
        // Запускаем показ
        showCards();
    });
});