"use strict";
$(document).ready(function() {
    console.log("Document loaded");
    let href = "home";
    let grid = $('button.grid-list-view').children().text() == "GRID VIEW";


    $(`.menu-el a[data-href=${href}]`).parent().addClass('active')


    $(".menu-trigger").on("click", function() {
        $(this).toggleClass("tgl");
        $(".menu-wrapper").toggleClass("tgl-brd");
        $(".bg-alter").toggleClass("display-n");
        $(".side-bar").toggleClass("display-n");
        $(".menu-extra-el").toggleClass("menu-extra-anim");
        return false;
    });
    $("button.grid-list-view").on("click", function() {
        grid = $('button.grid-list-view').children().text() == "GRID VIEW";
        $('.project-wrapper-list').removeClass('d-n');
        $(this).html(
            grid ?
            "<p>LIST&nbsp;VIEW</p>" :
            "<p>GRID&nbsp;VIEW</p>"
        );

        console.log(href, grid);
        if (!grid) {

            $(`.project-wrapper-list`).addClass('project-view-swap');


        } else {
            $(`.project-wrapper-list`).removeClass('project-view-swap');
        }
        return false;
    });
    $(".menu-el, .menu-alter-el").on("click", function() {
        $('.page-scroller').attr('id', 'page-scroller');
        $(".menu-el").removeClass("active");
        $(this).addClass("active");
        href = $(this).children().attr('data-href');

        $('.content').removeClass('active-content');
        $(`.content#${href}`).addClass("active-content");
        $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
        console.log(grid);
        window.setTimeout(() => {
            $('.page-scroller').attr('id', '');
        }, 1250)
        if (!grid) {
            $('.project-wrapper-list').addClass('d-n');
        }

        return false;
    });
    $(".project-wrapper-grid").on("mousemove", function(e) {
        $('.project').each((i, el) => {
            const x = Math.round((window.innerWidth - e.pageX * 2) / 70);
            const y = Math.round((window.innerWidth - e.pageY * 2) / 70);
            el.style.transform = `translateX(${x}px) translateY(${y}px) `;
        });
    });
    $(".project").mouseenter(function(e) {
        // console.log($(this).children('h1').length);
        if (!$(this).children('h1').length) {
            // console.log($(this).attr('data-content'));
            $(this).prepend(`<h1>${$(this).attr('data-content')}</h1>`)
        }
    });
    $(".project").mouseleave(function(e) {
        if ($(this).children('h1')) {
            // console.log($(this).attr('data-content'));
            $(this).children('h1').remove()
        }

    });



    let counter = 0;
    // let 
    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    const hrefs_list = [];

    $('.menu-el').each(function(index) {

        hrefs_list.push($(this).children().attr('data-href'));
    });

    console.log(hrefs_list);


    function preventDefault(e) {
        // console.log(e);
        counter = e.deltaY > 0 ? counter + 1 : counter - 1;
        // console.log(hrefs_list);

        if (counter >= 3 && hrefs_list[hrefs_list.indexOf(href) + 1]) {

            $(".menu-el").removeClass("active");

            $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) + 1]}]`).parent().addClass('active')
            href = $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) + 1]}]`).attr('data-href');

            $('.content').removeClass('active-content');
            $(`.content#${href}`).addClass("active-content");
            $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
            console.log(grid);
            if (!grid) {
                $('.project-wrapper-list').addClass('d-n');
            }


            // $(".menu-el, .menu-alter-el")
            counter = 0;
        }
        if (counter <= -3 && hrefs_list[hrefs_list.indexOf(href) - 1]) {

            $(".menu-el").removeClass("active");

            $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) - 1]}]`).parent().addClass('active')
            href = $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) - 1]}]`).attr('data-href');

            $('.content').removeClass('active-content');
            $(`.content#${href}`).addClass("active-content");
            $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
            console.log(grid);
            if (!grid) {
                $('.project-wrapper-list').addClass('d-n');
            }
            counter = 0;
        }

        e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    const supportsPassive = true;

    const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    window.addEventListener("DOMMouseScroll", preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener("touchmove", preventDefault, wheelOpt);
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);


});