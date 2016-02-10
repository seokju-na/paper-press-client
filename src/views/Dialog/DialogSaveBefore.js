import { UI } from '../../utils/constants';

export default () => {
    return (
        <div className="dialog-saveFirst">
            <span className="dialog-saveFirst-header">SAVE FIRST</span>
            <div className="dialog-saveFirst-body">
                <div className="dialog-saveFirst-body-icon">
                    <i className="material-icons">&#xE8B2;</i>
                </div>
                <div className="dialog-saveFirst-body-message">
                    Save paper and blog info first.
                </div>
            </div>
            <div className="dialog-saveFirst-footer">
                <button ui={ UI.BUTTON_DIALOG_DONE }
                        className="dialog-saveFirst-footer-ok">OK</button>
            </div>
        </div>
    );
};
