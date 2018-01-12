import { WebOnionSDK } from '../web-onion';
export class WOHelpManager {
    public generateHelpFromDispatcherConfig(sdk: WebOnionSDK) {
        const config = sdk.dispatcherConfiguration;

        $('.wc-console').append('<table>');
        $('.wc-console > table').addClass('wo-help-table');
        $('.wo-help-table').append('<tbody>');

        $('.wo-help-table > tbody').append('<tr>');
        $('.wo-help-table > tbody > tr').last().append('<td>');
        $('.wo-help-table > tbody > tr > td').last().append('<strong>Command</strong>');

        $('.wo-help-table > tbody > tr').last().append('<td>');
        $('.wo-help-table > tbody > tr > td').last().append('<strong>Description</strong>');

        $('.wo-help-table > tbody > tr').last().append('<td>');
        $('.wo-help-table > tbody > tr > td').last().append('<strong>Aliases</strong>');

        $('.wo-help-table > tbody > tr').last().append('<td>');
        $('.wo-help-table > tbody > tr > td').last().append('<strong>Flags</strong>');


        config.forEach(conf => {
            $('.wo-help-table > tbody').append('<tr>');
            $('.wo-help-table > tbody > tr').last().append('<td>');
            $('.wo-help-table > tbody > tr > td').last().append(conf.command);

            $('.wo-help-table > tbody > tr').last().append('<td>');
            $('.wo-help-table > tbody > tr > td').last().append(conf.desc);

            $('.wo-help-table > tbody > tr').last().append('<td>');
            $('.wo-help-table > tbody > tr > td').last().append('<ul>');
            if (conf.aliases) {
                conf.aliases.forEach(als => {
                    $('.wo-help-table > tbody > tr > td > ul').last().append('<li>');
                    $('.wo-help-table > tbody > tr > td > ul > li').last().append(als);
                });
            }

            $('.wo-help-table > tbody > tr').last().append('<td>');
            $('.wo-help-table > tbody > tr > td').last().append('<ul>');

            if (conf.flags) {
                conf.flags.forEach(flag => {
                    $('.wo-help-table > tbody > tr > td > ul').last().append('<li>');
                    $('.wo-help-table > tbody > tr > td > ul > li').last().append(`<strong class="flag-name">${sdk.flagDelimiter + flag.flag}: \t</strong>`);
                    $('.wo-help-table > tbody > tr > td > ul > li').last().append(`<i>${flag.desc}</i>`);
                });
            }
        });
    }

}