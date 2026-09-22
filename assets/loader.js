;(function(){

  function each(obj,callback,thisArg) {
    obj = ( typeof obj === 'string' ? document.querySelectorAll(obj) :
           obj instanceof Node ? [obj] : obj );

    var length = obj.length,
        i = 0;

    for ( ; i < length; i++ ) {
      if ( callback.call( thisArg || obj[i], obj[ i ], i, obj ) === false ) { break; }
    }

    return obj;
  }


  var lettersTimeline = new TimelineMax({ 
    repeat: -1,
    delay: 0.5,
    repeatDelay: 3,
    paused: true
  });

  lettersTimeline.set('#Letters path',{ transformOrigin: 'center center' });

  var letters = each('#Letters path',function(letter,i){

    var speed = 0.2,
        delay = 0.15;

    lettersTimeline.to(letter,speed,{
      scale: 1.2,
      ease: 'Cubic.easeIn',
    },i * delay)

    lettersTimeline.to(letter,1,{
      scale: 1,
      ease: 'Cubic.easeOut',
    },(i * delay)+speed);

  });

  lettersTimeline.to('#Hat',0.3,{
    y: -5,
    rotation: 5,
    transformOrigin: 'bottom right',
    ease: Cubic.easeInOut
  },'-=0.8');

  lettersTimeline.to('#Hat',0.4,{
    y: 0,
    rotation: 0,
    ease: Cubic.easeInOut
  });

  ////////////////////////////////////////


  var tl = new TimelineMax({
    //repeat: -1
    delay: 0.5,
    onComplete: function(){
      lettersTimeline.play();
    }
  });

  tl.set('#loader__pieces *', {
    transformOrigin: 'center center',
    //scale: 0
  });

  tl.from('#Center',1.5,{
    scale: 0,
    rotation: -360,
    //ease: Cubic.easeOut
    ease: Elastic.easeOut.config(1, 0.5)
  });

  tl.from('#Arms',2.5,{
    scale: 0,
    ease: Elastic.easeOut.config(0.9, 0.4)
  },0);

  tl.staggerFrom(letters,0.6,{
    scale: 0,
    ease: Elastic.easeOut.config(1, 0.5)
  },0.1,0.5);

  tl.from('#Hat',0.7,{
    scale: 0,
    ease: Elastic.easeOut.config(1, 0.5)
  },1.3);


  var armSpin = TweenMax.to('#Arms',6,{
    transformOrigin: 'center center',
    rotation: 360,
    ease: 'Linear.easeNone',
    repeat: -1,
    paused: true
  });

  tl.from(armSpin, 2, {
    timeScale: 3,
    ease: Cubic.easeOut,
    onStart: function(){
      armSpin.play();
    }
  },0);


////////////////////////////////////////


  var closeTL = new TimelineMax({ paused: true });

  closeTL.staggerTo('#Letters path',0.3,{
    scale: 0,
    ease: Cubic.easeIn, //Out.config(1, 0.5)
  },0.1);

  closeTL.to('#Hat',0.3,{
    scale: 0,
    transformOrigin: 'center center',
    ease: Cubic.easeIn
    //ease: Elastic.easeOut.config(1, 0.5)
  },0);

  closeTL.to('#Arms',1.3,{
    scale: 0,
    ease: Cubic.easeIn
    //ease: Elastic.easeOut.config(0.9, 0.4)
  },'-=0.8');

  closeTL.to('#Center',1,{
    transformOrigin: 'center center',
    scale: 0,
    rotation: -360,
    ease: Cubic.easeIn
  },'-=1');

  closeTL.call(function(){ tl.restart(); }, null, null, '+=1');
  
  closeTL.timeScale(1.5);

  document.querySelector('.background-loader').addEventListener('click',function(){

    tl.pause();
    lettersTimeline.pause();
    closeTL.restart();

  });

})();