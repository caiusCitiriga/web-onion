const WCGenericOutputLibrary = {
    /**
     * Prints a message to the console. 
     * The second optional parameter states the severity. (0: msg, 1: err, 2: warn, 3: info)
     *
     * @param {string} message 
     * @param {number} [severity=0] 1: error, 2: warning, 3: info
     */
    printMessage: (message, severity = 0) => {
        let message_wrapper = '';

        switch (severity) {
            case 0:
                message_wrapper = `<span class="wc-message wc-message-message"></span>`;
                break;
            case 1:
                message_wrapper = `<span class="wc-message wc-message-error"></span>`;
                break;
            case 2:
                message_wrapper = `<span class="wc-message wc-message-warn"></span>`;
                break;
            case 3:
                message_wrapper = `<span class="wc-message wc-message-info"></span>`;
                break;
            default:
                message_wrapper = `<span class="wc-message wc-message-message"></span>`;
                break;
        }

        $('.wc-console').append(message_wrapper);
        //  Based on the configuration it will prevent the parsing of HTML or not
        WebOnionSDK.__configuration.general.allow_raw_html ? $('.wc-message').last().append(message) : $('.wc-message').last().text(message);
        $('.wc-console').append(`<br>`);

        $('.wc-console').scrollTop($('.wc-console')[0].scrollHeight); //scroll to bottom
    },

    clearConsole: () => {
        $('.wc-console').empty();
    },

    printTitle: (text) => {
        if (!WebOnionSDK.__configuration.general.allow_raw_html) {
            WebOnionSDK.allowRawHtml(true);
            WCGenericOutputLibrary.printMessage(`<h1 class="wc-title">${text}</h1>`);
            WebOnionSDK.allowRawHtml(false);
            return;
        }

        WCGenericOutputLibrary.printMessage(`<h1 class="wc-title">${text}</h1>`);
    },

    printBoxedTitle: (text, full_width = true) => {
        if (!WebOnionSDK.__configuration.general.allow_raw_html) {
            WebOnionSDK.allowRawHtml(true);
            WCGenericOutputLibrary.printMessage(`<h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1>`);
            WebOnionSDK.allowRawHtml(false);
            return;
        }

        WCGenericOutputLibrary.printMessage(`<div class="wc-title-width-wrapper"><h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1></div>`);
    },

    printSubtitle: (text) => {
        throw Error('Not implemented');
    },

    printKeyValuePairs: (set) => {
        // set will be {key: string, value: string}[]
        throw Error('Not implemented');
    },


};