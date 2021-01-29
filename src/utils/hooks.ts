import * as React from "react";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

const useSafeDispatch = (dispatch: Function) => {
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
};

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
const useAsync = (initialState?: Object) => {
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
};

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useResponsiveColumns = () => {
  const theme = useTheme();
  const LG = useMediaQuery(theme.breakpoints.up("lg"));
  const MD = useMediaQuery(theme.breakpoints.up("md"));
  const SM = useMediaQuery(theme.breakpoints.up("sm"));
  const XS = useMediaQuery(theme.breakpoints.up("xs"));

  if (LG) {
    return 4;
  } else if (MD) {
    return 3;
  } else if (SM) {
    return 2;
  } else if (XS) {
    return 1;
  } else {
    return 1;
  }
};

const useLocalStorageState = <T>(
  key: string,
  defaultValue: T,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = React.useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage);
      } catch (error) {
        window.localStorage.removeItem(key);
      }
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
};

export { useAsync, useDebounce, useResponsiveColumns, useLocalStorageState };
