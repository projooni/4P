$(document).ready(function(){
    var that = this,
        $selectBoxEl = $(".cft-table-filter__select-box"),
        $dropDownEl = $(".cft-table-filter__dropdown-list"),
        $colEl = $("th[class*='cft-table__header__title-']"),
        $checkboxEls = $(".cft-table-filter__dropdown-list li:not(.cft-table-filter__select-box__select-all) input[type='checkbox']"),
        $currentColNum = $(".cft-table-filter__current-column-num"),

        //sa: select all
        $saCheckBoxEl = $(".cft-table-filter__select-box__select-all input[type='checkbox']");

    $selectBoxEl.on('click', function(e){
        e.stopPropagation();
        if($selectBoxEl.hasClass('cft-table-filter__select-box--active')){
            $selectBoxEl.removeClass('cft-table-filter__select-box--active');
        } else {
            $selectBoxEl.addClass('cft-table-filter__select-box--active');
        }
    });

    $(document).on('click', function (e) {
        if(!$(e.target).closest("ul").is($dropDownEl)) {
            if($selectBoxEl.hasClass('cft-table-filter__select-box--active')){
                $selectBoxEl.removeClass('cft-table-filter__select-box--active');
            }
        }
    });

    $saCheckBoxEl.on('change', function(e){
        var isAllChecked = that.isAllChecked();
        $checkboxEls.prop('checked', !isAllChecked);

        for (var i = 0; i < $checkboxEls.length; i++) {
            var $checkEl = $checkboxEls.eq(i);
            var $cellEl = $("td[class*='cft-table__row__cell-" + $checkEl.val() + "']");
            if ($checkEl.prop('checked')) {
                $colEl.eq(i + 1).css('display', 'table-cell');
            } else {
                $colEl.eq(i + 1).css('display', 'none');
            }
            $currentColNum.text(numberOfChecked());
            $cellEl.css('display', $colEl.eq(i + 1).css('display'));
        }

        checkDropDownList(false);
    });

    $checkboxEls.on('change', function(e){
        var $checkEl = $(this);
        var index = $checkboxEls.index(this);
        var $cellEl = $("td[class*='cft-table__row__cell-" + $checkEl.val() + "']");

        if ($checkEl.prop('checked')) {
            $colEl.eq(index + 1).css('display', 'table-cell');
        } else {
            $colEl.eq(index + 1).css('display', 'none');
        }

        $currentColNum.text(numberOfChecked() + 1);
        $cellEl.css('display', $colEl.eq(index + 1).css('display'));
        $saCheckBoxEl.prop('checked', that.isAllChecked());
    });

    function checkDropDownList(){
        var checkedBoxNum = 0;

        for(var i = 0 ; i < $checkboxEls.length ; i++){
            var checkboxEl = $checkboxEls.eq(i);
            var attrDisplay = $colEl.eq(+checkboxEl.val() - 1).css('display');
            var $cellEl = $("td[class*='cft-table__row__cell-" + checkboxEl.val() + "']");

            if(attrDisplay !== "none"){
                checkboxEl.prop('checked', true);
                checkedBoxNum += 1;
            } else {
                checkboxEl.prop('checked', false);
            }
        }

        $saCheckBoxEl.prop('checked', that.isAllChecked());
        $currentColNum.text(checkedBoxNum + 1);
    }

    function isAllChecked(){
        var allChecked = true;
        for(var i = 0 ; i < $checkboxEls.length ; i++){
            var checkboxEl = $checkboxEls.eq(i);
            if(!checkboxEl.prop('checked')){
                return false
            }
        }
        return allChecked;
    }

    function numberOfChecked(){
        var num = 0;
        for(var i = 0 ; i < $checkboxEls.length ; i++){
            var checkboxEl = $checkboxEls.eq(i);
            if(checkboxEl.prop('checked')){
                num += 1;
            }
        }
        return num;
    }
    that.isAllChecked = isAllChecked;

    $(window).on('resize', checkDropDownList);

    checkDropDownList();
});