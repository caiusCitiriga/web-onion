"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = require("../enums/wo-severity.enum");
const wo_renderer_core_1 = require("./wo-renderer.core");
const general_conf_1 = require("../conf/general.conf");
class WOOutput {
    /**
     * Shows the legacy loading screen (dummy).
     *
     * @memberof WOOutput
     */
    showInitializationScreen() {
        wo_renderer_core_1.WORenderer.setCSS('body', [{ rule: 'background-color', value: '#000' }]);
        wo_renderer_core_1.WORenderer.append('body', `<h1 class="wc-intialization">WebCLI is loading...<br><small>v${general_conf_1.GENERAL_CONF.version}</small></h1>`);
    }
    /**
     * Prints a message to the console
     *
     * @param {string} message
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message]
     * @memberof WOOutput
     */
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
        wo_renderer_core_1.WORenderer.append('.wc-console', message_wrapper);
        wo_renderer_core_1.WORenderer.append('.wc-message', message, true);
        wo_renderer_core_1.WORenderer.append('.wc-console', '<br>');
        wo_renderer_core_1.WORenderer.scrollTop('.wc-console', wo_renderer_core_1.WORenderer.getElement('.wc-console').scrollHeight); //scroll to bottom
    }
    /**
     * Clears the console
     *
     * @memberof WOOutput
     */
    clearConsole() {
        wo_renderer_core_1.WORenderer.empty('.wc-console');
    }
    /**
     * Prints a message styled as title according
     * to the current style in use
     *
     * @param {string} text
     * @memberof WOOutput
     */
    printTitle(text) {
        this.printMessage(`<h1 class="wc-title">${text}</h1>`);
    }
    /**
     * Prints a message styled as title, surrounded
     * with borders according to the current style in use
     *
     * @param {string} text
     * @param {boolean} [full_width=true]
     * @memberof WOOutput
     */
    printBoxedTitle(text, full_width = true) {
        this.printMessage(`<div class="wc-title-width-wrapper"><h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1></div>`);
    }
    /**
     *
     *
     * @param {string} text
     * @memberof WOOutput
     */
    printSubtitle(text) {
        throw Error('Not implemented');
    }
    /**
     * Prints a list of key value pairs.
     *
     * @param {{ key: string, value: string }[]} set
     * @param {string} [space_char='&nbsp;']
     * @memberof WOOutput
     */
    printKeyValuePairs(set, space_char = '&nbsp;') {
        let longestKeyLen = set[0].key.length;
        set.forEach(s => longestKeyLen = s.key.length > longestKeyLen ? s.key.length : longestKeyLen);
        set.forEach(pair => {
            let spaces = space_char;
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }
            wo_renderer_core_1.WORenderer.append('.wc-console', `<span class="wc-key">${pair.key}:</span><span class="wc-value">${spaces + pair.value}</span><hr class="wc-kv-sep">`);
        });
    }
}
exports.WOOutput = WOOutput;
//# sourceMappingURL=wo-output.core.js.map