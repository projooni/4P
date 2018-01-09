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
var userName = '';
var $hamburgerBtn = $('.hamburger-btn');
var $plusCard = $('.plus-card');
var $gnb = $('#parallax-transition-wrap .gnb');
var $icoHome = $('.gnb .ico-home');
var $contents = $('#contents');
var $hiddenContents = $('#hidden-contents');
// var $toggleBtn =s$('#home-contents .toggle-btn');

$(document).ready(function(){

    var $menuBtn = $('.menu-btn');
    var $activeBorder = $('.active-border');
    var $activeBtn = $('.menu-btn.active');

    $(document).on('click', '#home-contents .toggle-btn', function(e){

        if($(this).hasClass('star-toggle')){
            $(this).css('background-color','transparent');
        }else{
            $(this).css('background-color','#ebebeb');
        }
        $(this).toggleClass('star-toggle');

    });

    $icoHome.on('click', function(e){
        $contents.html($hiddenContents.html());
    });

    $hamburgerBtn.on('click', function(e){

        console.log('hamburger button clicked');
        $(this).toggleClass('x-mode');
        $(this).parent('.gnb').toggleClass('sub-menu');

    });

    $activeBorder.css('left', $menuBtn.eq(0).position().left);
    $activeBorder.css('top', $menuBtn.eq(0).position().top + 30);
    $activeBorder.css('display', 'inline-block');


    $plusCard.on('click', function(e){

        $(this).css('width','200px');
        $(this).removeClass('plus-card');
        $(this).parent('.cards-area').addClass('move-left');

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

    var $slides = $('.slide'),
        max = $slides.length - 1,
        center = 1,
        classNames = '',
        animating = false;

    $('#wrap').on('click', function(e) {
        // Wait for the animation to finish so we dont get a weird warped animation
        if (animating) return;

        console.log('btn click');
        console.log(e.target.parentNode.className);
        // Was a btn clicked?
        if (e.target.parentNode.className === 'btn') {

            animating = true;

            // Update center position depending on which button was pressed
            switch (e.target.parentNode.id) {
                case 'btn-left':
                    center = rotate(center - 1, max);
                    $slides.parent().attr('class', 'sliding-left');
                    break;
                case 'btn-right':
                    center = rotate(center + 1, max);
                    $slides.parent().attr('class', 'sliding-right');
                    break;
            }

            // Update each slides class names
            $slides.each(function(i) {
                classNames = 'slide';
                switch (i) {
                    case rotate(center - 1, max):
                        classNames += ' slide-left';
                        break;
                    case rotate(center, max):
                        classNames += ' slide-center';
                        break;
                    case rotate(center + 1, max):
                        classNames += ' slide-right';
                        break;
                }
                this.className = classNames;
            })
            // Toggle off class once the animation is complete
                .on('transitionend', function() {
                    animating = false;
                });
        }
    });



    /**
     * Returns the rotated index within a range
     */
    function rotate(i, max) {
        if (i < 0) return max;
        if (i > max) return 0;
        return i;
    }



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