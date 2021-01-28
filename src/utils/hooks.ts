import * as React from "react";

function useSafeDispatch(dispatch: Function) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

export enum UseAsyncStatus {
  IDLE,
  PENDING,
  RESOLVED,
  REJECTED,
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = {
  status: UseAsyncStatus.IDLE,
  data: null,
  error: null,
};
function useAsync(initialState?: Object) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...(initialState || {}),
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (s: { status: UseAsyncStatus; data: any; error: any }, a: Object) => ({
      ...s,
      ...a,
    }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data) => safeSetState({ data, status: UseAsyncStatus.RESOLVED }),
    [safeSetState]
  );
  const setError = React.useCallback(
    (error) => safeSetState({ error, status: UseAsyncStatus.REJECTED }),
    [safeSetState]
  );
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ]);

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: UseAsyncStatus.PENDING });
      return promise.then(
        (data: any) => {
          setData(data);
          return data;
        },
        (error: any) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === UseAsyncStatus.IDLE,
    isLoading: status === UseAsyncStatus.PENDING,
    isError: status === UseAsyncStatus.REJECTED,
    isSuccess: status === UseAsyncStatus.RESOLVED,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
