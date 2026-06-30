// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // ===== Баннер =====
    // Находим все точки пагинации
    const dots = document.querySelectorAll('.pagination__dot');
    
    // Массив с путями к разным рекламным изображениям
    const images = [
        'images/advertising.png',
        'images/advertising(1).png', 
        'images/advertising(2).png',
        'images/advertising(3).png',
        'images/advertising(4).png'
    ];
    
    // Находим изображение баннера
    const bannerImage = document.querySelector('.banner__image');
    let currentIndex = 0;
    let intervalId = null;

    // Функция переключения слайда
    function goToSlide(index) {
        // Убираем активный класс у всех точек
        dots.forEach(dot => dot.classList.remove('pagination__dot--active'));
        
        // Добавляем активный класс текущей точке
        dots[index].classList.add('pagination__dot--active');
        
        // Меняем изображение
        bannerImage.src = images[index];
        
        // Обновляем текущий индекс
        currentIndex = index;
    }

    // Добавляем обработчики кликов на точки
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Останавливаем автопрокрутку
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            goToSlide(index);
        });
    });

    // Автопрокрутка
    function startAutoPlay() {
        intervalId = setInterval(() => {
            let nextIndex = (currentIndex + 1) % images.length;
            goToSlide(nextIndex);
        }, 5000);
    }

    // Запускаем автопрокрутку
    startAutoPlay();

    // Останавливаем автопрокрутку при наведении на баннер
    const bannerWrapper = document.querySelector('.banner__wrapper');
    bannerWrapper.addEventListener('mouseenter', function() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    });

    // Возобновляем автопрокрутку при уходе мыши
    bannerWrapper.addEventListener('mouseleave', function() {
        startAutoPlay();
    });

    // ===== Корзина =====
    // Функция для обновления счетчика корзины
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        let count = 0;
        const items = document.querySelectorAll('.sale__item');
        items.forEach(item => {
            const btn = item.querySelector('.sale__add-btn');
            if (btn && btn.classList.contains('added')) {
                count++;
            }
        });
        cartCount.textContent = count;
    }

    // Обработчики для кнопок "добавить"
    document.querySelectorAll('.sale__add-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!this.classList.contains('added')) {
                this.classList.add('added');
                this.textContent = '✓';
                // Анимация добавления
                this.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            } else {
                this.classList.remove('added');
                this.textContent = 'добавить';
            }
            
            updateCartCount();
        });
    });

    // Инициализация счетчика при загрузке
    updateCartCount();
});