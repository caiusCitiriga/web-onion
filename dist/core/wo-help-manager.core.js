"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wo_renderer_core_1 = require("./wo-renderer.core");
class WOHelpManager {
    generateHelpFromDispatcherConfig(sdk) {
        const config = sdk.dispatcherConfiguration;
        wo_renderer_core_1.WORenderer.append('.wc-console', '<table>');
        wo_renderer_core_1.WORenderer.addClass('.wc-console > table', 'wo-help-table');
        wo_renderer_core_1.WORenderer.append('.wo-help-table', '<tbody>');
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody', '<tr>');
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Command</strong>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Description</strong>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Aliases</strong>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Flags</strong>', true);
        config.forEach(conf => {
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody', '<tr>');
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', conf.command, true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', conf.desc, true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<ul>', true);
            if (conf.aliases) {
                conf.aliases.forEach(als => {
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul', '<li>', true);
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', als, true);
                });
            }
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<ul>', true);
            if (conf.flags) {
                conf.flags.forEach(flag => {
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul', '<li>', true);
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', `<strong class="flag-name">${sdk.flagDelimiter + flag.flag}: \t</strong>`, true);
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', `<i>${flag.desc}</i>`, true);
                });
            }
        });
    }
}
exports.WOHelpManager = WOHelpManager;
//# sourceMappingURL=wo-help-manager.core.js.map