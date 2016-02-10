import _ from 'lodash';

class Observer {
    constructor() {
        this._subscribes = [];
    }

    dispatch({ state, payload }, task) {
        if (task === null)
            _.forEach(this._subscribes, (observer) => {
                observer.dispatch({ state, payload });
            });

        else
            task({state, payload}).then(({ state, payload }) => {
                _.forEach(this._subscribes, (observer) => {
                    observer.dispatch({state, payload});
                });
            }).catch((err) => {
                _.forEach(this._subscribes, (observer) => {
                    observer.error(err);
                });
            });
    }

    error() {}

    flowTo(observer) {
        if (!(observer instanceof Observer))
            throw new Error("Error in Observer.subscribe(...): subscriber must extend Observer.");

        this._subscribes.push(observer);
    }
}

export default Observer;