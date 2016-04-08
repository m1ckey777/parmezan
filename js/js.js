$(document).ready(function() {

	$('.js-popup-modal').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
		showCloseBtn: false
	});
	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	$('.js-main-slider').slick({
		arrows: false,
		dots: true
	});

	// Корзина - Плюс минус

	// This button will increment the value
	$('.js-qtyplus').click(function(e){
		// Stop acting like a button
		e.preventDefault();
		// Get the field name
		fieldName = $(this).attr('field');
		// Get its current value
		var currentVal = parseInt($('input[name='+fieldName+']').val());
		// If is not undefined
		if (!isNaN(currentVal)) {
			// Increment
			$('input[name='+fieldName+']').val(currentVal + 1);
		} else {
			// Otherwise put a 0 there
			$('input[name='+fieldName+']').val(0);
		}
	});
	// This button will decrement the value till 0
	$(".js-qtyminus").click(function(e) {
		// Stop acting like a button
		e.preventDefault();
		// Get the field name
		fieldName = $(this).attr('field');
		// Get its current value
		var currentVal = parseInt($('input[name='+fieldName+']').val());
		// If it isn't undefined or its greater than 0
		if (!isNaN(currentVal) && currentVal > 0) {
			// Decrement one
			$('input[name='+fieldName+']').val(currentVal - 1);
		} else {
			// Otherwise put a 0 there
			$('input[name='+fieldName+']').val(0);
		}
	});

	// End Корзина - Плюс минус

	$('.js-open-ingredients').click(function(){

		$(this).toggleClass('active');
		$(".js-open-ingredients").not(this).removeClass('active').next('.js-hidden-ingredients-list').slideUp();
		$(this).next('.js-hidden-ingredients-list').slideToggle();
	});

	$('.js-item-price').click(function(){
		var $wr=$(this).closest('.catalog__item'),
			$price=$(this).data('price'),
			$wrPrice = $wr.find('.catalog__item-price');
			
		$(this).addClass('active');
		$wr.find('.js-item-price').not(this).removeClass('active')
		$wrPrice.html('' + $price + ' <small>руб.</small>');
	});

	$('.js-add-review').click(function(){
		$(this).toggleClass('active');
		$(this).next('.js-hidden-add-review-form').slideToggle();
	});

	$(":file").jfilestyle({input: false});

	$(function () {

        if(!$('#ingredients-choice-form').length) return;
        
        $('#ingredients-choice-form').submit(function(){
			$.magnificPopup.open({
				items: {
					src: '#basket-informer'
				},
				type: 'inline',
				preloader: false,
				focus: '#username',
				closeBtnInside: false
			}, 0);
			setTimeout(function(){
				$.magnificPopup.close();
			}, 4000);
			return false;
		});

	});
	
});

//-------------------sticky-footer--------------------------------

$(function(){ 
	var paused = false;
	var stickyInfobox = function () {
		var out = $(".footer__layout").offset().top,
			scrollTop = $(window).scrollTop(),
			heightView = $(window).height();

		if( (scrollTop + heightView) > out){
		  if (!paused) {
			$(".js-basket-informer").stop().fadeOut();
			paused = true;
		  }
		} else{
		  if (paused) {
			$(".js-basket-informer").fadeIn();
			paused = false;
		  }
		}
	}
	stickyInfobox();

	$(window).scroll(function(){
		stickyInfobox();
	});
});

//------------------sticky-menu---------------------------------

$(function(){ 
	if(!$(".js-sticky-menu").length) return;
	var $menu = $(".js-sticky-menu"),
		times = 0,
		flag = false,
		flag2 = false,
		$menuOffset = $menu.offset().top;

	if ( $(window).scrollTop() > $menuOffset){
		$menu.addClass("fix");
		flag2 = true;
	}

	var fadeIn = function () {
	    $menu.addClass("fix");
	    i = false;
	}

	var display = function () {
	    $menu.addClass("fix");
	    i = false;
	}

	$(window).scroll(function(){
	    if ( $(this).scrollTop() > $menuOffset){
	    	times=times+1;
	    	if ( !flag && times==1 && flag2==true){
				i = true;
				flag2 = false;
				display();
			}
			else if ( !flag && times==1 ){
				i = true;
				fadeIn();
			}
	    }
	    else{
	    	$menu.removeClass("fix");
	    	times = 0;
	    }
	});
});