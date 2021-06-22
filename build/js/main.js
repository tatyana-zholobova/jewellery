/* global Swiper:readonly */

'use strict';

var page = document.querySelector('.page-body');
var header = document.querySelector('.header');
var burger = document.querySelector('.header__burger');
var buttonLogin = document.querySelector('.header__link--login');
var modalLogin = document.querySelector('.modal--log-in');
var modalCart = document.querySelector('.modal--cart');
var loginForm = document.querySelector('.log-in__form');
var buttonMenuLogin = document.querySelector('.header__menu-login');
var emailInput = document.querySelector('#log-in-email');
var passwordInput = document.querySelector('#log-in-password');
var buttonFilter = document.querySelector('.filter__button');
var filter = document.querySelector('.filter__wrapper');
var buttonCloseFilter = document.querySelector('.filter__close');
var buttonAddToCart = document.querySelector('.product-info__button');
var accordionOneOpenTab = document.querySelector('.accordion--one-open-tab');
var accordionMultiplOpenTabs = document.querySelector('.accordion--multiple-open-tabs');
var accordionHeaders = document.querySelectorAll('.accordion__header button');

var isStorageSupport = true;
var emailStorage = '';

if (page.classList.contains('no-js')) {
  page.classList.remove('no-js');
}

// localStorage

try {
  emailStorage = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

if (loginForm) {
  loginForm.addEventListener('submit', function (evt) {
    if (!emailInput.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('email', emailInput.value);
      }
    }
  });
}

// Меню, модальные окна
function toggleMenu() {
  header.classList.toggle('header--open-menu');
  page.classList.toggle('page-body--overlay');
}

if (burger) {
  burger.addEventListener('click', toggleMenu);
}

function openModal(modal) {
  modal.classList.add('modal--open');
  page.classList.add('page-body--overlay');
}

function closeModal(modal) {
  modal.classList.remove('modal--open');
  page.classList.remove('page-body--overlay');
}


function closeModalOnClickEsc(modal) {
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (modal.classList.contains('modal--open')) {
        evt.preventDefault();
        closeModal(modal);
      }
    }
  });
}

function closeModalOnClickClose(modal) {
  var buttonClose = modal.querySelector('.modal__close');
  buttonClose.addEventListener('click', function () {
    closeModal(modal);
  });
}

function closeModalOnClickOverlay(modal) {
  modal.addEventListener('click', function (evt) {
    if (!evt.target.closest('.modal__content')) {
      closeModal(modal);
    }
  });
}

if (buttonLogin && modalLogin) {
  buttonLogin.addEventListener('click', function (evt) {
    evt.preventDefault();
    openModal(modalLogin);

    if (emailStorage) {
      emailInput.value = emailStorage;
      passwordInput.focus();
    } else {
      emailInput.focus();
    }

    closeModalOnClickOverlay(modalLogin);
    closeModalOnClickEsc(modalLogin);
    closeModalOnClickClose(modalLogin);
  });
}

if (buttonMenuLogin && modalLogin) {
  buttonMenuLogin.addEventListener('click', function (evt) {
    evt.preventDefault();
    toggleMenu();
    openModal(modalLogin);

    if (emailStorage) {
      emailInput.value = emailStorage;
      passwordInput.focus();
    } else {
      emailInput.focus();
    }

    closeModalOnClickOverlay(modalLogin);
    closeModalOnClickEsc(modalLogin);
    closeModalOnClickClose(modalLogin);
  });
}

if (buttonAddToCart && modalCart) {
  buttonAddToCart.addEventListener('click', function (evt) {
    evt.preventDefault();
    openModal(modalCart);

    closeModalOnClickOverlay(modalCart);
    closeModalOnClickEsc(modalCart);
    closeModalOnClickClose(modalCart);
  });
}

// Слайдер
var swiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerGroup: 4,
  spaceBetween: 30,
  autoHeight: true,
  breakpoints: {

    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      pagination: {
        type: 'fraction'
      },
    },

    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      pagination: {
        type: 'bullets'
      },
    },

    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      pagination: {
        type: 'bullets'
      },
      allowTouchMove: false,
    },
  },

  pagination: {
    el: '.slider__pagination',
    bulletClass: 'slider__bullet',
    bulletActiveClass: 'slider__bullet--active',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
    renderFraction: function (currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' +
        '<span>of</span>' +
        '<span class="' + totalClass + '"></span>';
    }
  },

  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
  },

});

swiper.init();

// Аккордеон
if (accordionOneOpenTab && accordionHeaders) {
  accordionHeaders.forEach(function (item) {
    item.addEventListener('click', function () {
      var parent = item.closest('.accordion__item');
      if (parent.classList.contains('accordion__item--active')) {
        parent.classList.remove('accordion__item--active');
      } else {
        document.querySelectorAll('.accordion__item').forEach(function (child) {
          child.classList.remove('accordion__item--active');
        });
        parent.classList.add('accordion__item--active');
      }
    });
  });
}

if (accordionMultiplOpenTabs && accordionHeaders) {
  accordionHeaders.forEach(function (item) {
    item.addEventListener('click', function () {
      var parent = item.closest('.accordion__item');
      parent.classList.toggle('accordion__item--active');
    });
  });
}


// Открытие, закрытие фильтра
function closeFilter() {
  filter.classList.remove('filter__wrapper--open');
  page.classList.remove('page-body--block');
}

if (buttonFilter && filter) {
  buttonFilter.addEventListener('click', function () {
    filter.classList.add('filter__wrapper--open');
    page.classList.add('page-body--block');
  });

  buttonCloseFilter.addEventListener('click', closeFilter);

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (filter.classList.contains('filter__wrapper--open')) {
        evt.preventDefault();
        closeFilter();
      }
    }
  });

  page.addEventListener('click', function (evt) {
    var target = evt.target;
    var isFilter = target === filter || filter.contains(target);
    var isButtonFilter = target === buttonFilter;
    var isActiveFilter = filter.classList.contains('filter__wrapper--open');

    if (!isFilter && !isButtonFilter && isActiveFilter) {
      closeFilter();
    }
  });
}
