export interface infoTypes {
  count: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

export interface contentsTypes {
  data: Array<object>;
  info: infoTypes;
}

export interface contentTypes {
  isLoading: Boolean;
  error: string;
  contents: contentsTypes;
}

export interface stateTypes {
  characters: contentTypes;
}

export interface paramsTypes {
  page?: number;
  pageSize?: number;
  name?: string;
}

export interface builderTypes {
  addCase: Function;
}

export interface characterTypes {
  name: string;
  imageUrl: string;
  tvShows: Array<string>;
  videoGames: Array<string>;
  films: Array<string>;
}
