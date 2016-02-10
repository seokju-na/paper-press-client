import { UI } from '../../utils/constants';

export default () => {
    return (
        <div className="title">
            <div className="title-box">
                <span className="title-box-label">TITLE</span>
                <input id={ UI.INPUT_TITLE }
                       className="title-box-input"
                       type="text" />
            </div>
            <div className="title-menu">
                <button ui={ UI.BUTTON_SAVE }
                        className="material-icons title-menu-item __save">
                    &#xE161;
                </button>
                <button ui={ UI.BUTTON_DELETE }
                        className="material-icons title-menu-item __delete">
                    &#xE872;
                </button>
                <button ui={ UI.BUTTON_DEPLOY }
                        className="title-menu-item __deploy">
                    DEPLOY
                </button>
            </div>
        </div>
    );
};