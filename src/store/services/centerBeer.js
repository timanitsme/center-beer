import {createApi, fetchBaseQuery}  from "@reduxjs/toolkit/query/react";

export const centerBeerApi = createApi({
    reducerPath: 'centerBeerApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/'}),
    endpoints: (builder) => ({
        getBars: (builder.query({
            query: ({lim, offset, city_id, subways_ids, kitchen_ids, visit_type_ids, type_ids, feature_ids}) => {
                const params = new URLSearchParams();
                if (lim !== undefined) params.append('lim', lim);
                if (offset !== undefined) params.append('offset', offset);
                if (city_id !== undefined) params.append('city_id', city_id);
                if (subways_ids !== undefined) params.append('subways_ids', subways_ids);
                if (kitchen_ids !== undefined) params.append('kitchen_ids', kitchen_ids);
                if (visit_type_ids !== undefined) params.append('visit_type_ids', visit_type_ids);
                if (type_ids !== undefined) params.append('type_ids', type_ids);
                if (feature_ids !== undefined) params.append('feature_ids', feature_ids);
                return(`getBars?${params.toString()}`)
            }
        })),
        getBarInfo: (builder.query({
            query: (id) => `getBarInfo?id=${id}`
        })),
        getBarsFilters: (builder.query({
            query: (cityId) => `getBarsFilters?id=${cityId}`
        })),
        getStyles: (builder.query({
            query: () => `getStyles`
        })),
        getBarTypes: (builder.query({
            query: () => `getBarTypes`
        })),
        getBreweryTypes: (builder.query({
            query: () => `getBreweryTypes`
        })),
        getCountries: (builder.query({
            query: () => `getCountries`
        })),
        getCities: (builder.query({
            query: (name) => {
                const params = new URLSearchParams();
                if (name !== undefined) params.append("name", name)
                return(`getCities?${params.toString()}`)
            }

        }))

    })
})

export const { useGetBarsQuery, useGetBarInfoQuery } = centerBeerApi
