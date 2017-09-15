
const WebOnionSDK = {
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
                    if (flags[0] === 'info') {
                        WCGenericOutputLibrary.printMessage('Web CLI. A easy to use, open source and extensible SDK for building browser CLI web applications.', 3);
                        WCGenericOutputLibrary.printMessage('Current version: 1.0.0', 3);
                    }
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
            WebOnionSDK.__configuration.dispatcher.push(s);
        });
    },

    /**
     * Sets the behavior for the input field whenever the ENTER key is pressed.
     * By default the input will be cleared after each command is fired.
     *
     * @param {boolean} value 
     */
    automaticallyClearInputField(value) {
        WebOnionSDK.__configuration.input_field.clear_after_submit = value;
    },

    /**
     * Allows or not the rendering of HTML recieved from the input on the console.
     * By default this is set to false.
     *
     * @param {boolean} value 
     */
    allowRawHtml(value) {
        WebOnionSDK.__configuration.general.allow_raw_html = value;
    },

    /**
     * The starting point of WebOnion.
     * First it will show a loading screen, while the screen is showing
     * It will load the core resources. First of all the stylesheets needed
     * Then the scripts.
     *
     * When all the scripts are loaded it will clear the document, removing anything
     * inside the body.
     *
     * Then it'll start creating the console.
     * When the console is created the parser will start listening the commands flowing
     * through the input field.
     */
    initialize: () => {
        WebOnionSDK.__showInitializationScreen();
        // WebOnionSDK.__loadCoreResources(() => {
        WebOnionSDK.__clearDocument();
        WebOnionSDK.__createConsole();
        WebOnionSDK.__startParser();
        // });
    },

    //  Private stuff
    /**
     * Shows the loading screen
     */
    __showInitializationScreen: () => {
        $('body').css('background-color', '#000');
        $('body').append(`<h1 class="wc-intialization">WebCLI is loading...<br><small>v1.0.0</small></h1>`);
    },

    /**
     * Loads all the needed core resources for the SDK to work.
     *
     * The first loaded thing MUST be the stylesheet since it's crucial for
     * the correct terminal displaying.
     */
    __loadCoreResources: (callback) => {
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
        $.getScript('./core/wc-dispatcher.core.js').then(() => {
            $.getScript('./core/wc-generic-output.core.js').then(() => {
                $.getScript('./core/wc-input.core.js').then(() => {
                    callback();
                });
            });
        })
    },

    /**
     * Removes anything from the body
     */
    __clearDocument: () => {
        $('body').empty();
    },

    /**
     * Creates the elements needed by the UI
     * The styles are defined in the stylesheet
     */
    __createConsole: () => {
        $('body').append('<div class="wc-wrp"></div>');
        $('.wc-wrp').append('<div class="wc-console"></div>');
        $('.wc-wrp').append('<div class="wc-input"></div>');
        $('.wc-input').append('<div class="wc-input-pointer">></div>');
        $('.wc-input').append('<input type="text" class="wc-input-field"/>');

        WCInputLibrary.focusInput();
    },

    /**
     * Starts listening for commands coming from the input at each ENTER press
     */
    __startParser: () => {
        $('input.wc-input-field').on('keypress', (k) => {
            if (k.keyCode !== 13 || k.currentTarget.classList.value.indexOf('wc-input-wait') !== -1) { return; } // if not ENTER or in input wait mode

            const raw_command = $('input.wc-input-field').val();
            WebOnionSDK.__command_set.command = raw_command.split('--')[0]; //  This will take only what's before any flag

            const flags = raw_command.split('--');
            flags.shift(); // remove the command from the flags array;
            WebOnionSDK.__command_set.flags = flags;

            WCDispatcherLibrary.dispatch(WebOnionSDK.__configuration, WebOnionSDK.__command_set, WCGenericOutputLibrary);

            //  Reset the command set
            WebOnionSDK.__command_set.command = null;
            WebOnionSDK.__command_set.flags = null;

            WebOnionSDK.__configuration.input_field.clear_after_submit ? WCInputLibrary.clearInput() : null;
        });
    },
}