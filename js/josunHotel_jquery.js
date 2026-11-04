$(document).ready(function() {
  


  // -------다이닝 가격 표시-------

  const diningDesktop = window.matchMedia('(min-width: 1100px)');

  // 화면 크기가 바뀌면 애니메이션 스타일을 지우고 가격 표시 상태 맞추기
  function updateDiningPrice() {
    const diningPrices = $(".dining-detail-list .dining-price");
    diningPrices.stop(true, true).css({
      height: "",
      overflow: "",
      paddingTop: "",
      paddingBottom: "",
      marginTop: "",
      marginBottom: "",
    });

    if (diningDesktop.matches) {
      diningPrices.hide();
    } else {
      diningPrices.show();
    }
  }

  updateDiningPrice();
  diningDesktop.addEventListener('change', updateDiningPrice);

  $(".dining-detail-list > li").mouseenter(function() {
    if (diningDesktop.matches) {
      $(this).find(".dining-price").stop(true, true).slideDown(300);
    }
  })

  $(".dining-detail-list > li").mouseleave(function() {
    if (diningDesktop.matches) {
      $(this).find(".dining-price").stop(true, true).slideUp(300);
    }
  })
  // 모바일·태블릿에서 카드를 누를 때 앞뒷면 전환하기
  $(".membership-card-list").on("click", "> li", function() {
    if (!diningDesktop.matches) {
      $(this).toggleClass("is-flipped");
    }
  });

  // 화면 구간이 바뀌면 클릭으로 뒤집은 상태 초기화하기
  diningDesktop.addEventListener('change', function() {
    $(".membership-card-list > li").removeClass("is-flipped");
  });
})
