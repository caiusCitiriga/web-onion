"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WOParser {
    constructor() {
        this.command_set = {
            command: null,
            flags: null
        };
    }
    /**
     * Starts the parser.
     *
     * @param {WODispatcherConfiguration[]} dispatcher_conf
     * @param {WebOnionSDK} sdk
     * @memberof WOParser
     */
    startParser(dispatcher_conf, sdk) {
        $('input.wc-input-field').on('keypress', (k) => {
            if (k.keyCode !== 13 ||
                k.currentTarget.classList.value.indexOf('wc-input-wait') !== -1) {
                return;
            } // if not ENTER or in input wait mode
            const raw_command = $('input.wc-input-field').val();
            this.command_set.command = raw_command.split('--')[0]; //  This will take only what's before any flag
            const flags = raw_command.split('--');
            flags.shift(); // remove the command from the flags array;
            this.command_set.flags = flags.map(f => f.toLowerCase());
            sdk.dispatcher_lib.dispatch(dispatcher_conf, this.command_set, sdk);
            this.resetCommandSet();
            sdk.clearAfterSubmit ? sdk.input_lib.clearInput() : null;
        });
    }
    /**
     * Resets the command set
     *
     * @private
     * @memberof WOParser
     */
    resetCommandSet() {
        this.command_set.command = null;
        this.command_set.flags = null;
    }
}
exports.WOParser = WOParser;
//# sourceMappingURL=wo-parser.core.js.map