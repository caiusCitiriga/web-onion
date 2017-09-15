# WebCLI
A library for creating browser based applications with a old school CLI interface.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

### Installing
Install the library
```
npm i web-cli
```

### Setup
You can configure the CLI however you like. WebCLI offers a configuration object that can be tweaked using specific methods. Although you could directly access the object properties, it's always better to use the specific method, since it could do some other processes that you're unaware of.

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
        load_timeout: number,
        theme: string, // not yet handled
        allow_raw_html: boolean
    }
}
```
## Dispatcher configuration
The dispatcher property holds all the configurations for the commands. As you can see, its simple configuration is composed by 4 properties, and 2 of these can be omitted.

* <b>command</b>: Is a string that defines the command full name. This string can be used to trigger the action of the command
* <b>aliases</b>: can be an array of strings or omitted. These strings will be the aliases of the full command name
* <b>flags</b>: If the command takes some extra configuration or inputs from the user, you can specify here the flags to be used to trigger the specific functionality.
* <b>action</b>: This is the code that will be executed when the command fires. If your command can be used in combination with any flag, here you'll have access to a parameter called flags. In this parameter you will find an array of strings. Your choiche on how to separe the value from the flag. 

#### Flag - value speparation tip
You could ask the user to insert a command following this syntax:
```
command --flag value
```
So when you'll recieve the flag in your <b>action</b> you will simply split it by spaces and take the last value. 

## Input field configuration
The input field can be configured to automatically be cleared when the user presses ENTER or not.<br>
By default it automatically clears.

## General configuration
Here you can tweak the general CLI's options.
* <b>load_timeout</b>: this sets the timeout that WebCLI will give to its core scripts to load. A loading screen will be shown during this time. Increasing the time will give more time to load the file on slower machines. Generally speaking 100ms should be more than enough.
* <b>theme</b>: here you can chose the graphical theme for the CLI. For now only <i>Matrix</i> is supported
* <b>allow_raw_html</b>: this will prevent or not the parsing of HTML strings in what will be rendered on the console. If you plan to write custom HTML code during the prints, this is the option for you.

# Setters
## addSetsToDispatcher

Adds the given array of sets to the dispatcher configuration
<b>Parameters</b>: sets {Array<DispatcherSet>}
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
```

## setLoadTimeout
Sets the loading timeout in ms for the core scripts
<b>Parameters</b>: timeout {number}

### Example
```javascript
WebCLISdk.setLoadTimeout(100);
```

## allowRawHtml
Allows raw HTML to be rendered in the console
<b>Parameters</b>: value {boolean}


### Example
```javascript
WebCLISdk.allowRawHtml(true);
```


## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/caiuscitiriga/smart-cli/tags). 

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details