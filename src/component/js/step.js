/**
 * Created by SDS on 2017-10-16.
 */
var mobile = window.matchMedia("screen and (max-width: 768px)");
var $backBtn = $('button.step-controller__back');
var $nextBtn = $('button.step-controller__next');
var $preBtn = $('button.step-controller__pre');
var minSeq = 1; // Back 할 수 있는 최대 스텝 번호 (1 ~ N)
var maxStep = $('.step-nav__step').length;
var maxIdx = maxStep-1; // last index
var completedIdx = 0;   // last completed index

$(document).ready(function(){

    $preBtn.addClass('step-controller__button--hidden');

    $(window).on('resize', function(e){

        if(!mobile.matches){
            $backBtn.css('width', '');
            $nextBtn.css('width', '');
        }else{
            if(completedIdx == maxIdx){
                // 마지막 단계일 때 'SAVE'버튼을 100%로
                hideBackBtn();
                $nextBtn.css('width', '100%');
            }
        }

    });

    $('.step-wrap').each(function(index, item){

        var $stepNavWrapper = $(item).find('.step-nav-wrapper');
        var $title = $(item).find('.step-nav .step-nav__step__title');
        var $circle = $(item).find(".step-nav__step__circle"); // 전체 스텝

        // backStep 로직을 'back button'에 연결
        $preBtn.on('click', {
            $stepWrapper : $(item),
            $circle : $circle
        }, backStep);

        // nextStep 로직을 'next button'에 연결
        $nextBtn.on('click',{
            $stepWrapper : $(item),
            $circle : $circle
        }, nextStep);

        var maxHeight = 0;

        $title.each(function(){
            var height = $(this).height();
            maxHeight = maxHeight < height ? height : maxHeight;
        });

        $stepNavWrapper.each(function(e){
            $(this).css("margin-bottom", maxHeight+30);
        });

        changeCurrStepText(0);

        $circle.on('click', function() {

            // 클릭된 스텝 번호
            var clickedCircle = $(this);
            var currIdx = $('.step-nav__step__circle').index(clickedCircle);
            var click_step_number = currIdx+1;

            if (clickedCircle.hasClass("step-nav__step--completed") || clickedCircle.hasClass("step-nav__step--completing")) {
                var $stepTitle = $('.step-nav__step__title span');
                var $mobileTitle = $('.step-wrap__small-size-title');
                var currStep = click_step_number;
                var $currStep = $('#s-content__current-step');

                $mobileTitle.text($stepTitle.eq(click_step_number - 1).text());
                $currStep.text('Step0'+currStep);

                // 현재까지 완료되거나 진행중인 step 중 마지막 요소의 completing 제거
                var $completed = $('.step-nav__step__circle.step-nav__step--completed');
                $completed.eq($completed.length-1).parent().nextAll('.step-nav__step').eq(0).find('.step-nav__step__circle').removeClass('step-nav__step--completing');

                // 클릭된 step을 completing으로 변경
                clickedCircle.removeClass("step-nav__step--completed");
                clickedCircle.addClass("step-nav__step--completing");

                if(currIdx < maxIdx){
                    changeDoneToNext();
                }

                for(var index = 0; index < $circle.length; index++){
                    if(index != currIdx){ // 현재 인덱스 제외하고 처리
                        if(index <= completedIdx){ // completed step
                            $circle.eq(index).removeClass('step-nav__step--completing');
                            $circle.eq(index).addClass('step-nav__step--completed');
                        }
                    }
                }

                if(currIdx > 0){
                    showPreBtn();
                }else{
                    hidePreBtn();
                }

                if(mobile.matches){
                    showBackBtn();
                    $nextBtn.css('width', '50%');
                }

            }

        });


    });

})

