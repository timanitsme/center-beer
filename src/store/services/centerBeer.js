import {createApi, fetchBaseQuery}  from "@reduxjs/toolkit/query/react";

export const centerBeerApi = createApi({
    reducerPath: 'centerBeerApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
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
            query: (alias) => `getBarInfo?alias=${alias}`
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

        })),
        getBeers: (builder.query({
            query: ({lim, offset, sort_by, with_reviews, city_id, color_ids, price_ids, abv_id, abv_from, abv_to, og_id, og_from, og_to, ibu_id, ibu_from, ibu_to, vol_ids, pack_ids, brew_ids}) => {
                const params = new URLSearchParams();
                if (lim !== undefined) params.append("lim", lim);
                if (offset !== undefined) params.append("offset", offset);
                if (sort_by !== undefined) params.append("sort_by", sort_by);
                if (with_reviews !== undefined) params.append("with_reviews", with_reviews);
                if (city_id !== undefined) params.append("city_id", city_id);
                if (color_ids !== undefined) params.append("color_ids", color_ids);
                if (price_ids !== undefined) params.append("price_ids", price_ids);
                if (abv_id !== undefined) params.append("abv_id", abv_id);
                if (abv_from !== undefined) params.append("abv_from", abv_from);
                if (abv_to !== undefined) params.append("abv_to", abv_to);
                if (og_id !== undefined) params.append("og_id", og_id);
                if (og_from !== undefined) params.append("og_from", og_from);
                if (og_to !== undefined) params.append("og_to", og_to);
                if (ibu_id !== undefined) params.append("ibu_id", ibu_id);
                if (ibu_from !== undefined) params.append("ibu_from", ibu_from);
                if (ibu_to !== undefined) params.append("ibu_to", ibu_to);
                if (vol_ids !== undefined) params.append("vol_ids", vol_ids);
                if (pack_ids !== undefined) params.append("pack_ids", pack_ids);
                if (brew_ids !== undefined) params.append("brew_ids", brew_ids);
                return(`getBeers?${params.toString()}`)
            }
        }))

    })
})

export const { useGetBarsQuery, useGetBarInfoQuery, useGetBarsFiltersQuery, useGetStylesQuery,
    useGetBarTypesQuery, useGetBreweryTypesQuery, useGetCountriesQuery, useGetCitiesQuery } = centerBeerApi
