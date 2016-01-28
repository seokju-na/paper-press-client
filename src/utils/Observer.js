import _ from 'lodash';

class Observer {
    constructor() {
        this._subscribes = [];
    }

    dispatch(data, task) {
        if (!data.hasOwnProperty('payload'))
            throw new Error("Error in Observer.dispatch(...): no payload data.");

        if (!data.hasOwnProperty('type'))
            throw new Error("Error in Observer.dispatch(...): no type data.");

        task(data.payload, data.type).then((res) => {
            _.forEach(this._subscribes, (callback) => {
                callback(res);
            });
        }).catch((err) => {
            _.forEach(this._subscribes, (callback) => {
                callback(err);
            });
        });
    }

    subscribe(callback) {
        if (!_.isFunction(callback))
            throw new Error("Error in Observer.subscribe(...): callback must be function.");

        this._subscribes.push(callback);
    }
}

export default Observer;