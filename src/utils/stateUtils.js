import _ from 'lodash';

function _removeEmptyTag(tags) {
    return _.filter(tags, (tag) => (!_.isEmpty(tag)));
}

export const getBlogInfoFromUI = (BlogInfoUI) => {
    let blogConfigObj = {};

    for (let prop in BlogInfoUI)
        blogConfigObj[prop] = BlogInfoUI[prop].value;

    return blogConfigObj;
};

export const getPaperInfoFromUI = (ToolsUI) => {
    let paperInfoObj = {};

    paperInfoObj['titleImage'] = ToolsUI['titleImage'].value;
    paperInfoObj['summary'] = ToolsUI['summary'].value;
    paperInfoObj['tags'] = _removeEmptyTag(ToolsUI['tags'].value.split(','));

    return paperInfoObj;
};

export const makeDefaultPaper = (state) => {
    let _state = _.clone(state);

    _state.papers.unshift({
        title: "(Untitled)",
        date: new Date(),
        tags: ['NotTagged'],
        summary: '',
        titleImage: '',
        paperId: null
    });
    _state.texts = "Insert text!";
    _state.paperChangePoint = true;
    _state.selectPaperIndex = 0;

    return _state;
};

export const openDialog = (state, dialogType) => {
    let _state = _.clone(state);

    _state.openDialog = dialogType;
    _state.eventLog = '';

    return _state;
};


export const sortPapers = (papers) => {
    return _.sortBy(papers, (paper) => {
        let date = new Date(paper['date']);
        return Number("-" + date.getTime());
    });
};