WebOnionSDK.allowRawHtml(true);

WebOnionSDK.addSetsToDispatcher([
    {
        command: 'xx',
        aliases: null,
        flags: null,
        action: (flags) => {
            WCGenericOutputLibrary.printMessage('This is a message with warn severity', 2);
        }
    },
    {
        command: 'rr',
        aliases: null,
        flags: null,
        action: (flags) => {
            WCGenericOutputLibrary.printMessage('This is a message with info severity', 3);
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
})