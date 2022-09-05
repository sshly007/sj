

var getElem = function( selector ){
  return document.querySelector(selector);
}
var getAllElem = function( selector ){
  return document.querySelectorAll(selector);
}

var getCls = function ( element ) {
  return element.getAttribute('class');
}

var setCls = function( element ,cls){
  return element.setAttribute('class',cls);
}


var addCls = function( element , cls ){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) === -1){
      setCls(element,baseCls+' '+cls);
  }
  return ;
}

var delCls = function( element , cls){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) > -1){ 
      setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
  }
  return ;
}

var screenAnimateElements = {
  '.screen-1' : [
    '.screen-1__heading',
    '.screen-1__phone',
    '.screen-1__shadow',
  ],
  '.screen-2' : [
    '.screen-2__heading',
    '.screen-2__subheading',
    '.screen-2__phone',
    '.screen-2__point_i_1',
    '.screen-2__point_i_2',
    '.screen-2__point_i_3',
  ],
  '.screen-3' : [
    '.screen-3__heading',
    '.screen-3__phone',
    '.screen-3__subheading',
    '.screen-3__features',
  ],
  '.screen-4' : [
    '.screen-4__heading',
    '.screen-4__subheading',
    '.screen-4__type__item_i_1',
    '.screen-4__type__item_i_2',
    '.screen-4__type__item_i_3',
    '.screen-4__type__item_i_4',
  ],
  '.screen-5' : [
     '.screen-5__heading',
    '.screen-5__subheading',
    '.screen-5__bg',
  ]

};
function setScreenAnimateInit(screenCls) {
    var screen = document.querySelector(screenCls); 
    var animateElements =  screenAnimateElements[screenCls]; 
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
}


window.onload = function () {

  
  for(k in screenAnimateElements){
    if(k == '.screen-1'){
      continue;
    }
    setScreenAnimateInit(k);
  }
  console.log('onload')

}

function playScreenAnimateDone(screenCls){
    var screen = document.querySelector(screenCls); 
    var animateElements =  screenAnimateElements[screenCls]; 
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));    
    }
}


setTimeout(function(){playScreenAnimateDone('.screen-1');},100)


var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item');

var switchNavItemsActive = function( idx){
  for(var i=0;i<navItems.length;i++){
    console.log(navItems[i]);
    delCls(navItems[i],'header__nav-item_status_active');
     navTip.style.left = 0+'px';
    
  }
  addCls(navItems[idx],'header__nav-item_status_active');
  navTip.style.left = ( idx * 70 )+'px';
  

  for(var i=0;i<outLineItems.length;i++){
    delCls(outLineItems[i],'outline__item_status_active');
  }
  addCls(outLineItems[idx],'outline__item_status_active');
}

window.onscroll = function () {

  var top  = document.body.scrollTop;

  
  if( top > 100 ){
      addCls( getElem('.header'),'header_status_black' );
  }else{
      delCls( getElem('.header'),'header_status_black' );

      switchNavItemsActive(0); 
  }

  if(top > 800*1 ){
      addCls( getElem('.outline'),'outline_status_in' );}
  // }else{ 
  //     delCls( getElem('.outline'),'outline_status_in' );
  // }

  if( top > ( 800*1 - 100) ){
    playScreenAnimateDone('.screen-2');

    switchNavItemsActive(1);
  }
  if( top > ( 800*2 - 100) ){
    playScreenAnimateDone('.screen-3');
    switchNavItemsActive(2); 
  }
  if( top > ( 800*3 - 100) ){
    playScreenAnimateDone('.screen-4');
    switchNavItemsActive(3); 
  }
  if( top > ( 800*4 - 100) ){
    playScreenAnimateDone('.screen-5');
    switchNavItemsActive(4); 
  }
}





var setNavJump = function(i,lib){
  var elem = lib[i];
  elem.onclick = function(){
    document.body.scrollTop = i*800 + 1;
  }
}

for(var i=0;i<navItems.length;i++){
  setNavJump(i,navItems);
}


for(var i=0;i<outLineItems.length;i++){
  setNavJump(i,outLineItems);
}




var navTip = getElem('.header__nav-tip');
var setTip = function(idx,lib){

  

  lib[idx].onmouseover =function(){
    console.log(this,idx);
    navTip.style.left = ( idx * 70 )+'px';
  }
  var currentIdx = 0;
  lib[idx].onmouseout = function(){
    console.log(currentIdx);
    for(var i=0;i<lib.length;i++){
        if( getCls( lib[i] ).indexOf('header__nav-item_status_active') > -1  ){
          currentIdx = i;
          break;
        }
    }
    navTip.style.left = ( currentIdx * 70 )+'px';
  }

}

for(var i=0;i<navItems.length;i++){
  setTip(i,navItems);
}