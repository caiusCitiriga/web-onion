WebCLISdk.setLoadTimeout(100);
WebCLISdk.automaticallyClearInputField(false);
WebCLISdk.allowRawHtml(true);

WebCLISdk.addSetsToDispatcher([
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