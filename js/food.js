$(document).ready(function(){
    // Core 카드 목록이 화면에 들어오면 한 번 실행
    let coreList = document.querySelector(".core-wrap > ul");

    if(coreList && "IntersectionObserver" in window){
        let coreObserver = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("is-visible");
                    coreObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: "0px 0px -10% 0px",
            threshold: 0
        });

        coreObserver.observe(coreList);
    }

    // 1024px 이하 히어로 로고 캐러셀
    let i = 0;
    let heroItems = $(".hero-brands ul > li");

    heroItems.each(function(i){
        let name = $(this).children("img").last().attr("alt");
        $(".hero-dots").append('<button type="button" aria-label="' + name + ' 보기"></button>');
    });

    function heroMove(){
        if($(window).width() > 1024){
            $(".hero-brands ul").css("transform", "");
            return;
        }

        heroItems.removeClass("active");
        heroItems.eq(i).addClass("active");
        $(".hero-dots button").removeClass("active").attr("aria-pressed", "false");
        $(".hero-dots button").eq(i).addClass("active").attr("aria-pressed", "true");

        let item = heroItems.eq(i);
        let move = $(".hero-slide").width() / 2 - item[0].offsetLeft - item.outerWidth() / 2;
        $(".hero-brands ul").css("transform", "translateX(" + move + "px)");
    }

    $(".hero-next").click(function(){
        i++;
        if(i >= heroItems.length){ i = 0; }
        heroMove();
    });

    $(".hero-prev").click(function(){
        i--;
        if(i < 0){ i = heroItems.length - 1; }
        heroMove();
    });

    $(".hero-dots button").click(function(){
        i = $(this).index();
        heroMove();
    });

    heroItems.click(function(){
        if($(window).width() <= 1024){
            i = $(this).index();
            heroMove();
        }
    });

    $(window).resize(function(){
        heroMove();
    });
    heroMove();

    // 햄버거 메뉴 열기
    $(".h-icon > a:first-child").click(function(e){
        e.preventDefault();
        $(".menu-bar").stop().fadeIn(200);
        $("body").css("overflow", "hidden");
    });

    // X 버튼으로 닫기
    $(".menu-bar .bar-icon button").click(function(){
        $(".menu-bar").stop().fadeOut(200);
        $("body").css("overflow", "");
    });

    // 메뉴 제목을 누르면 하위 메뉴 펼치기 / 접기
    $(".menu-bar > ul > li > a").click(function(e){
        e.preventDefault();
        $(".menu-bar .sub-menu-wrap").not($(this).next()).stop().slideUp(200);
        $(this).next(".sub-menu-wrap").stop().slideToggle(200);
    });
// 헤더 
    $(".gnb > ul > li").mouseenter(function(){
        $(".gnb .sub-menu-wrap").stop().hide();
        $(this).children(".sub-menu-wrap").css("display", "flex").hide().slideDown(200);
        $(".header-bg").stop().slideDown(200);
    });

    $("header").mouseleave(function(){
        $(".gnb .sub-menu-wrap").stop().slideUp(200);
        $(".header-bg").stop().slideUp(200);
    });
//브랜드 탭메뉴
    $(".brands-tab > li").click(function(){
        let i = $(this).index();

        $(".brands-tab > li").removeClass("active");
        $(this).addClass("active");

        $(".brands-content > ul").removeClass("active");
        $(".brands-content > ul").eq(i).addClass("active");
    });
//푸드 탭메뉴
    $(".tab-menu > li").click(function(){
        let i = $(this).index();

        $(".tab-menu > li").removeClass("active");
        $(this).addClass("active");

        $(".tab-content-wrap > li").removeClass("active");
        $(".tab-content-wrap > li").eq(i).addClass("active");
    });


// 모바일 Food ON 이전 / 다음
    $(".food-arrow > div").click(function(){
        let i= $(".tab-content-wrap > li.active").index();
        let total = $(".tab-content-wrap > li").length;

        if($(this).index() == 0){
            i--;
        }else{
            i++;
        }

        if(i < 0){ i = total - 1; }
        if(i >= total){i = 0; }

        $(".tab-menu > li").eq(i).trigger("click");
    });

});
