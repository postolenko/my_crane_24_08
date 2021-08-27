$(document).ready(function(){
    $("select[name='company']").multiselect({
        nonSelectedText: "Производитель",
        allSelectedText: "Выбраны все"
    });

    $("select[name='model']").multiselect({
        nonSelectedText: "Модель",
        allSelectedText: "Выбраны все"
    });

    $("select[name='config']").multiselect({
        nonSelectedText: "Конфигурация",
        allSelectedText: "Выбраны все"
    });
    // var swiper = new Swiper(".gallery__nav", {
    //     spaceBetween: 10,
    //     slidesPerView: 3,
    //     freeMode: true,
    //     watchSlidesVisibility: true,
    //     watchSlidesProgress: true
    // });
    
    // var mySwiper = new Swiper(".gallery__main", {
    //     spaceBetween: 10,

    //     thumbs: {
    //         swiper: swiper,
    //     },
    // });

    // if($(".product__images .gallery__nav .swiper-slide").length <= 3){
    //     swiper.allowTouchMove = false
    // }
    // $('[name="form_text_1"]').mask('+7 (000) 000-00-00');
    
    $('.bx-filter-select-popup').on('click', '.checkbox', function(){
        $(this).parent().toggleClass('active');
    });

    $('.btn--block').on('click', '.btn--show-more', function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr('href')
        }).done(function( ehtml ) {
            $('.catalog__list').last().after($(ehtml).find('.catalog__list'));
            if($(ehtml).find('.btn--show-more').length == 0) {
                $('.btn--show-more').hide();
            } else {
                $('.btn--show-more').attr('href', $(ehtml).find('.btn--show-more').attr('href'));
            }
        });
    });

    // ------------

    $(".placeholderTextArea").on("click", function(e) {
        e.preventDefault();
        if($(this).find("textarea, input").val() == "") {
            $(this).addClass("active");
            $(this).find("textarea, input").focus();
        }
    });

    $(document).on("mouseup", function(e) {
        hide_element = $(".placeholderTextArea");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            $(".placeholderTextArea").each(function() {
                if($(this).find("textarea, input").val() == "") {
                    $(this).removeClass("active");
                }
            });
        }
    });

    // -------------

    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      $("body").addClass("fixed");
      $("body").css({
          "position" : "fixed",
          "top" :  -$(document).scrollTop() + "px",
          "overflow" : "hidden",
          "right" : 0,
          "left" : 0,
          "bottom" : 0,
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });

    $(document).on("click", ".close_popup, .popup_bg", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").attr("style", "");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").removeClass("fixed");
      $(".popup_bg").fadeOut(300);
      $("[data-popup]").fadeOut(300);
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
      }
    });
    
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // -----------

    imgInp.onchange = evt => {
      const [file] = imgInp.files
      if (file) {
        console.log(URL.createObjectURL(file));
        $("#blah").css({
          "display":"block",
          "background-image" : "url("+URL.createObjectURL(file)+")"
        });
        $("#blah").closest(".add_photo_2").addClass("bg_js");
      }
    }

    // -----------

    $("[data-append-btn]").on("click", function(e) {
      e.preventDefault();
      appendName = $(this).attr("data-append-btn");
      appendTempl = $("[data-append-templ = '"+appendName+"'] > div");
      appendTempl.clone().prependTo("[data-append-content = '"+ appendName +"']");
    });

    // -----------

    $(document).on("change", ".timeCh", function(e) {
      e.preventDefault();
      parent = $(this).closest(".work_time");
      if($(this).is(":checked")) {
        parent.addClass("active");
      } else {
        parent.removeClass("active");
      }
    });

});