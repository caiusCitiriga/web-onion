import { WODispatcherConfiguration } from './wo-dispatcher-configuration.entity';

export class WOSDKConfiguration {
    dispatcher: WODispatcherConfiguration[];
    input_field: {
        clear_after_submit: boolean,
        flag_delimiter: string,
    };
    general: {
        theme: string,
        loading_screen_time?: number
    }
}
