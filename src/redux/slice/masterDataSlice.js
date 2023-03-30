import {apiSlice} from '@/redux/api/apiSlice'
import {API_GET_LIST_CANDIDATELEVEL, API_GET_LIST_LANGUAGE} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ['MasterData'],
})

export const masterDataSlice = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getListLanguages: builder.query({
            query: (params) => {
                const defaultParams = { PageSize: 20 }
                return {
                    url: API_GET_LIST_LANGUAGE,
                    method: "GET",
                    params: {...defaultParams, ...params}
                }
            },
            // transformResponse: (response) => {
            //     return response?.items.map(item => ({
            //         value: item.id,
            //         label: item.name,
            //     }))
            // },
        }),
        getListCandidateLevels: builder.query({
            query: (params) => {
                const defaultParams = { PageSize: 20 }
                return {
                    url: API_GET_LIST_CANDIDATELEVEL,
                    method: "GET",
                    params: {...defaultParams, ...params}
                }
            },
            transformResponse: (response) => {
                return response?.items.map(item => ({
                    value: item.id,
                    label: item.name,
                }))
            },
        }),
    }),
})

export const {
    useGetListLanguagesQuery,
    useGetListCandidateLevelsQuery,
} = masterDataSlice
