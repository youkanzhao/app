/*
* Watermarkify - jQuery Plugin
* A simple animated form field watermarking plugin
*
* Examples and documentation at: http://www.ajaybalachandran.com/blog
*
* Copyright (c)2011 Ajay Balachandran
* The CSS file included with this package needs to be linked with the html via a link tag in order for the plugin to work properly.
*
*/
(function (a) { a.fn.extend({ watermarkify: function (b) { var c = { time1: 200, time2: 200, easing: "" }; var b = a.extend(c, b); if (!!(window.ActiveXObject)) { } return this.each(function () { var f = b; var e = a(this); var d = e.attr("placeholder"); e.wrap("<div class='watermarkify-wrap' />"); a("<span class='watermarkify-watermark'><span class='watermarkify-watermark-inner'>" + d + "</span></span>").insertAfter(e); fieldHeight = e.outerHeight(); waterMarkHeight = e.next().outerHeight(); waterMarkTop = (fieldHeight - waterMarkHeight) / 2; e.next(".watermarkify-watermark").css({ top: waterMarkTop }); if (e.val() != "") { if (a.browser.msie) { e.parent().find(".watermarkify-watermark-inner").hide() } else { e.parent().find(".watermarkify-watermark-inner").css({ "margin-left": "-40px", opacity: "0" }) } } e.focus(function (g) { e.parent().find(".watermarkify-watermark").addClass("watermarkify-watermark-blurred") }); e.keyup(function (g) { if (a.browser.msie) { e.parent().find(".watermarkify-watermark-inner").hide() } else { e.parent().find(".watermarkify-watermark-inner").animate({ "margin-left": "-40px", opacity: "0" }, f.time1, f.easing) } }); e.blur(function (g) { if (e.val() == "") { e.parent().find(".watermarkify-watermark-blurred").removeClass("watermarkify-watermark-blurred"); if (a.browser.msie) { e.parent().find(".watermarkify-watermark-inner").show() } else { e.parent().find(".watermarkify-watermark-inner").animate({ "margin-left": "0", opacity: "1" }, f.time2, f.easing) } } }); a(".watermarkify-watermark").click(function () { a(this).prev().focus() }) }) } }) })(jQuery);

var matched, browser;

jQuery.uaMatch = function (ua) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
        [];

    return {
        browser: match[1] || "",
        version: match[2] || "0"
    };
};

matched = jQuery.uaMatch(navigator.userAgent);
browser = {};

if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if (browser.chrome) {
    browser.webkit = true;
} else if (browser.webkit) {
    browser.safari = true;
}


//Check IE Version
var ie = (function () {
    var undef,
                    v = 3,
                    div = document.createElement('div'),
                    all = div.getElementsByTagName('i');
    while (
                    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );
    return v > 4 ? v : undef;
} ());

/*
    (function ($) {
         $.support.placeholder = ('placeholder' in document.createElement('input'));
     })(jQuery);


     //fix for IE7 and IE8
     $(function () {
         if (!$.support.placeholder) {
             $("[placeholder]").focus(function () {
                 if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
             }).blur(function () {
                 if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
             }).blur();

             $("[placeholder]").parents("form").submit(function () {
                 $(this).find('[placeholder]').each(function() {
                     if ($(this).val() == $(this).attr("placeholder")) {
                         $(this).val("");
                     }
                 });
             });
         }
     });
 */