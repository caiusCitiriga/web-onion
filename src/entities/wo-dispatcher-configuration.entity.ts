import { WOFlag } from './wo-flag.entity';

export class WODispatcherConfiguration {
    command: string;
    aliases?: string[];
    flags?: WOFlag[];
    action: (flags: WOFlag[]) => void
}
