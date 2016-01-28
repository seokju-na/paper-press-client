import WorkerThread from './main.worker';
import virtualize from 'vdom-virtualize';
import toJson from 'vdom-as-json/toJson';
import applyPatch from 'vdom-serialized-patch/patch';
import { getLocalPathname } from 'local-links';

import { MESSAGE_TYPES } from './js/constants';
import './styles/main.less';

const worker = new WorkerThread;
const rootElement = document.getElementById('root');

worker.onmessage = ({data}) => {
    const { url, payload } = data;

    window.requestAnimationFrame(() => {
        applyPatch(rootElement, payload);
    });

    if (location.pathname !== url)
        history.pushState(null, null, url);
};

worker.postMessage({
    type: MESSAGE_TYPES.START,
    payload: {
        virtualDOM: toJson(virtualize(rootElement)),
        url: location.pathname
    }
});

window.addEventListener('popstate', () => {
    worker.postMessage({
        type: MESSAGE_TYPES.SET_URL,
        payload: location.pathname
    });
});


document.body.addEventListener('keydown', (event) => {
    let type;

    if (event.target.hasOwnProperty('data-press'))
        type = event.target['data-press'].type;
    else
        type = null;

    const texts = event.target.value;
    const eventKey = event.keyCode;

    if (type) {
        switch(eventKey) {
            case 13:
                worker.postMessage({
                    type: type,
                    payload: texts
                });
                break;
        }
    }
});