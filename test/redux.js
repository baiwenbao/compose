const {expect} = require('chai');

const createStore = require('../redux/createStore');
const combineReducer = require('../redux/combineReducer');

const initState = {};

const createAction = ({type, conf}) => {
    return {
        type,
        conf
    };
};

const getName = (state = {name: 'a'}, {type, conf}) => {
    switch (type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: conf
            };
        default:
            return state;
    }
};

const getNum = (state = {num: 0}, {type, conf}) => {
    switch (type) {
        case 'CHANGE_NUM':
            return {
                ...state,
                num: conf
            };
        default:
            return state;
    }
};

const rootReducer = combineReducer({
    getNum,
    getName
});

const {getState, subscribe, dispatch} = createStore(initState, rootReducer);

describe('redux test', () => {
    it('dispath', () => {
        dispatch(createAction({
            type: 'CHANGE_NAME',
            conf: 'b'
        }));
        dispatch(createAction({
            type: 'CHANGE_NUM',
            conf: 2
        }));
        const {getName, getNum} = getState();
        expect(getName.name).to.be.equal('b');
        expect(getNum.num).to.be.equal(2);
    });
});