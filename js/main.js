// 전역변수는 피하자
//default - scrollHeight = 4875
(function(){

  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(눈앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  
  const sceneInfo = [
    {
      //0
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: []
      },
      values: {
        videoImagesCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1}],
        // A
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2}],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3}],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2}],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3}],
        // B
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4}],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5}],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4}],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        // C
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6}],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6}],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7}],
        // D
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8}],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8}],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9}],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9}]

      }
    },
    {
      //1
      type: 'normal',
      // heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅 // type normal에서는 필요 없음
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-1')
        // content: document.querySelector('#scroll-section-1 .description')
      }
    },
    {
      //2
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImages: []
      },
      values: {
        videoImagesCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1}],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1}],
        // A
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        // B
        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        // C
        messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
      }
    },
    {
      //3
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objects: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagesPath: [
          './images/blend-image-1.jpg',
          './images/blend-image-2.jpg'
        ],
        images: []
      },
      values: {
        rect1X: [ 0, 0, {start: 0, end: 0}],
        rect2X: [ 0, 0, {start: 0, end: 0}],
        blendHeight: [ 0, 0, {start: 0, end: 0}],
        canvas_scale: [ 0, 0, {start: 0, end: 0}],
				canvasCaption_opacity: [ 0, 1, { start: 0, end: 0 } ],
				canvasCaption_translateY: [ 20, 0, { start: 0, end: 0 } ],
        rectStartY : 0
      }
    }
  ];

  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImagesCount; i++) {
      imgElem = new Image();
      imgElem.src = `./../video/001/IMG_${6726 + i}.jpg`;
      sceneInfo[0].objects.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImagesCount; i++) {
      imgElem2 = new Image();
      imgElem2.src = `./../video/002/IMG_${7027 + i}.jpg`;
      sceneInfo[2].objects.videoImages.push(imgElem2);
    }

    let imgElem3;
    for (let i = 0; i < sceneInfo[3].objects.imagesPath.length; i++) {
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[3].objects.imagesPath[i];
      sceneInfo[3].objects.images.push(imgElem3);
    }
  }
  
  function checkMenu() {
    if(yOffset > 44) {
      document.body.classList.add('local-nav-sticky');
    }else {
      document.body.classList.remove('local-nav-sticky');
    }
  }

  function setLayout() {
    //각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objects.container.offsetHeight;
      }
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

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objects.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objects.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function calcValues(values, currentYOffset) {
    let rv;
    //현재 씬(스크롤 섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv=  (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv= values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv= scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objects = sceneInfo[currentScene].objects;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight; //현재 씬에서 스크롤된 높이
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;


    switch (currentScene) {
      case 0:
        // const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
        // const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
        // const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
        // const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objects.context.drawImage(objects.videoImages[sequence], 0, 0);
        objects.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

        if (scrollRatio <= 0.22) {
          //in
          objects.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objects.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          //out
          objects.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objects.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objects.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objects.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objects.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objects.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objects.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objects.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objects.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objects.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objects.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objects.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objects.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objects.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }
        break;

      case 2:
        // console.log('2 play');
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objects.context.drawImage(objects.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          //in
          objects.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        } else {
          //out
          objects.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        }

        if (scrollRatio <= 0.25) {
          // in
          objects.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objects.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objects.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objects.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.57) {
          // in
          objects.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objects.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objects.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objects.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objects.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objects.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.83) {
          // in
          objects.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objects.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objects.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objects.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objects.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objects.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }


        // CurrentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
        if (scrollRatio > 0.9) {
          const objects = sceneInfo[3].objects;
          const values = sceneInfo[3].values;
          const widthRatio = window.innerWidth / objects.canvas.width;
          const heightRatio = window.innerHeight / objects.canvas.height;
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            //캔버스보다 브라우저 창이 홀쭉한 경우
            canvasScaleRatio = heightRatio;
          } else {
            //캔버스보다 브라우저 창이 납작한 경우
            canvasScaleRatio = widthRatio;
          }

          objects.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objects.context.fillStyle = 'white';
          objects.context.drawImage(objects.images[0], 0, 0);

          //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight 
          const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objects.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          //좌우 흰색 박스 그리기
          // objects.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objects.canvas.height);
          // objects.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objects.canvas.height);
          objects.context.fillRect(
            parseInt(values.rect1X[0]),
            0,
            parseInt(whiteRectWidth),
            objects.canvas.height
          );
          objects.context.fillRect(
            parseInt(values.rect2X[0]),
            0,
            parseInt(whiteRectWidth),
            objects.canvas.height
          );
        }


        break;

      case 3:
        // console.log('3 play');
        let step = 0;
        //가로 세모 모두 꽉차게 하기 위해 여기서 세팅(계산 필요)
        const widthRatio = window.innerWidth / objects.canvas.width;
        const heightRatio = window.innerHeight / objects.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          //캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
        } else {
          //캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
        }

        objects.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objects.context.fillStyle = 'white';
        objects.context.drawImage(objects.images[0], 0, 0);

        //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight 
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        if (!values.rectStartY) {
          //values.rectStartY = objects.canvas.getBoundingClientRect().top;
          values.rectStartY = objects.canvas.offsetTop + (objects.canvas.height - objects.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objects.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        //좌우 흰색 박스 그리기
        // objects.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objects.canvas.height);
        // objects.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objects.canvas.height);
        objects.context.fillRect(
					parseInt(calcValues(values.rect1X, currentYOffset)),
					0,
					parseInt(whiteRectWidth),
					objects.canvas.height
				);
				objects.context.fillRect(
					parseInt(calcValues(values.rect2X, currentYOffset)),
					0,
					parseInt(whiteRectWidth),
					objects.canvas.height
				);

        if (scrollRatio < values.rect1X[2].end) {
            step = 1;
            objects.canvas.classList.remove('sticky');
        } else {
            step = 2;
            //이미지 블렌드
            // 0, 0, {start: 0, end: 0}
            values.blendHeight[0] = 0;
            values.blendHeight[1] = objects.canvas.height;
            values.blendHeight[2].start = values.rect1X[2].end;
            values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
            const blendHeight = calcValues(values.blendHeight, currentYOffset);

            objects.context.drawImage(objects.images[1],
              0, objects.canvas.height - blendHeight, objects.canvas.width, blendHeight,
              0, objects.canvas.height - blendHeight, objects.canvas.width, blendHeight
            );

            objects.canvas.classList.add('sticky');
            objects.canvas.style.top = `${-(objects.canvas.height - objects.canvas.height * canvasScaleRatio) / 2}px`;

            if (scrollRatio > values.blendHeight[2].end) {
              values.canvas_scale[0] = canvasScaleRatio;
              values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objects.canvas.width);
              values.canvas_scale[2].start = values.blendHeight[2].end;
              values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

              objects.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
              objects.canvas.style.marginTop = 0;
            }

            if (scrollRatio > values.canvas_scale[2].end
              && values.canvas_scale[2].end > 0 ) {
                objects.canvas.classList.remove('sticky');
                objects.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                values.canvasCaption_opacity[2].end = values.canvasCaption_opacity.start + 0.1;
                values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
                values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
                objects.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                objects.canvasCaption.style.transform = `translate 3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;

            }
        }

        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id',`show-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      enterNewScene = true; //스크롤 시 마이너스를 막아줌
      if (currentScene === 0) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      currentScene--;
      document.body.setAttribute('id',`show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
    checkMenu();
  });
  // window.addEventListener('DOMcontentLoaded',setLayout);
  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objects.context.drawImage(sceneInfo[0].objects.videoImages[0], 0, 0);
  });
  window.addEventListener('resize', setLayout);
  setLayout();

  setCanvasImages();
})();