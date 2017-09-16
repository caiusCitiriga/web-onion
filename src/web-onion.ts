declare const require: any;
require("./matrix.css");

declare const $: any;

import { WOSDKConfiguration } from './entities/wo-sdk-configuration.entity';
import { WODispatcherConfiguration } from './entities/wo-dispatcher-configuration.entity';
import { WOOutput } from './core/wo-output.core';
import { WOInput } from './core/wo-input.core';
import { WODispatcher } from './core/wo-dispatcher.core';
import { WOParser } from './core/wo-parser.core';

export class WebOnionSDK {
    public readonly out_lib: WOOutput;
    public readonly input_lib: WOInput;
    public readonly parser_lib: WOParser;
    public readonly dispatcher_lib: WODispatcher;

    private configuration: WOSDKConfiguration = {
        dispatcher: [
            {
                command: 'echo',
                flags: ['m'],
                action: (flags) => {
                    const message = flags[0].split(':')[1];
                    this.out_lib.printMessage(message);
                }
            },
            {
                command: 'wo',
                flags: ['info', 'inspire'],
                action: (flags) => {
                    if (flags[0] === 'info') {
                        this.out_lib.printMessage('Web Onion. A easy to use, open source and extensible SDK for building browser CLI web applications.', 3);
                        this.out_lib.printMessage('Current version: 1.1.0', 3);
                    }

                    if (flags[0] === 'inspire') {
                        $.get({
                            url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                            cache: false
                        }).then((data: any) => {
                            data = data[0];

                            this.out_lib.printMessage('');
                            this.out_lib.printMessage(data.content);
                            this.out_lib.printMessage(`-${data.title}`, 3);
                            this.out_lib.printMessage('');
                        })
                    }
                }
            },
            {
                command: 'clear',
                aliases: ['clr', 'ccl', 'cls', 'kk'],
                action: (flags) => this.out_lib.clearConsole()
            }
        ],

        input_field: {
            clear_after_submit: true
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
        this.dispatcher_lib = new WODispatcher();

        //  Start a listener for the double click on console
        $('body').dblclick((c: any) => {
            if (c.currentTarget.classList.contains('wo-dbl-click-autofocus')) {
                this.input_lib.focusInput();
            }
        });
    }

    public get dispatcherConfiguration() {
        return this.configuration.dispatcher;
    }

    public get clearAfterSubmit(): boolean {
        return this.configuration.input_field.clear_after_submit;
    }

    public set dbl_click_focus_to_input(value: boolean) {
        if (!value) {
            $('body').removeClass('wo-dbl-click-autofocus');
            return;
        }

        $('body').addClass('wo-dbl-click-autofocus');
    }

    public set clear_after_submit(value: boolean) {
        this.configuration.input_field.clear_after_submit = value;
    }

    public set load_timeout(value: number) {
        this.configuration.general.loading_screen_time = value;
    }

    public initialize() {
        this.out_lib.showInitializationScreen();

        setTimeout(() => {
            this.clearDocument();
            this.createConsole();
            this.parser_lib.startParser(this.configuration.dispatcher, this);
        }, this.configuration.general.loading_screen_time);
    }

    public addSetsToDispatcher(sets: WODispatcherConfiguration[]) {
        sets.forEach(s => {
            this.configuration.dispatcher.push(s);
        });
    }

    private clearDocument() {
        $('body').empty();
    }

    private createConsole() {
        $('body').append('<div class="wc-wrp"></div>');
        $('.wc-wrp').append('<div class="wc-console"></div>');
        $('.wc-wrp').append('<div class="wc-input"></div>');
        $('.wc-input').append('<div class="wc-input-pointer">></div>');
        $('.wc-input').append('<input type="text" class="wc-input-field"/>');

        this.input_lib.focusInput();
    }
}