WebOnionSDK.setLoadTimeout(100);
WebOnionSDK.automaticallyClearInputField(false);
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
    }
]);