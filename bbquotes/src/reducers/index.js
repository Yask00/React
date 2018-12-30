// combine all our reducers
import { combineReducers } from 'redux';
import reducer from './reducers';

export default combineReducers({
    reducer: reducer
})