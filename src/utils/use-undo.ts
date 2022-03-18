import { useCallback, useReducer, useState } from "react";
const REDO = "REDO";
const UNDO = "UNDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;
  switch (type) {
    case UNDO:
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newpast = past.slice(0, past.length - 1);
      return {
        past: newpast,
        present: previous,
        future: [present, ...future],
      };
    case REDO:
      if (future.length === 0) return state;
      const next = future[0];
      const newfuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newfuture,
      };
    case SET:
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case RESET:
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    default:
      return state;
  }
};
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  });
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  const redo = useCallback(() => dispatch({ type: REDO }), []);
  const set = useCallback(
    (newPresent: T) => dispatch({ newPresent, type: SET }),
    []
  );
  const reset = useCallback(
    (newPresent: T) => dispatch({ newPresent, type: RESET }),
    []
  );
  return [state, { set, reset, undo, redo, canRedo, canUndo }] as const;
};
