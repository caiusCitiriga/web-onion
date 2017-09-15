
WebOnionSDK.allowRawHtml(true);
WebOnionSDK.automaticallyClearInputField(false);
// WebOnionSDK.addSetsToDispatcher([
//     {
//         command: 'test',
//         aliases: null,
//         flags: ['title', 'boxed-title'],
//         action: (flags) => {
//             if (!flags.length) {
//                 WCGenericOutputLibrary.printMessage(`This command has to be used in combination with a flag. ['--title', '--boxed-title']`, 2);
//                 return;
//             }

//             if (flags[0] === 'title') {
//                 WCGenericOutputLibrary.printTitle('This is a title');
//                 return;
//             }

//             if (flags[0].indexOf('boxed-title') !== -1) {
//                 console.log(flags[0].split(':'));
//                 if (!flags[0].split(':')[1] || flags[0].split(':')[1] === 'full_width=true') {
//                     WCGenericOutputLibrary.printBoxedTitle('This is a title');
//                 }

//                 if (flags[0].split(':')[1] === 'full_width=false') {
//                     WCGenericOutputLibrary.printBoxedTitle('This is a title', false);
//                 }
//                 return;
//             }

//             WCGenericOutputLibrary.printMessage('Invalid command', 1);
//         }
//     },
//     {
//         command: 'ask',
//         aliases: null,
//         flags: null,
//         action: (flags) => {
//             WCInputLibrary.prompt('What\'s your age?', 'age', () => {
//                 WCInputLibrary.prompt('And what\'s your name?', 'name', () => {
//                     WCGenericOutputLibrary
//                         .printMessage(`Hello ${WCInputLibrary.getInputData('name')}! Your age is: ${WCInputLibrary.getInputData('age')}`);
//                 })
//             }, 3);
//         }
//     },
// ]);

WebOnionSDK.addSetsToDispatcher([
    {
        command: 'test',                    //  The command full name
        aliases: ['t'],                     //  The array of aliases for the command if any.
        flags: ['title', 'boxed-title'],    //  The array of flags for the command if any.

        /**
          * The action that will be executed when the command or one of its aliases matches.
          * Here you will have access to the flags typed in by the user, if any.
          * Use them to build your command logic.
          */
        action: (flags) => {
            if (!flags.length) {
                WCGenericOutputLibrary.printMessage('Command fired with no flags');
                return;
            }

            if (flags[0] === 'title') {
                WCGenericOutputLibrary.printTitle('Command fired with title flag');
                return;
            }

            if (flags[0] === 'boxed-title') {
                WCGenericOutputLibrary.printBoxedTitle('Command fired with boxed-title flag');
                return;
            }

            //  Command fired: test "--boxed-title:full_width=false"
            if (flags[0].indexOf('boxed-title') !== -1 && flags[0].split(':')[1] === 'full_width=false') {
                WCGenericOutputLibrary.printBoxedTitle('Command fired with boxed-title flag', false);
                return;
            }

            //  Command fired: test "--boxed-title:full_width=true"
            if (flags[0].indexOf('boxed-title') !== -1 && flags[0].split(':')[1] === 'full_width=true') {
                //  same as calling printBoxedTitle with no second param.
                WCGenericOutputLibrary.printBoxedTitle('Command fired with boxed-title flag', true);
                return;
            }
        }
    },
]);

$(document).ready(() => {
    WebOnionSDK.initialize();
})