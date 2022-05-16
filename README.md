# vue-autocomplete-runthru

This template should help get you started developing with Vue 3 in Vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```sh
stackblitz start command is added to start the tests in stackblitz
```

## Thought process

Rather than approaching this problem as an task to build an autocomplete for Strings and Objects, I'm approaching this as an extensible component which can support support any data source, with any data structure, and can do the filtering locally or remotely.

I've stuck to composition APIs because it is declarative, easy to read, which means easy to test and jives really well with `JSX`.I might also be biased as I've been using a lot of react/next lately.

Stuck to no third party libraries(JS & CSS) other than the one's need by Vue.
No CSS preprocessors were used and simply relied on CSS3 variables to leverage very basic theming support.

### Use Pinia for StateManagement and Data Store

For the purpose of this exercise I choose to go with global StateManagment for 3 main reasons

1. Since the challenge specifically requires it, (unless I misunderstood the overloaded term for 'Store' which was a reference to use some sort of inmemory/file-based database like a Global Array/lowDB :-).
2. Expansion to work with remote datatypes will be just about writing another action in the store
3. The store can be used to double as a cache for memory and CPU(memoization) if needed.

#### Decisions to have local state

- Having the search key in the store would help to de-hydrate/hydrate the component to a the last state, but in our case not really necessary.
- This also gives indication to devs reading code that local state is fine and should be used when there is no strong case for global state, Global state is bad no matter how shiny we try to make it.

### Options To Solve the Problem

Autocomplete will be a generic [dumb component](https://javascript.plainenglish.io/react-all-about-components-35650a02ff50), that feeds props that allow for configuration namely

- placeholder => String, empty if none provided
- minLength => For the searchKey, will default to 3

#### Component Composition options

- Do the filtering inside the component which accepts a Custom data type like `{key : String, value : String}`(can be duck typed) or `String` which then can be searched based on a type check
- Do the above but instead of sticking to a predefined data type, allow the component to receive properties for `searchKey : String`, `idKey : String`, `display : {primary : Stirng, secondary : String}`.
- Use emitters to allow the parent container to accept `:suggestions` as a property and `@search` as an emitter, this would absolve the `AutoComplete` component from all responsibility of searching/filtering, displaying and mapping to particular types.

All solutions above will use slots to customize the the list rendering and look and feel.

### Improvements

1. Can be extrapolated to handle remote queries, but that is beyond the scope of this exercise.
2. Can also have support to add pagination in the case of remote queries.
3. Can use memoization for to save on CPU cycles for the same results set, but what are the odds of multiple components being triggered at once, and the searches at the moment are pretty rudimentary.

### Questions

__!! Warning !!__
Raw Thought Process, could have really dumb questions, but then again are there any dumb questions :-) ?

1. Will this work with a remote data source ?
   __A:__ yes it will, if we make this a dumb component
2. Should we work on some sort of memoization to save on cpu cycles?
__A:__ Not at the moment
1. What would happen if there are like 10 of these running at the same time in different tabs ?
   __A:__ Nothing
2. Rendering Issues ?
   __A:__ Have used default Vue rendering, have to check if it has support like Angular changeDetection
3. Can we use composition here to isolate the check ?
   __A:__ Not necessary, we can stick to good old components composition
4. Can we make the list a component with a slot option ?
   __A:__ yes we can
5. Can we make slot optional and resort to default if none given ?
   __A:__ Yes we can
6. Should I use an emit to handle the search from a Smart Component or inject the store inside the component ?
   __A:__ Emit a search, injection a store would tightly couple the component to a store
7. What if me made the store handle both types of data as cities and books and then send in a classifier to call the appropriate action ?
__A:__ Good idea so the store would have `{books, cities}` and a common action to search with a `search(key, classifier)` and let the store handle the complex logic and just have single emit handler in the parent component. But the store could get out of control pretty quickly, and our unit tests will spiral out of control. So let's stick to two stores for two different data types, the worst case is merging them together, but cost is low compared to merging and breaking things later.
