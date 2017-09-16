"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WODispatcher {
    dispatch(configuration, command_set, sdk) {
        let action = null;
        configuration.forEach(cs => {
            //  Try direct command match
            if (command_set.command && cs.command.toLowerCase() === command_set.command.trim().toLowerCase()) {
                action = cs.action;
            }
            //  If the action is still null, try aliases match
            if (action === null && cs.aliases && cs.aliases.find((a) => a === command_set.command)) {
                action = cs.action;
            }
        });
        //  Last check, if action is still null, fire an invalid command error
        if (!action) {
            sdk.out_lib.printMessage('Invalid command', 1);
            return;
        }
        action(command_set.flags); // Exec the action providing the flags
    }
}
exports.WODispatcher = WODispatcher;
//# sourceMappingURL=wo-dispatcher.core.js.map