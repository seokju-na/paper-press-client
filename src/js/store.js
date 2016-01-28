import _ from 'lodash';

import Observer from '../utils/Observer';

let _blogInfo = null;
let _posts = null;
let _selectPost = null;
let _texts = null;

function initBlogInfo(payload, type) {
    var { blogInfo } = payload;

    return new Promise((resolve, reject) => {
        _blogInfo = _.clone(blogInfo);
        _posts = _blogInfo['posts'];
        delete _blogInfo['posts'];

        resolve({
            blogInfo: _blogInfo,
            posts: _posts,
            type: type
        });
    });
}

function selectPost(payload, type) {
    var { postId, texts } = payload;

    return new Promise((resolve, reject) => {
        _selectPost = postId;
        _texts = texts;

        resolve({
            selectPost: _selectPost,
            texts: _texts
        });
    });
}



class NoteStore extends Observer {
    constructor() {}

    dispatch(data) {
        var { type } = data;
        var task;

        switch (type) {
            case 'INIT':
                task = init;
                break;

            default:
                return;
        }

        super.dispatch(data, task);
    }
}

export default (new NoteStore());