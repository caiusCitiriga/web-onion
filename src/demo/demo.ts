import { WebOnionSDK } from '../web-onion';
const WO = new WebOnionSDK();

$().ready(() => {
    WO.load_timeout = 0;
    WO.dbl_click_focuses_input = true;
    WO.flag_delimiter = '-';

    WO.addConfigurationsToDispatcher([
        {
            command: 'list',
            flags: ['f1', 'f2', 'f3'],
            aliases: ['l', 'll', 'ls'],
            desc: 'My first awesome command',
            action: (flags: string[]) => {
                if (!flags.length) {
                    alert('Command fired test-me without any flag');
                    return;
                }

                if (flags.find(f => f === 'f1')) {
                    alert('Fired command test-me with flag --f1');
                    return;
                }

                if (flags.find(f => f === 'f2')) {
                    alert('Fired command test-me with flag --f2');
                    return;
                }

                if (flags.find(f => f === 'f3')) {
                    alert('Fired command test-me with flag --f3');
                    return;
                }

                flags.forEach(f => {
                    if (f.split(':').length && f.split(':')[1].split('=')[0] === 'value') {
                        const val = f.split(':').length && f.split(':')[1].split('=')[1];
                        alert('Fired command test-me with flag --f3 and with value: ' + val);
                    }
                });
            };
        }
    ]);

    WO.initialize();
});