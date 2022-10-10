// docs: https://swapi.dev/
export const API = "https://swapi.dev/api";
export const API_ALL_MOVIES = API + "/films/";
export const API_SINGLE_MOVIE = API + "/films/:id";
export const API_ALL_CHARACTERS = API + "/people/";
export const API_SINGLE_CHARACTER = API + "/people/:id";

interface FetchMethodsResponse<ResponseBody> {
  data: ResponseBody | undefined;
  notFound: boolean;
}
type FetchMethods = <ResponseBody>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<FetchMethodsResponse<ResponseBody>>;

export const fetchMethod: FetchMethods = async function (...args) {
  try {
    const res = await fetch(...args);
    const data = await res.json();
    return {
      data,
      notFound: false,
    };
  } catch {
    return {
      data: undefined,
      notFound: true,
    };
  }
};
