import request from 'superagent';

const APIRoot = '/api';

export default {
    getBlogInfo: function () {
        return new Promise((resolve, reject) => {
            request
                .get(APIRoot + '/getBlogInfo')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) reject(err);
                    else resolve(JSON.parse(res.body.blogInfo));
                });
        });
    },

    getPaperDataById: function (paperId) {
        return new Promise((resolve, reject) => {
            request
                .get(APIRoot + '/getPaperDataById')
                .query({paperId: paperId})
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) reject(err);
                    else resolve(res.body.paperData);
                });
        });
    },

    removePaper: function (paperId) {
        return new Promise((resolve, reject) => {
            request
                .post(APIRoot + '/removePaper')
                .send({
                    paperId: paperId
                })
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    postPaper: function (paperId, paper) {
        return new Promise((resolve, reject) => {
            request
                .post(APIRoot + '/postPaper')
                .send({
                    paperId: paperId,
                    paper: paper
                })
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) reject(err);
                    else {
                        if (res.body) resolve(res.body.paperId);
                        else resolve();
                    }
                });
        });
    },

    postBlogInfo: function (blogInfo) {
        return new Promise((resolve, reject) => {
            request
                .post(APIRoot + '/postBlogInfo')
                .send({
                    blogInfo: blogInfo
                })
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    postDeployMessage: function () {
        return new Promise((resolve, reject) => {
            request
                .post(APIRoot + '/postDeployMessage')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    }
};