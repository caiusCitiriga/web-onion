const WOInputLibrary = {

    /**
     * Clears the input field
     */
    clearInput: () => {
        $('input.wc-input-field').val(null);
    },

    /**
     * Focuses the cursor to the input field
     */
    focusInput: () => {
        $('input.wc-input-field').focus();
    },

    /**
     * Prompts the user with the given question and executes the callback when
     * the ENTER key is pressed.
     *
     * The input field will go in a input-wait mode, and whatever it's passed in
     * that mode will be stored in the session as valid data.
     *
     * @param {string} message the message to show to the user on the console
     * @param {string} dataKey the name of the key that will store the data in session.
     * @param {function} callback the callback to be executed when the user presses ENTER
     * @param {number} severity the severity of the message
     */
    prompt: (message, dataKey, callback, severity = 0) => {
        WOInputLibrary.clearInput();
        WOGenericOutputLibrary.printMessage(message, severity);
        WOInputLibrary.__handleCallbackExecution(callback, dataKey);
    },

    /**
     * It takes the name of the key and searches for that name in the session.
     * If nothing is found null is returned
     * @param {string} dataKey the name of the key
     * @returns {string | null} the value or null if not found
     */
    getInputData(dataKey) {
        return sessionStorage.getItem(`@wc-user-data-${dataKey}`) ? sessionStorage.getItem(`@wc-user-data-${dataKey}`) : null;
    },

    /**
     * Handles the execution of the callback.
     * @param {function} callback the callback function to be executed when the data is successfully saved
     * @param {any} dataKey the name of the key where the data will be stored
     */
    __handleCallbackExecution(callback, dataKey) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data

        $('input.wc-input-field.wc-input-wait').on('keypress', k => {
            if (k.keyCode !== 13) { return; }

            const value = $('input.wc-input-field').val();
            WOInputLibrary.clearInput();
            sessionStorage.setItem(`@wc-user-data-${dataKey}`, value);

            $('input.wc-input-field.wc-input-wait')
                .remove();   // remove the previous input field

            $('.wc-input > .wc-input-pointer')
                .after('<input type="text" class="wc-input-field"/>');   // and replace it with a new one

            WOInputLibrary.focusInput();
            WebOnionSDK.__startParser();

            callback();
        });
    },
};

module.exports = WOInputLibrary;