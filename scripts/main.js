"use strict";
$(document).ready(function() {
    const scroll_counter = 4;

    /**
     * alternative menu activation
     */

    let href = "home";
    let grid = $('button.grid-list-view p').text() == "GRID VIEW";

    $(`.menu-el a[data-href=${href}]`).parent().addClass('active')

    $(".menu-trigger").on("click", function() {
        $(this).toggleClass("tgl");
        $(".menu-wrapper").toggleClass("tgl-brd");
        $(".bg-alter").toggleClass("display-n");
        $(".side-bar").toggleClass("display-n");
        $(".menu-extra-el").toggleClass("menu-extra-anim");
        return false;
    });

    /**
     * Grid < -- > List view swapper
     */

    $("button.grid-list-view").on("click", function() {
        grid = $('button.grid-list-view').children().text() == "GRID VIEW";
        $('.project-wrapper-list').removeClass('d-n');
        $(this).html(
            grid ?
            "<p>LIST&nbsp;VIEW</p>" :
            "<p>GRID&nbsp;VIEW</p>"
        );

        if (!grid) {

            $(`.project-wrapper-list`).addClass('project-view-swap');


        } else {
            $(`.project-wrapper-list`).removeClass('project-view-swap');
        }
        return false;
    });
    /**
     * Navigation
     */

    $(".menu-el, .menu-alter-el").on("click", function() {
        $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
        $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)
        setTimeout(() => {
            $(".menu-el").removeClass("active");

            $('.content').removeClass(`scroll-animation-out-${href} active-content`)
            href = $(this).children().attr('data-href');

            if (href === "about") {
                location.href = "/pages/about.html";

            }

            $(this).addClass("active");
            $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);
            $(`.menu-el a[data-href=${href}]`).parent().addClass('active')


            if (!grid) {
                $('.project-wrapper-list').addClass('d-n');
            }

        }, 1500);
        return false;
    });
    $(".project-wrapper-grid").on("mousemove", function(e) {
        $('.group-project .project').each((i, el) => {
            const x = Math.round((window.innerWidth - e.pageX * 2) / 70);
            const y = Math.round((window.innerWidth - e.pageY * 2) / 70);
            el.style.transform = `translateX(${x}px) translateY(${y}px) `;
        });
    });
    $(".group-project .project").mouseenter(function(e) {
        // console.log($(this).children('h1').length);
        if (!$(this).children('p').length) {
            // console.log($(this).attr('data-content'));
            $(this).prepend(`<p>${$(this).attr('data-content')}</p>`)
        }
    });
    $(".group-project .project").click(function(e) {

        location.href = `./pages/${$(this).attr('data-content').toLowerCase().replace('.', '-')}.html`;

    });
    $(".group-project .project").mouseleave(function(e) {
        if ($(this).children('p')) {
            // console.log($(this).attr('data-content'));
            $(this).children('p').remove()
        }
    });

    let counter = 0;
    let skip = true;
    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    const hrefs_list = [];

    $('.menu-el').each(function(index) {

        hrefs_list.push($(this).children().attr('data-href'));
    });

    function preventDefault(e) {
        // console.log(e);
        counter = e.deltaY > 0 ? counter + 1 : counter - 1;
        console.log(href);

        if (counter >= scroll_counter && hrefs_list[hrefs_list.indexOf(href) + 1] && skip) {
            skip = false;
            counter = 0;
            $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
            $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)
            setTimeout(() => {
                if (href === "about" || href === "team") {
                    location.href = "/pages/about.html";
                }
                $(".menu-el").removeClass("active");
                $('.content').removeClass(`scroll-animation-out-${href} active-content`)
                $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) + 1]}]`).parent().addClass('active')
                href = $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) + 1]}]`).attr('data-href');

                $('.content').removeClass('active-content');
                $(`.content#${href}`).addClass("active-content");
                $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
                $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);

                if (!grid) {
                    $('.project-wrapper-list').addClass('d-n');
                }
                skip = true;
                counter = 0;
            }, 1500);

        }
        if (counter <= -scroll_counter && hrefs_list[hrefs_list.indexOf(href) - 1] && skip) {
            counter = 0;
            skip = false;
            $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
            $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)
            setTimeout(() => {
                if (href === "about" || href === "team") {
                    location.href = "/pages/about.html";
                }
                $(".menu-el").removeClass("active");
                $('.content').removeClass(`scroll-animation-out-${href} active-content`)
                $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) - 1]}]`).parent().addClass('active')
                href = $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) - 1]}]`).attr('data-href');

                $('.content').removeClass('active-content');
                $(`.content#${href}`).addClass("active-content");
                $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
                $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);

                if (!grid) {
                    $('.project-wrapper-list').addClass('d-n');
                }
                skip = true;
                counter = 0;
            }, 1500);

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

    function disableScroll() {
        window.addEventListener("DOMMouseScroll", preventDefault, false);
        window.addEventListener(wheelEvent, preventDefault, wheelOpt);
        window.addEventListener("touchmove", preventDefault, wheelOpt);
        window.addEventListener("keydown", preventDefaultForScrollKeys, false);
    }
    if (window.location.pathname === "/") {
        disableScroll()
    }


});