import { WebOnionSDK } from '../web-onion';
import { WOFlag } from '../entities/wo-flag.entity';

$().ready(() => {
    const WO = new WebOnionSDK();

    WO.load_timeout = 0;
    WO.dbl_click_focuses_input = true;

    WO.addConfigurationsToDispatcher([
        {
            command: 'key',
            desc: 'Test key-val pairs print',
            action: () => {
                WO.out_lib.printKeyValuePairs([
                    {
                        key: 'mykey1',
                        value: 'mykey1 value'
                    },
                    {
                        key: 'mykey2',
                        value: 'mykey2 value'
                    }, {
                        key: 'mylongkey3thisisverylong',
                        value: 'mylongkey3 loooong value'
                    }, {
                        key: 'mykey4',
                        value: 'mykey4 value'
                    }
                ]);
            }
        },
        {
            command: 'list',
            flags: [
                {
                    flag: 'f1',
                    desc: 'Flag one desc'
                },
                {
                    flag: 'f2',
                    desc: 'Flag two desc'
                },
                {
                    flag: 'f3',
                    desc: 'Flag three desc'
                }
            ],
            aliases: ['l', 'll', 'ls'],
            desc: 'My first awesome command',
            action: (flags: WOFlag[]) => {
                if (!flags.length) {
                    alert('Command fired test-me without any flag');
                    return;
                }

                if (flags.find(f => f.flag === 'f1')) {
                    alert('Fired command test-me with flag --f1');
                    return;
                }

                if (flags.find(f => f.flag === 'f2')) {
                    alert('Fired command test-me with flag --f2');
                    return;
                }

                if (flags.find(f => f.flag === 'f3')) {
                    alert('Fired command test-me with flag --f3');
                    return;
                }

                flags.forEach(f => {
                    if (f.flag.split(':').length && f.flag.split(':') [1] && f.flag.split(':') [1].split('=') [0] === 'value') {
                        const val = f.flag.split(':').length && f.flag.split(':') [1].split('=') [1];
                        alert('Fired command test-me with flag --f3 and with value: ' + val);
                        return;
                    }

                    alert('Unknown flag for this command');
                });
            }
        }
    ]);

    WO.initialize();
});