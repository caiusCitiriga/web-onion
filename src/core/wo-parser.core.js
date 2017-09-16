"use strict";
exports.__esModule = true;
var web_onion_1 = require("../web-onion");
var wo_input_core_1 = require("./wo-input.core");
var wo_dispatcher_core_1 = require("./wo-dispatcher.core");
var WOParser = /** @class */ (function () {
    function WOParser() {
    }
    /**
     *
     *
     * @static
     * @param {WODispatcherConfiguration[]} dispatcher_conf
     * @memberof WOParser
     */
    WOParser.startParser = function (dispatcher_conf) {
        var _this = this;
        $('input.wc-input-field').on('keypress', function (k) {
            if (k.keyCode !== 13 ||
                k.currentTarget.classList.value.indexOf('wc-input-wait') !== -1) {
                return;
            } // if not ENTER or in input wait mode
            var raw_command = $('input.wc-input-field').val();
            _this.command_set.command = raw_command.split('--')[0]; //  This will take only what's before any flag
            var flags = raw_command.split('--');
            flags.shift(); // remove the command from the flags array;
            _this.command_set.flags = flags;
            wo_dispatcher_core_1.WODispatcher.dispatch(dispatcher_conf, _this.command_set);
            _this.resetCommandSet();
            web_onion_1.WebOnionSDK.clearAfterSubmit ? wo_input_core_1.WOInput.clearInput() : null;
        });
    };
    /**
     *
     *
     * @private
     * @static
     * @memberof WOParser
     */
    WOParser.resetCommandSet = function () {
        this.command_set.command = null;
        this.command_set.flags = null;
    };
    WOParser.command_set = {
        command: null,
        flags: null
    };
    return WOParser;
}());
exports.WOParser = WOParser;
