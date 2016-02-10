import _ from 'lodash';
import { UI } from '../../utils/constants';

function leadingZero(num) {
    var s = num + "";
    while (s.length < 2) s = "0" + s;
    return s;
}

export default ({ papers, selectPaperIndex }) => {
    let items = _.map(papers, (paper, index) => {
        let title = paper['title'];
        let _date = new Date(paper['date']);
        let date = _date.getFullYear() + '-' +
                leadingZero(_date.getMonth() + 1) + '-' +
                leadingZero(_date.getDate());

        let tags = _.map(paper['tags'], (tag) => (
            <span className="paperList-list-item-tags-tag">{ tag }</span>
        ));

        let selected = (index === selectPaperIndex) ? ' selected' : '';

        if (!tags) tags = <span></span>;


        return (
            <div className={ "paperList-list-item" + selected }
                 key={ index }>
                <span paperIndex={ index }
                      ui={ UI.PAPER_LIST_ITEM }
                      className="paperList-list-item-title">{ title }</span>
                <span className="paperList-list-item-date">{ date }</span>
                <div className="paperList-list-item-tags">
                    <i className="material-icons">&#xE54E;</i>
                    { tags }
                </div>
            </div>
        );
    });


    return (
        <div className="paperList">
            <div className="paperList-menu">
                <button className="material-icons paperList-menu-btn"
                        ui={ UI.BUTTON_NEW_PAPER }>
                    &#xE254;
                </button>
            </div>
            <div className="paperList-list">
                { items }
            </div>
        </div>
    );
}
