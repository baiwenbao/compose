module.exports = reducers => {
    const keys = Object.keys(reducers);
    return (state, action) => {
        return keys.reduce((container, key) => {
            const reducer = reducers[key];
            container[key] = reducer(state[key], action);
            return container;
        }, {});
    };
};