// backStep 로직
function backStep(event){

    var completedCircleLen = completedIdx+1;   // 완료된 스텝 수
    var currCircle = $('.step-nav__step__circle.step-nav__step--completing');
    var currIdx = $('.step-nav__step__circle').index(currCircle);

    if(currIdx-1 > 0){
        showPreBtn();
    }else{
        hidePreBtn();
    }

    if( (currIdx+1) > minSeq){  // 완료된 혹은 진행중인 스텝이 2이상일 경우에만 작동

        currCircle.removeClass('step-nav__step--completing');

        if(currIdx <= completedIdx){
            currCircle.addClass('step-nav__step--completed');
        }

        currCircle.parent().prevAll('.step-nav__step').eq(0).find('.step-nav__step__circle').removeClass('step-nav__step--completed');
        currCircle.parent().prevAll('.step-nav__step').eq(0).find('.step-nav__step__circle').addClass('step-nav__step--completing');

        if(completedCircleLen < 1){
            disableBackBtn();
        }

        changeCurrStepText(completedCircleLen); // [responsive] mobile 해상도 title 내용 변경

        // TODO 버튼 텍스트를 조작하는 부분으로 분리 필요
        changeDoneToNext(maxStep, completedCircleLen);

        if(mobile.matches){
            showBackBtn();
            $nextBtn.css('width', '50%');
        }
    }

};

function nextStep(event){
    var completedCircleLen = completedIdx+1;   // 완료된 스텝 수
    var currCircle = $('.step-nav__step__circle.step-nav__step--completing');
    var currIdx = $('.step-nav__step__circle').index(currCircle);
    
    // 처음 완료되는 step이라면
    if(currIdx > completedIdx){
        completedIdx = currIdx;
    }

    if(currIdx+1 > 0){
        showPreBtn();
    }else{
        hidePreBtn();
    }

    if( currIdx != -1 && currIdx <= maxIdx){ // 'DONE' 처리 하기전 처리 로직
        currCircle.addClass('step-nav__step--completed');
        currCircle.removeClass('step-nav__step--completing'); // 이전 스텝 completing 모드 해제
        completedCircleLen = completedIdx+1;
        currCircle.parent().nextAll('.step-nav__step').eq(0).find('.step-nav__step__circle').removeClass('step-nav__step--completed');
        currCircle.parent().nextAll('.step-nav__step').eq(0).find('.step-nav__step__circle').addClass('step-nav__step--completing');  // 1.5초 후 다음 스텝을 현재 스텝으로 전환한다
        activeBackBtn();    //TODO 분리 필요

        if(currIdx == maxIdx){   // 현재스텝이 마지막 스텝일 경우 'NEXT'를 'DONE' 버튼으로 전환한다
            activeNextBtn();    // TODO 분리 필요
            hidePreBtn();
            changeCurrStepText(completedCircleLen);
            changeNextToDone();

            if(mobile.matches){
                hideBackBtn();
                $nextBtn.css('width', '100%');
            }

        }else if(currIdx < maxIdx){  // 현재스텝이 마지막 스텝 이전일 경우엔 버튼만 활성화한다 ( 마지막 스텝 완료시엔 비활성화 유지 )
            changeDoneToNext();
            changeCurrStepText(completedCircleLen);
            if(currIdx != maxIdx-1){
                activeNextBtn();    // TODO 분리 필요
            }

        }

    }

};

function changeCurrStepText(completedSteps){

    var $stepTitle = $('.step-wrap .step-nav .step-nav__step .step-nav__step__title span');
    var $mobileTitle = $('.step-wrap__small-size-title');
    var currIdx = $('.step-nav__step__circle').index($('.step-nav__step--completing'));
    var currStep = currIdx+1;
    var $currStep = $('#s-content__current-step');

    if(currIdx != -1){
        $mobileTitle.text($stepTitle.eq(currIdx).text());
        $currStep.text('Step0'+currStep);
    }



}

function changeNextToDone(){
    $nextBtn.text('Save');
}

function changeDoneToNext(){
    $nextBtn.text('Next');
}

function disableAllBtn(){
    $nextBtn.attr('disabled', true);
    $preBtn.attr('disabled', true);
}

function disableBackBtn(){
    $preBtn.attr('disabled', true);
}

function activeBackBtn(){
    $preBtn.attr('disabled', false);   // 'BACK' 버튼 활성화
}

function activeNextBtn(){
    $nextBtn.attr('disabled', false);   // 'BACK' 버튼 활성화
}

function disableNextBtn(){
    $nextBtn.attr('disabled', true);
}

function hidePreBtn(){
    $preBtn.addClass('step-controller__button--hidden');
}

function showPreBtn(){
    $preBtn.removeClass('step-controller__button--hidden');
}

function hideBackBtn(){
    $backBtn.addClass('step-controller__button--hidden');
}

function showBackBtn(){
    $backBtn.removeClass('step-controller__button--hidden');
}
