declare const require: any;
require("./matrix.css");

import * as $ from 'jquery';

import { WOSDKConfiguration } from './entities/wo-sdk-configuration.entity';
import { WODispatcherConfiguration } from './entities/wo-dispatcher-configuration.entity';
import { WOGenericOutput } from './core/wo-generic-output.core';
import { WOInput } from './core/wo-input.core';
import { WODispatcher } from './core/wo-dispatcher.core';
import { WOParser } from './core/wo-parser.core';

export class WebOnionSDK {
    private static configuration: WOSDKConfiguration = {
        dispatcher: [
            {
                command: 'echo',
                flags: ['m'],
                action: (flags) => {
                    const message = flags[0].split(':')[1];
                    WOGenericOutput.printMessage(message);
                }
            },
            {
                command: 'wo',
                flags: ['info', 'inspire'],
                action: (flags) => {
                    if (flags[0] === 'info') {
                        WOGenericOutput.printMessage('Web Onion. A easy to use, open source and extensible SDK for building browser CLI web applications.', 3);
                        WOGenericOutput.printMessage('Current version: 1.1.0', 3);
                    }

                    if (flags[0] === 'inspire') {
                        $.get({
                            url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                            cache: false
                        }).then(data => {
                            data = data[0];

                            WOGenericOutput.printMessage('');
                            WOGenericOutput.printMessage(data.content);
                            WOGenericOutput.printMessage(`-${data.title}`, 3);
                            WOGenericOutput.printMessage('');
                        })
                    }
                }
            },
            {
                command: 'clear',
                aliases: ['clr', 'ccl', 'cls', 'kk'],
                action: (flags) => WOGenericOutput.clearConsole()
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
        //  Start a listener for the double click on console
        $('body').dblclick(c => {
            if (c.currentTarget.classList.contains('wo-dbl-click-autofocus')) {
                WOInput.focusInput();
            }
        });
    }

    /**
     * 
     * 
     * @readonly
     * @static
     * @memberof WebOnionSDK
     */
    public static get dispatcherConfiguration() {
        return WebOnionSDK.configuration.dispatcher;
    }

    /**
     * 
     * 
     * @readonly
     * @static
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    public static get clearAfterSubmit(): boolean {
        return WebOnionSDK.configuration.input_field.clear_after_submit;
    }

    /**
     * 
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    public set dbl_click_focus_to_input(value: boolean) {
        if (!value) {
            $('body').removeClass('wo-dbl-click-autofocus');
            return;
        }

        $('body').addClass('wo-dbl-click-autofocus');
    }

    /**
     * 
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    public set clear_after_submit(value: boolean) {
        WebOnionSDK.configuration.input_field.clear_after_submit = value;
    }

    /**
     * 
     * 
     * @memberof WebOnionSDK
     */
    public initialize() {
        WOGenericOutput.showInitializationScreen();

        setTimeout(() => {
            this.clearDocument();
            this.createConsole();
            WOParser.startParser(WebOnionSDK.configuration.dispatcher);
        }, WebOnionSDK.configuration.general.loading_screen_time);
    }

    /**
     * 
     * 
     * @param {WODispatcherConfiguration[]} sets 
     * @memberof WebOnionSDK
     */
    public addSetsToDispatcher(sets: WODispatcherConfiguration[]) {
        sets.forEach(s => {
            WebOnionSDK.configuration.dispatcher.push(s);
        });
    }

    /**
     * 
     * 
     * @private
     * @memberof WebOnionSDK
     */
    private clearDocument() {
        $('body').empty();
    }

    /**
     * 
     * 
     * @private
     * @memberof WebOnionSDK
     */
    private createConsole() {
        $('body').append('<div class="wc-wrp"></div>');
        $('.wc-wrp').append('<div class="wc-console"></div>');
        $('.wc-wrp').append('<div class="wc-input"></div>');
        $('.wc-input').append('<div class="wc-input-pointer">></div>');
        $('.wc-input').append('<input type="text" class="wc-input-field"/>');

        WOInput.focusInput();
    }
}
