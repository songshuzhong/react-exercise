import { combineReducers } from 'redux';

import user from './user';
import record from './record';
import report from './report';

export default combineReducers( { user, record, report } );