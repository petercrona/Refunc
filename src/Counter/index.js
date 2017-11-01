import React from 'react';
import * as Model from './Model';
import * as Observable from '../Refunc/Observable';
import {observe} from '../Refunc/ObserveHoc';

const inc = Observable.fmapAndNotify(Model.inc);
const dec = Observable.fmapAndNotify(Model.dec);

function Counter({model, observable}) {
    return (
        <div>
            <p>
                <strong>Counter is {model.counter}</strong>
            </p>
            <p>
                <button onClick={() => dec(observable)}>Decrement</button>
                <button onClick={() => inc(observable)}>Increment</button>
            </p>
        </div>
    );
}

export default observe(Model.create(), Counter);
