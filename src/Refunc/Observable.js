import {curry} from 'lodash/fp';
import {compose2} from './Combinators';

export const mkObservable = model =>
    ({observers: [], _model: model});

export const observe = curry(({observers, _model}, observer) =>
    ({observers: [...observers, observer], _model}));

export const notify = (observable) => {
    const observableCopy = {...observable};
    observable.observers.forEach(o => o(observableCopy));
    return observable;
};

export const fmap = curry((f, {observers, _model}) => ({observers, _model: f(_model)}));

export const fmapAndNotify = compose2(notify, fmap);

export const getModel = ({_model}) => _model;
