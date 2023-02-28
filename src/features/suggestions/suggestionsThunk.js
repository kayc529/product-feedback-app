import customFetch from '../../utils/customFetch';

export const getAllSuggestionsThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getSuggestionThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const createSuggestionThunk = async (url, suggestion, thunkAPI) => {
  try {
    const res = await customFetch.post(url, suggestion);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateSuggestionThunk = async (url, suggestion, thunkAPI) => {
  try {
    const res = await customFetch.patch(url, suggestion);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteSuggestionThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.delete(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const upvoteSuggestionThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.patch(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const createCommentThunk = async (url, comment, thunkAPI) => {
  try {
    console.log('url:', url);
    console.log('comment:', comment);
    const res = await customFetch.patch(url, comment);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const createReplyThunk = async (url, obj, thunkAPI) => {
  try {
    const res = await customFetch.patch(url, obj);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getRoadmapThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
