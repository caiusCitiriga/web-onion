"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./matrix.css");
const wo_output_core_1 = require("./core/wo-output.core");
const wo_input_core_1 = require("./core/wo-input.core");
const wo_dispatcher_core_1 = require("./core/wo-dispatcher.core");
const wo_parser_core_1 = require("./core/wo-parser.core");
const wo_help_manager_core_1 = require("./core/wo-help-manager.core");
const general_conf_1 = require("./conf/general.conf");
const wo_severity_enum_1 = require("./enums/wo-severity.enum");
const wo_renderer_core_1 = require("./core/wo-renderer.core");
class WebOnionSDK {
    constructor() {
        this.configuration = {
            dispatcher: [
                {
                    command: 'echo',
                    desc: 'Echoes a message in console',
                    flags: [
                        {
                            flag: 'm',
                            desc: 'Message'
                        }
                    ],
                    action: (flags) => this.handleEchoCommand(flags)
                },
                {
                    command: 'wo',
                    desc: 'WebOnion\'s main command. See flags for actions',
                    flags: [
                        {
                            flag: 'info',
                            desc: 'Returns the informations about WebOnion'
                        },
                        {
                            flag: 'inspire',
                            desc: 'Returns a random design quote from the "Quotes for design API"'
                        },
                        {
                            flag: 'help',
                            desc: 'Show all the available commands with aliases and flags'
                        }
                    ],
                    action: (flags) => this.handleWOCommand(flags)
                },
                {
                    command: 'clear',
                    desc: 'Clears the console',
                    aliases: ['clr', 'ccl', 'cls', 'kk'],
                    action: (flags) => this.out_lib.clearConsole()
                }
            ],
            input_field: {
                clear_after_submit: true,
                flag_delimiter: '--'
            },
            general: {
                theme: 'matrix',
                loading_screen_time: 1000
            }
        };
        this.out_lib = new wo_output_core_1.WOOutput();
        this.input_lib = new wo_input_core_1.WOInput();
        this.parser_lib = new wo_parser_core_1.WOParser();
        this.renderer_lib = new wo_renderer_core_1.WORenderer();
        this.help_manager_lib = new wo_help_manager_core_1.WOHelpManager();
        this.dispatcher_lib = new wo_dispatcher_core_1.WODispatcher();
        //  Start a listener for the double click on console
        wo_renderer_core_1.WORenderer.listenForDblClickOnElement('html', () => {
            if (wo_renderer_core_1.WORenderer.hasClass('body', 'wo-dbl-click-autofocus')) {
                this.input_lib.focusInput();
            }
        });
    }
    /**
     * Returns the array containing the dispatcher configurations
     *
     * @readonly
     * @type {WODispatcherConfiguration[]}
     * @memberof WebOnionSDK
     */
    get dispatcherConfiguration() {
        return this.configuration.dispatcher;
    }
    /**
     * Returns true if the input gets cleared after each ENTER press.
     * False otherwise
     *
     * @readonly
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    get clearAfterSubmit() {
        return this.configuration.input_field.clear_after_submit ? true : false;
    }
    /**
     * Returns the flag delimiter in use
     *
     * @readonly
     * @type {string}
     * @memberof WebOnionSDK
     */
    get flagDelimiter() {
        return this.configuration.input_field.flag_delimiter;
    }
    /**
     * Returns the loading screen timeout if set.
     * Null will be returned otherwise
     *
     * @readonly
     * @type {(number | null)}
     * @memberof WebOnionSDK
     */
    get loadTimeout() {
        return this.configuration.general.loading_screen_time ?
            this.configuration.general.loading_screen_time :
            null;
    }
    /**
     * Returns true if the input focuses automatically when
     * double clicking on the console. False otherwise
     *
     * @readonly
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    get dblClickFocusesInput() {
        return wo_renderer_core_1.WORenderer.hasClass('body', 'wo-dbl-click-autofocus');
    }
    /**
     * Enables or disables the input focus
     * when double clicking on the console
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    set dbl_click_focuses_input(value) {
        if (!value) {
            wo_renderer_core_1.WORenderer.removeClass('body', 'wo-dbl-click-autofocus');
            return;
        }
        wo_renderer_core_1.WORenderer.addClass('body', 'wo-dbl-click-autofocus');
    }
    /**
     * Enables or disables the input field
     * auto clear on each ENTER press
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    set clear_after_submit(value) {
        this.configuration.input_field.clear_after_submit = value;
    }
    /**
     * Sets the value of the flag delimiter. If a empty string is passed
     * '--' will be used
     *
     * @param {string} value the value of the flag delimiter.
     * @memberof WebOnionSDK
     */
    set flag_delimiter(value) {
        this.configuration.input_field.flag_delimiter = value.length ? value : '--';
    }
    /**
     * Sets the amount of time to wait before
     * the legacy loading screen hides
     *
     * @param {number} value
     * @memberof WebOnionSDK
     */
    set load_timeout(value) {
        this.configuration.general.loading_screen_time = value;
    }
    /**
     * Initializes the SDK with the given configurations
     *
     * @memberof WebOnionSDK
     */
    initialize() {
        this.out_lib.showInitializationScreen();
        setTimeout(() => {
            this.clearDocument();
            this.createConsole();
            this.parser_lib.startParser(this.configuration.dispatcher, this);
        }, this.configuration.general.loading_screen_time);
    }
    /**
     * Adds the array of dispatcher configurations
     * to the current configurations.
     *
     * @param {WODispatcherConfiguration[]} configurations
     * @memberof WebOnionSDK
     */
    addConfigurationsToDispatcher(configurations) {
        configurations.forEach(s => {
            this.configuration.dispatcher.push(s);
        });
    }
    /**
     * Clears the content of the body
     *
     * @private
     * @memberof WebOnionSDK
     */
    clearDocument() {
        wo_renderer_core_1.WORenderer.empty('body');
    }
    /**
     * Creates the HTML elements needed to render
     * the console and focuses the input
     *
     * @private
     * @memberof WebOnionSDK
     */
    createConsole() {
        wo_renderer_core_1.WORenderer.append('body', '<div class="wc-wrp"></div>');
        wo_renderer_core_1.WORenderer.append('.wc-wrp', '<div class="wc-console"></div>');
        wo_renderer_core_1.WORenderer.append('.wc-wrp', '<div class="wc-input"></div>');
        wo_renderer_core_1.WORenderer.append('.wc-input', '<div class="wc-input-pointer">></div>');
        wo_renderer_core_1.WORenderer.append('.wc-input', '<input type="text" class="wc-input-field"/>');
        this.input_lib.focusInput();
    }
    handleEchoCommand(flags) {
        const message = flags[0].flag.split(':')[1];
        this.out_lib.printMessage(message);
    }
    handleWOCommand(flags) {
        if (flags[0] && flags[0].flag === 'help' || !flags.length) {
            this.help_manager_lib.generateHelpFromDispatcherConfig(this);
            return;
        }
        if (flags[0].flag === 'info') {
            this.out_lib.printMessage(`Current version: ${general_conf_1.GENERAL_CONF.version}`, wo_severity_enum_1.WOSeverityEnum.info);
            return;
        }
        if (flags[0].flag === 'inspire') {
            $.get({
                url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                cache: false
            }).then((data) => {
                data = data[0];
                this.out_lib.printMessage('');
                this.out_lib.printMessage(data.content);
                this.out_lib.printMessage(`-${data.title}`, wo_severity_enum_1.WOSeverityEnum.info);
                this.out_lib.printMessage('');
            });
            return;
        }
        this.out_lib.printMessage(`Unknown flag "${flags[0]}" used`, wo_severity_enum_1.WOSeverityEnum.error);
    }
}
exports.WebOnionSDK = WebOnionSDK;
//# sourceMappingURL=web-onion.js.map