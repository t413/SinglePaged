/*
 * RVerify.js v0.1.2
 * (c) 2020 Feng L.H.
 * Released under the MIT License.
 */
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.RVerify = factory();
  }
})(this, function () {
  'use strict';

  var RVerify = {};

  RVerify.version = '0.1.1';

  var Settings = {
    mask: 0.5,
    maskClosable: false,
    closeIcon:
      '<svg t="1590331085919" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3734" width="20" height="20"><path d="M512 451.67l225.835-225.835a42.667 42.667 0 0 1 60.33 60.33L572.331 512l225.834 225.835a42.667 42.667 0 0 1-60.33 60.33L512 572.331 286.165 798.165a42.667 42.667 0 1 1-60.33-60.33L451.669 512 225.835 286.165a42.667 42.667 0 0 1 60.33-60.33L512 451.669z" p-id="3735" fill="#8a8a8a"></path></svg>',
    sliderIcon:
      '<svg t="1590338601818" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6547" width="20" height="20"><path d="M512.299934 1023.800044c-10.797617 0-21.595234-3.999117-29.993381-11.797396-17.496139-16.496359-18.195984-44.090269-1.799602-61.586408l412.508958-437.10353c8.398147-8.898036 8.298169-23.894726-0.599868-32.692784L481.606708 74.409578c-17.096227-16.896271-17.296183-44.490181-0.299934-61.586408 16.896271-16.896271 44.390203-17.196205 61.586408-0.299934l410.809333 406.11037c42.290666 41.790777 43.590379 111.075485 2.699404 154.465909l-412.508958 437.003552c-8.69808 9.097992-20.195543 13.696977-31.593027 13.696977z" p-id="6548"></path><path d="M86.093999 924.821889c-10.697639 0-21.495256-3.999117-29.793425-11.897374-17.496139-16.496359-18.295962-44.090269-1.799603-61.586408l315.930274-334.626147c8.398147-9.097992 8.298169-24.094682-0.599868-32.792762L55.500751 173.587689c-16.996249-16.896271-17.196205-44.490181-0.299934-61.686386 16.896271-16.996249 44.390203-17.296183 61.586408-0.199956L431.017873 422.032856c42.290666 41.790777 43.490402 111.075485 2.799382 154.465909l-315.930273 334.626147c-8.69808 9.097992-20.195543 13.696977-31.792983 13.696977z" p-id="6549"></path></svg>',
    extraIcon:
      '<svg t="1590289223124" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2770" width="15" height="15"><path d="M512.002558 64.24521c-247.292176 0-447.75786 200.464661-447.75786 447.756837 0 247.287059 200.464661 447.752744 447.75786 447.752744 247.286036 0 447.75172-200.464661 447.75172-447.752744C959.754279 264.710894 759.288594 64.24521 512.002558 64.24521zM512.010745 735.87586c-20.602224 0-37.319977-16.718777-37.319977-37.323047 0-20.597107 16.717753-37.319977 37.319977-37.319977 20.60427 0 37.297464 16.72287 37.297464 37.319977C549.308209 719.158107 532.613992 735.87586 512.010745 735.87586zM549.308209 567.969733c0 20.600177-16.693194 37.293371-37.297464 37.293371-20.602224 0-37.319977-16.693194-37.319977-37.293371L474.690768 325.420581c0-20.605294 16.717753-37.297464 37.319977-37.297464 20.60427 0 37.297464 16.693194 37.297464 37.297464L549.308209 567.969733z" p-id="2771" fill="#4E6EF2"></path></svg>',
    tolerance: 10,
    duration: 500,
    title: '身份验证',
    text: '拖动滑块，使图片角度为正',
    extra: null,
    extraColor: '#4E6EF2',
    extraLink: 'https://github.com/zpfz',
    zIndex: 9999,
    album: [],
  };

  var checkFlag = false;

  // Configure
  RVerify.configure = function (options) {
    checkFlag = true;
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)){
        Settings[key] = value;
      }
    }
    return this;
  };

  // Action
  RVerify.action = function (callback) {
    if (!checkFlag){
      throw new Error('Please make sure RVerify.configure method is executed before RVerify.action');
    }

    if (Settings.extra !== null && typeof Settings.extra !== 'undefined') {
      var _extra;
      _extra =
        '<div class="rv-extra"><span>' +
        Settings.extraIcon +
        '</span><a href="' +
        Settings.extraLink +
        '" target="_blank" rel="noopener noreferrer">' +
        Settings.extra +
        '</a></div>';
    } else {
      _extra = '';
    }

    var modal =
      '<div class="rv-root"><div class="rv-mask"></div><div class="rv-wrap"><div class="rv-close">' +
      Settings.closeIcon +
      '</div><div class="rv-title">' +
      Settings.title +
      '</div><div class="rv-content"><div class="rv-text">' +
      Settings.text +
      '</div><div class="rv-image"><img src="' +
      getRandomImg(Settings.album) +
      '" draggable="false" class="rv-img"><div class="rv-image-mask"><svg t="1590812400512" class="rv-image-mask-success" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="80" height="80"><path d="M927.97968 108.360629a50.575037 50.575037 0 0 0-69.085501 18.517689l-391.898737 678.933747-316.000056-182.409708A50.575037 50.575037 0 0 0 100.427574 711.005546l359.812488 207.690002a50.553362 50.553362 0 0 0 69.078276-18.517689L946.504593 177.44613a50.575037 50.575037 0 0 0-18.524913-69.085501z" fill="#ffffff" p-id="2648"></path></svg><svg t="1590815914523" class="rv-image-mask-error" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3574" width="80" height="80"><path d="M441.23 511.44L79.4 149.62c-17.44-19.25-16.72-48.81 1.65-67.18 18.38-18.37 47.93-19.1 67.18-1.65l361.83 361.82L871.89 80.79a48.718 48.718 0 0 1 47.95-14.55 48.725 48.725 0 0 1 35.43 35.43 48.728 48.728 0 0 1-14.54 47.95L578.89 511.44l361.83 361.83a48.734 48.734 0 0 1 14.54 47.95 48.709 48.709 0 0 1-35.43 35.43 48.768 48.768 0 0 1-47.95-14.55L510.06 580.27 148.23 942.1c-19.25 17.44-48.8 16.72-67.18-1.65-18.37-18.37-19.09-47.93-1.65-67.18l361.83-361.83z" p-id="3575" fill="#ffffff"></path></svg></div></div><div class="rv-control"><div class="rv-bar">' +
      '</div><div class="rv-slider">' +
      Settings.sliderIcon +
      '</div></div>' +
      _extra +
      '</div></div></div>';

    var createNode = document.createElement('div');
    createNode.innerHTML = modal;
    $('#main > nav').appendChild(createNode);

    var root = $('.rv-root'),
      bar = $('.rv-bar'),
      slider = $('.rv-slider'),
      close = $('.rv-close'),
      img = $('.rv-img'),
      control = $('.rv-control'),
      wrap = $('.rv-wrap'),
      mask = $('.rv-mask'),
      maskImg = $('.rv-image-mask'),
      maskSuccess = $('.rv-image-mask-success'),
      maskError = $('.rv-image-mask-error'),
      footer = $('.rv-extra');

    var distance = bar.offsetWidth - slider.offsetWidth;
    // Flag
    var result = 0;

    // Check isMobile and bind different events
    var touchMove,
      inMobile = isMobile(),
      downX,
      touching = false;
    if (isMobile()) {
      slider.ontouchstart = touchStart;
      document.ontouchmove = touchMove;
      document.ontouchend = touchEnd;
    } else {
      slider.onmousedown = touchStart;
      document.onmousemove = touchMove;
      document.onmouseup = touchEnd;
    }

    // Init
    mask.style['background-color'] = 'rgba(0, 0, 0,' + Settings.mask + ')';
    mask.style['z-index'] = Settings.zIndex;
    wrap.style['z-index'] = Settings.zIndex;
    img.style.transform = 'rotate(' + RandomAngle(Settings.tolerance) + 'deg)';
    if (Settings.extra !== null && typeof Settings.extra !== 'undefined') {
      footer.style.color = Settings.extraColor;
    }

    var currentAngle = getImgAngle();

    // Close
    close.onclick = function () {
      result = 2;
      root.parentNode.remove();
      callback(result);
    };

    // Mask
    mask.onclick = function () {
      if (Settings.maskClosable == true) {
        result = 2;
        root.parentNode.remove();
        callback(result);
      }
    };

    // Touch Move
    function touchMove(e) {
      if (!touching) return;
      var e = e || window.event;
      var moveX = inMobile ? e.touches[0].clientX : e.clientX;
      var offsetX = moveX - downX;
      var targetAngle = (offsetX / distance) * 360;

      if (offsetX > distance) {
        offsetX = distance;
      } else if (offsetX < 0) {
        offsetX = 0;
      } else {
        slider.style.left = offsetX + 'px';
        targetAngle = currentAngle + targetAngle;
        img.style.transform = 'rotate(' + targetAngle + 'deg)';
      }
    }

    // Touch Start
    function touchStart(e) {
      // Clear transition
      slider.style.transition = '';
      img.style.transition = '';
      slider.classList.add('rv-slider-normal');

      var e = e || window.event;
      downX = inMobile ? e.touches[0].clientX : e.clientX;
      touching = true;
    }

    // Touch End
    function touchEnd() {
      slider.classList.remove('rv-slider-normal');

      if (!touching) return;
      if (ReturnResult(getImgAngle())) {
        maskImg.style.cssText = 'visibility: visible;opacity: 1';
        maskSuccess.style.cssText = 'visibility: visible;opacity: 1';
        slider.style['pointer-events'] = 'none';
        slider.classList.add('rv-slider-success');

        // Call back
        setTimeout(function () {
          result = 1;
          root.parentNode.remove();
          callback(result);
        }, Settings.duration);
      } else {
        maskImg.style.cssText = 'visibility: visible;opacity: 1';
        maskError.style.cssText = 'visibility: visible;opacity: 1';
        slider.style['pointer-events'] = 'none';
        control.style.animation = 'shake .15s infinite';
        slider.classList.add('rv-slider-error');
        setTimeout(function () {
          img.src = getRandomImg(Settings.album);
          maskImg.style.cssText = '';
          maskError.style.cssText = '';
          slider.classList.remove('rv-slider-error');
          control.style.animation = '';
          slider.style.left = 0;
          img.style.transform = 'rotate(' + RandomAngle(Settings.tolerance) + 'deg)';
          currentAngle = getImgAngle();
          slider.style.transition =
            'background .2s ease-in-out,border-color .2s ease-in-out,box-shadow .2s ease-in-out,left .5s ease-in-out';
          img.style.transition = 'transform .5s ease-in-out';
          slider.style['pointer-events'] = '';
        }, 500);
        callback(result);
      }
      touching = false;
    }
  };

  // Random number
  function getRandomNumber(a, b) {
    return Math.round(Math.random() * (b - a) + a);
  }

  // Random image
  function getRandomImg(imgArr) {
    return imgArr[getRandomNumber(0, imgArr.length - 1)];
  }
  // Random interval
  function RandomAngle(tolerance) {
    if (tolerance < 5 || tolerance > 45) {
      console.error('Please make sure the tolerance value is between 5°~45°.');
    } else {
      return (
        Math.floor(Math.random() * (360 - tolerance - 1 - (tolerance + 1))) +
        (tolerance + 1)
      );
    }
  }

  // Get image angle
  function getImgAngle() {
    return parseFloat(
      $('.rv-img').style['transform'].replace(/[^0-9\\.\\^0-9]/gi, '')
    );
  }

  // Check result
  function ReturnResult(angle) {
    if (angle > 360) {
      angle = angle - 360;
      return VerifyAngle(angle);
    } else {
      return VerifyAngle(angle);
    }
  }
  // Verify angle
  function VerifyAngle(angle) {
    if (angle <= Settings.tolerance || angle >= 360 - Settings.tolerance) {
      return true;
    } else {
      return false;
    }
  }

  // Check isMobile
  function isMobile() {
    return 'ontouchstart' in window;
  }

  // Global query selector
  var $ = function (selector) {
    return document.querySelector(selector);
  };

  if (typeof window !== 'undefined') {
    window.RVerify = RVerify;
  }

  return RVerify;
});
