import _ from 'lodash';

import Observer from '../utils/observer';
import { sortPapers, makeDefaultPaper, openDialog } from '../utils/stateUtils';
import ErrorCodes from '../../../utils/errorCodes';
import { MESSAGE_TYPES, DIALOG_TYPES } from '../utils/constants';

import API from '../utils/api';


function initBlogInfo({state, payload}) {
    return new Promise((resolve, reject) => {
        API.getBlogInfo()
            .then((blogConfig) => {
                var papers = blogConfig['papers'];
                delete blogConfig['papers'];

                state.blogConfig = blogConfig;
                state.papers = _.map(papers, (paper, key) => {
                    return _.assign(paper, { paperId: key });
                });
                state.papers = sortPapers(state.papers);
            })
            .catch(() => {
                state = openDialog(state, DIALOG_TYPES.ERROR);
                resolve({ state, payload });
            })
            .then(() => {
                state.init = true;
                state.eventLog = 'Init';

                if (_.isEmpty(state.papers)) {
                    state = makeDefaultPaper(state);
                    resolve({ state, payload });
                }
                else {
                    state.paperChangePoint = false;
                    state.selectPaperIndex = 0;

                    API.getPaperDataById(state.papers[0].paperId)
                        .then((paperData) => {
                            state.texts = paperData;
                            resolve({ state, payload});
                        })
                        .catch(() => {
                            state = openDialog(state, DIALOG_TYPES.ERROR);
                            resolve({ state, payload });
                        });
                }
            });

    });
}

function selectPaper({ state, payload }) {
    return new Promise((resolve, reject) => {
        if (state.paperChangePoint) {
            state = openDialog(state, DIALOG_TYPES.SAVE_INFO_BEFORE);
            resolve({ state, payload });
        }
        else {
            state.selectPaperIndex = payload.data;
            var paperId = state.papers[state.selectPaperIndex]['paperId'];

            API.getPaperDataById(paperId)
                .then((paperData) => {
                    state.eventLog = "Loaded";
                    state.texts = paperData;
                    resolve({state, payload});
                })
                .catch(() => {
                    state = openDialog(state, DIALOG_TYPES.ERROR);
                    resolve({ state, payload });
                });
        }
    });
}

function newPaper({ state, payload }) {
    return new Promise((resolve, reject) => {
        if (state.paperChangePoint) {
            state = openDialog(state, DIALOG_TYPES.SAVE_INFO_BEFORE);
            resolve({ state, payload });
        }
        else {
            state = makeDefaultPaper(state);
            resolve({state, payload});
        }
    });
}

function removePaper({ state, payload }) {
    return new Promise((resolve, reject) => {
        var paperId = state.papers[state.selectPaperIndex]['paperId'];

        state.eventLog = "Deleted";
        state.papers = _.filter(state.papers, (paper, index) => {
            return !(index === state.selectPaperIndex);
        });

        var loadPaper = function(state) {
            if (_.isEmpty(state.papers)) {
                state = makeDefaultPaper(state);
                resolve({ state, payload });
            }
            else {
                state.selectPaperIndex = 0;

                API.getPaperDataById(state.papers[0].paperId)
                    .then((paperData) => {
                        state.texts = paperData;
                        resolve({ state, payload});
                    })
                    .catch(() => {
                        state = openDialog(state, DIALOG_TYPES.ERROR);
                        resolve({ state, payload });
                    });
            }
        };

        if (paperId !== null)
            API.removePaper(paperId)
                .then(() => { loadPaper(state); })
                .catch(() => {
                    state = openDialog(state, DIALOG_TYPES.ERROR);
                    resolve({ state, payload });
                });
        else loadPaper(state);
    });
}

function savePaper({ state, payload }) {
    return new Promise((resolve, reject) => {
        var paperId = state.papers[state.selectPaperIndex]['paperId'];
        var paperToSave = _.assign(state.papers[state.selectPaperIndex], {
            texts: state.texts
        });

        API.postPaper(paperId, paperToSave)
            .then((newPaperId) => {
                if (newPaperId)
                    state.papers[state.selectPaperIndex]['paperId'] = newPaperId;

                state.eventLog = "Saved";
                state.paperChangePoint = false;

                resolve({state, payload});
            })
            .catch(() => {
                state = openDialog(state, DIALOG_TYPES.ERROR);
                resolve({ state, payload });
            });
    });
}

function updateBlogInfo({ state, payload }) {
    return new Promise((resolve, reject ) => {
        API.postBlogInfo(state.blogConfig)
            .then(() => {
                state.eventLog = "Updated";
                state.blogConfigChangePoint = false;

                resolve({ state, payload });
            })
            .catch(() => {
                state = openDialog(state, DIALOG_TYPES.ERROR);
                resolve({ state, payload });
            });
    });
}

function deployBlog({ state, payload }) {
    return new Promise((resolve, reject) => {
        API.postDeployMessage()
            .then(() => {
                state.eventLog = "Deployed";
                state.openDialog = DIALOG_TYPES.DEPLOY_DONE;

                resolve({state, payload});
            })
            .catch((err) => {
                switch(err) {
                    case ErrorCodes.SURGE_DEPLOY:
                        state = openDialog(state, DIALOG_TYPES.DEPLOY_ERROR_INVALID_DOMAIN);
                        break;

                    case ErrorCodes.SURGE_LOGIN:
                        state = openDialog(state, DIALOG_TYPES.DEPLOY_ERROR_SURGE_LOGIN);
                        break;

                    default:
                        state = openDialog(state, DIALOG_TYPES.ERROR);
                        break;
                }
                resolve({ state, payload });
            });
    });
}




class CoreModel extends Observer {
    constructor() {
        super();
    }

    dispatch({ state, payload }) {
        const { type } = payload;
        var task;

        switch (type) {
            case MESSAGE_TYPES.START:
                task = initBlogInfo;
                break;

            case MESSAGE_TYPES.SELECT_PAPER:
                task = selectPaper;
                break;

            case MESSAGE_TYPES.CLICK_NEW_PAPER:
                task = newPaper;
                break;

            case MESSAGE_TYPES.CLICK_SAVE:
                task = savePaper;
                break;

            case MESSAGE_TYPES.CLICK_DELETE:
                task = removePaper;
                break;

            case MESSAGE_TYPES.CLICK_UPDATE_BLOG_CONFIG:
                task = updateBlogInfo;
                break;

            case MESSAGE_TYPES.CLICK_DEPLOY_DONE:
                task = deployBlog;
                break;

            default:
                task = null;
                break;
        }

        super.dispatch({ state, payload }, task);
    }
}



let _coreModel = null;

export default () => {
    if (_coreModel !== null) return _coreModel;

    _coreModel = new CoreModel();
    return _coreModel;
};
