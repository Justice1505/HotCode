(function () {
  'use strict';

  var upDownBtn = document.querySelector('.up_down_btn');
  var check;

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      upDownBtn.classList.add('up_down_btn-show');
      upDownBtn.innerHTML = '&uarr;';
      upDownBtn.setAttribute('title', 'Наверх');
      check = false;
    }
    if (scrolled === 0) {
      upDownBtn.innerHTML = '&darr;';
      upDownBtn.setAttribute('title', 'Вниз');
      check = true;
    }
  }

  function backToTop() {
    upDownBtn.classList.add('up_down_btn-disabled');
    if (!check) {
      (function goTop() {
        if (window.pageYOffset !== 0) {
          window.scrollBy(0, -80);
          setTimeout(goTop, 0);
        }
      })();
      return;
    }
  }

  window.addEventListener('scroll', trackScroll);
  upDownBtn.addEventListener('click', backToTop);
})();
