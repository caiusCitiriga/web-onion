declare const require: any;
require("./matrix.css");

import { WOSDKConfiguration } from './entities/wo-sdk-configuration.entity';
import { WODispatcherConfiguration } from './entities/wo-dispatcher-configuration.entity';
import { WOOutput } from './core/wo-output.core';
import { WOInput } from './core/wo-input.core';
import { WODispatcher } from './core/wo-dispatcher.core';
import { WOParser } from './core/wo-parser.core';
import { WOFlag } from './entities/wo-flag.entity';
import { WOHelpManager } from './core/wo-help-manager.core';
import { GENERAL_CONF } from './conf/general.conf';
import { WOSeverityEnum } from './enums/wo-severity.enum';
import { WORenderer } from './core/wo-renderer.core';

export class WebOnionSDK {
    public readonly out_lib: WOOutput;
    public readonly input_lib: WOInput;
    public readonly parser_lib: WOParser;
    public readonly renderer_lib: WORenderer;
    public readonly dispatcher_lib: WODispatcher;
    public readonly help_manager_lib: WOHelpManager;

    private configuration: WOSDKConfiguration = {
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
            theme: 'matrix',    // not yet handled
            loading_screen_time: 1000
        }
    }

    public constructor() {
        this.out_lib = new WOOutput();
        this.input_lib = new WOInput();
        this.parser_lib = new WOParser();
        this.renderer_lib = new WORenderer();
        this.help_manager_lib = new WOHelpManager();
        this.dispatcher_lib = new WODispatcher();
        //  Start a listener for the double click on console

        WORenderer.listenForDblClickOnElement('html', () => {
            if (WORenderer.hasClass('body', 'wo-dbl-click-autofocus')) {
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
    public get dispatcherConfiguration(): WODispatcherConfiguration[] {
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
    public get clearAfterSubmit(): boolean {
        return this.configuration.input_field.clear_after_submit ? true : false;
    }

    /**
     * Returns the flag delimiter in use
     * 
     * @readonly
     * @type {string}
     * @memberof WebOnionSDK
     */
    public get flagDelimiter(): string {
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
    public get loadTimeout(): number | null {
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
    public get dblClickFocusesInput(): boolean {
        return WORenderer.hasClass('body', 'wo-dbl-click-autofocus');
    }

    /**
     * Enables or disables the input focus
     * when double clicking on the console
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    public set dbl_click_focuses_input(value: boolean) {
        if (!value) {
            WORenderer.removeClass('body', 'wo-dbl-click-autofocus');
            return;
        }

        WORenderer.addClass('body', 'wo-dbl-click-autofocus');
    }

    /**
     * Enables or disables the input field
     * auto clear on each ENTER press
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    public set clear_after_submit(value: boolean) {
        this.configuration.input_field.clear_after_submit = value;
    }

    /**
     * Sets the value of the flag delimiter. If a empty string is passed
     * '--' will be used
     *
     * @param {string} value the value of the flag delimiter.
     * @memberof WebOnionSDK
     */
    public set flag_delimiter(value: string) {
        this.configuration.input_field.flag_delimiter = value.length ? value : '--';
    }

    /**
     * Sets the amount of time to wait before
     * the legacy loading screen hides
     *
     * @param {number} value
     * @memberof WebOnionSDK
     */
    public set load_timeout(value: number) {
        this.configuration.general.loading_screen_time = value;
    }

    /**
     * Initializes the SDK with the given configurations
     * 
     * @memberof WebOnionSDK
     */
    public initialize() {
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
    public addConfigurationsToDispatcher(configurations: WODispatcherConfiguration[]) {
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
    private clearDocument() {
        WORenderer.empty('body');
    }

    /**
     * Creates the HTML elements needed to render
     * the console and focuses the input
     * 
     * @private
     * @memberof WebOnionSDK
     */
    private createConsole() {
        WORenderer.append('body', '<div class="wc-wrp"></div>');
        WORenderer.append('.wc-wrp', '<div class="wc-console"></div>');
        WORenderer.append('.wc-wrp', '<div class="wc-input"></div>');
        WORenderer.append('.wc-input', '<div class="wc-input-pointer">></div>');
        WORenderer.append('.wc-input', '<input type="text" class="wc-input-field"/>');

        this.input_lib.focusInput();
    }

    private handleEchoCommand(flags: WOFlag[]) {
        const message = flags[0].flag.split(':') [1];
        this.out_lib.printMessage(message);
    }

    private handleWOCommand(flags: WOFlag[]) {
        if (flags[0] && flags[0].flag === 'help' || !flags.length) {
            this.help_manager_lib.generateHelpFromDispatcherConfig(this);
            return;
        }

        if (flags[0].flag === 'info') {
            this.out_lib.printMessage(`Current version: ${GENERAL_CONF.version}`, WOSeverityEnum.info);

            return;
        }

        if (flags[0].flag === 'inspire') {
            $.get({
                url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                cache: false
            }).then((data: any) => {
                data = data[0];

                this.out_lib.printMessage('');
                this.out_lib.printMessage(data.content);
                this.out_lib.printMessage(`-${data.title}`, WOSeverityEnum.info);
                this.out_lib.printMessage('');
            });

            return;
        }

        this.out_lib.printMessage(`Unknown flag "${flags[0]}" used`, WOSeverityEnum.error);
    }
}