# WebOnion SDK

A fully extensible SDK for building powerful browser based applications. With an old school CLI user interface and interaction system. 

## Get started

#### #1 Install WebOnion
```
npm i web-onion
```

#### #2 Include JQuery in your index.html
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
```

#### #3 Include WebOnion in your .ts file
```typescript
import { WebOnionSDK } from 'web-onion/dist/web-onion';
const WO = new WebOnionSDK();

// make sure that the DOM is ready
$(document).ready(() => WO.initialize()); 
```
Build your bundle and serve your application. You should see the WebOnion's interface.

---
## Configuration
WebOnion is meant to be an SDK for building applications that runs on commands. To build your application, you will use the ```WebOnionSDK``` object. This object exposes a method called ```addConfigurationsToDispatcher()```.

This method takes one parameter which is an array of ```WODispatcherConfiguration``` objects.
```typescript
interface WODispatcherConfiguration {
    desc: string;
    flags?: string[];
    command: string;
    aliases?: string[];
    action: (flags: string[]) => void;
}
```
This is the building block of your application.
* **command**: The full name of your command. For example ```list```
* **desc**: The description for this command. This field will be used when generating the help for the user. For example ```Lists all the folders in the directoy```
* **flags**: An array of strings with all the possible flags. For example: ```['files', 'folders']```
* **aliases**: An array of strings with all the aliases. For example: ```['l', 'll', 'ls']```
* **action**: A function that takes one parameter. This parameter will be the flags passed by the user.

Inside the action you can build your command logic, let's see a quick example.
We will create a command called ```test-me```. We will provide one alias ```tm``` and three flags ```['f1', 'f2', 'f3']```. 

In the configuration, three properties are required.
+ **command**
+ **action**
+ **desc**

Note that you declare the flags normally, while the user will have to use them with the specified notation, which by default is a double dash: ```--flag-name```.

```typescript
import {WebOnionSDK} from 'web-onion/dist/web-onion';

const WO = new WebOnionSDK();

WO.addConfigurationsToDispatcher([
    {
            command: 'list',
            flags: [
                {
                    flag: 'f1',
                    desc: 'Flag one desc'
                },
                {
                    flag: 'f2',
                    desc: 'Flag two desc'
                },
                {
                    flag: 'f3',
                    desc: 'Flag three desc'
                }
            ],
            aliases: ['l', 'll', 'ls'],
            desc: 'My first awesome command',
            action: (flags: WOFlag[]) => {
                if (!flags.length) {
                    alert('Command fired test-me without any flag');
                    return;
                }

                if (flags.find(f => f.flag === 'f1')) {
                    alert('Fired command test-me with flag --f1');
                    return;
                }

                if (flags.find(f => f.flag === 'f2')) {
                    alert('Fired command test-me with flag --f2');
                    return;
                }

                if (flags.find(f => f.flag === 'f3')) {
                    alert('Fired command test-me with flag --f3');
                    return;
                }

                flags.forEach(f => {
                    if (f.flag.split(':').length && f.flag.split(':')[1] && f.flag.split(':')[1].split('=')[0] === 'value') {
                        const val = f.flag.split(':').length && f.flag.split(':')[1].split('=')[1];
                        alert('Fired command test-me with flag --f3 and with value: ' + val);
                        return;
                    }

                    alert('Unknown flag for this command');
                });
            }
        }
]);

$(document).ready(() => WO.initialize());
```
While the first four statements are pretty simple to understand, the last one can be a bit tricky. But it's not that complex once you get what it does.

Note that you can also run the same command using the given aliases.

Suppose to have this command ```list --f3:value=33```

The last statement:
* splits each flag by the ```:``` character, obtaining ```['f3', 'value=33']```
* takes the second value in the array: ```value=33```
* splits the value by the ```=``` character, obtaining ```['value', '33']```
* takes the second value in the array. The value passed along with the flag

Using this trick you can build advanced and complex commands.

# Core methods
### addConfigurationsToDispatcher()
Adds the array of dispatcher configurations to the current configurations.
* **@param:** ```{WODispatcherConfiguration[]} configurations``` 
* **@memberof:** ```WebOnionSDK```

### initialize()
Initializes the SDK with the given configurations
* **@memberof:** ```WebOnionSDK```

# Getters 
### loadTimeout()
Returns the loading screen timeout if set. Null will be returned otherwise
* **@return:** ```{(number | null)}```
* **@memberof:** ```WebOnionSDK```

### clearAfterSubmit()
Returns true if the input gets cleared after each ENTER press. False otherwise
* **@return:** ```{boolean}```
* **@memberof:** ```WebOnionSDK```

### dblClickFocusesInput()
Returns true if the input focuses automatically when double clicking on the console. False otherwise
* **@return:** ```{boolean}```
* **@memberof:** ```WebOnionSDK```

### dispatcherConfiguration()
Returns the array containing the dispatcher configurations
* **@type:** ```{WODispatcherConfiguration[]}```
* **@memberof:** ```WebOnionSDK```

# Setters
### dbl_click_focuses_input
Enables or disables the input autofocus when double-clicking on the console
* **@param:** ```{boolean} value```
* **@memberof:** ```WebOnionSDK```

### clear_after_submit
Enables or disables the input field auto clear on each ENTER press
* **@param:** ```{boolean} value```
* **@memberof:** ```WebOnionSDK```

### load_timeout
Sets the amount of time to wait before
the legacy loading screen hides
* **@param:** ```{number} value```
* **@memberof:** ```WebOnionSDK```

# Input-Output
WebOnion offers two libraries for handling the inputs and the outputs. 
* **```WOInput```** handles all the interactions with the user
* **```WOOutput```** handles all the output related operations

We access these libraries from the ```WebOnionSDK``` object:
```typescript
import {WebOnionSDK} from 'web-onion/dist/web-onion';

