$(document).ready(function() {
  // 모바일 히어로: 현재 카드 번호에 맞춰 카드들을 함께 이동
  let heroIndex = 0;
  const heroList = $('.hero-cont-wrap > ul');
  const heroCards = heroList.children('li');
  const heroPrev = $('.mobile-nav-btn-wrap .prev');
  const heroNext = $('.mobile-nav-btn-wrap .next');

  function setHeroPosition() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      const heroStep = heroCards.first().outerWidth() + parseFloat(heroList.css('column-gap'));
      heroList.css('--hero-offset', -heroIndex * heroStep + 'px');
    } else {
      heroIndex = 0;
      heroList.css('--hero-offset', '0px');
    }

    heroPrev.toggleClass('is-disabled', heroIndex === 0);
    heroNext.toggleClass('is-disabled', heroIndex === heroCards.length - 1);
  }

  heroPrev.on('click', function() {
    if (!window.matchMedia('(max-width: 768px)').matches || heroIndex === 0) return;
    heroIndex--;
    setHeroPosition();
  });

  heroNext.on('click', function() {
    if (!window.matchMedia('(max-width: 768px)').matches || heroIndex === heroCards.length - 1) return;
    heroIndex++;
    setHeroPosition();
  });

  setHeroPosition();
  $(window).on('resize', setHeroPosition);

  // 레고 캐러셀처럼 한 칸 이동한 뒤 첫 로고를 맨 뒤로 옮기기
  let groupWidth = 0;

  // 이동 중 오른쪽이 비지 않도록 기존 목록을 한 번 복제
  $('.group-logo > li').clone().appendTo('.group-logo');

  function setGroupPosition() {
    $('.group-logo').stop(true, true);
    groupWidth = $('.group-logo > li').first().outerWidth(true) + 40;
    $('.group-logo').css('margin-left', 0);
  }

  function nextGroup() {
    $('.group-logo').animate({marginLeft: -groupWidth}, 600, function() {
      $('.group-logo > li').first().appendTo('.group-logo');
      $('.group-logo').css('margin-left', 0);
    });
  }

  setGroupPosition();
  $(window).on('load', setGroupPosition);
  $(window).resize(function() {
    setGroupPosition();
  });

  let groupTimer = setInterval(nextGroup, 2000);

  $('.group-logo-wrap').mouseenter(function() {
    clearInterval(groupTimer);
  });

  $('.group-logo-wrap').mouseleave(function() {
    clearInterval(groupTimer);
    groupTimer = setInterval(nextGroup, 2000);
  });
});
