import { configureStore } from '@reduxjs/toolkit';
import suggestionsReducer from './features/suggestions/suggestionSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    suggestions: suggestionsReducer,
    user: userReducer,
  },
});
