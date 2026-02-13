import {createApi, fetchBaseQuery}  from "@reduxjs/toolkit/query/react";

export const centerBeerApi = createApi({
    reducerPath: 'centerBeerApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    endpoints: (builder) => ({
        // Каталог баров
        getBars: (builder.query({
            query: ({lim, offset, name, city_id, subways_ids, kitchen_ids, visit_type_ids, price_ids, type_ids, feature_ids, only_opened, sort_by, online_booking}) => {
                const params = new URLSearchParams();
                if (lim !== undefined) params.append('lim', lim);
                if (offset !== undefined) params.append('offset', offset);
                if (sort_by !== undefined) params.append('sort_by', sort_by)
                if (only_opened !== undefined) params.append('only_opened', only_opened.toString())
                if (online_booking !== undefined) params.append('online_booking', online_booking)
                if (city_id !== undefined) params.append('city_id', city_id);
                if (subways_ids !== undefined) params.append('subways_ids', subways_ids);
                if (kitchen_ids !== undefined) params.append('kitchen_ids', kitchen_ids);
                if (visit_type_ids !== undefined) params.append('visit_type_ids', visit_type_ids);
                if (price_ids !== undefined) params.append('price_ids', price_ids);
                if (type_ids !== undefined) params.append('type_ids', type_ids);
                if (feature_ids !== undefined) params.append('feature_ids', feature_ids);
                if (name !== undefined) params.append('name', name);
                return(`getBars?${params.toString()}`)
            }
        })),
        getBarsFilters: (builder.query({
            query: (cityId) => `getBarsFilters?id=${cityId}`
        })),



        //Каталог пива
        getBeers: (builder.query({
            query: ({lim, name, offset, sort_by, with_reviews, city_id, style_ids, color_ids, country_ids, price_ids, abv_id, abv_from, abv_to, og_id, og_from, og_to, ibu_id, ibu_from, ibu_to, vol_ids, pack_ids, brew_ids}) => {
                const params = new URLSearchParams();
                if (lim !== undefined) params.append("lim", lim);
                if (offset !== undefined) params.append("offset", offset);
                if (sort_by !== undefined) params.append("sort_by", sort_by);
                if (with_reviews !== undefined) params.append("with_reviews", with_reviews);
                if (city_id !== undefined) params.append("city_id", city_id);
                if (country_ids !== undefined) params.append("country_ids", country_ids);
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
                if (style_ids !== undefined && style_ids.length !== 0) params.append("style_id", style_ids);
                if (name !== undefined) params.append("name", name);
                return(`getBeers?${params.toString()}`)
            }
        })),
        getBeersFilters: (builder.query({
            query: (cityId) => `getBeersFilters?id=${cityId}`
        })),
        getBeerStyles: (builder.query({
            query: ({id, name, offset, lim}) => {
                const params = new URLSearchParams();
                if (id !== undefined) params.append("id", id)
                if (name !== undefined) params.append("name", name)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getStyles?${params.toString()}`)
            }
        })),
        getBeerCountries: (builder.query({
            query: ({name}) => {
                const params = new URLSearchParams();
                if (name !== undefined) params.append("name", name)
                return(`getCountries?${params.toString()}`)
            }
        })),



        // Каталог пивоварен
        getBreweries: (builder.query({
            query: ({lim, offset, id, name, is_open, is_new, country_id, city_id, type_id, order_by, order_asc_desc}) => {
                const params = new URLSearchParams()
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                if (is_open !== undefined) params.append("is_open", is_open)
                if (id !== undefined) params.append("id", id)
                if (name !== "") params.append("name", name)
                if (is_new !== undefined) params.append("new", is_new)
                if (country_id !== undefined) params.append("country_id", country_id)
                if (city_id !== undefined) params.append("city_id", city_id)
                if (type_id !== undefined) params.append("type_id", type_id)
                if (order_by !== undefined) params.append("order_by", order_by)
                if (order_asc_desc !== undefined) params.append("order_asc_desc", order_asc_desc)
                return(`getBreweries?${params.toString()}`)
            }
        })),
        getBreweriesFilters: (builder.query({
            query: () => `getBreweriesFilters`
        })),



        // Каталог новостей
        getNews: (builder.query({
            query: ({global_news, bar_id, post_id, search_text}) => {
                const params = new URLSearchParams();
                if (global_news !== undefined) params.append("global_news", global_news)
                if (bar_id !== undefined) params.append("bar_id", bar_id)
                if (post_id !== undefined) params.append("post_id", post_id)
                if (search_text !== undefined && search_text !== "") params.append("search_text", search_text)
                return(`getNews?${params.toString()}`)
            }
        })),
        getNewsCategories: (builder.query({
            query: () => `getNewsCategories`
        })),
        getNewsRelated: (builder.query({
            query: (post_id) => {
                const params = new URLSearchParams();
                if (post_id !== undefined) params.append("post_id", post_id)
                return(`getNewsRelated?${params.toString()}`)
            }
        })),
        getNewsItem: (builder.query({
            query: (post_id) => {
                const params = new URLSearchParams();
                if (post_id !== undefined) params.append("post_id", post_id)
                return(`getNewsItem?${params.toString()}`)
            }
        })),



        //Страница бара
        getBarComments: (builder.query({
            query: ({barId, lim, offset}) => {
                const params = new URLSearchParams()
                params.append("bar_id", barId)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getBarComments?${params.toString()}`)
            }
        })),
        getBarInfo: (builder.query({
            query: (alias) => `getBarInfo?alias=${alias}`
        })),
        getBarInfoById: (builder.query({
            query: (id) => `getBarInfo?id=${id}`
        })),
        getBarMenuTabs: (builder.query({
            query: (bar_id) => `getBarMenuTabs?bar_id=${bar_id}`
        })),
        getBarMenuFood: (builder.query({
            query: ({bar_id, name, lim, offset, kitchen_ids, price_ids}) => {
                const params = new URLSearchParams();
                params.append("bar_id", bar_id)
                if (lim !== undefined) params.append("lim", lim)
                if (name !== undefined) params.append("name", name)
                if (offset !== undefined) params.append("offset", offset)
                if (kitchen_ids !== undefined) params.append("kitchen_ids", kitchen_ids)
                if (price_ids !== undefined) params.append("price_ids", price_ids)
                return(`getBarMenuFood?${params.toString()}`)
            }
        })),
        getBarMenuFoodFilters: (builder.query({
            query: (bar_id) => `getBarMenuFoodFilters?bar_id=${bar_id}`
        })),
        getBarMenuBottle: (builder.query({
            query: ({bar_id, lim, name, offset, color_ids, abv_id, abv_from, abv_to, og_id, og_from, og_to, ibu_id, ibu_from, ibu_to, pack_ids, brew_ids, price_ids }) => {
                const params = new URLSearchParams()
                params.append("bar_id", bar_id)
                if (lim !== undefined) params.append("lim", lim)
                if (name !== undefined) params.append("name", name)
                if (offset !== undefined) params.append("offset", offset)
                if (color_ids !== undefined) params.append("color_ids", color_ids)
                if (abv_id !== undefined) params.append("abv_id", abv_id)
                if (abv_from !== undefined) params.append("abv_from", abv_from)
                if (abv_to !== undefined) params.append("abv_to", abv_to)
                if (og_id !== undefined) params.append("og_id", og_id)
                if (og_from !== undefined) params.append("og_from", og_from)
                if (og_to !== undefined) params.append("og_to", og_to)
                if (ibu_id !== undefined) params.append("ibu_id", ibu_id)
                if (ibu_from !== undefined) params.append("ibu_from", ibu_from)
                if (ibu_to !== undefined) params.append("ibu_to", ibu_to)
                if (pack_ids !== undefined) params.append("pack_ids", pack_ids)
                if (brew_ids !== undefined) params.append("brew_ids", brew_ids)
                if (price_ids !== undefined) params.append("price_ids", price_ids)
                return(`getBarMenuBottle?${params.toString()}`)
            }
        })),
        getBarMenuBottleFilters: (builder.query({
            query: (bar_id) => `getBarMenuBottleFilters?bar_id=${bar_id}`
        })),
        getBarMenuBeer: (builder.query({
            query: ({bar_id, lim, name, offset, color_ids, abv_id, abv_from, abv_to, og_id, og_from, og_to, ibu_id, ibu_from, ibu_to, brew_ids, price_ids }) => {
                const params = new URLSearchParams()
                params.append("bar_id", bar_id)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                if (name !== undefined) params.append("name", name)
                if (color_ids !== undefined) params.append("color_ids", color_ids)
                if (abv_id !== undefined) params.append("abv_id", abv_id)
                if (abv_from !== undefined) params.append("abv_from", abv_from)
                if (abv_to !== undefined) params.append("abv_to", abv_to)
                if (og_id !== undefined) params.append("og_id", og_id)
                if (og_from !== undefined) params.append("og_from", og_from)
                if (og_to !== undefined) params.append("og_to", og_to)
                if (ibu_id !== undefined) params.append("ibu_id", ibu_id)
                if (ibu_from !== undefined) params.append("ibu_from", ibu_from)
                if (ibu_to !== undefined) params.append("ibu_to", ibu_to)
                if (brew_ids !== undefined) params.append("brew_ids", brew_ids)
                if (price_ids !== undefined) params.append("price_ids", price_ids)
                return(`getBarMenuBeer?${params.toString()}`)
            }
        })),
        getBarMenuBeerFilters: (builder.query({
            query: (bar_id) => `getBarMenuBeerFilters?bar_id=${bar_id}`
        })),
        getBarMenuAlc: (builder.query({
            query: ({bar_id, lim, name, offset, abv_id, abv_from, abv_to, price_ids }) => {
                const params = new URLSearchParams()
                params.append("bar_id", bar_id)
                if (lim !== undefined) params.append("lim", lim)
                if (name !== undefined) params.append("name", name)
                if (offset !== undefined) params.append("offset", offset)
                if (abv_id !== undefined) params.append("abv_id", abv_id)
                if (abv_from !== undefined) params.append("abv_from", abv_from)
                if (abv_to !== undefined) params.append("abv_to", abv_to)
                if (price_ids !== undefined) params.append("price_ids", price_ids)
                return(`getBarMenuAlc?${params.toString()}`)
            }
        })),
        getBarMenuAlcFilters: (builder.query({
            query: (bar_id) => `getBarMenuBeerFilters?bar_id=${bar_id}`
        })),
        getBarMenuCocktails: (builder.query({
            query: ({bar_id, lim, name, offset, abv_id, abv_from, abv_to, price_ids }) => {
                const params = new URLSearchParams()
                params.append("bar_id", bar_id)
                if (lim !== undefined) params.append("lim", lim)
                if (name !== undefined) params.append("name", name)
                if (offset !== undefined) params.append("offset", offset)
                if (abv_id !== undefined) params.append("abv_id", abv_id)
                if (abv_from !== undefined) params.append("abv_from", abv_from)
                if (abv_to !== undefined) params.append("abv_to", abv_to)
                if (price_ids !== undefined) params.append("price_ids", price_ids)
                return(`getBarMenuCocktails?${params.toString()}`)
            }
        })),
        getBarMenuCocktailsFilters: (builder.query({
            query: (bar_id) => `getBarMenuCocktailsFilters?bar_id=${bar_id}`
        })),
        getBarEvents: (builder.query({
            query: ({bar_id, lim, offset}) => {
                const params = new URLSearchParams()
                if (bar_id !== undefined) params.append("bar_id", bar_id)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getBarEvents?${params.toString()}`)
            }
        })),
        getBarPromo: (builder.query({
            query: ({bar_id, lim, offset}) => {
                const params = new URLSearchParams()
                params.append("bar_id", bar_id)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getBarPromo?${params.toString()}`)
            }
        })),
        getBarNews: (builder.query({
            query: ({bar_id, lim, offset}) => {
                const params = new URLSearchParams()
                params.append("bar_id", bar_id)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getBarNews?${params.toString()}`)
            }
        })),


        // Страница пива
        getBeerComments: (builder.query({
            query: ({beerId, lim, offset}) => {
                const params = new URLSearchParams()
                params.append("beer_id", beerId)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getBeerComments?${params.toString()}`)
            }
        })),
        getBeerInfo: (builder.query({
            query: (alias) => `getBeerInfo?alias=${alias}`
        })),
        getBeerInfoById: (builder.query({
            query: (id) => `getBeerInfo?id=${id}`
        })),

        // Страница пивоварни
        getBreweryComments: (builder.query({
            query: ({brewId, lim, offset}) => {
                const params = new URLSearchParams()
                params.append("brew_id", brewId)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getBreweryComments?${params.toString()}`)
            }
        })),
        getBreweryInfo: (builder.query({
            query: (alias) => `getBreweryInfo?alias=${alias}`
        })),
        getBreweryInfoById: (builder.query({
            query: (id) => `getBreweryInfo?id=${id}`
        })),
        getBreweryFilters: (builder.query({
            query: () => `getBreweryFilters`
        })),
        getBreweryEvents: (builder.query({
            query: ({brew_id, lim, offset}) => {
                const params = new URLSearchParams()
                if (brew_id !== undefined) params.append("brew_id", brew_id)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getBreweryEvents?${params.toString()}`)
            }
        })),
        getBreweryNews: (builder.query({
            query: ({brew_id, lim, offset}) => {
                const params = new URLSearchParams()
                params.append("brew_id", brew_id)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getBreweryNews?${params.toString()}`)
            }
        })),



        // Получение информации о фестивале
        getFest: (builder.query({
            query: (fest_id) => {
                return(`getFest?fest_id=${fest_id}`)
            }
        })),



        // Пользователь
        refreshUserToken: (builder.query({
            query: ({user_id, user_guid, token}) => {
                const params = new URLSearchParams()
                if (user_id !== undefined) params.append("user_id", user_id)
                if (user_guid !== undefined) params.append("user_guid", user_guid)
                if (token !== undefined) params.append("token", token)
                return(`refreshUserToken?${params.toString()}`)
            }
        })),
        addBeerToCuddy: (builder.query({
            query: (beer_id) => `user/addBeerToCuddy?beer_id=${beer_id}`
        })),
        addBeerToFav: (builder.query({
            query: (beer_id) => `user/addBeerToFav?beer_id=${beer_id}`
        })),
        addBarToCuddy: (builder.query({
            query: (bar_id) => `user/addBarToCuddy?bar_id=${bar_id}`
        })),
        //getUserComments
        getUsersBalanceHistory: (builder.query({
            query: ({user_id, user_guid}) => {
                const params = new URLSearchParams()
                if (user_id !== undefined) params.append("user_id", user_id)
                if (user_guid !== undefined) params.append("user_guid", user_guid)
                return(`getUsersBalanceHistory?${params.toString()}`)
            }
        })),

        addUserReward: (builder.query({
            query: ({user_id, user_guid, reward_alias}) => {
                const params = new URLSearchParams()
                if (user_id !== undefined) params.append("user_id", user_id)
                if (user_guid !== undefined) params.append("user_guid", user_guid)
                if (reward_alias !== undefined) params.append("reward_alias", reward_alias)
                return(`addUserReward?${params.toString()}`)
            }
        })),
        getCheckinsBeers: (builder.query({
            query: ({beerId, lim, offset}) => {
                const params = new URLSearchParams()
                if (beerId !== undefined) params.append("beer_id", beerId)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`user/getCheckinsBeers?${params.toString()}`)
            }
        })),
        addBarToFav: (builder.query({
            query: (bar_id) => `user/addBarToFav?bar_id=${bar_id}`
        })),
        getUsersFavBars: (builder.query({
            query: () => `user/getFavorites?type=bar`
        })),
        getUsersFavBeers: (builder.query({
            query: () => `user/getFavorites?type=beer`
        })),
        getUsersFavBreweries: (builder.query({
            query: () => `user/getFavorites?type=brewery`
        })),
        getUsersCuddyBars: (builder.query({
            query: () => `user/getCuddy?type=bar`
        })),
        getUsersCuddyBeers: (builder.query({
            query: () => `user/getCuddy?type=beer`
        })),
        getUsersCuddyBreweries: (builder.query({
            query: () => `user/getCuddy?type=brewery`
        })),
        getUserDashboard: (builder.query({
            query: ({userId}) => {
                const params = new URLSearchParams();
                if (userId !== undefined) params.append("user_id", userId);
                return(`user/getDashboard?${params.toString()}`);
            }
        })),
        voteComment: builder.mutation({
            query: ({commentId, commentType, action}) => {
                return({
                    url: 'user/voteComment',
                    method: "POST",
                    body: {comment_id: commentId, comment_type: commentType, action}
                })}
        }),
        addCheckin: builder.mutation({
            query: ({beerId, barId, comment, rating, lat, lon, isPrivate, photo}) => {
                const body = {}
                if (beerId !== undefined ) body.beer_id = beerId;
                if (barId !== undefined ) body.bar_id = barId;
                if (comment !== undefined ) body.comment = comment;
                if (rating !== undefined ) body.rating = rating;
                if (lat !== undefined ) body.lat = lat;
                if (lon !== undefined ) body.lon = lon;
                if (isPrivate !== undefined ) body.is_private = isPrivate;
                if (photo !== undefined ) body.photo = photo;

                return({
                    url: 'user/addCheckin',
                    method: "POST",
                    body: body
                })}
        }),
        addBarComment: builder.mutation({
            query: ({barId, comment, rating, photos}) => {
                const formData = new FormData();
                if (barId !== undefined ) formData.append("bar_id", barId);
                if (comment !== undefined ) formData.append("comment", comment);
                if (rating !== undefined ) formData.append("rating", rating);
                if (photos !== undefined && Array.isArray(photos)) {
                    photos.forEach((photo, index) => {
                        formData.append(`photos`, photo);
                    });
                }

                return({
                    url: 'user/addBarComment',
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": undefined,
                    }
                })}
        }),






        //Справочники
        getStyles: (builder.query({
            query: ({id, name, lim, offset}) => {
                const params = new URLSearchParams()
                if (id !== undefined) params.append("id", id)
                if (name !== undefined) params.append("name", name)
                if (lim !== undefined) params.append("lim", lim)
                if (offset !== undefined) params.append("offset", offset)
                return(`getStyles?${params.toString()}`)
            }
        })),
        getBarTypes: (builder.query({
            query: () => `getBarTypes`
        })),
        getBreweryTypes: (builder.query({
            query: () => `getBreweryTypes`
        })),
        getCountries: (builder.query({
            query: ({name}) => {
                const params = new URLSearchParams()
                if (name !== undefined) params.append("name", name)
                return(`getCountries?${params.toString()}`)
            }
        })),
        getCities: (builder.query({
            query: ({country_id, name}) => {
                const params = new URLSearchParams();
                if (country_id) params.append("country_id", country_id)
                if (name) params.append("name", name)
                return(`getCities?${params.toString()}`)
            }
        })),

    })
})

export const { useGetBarsQuery, useGetBarInfoQuery, useGetBarsFiltersQuery,
    useGetStylesQuery, useGetBarTypesQuery, useGetBreweryTypesQuery,
    useGetCountriesQuery, useGetCitiesQuery, useGetBarEventsQuery, useGetBreweryEventsQuery,
    useGetBarPromoQuery, useGetBarNewsQuery, useGetBreweryNewsQuery, useGetBarMenuTabsQuery,
    useGetBarMenuFoodQuery, useGetBarMenuBottleQuery, useGetBarMenuBeerQuery,
    useGetBarMenuAlcQuery, useGetBarMenuCocktailsQuery, useGetBarMenuFoodFiltersQuery,
    useGetBarMenuBottleFiltersQuery, useGetBarMenuBeerFiltersQuery, useGetBarMenuAlcFiltersQuery,
    useGetBarMenuCocktailsFiltersQuery, useGetBarInfoByIdQuery, useGetBeersQuery,
    useGetBeersFiltersQuery, useGetBeerInfoQuery, useGetBreweriesQuery, useGetBreweriesFiltersQuery,
    useGetBreweryInfoQuery, useGetBreweryInfoByIdQuery, useGetFestQuery,
    useLazyAddBeerToCuddyQuery, useLazyAddBeerToFavQuery, useLazyAddBarToCuddyQuery,
    useLazyAddBarToFavQuery, useGetUsersFavBarsQuery, useGetUsersCuddyBarsQuery,
    useGetUsersFavBeersQuery, useGetUsersCuddyBeersQuery, useGetUsersFavBreweriesQuery, useGetUsersCuddyBreweriesQuery, useGetUsersBalanceHistoryQuery, useGetNewsQuery,
    useGetBeerCountriesQuery, useGetBeerStylesQuery, useGetNewsItemQuery, useGetNewsRelatedQuery,
    useGetNewsCategoriesQuery, useGetBarCommentsQuery, useGetBeerCommentsQuery, useGetBreweryCommentsQuery,
    useGetUserDashboardQuery, useGetCheckinsBeersQuery, useVoteCommentMutation, useAddBarCommentMutation} = centerBeerApi
