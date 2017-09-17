"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = require("../enums/wo-severity.enum");
class WOInput {
    clearInput() {
        $('input.wc-input-field').val('');
    }
    focusInput() {
        $('input.wc-input-field').focus();
    }
    prompt(message, sdk, dataKey, callback, severity = wo_severity_enum_1.WOSeverityEnum.message) {
        this.clearInput();
        sdk.out_lib.printMessage(message, severity);
        this.handleCallbackExecution(sdk, callback, dataKey);
    }
    getInputData(dataKey) {
        return sessionStorage.getItem(`@wc-user-data-${dataKey}`) ? sessionStorage.getItem(`@wc-user-data-${dataKey}`) : null;
    }
    handleCallbackExecution(sdk, callback, dataKey) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data
        $('input.wc-input-field.wc-input-wait').on('keypress', k => {
            if (k.keyCode !== 13) {
                return;
            }
            const value = $('input.wc-input-field').val();
            this.clearInput();
            sessionStorage.setItem(`@wc-user-data-${dataKey}`, value);
            $('input.wc-input-field.wc-input-wait')
                .remove(); // remove the previous input field
            $('.wc-input > .wc-input-pointer')
                .after('<input type="text" class="wc-input-field"/>'); // and replace it with a new one
            this.focusInput();
            sdk.parser_lib.startParser(sdk.dispatcherConfiguration, sdk);
            callback();
        });
    }
}
exports.WOInput = WOInput;
//# sourceMappingURL=wo-input.core.js.map