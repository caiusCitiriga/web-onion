"use strict";
exports.__esModule = true;
var $ = require("jquery");
var wo_severity_enum_1 = require("../enums/wo-severity.enum");
var WOGenericOutput = /** @class */ (function () {
    function WOGenericOutput() {
    }
    /**
     *
     *
     * @static
     * @memberof WOGenericOutput
     */
    WOGenericOutput.showInitializationScreen = function () {
        $('body').css('background-color', '#000');
        $('body').append("<h1 class=\"wc-intialization\">WebCLI is loading...<br><small>v1.0.0</small></h1>");
    };
    /**
     *
     *
     * @static
     * @param {string} message
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message]
     * @memberof WOGenericOutput
     */
    WOGenericOutput.printMessage = function (message, severity) {
        if (severity === void 0) { severity = wo_severity_enum_1.WOSeverityEnum.message; }
        var message_wrapper = '';
        switch (severity) {
            case 0:
                message_wrapper = "<span class=\"wc-message wc-message-message\"></span>";
                break;
            case 1:
                message_wrapper = "<span class=\"wc-message wc-message-error\"></span>";
                break;
            case 2:
                message_wrapper = "<span class=\"wc-message wc-message-warn\"></span>";
                break;
            case 3:
                message_wrapper = "<span class=\"wc-message wc-message-info\"></span>";
                break;
            default:
                message_wrapper = "<span class=\"wc-message wc-message-message\"></span>";
                break;
        }
        $('.wc-console').append(message_wrapper);
        $('.wc-message').last().append(message);
        $('.wc-console').append("<br>");
        $('.wc-console').scrollTop($('.wc-console')[0].scrollHeight); //scroll to bottom
    };
    /**
     *
     *
     * @static
     * @memberof WOGenericOutput
     */
    WOGenericOutput.clearConsole = function () {
        $('.wc-console').empty();
    };
    /**
     *
     *
     * @static
     * @param {string} text
     * @memberof WOGenericOutput
     */
    WOGenericOutput.printTitle = function (text) {
        WOGenericOutput.printMessage("<h1 class=\"wc-title\">" + text + "</h1>");
    };
    /**
     *
     *
     * @static
     * @param {string} text
     * @param {boolean} [full_width=true]
     * @memberof WOGenericOutput
     */
    WOGenericOutput.printBoxedTitle = function (text, full_width) {
        if (full_width === void 0) { full_width = true; }
        WOGenericOutput.printMessage("<div class=\"wc-title-width-wrapper\"><h1 class=\"wc-title-boxed-" + (full_width ? 'full-width' : 'compact') + "\">" + text + "</h1></div>");
    };
    /**
     *
     *
     * @static
     * @param {string} text
     * @memberof WOGenericOutput
     */
    WOGenericOutput.printSubtitle = function (text) {
        throw Error('Not implemented');
    };
    /**
     *
     *
     * @static
     * @param {{ key: string, value: string }[]} set
     * @param {string} [space_char='&nbsp;']
     * @memberof WOGenericOutput
     */
    WOGenericOutput.printKeyValuePairs = function (set, space_char) {
        if (space_char === void 0) { space_char = '&nbsp;'; }
        var longestKeyLen = set.reduce(function (p, c) { return p < c.key.length ? c.key.length : false; }, 0);
        set.forEach(function (pair) {
            var spaces = space_char;
            for (var i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }
            $('.wc-console').append("<span class=\"wc-key\">" + pair.key + ":</span><span class=\"wc-value\">" + (spaces + pair.value) + "</span><hr class=\"wc-kv-sep\">");
        });
    };
    return WOGenericOutput;
}());
exports.WOGenericOutput = WOGenericOutput;