const WO = new WebOnionSDK();

WO.out_lib      // WOOut library
WO.input_lib    // WOInput library
```
## WOOutput
#### ```+ showInitializationScreen()```
Shows the legacy loading screen

* **@memberof:**  ```WOOutput```

#### printMessage()
Prints a message to the console.

* **@param:** ```{string}``` **message** The text of the message
* **@param:** ```{WOSeverityEnum}``` **severity** The severity of the message
* **@memberof:**  ```WOOutput```

#### clearConsole()
Clears the console from the content

* **@memberof:** ```WOOutput```


#### printTitle()
Prints a message styled as title according to the current style in use

* **@param:** ```{string} text``` 
* **@memberof:** ```WOOutput```

#### printBoxedTitle()
Prints a message styled as title, surrounded with borders according to the current style in use

* **@param:** ```{string} text``` 
* **@param:** ```{boolean} full_width=true``` 
* **@memberof:** ```WOOutput```

#### printKeyValuePairs()
Prints a list of key value pairs.

* **@param:** ```{{ key: string, value: string }[]} set ```
* **@param:** ```{string} [space_char='&nbsp;'] ```
* **@memberof:** ```WOOutput```

## WOInput library
#### ```+ clearInput()```
Clears the input field

* **@memberof:** ```WOInput```

#### focusInput()
Focuses the cursor in the input field

* **@memberof:** ```WOInput```

#### prompt()
Prompts the user with a question and takes a callback
that will be executed when the user continues by pressing ENTER and providing a value through the input-field.

* **@param:** ```{string} message ```
* **@param:** ```{WebOnionSDK} sdk ```
* **@param:** ```{string} dataKey ```
* **@param:** ```{() => void} callback ```
* **@param:** ```{WOSeverityEnum} [severity=WOSeverityEnum.message] ```
* **@memberof:** ```WOInput```

#### A few words about ```prompt()```:
This method is a powerful tool that you can use to interact with the user. Besides the message, the sdk and the callback function parameters, it takes a ```dataKey``` parameter. A string, which will be the identifier used by WebOnion to **store** the user's answer to the message prompted. This value gets stored in the browser's session storage prefixed by ```@wo-user-data-``` and followed by the ```dataKey``` value.  

The same library exposes a method to retrieve the data stored by the prompt, and it can be used anytime to retrieve values stored previously. This method is called ```getInputData()```

#### + getInputData()
Gets the input data saved previously from the storage. If the given dataKey matches one identifier in the storage, the value will be returned. Otherwise null will be returned

* **@param:** ```{string} dataKey ```
* **@returns:** ```{(string | null)} ```
* **@memberof:** ```WOInput```

## WOHelpManager library
#### ```+ generateHelpFromDispatcherConfig()```
Prints a table that illustrates all the registered commands. With the respective description, aliases, and flags for each command.

* **@param:** ```{WebOnionSDK} sdk ```
* **@memberof:**  ```WOHelpManager```

# Static classes
## WORenderer
This class exposes various methods to handle DOM mutations. Its just a wrapper over JQuery.
It was created to organize **all** DOM mutations into a single place.

#### append()
Appends the given element or string to the desired HTML element. 
The third parameter is optional, if set to true, it will append the given element to the last match of the selector element.

* **@param:** ```{string} to ```
* **@param:** ```{HTMLElement | string} element ```
* **@param:** ```{boolean?} appendToLastMatch ```
* **@memberof:**  ```WORenderer```

#### setVal()
Sets the value to the given element (used with inputs)

* **@param:** ```{string} to ```
* **@param:** ```{any} newVal ```
* **@memberof:**  ```WORenderer```

#### getVal()
Returns the value from the element (used with inputs)

* **@param:** ```{string} of ```
* **@returns:** ```{(string | undefined)} ```
* **@memberof:**  ```WORenderer```

#### setFocus()
Sets the focus on the element (used with inputs)

* **@param:** ```{string} to ```
* **@memberof:**  ```WORenderer```

#### getElement()
Returns the HTML element that matches the selector. Undefined otherwise
The second parameter is optional, if the selector finds multiple matches, it will return the desired match.
Undefined is returned if the match cannot be found, or the ```whichOneIfMultiple``` has an illegal index.

* **@param:** ```{string} whichElement ```
* **@param:** ```{number?} whichOneIfMultiple ```
* **@returns:** ```{(HTMLElement | undefined)} ```
* **@memberof:**  ```WORenderer```

#### setCSS()
Takes an array of ```WOCssRuleSet``` and applies the rules on the desired element.

* **@param:** ```{string} to ```
* **@param:** ```{WOCssRuleSet[]} cssRulesSet ```
* **@memberof:**  ```WORenderer```

#### listenForKeyPressOnElement()
Starts a listener on the given element for a *keypress* event.
When the user presses the keycode to catch, the callback will be executed.
The last optional parameter tells to the method to remove the listener after the callback has been executed.

* **@param:** ```{string} element ```
* **@param:** ```{number} keyCodeToCatch ```
* **@param:** ```{() => void} callback ```
* **@param:** ```{boolean = true} disposeListenerAfterCallbackExec ```
* **@memberof:**  ```WORenderer```

#### listenForDblClickOnElement()
Starts a listener for double clicks on the given element.
When the double click is catched, the callback is executed.

* **@param:** ```{string} element ```
* **@param:** ```{() => void} callback ```
* **@memberof:**  ```WORenderer```

#### hasClass()
Returns true or false wheter the element has or not the given class.

* **@param:** ```{string} element ```
* **@param:** ```{string} className ```
* **@returns:** ```{boolean}```
* **@memberof:**  ```WORenderer```

#### addClass()
Adds the given class to the desired element

* **@param:** ```{string} to ```
* **@param:** ```{string} className ```
* **@memberof:**  ```WORenderer```

#### removeClass()
Removes the given class from the desired element

* **@param:** ```{string} element ```
* **@param:** ```{string} className ```
* **@memberof:**  ```WORenderer```

#### remove()
Removes the entire element from the DOM

* **@param:** ```{string} element ```
* **@memberof:**  ```WORenderer```

#### after()
Operates setting the given element on the ```::after``` of the selector used.

* **@param:** ```{string} element ```
* **@param:** ```{HTMLElement | string} elementToSet ```
* **@memberof:**  ```WORenderer```

#### scrollTop()
Scrolls to the top of the given element with the given scroll amount.

* **@param:** ```{string} onWhichElement ```
* **@param:** ```{number} scrollAmount ```
* **@memberof:**  ```WORenderer```

#### empty()
Flushes the given element

* **@param:** ```{string} whichElement ```
* **@memberof:**  ```WORenderer```

# Entities
#### WOCommandSet
```typescript
interface WOCommandSet {
    command: string | null;
    flags: string[] | null;
}
```

#### WOSDKConfiguration
```typescript
interface WOSDKConfiguration {
    dispatcher: WODispatcherConfiguration[];
    input_field: {
        clear_after_submit: boolean
    };
    general: {
        theme: string,
        loading_screen_time?: number
    }
}
```

#### WODispatcherConfiguration
```typescript
interface WODispatcherConfiguration {
    command: string;
    aliases?: string[];
    flags?: string[];
    action: (flags: string[]) => void
}
```

#### WOFlag
```typescript
interface WOFlag {
    flag: string;
    desc: string;
}
```

#### WOCssRuleSet
```typescript
interface WOCssRuleSet {
    rule: string;
    value: string;
}
```

# Enums

#### WOSeverityEnum
The severity types of the messages printed out by the ```WOOut``` and ```WOIn``` libraries.
```typescript
enum WOSeverityEnum {
    message = 0,
    error = 1,
    warning = 2,
    info = 3
}
```
---
## Upcoming features
### **Theme configuration**
There will be a getter and a setter, along with a new entry in the main configuration object that will allow you to change the console's theme. Right now is fixed to ```Matrix.css```

### **Subtitle method implementation in WOOut library**
It will be bossible to print out subtitles along with titles and boxed titles

### **Complex outputs to WOOut lib**
It will be added a set of methods to this library that will handle complex outputs, like tables, images, special data presentation layouts and so on.

### **Auto completition of commands**
There will be a library that will handle the autcompletition process for the current commands set

### **Use arrows to navigate used commands history**
You will be able to use the arrows (up and down) to navigate the previously used commands. Just like in the terminal


# Help WebOnion grow
If you like this project please help me with your feedback. Found a bug? Want a feature? Want some help? Feel free to open a [Issue on GitHub](https://github.com/caiuscitiriga/smart-cli/issues).

## Versioning
We use [SemVer](http://semver.org/) for versioning. 

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
