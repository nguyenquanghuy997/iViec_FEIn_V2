import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'

import { apiSlice } from '@/redux/api/apiSlice'
import {organizationServiceApi} from "@/sections/organization/override/OverrideOrganizationSlice";
import {modalSlice} from "@/redux/common/modalSlice";
import {companyServiceApi} from '@/sections/companyinfor/companyInforSlice'
import {calendarServiceApi} from '@/sections/interview/InterviewSlice'
import {filterSlice} from "@/redux/common/filterSlice";
import {applicantFilterSlice} from "@/redux/slice/applicantFilterSlice";
import { pipelineFilterSlice } from './slice/pipelineFilterSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [organizationServiceApi.reducerPath]: organizationServiceApi.reducer,
    [companyServiceApi.reducerPath]: companyServiceApi.reducer,
    [calendarServiceApi.reducerPath]:calendarServiceApi.reducer,
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(apiSlice.middleware)
    .concat(organizationServiceApi.middleware)
    .concat(companyServiceApi.middleware)
    .concat(calendarServiceApi.middleware),
})

const { dispatch } = store

const useSelector = useAppSelector

const useDispatch = () => useAppDispatch()

export { store, dispatch, useSelector, useDispatch }
