import { WOFlag } from './wo-flag.entity';

export interface WODispatcherConfiguration {
    command: string;
    desc: string;
    aliases?: string[];
    flags?: WOFlag[];
    action: (flags: WOFlag[]) => void
}
