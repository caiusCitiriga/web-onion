import { WebOnionSDK } from '../src/web-onion';
import { WOInput } from '../src/core/wo-input.core';
import { WOGenericOutput } from '../src/core/wo-generic-output.core';

$(document).ready(() => {
    const WO = new WebOnionSDK();
    WO.dbl_click_focus_to_input = true;
    WO.clear_after_submit = false;
    WO.initialize();
});

