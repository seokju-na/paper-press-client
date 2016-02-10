import _ from 'lodash';
import Observer from '../utils/observer';
import { MESSAGE_TYPES } from '../utils/constants';

class Messenger extends Observer {
    constructor(state) {
        super();
        this._state = state;
    }

    dispatch({ state, payload }) {
        this._state = state;
        console.log("State on " + payload.type, _.clone(this._state));

        if (state.openDialog !== null)
            payload.type = MESSAGE_TYPES.OPEN_DIALOG;

        self.postMessage({ state, payload });
    }

    listenStart() {
        self.onmessage = ({ data }) => {
            const { payload } = data;

            _.forEach(this._subscribes, (observer) => {
                observer.dispatch({
                    state: this._state,
                    payload: payload
                });
            });
        };
    }
}

export default Messenger;