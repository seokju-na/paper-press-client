import diff from 'virtual-dom/diff';
import serializePatch from 'vdom-serialized-patch/serialize';
import fromJson from 'vdom-as-json/fromJson';

import { MESSAGE_TYPES } from '../utils/constants';
import Observer from '../utils/observer';
import App from '../views/App';

let currentVDom;

function patchDOM({ state, payload }) {
    return new Promise((resolve, reject) => {

        var newVDom = App(state);
        var patches = diff(currentVDom, newVDom);

        currentVDom = newVDom;

        resolve({
            state: state,
            payload: {
                patches: serializePatch(patches),
                type: payload.type
            }
        });
    });
}


class Patcher extends Observer {
    constructor() {
        super();
    }

    dispatch({ state, payload }) {
        const { type } = payload;
        var task = patchDOM;

        if (type === MESSAGE_TYPES.INIT)
            currentVDom = fromJson(payload.virtualDOM);

        super.dispatch({ state, payload }, task);
    }
}


let _patcher = null;
export default () => {
    if (_patcher !== null) return _patcher;

    _patcher = new Patcher();
    return _patcher;
};