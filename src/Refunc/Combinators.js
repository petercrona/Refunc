import {curry} from 'lodash/fp';

export const compose2 = curry((f, g, x, y) => f(g(x, y)));
export const compose = curry((f, g, x) => f(g(x)));
