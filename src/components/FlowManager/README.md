<a name="top"></a>

# FlowManager

The purpose of the `FlowManager` component is to make it easier to create and manage flows where there are a certain amout of _steps_ the user needs to be driven into to achieve a final result collecting one or more information at each step. As we will see the resulting flow is 100% dynamic, the only limitation is that all possible flow steps must be well known from the beginning, despite they can show dynamic content and can be skipped dynamically.  

<hr/>  

## Hands on
At some point while reading one might be tempted to try it out ... hopefully 😃 !!!  

Feel free to use [this codesandbox](https://codesandbox.io/s/flowmanager-7mto6) to play with the _FlowManager_. Happy flows!!!  

---

## Contents
- [getting started](#gettingStarted)
- [config](#config)
- [state](#state)
- [props](#props)
- [wrapper](#wrapper)
- [manager](#manager)
- [contexts](#contexts)
- [done](#done)
- [stepDone](#stepDone)
- [error](#error)
- [hints](#hints)
- [cheatsheets](#cheatsheets)
- [contrubute](#cheatsheets)

<hr/>

<a name="gettingStarted"></a>
## Getting started [⇧](#top)   
  

After importing it, pass the _config_ prop:  

``` js  
import React from 'react'
import FlowManager from 'Components/common/FlowManager'
import config from './config'

export default () => <FlowManager config={config} />
```

all we need to do is setup correctly the _config_ prop.  

<hr/>

<a name="config"></a>
## Config [⇧](#top)   

``` js  
const config = {
    steps= [ // MANDATORY
        {/*
            each step in the flow needs
            his own configuration object literal
        */}
    ],
    // OPTIONAL fields
    wrapper: {/*
        one object to wrap the flow in a container
    */},
    done,
    ExitComponent,
    LoadingComponent,
    ErrorComponent
}
```  

The clue here is the configuration for a _step_, the one for the _wrapper_ is similar.  
In few words, the _step_ configuration allows to automatically set state variables for that _step_, pass props to the _step component_ (whose value can be dynamically based on state variables); beside that, the _step component_ will receive some special functions which will be useful for driving the flow.  

Each _step component_ configuration must declare a `component` entry which contains the needed React component:  

``` json
{
    component: MyFirstStep,
    // ...
}
```
for the moment let's suppose this to be the following:  

``` js  
// MyFirstStep.jsx
export default () => <div>Nothing interesting</div>
```

<hr/>

<a name="state"></a>
## State for _step_ & _wrapper_ components [⇧](#top)   


now we can start using a fundamental parameter: the `steps` setting array:  

``` js  
// ..
import MyFirstStep from './components/MyFirstStep'
const config = {
    // ...
    steps:[{
        component: MyFirstStep,
        setters: {
            variables: [
                'firstChoice',
                {secondChoice: 'default-second-choice-value'}
            ],
            mySetter: 'foo_var',
            mySetterWithDefaultValue: {
                fooDefaultedVar: 'foo-defaulted-value'
            }
        },{
            // ...
        }
    ],
    // ...
}
```

_MyFirstStep_ automatically receives some props 1:1 correlated to the _setters_:  

``` js  
// MyFirstStep.jsx
export default ({
    state: {
        firstChoice, setFirstChoice,
        secondChoice, setSecondChoice,
        foo_var, mySetter,
        fooDefaultedVar, mySetterWithDefaultValue
    }
}) => <div onClick={() => setSecondChoice(+new Date)}>{secondChoice}</div>
```
here the `variables` sub element in the **config** allows to receive automatically, for all elements contained, a setter named almost as the variable, specifically `set` + _the name of the variable with first letter uppercased_ (_firstChoice_ will get a setter named _setFirstChoice_, same for _secondChoice_).  
The only difference here between _firstChoice_ and _secondChoice_ is that the second form allows to set a default value, thus _secondChoice_ will come with a default value equals to `"default-second-choice-value"`.    
If not set, as in the case of _firstChoice_, the default value will always be an empty string `""`.  

In case the automatic name given to the setter does not fit our needs we can set the config as we did for _foo\_var_ and its setter, named _mySetter_, thus having the possibility to choose the name of the setter; even in the case of _foo\_var_ the default value will be an empty string, but in case we need to set a default value for it different from `""` we just need to set it as done in the sample config for _fooDefaultedVar_, this will have a setter named _mySetterWithDefaultValue_ and a default value equals to `"foo-defaulted-value"`.  

Everything up to now outlined about the `settings` apply seamlessly for `steps` and `wrapper` configuration.

<hr/>

<a name="props"></a>
## Props for _step_ & _wrapper_ components [⇧](#top)   


Let's consider the `config` object how it was, with a small additional object named `props`. 

``` js  
{
    component: MyFirstStep,
    setters: {
        variables: [
            'firstChoice',
            {secondChoice: 'default-second-choice-value'}
        ],
        mySetter: 'foo_var',
        mySetterWithDefaultValue: {
            fooDefaultedVar: 'foo-defaulted-value'
        }
    },
    props: {
        staticProp: 'My awesome component',
        fromState_title: ({state: {secondChoice}}) => `Title at ${secondChoice}`
    }
}
```
in the props section of the config we added here two elements: 
- a static one named `staticProp` which will always contain `"My awesome component"`
- a dynamic one named `title` whose value can depend for example from the `state`

the dynamic one can be obtained just prepending `fromState_` to the desired variable name and adding a function (which will receive among other elements, even `state`, we'll see shortly) which is supposed to return the desired dynamic value.  

On the component side this will be accessible through a `props` sub-element: 

``` js  
// MyFirstStep.jsx
export default ({
    state: {
        firstChoice, setFirstChoice,
        secondChoice, setSecondChoice,
        foo_var, mySetter,
        fooDefaultedVar, mySetterWithDefaultValue
    },
    props: {
        title,
        staticProp
    }
}) => (<div>
    <h1>{staticProp}</h1>
    <h2>{title}</h2>
    <div onClick={() => setSecondChoice(+new Date)}>
        {secondChoice}
    </div>
</div>)
```
Everything up to now outlined about the `props` apply seamlessly for `steps` and `wrapper` configuration.  
As far as concerns the `config.wrapper` we know almost everything:  

- it's optional
- if specified should contain a `component` to render it in `config.wrapper.component`
- can specify and use `config.wrapper.props` & `config.wrapper.setters` as described
- will receive as prop and render `{children}`
- will receive as prop a special `manager` object which contains many fundamental values & functions to drive the flow
- will also receive a special `contexts` object which will contain the `state` of all _steps_ involved in the flow, we'll se that in a following section.


Before proceeding looking at all other options only available in each _step_ config we need to inspect what the `manager` literal bring as prop into the steps/wrapper components.

<hr/>

<a name="wrapper"></a>

## wrapper [⇧](#top) 

The wrapper component, as already mentioned, is optional but it's really useful.  
Its purpose is to create a managed container for the steps. For example is a great place to layout the driving buttons, a header and everything that need to be show always in the flow.  
Do not forget to always include the `{children}` somewhere in the _jsx_ cause there the _step components_ will be rendered.

``` js  
export default ({children, state, props, manager}) => (
    <>
        // a header
        {children}
        // layout for buttons
    </>
)
```

<hr/>

<a name="manager"></a>
## manager [⇧](#top)   

`manager` object contains some values & functions which allow to easily drive the flow: let's check one by one:  

- **activeSteps**:  
a _booleans array_ sized as the `config.steps`; each boolean tells if the correspondent _step_ is active or not (_steps_ can be deactivated dynamically using one of the manager functions)

- **stepIndex**:  
an _integer_ ∈ `[0, steps.length-1]` containing the current _step_ index.

- **stepsCount**:  
an _integer_ equal to `steps.length` containing then the total number of _steps_ (active and inactive)  

- **firstActiveIndex**:  
an _integer_ containing the index of the first active _step_

- **lastActiveIndex**:  
an _integer_ containing the index of the last active _step_

- **isFirstStep**:  
a _boolean_ telling us if the current _step_ is the first one or not

- **isLastStep**:  
a _boolean_ telling us if the current _step_ is the last one or not

- **enabledPrev**:  
a _boolean_ telling us if the flow can _step_ back to the previous _step_

- **enabledNext**:  
a _boolean_ telling us if the flow can _step_ forward to the following _step_

- **currentStep**:  
an _object_ which reference exactly the config step corresponding to the current step

- **changed**:  
a _boolean_ that will be `true` as far as something changes in the any state. Then only a `reset()` call will tur it back to `false`.

- **movePrev()**:  
a _function_ to be called to render the previous _step_ in the flow

- **moveNext()**:  
a _function_ to be called to render the next _step_ in the flow

- **skipStep(index, skipIt)**:  
a _function_ to be called to dinamically activate/deactivate a specific _step_, the first parameter is the index of the target step and the second parameter is a boolean (use _false_ to activate, _true_ to deactivate)

- **reset()**:  
a _function_ to be called in case the flow needs to be reset

<hr/>

<a name="contexts"></a>
## contexts [⇧](#top)   

Sometimes it would be useful to be able to change for example the value of a state variable of the second _step_, from the first _step_. 

Tipically the flow stores data on each _step_ and each _step_ can access and consume all the stored data. To be able to avoid naming collisions and to recognise exactly which _step_ some data belongs to, each _step_ configuration can optionally set a `stateContext` name.  
In case `stateContext` is not specified will be used a default value ending with the index of the _step_.  

``` js  
{
    steps: [{
        component: NameSetter,
        setters: {
            variables: ['name',]
        },
        props: {what: 'foo'}
        stateContext: 'firstContext'
    },{
        component: SurnameSetter,
        setters: {
            variables: ['name',]
            setNameInNameSetter: 'firstContext.name',
        },
        stateContext: 'secondContext'
    }]
}
```
Here the `SurnameSetter` component will receive a function in `state.setNameInNameSetter` which will enable to change the state of the previous _step_.  
**NOTICE**: this make a step a way less portable, thus be sure to use it where it's really needed.  

Now we can mention that another important object received by ever _step | wrapper_ component is `contexts`.  
This object is also sent to all the `fromState_` props functions. In that case `contexts` will look like follows:  

``` js  
{
    contexts: {
        firstContext: {
            name: ''
        },
        secondContext: {
            name: ''
        }
    }
}
```

<hr/>  

<a name="done"></a>
## global done, LoadingComponent and ExitComponent [⇧](#top)   

Once all _steps_ collected all data needed, we need to consume the data. When, in the _step_ is allowed to finish, the user triggers `moveNext`, FM will calls the `config.done` function. Its signature follows:  

``` js  
const config = {
    //...,
    done: ({ contexts }) => Promise
}
```
as you can see it will receive all _contexts_ (thus all data collected from the steps that specify a _stateContext_ string). It's supposed to return a _promise_ making it easy to asynchronously consume the data stored in the _contexts_.  
If a `config.LoadingComponent` is given, then it will receive `({contexts, manager, state})` where `state` is the one from the finishing step, and it will be rendered **while the promise is pending**; in case `config.LoadingComponent` is not set then a default 'loading' string will appear in the middle.  
But something could still go wrong in the returning _Promise_; to be able to render an error we just have to pass a component to the _reject_ function passed to the promise builder function: 

``` js  
// the done function
({contexts: {one, two}}) => new Promise((resolve, reject) => {
    fetch(MY_ENDPOINT_URL, {data: [one, two]})
    .then(resolve)
    .catch(err => {
        // just to be able in case to consume the `err`
        const MyErr = createErrComp(BaseError, err)
        reject(MyErr)
    })
})
``` 
If everything goes right we will most likely want to show a confirmation to the user that everything went fine. If a `config.ExitComponent` is set, it will be rendered as far as the `done` function gets resolved.

<hr/>

<a name="stepDone"></a>
## Step done [⇧](#top)   

Quite often could happen that we need to consume some data entered from the user in one _step_ to retrieve some data we need to consume afterward, for example in one of the  following _steps_. For example in the first _step_ we ask the user to choose a car brand and we might want to show all the models of that brand in a following _step_, and so on.   
The _step.done_ function allows to make asynchronous requests between two _steps_, the result can be then retrieved through the _contexts_'s  space of the _step_ that sets the _done_ function:  

``` js  
{
    // ...,
    steps: [{
        //...
        stateContext: "one",
        done: ({state: { brand }}) => new Promise((resolve, reject) => {
            fetch(CAR_API_BRANDMODELS_URI, {brand})
            .then(r => r.json())
            .then(r => ({models: r}))
            .catch(reject)
        })
    }, {
        component: StepTwo
        //...
    }]
}
```
then when `moveNext` is triggered from the _step_, loading info will appear (either the default either the LoadingComponent if set) and when solved, the following _step component_ will be able to access the response throught the contexts:

``` js  
// stepTwo.jsx
export default ({contexts: {one: {models}}}) => {
    //... consume models
}
```

<hr/>

<a name="error"></a>
## ErrorComponent [⇧](#top)   

In case a `config.ErrorComponent` is truthy, it will be immediately rendered. This is useful for example when the _done_ function calls a mutation which might produce an error.  

<hr/>

<a name="hints"></a>
## Hints [⇧](#top)   

FlowManager aims to allow manage portable, exchangeable, manager agnostic _step components_. For example a _step component_ that accepts an input for setting a name should be dumb, just rendering the input, manage user interaction, and just receive a setter & getter for that value.  
As we have seen the _step components_ receive many props strictly related to the FlowManager. The workaround to free the _step components_ from that dependency is to use a wrapper component for each step:  

``` js
// MyStep.jsx, clean FlowManager agnostic
const MyStep = ({name, setName}) => (
    <input type="text"
        onChange={e => setName(e.target.value)}
        value={name}
    />
)

// step used in config
// step1.jsx
import MyStep from 'Wherever/It/Is/MyStep'
export default ({state: {name, setName}}) => (
    <MyStep name={name} setName={setName}/>
)
```
doing that, _MyStep_ is completely unaware of the _FlowManager_ and can be reused elsewhere.

<hr/>

<a name="cheatsheets"></a>
## Cheatsheets [⇧](#top)   

### Main config
``` js  
{
    wrapper: WrapperConfigObject,
    steps: StepsArray,
    done: () => Promise,
    ErrorComponent,
    ExitComponent,
    LoadingComponent
}
```

### WrapperComponent config
``` js  
{
    component: WrapperComponent,
    setters: {
        variables: ['name', {surname: 'default surname'}]
        mySetter: 'myVar',
        mySetterDefaulted: {myVar2: 'defaukt value'}
    },
    props: {
        static: 'just a value',
        getDate: () => new Date,
        fromState_myVar: ({
            contexts,
            state: {name},
            manager: {stepIndex}
        }) => `${name} ${stepIndex}`
    }
}
```

### WrapperComponent props
``` js  
export default ({children, state, props, manager}) => (
    <>
        ...
        {children}
        ...
    </>
)
```

### StepComponent config
``` js  
{
    component: WrapperComponent,
    stateContext: 'an indentifier string uniquely used in this step'
    setters: {/* as per wrapper */},
    props: {/* as per wrapper */},
    
    resetNext: Boolean,
    resetNexts: Boolean,
    
    canFinish: (/* as step component */) => Boolean,

    prevStepIs: (/* as step component */) => Integer,
    nextStepIs: (/* as step component */) => Integer,
    
    enabledPrev: (/* contexts object */) => Boolean,
    enabledNext: (/* contexts object */) => Boolean,
    
    done: (/* as step component */) => new Promise((solve,reject) => {
        /*
        either solve, either reject passing as argument an ErrorComponent
        that will be rendered automatically
         */
    }),
}
```

### StepComponent props
``` js  
export default ({state, props, manager}) => (
    ...
)
```

### Props `fromState_` functions
``` js  
 // ...,
 fromState_xxx: ({contexts, manager, state }) => {
     // return something
 },
 // ...
```
<hr/><hr/><hr/>

<a name="contribute"></a>
## Contribute [⇧](#top)   


Any suggestion is super welcome, reach out [me directly](mailto:federico.ghedina@signavio.com) or any member of the Lake-kraken or Lego-kraken teams.