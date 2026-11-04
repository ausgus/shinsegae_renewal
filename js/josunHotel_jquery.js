$(document).ready(function() {
  


  // -------다이닝 가격 표시-------


  $(".dining-detail-list > li").mouseenter(function() {
    $(this).find(".dining-price").stop().slideDown(300);
  })

  $(".dining-detail-list > li").mouseleave(function() {
    $(this).find(".dining-price").stop().slideUp(300);
  })
})
