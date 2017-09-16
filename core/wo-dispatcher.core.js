const WODispatcherLibrary = {
    /**
     * Takes the command set and looks for an action to dispatch
     *
     * @param {object} configuration the WebOnionSDK object's dispatcher configuration
     * @param {object} command_set the WebOnionSDK object's command_set, containing the command
     * @param {object} generic_output the WOGenericOutputLibrary to handle the invalid command case
     */
    __dispatch: (configuration, command_set, generic_output) => {
        let action = null;
        configuration.dispatcher.forEach(element => {
            //  Try direct command match
            if (element.command.toLowerCase() === command_set.command.trim().toLowerCase()) {
                action = element.action;
            }

            //  Try aliases match if the direct match fails
            if (action === null && element.aliases && element.aliases.find(e => e === command_set.command)) {
                action = element.action;
            }
        });

        //  Last check, if action is still null, fire an invalid command error
        if (!action) {
            generic_output.printMessage('Invalid command', 1);
            return;
        }

        action(command_set.flags);   // Exec the action
    }
}