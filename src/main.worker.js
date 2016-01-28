import diff from 'virtual-dom/diff';
import serializePatch from 'vdom-serialized-patch/serialize';
import fromJson from 'vdom-as-json/fromJson';

import { MESSAGE_TYPES } from './js/constants';
import Main from './views/Main';

let currentVDom;

const state = {
    texts: '',
    blogInfo: null,
    posts: null,
    selectPost: null,
    url: '/'
};

self.onmessage = ({data}) => {
    const { type, payload } = data;

    switch (type) {
        case MESSAGE_TYPES.START:
            currentVDom = fromJson(payload.virtualDOM);
            state.url = payload.url;
            break;

        case MESSAGE_TYPES.SET_URL:
            state.url = payload.url;
            break;

        case MESSAGE_TYPES.INPUT_TEXT:
            state.texts = payload;
            break;
    }

    const newVDom = Main(state);
    const patches = diff(currentVDom, newVDom);

    currentVDom = newVDom;

    self.postMessage({
        url: state.url,
        payload: serializePatch(patches)
    });
};