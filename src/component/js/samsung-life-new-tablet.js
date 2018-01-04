/**
 * Created by SDS on 2018-01-04.
 */
/**
 * Created by SDS on 2018-01-04.
 */

var $activeMenuContent = '';
var isMoving = false;

$(document).ready(function(){

    var $menuBtn = $('.menu-btn');
    var $activeBorder = $('.active-border');
    var $activeBtn = $('.menu-btn.active');


    $activeBorder.css('left', $menuBtn.eq(0).position().left);
    $activeBorder.css('top', $menuBtn.eq(0).position().top + 30);
    $activeBorder.css('display', 'inline-block');
    tranBgContent(0);


    // $menuBtn.each(function(index, item){

    // if($(item).hasClass('active')){
    //
    //     $activeBorder.animate({
    //         top: '100px',
    //         left: '100px'
    //     }, {
    //         duration: 2000,
    //         specialEasing: {
    //             width: "linear",
    //             height: "easeOutBounce"
    //         },
    //         complete: function() {
    //             console.log('finish animation');
    //             // $( this ).after( "<div>Animation complete.</div>" );
    //         }
    //     });
    //
    // }


    // });


    $menuBtn.on('click', function(e){

        var idx = $menuBtn.index($(this));
        var $selectedBtn = $menuBtn.eq(idx);

        console.log(idx + ' click');

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
            if($activeMenuContent !== null && $activeMenuContent !== ''){
                $activeMenuContent.css('display', 'none');

                $activeMenuContent.css('top', '100%');
            }

            $activeMenuContent = $(this);
            isMoving = false;
        }
    });

}