"use strict";
$(document).ready((function() {
    window.mobileAndTabletCheck = function() {
        let check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    let speed = 0,
        direction = {
            x: 1,
            y: 1
        };
    let bufferX = 0,
        bufferY = 0;
    const copy_model_projects = document.querySelector('#projects .group');
    const copy_model_team = document.querySelector('#team .group');
    let bufferLink = [
        []
    ];
    let intervalID = null;
    let counter = 0;
    let skip = true;
    const keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };
    const hrefs_list = [];
    const mobileScrollBuffer = [];
    let mobileCounter = 0;
    let isMobile = window.mobileAndTabletCheck();

    const scroll_counter = 4;
    const mobile_scroll_counter = 6;

    let href = !localStorage.getItem('href') ? 'home' : localStorage.getItem('href')

    let grid = false;





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
                            });
                            setTimeout(() => {
                                new_block.style.display = 'flex'
                            }, 1000);
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
                            setTimeout(() => {
                                new_block.style.display = 'flex'
                            }, 1000);
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
                            setTimeout(() => {
                                new_block.style.display = 'flex'
                            }, 1000);
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
                            setTimeout(() => {
                                new_block.style.display = 'flex'
                            }, 1000);
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


    /**
     * alternative menu activation
     */


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
            if (href === "about" && !isMobile) {
                location.href = "/pages/about.html";

            } else if (href == "about" && isMobile) {

                $(".mobile-button-view-wrap p").html('close').css("font-size", "20px")

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





    $('.menu-el').each((function() {

        hrefs_list.push($(this).children().attr('data-href'));
    }));



    function preventDefault(e) {

        if (isMobile) {
            mobileScrollBuffer.push(e.changedTouches[0].screenY);

            if (mobileScrollBuffer.length >= 2 && skip) {

                mobileCounter = mobileScrollBuffer.shift() > mobileScrollBuffer.pop() ? mobileCounter + 1 : mobileCounter - 1;
                mobileScrollBuffer.length = 0;
            }
        } else {

            counter = e.deltaY > 0 ? counter + 1 : counter - 1;
        }
        if ((counter >= scroll_counter || mobileCounter >= mobile_scroll_counter) && hrefs_list[hrefs_list.indexOf(href) + 1] && skip) {
            skip = false;
            mobileScrollBuffer.length = 0;
            $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
            $(`.content#${href}`).addClass(`scroll-animation-out-${href}`);
            setTimeout(() => {

                if ((href === "about" || href === "team") && !isMobile) {

                    location.href = "/pages/about.html";
                } else if ((href === "about" || href === "team") && isMobile) {

                    $(".mobile-button-view-wrap .scroll-down p").text('close').css("font-size", "14px")

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
    const wheelOpt = supportsPassive ? {
        passive: false
    } : false;
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

    $(".mobile-button-scroll-down").on("click", (function() {

        skip = false;
        counter, mobileCounter, mobileScrollBuffer.length = 0;

        $('.content').removeClass(`scroll-animation-out-${href} scroll-animation-in-${href}`)
        $(`.content#${href}`).addClass(`scroll-animation-out-${href}`)
        setTimeout(() => {
            if (href === "team") {

                $(".mobile-button-view-wrap p").html('close').css("font-size", "20px")

            } else {
                $(".mobile-button-view-wrap p").html('<i class="fa-thin fa-arrow-down"></i>').css("font-size", "34px")
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
            $(".mobile-button-scroll-down").addClass('d-n')
            $(".view-wrapper").removeClass("d-n")
            $(".view-wrapper").css("display", "block")
            $(".mobile-back-arrow").removeClass('d-n')

        })
    );
    $(".mobile-back-arrow").on("click", (function() {
        skip = true
        $(".mobile-default-view").removeClass('d-n');
        $(".mobile-button-scroll-down").removeClass('d-n')
        $(".view-wrapper").css("display", "none")
        $(".view-wrapper").addClass("d-n")
        $(".mobile-back-arrow").addClass('d-n')
    }));
    if (isMobile) {
        updateViewState();
        $(".view-wrapper").addClass("d-n")

    }
    $(".scroll-down-project").on("click", (function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 900
        }, 500);

    }));
}));