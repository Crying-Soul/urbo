"use strict";
$(document).ready((function() {
    let speed = 0,
        direction = { x: 1, y: 1 };
    let bufferX = 0,
        bufferY = 0;
    const copy_model_projects = document.querySelector('#projects .group');
    const copy_model_team = document.querySelector('#team .group');
    let bufferLink = [
        []
    ];
    let intervalID = null;


    $('.flex-projects').on("mousemove", (e) => {
        speed = 3;
        bufferX = e.pageX / window.innerWidth;
        bufferY = e.pageY / window.innerHeight;
        if (bufferX <= 0.5) {
            direction.x = 1 - bufferX;
        } else {
            direction.x = -bufferX;
        }
        if (bufferY <= 0.5) {
            direction.y = 1 - bufferY;
        } else {
            direction.y = -bufferY;
        }

        if (bufferX <= 0.7 && bufferX >= 0.4 && bufferY <= 0.7 && bufferY >= 0.4) {
            direction.x = 0;
            direction.y = 0;
        }
    });



    const createPlayer = (buffer, model, parent_el) => {
        let w = model.clientWidth;
        let h = model.clientHeight;
        let row_limit = 2;


        buffer[0][0].original = true
        if (bufferLink[0].length > 0) {
            bufferLink.forEach(row => {
                row.forEach(
                    elem => {
                        if (!elem.original) {
                            elem.obj.remove()
                        }
                    }
                );
            });
        }

        setInterval(() => {
            $(".group .project").mouseenter((function(e) {

                if (!$(this).children('p').length) {

                    $(this).prepend(`<p>${$(this).attr('data-content')}</p>`)
                }
            }));
            $(".group .project").click((function(e) {

                location.href = `./pages/${$(this).attr('data-content').toLowerCase().replace('.', '-')}.html`;

            }));
            $(".group .project").mouseleave((function(e) {
                if ($(this).children('p')) {

                    $(this).children('p').remove()
                }
            }));
        }, 2000)


        let intervalId = setInterval(() => {



            for (let row = buffer.length - 1; row >= 0; --row) {
                for (let index = buffer[row].length - 1; index >= 0; --index) {
                    if (buffer[row][index]) {
                        let row_buffer = buffer[row];

                        row_buffer[index].x += speed * direction.x;
                        row_buffer[index].y += speed * direction.y;


                        /**
                         * RIGHT
                         */
                        if (row_buffer[row_buffer.length - 1].x + w < w) {
                            let new_block = model.cloneNode(true);
                            new_block.style.display = 'none';

                            row_buffer.push({
                                obj: new_block,
                                x: row_buffer[index].x + w,
                                y: row_buffer[index].y,
                                original: false
                            }, );
                            setTimeout(() => { new_block.style.display = 'flex' }, 1000);
                            parent_el.appendChild(new_block);


                        }

                        /**
                         * LEFT
                         */
                        if (row_buffer[0].x >= 0) {
                            let new_block = model.cloneNode(true);
                            new_block.style.display = 'none';



                            row_buffer.unshift({
                                    obj: new_block,
                                    x: row_buffer[index].x - w,
                                    y: row_buffer[index].y,
                                    original: false
                                }

                            )
                            setTimeout(() => { new_block.style.display = 'flex' }, 1000);
                            parent_el.appendChild(new_block);
                        }
                        /**
                         * TOP
                         */
                        if (buffer[0][0].y >= 0) {
                            if (buffer.length > row_limit) {
                                let removable = buffer.pop();
                                removable.forEach(elem => {
                                    elem.obj.remove();
                                });

                            }
                            let new_block = model.cloneNode(true);
                            new_block.style.display = 'none';
                            buffer.unshift([{
                                obj: new_block,
                                x: row_buffer[index].x,
                                y: row_buffer[index].y - h,
                                original: false
                            }]);
                            setTimeout(() => { new_block.style.display = 'flex' }, 1000);
                            parent_el.appendChild(new_block);

                        }
                        /**
                         * BOTTOM
                         */
                        if (buffer[buffer.length - 1][buffer[buffer.length - 1].length - 1].y + h < h) {
                            if (buffer.length > row_limit) {
                                let removable = buffer.shift();
                                removable.forEach(elem => {
                                    elem.obj.remove();
                                });

                            }

                            let new_block = model.cloneNode(true);

                            new_block.style.display = 'none';

                            buffer.push([{
                                obj: new_block,
                                x: row_buffer[index].x,
                                y: row_buffer[index].y + h,
                                original: false
                            }]);
                            setTimeout(() => { new_block.style.display = 'flex' }, 1000);
                            parent_el.appendChild(new_block);
                        }
                        row_buffer[index].obj.style.transform = `translate(${row_buffer[index].x}px, ${row_buffer[index].y}px)`

                    }
                }
            }
        }, 1000 / 60);
        bufferLink = buffer;
        return intervalId;
    }
    const clearPlayer = intervalId => {

        clearInterval(intervalId);
        intervalID = null;
        return true;
    }

    const scroll_counter = 4;
    const mobile_scroll_counter = 6;

    /**
     * alternative menu activation
     */


    let href = !localStorage.getItem('href') ? 'home' : localStorage.getItem('href')

    let grid = false;

    if (href !== 'home') {
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
        $(".menu-el, .menu-alter-el").removeClass('inactive-el');

    }

    $(`.menu-el a[data-href=${href}]`).parent().addClass('active')


    const alternativeMenuStateChange = () => {
        $(".menu-trigger").toggleClass("tgl");
        $(".menu-wrapper").toggleClass("tgl-brd");
        $(".bg-alter").toggleClass("display-n");
        $(".side-bar").toggleClass("display-n");
        $(".menu-extra-el").toggleClass("menu-extra-anim");
        return true;
    }

    $(".menu-trigger").on("click", (function() {
        alternativeMenuStateChange()
        return false;
    }));

    /**
     * Grid < -- > List view swapper
     */

    const updateViewState = () => {

        grid = $('button.grid-list-view').children().text() == "GRID VIEW";
        if (intervalID) {
            clearPlayer(intervalID);
            console.log('clear old player');
        }
        if (!grid) {

            $('.project-wrapper-list').addClass('project-view-swap');
            if (href == "projects") {

                intervalID = createPlayer([
                        [{
                            obj: copy_model_projects,
                            x: 0,
                            y: 0
                        }]
                    ],
                    copy_model_projects,
                    document.querySelector('#projects .flex-projects'));
            } else if (href == "team") {

                intervalID = createPlayer([
                        [{
                            obj: copy_model_team,
                            x: 0,
                            y: 0
                        }]
                    ], copy_model_team,
                    document.querySelector('#team .flex-projects'));

            }

        } else {
            $('.project-wrapper-list').removeClass('project-view-swap');

        }
    }

    $("button.grid-list-view").on("click", (function() {
        updateViewState()
        $(this).html(
            grid ?
            "<p>LIST&nbsp;VIEW</p>" :
            "<p>GRID&nbsp;VIEW</p>"
        );
        return false;
    }));
    /**
     * Navigation
     */

    $(".menu-el, .menu-alter-el").on("click", (function() {
        if (location.pathname !== "/") {
            href = $(this).children().attr('data-href');

            localStorage.setItem('href', href !== "about" ? href : "home")
            location.href = '/'
        }
        $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
        $(".menu-el, .menu-alter-el").addClass('inactive-el');
        $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)

        setTimeout(() => {
            $(".menu-el").removeClass("active");

            $('.content').removeClass(`scroll-animation-out-${href} active-content`)
            href = $(this).children().attr('data-href');
            localStorage.setItem('href', href !== "about" ? href : "home")
            if (href === "about") {
                location.href = "/pages/about.html";
            } else if (href === "home") {
                $(".view-wrapper").addClass("d-n");
            } else {
                $(".view-wrapper").removeClass("d-n");
            }



            $(this).addClass("active");
            $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);
            $(`.menu-el a[data-href=${href}]`).parent().addClass('active')

            $('.project-wrapper-list').removeClass('project-view-swap');

            $("button.grid-list-view").html(
                "<p>LIST&nbsp;VIEW</p>"
            );
            grid = true
            $(".menu-el, .menu-alter-el").removeClass('inactive-el');
        }, 1500);


        return false;
    }));

    $(".menu-alter-wrap > *").on("click", (function() {
        setTimeout(alternativeMenuStateChange, 1500)
    }));

    $(".group .project").mouseenter((function(e) {

        if (!$(this).children('p').length) {

            $(this).prepend(`<p>${$(this).attr('data-content')}</p>`)
        }
    }));
    $(".group .project").click((function(e) {

        location.href = `./pages/${$(this).attr('data-content').toLowerCase().replace('.', '-')}.html`;

    }));
    $(".group .project").mouseleave((function(e) {
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



    $('.menu-el').each((function() {

        hrefs_list.push($(this).children().attr('data-href'));
    }));



    function preventDefault(e) {
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
                localStorage.setItem('href', href !== "about" ? href : "home")
                if (href === "home") {
                    $(".view-wrapper").addClass("d-n")
                } else {
                    $(".view-wrapper").removeClass("d-n")
                }
                $('.content').removeClass('active-content');
                $(`.content#${href}`).addClass("active-content");
                $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
                $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);

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
                localStorage.setItem('href', href !== "about" ? href : "home")
                if (href === "home") {
                    $(".view-wrapper").addClass("d-n")
                } else {
                    $(".view-wrapper").removeClass("d-n")
                }

                $('.content').removeClass('active-content');
                $(`.content#${href}`).addClass("active-content");
                $(`.menu-el a[data-href=${href}]`).parent().addClass('active')
                $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);

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

    $("button.scroll-down").on("click", (function() {

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
            localStorage.setItem('href', href !== "about" ? href : "home")

            $('.content').removeClass('active-content');
            $(`.content#${href}`).addClass("active-content");

            $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);

            if (!href) {
                href = "home";
                localStorage.setItem('href', href !== "about" ? href : "home")

                $('.content').removeClass(`scroll-animation-out-about active-content`)

                $('.content').removeClass('active-content');
                $(`.content#${href}`).addClass("active-content");

                $(`.content#${href}`).addClass(`active-content scroll-animation-in-${href}`);
            }
            skip = true;
            counter, mobileCounter = 0;
        }, 1500);
        return false;
    }));
    $(".project-el").mouseenter(function(e) {
        $(".project-el").not(this).addClass('inactive-el')
        $(".project-el").removeClass('active-el')
    });
    $(".project-el").mouseleave(function(e) {
        $(".project-el").addClass('active-el')
        $(".project-el").removeClass('inactive-el')
    })

    $(".mobile-default-view p button").on("click",
        (function() {
            skip = false;
            $(".mobile-default-view").addClass('d-n');
            $(".button-scroll-down").addClass('d-n')
            $(".view-wrapper").addClass('mobile-view-wrapper')
            $(".mobile-back-arrow").removeClass('d-n')

        })
    );
    $(".mobile-back-arrow").on("click", (function() {
        skip = true
        $(".mobile-default-view").removeClass('d-n');
        $(".button-scroll-down").removeClass('d-n')
        $(".view-wrapper").removeClass('mobile-view-wrapper')
        $(".mobile-back-arrow").addClass('d-n')
    }));

    $(".scroll-down-project").on("click", (function(e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: 900 }, 500);

    }));
}));