const WOGenericOutputLibrary = {
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

    /**
     * Clears the console
     */
    clearConsole: () => {
        $('.wc-console').empty();
    },

    /**
     * Prints a title on the console
     *
     * @param {string} text the text for the title
     */
    printTitle: (text) => {
        if (!WebOnionSDK.__configuration.general.allow_raw_html) {
            WebOnionSDK.allowRawHtml(true);
            WOGenericOutputLibrary.printMessage(`<h1 class="wc-title">${text}</h1>`);
            WebOnionSDK.allowRawHtml(false);
            return;
        }

        WOGenericOutputLibrary.printMessage(`<h1 class="wc-title">${text}</h1>`);
    },

    /**
     * Prints a title with the borders around.
     *
     * @param {string} text the text for the title
     * @param {boolean} full_width if the box should be 100% width or not
     */
    printBoxedTitle: (text, full_width = true) => {
        if (!WebOnionSDK.__configuration.general.allow_raw_html) {
            WebOnionSDK.allowRawHtml(true);
            WOGenericOutputLibrary.printMessage(`<h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1>`);
            WebOnionSDK.allowRawHtml(false);
            return;
        }

        WOGenericOutputLibrary.printMessage(`<div class="wc-title-width-wrapper"><h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1></div>`);
    },

    /**
     * Prints a sub-tile
     *
     * @param {string} text the text for the title
     */
    printSubtitle: (text) => {
        throw Error('Not implemented');
    },

    /**
     * Takes an array of key-value objects and prints a list
     * on the console, illuminating the keys.
     *
     * @param {object} set an array of key-values Array<{key: string, value: string}>
     * @param {string} space_char the string used for the space
     */
    printKeyValuePairs: (set, space_char = '&nbsp;') => {
        const longestKeyLen = set.reduce((p, c) => p < c.key.length ? c.key.length : false, 0);
        set.forEach(pair => {
            let spaces = space_char;
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }

            $('.wc-console').append(`<span class="wc-key">${pair.key}:</span><span class="wc-value">${spaces + pair.value}</span><hr class="wc-kv-sep">`);
        });
    },


};

module.exports = WOGenericOutputLibrary;