import _ from 'lodash';

import Loader from './Loader/Loader';

import Header from './Side/Header';
import BlogInfo from './Side/BlogInfo';
import PaperList from './Side/PaperList';

import Title from './Main/Title';
import Editor from './Main/Editor';

import Dialog from './Dialog/Dialog';


export default (state) => {

    if (!state.init)
        return(
            <div id="app">
                { Loader() }
            </div>
        );
    else {
        let dialog = <span></span>;

        if (!_.isNull(state.openDialog))
            dialog = Dialog(state);

        return (
            <div id="app">
                { dialog }
                <div className="side">
                    { Header(state) }
                    { BlogInfo(state) }
                    { PaperList(state) }
                </div>
                <div className="main">
                    { Title(state) }
                    { Editor(state) }
                </div>
            </div>
        );
    }
};