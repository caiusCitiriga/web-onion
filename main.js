const WebCLISdk = {
    //  Configurable properties
    __configuration: {
        dispatcher: [
            {
                command: 'echo',
                aliases: null,
                flags: ['m'],
                action: (flags) => {
                    const message = flags[0].split(':')[1];
                    WCGenericOutputLibrary.printMessage(message);
                }
            },
            {
                command: 'wc',
                aliases: null,
                flags: ['info'],
                action: (flags) => {
                    WCGenericOutputLibrary.printMessage('Web CLI. A easy to use, open source and extensible SDK for building browser CLI web applications.', 3);
                    WCGenericOutputLibrary.printMessage('Current version: 0.0.1', 3);
                }
            },
            {
                command: 'help',
                aliases: ['h'],
                flags: null,
                action: (flags) => alert('Heeeeelp!')
            },
            {
                command: 'clear',
                aliases: ['clr', 'ccl', 'cls', 'kk'],
                flags: null,
                action: (flags) => WCGenericOutputLibrary.clearConsole()
            }
        ],

        input_field: {
            clear_after_submit: true
        },

        general: {
            load_timeout: 100,
            theme: 'matrix', //  TODO implement theme switch function
            allow_raw_html: false
        },
    },

    //  Fixed properties
    __command_set: {
        command: null,
        flags: null
    },

    //  Public methods
    /**
     * Pushes the sets inside the dispatcher config. Note that in case of duplicates
     * the first one will be picked up.
     *
     * The set configurations is like this:
     * {command: string, aliases: string[] | null, flags: string[] | null, action: (flags) => void}
     * 
     * @param {array} sets an array of dispatcher sets
     */
    addSetsToDispatcher: (sets) => {
        sets.forEach(s => {
            WebCLISdk.__configuration.dispatcher.push(s);
        });
    },

    /**
     * Sets the timeout for the core resources loading. This will affect the
     * time that you'll see the loading screen too. A short timeout like 1000ms
     * should be more than enough everywhere.
     */
    setLoadTimeout: (timeout) => {
        WebCLISdk.__configuration.general.load_timeout = timeout;
    },

    /**
     * Sets the behavior for the input field whenever the ENTER key is pressed.
     * By default the input will be cleared after each command is fired.
     *
     * @param {boolean} value 
     */
    automaticallyClearInputField(value) {
        WebCLISdk.__configuration.input_field.clear_after_submit = value;
    },

    /**
     * Allows or not the rendering of HTML recieved from the input on the console.
     * By default this is set to false.
     *
     * @param {boolean} value 
     */
    allowRawHtml(value) {
        WebCLISdk.__configuration.general.allow_raw_html = value;
    },

    initialize: () => {
        WebCLISdk.__showInitializationScreen();
        WebCLISdk.__loadCoreResources();

        //  Wait for the resources to be loaded.
        //  From now on it will be safe to use the core libraries
        setTimeout(() => {
            WebCLISdk.__clearDocument();
            WebCLISdk.__createConsole();
            WebCLISdk.__startParser();
        }, WebCLISdk.__configuration.general.load_timeout);
    },

    clearInput: () => {
        $('input.wc-input-field').val(null);
    },

    //  Private stuff
    __showInitializationScreen: () => {
        $('body').css('background-color', '#000');
        $('body').append(`<h1 class="wc-intialization">WebCLI is loading...<br><small>v1.0.0</small></h1>`);
    },

    __loadCoreResources: () => {
        //  Append the stylesheet
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');
        link.id = 'webCLIStyle';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './matrix.css'; // TODO: change with URL
        link.media = 'all';
        head.appendChild(link);

        //  Load all the core scripts
        const dispatcher = document.createElement('script');
        const generic_output = document.createElement('script');

        dispatcher.src = './core/wc-dispatcher.core.js';
        generic_output.src = './core/wc-generic-output.core.js';

        head.appendChild(dispatcher);
        head.appendChild(generic_output);
    },

    __clearDocument: () => {
        $('body').empty();
    },

    __createConsole: () => {
        //  Create elements
        $('body').append('<div class="wc-wrp"></div>');
        $('.wc-wrp').append('<div class="wc-console"></div>');
        $('.wc-wrp').append('<div class="wc-input"></div>');
        $('.wc-input').append('<div class="wc-input-pointer">></div>');
        $('.wc-input').append('<input type="text" class="wc-input-field"/>');

        $('input.wc-input-field').focus();
    },

    __startParser: () => {
        $('input.wc-input-field').on('keyup', (k) => {
            if (k.keyCode !== 13) { return; } // if not ENTER

            const raw_command = $('input.wc-input-field').val();
            WebCLISdk.__command_set.command = raw_command.split('--')[0]; //  This will take only what's before any flag

            const flags = raw_command.split('--');
            flags.shift(); // remove the command from the flags array;
            WebCLISdk.__command_set.flags = flags;

            WCDispatcherLibrary.dispatch(WebCLISdk.__configuration, WebCLISdk.__command_set, WCGenericOutputLibrary);

            //  Reset the command set
            WebCLISdk.__command_set.command = null;
            WebCLISdk.__command_set.flags = null;

            WebCLISdk.__configuration.input_field.clear_after_submit ? WebCLISdk.clearInput() : null;
        });
    },
}

$(document).ready(() => {
    WebCLISdk.initialize();
});