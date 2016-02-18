import _ from 'lodash';

import Observer from '../utils/observer';
import { MESSAGE_TYPES, DIALOG_TYPES } from '../utils/constants';


function inputText({ state, payload }) {
    return new Promise((resolve, reject) => {
        state.paperChangePoint = true;
        state.eventLog = "Draft";
        state.texts = payload.data;

        resolve({ state, payload });
    });
}

function inputBlogInfo({ state, payload }) {
    return new Promise((resolve, reject) => {
        state.blogConfigChangePoint = true;
        state.blogConfig = payload.data;

        resolve({ state, payload });
    });
}

function inputPaperInfo({ state, payload }) {
    return new Promise((resolve, reject) => {
        const { titleImage, summary, tags } = payload.data;

        state.paperChangePoint = true;
        state.eventLog = "Draft";
        state.papers[state.selectPaperIndex] =
            _.assign(state.papers[state.selectPaperIndex], {
                titleImage: titleImage,
                summary: summary,
                tags: tags
            });

        resolve({ state, payload });
    });
}

function inputTitle({ state, payload }) {
    return new Promise((resolve, reject) => {
        state.paperChangePoint = true;
        state.eventLog = "Draft";
        state.papers[state.selectPaperIndex]['title'] = payload.data;

        resolve({ state, payload });
    });
}

function switchTools({ state, payload }) {
    return new Promise((resolve, reject) => {
        state.tools = !state.tools;

        resolve({ state, payload });
    });
}


class InputModel extends Observer {
    constructor() {
        super();
    }

    dispatch({ state, payload }) {
        const { type } = payload;
        var task;

        switch (type) {
            case MESSAGE_TYPES.INPUT_TEXT:
                task = inputText;
                break;

            case MESSAGE_TYPES.INPUT_BLOG_INFO:
                task = inputBlogInfo;
                break;

            case MESSAGE_TYPES.INPUT_TITLE:
                task = inputTitle;
                break;

            case MESSAGE_TYPES.INPUT_PAPER_INFO:
                task = inputPaperInfo;
                break;

            case MESSAGE_TYPES.CLICK_TOOLS:
                task = switchTools;
                break;

            default:
                task = null;
                break;
        }

        super.dispatch({ state, payload }, task);
    }
}


let _inputModel = null;

export default () => {
    if (_inputModel !== null) return _inputModel;

    _inputModel = new InputModel();
    return _inputModel;
};