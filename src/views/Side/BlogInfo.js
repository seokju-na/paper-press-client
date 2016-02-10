import { UI } from '../../utils/constants';

export default (state) => {
    let isNotChange = (!state.blogConfigChangePoint) ? ' displayNone' : '';
    
    return (
        <div className="blogInfo">
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">NAME</span>
                <input id={ UI.INPUT_BLOG_NAME }
                       className="blogInfo-item-input" type="text" />
            </div>
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">AUTHOR</span>
                <input id={ UI.INPUT_BLOG_AUTHOR }
                       className="blogInfo-item-input" type="text" />
            </div>
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">EMAIL</span>
                <input id={ UI.INPUT_BLOG_EMAIL }
                       className="blogInfo-item-input" type="text" />
            </div>
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">FACEBOOK</span>
                <input id={ UI.INPUT_BLOG_FACEBOOK }
                       className="blogInfo-item-input" type="text" />
            </div>
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">TWITTER</span>
                <input id={ UI.INPUT_BLOG_TWITTER }
                       className="blogInfo-item-input" type="text" />
            </div>
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">GITHUB</span>
                <input id={ UI.INPUT_BLOG_GITHUB }
                       className="blogInfo-item-input" type="text" />
            </div>
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">DISQUS</span>
                <input id={ UI.INPUT_BLOG_DISQUS }
                       className="blogInfo-item-input" type="text" />
            </div>
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">TEMPLATE</span>
                <input id={ UI.INPUT_BLOG_TEMPLATE }
                       className="blogInfo-item-input" type="text" />
            </div>
            <div className="blogInfo-item">
                <span className="blogInfo-item-label">DOMAIN</span>
                <input id={ UI.INPUT_BLOG_DOMAIN }
                       className="blogInfo-item-input" type="text" />
            </div>
            <button ui={ UI.BUTTON_UPDATE_BLOG_INFO }
                    className={ "blogInfo-updateBtn" + isNotChange }>UPDATE</button>
        </div>
    );
}