const WCInputLibrary = {

    clearInput: () => {
        $('input.wc-input-field').val(null);
    },

    focusInput: () => {
        $('input.wc-input-field').focus();
    },

    prompt: (message, callback, severity = 0) => {
        WCInputLibrary.clearInput();
        WCGenericOutputLibrary.printMessage(message, severity);
        WCInputLibrary.__handleCallbackExecution(callback);
    },

    __handleCallbackExecution(callback) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data

        $('input.wc-input-field.wc-input-wait').on('keypress', k => {
            if (k.keyCode !== 13) { return; }
            callback($('input.wc-input-field.wc-input-wait').val());

            $('input.wc-input-field.wc-input-wait').remove();   // remove the previous input field
            $('.wc-input > .wc-input-pointer')
                .after()
                .append('<input type="text" class="wc-input-field"/>'); // and replace it with a new one
            WebOnionSDK.__startParser();    // start the parser again.
            WCInputLibrary.focusInput();
        });
    },
};
