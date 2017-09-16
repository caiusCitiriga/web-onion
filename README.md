# WebOnion
A library for creating browser based applications with an old school CLI interface.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

### Installing
Install the library
```
npm i web-onion
```
### Quick setup
To quickly implement WebOnion in your project follow these steps:
* Include JQuery in your project. How it's up to you. You can use the CDNs, a file or NPM. Just make sure that JQuery is included.

* Create an HTML file (or use one you already have). Note that this file must be the index point of your application

* Include in the HTML file the WebOnion script: ```<script src="web-onion.js"></script>```

Now WebOnion is successfully loaded. To initialize the CLI create another JS file and load that file after the WebOnion script loading: ```<script src="my-script.js"></script>```

WebOnion, uses JQuery, the quickest way to initialize the CLI is to add this in your script file:
```javascript
$(document).ready(() => { WebOnionSDK.initialize(); });
```
With this line of code, you will load up the WebOnion SDK. If you serve your index HTML file, you'll note that the browser will show a dark screen with a little ***>*** sign at the bottom.

![alt text](./assets/web-onion-readme.png)

This is the WebOnion CLI. Right now, it can do pretty much nothing, but here it comes its real power. **The extensibility.** 

WebOnion is based on various **core** libararies. Each file is responsible for accomplishing one or more tasks.

* **WODispatcherLibrary** this lib takes care of dispatching the right action at the right command.
* **WOGenericOutputLibrary** this lib takes care of handling all the generic and non complex outputs. 
* **WOInputLibrary** this lib takes care of handling all the interactions with the user

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
                WOGenericOutputLibrary.printMessage('Command fired with no flags');
                return;
            }

            if (flags[0] === 'title') {
                WOGenericOutputLibrary.printTitle('Command fired with title flag');
                return;
            }

            if (flags[0] === 'boxed-title') {
                WOGenericOutputLibrary.printBoxedTitle('Command fired with boxed-title flag');
                return;
            }

            //  Command fired: test "--boxed-title:full_width=false"
            if (flags[0].indexOf('boxed-title') !== -1 && flags[0].split(':')[1] === 'full_width=false') {
                WOGenericOutputLibrary.printBoxedTitle('Command fired with boxed-title flag', false);
                return;
            }

            //  Command fired: test "--boxed-title:full_width=true"
            if (flags[0].indexOf('boxed-title') !== -1 && flags[0].split(':')[1] === 'full_width=true') {
                //  same as calling printBoxedTitle with no second param.
                WOGenericOutputLibrary.printBoxedTitle('Command fired with boxed-title flag', true);
                return;
            }
        }
    },
]);
```

In this way you can add as many commands sets as you want. Just keep in mind that if you have duplicates in your setup, the first occurence will be taken as good by the dispatcher.

# Advanced setup
You can configure the CLI however you like. WebOnion offers a configuration object that can be tweaked using specific methods. Although you could directly access the object properties, the one marked with the dobule underscore notation, it's always better to use the specific method, since it could do some other processing that you're unaware of.

#### The configuration object strucure:

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
        allow_raw_html: boolean
    }
}
```
## Dispatcher configuration
The dispatcher property holds all the configurations for the commands. As you can see, its simple configuration is composed by 4 properties, and 2 of these can be omitted.

* **command**: Is a string that defines the command full name. 
* **aliases**: Can be an array of strings or omitted. These strings will be the aliases of the full command name.
* **flags**: If the command takes some extra configuration or inputs from the user, you can specify here the flags to be used to trigger the specific functionality.
* **action**: This is the code that will be executed when the command fires. If your command can be used in combination with any flag, here you'll have access to a parameter called flags. In this parameter you will find an array of strings. Each value is the flag typed in by the user. You can extract even values with the flags if you play a bit around with separator chars.

#### Quick example on how to get a flag with a value
```javascript
['flag_one:value', 'flag_two'] // You can extract the value from the first flag by splitting the string by ':'
```


## Input field configuration
The input field can be configured to automatically be cleared when the user presses ENTER or not.

By default it automatically clears.

## Misc configuration
Here you can tweak the general CLI's options.
* **theme**: here you can chose the graphical theme for the CLI. For now only <i>Matrix</i> is supported
* **allow_raw_html**: this will prevent or not the parsing of HTML strings in what will be rendered on the console. If you plan to write custom HTML code during the prints, this is the option for you.

#### Note that in order to be sure that the configurations works, you have to declare them all before the call to the initialization method.

# WebOnionSDK object methods
## automaticallyClearInputField
Sets the automatic clearing of the input field after each ENTER press.

**parameters**: 
* **value**: ```boolean``` the value, whether ```true``` or ```false```
```javascript
WebOnionSDK.automaticallyClearInputField(false); // it will disable the automatic clear
WebOnionSDK.automaticallyClearInputField(true); // it will enable the automatic clear
```

## allowRawHtml
Prevent or not the parsing or HTML in the console.

**Parameters**: 
* **value**: ```boolean``` The value, whether ```true``` or ```false```

### Example
```javascript
WebOnionSdk.allowRawHtml(true); //  It will parse HTML
WebOnionSdk.allowRawHtml(false); //  It will escape HTML
```

