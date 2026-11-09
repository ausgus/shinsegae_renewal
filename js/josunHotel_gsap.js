gsap.registerPlugin(Draggable);

const roomAutoplayDesktop = window.matchMedia('(min-width: 1100px)');

// PC와 태블릿은 드래그할 수 있고, PC에서는 자동으로 한 장씩 넘겨요.
function initRoomGsap() {
  const slider = document.querySelector('.room-slider');
  const cards = gsap.utils.toArray('.room-list > li');
  const playhead = { position: 0 };
  const proxy = document.createElement('div');
  const wrap = gsap.utils.wrap(-cards.length / 2, cards.length / 2);
  let step;
  let startPosition;
  let autoplayTimer;

  function render() {
    cards.forEach(function (card, index) {
      // 마지막카드 이후 첫카드 연결
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
    onDragStart: function () {
      clearTimeout(autoplayTimer);
      gsap.killTweensOf(playhead);
      startPosition = playhead.position;
    },
    onDrag: function () {
      playhead.position = startPosition + (this.startX - this.x) / step;
      render();
    },
    onDragEnd: function () {
      gsap.to(playhead, {
        position: Math.round(playhead.position),
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: render,
      });
      scheduleAutoplay();
    },
  })[0];

  function scheduleAutoplay() {
    clearTimeout(autoplayTimer);
    if (!roomAutoplayDesktop.matches || drag.isDragging) return;

    autoplayTimer = setTimeout(function () {
      gsap.to(playhead, {
        position: Math.round(playhead.position) + 1,
        duration: 0.65,
        ease: 'power2.inOut',
        onUpdate: render,
      });
      scheduleAutoplay();
    }, 2000);
  }

  scheduleAutoplay();
  roomAutoplayDesktop.addEventListener('change', scheduleAutoplay);
  window.addEventListener('resize', resize);

  return function () {
    roomAutoplayDesktop.removeEventListener('change', scheduleAutoplay);
    drag.kill();
    clearTimeout(autoplayTimer);
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
