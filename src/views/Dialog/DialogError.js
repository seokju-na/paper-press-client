import { UI } from '../../utils/constants';

export default () => {
    return (
        <div className="dialog-deploy">
            <span className="dialog-deploy-header">ERROR</span>
            <div className="dialog-deploy-body">
                <div className="dialog-deploy-body-error">
                    [Error Caught] Something bad happen
                </div>
                <div className="dialog-deploy-body-message">
                    See guide(https://github.com/seokju-na/paper-press) for detail infos.
                </div>
            </div>
            <div className="dialog-deploy-footer">
                <button ui={ UI.BUTTON_DIALOG_DONE }
                        className="dialog-deploy-footer-done">DONE</button>
            </div>
        </div>
    );
};