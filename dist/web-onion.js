"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./matrix.css");
const wo_output_core_1 = require("./core/wo-output.core");
const wo_input_core_1 = require("./core/wo-input.core");
const wo_dispatcher_core_1 = require("./core/wo-dispatcher.core");
const wo_parser_core_1 = require("./core/wo-parser.core");
class WebOnionSDK {
    constructor() {
        this.configuration = {
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
                            }).then((data) => {
                                data = data[0];
                                this.out_lib.printMessage('');
                                this.out_lib.printMessage(data.content);
                                this.out_lib.printMessage(`-${data.title}`, 3);
                                this.out_lib.printMessage('');
                            });
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
                theme: 'matrix',
                loading_screen_time: 1000
            }
        };
        this.out_lib = new wo_output_core_1.WOOutput();
        this.input_lib = new wo_input_core_1.WOInput();
        this.parser_lib = new wo_parser_core_1.WOParser();
        this.dispatcher_lib = new wo_dispatcher_core_1.WODispatcher();
        //  Start a listener for the double click on console
        $('body').dblclick((c) => {
            if (c.currentTarget.classList.contains('wo-dbl-click-autofocus')) {
                this.input_lib.focusInput();
            }
        });
    }
    get dispatcherConfiguration() {
        return this.configuration.dispatcher;
    }
    get clearAfterSubmit() {
        return this.configuration.input_field.clear_after_submit;
    }
    set dbl_click_focus_to_input(value) {
        if (!value) {
            $('body').removeClass('wo-dbl-click-autofocus');
            return;
        }
        $('body').addClass('wo-dbl-click-autofocus');
    }
    set clear_after_submit(value) {
        this.configuration.input_field.clear_after_submit = value;
    }
    set load_timeout(value) {
        this.configuration.general.loading_screen_time = value;
    }
    initialize() {
        this.out_lib.showInitializationScreen();
        setTimeout(() => {
            this.clearDocument();
            this.createConsole();
            this.parser_lib.startParser(this.configuration.dispatcher, this);
        }, this.configuration.general.loading_screen_time);
    }
    addSetsToDispatcher(sets) {
        sets.forEach(s => {
            this.configuration.dispatcher.push(s);
        });
    }
    clearDocument() {
        $('body').empty();
    }
    createConsole() {
        $('body').append('<div class="wc-wrp"></div>');
        $('.wc-wrp').append('<div class="wc-console"></div>');
        $('.wc-wrp').append('<div class="wc-input"></div>');
        $('.wc-input').append('<div class="wc-input-pointer">></div>');
        $('.wc-input').append('<input type="text" class="wc-input-field"/>');
        this.input_lib.focusInput();
    }
}
exports.WebOnionSDK = WebOnionSDK;
//# sourceMappingURL=web-onion.js.map