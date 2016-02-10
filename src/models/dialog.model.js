import _ from 'lodash';

import Observer from '../utils/observer';
import { MESSAGE_TYPES, DIALOG_TYPES } from '../utils/constants';
import { openDialog } from '../utils/stateUtils';

function closeDialog({ state, payload }) {
    return new Promise((resolve, reject) => {
        state.openDialog = null;
        resolve({ state, payload });
    });
}

function openDeployDialog({ state, payload }) {
    return new Promise((resolve, reject) => {
        if (state.paperChangePoint || state.blogConfigChangePoint) {
            state = openDialog(state, DIALOG_TYPES.SAVE_INFO_BEFORE);
            resolve({ state, payload });
        }
        else {
            state = openDialog(state, DIALOG_TYPES.DEPLOY);
            resolve({state, payload});
        }
    })
}

function startDeployDialog({ state, payload }) {
    return new Promise(( resolve, reject ) => {
        state = openDialog(state, DIALOG_TYPES.DEPLOY_START);
        resolve({ state, payload });
    });
}



class DialogModel extends Observer {
    constructor() {
        super();
    }

    dispatch({ state, payload }) {
        const { type } = payload;
        var task;

        switch (type) {
            case MESSAGE_TYPES.CLICK_DEPLOY:
                task = openDeployDialog;
                break;

            case MESSAGE_TYPES.CLICK_DEPLOY_START:
                task = startDeployDialog;
                break;

            case MESSAGE_TYPES.CLOSE_DIALOG:
                task = closeDialog;
                break;

            default:
                task = null;
                break;
        }

        super.dispatch({ state, payload }, task);
    }
}


let _dialogModel = null;

export default () => {
    if (_dialogModel !== null) return _dialogModel;

    _dialogModel = new DialogModel();
    return _dialogModel;
};