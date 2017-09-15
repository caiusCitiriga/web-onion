const WCInputLibrary = {

    clearInput: () => {
        $('input.wc-input-field').val(null);
    },

    focusInput: () => {
        $('input.wc-input-field').focus();
    },

    prompt: (message, dataKey, callback, severity = 0) => {
        WCInputLibrary.clearInput();
        WCGenericOutputLibrary.printMessage(message, severity);
        WCInputLibrary.__handleCallbackExecution(callback, dataKey);
    },

    getInputData(dataKey) {
        return sessionStorage.getItem(`@wc-user-data-${dataKey}`);
    },

    __handleCallbackExecution(callback, dataKey) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data

        $('input.wc-input-field.wc-input-wait').on('keypress', k => {
            if (k.keyCode !== 13) { return; }

            const value = $('input.wc-input-field').val();
            WCInputLibrary.clearInput();
            console.log(value);
            sessionStorage.setItem(`@wc-user-data-${dataKey}`, value);

            $('input.wc-input-field.wc-input-wait')
                .remove();   // remove the previous input field

            $('.wc-input > .wc-input-pointer')
                .after('<input type="text" class="wc-input-field"/>');   // and replace it with a new one

            WCInputLibrary.focusInput();
            WebOnionSDK.__startParser();

            callback();
        });
    },
};
