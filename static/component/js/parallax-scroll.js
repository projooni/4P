/**
 * Created by SDS on 2018-01-09.
 */

/**
 * Created by SDS on 2018-01-04.
 */

var $activeMenuContent = '';
var isMoving = false;
var $menuArea = $('.menu-area');
var $srchBtn = $('.srch-area .srch-btn');
var $srchInput = $('.srch-area .srch-input-text');
var userName = '';
var $gnb = $('#parallax-transition-wrap .gnb');

$(document).ready(function(){

    var $menuBtn = $('.menu-btn');
    var $activeBorder = $('.active-border');
    var $activeBtn = $('.menu-btn.active');

    $activeBorder.css('left', $menuBtn.eq(0).position().left);
    $activeBorder.css('top', $menuBtn.eq(0).position().top + 30);
    $activeBorder.css('display', 'inline-block');

    $srchInput.on('keypress', function(e){

        var key = e.key;

        if(key == 'Enter'){
            $srchBtn.click();
        }

    });
    $srchBtn.on('click', function(e){

        // 배경전환
        tranBgContent(0);
        // show welcome text
        var $selectedBtn = $menuBtn.eq(0);
        $activeBorder.css('top', $selectedBtn.position().top + 30);
        userName = $('.srch-area .srch-input-text').val();
        $('.menu-area .name').text(userName);
        $gnb.removeClass('white');


    });


    $menuBtn.on('click', function(e){

        $('.cards-area').removeClass('move-left');
        $('.cards-area .plus-card').css('width','60px');
        $('.cards-area .card').last().addClass('plus-card');

        var idx = $menuBtn.index($(this));
        var $selectedBtn = $menuBtn.eq(idx);

        console.log(idx + ' click');
        console.log($selectedBtn);
        console.log($selectedBtn.position());

        if(!isMoving){
            isMoving = true;

            $activeBorder.animate({
                top: $selectedBtn.position().top + 30
                // left: $selectedBtn.position().left
            }, {
                duration: 800,
                specialEasing: {
                    width: "linear",
                    height: "easeOutBounce"
                },
                complete: function() {
                    // console.log('finish animation');
                    // $( this ).after( "<div>Animation complete.</div>" );
                }
            });

            $activeBtn.toggleClass('active');
            $selectedBtn.toggleClass('active');
            $activeBtn = $selectedBtn;

            tranBgContent(idx);



        }


    });

});

function tranBgContent(idx){

    if(!$menuArea.is(':visible')){
        $menuArea.css('display','inline-block');
    }

    $('.menu-content-' + (idx+1)).css('display', 'inline-block');
    if($activeMenuContent !== null && $activeMenuContent !== ''){
        $activeMenuContent.css('z-index', '998');
    }
    $('.menu-content-' + (idx+1)).css('z-index', '999');

    $('.menu-content-' + (idx+1)).animate({
            top: '0%',
            // easing: "easeOut",

        },
        {
            duration: 1000,

            // specialEasing: {
            //     top: "easeOut"
            //
            // },
            complete: function() {
                console.log('finish animation');
                console.log(idx);
                console.log($activeMenuContent);
                if($activeMenuContent !== null && $activeMenuContent !== ''){
                    if($activeMenuContent.attr('data-idx') != (idx+1)){
                        $activeMenuContent.css('display', 'none');
                        $activeMenuContent.css('top', '100%');
                    }
                }

                $activeMenuContent = $(this);
                isMoving = false;
            }
        });

}