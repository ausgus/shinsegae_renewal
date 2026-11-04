gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(min-width: 1100px)", function () {
  const heroList = document.querySelector(".hero-cont-wrap > ul");

  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "none"
    },
    scrollTrigger: {
      trigger: ".main-hero-inner",
      start: "top 100px",

      end: function () {
        return "+=" + window.innerHeight * 3.5;
      },

      pin: true,
      scrub: true,
      invalidateOnRefresh: true
    }
  });

  // 1. 메인 이미지를 줄여 첫 번째 카드를 보여주기
  heroTimeline.to(".hero-main-cont", {
    width: "70%",
    duration: 1
  });

  // 2. 목록의 넘치는 높이만큼 위로 이동해 나머지 카드를 보여주기
  heroTimeline.to(heroList, {
    y: function () {
      const heroWrap = document.querySelector(".hero-cont-wrap");
      const wrapStyle = getComputedStyle(heroWrap);

      const visibleHeight = heroWrap.clientHeight
        - parseFloat(wrapStyle.paddingTop)
        - parseFloat(wrapStyle.paddingBottom);

      return -Math.max(0, heroList.scrollHeight - visibleHeight);
    },
    duration: 2
  });

  // 3. 마지막 카드를 볼 구간을 둔 뒤 고정 해제
  heroTimeline.to({}, {
    duration: 0.5
  });
});
