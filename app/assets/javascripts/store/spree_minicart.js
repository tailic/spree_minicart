//= require store/jquery.hoverintent

window.miniCart = window.miniCart || {};


(function ($) {
    'use strict';
    $(document).ready(function () {

        var config = {
            selectors: {
                linkToCart:     "#link-to-cart",
                miniCart:       "#minicart",
                progress:       "#progress",
                form:           "form#update-minicart",
                formDelete:     this.form + " a.delete"
            },
            hoverIntent: {
                over: function () {
                    $(config.selectors.miniCart).show();
                },
                timeout: 250, // number = milliseconds delay before onMouseOut
                out: function () {
                    $(config.selectors.miniCart).hide();
                },
                selector: "#minicart"
            }
        };


        $(config.selectors.linkToCart).hoverIntent(config.hoverIntent);

        $(document).on('click', config.selectors.form + ' a.delete', function (e) {
            var $this = $(this);
            $this.parent().siblings('div[data-hook="minicart_item_quantity"]').find("input.line_item_quantity").val(0);
            $this.parents('form').first().submit();
            e.preventDefault();
        });

        //TODO make ajax progress indication more user friendly
        //TODO #update-minicart to scope the form selector? there can be more remote forms on page!?
//        $(document).on("ajax:beforeSend", "form[data-remote]", function () {
//            $(config.progress).show();
//        });
//
//        $(document).on("ajax:complete", "form[data-remote]", function () {
//            $(config.progress).hide();
//        });

    });
})(jQuery);
