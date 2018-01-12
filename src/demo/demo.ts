import { WebOnionSDK } from '../web-onion';
const WO = new WebOnionSDK();

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