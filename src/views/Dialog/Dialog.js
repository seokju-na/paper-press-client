import DialogSaveBefore from './DialogSaveBefore';
import DialogDeploy from './DialogDeploy';
import DialogDeployStart from './DialogDeployStart';
import DialogDeployDone from './DialogDeployDone';
import DialogDeployDomainError from './DialogDeployDomainError';
import DialogDeploySurgeLoginError from './DialogDeploySurgeLoginError';
import DialogError from './DialogError';

import { DIALOG_TYPES } from '../../utils/constants';

export default (state) => {
    let content = <span></span>;

    switch(state.openDialog) {
        case DIALOG_TYPES.SAVE_INFO_BEFORE:
            content = DialogSaveBefore();
            break;

        case DIALOG_TYPES.DEPLOY:
            content = DialogDeploy(state);
            break;

        case DIALOG_TYPES.DEPLOY_START:
            content = DialogDeployStart(state);
            break;

        case DIALOG_TYPES.DEPLOY_DONE:
            content = DialogDeployDone(state);
            break;

        case DIALOG_TYPES.DEPLOY_ERROR_INVALID_DOMAIN:
            content = DialogDeployDomainError();
            break;

        case DIALOG_TYPES.DEPLOY_ERROR_SURGE_LOGIN:
            content = DialogDeploySurgeLoginError();
            break;

        case DIALOG_TYPES.ERROR:
            content = DialogError();
            break;
    }

    return (
        <div className="dialog">
            <div className="dialog-content">
                { content }
            </div>
            <div className="dialog-overlay"></div>
        </div>
    );
}