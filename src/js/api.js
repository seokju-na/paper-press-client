import request from 'superagent';

const APIRoot = '/api';

export default {
    getBlogInfo: function() {
        return new Promise((resolve, reject) => {
            request
                .get(APIRoot + '/getBlogInfo')
                .set('Accept', 'application/json')
                .end((err,res) => {
                    if (err) reject(err);
                    else resolve(JSON.parse(res.body.blogInfo));
                });
        });
    },

    getPostTextsById: function(postId) {
        return new Promise((resolve, reject) => {
            request
                .get(APIRoot + '/getPostTextsById')
                .query({ postId: postId })
                .set('Accept', 'application/json')
                .end((err,res) => {
                    if (err) reject(err);
                    else resolve(JSON.parse(res.body.postTexts));
                });
        });
    },

    sendPost: function(postId, post) {
        return new Promise((resolve, reject) => {
            request
                .post(APIRoot + '/sendPost')
                .send({
                    postId: postId,
                    post: post
                })
                .set('Content-Type', 'application/json')
                .end((err,res) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    sendDeployMessage: function() {
        return new Promise((resolve, reject) => {
            request
                .post(APIRoot + '/sendDeployMessage')
                .set('Content-Type', 'application/json')
                .end((err,res) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    }
};