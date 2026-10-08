const slides = [
    { img: "../img/главный экран.png", title: "Кулинич", text: "<p>Семейное хлебное дело с юга России</p><p>Полный цикл производства от зерна до готовой буханки. Растим. Мелем. Печём.</p>" },
    { img: "../img/главный экран.png", title: "Наши традиции", text: "<p>Хлеб по старинным рецептам</p><p>Используем только натуральные ингредиенты</p>" },
    { img: "../img/главный экран.png", title: "Свежая выпечка", text: "<p>Каждый день с 6 утра</p><p>Всегда свежая продукция к вашему столу</p>" }
];

let i = 0;
const slider = document.querySelector('.slaider-h');
const title = document.querySelector('.name-block-s-1');
const text = document.querySelector('.name-block-s-2');
const dots = document.querySelectorAll('.polosu-s div');
const prevArrow = document.querySelector('.block-s-2 img:first-child');
const nextArrow = document.querySelector('.block-s-2 img:last-child');

function change(n) {
    if (!slider) return;
    i = (n + slides.length) % slides.length;
    slider.style.backgroundImage = `url('${slides[i].img}')`;
    if (title) title.innerText = slides[i].title;
    if (text) text.innerHTML = slides[i].text;
    dots.forEach((d, idx) => {
        d.className = idx === i ? 'polosu-s1' : 'polosu-s2';
    });
}

if (dots.length) {
    dots.forEach((dot, idx) => dot.onclick = () => change(idx));
}
if (prevArrow) prevArrow.onclick = () => change(i - 1);
if (nextArrow) nextArrow.onclick = () => change(i + 1);

change(0);

// Модальное окно для видео
const modal = document.createElement('div');
modal.id = 'videoModal';
modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 99999;
`;

modal.innerHTML = `
    <div style="position: relative;">
        <button id="closeModalBtn" style="
            position: absolute;
            top: -50px;
            right: -10px;
            background: none;
            border: none;
            font-size: 40px;
            cursor: pointer;
            color: white;
            font-family: Arial;
        ">✕</button>
        <video id="modalVideo" controls autoplay style="
            max-width: 90vw;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
        ">
            <source src="../video/your-video.mp4" type="video/mp4">
        </video>
    </div>
`;

document.body.appendChild(modal);

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeBtn = document.getElementById('closeModalBtn');

function openVideoModal() {
    videoModal.style.display = 'flex';
    modalVideo.play();
    disableScroll();
}

function closeVideoModal() {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
    enableScroll();
}

closeBtn.onclick = closeVideoModal;

videoModal.onclick = (e) => {
    if (e.target === videoModal) closeVideoModal();
};

document.onkeydown = (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
        closeVideoModal();
    }
};

const playBtn = document.querySelector('.proigruvatel');
if (playBtn) {
    playBtn.onclick = openVideoModal;
}

const scrollBtn = document.querySelector('.strelka-form');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================
// НОВЫЙ БЛОК: ОТПРАВКА ФОРМЫ В n8n
// ============================================================

// ============================================================
// ОТПРАВКА ФОРМЫ В n8n С УВЕДОМЛЕНИЕМ И ОЧИСТКОЙ
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.forma-2');
    if (!form) {
        console.error('Форма .forma-2 не найдена. Проверьте селектор.');
        return;
    }

    // Функция для показа уведомления
    function showNotification(message, isSuccess = true) {
        const existing = document.querySelector('.n8n-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'n8n-notification';
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '16px 32px',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: '999999',
            transition: 'opacity 0.3s ease',
            opacity: '0',
            backgroundColor: isSuccess ? '#4CAF50' : '#f44336',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '90%',
            textAlign: 'center'
        });
        document.body.appendChild(notification);

        // Анимация появления
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });

        // Автоскрытие через 5 секунд
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Обработчик отправки
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Находим поля по атрибуту name
        const fioInput = form.querySelector('input[name="fio"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const requestInput = form.querySelector('input[name="request"]');
        const checkbox = form.querySelector('input[type="checkbox"]');

        // Проверяем, что все поля существуют
        if (!fioInput || !phoneInput || !requestInput) {
            showNotification('❌ Ошибка: не найдены поля формы. Добавьте атрибуты name="fio", name="phone", name="request"', false);
            console.error('Поля не найдены. Проверьте атрибуты name.');
            return;
        }

        const fio = fioInput.value.trim();
        const phone = phoneInput.value.trim();
        const request = requestInput.value.trim();

        if (!fio || !phone || !request) {
            showNotification('⚠️ Пожалуйста, заполните все поля!', false);
            return;
        }

        // Блокируем кнопку, чтобы избежать повторных кликов
        const submitBtn = form.querySelector('input[type="submit"]');
        const originalText = submitBtn ? submitBtn.value : 'Отправить';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.value = 'Отправка...';
        }

        try {
            const response = await fetch('https://assss.app.n8n.cloud/webhook/bakery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fio, phone, request })
            });

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const result = await response.json();

            // Успешная отправка
            showNotification('✅ ' + (result.message || 'Спасибо! Ваш заказ принят!'));
            
            // Очищаем форму
            form.reset();
            if (checkbox) checkbox.checked = false;

        } catch (error) {
            console.error('Ошибка отправки:', error);
            showNotification('❌ Ошибка соединения. Попробуйте позже.', false);
        } finally {
            // Возвращаем кнопку в исходное состояние
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.value = originalText;
            }
        }
    });
});