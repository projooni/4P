/**
 * Created by SDS on 2018-01-05.
 */

var maxPageCnt = 3;
var currPageIdx = 0;
var animating = false;

$(document).ready(function(){

    $('.page').on('animationend', function(e){

        console.log(this.className);

        var preIdx = (currPageIdx-1) % maxPageCnt;

        console.log({
            'preIdx' : preIdx,
            'currPageIdx' : currPageIdx
        });

        if(preIdx >= 0){

            $('.page').eq(preIdx).css('display', 'none');
        }

        currPageIdx++;
        animating = false;

    });


    $('.next-btn').on('click', function(e){

        if(animating){
            return;
        }
        animating = true;

        console.log( $('.page-'+(currPageIdx%maxPageCnt)));

        $('.page').eq(currPageIdx%maxPageCnt).css('display', 'inline-block');

    });



});