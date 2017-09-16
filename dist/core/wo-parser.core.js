"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_onion_1 = require("../web-onion");
const wo_input_core_1 = require("./wo-input.core");
const wo_dispatcher_core_1 = require("./wo-dispatcher.core");
class WOParser {
    /**
     *
     *
     * @static
     * @param {WODispatcherConfiguration[]} dispatcher_conf
     * @memberof WOParser
     */
    static startParser(dispatcher_conf) {
        $('input.wc-input-field').on('keypress', (k) => {
            if (k.keyCode !== 13 ||
                k.currentTarget.classList.value.indexOf('wc-input-wait') !== -1) {
                return;
            } // if not ENTER or in input wait mode
            const raw_command = $('input.wc-input-field').val();
            this.command_set.command = raw_command.split('--')[0]; //  This will take only what's before any flag
            const flags = raw_command.split('--');
            flags.shift(); // remove the command from the flags array;
            this.command_set.flags = flags;
            wo_dispatcher_core_1.WODispatcher.dispatch(dispatcher_conf, this.command_set);
            this.resetCommandSet();
            web_onion_1.WebOnionSDK.clearAfterSubmit ? wo_input_core_1.WOInput.clearInput() : null;
        });
    }
    /**
     *
     *
     * @private
     * @static
     * @memberof WOParser
     */
    static resetCommandSet() {
        this.command_set.command = null;
        this.command_set.flags = null;
    }
}
WOParser.command_set = {
    command: null,
    flags: null
};
exports.WOParser = WOParser;
//# sourceMappingURL=wo-parser.core.js.map