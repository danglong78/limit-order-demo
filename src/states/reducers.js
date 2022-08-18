import { combineReducers } from 'redux';
import { loadingReducer } from './loading/loading.reducer';
import { modalReducer } from './modal/modal.reducer';
import { themeReducer } from './theme/theme.reducer';

export const rootReducers = combineReducers({
  loading: loadingReducer,
  modal: modalReducer,
  theme: themeReducer,
});
