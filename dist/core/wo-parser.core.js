"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = require("../enums/wo-severity.enum");
const wo_renderer_core_1 = require("./wo-renderer.core");
class WOParser {
    constructor() {
        this.history_index = 0;
        this.session_history = [];
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
        wo_renderer_core_1.WORenderer.listenForKeyPressOnElement('input.wc-input-field', 13, () => {
            if (this.inputIsInWaitMode()) {
                return;
            }
            this.assignCommandSet(sdk);
            const checkResult = this.checkSuccessfulParse(this.command_set);
            if (!checkResult.isOk && checkResult.message) {
                sdk.out_lib.printMessage(checkResult.message, wo_severity_enum_1.WOSeverityEnum.warning);
                return;
            }
            sdk.dispatcher_lib.dispatch(dispatcher_conf, this.command_set, sdk);
            this.resetCommandSet();
            sdk.clearAfterSubmit ? sdk.input_lib.clearInput() : null;
        });
    }
    assignCommandSet(sdk) {
        this.command_set = this.parseRAWCommand(wo_renderer_core_1.WORenderer.getVal('input.wc-input-field'), sdk);
    }
    parseRAWCommand(raw_command, sdk) {
        const command_set = {
            command: null,
            flags: null
        };
        command_set.command = raw_command.split(sdk.flagDelimiter)[0].trim(); //  This will take only what's before any flag
        const flags = raw_command.split(sdk.flagDelimiter);
        flags.shift(); // remove the command from the flags array;
        command_set.flags = flags.map(f => ({ flag: f.toLowerCase() }));
        return command_set;
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
    checkSuccessfulParse(cs) {
        if (cs.flags && cs.flags[0] && cs.flags[0].flag === '') {
            //  This may be caused when the flag delimiter is '-' and the user uses '--'.
            return { isOk: false, message: 'The flag/s provided cannot be used. This may happen when the flag delimiter is "-" but you\'ve used "--"' };
        }
        return { isOk: true };
    }
    inputIsInWaitMode() {
        return $('input.wc-input-field').hasClass('wc-input-wait');
    }
}
exports.WOParser = WOParser;
//# sourceMappingURL=wo-parser.core.js.map