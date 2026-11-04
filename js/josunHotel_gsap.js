gsap.registerPlugin(Draggable);

// PC·태블릿: 스크롤 위치는 건드리지 않고 드래그로만 움직여요.
function initRoomGsap() {
  const slider = document.querySelector('.room-slider');
  const cards = gsap.utils.toArray('.room-list > li');
  const playhead = { position: 0 };
  const proxy = document.createElement('div');
  const wrap = gsap.utils.wrap(-cards.length / 2, cards.length / 2);
  let step;
  let startPosition;

  function render() {
    cards.forEach(function (card, index) {
      // 마지막 카드 다음에도 첫 카드가 자연스럽게 이어져요.
      const distance = wrap(index - playhead.position);
      const size = Math.max(0, 1 - Math.abs(distance) * 0.25);

      gsap.set(card, {
        xPercent: -50,
        x: distance * step,
        scale: size,
        opacity: Math.max(0, 1 - Math.abs(distance) / 2),
        zIndex: Math.round((cards.length - Math.abs(distance)) * 10),
      });
    });
  }

  function resize() {
    step = cards[0].offsetWidth * 0.85;
    render();
  }

  resize();

  const drag = Draggable.create(proxy, {
    type: 'x',
    trigger: slider,
    allowNativeTouchScrolling: true,
    onPress: function () {
      gsap.killTweensOf(playhead);
      startPosition = playhead.position;
    },
    onDrag: function () {
      playhead.position = startPosition + (this.startX - this.x) / step;
      render();
    },
    onRelease: function () {
      gsap.to(playhead, {
        position: Math.round(playhead.position),
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: render,
      });
    },
  })[0];

  window.addEventListener('resize', resize);

  return function () {
    drag.kill();
    gsap.killTweensOf(playhead);
    window.removeEventListener('resize', resize);
    gsap.set(cards, { clearProps: 'transform,opacity,zIndex' });
  };
}

// 화면 크기가 바뀌면 이전 효과를 정리한 뒤 다음 효과를 실행해요.
const roomDesktop = window.matchMedia('(min-width: 769px)');
let cleanupRoom;

function changeRoomEffect() {
  if (cleanupRoom) cleanupRoom();
  cleanupRoom = roomDesktop.matches ? initRoomGsap() : initRoomSwiper();
}

roomDesktop.addEventListener('change', changeRoomEffect);
changeRoomEffect();
