$(document).ready(function() {
  // 신세계 그룹: PC에서는 호버, 모든 화면에서는 클릭으로 여닫기
  const groupWrap = $(".group-list-wrap");
  const groupButton = groupWrap.find("button");

  function toggleGroup(open) {
    groupWrap.toggleClass("is-open", open);
    groupButton.attr("aria-expanded", String(open));
    if (open) {
      groupWrap.find(".group-list").stop(true, true).slideDown(200);
    } else {
      groupWrap.find(".group-list").stop(true, true).slideUp(200);
    }
  }

  groupWrap.on("mouseenter", function() {
    if (window.matchMedia('(min-width: 1100px) and (hover: hover)').matches) {
      toggleGroup(true);
    }
  }).on("mouseleave", function() {
    if (window.matchMedia('(min-width: 1100px) and (hover: hover)').matches) {
      toggleGroup(false);
    }
  });

  groupButton.on("click", function() {
    toggleGroup(!groupWrap.hasClass("is-open"));
  });

  $(document).on("click", function(event) {
    if (!$(event.target).closest(".group-list-wrap").length) toggleGroup(false);
  });

  groupWrap.on("keydown", function(event) {
    if (event.key === "Escape") {
      toggleGroup(false);
      groupButton.trigger("focus");
    }
  }).on("focusout", function(event) {
    if (!this.contains(event.relatedTarget)) toggleGroup(false);
  });
  


  // -------다이닝 시간·가격 표시-------

  const diningDesktop = window.matchMedia('(min-width: 1100px)');

  // 화면 크기가 바뀌면 애니메이션 스타일을 지우고 상세 정보 표시 상태 맞추기
  function updateDiningPrice() {
    const diningPrices = $(".dining-detail-list .detail");
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
      $(this).find(".detail").stop(true, true).slideDown(300);
    }
  })

  $(".dining-detail-list > li").mouseleave(function() {
    if (diningDesktop.matches) {
      $(this).find(".detail").stop(true, true).slideUp(300);
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
