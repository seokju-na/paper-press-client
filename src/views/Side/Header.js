export default (state) => {
    let eventLog = state.eventLog;

    return(
        <div className="header">
            <div className="header__left">
                <div className="header-logo">
                    <span>PAPER PRESS</span>
                </div>
                <span className="header-eventLog">{ eventLog }</span>
            </div>
        </div>
    );
};