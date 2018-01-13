import { WebOnionSDK } from '../web-onion';
import { WORenderer } from './wo-renderer.core';

export class WOHelpManager {
    public generateHelpFromDispatcherConfig(sdk: WebOnionSDK) {
        const config = sdk.dispatcherConfiguration;

        WORenderer.append('.wc-console', '<table>');
        WORenderer.addClass('.wc-console > table', 'wo-help-table');
        WORenderer.append('.wo-help-table', '<tbody>');

        WORenderer.append('.wo-help-table > tbody', '<tr>');
        WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);

        WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Command</strong>', true);

        WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Description</strong>', true);

        WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Aliases</strong>', true);

        WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Flags</strong>', true);

        config.forEach(conf => {
            WORenderer.append('.wo-help-table > tbody', '<tr>');
            WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            WORenderer.append('.wo-help-table > tbody > tr > td', conf.command, true);

            WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            WORenderer.append('.wo-help-table > tbody > tr > td', conf.desc, true);

            WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            WORenderer.append('.wo-help-table > tbody > tr > td', '<ul>', true);

            if (conf.aliases) {
                conf.aliases.forEach(als => {
                    WORenderer.append('.wo-help-table > tbody > tr > td > ul', '<li>', true);
                    WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', als, true);
                });
            }

            WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            WORenderer.append('.wo-help-table > tbody > tr > td', '<ul>', true);

            if (conf.flags) {
                conf.flags.forEach(flag => {
                    WORenderer.append('.wo-help-table > tbody > tr > td > ul', '<li>', true);
                    WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', `<strong class="flag-name">${sdk.flagDelimiter + flag.flag}: \t</strong>`, true);
                    WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', `<i>${flag.desc}</i>`, true);
                });
            }
        });
    }

}
