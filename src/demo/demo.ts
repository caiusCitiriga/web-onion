import { WebOnionSDK } from '../web-onion';
const WO = new WebOnionSDK();

$().ready(() => {
    WO.load_timeout = 0;
    WO.dbl_click_focuses_input = true;

    WO.addConfigurationsToDispatcher([
        {
            command: 'test',
            aliases: ['t', 'tt'],
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