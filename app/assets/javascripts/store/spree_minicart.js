//= require store/jquery.hoverintent

(function ($) {
    'use strict';
    $(document).ready(function () {

        var config = {
            selectors: {
                linkToCart:     "#link-to-cart",
                miniCart:       "#minicart",
                progress:       "#progress",
                form:           "form#update-minicart"
            },
            hoverIntent: {
                over: function () {
                    $(config.selectors.miniCart).slideDown();
                },
                timeout: 250, // number = milliseconds delay before onMouseOut
                out: function () {
                    $(config.selectors.miniCart).slideUp();
                }
            }
        };


        $(config.selectors.linkToCart).hoverIntent(config.hoverIntent);

        $(document).on('mouseover', "ul#minicart-items li", function (e) {
            var $this = $(this);
            if (!$this.data('init')) {
                $this.data('init', true);
                $this.hoverIntent({
                    over: function () {
                        $(this).find("[data-hook='minicart_item_description']").hide();
                        $(this).find("[data-hook='minicart_item_actions']").show();
                    },
                    timeout: 100, // number = milliseconds delay before onMouseOut
                    out: function () {
                        $(this).find("[data-hook='minicart_item_description']").show();
                        $(this).find("[data-hook='minicart_item_actions']").hide();
                    }
                });
                $this.trigger(e);
            }
        });


        $(document).on('click', config.selectors.form + 'a.delete', function (e) {
            var $this = $(this);
            $this.parent().siblings('div[data-hook="minicart_item_quantity"]').find("input.line_item_quantity").val(0);
            $this.parents('form').first().submit();
            e.preventDefault();
        });

        //TODO make ajax progress indication more user friendly
        //TODO #update-minicart to scope the form selector? there can be more remote forms on page!?
        $(document).on("ajax:beforeSend", "form[data-remote]", function () {
            $(config.progress).slideDown();
        });

        $(document).on("ajax:complete", "form[data-remote]", function () {
            $(config.progress).slideUp();
        });

        $(document).on('mouseenter', config.selectors.miniCart, function (e) {
            $(config.selectors.miniCart).show();
        });

        $(document).on('mouseleave', config.selectors.miniCart, function (e) {
            $(config.selectors.miniCart).slideUp();
        });

        //TODO this will fire on all clicks... bind only if minicart is open and unbind after
        $(document).on('click', "body", function (e) {
            $(config.selectors.miniCart).slideUp();
        });
    });
})(jQuery);
