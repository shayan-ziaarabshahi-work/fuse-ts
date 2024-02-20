import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStore } from "src/app/store";
import qs from "qs";
import { asyncThunkRejection /* , formatTimeForServer */ } from "src/app/utils";

const _ROWS_PER_PAGE = 10;

interface GetFormsParams {
  page?: number;
}

export const getForms = createAsyncThunk<any, GetFormsParams>(
  "getForms/get",
  async (params, { rejectWithValue, signal }) => {
    try {
      const { data } = await axios.get("Forms/GetPagedFilter", {
        params: {
          NeedTotalCount: true,
          PageNumber: params.page || 1,
          PageSize: _ROWS_PER_PAGE,
        },
        signal,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

      return { data, page: params.page };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface FormQueryResultInterface {
  formKey: string;
  title: string;
  description: string;
  status: 0 | 10 | 20 | 30 | 40 | 50;
  createdDateTime: string;
  modifiedDateTime?: string;
  hasBody: boolean;
}

interface InitialStateInterface {
  isLoading: boolean;
  error: Error | null;
  data: {
    queryResult: FormQueryResultInterface[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
  } | null;
  pagination: {
    page: number;
    count: number;
  };
}

const initialState: InitialStateInterface = {
  isLoading: true,
  data: null,
  error: null,
  pagination: {
    page: 1,
    count: 0,
  },
};

const formSlice = createSlice({
  name: "getForms",
  initialState,
  reducers: {
    redrawError: (state) => {
      state.error = null;
    },
    changePage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getForms.pending, (state) => ({
      ...state,
      data: null,
      error: null,
      isLoading: true,
    }));

    builder.addCase(getForms.fulfilled, (state, { payload }) => ({
      ...state,
      data: payload.data,
      pagination: {
        page: payload.page,
        count: Math.ceil(payload.data.totalCount / _ROWS_PER_PAGE),
      },
      error: null,
      isLoading: false,
    }));

    builder.addCase(getForms.rejected, (state, { meta }) => ({
      ...state,
      data: state.data,
      error: asyncThunkRejection(meta),
      isLoading: false,
    }));
  },
});

export const { changePage, redrawError } = formSlice.actions;

export const selectForms = ({ getForms }: RootStore) => getForms;

export default formSlice.reducer;
