import { WOFlag } from "./wo-flag.entity";
export interface WOCommandSet {
    command: string | null;
    flags: WOFlag[] | null;
}
