import keyMirror from 'keymirror';

export const MESSAGE_TYPES = keyMirror({
    INIT: null,
    START: null,
    SET_URL: null,
    SELECT_PAPER: null,
    INPUT_TITLE: null,
    INPUT_TEXT: null,
    INPUT_BLOG_INFO: null,
    INPUT_PAPER_INFO: null,
    CLICK_TOOLS: null,
    CLICK_NEW_PAPER: null,
    CLICK_DELETE: null,
    CLICK_SAVE: null,
    CLICK_UPDATE_BLOG_CONFIG: null,
    CLICK_DEPLOY: null,
    CLICK_DEPLOY_START: null,
    CLICK_DEPLOY_DONE: null,
    OPEN_DIALOG: null,
    CLOSE_DIALOG: null,
    QUIT: null
});

export const DIALOG_TYPES = keyMirror({
    ERROR: null,
    SAVE_INFO_BEFORE: null,
    DEPLOY: null,
    DEPLOY_START: null,
    DEPLOY_DONE: null,
    DEPLOY_ERROR_SURGE_LOGIN: null,
    DEPLOY_ERROR_INVALID_DOMAIN: null
});

export const UI = keyMirror({
    INPUT_TITLE: null,
    INPUT_TITLE_IMAGE: null,
    INPUT_SUMMARY: null,
    INPUT_TAGS: null,
    INPUT_BLOG_NAME: null,
    INPUT_BLOG_AUTHOR: null,
    INPUT_BLOG_EMAIL: null,
    INPUT_BLOG_FACEBOOK: null,
    INPUT_BLOG_TWITTER: null,
    INPUT_BLOG_GITHUB: null,
    INPUT_BLOG_DISQUS: null,
    INPUT_BLOG_TEMPLATE: null,
    INPUT_BLOG_DOMAIN: null,
    BUTTON_TOOLS: null,
    BUTTON_SAVE: null,
    BUTTON_DELETE: null,
    BUTTON_DEPLOY: null,
    BUTTON_NEW_PAPER: null,
    BUTTON_UPDATE_BLOG_INFO: null,
    BUTTON_DIALOG_DEPLOY_START: null,
    BUTTON_DIALOG_DEPLOY_DONE: null,
    BUTTON_DIALOG_DONE: null,
    PAPER_LIST_ITEM: null,
    EDITOR: null
});
