import { WebOnionSDK } from '../web-onion';
export class WOHelpManager {
    public generateHelpFromDispatcherConfig(sdk: WebOnionSDK) {
        const config = sdk.dispatcherConfiguration;

        config.forEach(config => {
            console.log(config.command);
            console.log(config.aliases ? config.aliases : 'No aliases');
            if (config.flags) {
                config.flags.forEach(f => {
                    if (f.desc) {
                        console.log(f.flag + ': ' + f.desc);
                    }
                });
            }
        });
    }

}
