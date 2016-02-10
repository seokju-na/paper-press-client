import _ from 'lodash';
import { UI } from '../../utils/constants';
import Tools from './Tools';

import Remarkable from 'remarkable';
import hljs from 'highlight.js';
const md = new Remarkable({
    html: true,
    xhtmlOut: false,
    breaks: true,
    linkify: false,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (err) {}
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (err) {}

        return '';
    }
});

export default (state) => {
    const texts = state.texts;
    const selectPaper = state.papers[state.selectPaperIndex];
    const title = selectPaper['title'];
    const date = ((date) => {
        let _date = new Date(date);
        return "- " + _date.getFullYear() + "년 " +
            (_date.getMonth() + 1) + "월 " +
            (_date.getDate()) + "일";
    })(selectPaper['date']);

    let summary = <span></span>;
    let titleImage = <span></span>;

    if (!_.isEmpty(selectPaper['summary']))
        summary = <span className="editor-preview-summary">
            <i className="material-icons rotate">&#xE244;</i>
            { selectPaper['summary'] }
            <i className="material-icons">&#xE244;</i>
        </span>;

    if (!_.isEmpty(selectPaper['titleImage']))
        titleImage = <img className="editor-preview-titleImage" src={ selectPaper['titleImage'] } />;

    return (
        <div className="editor">
            <div className="editor-textarea">
                { Tools(state) }
                <textarea id={ UI.EDITOR }>{ texts }</textarea>
            </div>

            <div className="editor-preview">
                <span className="editor-preview-title">{ title }</span>
                <span className="editor-preview-date">{ date }</span>
                { titleImage }
                { summary }
                <div className="editor-preview-inner"
                     innerHTML={ md.render(texts) }>
                </div>
            </div>
        </div>
    );
};