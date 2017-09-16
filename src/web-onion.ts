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
                command: 'test',
                action: (flags) => {
                    console.log('Working');
                }
            }
        ],

        input_field: {
            clear_after_submit: true
        },

        general: {
            theme: 'Matrix',
        }
    }

    public constructor() {
        WOGenericOutput.showInitializationScreen();

        this.clearDocument();
        this.createConsole();
        WOParser.startParser(WebOnionSDK.configuration.dispatcher);
    }

    public static get dispatcherConfiguration() {
        return WebOnionSDK.configuration.dispatcher;
    }

    public static get clearAfterSubmit(): boolean {
        return WebOnionSDK.configuration.input_field.clear_after_submit;
    }

    public addSetsToDispatcher(sets: WODispatcherConfiguration[]) {
        sets.forEach(s => {
            WebOnionSDK.configuration.dispatcher.push(s);
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

        WOInput.focusInput();
    }
}

(<any>window).WOSDK = new WebOnionSDK();