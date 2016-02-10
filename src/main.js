import virtualize from 'vdom-virtualize';
import toJson from 'vdom-as-json/toJson';
import applyPatch from 'vdom-serialized-patch/patch';

import worker from './ui/workerManager';
import { MESSAGE_TYPES, UI, DIALOG_TYPES } from './utils/constants';
import { initEditor, initInputs, initEventListener } from './ui/initUI';
import './styles/main.less';

import '../node_modules/highlight.js/styles/github.css';
import './assets/codemirror.css';
import '../node_modules/codemirror/mode/markdown/markdown';

const rootElement = document.getElementById('root');

worker.onmessage = ({data}) => {
    const { state, payload } = data;

    if (payload.type === MESSAGE_TYPES.INIT) {
        setTimeout(() => {
            worker.postMessage({
                payload: {
                    data: null,
                    type: MESSAGE_TYPES.START
                }
            });
        }, 2000);
    }

    window.requestAnimationFrame(() => {
        applyPatch(rootElement, payload.patches);

        switch(payload.type) {
            case MESSAGE_TYPES.START:
                initEditor(state);
                initInputs(state);
                initEventListener();
                break;

            case MESSAGE_TYPES.CLICK_NEW_PAPER:
            case MESSAGE_TYPES.CLICK_DELETE:
            case MESSAGE_TYPES.SELECT_PAPER:
                initEditor(state);
                initInputs(state);
                break;

            case MESSAGE_TYPES.OPEN_DIALOG:
                if (state['openDialog'] === DIALOG_TYPES.DEPLOY_START)
                    worker.postMessage({
                        payload: {
                            data: null,
                            type: MESSAGE_TYPES.CLICK_DEPLOY_DONE
                        }
                    });
                break;
        }
    });
};

worker.postMessage({
    payload: {
        virtualDOM: toJson(virtualize(rootElement)),
        type: MESSAGE_TYPES.INIT
    }
});

