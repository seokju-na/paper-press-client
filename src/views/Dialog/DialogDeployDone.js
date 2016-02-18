import { UI } from '../../utils/constants';

export default ({ blogConfig }) => {
    const blogDomain = 'http://' + blogConfig['domain'];

    return (
        <div className="dialog-deploy">
            <span className="dialog-deploy-header">DEPLOY</span>
            <div className="dialog-deploy-body">
                <div className="dialog-deploy-body-spinner">
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                </div>
                <div className="dialog-deploy-body-message">
                    Your blog is now running on <a className="isValid" target="_blank" href={ blogDomain }>{ blogDomain }</a>
                </div>
            </div>
            <div className="dialog-deploy-footer">
                <button ui={ UI.BUTTON_DIALOG_DONE }
                        className="dialog-deploy-footer-done">DONE</button>
            </div>
        </div>
    );
};
