// Файл: footer-toggle.js (упрощенная версия)

document.addEventListener('DOMContentLoaded', function() {
    // Находим все блоки футера
    const footerBlocks = document.querySelectorAll('.new-footer-contacts, .new-footer-faq, .new-footer-purchase, .new-footer-categories, .new-footer-sansation, .new-footer-social');
    
    footerBlocks.forEach(block => {
        const title = block.querySelector('.new-footer-title');
        
        if (title) {
            // Добавляем стрелку
            title.style.display = 'flex';
            title.style.justifyContent = 'space-between';
            title.style.alignItems = 'center';
            title.style.cursor = 'pointer';
            
            const arrowImg = document.createElement('img');
            arrowImg.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolyline points="6 9 12 15 18 9"%3E%3C/polyline%3E%3C/svg%3E';
            arrowImg.style.width = '2rem';
            arrowImg.style.height = '2rem';
            arrowImg.style.transition = 'transform 0.3s';
            title.appendChild(arrowImg);
            
            // Создаем обертку для контента
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'footer-content-wrapper';
            
            // Переносим все элементы после заголовка в обертку
            const nextElements = [];
            let next = title.nextElementSibling;
            while (next) {
                nextElements.push(next);
                next = next.nextElementSibling;
            }
            
            nextElements.forEach(el => {
                contentWrapper.appendChild(el);
            });
            
            block.appendChild(contentWrapper);
            
            let isOpen = true;
            
            title.onclick = function() {
                if (isOpen) {
                    contentWrapper.style.display = 'none';
                    arrowImg.style.transform = 'rotate(0deg)';
                } else {
                    contentWrapper.style.display = 'block';
                    arrowImg.style.transform = 'rotate(180deg)';
                }
                isOpen = !isOpen;
            };
        }
    });
});



