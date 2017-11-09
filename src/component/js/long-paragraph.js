/**
 * Created by SDS on 2017-10-25.
 */

/**
 * Created by SDS on 2017-10-23.
 */
var $dropList = $('#content .dropdown');
var $dropListLi;

var preVal = {
    obj:'#p0',
    height:0,
    init: false
};
var paraArea = $("#paragraph-area");
var $paragraph = $('#paragraph-area .paragraph');
var $dropdownBtn = $('.dropdown button');
var paraArr = [];
var contMrgTop = Number($("#content").css("padding-top").slice(0,-2));
var paraMrgTop = Number($("#paragraph-area").css("margin-top").slice(0,-2));

$(document).ready(function(){

    // dropdown click event binding
    $dropdownBtn.on("click", clickDropdown);

    // 윈도우 리사이즈
    $(window).on('resize', function(e){
        restoreHeight(); // 최하단 요소의 height 복구
        reserveHeight(); // 최하단 요소 height 갱신
        makeParaArr();  // paragraph 좌표 갱신
        contMrgTop = Number($("#content").css("padding-top").slice(0,-2)); // wrapper padding-top 갱신
        paraMrgTop = Number($("#paragraph-area").css("margin-top").slice(0,-2)); // 컨텐츠 영역 상단 마진 갱신
    });

    // 스크롤시 현재 단락 위치 감지
    $('#paragraph-area').on('scroll', function(e){
        checkScroll();
    });

    // dropdown list에 각 paragraph의 title 항목을 삽입. paragraph에는 id 할당(0번부터)
    $dropList.each(function(idx_1, i_1){
        $paragraph.each(function(idx_2, i_2){
            var subText = $(i_2).find(".sub-title").text();
            var newId = "p"+idx_2;
            if(idx_2 == 0){
                $(i_1).find('ul').eq(0).append("<li value='" + newId + "' class='active'>" + subText + "</li>");
                $(i_1).find('button').html(subText);
            }else{
                $(i_1).find('ul').eq(0).append("<li value='" + newId + "'>" + subText + "</li>");
            }

            $(i_2).attr("id",newId);
        });
    });

    $dropListLi = $dropList.find('li');
    reserveHeight();

    // 단락 좌표정보 갱신(화면 로딩시)
    makeParaArr();

    // dropdown list click event binding - 단락 이동
    $dropList.find('li').on('click', function(e){

        // dropdown list 클릭 처리
        $(this).parent('ul').children('li').removeClass('active');
        $(this).addClass('active');
        $dropdownBtn.html($(this).html());
        $('.dropdown ul').removeClass('open');
        $dropdownBtn.removeClass('open');

        var id = $dropListLi.index($(this));

        // 올라가야하는 높이
        var upHeight = $("#p" + id).position().top - paraMrgTop - contMrgTop;

        // console.log({
        //     docHeight: docHeight,
        //     winHeight: winHeight,
        //     paraAreaHeight: paraAreaHeight,
        //     paraScrollHeight: paraScrollHeight,
        //     paraBottom: paraBottom,
        //     winBottom: winBottom,
        //     '올라갈수있는높이' : upLimit,
        //     '올라가야하는높이': upHeight
        // });

        // scroll 할 수 있는 height를 확보했으므로, move한다
        move($("#p" + id), upHeight);

    });

});

function clickDropdown(e){

    var $ul = $(this).nextAll('ul').eq(0);
    var $btn = $(this);

    if ($ul.hasClass('open')) {
        $ul.removeClass('open');
        $btn.removeClass('open');
    }
    else {
        $ul.addClass('open');
        $btn.addClass('open');
    }

}

function restoreHeight(){
    if(preVal.init){ // 이전값이 없으면 pass
        preVal.obj.css('height', '');
    }
}

function move($target, upHeight) {
    var scrollTop = $('#paragraph-area').scrollTop();
    $('#paragraph-area').animate({ scrollTop : scrollTop + upHeight }, 100); // 이동
};

function makeParaArr(){
    paraArr = [];
    for(var i=0; i<$paragraph.length; i++){
        var top = $("#paragraph-area").scrollTop() + $paragraph.eq(i).position().top - contMrgTop - paraMrgTop;
        var height = $paragraph.eq(i).outerHeight() + Number($paragraph.eq(i).css("margin-bottom").slice(0,-2));
        paraArr.push({
            id: $paragraph.eq(i).attr("id"),
            top: top,
            bottom: top + height,
            height: height,
            title: $paragraph.eq(i).find('.sub-title').text()
        });
    }
}

function checkScroll(){

    var currScrollTop = $("#paragraph-area").scrollTop();
    for(var i=0; i<$paragraph.length; i++){
        if(currScrollTop >= paraArr[i].top &&
            currScrollTop < paraArr[i].bottom){

            $('.dropdown button').html(paraArr[i].title);
            $('.dropdown ul li').removeClass('active');
            $('.dropdown ul li[value="'+paraArr[i].id+'"]').addClass('active');


        }
    }

}

function reserveHeight(){

    var upHeight = $paragraph.last().position().top - paraMrgTop - contMrgTop;
    var paraAreaHeight = $("#paragraph-area").outerHeight();    // height of paragraph-area
    var paraScrollHeight = $("#paragraph-area").prop("scrollHeight");   // total height of paragraph-area including scroll height
    var paraScrollTop = $("#paragraph-area").scrollTop(); // scroll top

    // 올라갈 수 있는 높이
    var upLimit = paraScrollHeight - paraAreaHeight - paraScrollTop;
    var liLength = $dropListLi.length;
    var paraBottom = $("#paragraph-area").position().top + paraScrollHeight + paraMrgTop;   // paragraph-area's bottom position from window's top.
    // scroll 할 높이가 부족하면 마지막 paragraph의 height를 늘린다
    if(upLimit >= 0 && upLimit < upHeight){

        var diff = upHeight - upLimit; // 부족한 높이 ( 늘려야하는 height )
        var $lastEl = $('.paragraph').eq(liLength-1); // 마지막 단락
        var lastElHeight = $lastEl.outerHeight();

        var exDiff = 0;
        // paragraph 컨텐츠가 적어 스크롤이 안생기는 경우,
        // 최하단 요소의 bottom과 컨텐츠 영역의 bottom의 차이를 추가로 더해줘야함.
        if(paraArea.prop("scrollHeight") <= paraArea.outerHeight()){
            exDiff = paraBottom - (
                    $lastEl.position().top +
                    lastElHeight +
                    Number($lastEl.css('margin-bottom').slice(0,-2))
                );

            if(exDiff < 0){
                exDiff = 0;
            }
        }

        // height 복원을 위한 이전값 백업
        preVal.obj = $lastEl;
        preVal.init = true;

        $lastEl.css('height', lastElHeight + diff + exDiff);

        // height가 변경되었으므로, 각 단락의 좌표를 재갱신
        makeParaArr();

    }

}
