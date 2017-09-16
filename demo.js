
WebOnionSDK.allowRawHtml(false);
WebOnionSDK.addSetsToDispatcher([
    {
        command: 'test',
        aliases: null,
        flags: ['title', 'boxed-title', 'key-value'],
        action: (flags) => {
            if (!flags.length) {
                WOGenericOutputLibrary.printMessage(`This command has to be used in combination with a flag. ['--title', '--boxed-title']`, 2);
                return;
            }

            if (flags[0] === 'title') {
                WOGenericOutputLibrary.printTitle('This is a title');
                return;
            }

            if (flags[0].indexOf('boxed-title') !== -1) {
                console.log(flags[0].split(':'));
                if (!flags[0].split(':')[1] || flags[0].split(':')[1] === 'full_width=true') {
                    WOGenericOutputLibrary.printBoxedTitle('This is a title');
                }

                if (flags[0].split(':')[1] === 'full_width=false') {
                    WOGenericOutputLibrary.printBoxedTitle('This is a title', false);
                }
                return;
            }

            if (flags[0] === 'key-value') {
                WOGenericOutputLibrary.printKeyValuePairs([
                    {
                        key: 'Test key 1',
                        value: 'Test value 1'
                    },
                    {
                        key: 'Test key 2',
                        value: 'Test value 2'
                    },
                    {
                        key: 'Test key 3 longest',
                        value: 'Test value 3'
                    },
                ])
                return;
            }

            WOGenericOutputLibrary.printMessage('Invalid command', 1);
        }
    },
    {
        command: 'ask',
        aliases: null,
        flags: null,
        action: (flags) => {
            const askName = (next) => {
                WOInputLibrary.prompt(`What's your name?`, 'name', next);
            }

            const askAge = (next) => {
                WOInputLibrary.prompt(`And what's your age?`, 'age', next);
            }

            askName(() => {
                askAge(() => {
                    const name = WOInputLibrary.getInputData('name');
                    const age = WOInputLibrary.getInputData('age');
                    WOGenericOutputLibrary.printMessage(`You are ${name} and you are ${age} years old`);
                });
            });
        }
    },
]);

$(document).ready(() => {
    WebOnionSDK.initialize();

    $('.wc-console').dblclick((clk) => {
        WOInputLibrary.focusInput();
    });
})