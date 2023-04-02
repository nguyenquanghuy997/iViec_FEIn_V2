import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'

import { apiSlice } from '@/redux/api/apiSlice'
import {organizationServiceApi} from "@/sections/organization/override/OverrideOrganizationSlice";
import {modalSlice} from "@/redux/common/modalSlice";
import {companyServiceApi} from '@/sections/companyinfor/companyInforSlice'
import {filterSlice} from "@/redux/common/filterSlice";
import {applicantFilterSlice} from "@/redux/slice/applicantFilterSlice";
import { pipelineFilterSlice } from './slice/pipelineFilterSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [organizationServiceApi.reducerPath]: organizationServiceApi.reducer,
    [companyServiceApi.reducerPath]: companyServiceApi.reducer,
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
    .concat(companyServiceApi.middleware),
})

const { dispatch } = store

const useSelector = useAppSelector

const useDispatch = () => useAppDispatch()

export { store, dispatch, useSelector, useDispatch }
