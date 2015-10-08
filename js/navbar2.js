$(function() {

    // Do our DOM lookups beforehand
    var nav_container = $(".nav-container");
    var nav = $("nav");

    var top_spacing = 0;
    var waypoint_offset = 20;

    nav_container.waypoint({
        handler: function(direction) {

            if (direction == 'down') {

                nav_container.css({
                    'height': nav.outerHeight()
                });
                nav.stop().addClass("sticky").css("top", -nav.outerHeight()).animate({
                    "top": top_spacing
                });

            } else {

                nav_container.css({
                    'height': 'auto'
                });
                nav.stop().removeClass("sticky").css("top", nav.outerHeight() + waypoint_offset).animate({
                    "top": ""
                });

            }

        },
        offset: function() {
            return -nav.outerHeight() - waypoint_offset;
        }
    });

    // Cache selectors
    var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#slide1" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });
});
