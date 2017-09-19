"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_onion_1 = require("../web-onion");
const WO = new web_onion_1.WebOnionSDK();
$().ready(() => {
    WO.load_timeout = 0;
    WO.dbl_click_focuses_input = true;
    WO.flag_delimiter = '-';
    WO.addConfigurationsToDispatcher([
        {
            command: 'test',
            aliases: ['t', 'tt'],
            desc: 'Demo test command',
            flags: [
                {
                    flag: 'f1',
                    desc: 'Flag one description'
                }
            ],
            action: (flags) => {
                WO.out_lib.printMessage('Command working');
            }
        }
    ]);
    WO.initialize();
});
//# sourceMappingURL=demo.js.map