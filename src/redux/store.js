import { masterDataSlice } from "./api/masterDataSlice";
import { pipelineFilterSlice } from "./slice/pipelineFilterSlice";
import { apiSlice } from "@/redux/api/apiSlice";
import { filterSlice } from "@/redux/common/filterSlice";
import { modalSlice } from "@/redux/common/modalSlice";
import { applicantFilterSlice } from "@/redux/slice/applicantFilterSlice";
import { companyServiceApi } from "@/sections/companyinfor/companyInforSlice";
import { calendarServiceApi } from "@/sections/interview/InterviewSlice";
import { organizationServiceApi } from "@/sections/organization/override/OverrideOrganizationSlice";
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [organizationServiceApi.reducerPath]: organizationServiceApi.reducer,
    [companyServiceApi.reducerPath]: companyServiceApi.reducer,
    [calendarServiceApi.reducerPath]: calendarServiceApi.reducer,
    // avatar: uploadAvatarReducer,
    // kanban: kanbanReducer,
    // client: clientReducer,
    // salary: salaryReducer,
    // candidates: candidateReducer,
    // jobs: jobDetailReducer,
    // applicant: jobDetailReducer,
    modalReducer: modalSlice.reducer,
    filterReducer: filterSlice.reducer,
    applicantFilterReducer: applicantFilterSlice.reducer,
    pipelineFilterReducer: pipelineFilterSlice.reducer,

    [masterDataSlice.reducerPath]: masterDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(organizationServiceApi.middleware)
      .concat(companyServiceApi.middleware)
      .concat(calendarServiceApi.middleware)
      .concat(masterDataSlice.middleware),
});

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };
