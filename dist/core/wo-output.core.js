"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = require("../enums/wo-severity.enum");
class WOOutput {
    showInitializationScreen() {
        $('body').css('background-color', '#000');
        $('body').append(`<h1 class="wc-intialization">WebCLI is loading...<br><small>v1.0.0</small></h1>`);
    }
    printMessage(message, severity = wo_severity_enum_1.WOSeverityEnum.message) {
        let message_wrapper = '';
        switch (severity) {
            case 0:
                message_wrapper = `<span class="wc-message wc-message-message"></span>`;
                break;
            case 1:
                message_wrapper = `<span class="wc-message wc-message-error"></span>`;
                break;
            case 2:
                message_wrapper = `<span class="wc-message wc-message-warn"></span>`;
                break;
            case 3:
                message_wrapper = `<span class="wc-message wc-message-info"></span>`;
                break;
            default:
                message_wrapper = `<span class="wc-message wc-message-message"></span>`;
                break;
        }
        $('.wc-console').append(message_wrapper);
        $('.wc-message').last().append(message);
        $('.wc-console').append(`<br>`);
        $('.wc-console').scrollTop($('.wc-console')[0].scrollHeight); //scroll to bottom
    }
    clearConsole() {
        $('.wc-console').empty();
    }
    printTitle(text) {
        this.printMessage(`<h1 class="wc-title">${text}</h1>`);
    }
    printBoxedTitle(text, full_width = true) {
        this.printMessage(`<div class="wc-title-width-wrapper"><h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1></div>`);
    }
    printSubtitle(text) {
        throw Error('Not implemented');
    }
    printKeyValuePairs(set, space_char = '&nbsp;') {
        const longestKeyLen = set.reduce((p, c) => p < c.key.length ? c.key.length : false, 0);
        set.forEach(pair => {
            let spaces = space_char;
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }
            $('.wc-console').append(`<span class="wc-key">${pair.key}:</span><span class="wc-value">${spaces + pair.value}</span><hr class="wc-kv-sep">`);
        });
    }
}
exports.WOOutput = WOOutput;
//# sourceMappingURL=wo-output.core.js.map