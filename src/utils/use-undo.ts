import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{ past: T[]; present: T; future: T[] }>({
    past: [],
    present: initialPresent,
    future: [],
  });
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(
    () => {
      setState((currentState) => {
        // 当setState的参数为带参数的匿名函数是，参数代表当前的state，返回值是新的state
        const { past, present, future } = currentState;
        if (past.length === 0) return currentState;
        const previous = past[past.length - 1];
        const newpast = past.slice(0, past.length - 1);

        return {
          past: newpast,
          present: previous,
          future: [present, ...future],
        };
      });
    },
    []
    // 因为内部的参数全来自state所以不需要其他的依赖
  );

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;
      const next = future[0];
      const newfuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newfuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [state, { set, reset, undo, redo, canRedo, canUndo }] as const;
};
