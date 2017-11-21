import {curry, compose, map, tail, head} from 'lodash/fp';
import React, {Component} from 'react';
import * as Observable from './Observable';

export const observe = curry((model, ComponentToWrap) => {
    return class WithObserver extends Component {
        constructor(props) {
            super(props);

            let observable = Observable.mkObservable(model);
            observable = Observable.observe(observable, (newObservable) => {
                this.setState({observable: newObservable});
            });

            this.state = {
                observable
            };
        }

        render() {
            const handle = (...fns) => () =>
                compose(head(fns), ...map(Observable.fmap, tail(fns)))(this.state.observable);
            const notify = (...fns) => () =>
                compose(Observable.notify, ...map(Observable.fmap, fns))(this.state.observable);
            const refuncProps = {
                handle,
                notify,
                model: Observable.getModel(this.state.observable),
                observable: this.state.observable
            };

            return <ComponentToWrap {...this.props}
                                    refunc={refuncProps} />;
        }
    };
});
