module.exports = (initState = {}, reducer, enhance = v => v) => {

    let currentStata = initState;

    const getState = () => {
        return currentStata;
    };

    const listeners = [];

    const subscribe = fn => {
        listeners.push(fn);
        return () => {
            const index = listeners.indexOf(fn);
            listeners.splice(index, 1);
        };
    };

    let dispatch = action => {
        currentStata = reducer(currentStata, action);
        listeners.forEach(listen => {
            listen();
        });
    };

    dispatch = enhance(dispatch);

    return {
        dispatch,
        getState,
        subscribe
    };
};

// module.exports = class store {
//     currentStata;
//     listeners = [];

//     constructor(initState = {}, reducer) {
//         this.currentStata = initState;
//     }

//     getState() {
//         return this.currentStata;
//     }

//     subscribe(fn) {
//         const {listeners} = this;
//         listeners.push(fn);
//         return () => {
//             const index = listeners.indexOf(fn);
//             listeners.splice(index, 1);
//         };
//     }

//     dispatch(action) {
//         const {currentStata, listeners} = this;
//         this.currentStata = reducer(currentStata, action);
//         listeners.forEach(listener => {
//             listener();
//         });
//     }
// }