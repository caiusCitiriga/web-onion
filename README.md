# WebOnion SDK

A fully extensible SDK for building powerful browser based applications. With an old school CLI user interface and interaction system. 

### Get started

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
class WODispatcherConfiguration {
    command: string;
    aliases?: string[];
    flags?: string[];
    action: (flags: string[]) => void;
}
```
This is the building block of your application.
* **command**: The full name of your command. For example ```list```
* **aliases**: An array of strings with all the aliases. For example: ```['l', 'll']```
* **flags**: An array of strings with all the possible flags. For example: ```['files', 'folders']```
* **action**: A function that takes one parameter. This parameter will be the flags passed by the user.

Inside the action you can build your command logic, let's see a quick example.
We will create a command called ```test-me```. We will provide one alias ```tm``` and three flags ```['f1', 'f2', 'f3']```. 

```typescript
import {WebOnionSDK} from 'web-onion/dist/web-onion';

const WO = new WebOnionSDK();

WO.addConfigurationsToDispatcher([
    {
        command: 'test-me',
        aliases: ['tm'],
        flags: ['f1', 'f2', 'f3'],
        action: (flags: string[]) => {
            if(!flags.length){
                alert('Command fired without any flag');
                return;
            }
            
            if(flags.find(f => f === 'f1')){
                alert('Fired command list with flag --f1');
                return;
            }

            if(flags.find(f => f === 'f2')){
                alert('Fired command list with flag --f2');
                return;
            }

            if(flags.find(f => f === 'f3')){
                alert('Fired command list with flag --f3');
                return;
            }

            flags.forEach(f => {
                if(f.split(':').length && f.split(':')[1].split('=')[0] === 'value'){
                    const val = f.split(':').length && f.split(':')[1].split('=')[1]);
                    alert('Fired command with flag --f3 and with value: ' + val);
                }
            });
        };
    }
]);

$(document).ready(() => WO.initialize());
```
While the first four statements are pretty simple to understand, the last one can be a bit tricky. But it's not that complex once you get the what it does.

Suppose to have this command ```list --f3:value=33```

* It splits each flag by ```:```, obtaining ```['f3', 'value=33']```
* It takes the second value in the array: ```value=33```
* It splits the value by ```=```, obtaining ```['value', '33']```

Using this trick you can build advanced and complex commands.

# Core methods
### ```+ addConfigurationsToDispatcher()```
Adds the array of dispatcher configurations to the current configurations.
* **@param:** ```{WODispatcherConfiguration[]} configurations``` 
* **@memberof:** ```WebOnionSDK```

### ```+ initialize()```
Initializes the SDK with the given configurations
* **@memberof:** ```WebOnionSDK```

# Getters 
### ```+ loadTimeout()```
Returns the loading screen timeout if set. Null will be returned otherwise
* **@return:** ```{(number | null)}```
* **@memberof:** ```WebOnionSDK```

### ```+ clearAfterSubmit()```
Returns true if the input gets cleared after each ENTER press. False otherwise
* **@return:** ```{boolean}```
* **@memberof:** ```WebOnionSDK```

### ```+ dblClickFoucsToInput()```
Returns true if the input focuses automatically when double clicking on the console. False otherwise
* **@return:** ```{boolean}```
* **@memberof:** ```WebOnionSDK```

### ```+ dispatcherConfiguration()```
Returns the array containing the dispatcher configurations
* **@type:** ```{WODispatcherConfiguration[]}```
* **@memberof:** ```WebOnionSDK```

# Setters
### ```+ dbl_click_focus_to_input```
Enables or disables the input autofocus when double-clicking on the console
* **@param:** ```{boolean} value```
* **@memberof:** ```WebOnionSDK```

### ```+ clear_after_submit```
Enables or disables the input field auto clear on each ENTER press
* **@param:** ```{boolean} value```
* **@memberof:** ```WebOnionSDK```

### ```+ load_timeout```
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
WO.input_lib    // WOInput librart
```
## ```WOOutput``` library
---
#### ```+ showInitializationScreen()```
Phows the legacy loading screen

* **@memberof:**  ```WOOutput```

#### ```+ printMessage()```
Prints a message to the console.

* **@param:** ```{string}``` **message** The text of the message
* **@param:** ```{WOSeverityEnum}``` **severity** The severity of the message
* **@memberof:**  ```WOOutput```

#### ```+ clearConsole()```
Clears the console from the content

* **@memberof:** ```WOOutput```


#### ```+ printTitle()```
Prints a message styled as title according to the current style in use

* **@param:** ```{string} text``` 
* **@memberof:** ```WOOutput```

#### ```+ printBoxedTitle()```
Prints a message styled as title, surrounded with borders according to the current style in use

* **@param:** ```{string} text``` 
* **@param:** ```{boolean} full_width=true``` 
* **@memberof:** ```WOOutput```

#### ```+ printKeyValuePairs()```
Prints a list of key value pairs.

* **@param:** ```{{ key: string, value: string }[]} set ```
* **@param:** ```{string} [space_char='&nbsp;'] ```
* **@memberof:** ```WOOutput```

## ```WOInput``` library
----
#### ```+ clearInput()```
Clears the input field

* **@memberof:** ```WOInput```

#### ```+ focusInput()```
Focuses the cursor in the input field

* **@memberof:** ```WOInput```

#### ```+ prompt()```
Prompts the user with a question and takes a callback
that will be executed when the user continues by pressing ENTER and providing a value through the input-field.

* **@param:** ```{string} message ```
* **@param:** ```{WebOnionSDK} sdk ```
* **@param:** ```{string} dataKey ```
* **@param:** ```{() => void} callback ```
* **@param:** ```{WOSeverityEnum} [severity=WOSeverityEnum.message] ```
* **@memberof:** ```WOInput```

#### ```+ getInputData()```
Gets the input data from the storage saved earlier. If the given key matches one in the storage, the value will be returned. Otherwise null will be returned

* **@param:** ```{string} dataKey ```
* **@returns:** ```{(string | null)} ```
* **@memberof:** ```WOInput```

## Help WebOnion grow
If you like this project please help me with your feedback. Found a bug? Want a feature? Want some help? Feel free to open a [Issue on GitHub](https://github.com/caiuscitiriga/smart-cli/issues).

## Versioning
We use [SemVer](http://semver.org/) for versioning. 

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
