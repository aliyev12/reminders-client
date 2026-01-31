import { useEffect, useState } from "react";
import type { Store } from "@tanstack/store";

export function useStore<T>(store: Store<T>): T {
  const [state, setState] = useState(store.state);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.state);
    });

    return unsubscribe;
  }, [store]);

  return state;
}
