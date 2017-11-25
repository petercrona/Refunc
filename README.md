# Mvsplit
Make your models observable. Nothing more nothing less. However, the interesting part of Mvsplit
lies in how it is done. It's using the functor concept from functional programming to achieve this.

Mvsplit allows you to wrap your model, and then lift your normal functions to operate on your wrapped
model. This means that you functions stay completely ignorant of any observable magic.
Let's have a look:

``` JavaScript

// = Model.js
const create = () => ({counter: 0});
const inc = ({counter}) => ({counter: counter + 1});
const dec = ({counter}) => ({counter: counter - 1});

// = Other files

// Wrap you model in an Observable
const observable = mkObservable(Model.create())

// Observe
observe(observable, (newObservable) => {
    console.log('value is', getModel(newObservable).counter);
})

// Operate on your observable. Note: functor laws are obeyed to avoid surprises!
const newObservable = fmap(inc, observable);

// When you want, notify all observers that you observable changed.
notify(observable); // "value is 1" will be logged.
```

If you look at the above example and get scared, don't worry!
This is the core code, but it is not how you are intended to use it.
Have a look at the React examples for how it is used in real life.
It's pretty fancy!

Just to reiterate, Mvsplit allows you to make your models observable. But while coding your
models, you can completely ignore that they are observed. No need to mess with state.
No need to keep track of a list of observers. Just code your elegant pure code
operating on immutable models. Mvsplit isn't solving a hard problem, but it can help you produce
better and more maintainable code.

Cheers,
Peter Crona
