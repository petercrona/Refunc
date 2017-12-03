# Mvstate
Make your models observable. Nothing more nothing less. However, the interesting part of Mvstate
lies in how this is done. It's using the functor concept from functional programming to achieve this.

Mvstate allows you to wrap your model, and then lift your normal functions to operate on your wrapped
model. This means that your functions stay completely ignorant of all the observable magic.
Let's have a look:

``` JavaScript

// Model
const create = () => ({counter: 0});
const inc = ({counter}) => ({counter: counter + 1});
const dec = ({counter}) => ({counter: counter - 1});

// Now wrap you model in an Observable
const observable = mkObservable(Model.create())

// Observe it
observe(observable, (newObservable) => {
    console.log('value is', getModel(newObservable).counter);
})

// Operate on your observable. Note: functor laws are obeyed to avoid nasty surprises!
const newObservable = fmap(inc, observable);

// When you want, notify all observers that your observable changed.
notify(newObservable); // "value is 1" will be logged.
```

If you look at the above example and get scared or confused, don't worry!
This is the core code, it is not how you are intended to use it.
Just notice that the three lines that make up the model are very simple and ignorant
of any observable behavior.

Have a look at the React examples for how it is used in real life. It's pretty fancy!

To sum up, Mvstate allows you to make your models observable. But while coding your
models, you can completely ignore that they are observable. No need to mess with state.
No need to keep track of a list of observers. Just code your elegant pure code
operating on immutable models. Mvstate isn't solving a hard problem, but it can help you produce
better and more maintainable code. Try it out and join me in the quest of raising the quality
of code!

Cheers,
Peter Crona
