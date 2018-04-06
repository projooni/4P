/**
 * Created by SDS on 2017-10-25.
 */

/**
 * Created by SDS on 2017-10-23.
 */
var $dropdown = $('.lp-dropdown');
var $dropdownList = $('.lp-dropdown ul');
var $dropListLi;
var preVal = {
    obj:'#p0',
    height:0,
    init: false
};
var $paraArea = $('.lp-paragraph-area');
var $paragraph = $('.lp-paragraph-area .lp-paragraph-area__paragraph');
var $dropdownBtn = $('.lp-dropdown button');
var paraArr = [];
var contMrgTop = Number($(".content").css("padding-top").slice(0,-2));
var paraMrgTop = Number($paraArea.css("margin-top").slice(0,-2));

$(document).ready(function(){

    // dropbox click event
    $dropdownBtn.on("click", clickDropdown);

    // 윈도우 리사이즈
    $(window).on('resize', function(e){
        restoreHeight(); // 최하단 요소의 height 복구
        reserveHeight(); // 최하단 요소 height 갱신
        makeParaArr();  // paragraph 좌표 갱신
        contMrgTop = Number($(".content").css("padding-top").slice(0,-2)); // wrapper padding-top 갱신
        paraMrgTop = Number($paraArea.css("margin-top").slice(0,-2)); // 컨텐츠 영역 상단 마진 갱신
    });

    // 스크롤시 현재 단락 위치 감지
    $('.lp-paragraph-area').on('scroll', function(e){
        checkScroll();
    });

    // dropdown list에 각 paragraph의 title 항목을 삽입. paragraph에는 id 할당(0번부터)
    $dropdown.each(function(idx_1, i_1){
        $paragraph.each(function(idx_2, i_2){
            var subText = $(i_2).find(".lp-paragraph-area__paragraph__sub-title").text();
            var newId = "p"+idx_2;
            if(idx_2 == 0){
                $(i_1).find('ul').eq(0).append("<li value='" + newId + "' class='lp-dropdown__item--active'>" + subText + "</li>");
                $(i_1).find('button').html(subText);
            }else{
                $(i_1).find('ul').eq(0).append("<li value='" + newId + "'>" + subText + "</li>");
            }

            $(i_2).attr("id",newId);
        });
    });

    $dropListLi = $dropdown.find('li');
    reserveHeight();

    // 단락 좌표정보 갱신(화면 로딩시)
    makeParaArr();

    // dropbox 아이템 클릭 이벤트
    $dropdown.find('li').on('click', function(e){

        // dropbox 아이템 클릭시 해당 아이템을 활성화
        $(this).parent('ul').children('li').removeClass('lp-dropdown__item--active');
        $(this).addClass('lp-dropdown__item--active');
        $dropdownBtn.html($(this).html());
        $dropdownList.removeClass('lp-dropdown--open');
        $dropdownBtn.removeClass('lp-dropdown--open');

        var id = $dropListLi.index($(this));

        // 올라가야하는 높이
        var upHeight = $("#p" + id).position().top - paraMrgTop - contMrgTop;

        // scroll 할 수 있는 height를 확보했으므로, move한다
        move(upHeight);

    });

});

// dropbox button click event
function clickDropdown(e){

    var $ul = $(this).nextAll('ul').eq(0);
    var $btn = $(this);

    if ($ul.hasClass('lp-dropdown--open')) {
        $ul.removeClass('lp-dropdown--open');
        $btn.removeClass('lp-dropdown--open');
    }
    else {
        $ul.addClass('lp-dropdown--open');
        $btn.addClass('lp-dropdown--open');
    }

}

// 마지막 단락의 height를 초기화 한다.
function restoreHeight(){
    if(preVal.init){ // height가 변경된 이력이 없으면 무시
        preVal.obj.css('height', '');
    }
}

// dropbox 목록 선택 시 해당 단락으로 이동한다.
function move(upHeight) {
    var scrollTop = $paraArea.scrollTop();
    $paraArea.animate({ scrollTop : scrollTop + upHeight }, 100);
};

// 단락 별 좌표를 저장 및 갱신한다.
function makeParaArr(){
    paraArr = [];
    for(var i=0; i<$paragraph.length; i++){
        var top = $paraArea.scrollTop() + $paragraph.eq(i).position().top - contMrgTop - paraMrgTop;
        var height = $paragraph.eq(i).outerHeight() + Number($paragraph.eq(i).css("margin-bottom").slice(0,-2));
        paraArr.push({
            id: $paragraph.eq(i).attr("id"),
            top: top -1,
            bottom: top + height,
            height: height,
            title: $paragraph.eq(i).find('.lp-paragraph-area__paragraph__sub-title').text()
        });
    }
}

// 현재 scroll 위치를 감지해서 dropbox 내의 활성화 아이템을 갱신한다.
function checkScroll(){

    var currScrollTop = $paraArea.scrollTop();
    for(var i=0; i<$paragraph.length; i++){
        if(currScrollTop >= paraArr[i].top &&
            currScrollTop < paraArr[i].bottom){

            // 현재 scroll이 위치한 단락을 dropbox 내에서 활성화 한다.
            $('.lp-dropdown button').html(paraArr[i].title);
            $('.lp-dropdown ul li').removeClass('lp-dropdown__item--active');
            $('.lp-dropdown ul li[value="'+paraArr[i].id+'"]').addClass('lp-dropdown__item--active');


        }
    }

}

// 마지막 단락 최상단까지의 scroll-up을 위해 필요한 추가 height를 계산 및 확보한다
function reserveHeight(){

    var upHeight = $paragraph.last().position().top - paraMrgTop - contMrgTop;
    var paraAreaHeight = $paraArea.outerHeight();    // height of paragraph-area
    var paraScrollHeight = $paraArea.prop("scrollHeight");   // total height of paragraph-area including scroll height
    var paraScrollTop = $paraArea.scrollTop(); // scroll top

    // 올라갈 수 있는 높이
    var upLimit = paraScrollHeight - paraAreaHeight - paraScrollTop;
    var liLength = $dropListLi.length;
    var paraBottom = $paraArea.position().top + paraScrollHeight + paraMrgTop;   // paragraph-area's bottom position from window's top.

    // scroll 할 높이가 부족하면 마지막 paragraph의 height를 늘린다
    if(upLimit >= 0 && upLimit < upHeight){

        var diff = upHeight - upLimit; // 부족한 높이 ( 늘려야하는 height )
        var $lastEl = $('.lp-paragraph-area__paragraph').eq(liLength-1); // 마지막 단락
        var lastElHeight = $lastEl.outerHeight();
        var exDiff = 0;

        // paragraph 컨텐츠가 적어 스크롤이 안생기는 경우,
        // 최하단 요소의 bottom과 컨텐츠 영역의 bottom의 차이를 추가로 더해주어야 한다.
        if($paraArea.prop("scrollHeight") <= $paraArea.outerHeight()){
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

        // height가 변경되었으므로, 각 단락의 좌표를 재 갱신
        makeParaArr();

    }

}