## addSetsToDispatcher
Adds the given array of sets to the dispatcher configuration

**Parameters**: 
* **sets**: ```DispatcherSet[]``` the array containing the DispatcherSet objects
```typescript
//  DispatcherSet ojbect structure
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
            WOGenericOutputLibrary.printMessage('This is a message with warn severity', 2);
        }
    },
    {
        command: 'rr',
        aliases: null,
        flags: null,
        action: (flags) => {
            WOGenericOutputLibrary.printMessage('This is a message with info severity', 3);
        }
    }
]);
```

## initialize
Initializes the WebOnion CLI interface and starts the parser.

### Example
```javascript
//  If you use JQuery the document.ready event is the best place
$(document).ready(() => {
    WebOnionSdk.initialize();
});
```
After  calling this method you cannot pass further configurations except adding sets to the dispatcher.
#### Always call this where you are sure that the document is ready. 

# WOGenericOutputLibrary methods
This library handles all the generic and non complex outputs to the console.

## printMessage
Prints a message to the console. 

**Parameters**: 
* **message**: ```string``` The text of the message
* **severity**: ```number``` The severity (0: msg, 1: err, 2: warn, 3: info)

The severity is used to color the message. 
(the Matrix stylesheet colors are used for demonstration)
* **msg** green text
* **err** red text
* **warn** orange text
* **info** blue text

### Example
```javascript
WOGenericOutputLibrary.printMessage('My message');      // deafult severity 0
WOGenericOutputLibrary.printMessage('My error', 1);     // error severity
WOGenericOutputLibrary.printMessage('My warning', 2);   // warning severity
WOGenericOutputLibrary.printMessage('My info', 3);      // info severity
```

## printTitle
Prints a title to the console.

**Parameters**:
* **text**: ```string``` the text of the title

### Example
```javascript
WOGenericOutputLibrary.printTitle('My awesome title');
```

## printBoxedTitle
Prints a title with borders around to the console.

**Parameters**
* **text**: ```string``` the text of for the title
* **full_width**: ```boolean``` if the box around the title should be full width or not

### Example
```javascript
WOGenericOutputLibrary.printBoxedTitle('My awesome boxed title'); // full width
WOGenericOutputLibrary.printBoxedTitle('My awesome boxed title', false); // auto width
```

## printKeyValuePairs
Prints a set of key-value objects to the console. Spacing them and coloring the keys.

The object structure for the set is like the one below:
```typescript
const KeyValuePair = {
    key: string,
    value: string
}
```

**Parameters**
* **set**: ```KeyValuePairObject[]``` The array containing the key-values pairs objects
* **space_char**: ```string``` The string used to space the values from the keys (default: ```&nbsp```)

### Example
```javascript
const keyValuesPairs = [
    {
        key: 'My key 1',
        value: 'My key 1 val'
    },
    {
        key: 'My key 2',
        value: 'My key 2 val'
    },
    {
        key: 'My key 3',
        value: 'My key 3 val'
    }
];

WOGenericOutputLibrary.printKeyValuePairs(keyValuesPairs);
```

## clearConsole
Clears the console content
### Example
```javascript
WOGenericOutputLibrary.clearConsole();
```

# WOInputLibrary methods
This library handles all the interactions with the user.

## clearInput
Clears the input field

### Example
```javascript
WOInputLibrary.clearInput();
```

## focusInput
Focuses the input field

### Example
```javascript
WOInputLibrary.focusInput();
```

## prompt
Prompts the user with a question, and puts the input field into a input-wait mode. This mode is used to 
get the data from the user and pass it to the callback.

**Parameters**
* **message**: ```string``` the text of the prompt that will appear in console
* **dataKey**: ```string``` this is the key that will hold the value the user will provide via input. You can access this data with the ```getInputData()``` method
* **callback**: ```() => void``` a function that takes no parameters and returns nothing that will be executed when the user will press ENTER. In this function you can safely access the data from the user by calling the ```getInputData()``` method on the ```WOInputLibrary```.
* **severity**: ```number``` the severity of the message. See the ```printMessage()``` description to know more about these codes.

### Example
```javascript
const askName = (next) => {
    WOInputLibrary.prompt(`What's your name?`, 'name', next);
}

const askAge = (next) => {
    WOInputLibrary.prompt(`And what's your age?`, 'age', next);
}

askName(() => {
    askAge(() => {
        //  We can get both data at once here.
        const name = WOInputLibrary.getInputData('name');
        const age = WOInputLibrary.getInputData('age');
        WOGenericOutputLibrary.printMessage(`You are ${name} and you are ${age} years old`);
    });
});
```

## getInputData
Gets the value for the given key.

**Parameters**:
* **dataKey**: ```string``` the key of the data to fetch. This key is passed when calling the ```prompt()``` method

**Returns**: ```string``` or ```null``` whether the data is found or not. 

#### Note we're using the session storage, and the data persists only till the session is opened. When you'll close the browser you will lose all that is stored.
### Example
```javascript
WOInputLibrary.getInputData('myKey');
````

## Versioning
We use [SemVer](http://semver.org/) for versioning.

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details