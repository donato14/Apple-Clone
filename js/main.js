// 전역변수는 피하자
//default - scrollHeight = 4875
(function(){

  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(눈앞에 보고있는) 씬(scroll-section)
  
  const sceneInfo = [
    {
      //0
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-0'),
        msessageA: document.querySelector('#scroll-section-0 .main-message.a'),
        msessageB: document.querySelector('#scroll-section-0 .main-message.b'),
        msessageC: document.querySelector('#scroll-section-0 .main-message.c'),
        msessageD: document.querySelector('#scroll-section-0 .main-message.d')
      },
      values: {
        messageA_opacity: [0, 1]
      }
    },
    {
      //1
      type: 'normal',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      //2
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      //3
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ];

  function setLayout() {
    //각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objects.container.style.height = `${sceneInfo[i].scrollHeight}px`
    }

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id',`show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {

  }

  function playAnimation() {

    const objects = sceneInfo[currentScene].objects;
    const values = sceneInfo[currentScene].values;

    switch (currentScene) {
      case 0:
        // console.log('0 play');
        let messageA_opacity_0 = sceneInfo[0].values.messageA_opacity[0];
        let messageA_opacity_1 = sceneInfo[0].values.messageA_opacity[1];
        console.log(messageA_opacity_0, messageA_opacity_1);
        //css
        break;
      case 1:
        // console.log('1 play');
        break;
      case 2:
        // console.log('2 play');
        break;
      case 3:
        // console.log('3 play');
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id',`show-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      currentScene--;
      document.body.setAttribute('id',`show-scene-${currentScene}`);
    }


    playAnimation();
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  // window.addEventListener('DOMcontentLoaded',setLayout);
  window.addEventListener('load',setLayout);
  window.addEventListener('resize', setLayout);
  setLayout();

  
})();