const swiper2 = new Swiper('.swiper.timeline', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: '3',
    centeredSlides: true,
    slidesPerGroup: 1, // Moves one slide per click
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    loop: false,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
swiper2.on('slideChange', function () {
    // Clear the custom class from all slides first
    swiper2.slides.forEach(slide => {
        slide.classList.remove('custom-class-left-of-prev');
        slide.classList.add('padding-top');
    });
    // Find the index of the slide with class 'swiper-slide-prev'
    const prevSlideIndex = Array.from(swiper2.slides).findIndex(slide =>
        slide.classList.contains('swiper-slide-prev')
    );
    // Iterate over all slides up to and including the one with 'swiper-slide-prev'
    // and add a custom class to them
    for (let i = 0; i <= prevSlideIndex; i++) { // Note the <= to include swiper-slide-prev
        swiper2.slides[i].classList.add('custom-class-left-of-prev');
        swiper2.slides[i].classList.remove('padding-top');
    }
});
swiper2.on('reachEnd', function () {
    swiper2.autoplay.stop();
});
document.querySelector('.swiper-button-next').addEventListener('click', function () {
    if (!swiper2.isEnd) { // Check if it's not the last slide
        swipe2.autoplay.start();
    }
});
document.querySelector('.swiper-button-prev').addEventListener('click', function () {
    if (!swiper2.isEnd) { // Check if it's not the last slide
        swiper2.autoplay.start();
    }
});
swiper2.on('reachEnd', function () {
    console.log('Reached the last slide');
    swiper2.autoplay.stop();
});

const swiper = new Swiper('.timeline-mobile', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: '1',
    centeredSlides: true,
    slidesPerGroup: 1, // Moves one slide per click
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    loop: false,
    // If we need pagination
    centeredSlides: true, // Center the slides

    pagination: {
        el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
swiper.on('slideChange', function () {
    // Clear the custom class from all slides first
    swiper.slides.forEach(slide => {
        slide.classList.remove('custom-class-left-of-prev');
        slide.classList.add('padding-top');
    });
    // Find the index of the slide with class 'swiper-slide-prev'
    const prevSlideIndex = Array.from(swiper.slides).findIndex(slide =>
        slide.classList.contains('swiper-slide-prev')
    );
    // Iterate over all slides up to and including the one with 'swiper-slide-prev'
    // and add a custom class to them
    for (let i = 0; i <= prevSlideIndex; i++) { // Note the <= to include swiper-slide-prev
        swiper.slides[i].classList.add('custom-class-left-of-prev');
        swiper.slides[i].classList.remove('padding-top');
    }
});
swiper.on('reachEnd', function () {
    swiper.autoplay.stop();
});
document.querySelector('.swiper-button-next').addEventListener('click', function () {
    if (!swiper.isEnd) { // Check if it's not the last slide
        swiper.autoplay.start();
    }
});
document.querySelector('.swiper-button-prev').addEventListener('click', function () {
    if (!swiper.isEnd) { // Check if it's not the last slide
        swiper.autoplay.start();
    }
});
swiper.on('reachEnd', function () {
    console.log('Reached the last slide');
    swiper.autoplay.stop();
});