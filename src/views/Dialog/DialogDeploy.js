import { UI } from '../../utils/constants';

export default ({ blogConfig }) => {
    const blogDomain = 'http://' + blogConfig['domain'];

    return (
        <div className="dialog-deploy">
            <span className="dialog-deploy-header">DEPLOY</span>
            <div className="dialog-deploy-body">
                <div className="dialog-deploy-body-message">
                    Your blog is now deploying to <a>{ blogDomain }</a><br />
                    Press start button to continue deploy
                </div>
            </div>
            <div className="dialog-deploy-footer">
                <button ui={ UI.BUTTON_DIALOG_DEPLOY_START }
                        className="dialog-deploy-footer-done">START</button>
            </div>
        </div>
    );  
};