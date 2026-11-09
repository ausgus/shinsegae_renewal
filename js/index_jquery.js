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

  // 넓은 화면에서도 오른쪽이 비지 않도록 원본 뒤에 세 묶음을 붙여요.
  const groupLogos = $('.group-logo > li');
  for (let copy = 0; copy < 3; copy++) {
    const copies = groupLogos.clone().attr('aria-hidden', 'true');
    copies.find('a').attr('tabindex', '-1');
    copies.appendTo('.group-logo');
  }
});
