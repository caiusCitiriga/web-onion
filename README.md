# WebOnion
A library for creating browser based applications with a old school CLI interface.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

### Installing
Install the library
```
npm i web-cli
```
### Quick setup
To quickly implement WebOnion in your project follow these steps:
* Include JQuery in your project. How it's up to you. You can use the CDNs, a file or NPM. Just make sure that JQuery is included.

* Create an HTML file (or use one you already have). Note that this file must be the index point of your application

* Include in this file the WebOnion script: ```<script src="web-onion.js"></script>```

Now WebOnion is successfully loaded. To initialize the CLI create another JS file and load that file after the WebOnion script loading: ```<script src="my-script.js"></script>```

WebOnion, uses JQuery, the quickest way to initialize the CLI is to add this in your script file:
```javascript
$(document).ready(() => { WebOnionSDK.initialize(); });
```
With this line of code, you will load up the WebOnion SDK. If you serve your index HTML file, you'll note that the browser will show a dark screen with a little ***>*** sign at the bottom.

![alt text](./assets/web-onion-readme.png)

This is the WebOnion CLI. Right now, it can do pretty much nothing, but here it comes its real power. **The extensibility.** 

WebOnion is based on various **core** libararies. Each file is responsible for accomplishing one or more tasks.

* **WCDispatcherLibrary** takes care of dispatching the right action at the right command.
* **WCGenericOutputLibrary** this core lib takes care of handling all the generic outputs. 
* **WCGenericInputLibrary** this library takes care of handling all the interactions with the user

We use the **WebOnionSDK** object to configure the CLI, while we use some of the **libraries** to interact with the CLI.

With the default configuration you will have a set of default commands. These commands can be fired directly from the command line interface from the browser:

#### echo
Takes one flag (mandatory) **--m**, followed by a semicolon and the text you want to echo in console. 

```javascript
echo --m:Hello world!
```

#### wo
The WebOnion's main command.

Takes multiple flags:
* **--info**: echos out the info about WebOnion
* **--inspire**: echos out a random quote using the ***Quotes on design*** web API
```javascript
wo --info       // echos infos about WebOnion
wo --inspire    // echos a random quote
```

#### clear
Clears out the console.
Takes no flags and it has multiple aliases
```javascript
clear   //  Full command
clr     //  Alias
ccl     //  Alias
cls     //  Alias
kk      //  Alias
```

Before, we talked about **extensibility**, this is one of the main features of WebOnion. It's easier to see the code, since talks by itself, to get an idea:

```javascript
/**  
  * This method is used to add a new command to the WebOnion's dispatcher.
  * It takes an array of command sets.
  */
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
```

# Advanced setup
You can configure the CLI however you like. WebOnion offers a configuration object that can be tweaked using specific methods. Although you could directly access the object properties, it's always better to use the specific method, since it could do some other processes that you're unaware of.

The configuration object strucure:

I will use the Typescript notation since it explains better the possible values for each field.
```typescript
{
    dispatcher: {
        command: string, 
        alaiases: string[] | null,
        flags: string[] | null,
        action: (flags) => void
    }[],

    input_field: {
        clear_after_submit: boolean
    },

    general: {
        theme: string, // not yet handled
        allow_raw_html: boolean
    }
}
```
## Dispatcher configuration
The dispatcher property holds all the configurations for the commands. As you can see, its simple configuration is composed by 4 properties, and 2 of these can be omitted.

* **command**: Is a string that defines the command full name. This string can be used to trigger the action of the command
* **aliases**: can be an array of strings or omitted. These strings will be the aliases of the full command name
* **flags**: If the command takes some extra configuration or inputs from the user, you can specify here the flags to be used to trigger the specific functionality.
* **action**: This is the code that will be executed when the command fires. If your command can be used in combination with any flag, here you'll have access to a parameter called flags. In this parameter you will find an array of strings. Your choiche on how to separe the value from the flag. 

#### Flag - value speparation tip
You could ask the user to insert a command following this syntax:
```
command --flag value
```
So when you'll recieve the flag in your <b>action</b> you will simply split it by spaces and take the last value. 

## Input field configuration
The input field can be configured to automatically be cleared when the user presses ENTER or not.

By default it automatically clears.

## General configuration
Here you can tweak the general CLI's options.
* **theme**: here you can chose the graphical theme for the CLI. For now only <i>Matrix</i> is supported
* **allow_raw_html**: this will prevent or not the parsing of HTML strings in what will be rendered on the console. If you plan to write custom HTML code during the prints, this is the option for you.

# Setters
## addSetsToDispatcher

Adds the given array of sets to the dispatcher configuration

**Parameters**: sets {Array<DispatcherSet>}
```typescript
const DispatcherSet = {
    command: string, 
    alaiases: string[] | null,
    flags: string[] | null,
    action: (flags) => void
}
```
### Example
```javascript
WebOnionSdk.addSetsToDispatcher([
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
```

## allowRawHtml
Allows raw HTML to be rendered in the console

**Parameters**: value {boolean}

### Example
```javascript
WebOnionSdk.allowRawHtml(true);
```

# Methods

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/caiuscitiriga/smart-cli/tags). 

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details