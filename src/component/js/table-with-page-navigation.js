/**
 * Created by SDS on 2017-10-23.
 */
var $nextBtn = $('.page-navigation__next');
var $preBtn = $('.page-navigation__pre');
var $firstBtn = $('.page-navigation__first');
var $lastBtn = $('.page-navigation__last');
var $btn = $('.page-navigation__number');
var maxPageNum = 10;
var half = maxPageNum/2;
var halfLeft = Math.floor(maxPageNum/2);
var halfRight = maxPageNum - halfLeft;
var totalPage = $btn.length;

$(document).ready(function(){

    switchDisableBtn();

    // ==== 이벤트 바인딩 ====
    $nextBtn.each(function(index, item){
        $(item).on('click',nextMove);
    });

    $preBtn.each(function(index, item){
        $(item).on('click',{
            'index' : index
        }, preMove);
    });

    $btn.each(function(index, item){
        $(item).on('click',{
                'index': index
            }, move);
    });

    $firstBtn.each(function(index, item){
        $(item).on('click', firstMove);
    });

    $lastBtn.each(function(index, item){
        $(item).on('click', lastMove);
    });
    // ==== 이벤트 바인딩 ====

    var mobile = window.matchMedia("screen and (max-width: 768px)");
    var tablet = window.matchMedia("screen and (max-width: 1024px) and (min-width: 768px)");
    var pc = window.matchMedia("screen and (min-width: 1024px)");

    // 해상도에 따라 기능이 변경되므로, 페이지 로딩시 초기화 한다
    pcMedia(pc);
    tabletMedia(tablet);
    mobileMedia(mobile);

    // 해상도에 따라 기능이 변경되므로, 이벤트 리스너에 추가한다.
    pc.addListener(pcMedia);
    tablet.addListener(tabletMedia);
    mobile.addListener(mobileMedia);

});

// move page
function move(e){
    var $activeItem = $('.page-navigation__number--active');
    var index = e.data.index;
    var $currItem = $btn.eq(index);

    if(!(index < half || index > $btn.length-half)){
        // 현재 page가 항상 중앙에 위치해야 하는 경우

        for(var i=0; i<$btn.length; i++){
            if((i >= index-half) && (i < index+half)){
                // 선택된 page를 기준으로 보여지는 영역(10개) 안에 있는 page number를 show
                $btn.eq(i).removeClass('page-navigation__number--hidden');
            }else{
                // 그 외의 page number를 hide
                $btn.eq(i).addClass('page-navigation__number--hidden');
            }
        }
    }else{
        // 현재 page가 중앙에 위치할 필요가 없는 경우
        
        if(index < half){ // 앞
            for(var i=0; i<$btn.length; i++){
                if(i < maxPageNum){
                    $btn.eq(i).removeClass('page-navigation__number--hidden');
                }else{
                    $btn.eq(i).addClass('page-navigation__number--hidden');
                }
            }
        }else{ // 뒤
            for(var i=0; i<$btn.length; i++){
                if(i >= totalPage - maxPageNum){
                    $btn.eq(i).removeClass('page-navigation__number--hidden');
                }else{
                    $btn.eq(i).addClass('page-navigation__number--hidden');
                }
            }
        }

    }

    // 현재 page를 활성화 하고, 이전 page 활성화 해제한다. page에 따른 이동 버튼 활성화 여부를 결정한다.
    $activeItem.removeClass('page-navigation__number--active');
    $currItem.addClass('page-navigation__number--active');
    switchDisableBtn();
}

// next move button
function nextMove(){
    var $activeItem = $('.page-navigation__number--active');
    var $nextItem = $activeItem.next();
    var index = $btn.index($nextItem);
    var $visibleBtn = $('.page-navigation__number:not(:hidden)');

    // page 이동시 현재 page의 가운데 고정
    if(index > halfLeft){
        if(index <= totalPage-halfRight){
            $visibleBtn.eq(0).addClass('page-navigation__number--hidden');
            $visibleBtn.eq($visibleBtn.length-1).next().removeClass('page-navigation__number--hidden');
        }
    }

    if( $nextItem.hasClass('page-navigation__next')){
        return;
    }

    $activeItem.removeClass('page-navigation__number--active');
    $nextItem.addClass('page-navigation__number--active');
    switchDisableBtn();
}

