import { WOFlag } from './wo-flag.entity';
export declare class WODispatcherConfiguration {
    command: string;
    aliases?: string[];
    flags?: WOFlag[];
    action: (flags: WOFlag[]) => void;
}
