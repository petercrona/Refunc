import {curry} from 'lodash/fp';
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
            return <ComponentToWrap {...this.props}
                                    model={Observable.getModel(this.state.observable)}
                                    observable={this.state.observable} />;
        }
    };
});
