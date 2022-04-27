"use strict";
$(document).ready((function () {
    const scroll_counter = 4;
    const mobile_scroll_counter = 6;

    /**
     * alternative menu activation
     */

    let href = "home";
    let grid = $('button.grid-list-view p').text() == "GRID VIEW";

    $(`.menu-el a[data-href=${href}]`).parent().addClass('active')

    $(".menu-trigger").on("click", (function () {
        $(this).toggleClass("tgl");
        $(".menu-wrapper").toggleClass("tgl-brd");
        $(".bg-alter").toggleClass("display-n");
        $(".side-bar").toggleClass("display-n");
        $(".menu-extra-el").toggleClass("menu-extra-anim");
        return false;
    }));

    /**
     * Grid < -- > List view swapper
     */

    $("button.grid-list-view").on("click", (function () {
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
    }));
    /**
     * Navigation
     */

    $(".menu-el, .menu-alter-el").on("click", (function () {
        if (location.pathname !== "/") location.href = "/";
        $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
        $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)
        setTimeout(() => {
            $(".menu-el").removeClass("active");

            $('.content').removeClass(`scroll-animation-out-${href} active-content`)
            href = $(this).children().attr('data-href');

            if (href === "about") {
                location.href = "/pages/about.html";
            } else if (href === "home") {
                $(".view-wrapper").addClass("d-n")
            } else {
                $(".view-wrapper").removeClass("d-n")
            }

            $(this).addClass("active");
            $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);
            $(`.menu-el a[data-href=${href}]`).parent().addClass('active')


            if (!grid) {
                $('.project-wrapper-list').addClass('d-n');
            }

        }, 1500);
        return false;
    }));
    $(".project-wrapper-grid").on("mousemove", (function(e) {
        $('.group-project .project').each((i, el) => {
            const x = Math.round((window.innerWidth - e.pageX * 2) / 70);
            const y = Math.round((window.innerWidth - e.pageY * 2) / 70);
            el.style.transform = `translateX(${x}px) translateY(${y}px) `;
        });
    }));
    
    $(".group-project .project").mouseenter((function (e) {

        if (!$(this).children('p').length) {

            $(this).prepend(`<p>${$(this).attr('data-content')}</p>`)
        }
    }));
    $(".group-project .project").click((function (e) {

        location.href = `./pages/${$(this).attr('data-content').toLowerCase().replace('.', '-')}.html`;

    }));
    $(".group-project .project").mouseleave((function (e) {
        if ($(this).children('p')) {

            $(this).children('p').remove()
        }
    }));

    let counter = 0;
    let skip = true;
    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    const hrefs_list = [];
    const mobileScrollBuffer = [];
    let mobileCounter = 0;
    let isMobile = false;



    $('.menu-el').each((function () {

        hrefs_list.push($(this).children().attr('data-href'));
    }));



    function preventDefault(e) {
        // console.log(e.changedTouches[0].screenY);

        if ('changedTouches' in e) {
            isMobile = true;
            mobileScrollBuffer.push(e.changedTouches[0].screenY);

            if (mobileScrollBuffer.length >= 2 && skip) {

                mobileCounter = mobileScrollBuffer.shift() > mobileScrollBuffer.pop() ? mobileCounter + 1 : mobileCounter - 1;
                mobileScrollBuffer.length = 0;
            }

        } else {
            isMobile = false;
            counter = e.deltaY > 0 ? counter + 1 : counter - 1;
        }
        if ((counter >= scroll_counter || mobileCounter >= mobile_scroll_counter) && hrefs_list[hrefs_list.indexOf(href) + 1] && skip) {
            skip = false;
            counter, mobileCounter, mobileScrollBuffer.length = 0;
            $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
            $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)
            setTimeout(() => {

                if ((href === "about" || href === "team") && !isMobile) {

                    location.href = "/pages/about.html";
                } else if ((href === "about" || href === "team") && isMobile) {

                    $("button.scroll-down p").text('close').css("font-size", "14px")

                }
                $(".menu-el").removeClass("active");
                $('.content').removeClass(`scroll-animation-out-${href} active-content`)
                $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) + 1]}]`).parent().addClass('active')
                href = $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) + 1]}]`).attr('data-href');
                if (href === "home") {
                    $(".view-wrapper").addClass("d-n")
                } else {
                    $(".view-wrapper").removeClass("d-n")
                }
                $('.content').removeClass('active-content');
                $(`.content#${href}`).addClass("active-content");
                $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
                $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);

                if (!grid) {
                    $('.project-wrapper-list').addClass('d-n');
                }
                console.log(href);
                skip = true;
                counter = 0;
                mobileCounter = 0;

            }, 1500);

        }
        if ((counter <= -scroll_counter || mobileCounter <= -mobile_scroll_counter) && hrefs_list[hrefs_list.indexOf(href) - 1] && skip) {
            counter = 0;
            mobileCounter = 0;
            skip = false;
            $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
            $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)
            setTimeout(() => {
                $(".menu-el").removeClass("active");
                $('.content').removeClass(`scroll-animation-out-${href} active-content`)
                $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) - 1]}]`).parent().addClass('active')
                href = $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) - 1]}]`).attr('data-href');
                if (href === "home") {
                    $(".view-wrapper").addClass("d-n")
                } else {
                    $(".view-wrapper").removeClass("d-n")
                }
                $('.content').removeClass('active-content');
                $(`.content#${href}`).addClass("active-content");
                $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
                $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);

                if (!grid) {
                    $('.project-wrapper-list').addClass('d-n');
                }
                skip = true;
                counter = 0;
                mobileCounter = 0;
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

    /**
     * Mobile scroll
     */

    $("button.scroll-down").on("click", (function () {

        skip = false;
        counter, mobileCounter, mobileScrollBuffer.length = 0;

        $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
        $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)
        setTimeout(() => {
            if (href === "team") {

                $("button.scroll-down p").html('close').css("font-size", "14px");

            } else {
                $("button.scroll-down p").html('<i class="fa-thin fa-arrow-down"></i>').css("font-size", "34px")
            }

            $('.content').removeClass(`scroll-animation-out-${href} active-content`)

            href = $(`.menu-el a[data-href=${hrefs_list[hrefs_list.indexOf(href) + 1]}]`).attr('data-href');

            $('.content').removeClass('active-content');
            $(`.content#${href}`).addClass("active-content");

            $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);

            if (!grid) {
                $('.project-wrapper-list').addClass('d-n');
            }
            if (!href) {
                href = "home";

                $('.content').removeClass(`scroll-animation-out-about active-content`)

                $('.content').removeClass('active-content');
                $(`.content#${href}`).addClass("active-content");

                $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);
            }
            console.log(href);
            skip = true;
            counter, mobileCounter = 0;

        }, 1500);
        return false;
    }));

    $(".mobile-default-view p button").on("click",
        (function () {
            skip = false;
            $(".mobile-default-view").addClass('d-n');
            $(".button-scroll-down").addClass('d-n')
            $(".view-wrapper").addClass('mobile-view-wrapper')
            $(".mobile-back-arrow").removeClass('d-n')

        })
    );
    $(".mobile-back-arrow").on("click", (function () {
        skip = true
        $(".mobile-default-view").removeClass('d-n');
        $(".button-scroll-down").removeClass('d-n')
        $(".view-wrapper").removeClass('mobile-view-wrapper')
        $(".mobile-back-arrow").addClass('d-n')

    }));

    $(".scroll-down-project").on("click", (function (e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: 900 }, 500);

    }));
}));