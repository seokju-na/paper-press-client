export default ({ blogConfig }) => {
    const blogDomain = 'http://' + blogConfig['domain'];

    return (
        <div className="dialog-deploy">
            <span className="dialog-deploy-header">DEPLOY</span>
            <div className="dialog-deploy-body">
                <div className="dialog-deploy-body-message">
                    Your blog is now deploying to <a>{ blogDomain }</a>.
                </div>
            </div>
            <div className="dialog-deploy-footer">
                <button className="dialog-deploy-footer-loading">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </button>
            </div>
        </div>
    );
};