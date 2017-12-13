// var template = Handlebars.compile($("#items-template").html());
// var data = {
// 	getItems: function(groupNo) {
// 		groupNo *= 30;
// 		var items = [];
// 		for(var i=0; i<30; i++) {
// 			items.push(groupNo + i);
// 		}
// 		items = $.map(items, function(v) {
// 			return {
// 				offset: v,
// 				imgSrc: "https://naver.github.io/egjs-experiment/infiniteGridService/demo/img/" + ( ( (v + 1) % 60) + 1 ) + ".jpg",
// 				href: "https://naver.com/",
// 				desc: "Cras justo odio..."
// 			};
// 		});
// 		return {items: items};
// 	}
// };

// $(document).ready(function() {
// 	var $grid = $("#grid");
// 	var ig = new eg.InfiniteGrid("#grid", {
// 		count : 60
// 	}).on({
// 		"append" : function(e) {
// 			var gk = this.getGroupKeys();
// 			var lastGk = gk[gk.length-1];
// 			lastGk++;
// 			console.log(gk);
// 			ig.append(template(data.getItems(lastGk)), lastGk);
// 		},
// 		"prepend" : function(e) {
// 			var firstGk = this.getGroupKeys()[0];
// 			firstGk--;
// 			if(firstGk >= 0) {
// 				ig.prepend(template(data.getItems(firstGk)), firstGk);
// 			}
// 		},
// 		"layoutComplete" : function(e) {
// 			$grid.css("visibility", "visible");
// 		}
// 	});

// 	ig.append(template(data.getItems(0)), 0);
// });

$(document).ready(function(){
	
	
	// ResizeFrame(frameName, 'frameName');

	// Masonry 초기화
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 160,
        gutter: 3
    });

    $('.grid2').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });
	
	// TODO iFrame 로딩 시점을 잡는다.
	// var target = document.getElementById("targetFrameId");
	// isLoadCompleted(target);
	
	var $targetFrame = $('[name=component-frame]');
	$targetFrame.on('load', function(e){
		console.log('iframe is loaded');
		
		var name = $(this).attr('name');
		
		var $contents = $(this).contents();
		var outerWidth = $contents.outerWidth();
		var outerHeight = $contents.outerHeight();
		
		$(this).css('width', outerWidth);
		$(this).css('height', outerHeight);
		$(this).parent().css('width', outerWidth+2);
		$(this).parent().css('height', outerHeight+2);


        $('.grid').masonry('layout');
		
	});


	
	
	
	
	
	
});
// function isLoadCompleted(target){
// 	if (target.readyState == "complete") {
// 		alert("ok");
// 	} else {
// 		setTimeout(isLoadCompleted,300);
// 	}
// }

function ResizeFrame(name, nameStr)
{
	// IFRAME 내부의 body 개체
	// var fBody = document.frames(name).document.body;
	// var fBody = name.document.body;
	var fBody = name.document.getElementById('contents');
	// IFRAME 개체
	// var fName = document.all(name);
	var fName = document.querySelector('[name='+nameStr+']').parentElement;

	// IFRAME 내부의 body개체의 넓이를 계산하여 IFRAME의 넓이를 설정해 준다.
	fName.style.width = fBody.scrollWidth + (fBody.offsetWidth - fBody.clientWidth);
	// IFRAME 내부의 body개체의 높이를 계산하여 IFRAME의 높이를 설정해 준다.
	fName.style.height = fBody.scrollHeight + (fBody.offsetHeight - fBody.clientHeight);
	
	console.log({
		'width': fName.style.width,
		'height': fName.style.height
	});

	// 만약 IFRAME의 크기 설정에 실패 하였다면 기본크기로 설정한다.
	if (fName.style.height == "0px" || fName.style.width == "0px")
	{
		fName.style.width = "160px"; //기본 iframe 너비
		fName.style.height = "160px"; //기본 iframe 높이
	}
}

