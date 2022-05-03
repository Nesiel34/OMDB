export interface AdvancedSearchData {
    queryString: string;
    results: AdvancedSearchResult[];
    errorMessage: string;
}

export interface AdvancedSearchResult {
    id?: string;
    image?: string;
    title?: string;
    description?: string;
    runtimeStr?: string;
    genres?: string;
    genreList?: KeyValueItem[];
    contentRating?: string;
    imDbRating?: string;
    iMDbRatingVotes?: string;
    metacriticRating?: string;
    plot?: string;
    stars?: string;
    starList?: StarShort[];
}

export interface StarShort {
    id: string;
    name: string;
}

export interface KeyValueItem {
    key: string;
    value: string;
}
