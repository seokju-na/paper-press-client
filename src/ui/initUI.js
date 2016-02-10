import worker from './workerManager';
import { MESSAGE_TYPES, UI } from '../utils/constants';
import { getBlogInfoFromUI, getPaperInfoFromUI } from '../utils/stateUtils';

import _ from 'lodash';
import CodeMirror from 'codemirror';

let EditorUI = null;
let TitleUI = null;
let BlogInfoUI = null;
let ToolsUI = null;


export const initEventListener = () => {
    document.body.addEventListener('keyup', (event) => {
        const targetUI = event.target.id;

        var data = null;
        var type = null;

        if (_.isUndefined(targetUI) ||
            _.isNull(targetUI)) return;

        switch(targetUI) {
            case UI.INPUT_TITLE:
                data = TitleUI.value;
                type = MESSAGE_TYPES.INPUT_TITLE;
                break;

            case UI.INPUT_BLOG_NAME:
            case UI.INPUT_BLOG_AUTHOR:
            case UI.INPUT_BLOG_EMAIL:
            case UI.INPUT_BLOG_FACEBOOK:
            case UI.INPUT_BLOG_TWITTER:
            case UI.INPUT_BLOG_GITHUB:
            case UI.INPUT_BLOG_DISQUS:
            case UI.INPUT_BLOG_TEMPLATE:
            case UI.INPUT_BLOG_DOMAIN:
                data = getBlogInfoFromUI(BlogInfoUI);
                type = MESSAGE_TYPES.INPUT_BLOG_INFO;
                break;

            case UI.INPUT_TITLE_IMAGE:
            case UI.INPUT_SUMMARY:
            case UI.INPUT_TAGS:
                data = getPaperInfoFromUI(ToolsUI);
                type = MESSAGE_TYPES.INPUT_PAPER_INFO;
                break;

            default:
                return;
        }

        worker.postMessage({
            payload: {
                data: data,
                type: type
            }
        });
    });

    document.body.addEventListener('click', (event) => {
        const targetUI = event.target['ui'];

        var data = null;
        var type = null;

        if (_.isUndefined(targetUI) ||
            _.isNull(targetUI)) return;

        switch(targetUI) {
            case UI.PAPER_LIST_ITEM:
                data = event.target['paperIndex'];
                type = MESSAGE_TYPES.SELECT_PAPER;
                break;

            case UI.BUTTON_NEW_PAPER:
                type = MESSAGE_TYPES.CLICK_NEW_PAPER;
                break;

            case UI.BUTTON_TOOLS:
                type = MESSAGE_TYPES.CLICK_TOOLS;
                break;

            case UI.BUTTON_UPDATE_BLOG_INFO:
                type = MESSAGE_TYPES.CLICK_UPDATE_BLOG_CONFIG;
                break;

            case UI.BUTTON_SAVE:
                type = MESSAGE_TYPES.CLICK_SAVE;
                break;

            case UI.BUTTON_DELETE:
                type = MESSAGE_TYPES.CLICK_DELETE;
                break;

            case UI.BUTTON_DEPLOY:
                type = MESSAGE_TYPES.CLICK_DEPLOY;
                break;

            case UI.BUTTON_DIALOG_DEPLOY_START:
                type = MESSAGE_TYPES.CLICK_DEPLOY_START;
                break;

            case UI.BUTTON_DIALOG_DONE:
                type = MESSAGE_TYPES.CLOSE_DIALOG;
                break;

            default:
                return;
        }

        worker.postMessage({
            payload: {
                data: data,
                type: type
            }
        });
    });
};



export const initEditor = ({ texts }) => {
    if (EditorUI !== null) EditorUI.toTextArea();

    EditorUI = CodeMirror.fromTextArea(
        document.getElementById(UI.EDITOR),
        {
            lineNumbers: false,
            lineWrapping: true,
            indentUnit: 10,
            mode: 'markdown'
        });

    EditorUI.setValue(texts);

    EditorUI.on('change', (doc, change) => {
        worker.postMessage({
            payload: {
                data: doc.getValue(),
                type: MESSAGE_TYPES.INPUT_TEXT
            }
        });
    });
};



export const initInputs = ({ blogConfig, papers, selectPaperIndex }) => {
    const selectPaper = papers[selectPaperIndex];

    if (_.isNull(BlogInfoUI) &&
        _.isNull(ToolsUI) &&
        _.isNull(TitleUI)) {

        TitleUI = document.getElementById(UI.INPUT_TITLE);

        BlogInfoUI = {
            name: document.getElementById(UI.INPUT_BLOG_NAME),
            author: document.getElementById(UI.INPUT_BLOG_AUTHOR),
            email: document.getElementById(UI.INPUT_BLOG_EMAIL),
            facebook: document.getElementById(UI.INPUT_BLOG_FACEBOOK),
            twitter: document.getElementById(UI.INPUT_BLOG_TWITTER),
            github: document.getElementById(UI.INPUT_BLOG_GITHUB),
            disqus: document.getElementById(UI.INPUT_BLOG_DISQUS),
            template: document.getElementById(UI.INPUT_BLOG_TEMPLATE),
            domain: document.getElementById(UI.INPUT_BLOG_DOMAIN)
        };

        ToolsUI = {
            titleImage: document.getElementById(UI.INPUT_TITLE_IMAGE),
            summary: document.getElementById(UI.INPUT_SUMMARY),
            tags: document.getElementById(UI.INPUT_TAGS)
        };
    }

    TitleUI.value = selectPaper['title'];

    _.forEach(BlogInfoUI, (elem, prop) => {
         elem.value = blogConfig[prop];
    });

    ToolsUI.titleImage.value = selectPaper['titleImage'];
    ToolsUI.summary.value = selectPaper['summary'];
    ToolsUI.tags.value = (function(tags) {
        var str = '';
        for (let idx=0; idx<tags.length; idx++) {
            str += tags[idx];
            str += ',';
        }
        return str;
    })(selectPaper['tags']);
};