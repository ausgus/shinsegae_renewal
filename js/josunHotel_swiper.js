// 모바일 카드 효과. 반환한 함수는 PC 화면으로 바뀔 때 실행해 정리해요.
function initRoomSwiper() {
  const roomSwiper = new Swiper('.room-slider', {
    effect: 'cards',
    grabCursor: true,
    cardsEffect: {
      slideShadows: false,
    },
  });

  return function () {
    roomSwiper.destroy(true, true);
  };
}

// 시설은 모든 화면에서 실행해요. 사진·LP·설명이 한 묶음으로 이동해요.
const facilityMobile = window.matchMedia('(max-width: 1099px)');

const facilitySwiper = new Swiper('.facility-list-wrap', {
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  spaceBetween: 32,
  speed: 600,
  grabCursor: true,
  autoplay: {
    enabled: facilityMobile.matches,
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  navigation: {
    prevEl: '.facility-prev',
    nextEl: '.facility-next',
  },
  a11y: {
    prevSlideMessage: '이전 시설',
    nextSlideMessage: '다음 시설',
  },
  breakpoints: {
    769: {
      spaceBetween: 48,
    },
    1100: {
      spaceBetween: 80,
    },
  },
});

// 화면 크기가 바뀔 때도 모바일·태블릿에서만 자동 재생해요.
facilityMobile.addEventListener('change', function () {
  facilitySwiper.params.autoplay.enabled = facilityMobile.matches;

  if (facilityMobile.matches) {
    facilitySwiper.autoplay.start();
  } else {
    facilitySwiper.autoplay.stop();
  }
});

// PC에서만 멤버십 캐러셀 실행하기
const membershipDesktop = window.matchMedia('(min-width: 1100px)');
const membershipSlider = document.querySelector('.membership-slider');
const membershipList = document.querySelector('.membership-card-list');
const membershipSlides = membershipList.querySelectorAll(':scope > li');
let membershipSwiper;

function updateMembershipSwiper() {
  if (membershipDesktop.matches && !membershipSwiper) {
    membershipSlider.classList.add('swiper');
    membershipList.classList.add('swiper-wrapper');
    membershipSlides.forEach(function (slide) {
      slide.classList.add('swiper-slide');
    });

    // 작은 카드도 빈 공간 없이 순환하도록 PC 전용 카드 복사하기
    membershipSlides.forEach(function (slide) {
      const copy = slide.cloneNode(true);
      copy.dataset.membershipCopy = 'true';
      membershipList.appendChild(copy);
    });

    membershipSwiper = new Swiper(membershipSlider, {
      slidesPerView: 'auto',
      centeredSlides: true,
      initialSlide: 2,
      loop: true,
      spaceBetween: 100,
      speed: 600,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      on: {
        sliderFirstMove: function () {
          membershipSlider.classList.add('is-dragging');
        },
        touchEnd: function () {
          membershipSlider.classList.remove('is-dragging');
        },
      },
    });
  } else if (!membershipDesktop.matches && membershipSwiper) {
    membershipSwiper.destroy(true, true);
    membershipSwiper = undefined;
    membershipList.querySelectorAll('[data-membership-copy]').forEach(function (slide) {
      slide.remove();
    });
    membershipSlider.classList.remove('swiper', 'is-dragging');
    membershipList.classList.remove('swiper-wrapper');
    membershipSlides.forEach(function (slide) {
      slide.classList.remove('swiper-slide');
    });
    // 순환 중 바뀐 카드 순서를 원래 순서로 복원하기
    membershipSlides.forEach(function (slide) {
      membershipList.appendChild(slide);
    });
  }
}

updateMembershipSwiper();
membershipDesktop.addEventListener('change', updateMembershipSwiper);
