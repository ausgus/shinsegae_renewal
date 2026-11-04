$(document).ready(function() {
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
