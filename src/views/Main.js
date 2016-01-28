import Loader from './Loader/Loader';

export default (state) => {
    return (
        <div id="app">
            { Loader() }
        </div>
    );
};