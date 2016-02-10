import { UI } from "../../utils/constants";
import _ from 'lodash';

export default (state) => {
    const paper = state.papers[state.selectPaperIndex];
    
    let tags = <span></span>;
    if (!_.isEmpty(paper['tags']))
        tags = _.map(paper['tags'], (tag) => {
            return <span className="tools-body-tags-tag">{ tag }</span>;
        });
    
    let hide = (!state.tools) ? " hide" : "";
    let icon = (!state.tools) ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

    return (
        <div className="tools">
            <div className="tools-top">
                <button ui={ UI.BUTTON_TOOLS }
                        className="material-icons tools-top-switch">{ icon }</button>
            </div>
            <div className={ "tools-body" + hide }>
                <div className="tools-body-item">
                    <span className="tools-body-item-label __url">Title Image</span>
                    <input id={ UI.INPUT_TITLE_IMAGE }
                           className="tools-body-item__input" />
                </div>
                <div className="tools-body-item">
                    <span className="tools-body-item-label __summary">Summary</span>
                    <textarea id={ UI.INPUT_SUMMARY }
                              className="tools-body-item__textarea"
                              rows="3"></textarea>
                </div>
                <div className="tools-body-item">
                    <span className="tools-body-item-label">Tags</span>
                    <input id={ UI.INPUT_TAGS }
                           className="tools-body-item__input" />
                </div>
                <div className="tools-body-tags">
                    <i className="material-icons">&#xE54E;</i>
                    { tags }
                </div>
            </div>
        </div>
    );
};