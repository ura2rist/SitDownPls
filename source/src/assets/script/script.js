import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid'
import * as url from '../image/map.svg';

window.addEventListener('DOMContentLoaded', function() {

  // Drop down меню селект

  const dropdown = document.querySelectorAll('.dropdown');

  dropdown.forEach(function(menu) {
    menu.querySelector('.dropdown__select').addEventListener('click', function(event) {
      menu.querySelector('.dropdown__list').classList.toggle('dropdown__list_active');

      menu.querySelector('.dropdown__list').addEventListener('click', function(event) {
        menu.querySelector('.dropdown__enter').textContent = event.target.textContent;
        menu.querySelector('.dropdown__element_select') && menu.querySelector('.dropdown__element_select').classList.remove('dropdown__element_select');
        event.target.classList.add('dropdown__element_select');
        menu.querySelector('.dropdown__list').classList.remove('dropdown__list_active');
      });

      window.addEventListener('click', function(event) {
        const withinBoundaries = event.composedPath().includes(menu);

        if (!withinBoundaries) {
          menu.querySelector('.dropdown__list').classList.remove('dropdown__list_active');
        }
      })
    });
  });

  // Drop down меню спойлер

  // Меню шапка

  const menuHeaderButton = document.querySelector('.header__menu-button');
  const menuHeader = document.querySelector('.menu-mob');
  const heightDiv = document.querySelector('.menu-mob').offsetHeight;

  menuHeader.dataset.height = heightDiv;
  menuHeader.style.height = 0;
  menuHeader.style.paddingBottom = 0;

  window.addEventListener('resize', function() {
    menuHeader.style.paddingBottom = '60px';
    menuHeader.style.height = 'auto';
    menuHeader.dataset.height = document.querySelector('.menu-mob').offsetHeight;
    menuHeader.style.height = 0;
    menuHeader.style.paddingBottom = 0;
  });

  menuHeaderButton.addEventListener('click', function() {
    const close = document.querySelector('.menu-close');

    menuHeader.style.height = menuHeader.dataset.height + 'px';

    menuHeader.classList.add('menu-mob_active');

    close.addEventListener('click', function() {
      menuHeader.style.height = 0;
      menuHeader.classList.remove('menu-mob_active');
    });
  });

  // Слайдер banner

  const swiper = new Swiper('.banner__swiper', {
    modules: [ Navigation, Pagination, Autoplay ],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.banner__swiper-pagination',
      renderBullet: function (swiper, current, total) {
        return `<span class="${ current }">
        <svg class="progress-ring" viewBox="0 0 24 24" width="24" height="24" fill="none">
          <circle class="circle-white" cx="12" cy="12" r="10" stroke="#fff" stroke-width="2"></circle>
          <circle class="circle-orange" cx="12" cy="12" r="10" stroke="#FF862F" stroke-width="3" style="transform-origin: center center; transform: rotate(90deg) scaleX(-1);"></circle>
        </svg>
          </span>`;
      },
      bulletClass: 'banner__swiper-pagination-bullet',
      bulletActiveClass : 'banner__swiper-pagination-bullet-active'
    },
  });

  // Слайдер special

  const swiperSpecial = new Swiper(".special__slide", {
    modules: [ Navigation ],
    slidesPerView: 1,
    spaceBetween: 32,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".special__swiper-button-next",
      prevEl: ".special__swiper-button-prev",
    },
    breakpoints: {
      710: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      920: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        slidesPerView: 'auto',
      }
    }
  });

  // Высокий рейтинг

  const buttonShow = document.querySelector('.rating__show');
  
  if(buttonShow) {
    buttonShow.addEventListener('click', function() {
      const card = document.querySelectorAll('.rating__card');
  
      buttonShow.style.display = 'none';
  
      card.forEach(function(item){
        if(window.getComputedStyle(item).getPropertyValue('opacity') == 0) {
          item.classList.add('rating__card_active');
        }
      });
    });
  }

  // Слайдер главная низ

  const swiperUseful = new Swiper(".useful__slide", {
    modules: [ Navigation ],
    slidesPerView: 1,
    spaceBetween: 32,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".useful__swiper-button-next",
      prevEl: ".useful__swiper-button-prev",
    },
    breakpoints: {
      710: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      920: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      }
    }
  });

  // Отправка формы

  const buttonFeedback = document.querySelector('.feedback__submit'); 

  if(buttonFeedback) {
    buttonFeedback.addEventListener('click', function(event) {
      event.preventDefault();
  
      const form = event.currentTarget.closest('form');
      const empty = checkEmptyInput(form.querySelectorAll('.form__req'));
      const mail = validateMail(form.querySelector('.form__email'));
      const check = validateCheck(form.querySelectorAll('.form__req-check'));
      
      if(empty && mail && check) {
        document.querySelector('.feedback-request').classList.add('popup_active');
        
        form.querySelectorAll('.form__req').forEach(function(item) {
          item.value = '';
        });
  
        form.querySelectorAll('.form__req-check').forEach(function(item) {
          item.checked = false;
        });
  
        document.querySelector('.popup__close').addEventListener('click', function() {
          document.querySelector('.feedback-request').classList.remove('popup_active');
        });
      }
    })
  }

  // Проверка чекбокса

  function validateCheck(check) {
    let status = true;

    check.forEach(function(item) {
      if(item.closest('.checkbox').querySelector('.checkbox__check').classList.contains('form__input_error')) item.closest('.checkbox').querySelector('.checkbox__check').classList.remove('form__input_error');

      if(!item.checked) {
        item.closest('.checkbox').querySelector('.checkbox__check').classList.add('form__input_error');

       status = false;
      }
    });

    return status;
  }

  // Проверка на пустоту 

  function checkEmptyInput(reqForm) {
    let status = true;

    reqForm.forEach(function(item) {
      if(item.classList.contains('form__input_error')) item.classList.remove('form__input_error');

      if(item.value.trim() === '') {
        item.classList.add('form__input_error');

        status = false;
      }
    });

    return status;
  }

  // Валидация имя

  const nameForm = document.querySelectorAll('.form__name');

  nameForm.forEach(function(item) {
    item.addEventListener('input', function(event) {
      event.currentTarget.value = event.currentTarget.value.replace(/[,.?!~@#/\d]/g,'');
    })
  });

  // Валидация почта

  function validateMail(email) {
    const reg = /.+@.+\..+/i;

    const address = email.value;

    if(reg.test(address) == false) {
      email.classList.add('form__input_error');

      return false;
    }

    return true;
  }

  // Маска телефона

  function eventCalllback(e) {
    let el = e.target,
      clearVal = el.dataset.phoneClear,
      pattern = el.dataset.phonePattern,
      matrix_def = "+7(___) ___-__-__",
      matrix = pattern ? pattern : matrix_def,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = e.target.value.replace(/\D/g, "");

    if (clearVal !== 'false' && e.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        e.target.value = '';
        return;
      }
    }

    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
  }

  let phone_inputs = document.querySelectorAll('[data-phone-pattern]');

  for (let elem of phone_inputs) {
      for (let ev of ['input', 'blur', 'focus']) {
          elem.addEventListener(ev, eventCalllback);
      }
  }

  // Range slider

  const rangeSliderInit = () => { // создаем функцию инициализации слайдера
    const range = document.getElementById('range'); // Ищем слайдер
    const inputMin = document.getElementById('min'); // Ищем input с меньшим значнием
    const inputMax = document.getElementById('max'); // Ищем input с большим значнием
  
    if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок
  
    const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
    
    noUiSlider.create(range, { // инициализируем слайдер
        start: [2000, 150000], // устанавливаем начальные значения
        connect: true, // указываем что нужно показывать выбранный диапазон
        range: { // устанавливаем минимальное и максимальное значения
          'min': 0,
          'max': 200000
        },
        step: 1, // шаг изменения значений
      }
    )
    
    range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
      inputs[handle].value = parseInt(values[handle]);
    });
    
    inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
      range.noUiSlider.set([this.value, null]);
    });
    
    inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
      range.noUiSlider.set([null, this.value]);
    });
    
  }

  rangeSliderInit();

  // Пагинация каталог

  const pagButton = document.querySelectorAll('.pagination__element');

  if(pagButton) {
    pagButton.forEach(function(item) {
      item.addEventListener('click', function(event) {
        if(event.currentTarget.classList.contains('pagination__element_active')) return;
        
        const catalog = document.querySelectorAll('.catalog-block__card'); // Все карточки
        const click = Number(event.currentTarget.textContent);    // номер страницы
        let page = 0;     // Сколько карточек показывается на странице
        let result;
          
        document.querySelector('.pagination__element_active').classList.remove('pagination__element_active');

        event.currentTarget.classList.add('pagination__element_active');

        catalog.forEach(function(item) {
          if(window.getComputedStyle(item).getPropertyValue('display') === 'flex') {
            page++;
          }
        });
      
        result = Array.from(catalog).slice((click * page) - page, click * page);

        catalog.forEach(function(item) {
          item.style.display = 'none';
        });

        result.forEach(function(item) {
          item.style.display = 'flex';
        });
      });
    });
  }

  // Каталог меню

  window.addEventListener('resize', function() {
    if(Number(window.innerWidth) <= 1200) {
      menuCatalogSpoiler();
    }
  });

  function menuCatalogSpoiler() {
    const menuCatalog = document.querySelectorAll('.catalog-block__filter-element');

    menuCatalog.forEach(function(item) {
      item.addEventListener('click', function(event) {
        if(item.classList.contains('filter_active')) {
          item.classList.remove('filter_active');
        } else {
          document.querySelectorAll('.filter_active').forEach(function(item) {
            item.classList.remove('filter_active');
          });
  
          item.classList.add('filter_active');
        }
      });
    });
  }

  menuCatalogSpoiler();

  // Слайдер продукт

  const swiperFirst = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 2.5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      710: {
        direction: 'vertical',
        slidesPerView: 4,
      },
      920: {
        direction: 'horizontal',
        slidesPerView: 4,
      },
    }
  });

  const swiperSecond = new Swiper(".mySwiper2", {
    modules: [ Thumbs ],
    spaceBetween: 10,
    thumbs: {
      swiper: swiperFirst,
    },
  });

  // Слайдер похожие

  const swiperSimilar = new Swiper('.similar__slide', {
    modules: [ Navigation ],
    slidesPerView: 1,
    spaceBetween: 32,
    slidesPerGroup: 1,
    navigation: {
      nextEl: ".special__swiper-button-next",
      prevEl: ".special__swiper-button-prev",
    },
    breakpoints: {
      710: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      920: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    }
  });

  // Купить в один клик

  const buy = document.querySelector('.product__name-buy');

  if(buy){
    buy.addEventListener('click', function() {
      document.querySelector('.buy-request').classList.add('popup_active');
  
      const buttonRequest = document.querySelector('.buy-request__submit'); 
  
      if(buttonRequest) {
        buttonRequest.addEventListener('click', function(event) {
          event.preventDefault();
      
          const form = event.currentTarget.closest('form');
          const empty = checkEmptyInput(form.querySelectorAll('.form__req'));
          const check = validateCheck(form.querySelectorAll('.form__req-check'));
          
          if(empty && check) {
            document.querySelector('.buy-request').classList.remove('popup_active');
            document.querySelector('.feedback-request').classList.add('popup_active');
            
            form.querySelectorAll('.form__req').forEach(function(item) {
              item.value = '';
            });
      
            form.querySelectorAll('.form__req-check').forEach(function(item) {
              item.checked = false;
            });
      
            document.querySelector('.feedback-request .popup__close').addEventListener('click', function() {
              document.querySelector('.feedback-request').classList.remove('popup_active');
            });
          }
        })
      }
  
      document.querySelector('.popup__close').addEventListener('click', function() {
        document.querySelector('.buy-request').classList.remove('popup_active');
      });
    });
  }

  // Слайдер попап

  const popupSlider = document.querySelector('.product-slider');

  if(popupSlider) {
    popupSlider.addEventListener('click', function() {
      document.querySelector('.popup-slider').classList.add('popup_active');
  
      document.querySelector('.popup-slider .popup__close').addEventListener('click', function() {
        document.querySelector('.popup-slider').classList.remove('popup_active');
      });
    });
  }

  const popupSwiperFirst = new Swiper(".popupMySwiper", {
    modules: [ Navigation ],
    spaceBetween: 10,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".popupSpecial__swiper-button-next",
      prevEl: ".popupSpecial__swiper-button-prev",
    },
    breakpoints: {
      710: {
        slidesPerView: 2,
      },
      920: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    }
  });

  const popupSwiperSecond = new Swiper(".popupMySwiper2", {
    modules: [ Thumbs ],
    spaceBetween: 10,
    thumbs: {
      swiper: popupSwiperFirst,
    },
  });

  // Карта

  if(document.getElementById('map-1')) {
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map('map-1', {
            center: [55.75154826518352,37.64044248249479],
            zoom: 16,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });
  
        var placemark = new ymaps.Placemark(myMap.getCenter(), {
            // Зададим содержимое заголовка балуна.
            balloonContentHeader: '<div class="map-ball"><h2 class="map__title">SitDownPls на Солянке</h2><br>' +
                '<p class="map__address">м. Китай-город, ул. Солянка, д.24</p>' +
                '<p class="map__mob"><a href="tel:+74958854547" class="tel"><span class="tel__icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3425 12.0983C15.215 12.0983 14.1242 11.915 13.1067 11.585C12.7858 11.475 12.4283 11.5575 12.1808 11.805L10.7417 13.6108C8.1475 12.3733 5.71833 10.0358 4.42583 7.35L6.21333 5.82833C6.46083 5.57167 6.53417 5.21417 6.43333 4.89333C6.09417 3.87583 5.92 2.785 5.92 1.6575C5.92 1.1625 5.5075 0.75 5.0125 0.75H1.84083C1.34583 0.75 0.75 0.97 0.75 1.6575C0.75 10.1733 7.83583 17.25 16.3425 17.25C16.9933 17.25 17.25 16.6725 17.25 16.1683V13.0058C17.25 12.5108 16.8375 12.0983 16.3425 12.0983Z" fill="#FF862F"/></svg></span>+7 (495) 885-45-47</a></p>',
            // Зададим содержимое основной части балуна.
            balloonContentBody: '<hr>' +
                '<p class="map__text"><span class="map__text-title">Часы работы</span>: с 10:00 до 21:00</p>' +
                '<hr>',
            // Зададим содержимое нижней части балуна.
            balloonContentFooter: '<p class="map__text"><span class="map__text-title">Что здесь:</span> шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</p></div>',
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: url.default,
          // Размеры метки.
          iconImageSize: [40, 52],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-20, -38]
        });

      var myPlacemarkWithContent = new ymaps.Placemark([55.7519897542927,37.64557206123679], {
        // Зададим содержимое заголовка балуна.
        balloonContentHeader: '<div class="map-ball"><h2 class="map__title">SitDownPls на Солянке</h2><br>' +
            '<p class="map__address">м. Китай-город, ул. Солянка, д.24</p>' +
            '<p class="map__mob"><a href="tel:+74958854547" class="tel"><span class="tel__icon"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3425 12.0983C15.215 12.0983 14.1242 11.915 13.1067 11.585C12.7858 11.475 12.4283 11.5575 12.1808 11.805L10.7417 13.6108C8.1475 12.3733 5.71833 10.0358 4.42583 7.35L6.21333 5.82833C6.46083 5.57167 6.53417 5.21417 6.43333 4.89333C6.09417 3.87583 5.92 2.785 5.92 1.6575C5.92 1.1625 5.5075 0.75 5.0125 0.75H1.84083C1.34583 0.75 0.75 0.97 0.75 1.6575C0.75 10.1733 7.83583 17.25 16.3425 17.25C16.9933 17.25 17.25 16.6725 17.25 16.1683V13.0058C17.25 12.5108 16.8375 12.0983 16.3425 12.0983Z" fill="#FF862F"/></svg></span>+7 (495) 885-45-47</a></p>',
        // Зададим содержимое основной части балуна.
        balloonContentBody: '<hr>' +
            '<p class="map__text"><span class="map__text-title">Часы работы</span>: с 10:00 до 21:00</p>' +
            '<hr>',
        // Зададим содержимое нижней части балуна.
        balloonContentFooter: '<p class="map__text"><span class="map__text-title">Что здесь:</span> шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</p></div>',
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: url.default,
      // Размеры метки.
      iconImageSize: [40, 52],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-20, -38]
    });
        // Добавим метку на карту.
        myMap.geoObjects.add(placemark).add(myPlacemarkWithContent);
    }
  }
});