import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sortingOptions } from '../../data/selection';
import { convertRoadmapCount } from '../../utils/roadmapHelper';
import {
  getAllSuggestionsThunk,
  getSuggestionThunk,
  createSuggestionThunk,
  updateSuggestionThunk,
  deleteSuggestionThunk,
  upvoteSuggestionThunk,
  createCommentThunk,
  createReplyThunk,
  getRoadmapThunk,
} from './suggestionsThunk';

const initialState = {
  currentUser: {},
  suggestions: [],
  count: 0,
  numOfPages: 1,
  currentPage: 1,
  currentSuggestion: null,
  roadmapCount: { planned: 0, inProgress: 0, live: 0 },
  roadmap: {},
  categories: [],
  sortingOption: sortingOptions[0],
  isLoading: false,
  isMobileSidebarOpen: false,
  buttonDisabled: false,
};

//suggestions
export const getAllSuggestions = createAsyncThunk(
  'suggestions/getAllSuggestions',
  async (query, thunkAPI) => {
    return getAllSuggestionsThunk(
      `/suggestions${query.length > 0 ? '?' + query : ''}`,
      thunkAPI
    );
  }
);

export const getSuggestion = createAsyncThunk(
  'suggestions/getSuggestion',
  async (id, thunkAPI) => {
    return getSuggestionThunk(`/suggestions/${id}`, thunkAPI);
  }
);

export const createSuggestion = createAsyncThunk(
  'suggestions/createSuggestion',
  async (suggestion, thunkAPI) => {
    return createSuggestionThunk('/suggestions', suggestion, thunkAPI);
  }
);

export const updateSuggestion = createAsyncThunk(
  'suggestions/updateSuggestion',
  async (suggestion, thunkAPI) => {
    return updateSuggestionThunk(
      `/suggestions/${suggestion._id}`,
      suggestion,
      thunkAPI
    );
  }
);

export const deleteSuggestion = createAsyncThunk(
  'suggestions/deleteSuggestion',
  async (id, thunkAPI) => {
    return deleteSuggestionThunk(`/suggestions/${id}`, thunkAPI);
  }
);

export const upvoteSuggestion = createAsyncThunk(
  'suggestions/upvoteSuggestion',
  async (id, thunkAPI) => {
    return upvoteSuggestionThunk(`/suggestions/upvote/${id}`, thunkAPI);
  }
);

export const createComment = createAsyncThunk(
  'suggestions/createComment',
  async (obj, thunkAPI) => {
    return createCommentThunk(
      `/suggestions/comment/${obj.suggestionId}`,
      obj.comment,
      thunkAPI
    );
  }
);

//obj: {commentId:'', reply:{}}
export const createReply = createAsyncThunk(
  'suggestions/createReply',
  async (obj, thunkAPI) => {
    return createReplyThunk(
      `/suggestions/reply/${obj.commentId}`,
      obj.reply,
      thunkAPI
    );
  }
);

//roadmap
export const getFullRoadmap = createAsyncThunk(
  'suggestion/getFullRoadmap',
  async (thunkAPI) => {
    return getRoadmapThunk('/roadmap/full', thunkAPI);
  }
);

export const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setCurrentSuggestion: (state, action) => {
      return { ...state, currentSuggestion: action.payload };
    },
    toggleMobileSidebar: (state) => {
      return { ...state, isMobileSidebarOpen: !state.isMobileSidebarOpen };
    },
    closeMobileSidebar: (state) => {
      return { ...state, isMobileSidebarOpen: false };
    },
  },
  extraReducers: {
    [getAllSuggestions.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getAllSuggestions.fulfilled]: (state, { payload }) => {
      const { suggestions } = payload;
      state.isLoading = false;
      state.suggestions = suggestions;
      state.count = payload.count;
      state.numOfPages = payload.numOfPages;
      state.currentPage = payload.currentPage;
      state.categories = ['All', ...payload.categories];
      state.roadmapCount = convertRoadmapCount(payload.roadmap);
    },
    [getAllSuggestions.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getSuggestion.pending]: (state) => {
      state.isLoading = true;
      state.currentSuggestion = undefined;
    },
    [getSuggestion.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.currentSuggestion = payload.suggestion;
    },
    [getSuggestion.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [createSuggestion.pending]: (state) => {
      state.buttonDisabled = true;
    },
    [createSuggestion.fulfilled]: (state) => {
      state.buttonDisabled = false;
    },
    [createSuggestion.rejected]: (state) => {
      state.buttonDisabled = false;
    },
    [updateSuggestion.pending]: (state) => {
      state.buttonDisabled = true;
    },
    [updateSuggestion.fulfilled]: (state, { payload }) => {
      state.buttonDisabled = false;
      state.currentSuggestion = payload.suggestion;
    },
    [updateSuggestion.rejected]: (state) => {
      state.buttonDisabled = false;
    },
    [deleteSuggestion.rejected]: (state) => {
      state.buttonDisabled = false;
    },
    [deleteSuggestion.pending]: (state) => {
      state.buttonDisabled = true;
    },
    [deleteSuggestion.fulfilled]: (state, { payload }) => {
      state.buttonDisabled = false;
    },
    [upvoteSuggestion.pending]: (state) => {
      state.buttonDisabled = true;
    },
    [upvoteSuggestion.fulfilled]: (state, { payload }) => {
      state.buttonDisabled = false;
      let temp = state.suggestions;
      //replace the updated suggestion in the suggestions array
      temp = temp.map((suggestion) => {
        if (suggestion._id === payload.suggestion._id) {
          suggestion = { ...payload.suggestion };
        }
        return suggestion;
      });
      state.suggestions = temp;
      state.currentSuggestion = payload.suggestion;
    },
    [upvoteSuggestion.rejected]: (state) => {
      state.buttonDisabled = false;
    },
    [createComment.rejected]: (state) => {
      state.buttonDisabled = false;
    },
    [createComment.pending]: (state) => {
      state.buttonDisabled = true;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.buttonDisabled = false;
      state.currentSuggestion = payload.suggestion;
    },
    [createReply.rejected]: (state) => {
      state.buttonDisabled = false;
    },
    [createReply.pending]: (state) => {
      state.buttonDisabled = true;
    },
    [createReply.fulfilled]: (state, { payload }) => {
      state.buttonDisabled = false;
      state.currentSuggestion = payload.suggestion;
    },
    [getFullRoadmap.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getFullRoadmap.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.roadmap = payload.roadmap;
    },
    [getFullRoadmap.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

export const { setCurrentSuggestion, toggleMobileSidebar, closeMobileSidebar } =
  suggestionSlice.actions;
export default suggestionSlice.reducer;