// prev move button
function preMove(){
    var $activeItem = $('.page-navigation__number--active');
    var $preItem = $activeItem.prev();
    var index = $btn.index($preItem);
    var $visibleBtn = $('.page-navigation__number:not(:hidden)');

    // page 이동시 현재 page의 가운데 고정
    if(index < totalPage-halfRight){
        if(index >= halfLeft){
            $visibleBtn.eq(0).prev().removeClass('page-navigation__number--hidden');
            $visibleBtn.eq($visibleBtn.length-1).addClass('page-navigation__number--hidden');
        }
    }

    if($preItem.hasClass('page-navigation__pre')){
        return;
    }
    $activeItem.removeClass('page-navigation__number--active');
    $preItem.addClass('page-navigation__number--active');
    switchDisableBtn();
}

// move to first page
function firstMove(){
    move({
        data : {
            index: 0
        }
    });
}

// move to last page
function lastMove(){
    move({
        data : {
            index: $btn.length-1
        }
    });
}

// change disable status for next,pre,fist,last button
function switchDisableBtn(){
    var $activeItem = $('.page-navigation__number--active');
    var index = $btn.index($activeItem);

    // prev btn 활성화/비활성화
    if($activeItem.prev().hasClass('page-navigation__pre')){
        $preBtn.addClass('page-navigation__left--disable');
    }else{
        $preBtn.removeClass('page-navigation__left--disable');
    }

    // prev btn 활성화/비활성화
    if($activeItem.next().hasClass('page-navigation__next')){
        $nextBtn.addClass('page-navigation__right--disable');
    }else{
        $nextBtn.removeClass('page-navigation__right--disable');
    }

    // first, last btn 활성화/비활성화
    if( index <= half){
        $firstBtn.addClass('page-navigation__left--disable');
        $lastBtn.removeClass('page-navigation__right--disable');
        return;
    }else if(index >= totalPage-half){
        $lastBtn.addClass('page-navigation__right--disable');
        $firstBtn.removeClass('page-navigation__left--disable');
        return;
    }else{
        $firstBtn.removeClass('page-navigation__left--disable');
        $lastBtn.removeClass('page-navigation__right--disable');
        return;
    }
}

// pc size로 resize시 보여지는 page 수와 이동할때 가운데 정렬되도록 조건 변경
function pcMedia(e){
    if(e.matches) {
        maxPageNum = 10;
        half = maxPageNum/2;
        halfLeft = Math.floor(maxPageNum/2);
        halfRight = maxPageNum - halfLeft;
        switchDisableBtn();
    }
}

// tablet size로 resize시 보여지는 page 수와 이동할때 가운데 정렬되도록 조건 변경
function tabletMedia(e){
    if(e.matches) {
        maxPageNum = 10;
        half = maxPageNum/2;
        halfLeft = Math.floor(maxPageNum/2);
        halfRight = maxPageNum - halfLeft;
        var $activeItem = $('.page-navigation__number--active');
        var index = $btn.index($activeItem);
        move({
            data : {
                index: index
            }
        });
        switchDisableBtn();
    }
}

// mobile size로 resize시 보여지는 page 수와 이동할때 가운데 정렬되도록 조건 변경
function mobileMedia(e){
    if(e.matches) { // 모바일
        maxPageNum = 5;
        half = maxPageNum/2;
        halfLeft = Math.floor(maxPageNum/2);
        halfRight = maxPageNum - halfLeft;
        var $activeItem = $('.page-navigation__number--active');
        var index = $btn.index($activeItem);
        move({
            data : {
                index: index
            }
        });
        switchDisableBtn();
    }
}