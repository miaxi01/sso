/**
 * Created by skopa01 on 3/18/2016.
 */

window.CA = window.CA || {};

CA.JekyllTheme = (function () {

    var layout = (function () {
        var TREE_PANEL = "#tree-navigation";
        var TOC_PANEL = "#pagetoc";

        var setPanelWidth = function (tocPanel) {
            if (tocPanel.css("width") && tocPanel.hasClass("affix")) {
                tocPanel.removeClass("affix");
                tocPanel.css("width", "");
                tocPanel.css("width", tocPanel.outerWidth());
                tocPanel.addClass("affix");
            } else if (tocPanel.css("width") && !tocPanel.hasClass("affix")) {
                tocPanel.css("width", "");
                tocPanel.css("width", tocPanel.outerWidth());
            }
        };

        var init = function () {
            var treePage = $(TREE_PANEL);
            var tocPanel = $(TOC_PANEL);
            setPanelWidth(treePage);
            setPanelWidth(tocPanel);

            $(window).resize(function () {
                setPanelWidth(treePage);
                setPanelWidth(tocPanel);
            });

            $(window).scroll(function () {
                if ($(document).scrollTop() >= 37) {
                    $("header").addClass("small-header");
                } else {
                    $("header").removeClass("small-header");
                }
            });
        };

        return {
            "init": init
        }

    })();

    var links = (function () {
        var LINK_SELECTOR = "a[href*='#']:not([href='#'])";
        var HEADER_HEIGHT = "125";

        var escapeJQuerySelector = function (selector) {
            return selector.replace(/([;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
        };

        var scrollToTarget = function (link) {
            console.log("test");
            if (location.pathname.replace(/^\//, '') == link.pathname.replace(/^\//, '') && location.hostname == link.hostname) {
                var id = escapeJQuerySelector(link.hash);
                var target = $(id);
                target = target.length ? target : $('[id=' + id.slice(1) + ']');
                doScrollToTarget(target);
            }
        };

        var doScrollToTarget = function (target) {
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - HEADER_HEIGHT //offsets for fixed header
                }, 500);
                return false;
            }
        };

        var scrollToTargetOnLoad = function () {
            var strings = location.href.split("#");
            if (strings.length > 1) {
                var target = $('#' + escapeJQuerySelector(strings[1]));
                doScrollToTarget(target);
            }
        };

        var init = function () {
            $(LINK_SELECTOR).click(function () {
                scrollToTarget(this);
            });

            scrollToTargetOnLoad();
        };

        return {
            "init": init
        }
    })();

    var tree = (function () {
        var TOGGLE = ".tree-toggle";
        var TREE = "#tree-navigation > ul";

        var toggleNode = function (node) {
            node.toggleClass("closed open");

            if (node.hasClass("open")) {
                node.find(">i").removeClass("glyphicon glyphicon-triangle-right");
                node.find(">i").addClass("glyphicon glyphicon-triangle-bottom");
            } else {
                node.find(">i").removeClass("glyphicon glyphicon-triangle-bottom");
                node.find(">i").addClass("glyphicon glyphicon-triangle-right");
            }
        };

        var open = function (node) {
            node.parents("li").addClass("open");
            $.each(node.parents("li"), function () {
                var that = $(this);
                if (that.hasClass("tree-haschildren")) {
                    that.find(">i").removeClass("glyphicon glyphicon-triangle-right");
                    that.find(">i").addClass("glyphicon glyphicon-triangle-bottom");
                }
            });
        };

        var initTree = function () {
            var tree = $(TREE);

            open(tree.find("a[href='" + tree.attr("data-current") + "']"));

            $(TOGGLE).click(function () {
                toggleNode($(this).parent())
            });
        };

        return {
            "init": initTree
        }

    })();

    var initToc = function () {
        var pageTocPanel = $("#pagetoc");

        if ($("#page-content").find("h2").length > 0) {
            pageTocPanel.find("> ul").toc({
                content: "#page-content",
                headings: "h2,h3,h4"
            });
        } else {
            pageTocPanel.addClass("hidden");
        }
    };

    var init = function () {
        initToc();
        layout.init();
        links.init();
        tree.init();
    };

    return {
        "init": init
    }

})();

$(document).ready(function () {
    CA.JekyllTheme.init();
});


