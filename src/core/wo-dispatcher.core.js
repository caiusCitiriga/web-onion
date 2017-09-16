"use strict";
exports.__esModule = true;
var wo_generic_output_core_1 = require("./wo-generic-output.core");
var WODispatcher = /** @class */ (function () {
    function WODispatcher() {
    }
    WODispatcher.dispatch = function (configuration, command_set) {
        var action = null;
        configuration.forEach(function (cs) {
            //  Try direct command match
            if (command_set.command && cs.command.toLowerCase() === command_set.command.trim().toLowerCase()) {
                action = cs.action;
            }
            //  If the action is still null, try aliases match
            if (action === null && cs.aliases && cs.aliases.find(function (a) { return a === command_set.command; })) {
                action = cs.action;
            }
        });
        //  Last check, if action is still null, fire an invalid command error
        if (!action) {
            wo_generic_output_core_1.WOGenericOutput.printMessage('Invalid command', 1);
            return;
        }
        action(command_set.flags); // Exec the action providing the flags
    };
    return WODispatcher;
}());
exports.WODispatcher = WODispatcher;
