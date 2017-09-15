
WebOnionSDK.allowRawHtml(true);
WebOnionSDK.automaticallyClearInputField(false);
WebOnionSDK.addSetsToDispatcher([
    {
        command: 'test',
        aliases: null,
        flags: ['title', 'boxed-title', 'key-value'],
        action: (flags) => {
            if (!flags.length) {
                WCGenericOutputLibrary.printMessage(`This command has to be used in combination with a flag. ['--title', '--boxed-title']`, 2);
                return;
            }

            if (flags[0] === 'title') {
                WCGenericOutputLibrary.printTitle('This is a title');
                return;
            }

            if (flags[0].indexOf('boxed-title') !== -1) {
                console.log(flags[0].split(':'));
                if (!flags[0].split(':')[1] || flags[0].split(':')[1] === 'full_width=true') {
                    WCGenericOutputLibrary.printBoxedTitle('This is a title');
                }

                if (flags[0].split(':')[1] === 'full_width=false') {
                    WCGenericOutputLibrary.printBoxedTitle('This is a title', false);
                }
                return;
            }

            if (flags[0] === 'key-value') {
                WCGenericOutputLibrary.printKeyValuePairs([
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

            WCGenericOutputLibrary.printMessage('Invalid command', 1);
        }
    },
    {
        command: 'ask',
        aliases: null,
        flags: null,
        action: (flags) => {
            WCInputLibrary.prompt('What\'s your age?', 'age', () => {
                WCInputLibrary.prompt('And what\'s your name?', 'name', () => {
                    WCGenericOutputLibrary
                        .printMessage(`Hello ${WCInputLibrary.getInputData('name')}! Your age is: ${WCInputLibrary.getInputData('age')}`);
                })
            }, 3);
        }
    },
]);

$(document).ready(() => {
    WebOnionSDK.initialize();

    $('.wc-console').dblclick((clk) => {
        WCInputLibrary.focusInput();
    });
})