const curry = (f) => (...args) => {
    const nrArgsRequired = f.length;
    if (args.length < nrArgsRequired) {
        return curry(f.bind(null, ...args));
    }
    return f(...args);
};

const mkObservable = model =>
    ({observers: [], _model: model});

const observe = curry(({observers, _model}, observer) =>
    ({observers: [...observers, observer], _model}));

const notify = (observable) => {
    const observableCopy = {...observable};
    observable.observers.forEach(o => o(observableCopy));
    return observable;
};

const fmap = curry((f, {observers, _model}) => ({observers, _model: f(_model)}));
const fmap2 = curry((f, {observers, _model}, x) => ({observers, _model: f(x, _model)}));

const getModel = ({_model}) => _model;

module.exports = {
    mkObservable,
    observe,
    notify,
    fmap,
    fmap2,
    getModel
};
