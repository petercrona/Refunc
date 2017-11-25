// Every model needs to create an intial version of itself.
export const create = () => ({counter: 1});

// Models are modified using functions that given the model return a new model.
// These should of course be treating the model as immutable.
export const inc = ({counter}) => ({counter: counter + 1});
export const dec = ({counter}) => ({counter: counter - 1});
