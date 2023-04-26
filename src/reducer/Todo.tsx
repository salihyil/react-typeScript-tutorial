import { Todo } from '../models/todo';

export const initialState: Todo[] = [];

export enum TodoActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  DONE = 'DONE',
  EDIT = 'EDIT',
}

export type TodoActions =
  | { type: TodoActionType.ADD; payload: string }
  | { type: TodoActionType.REMOVE; payload: number }
  | { type: TodoActionType.DONE; payload: number }
  | { type: TodoActionType.EDIT; payload: { id: number; editTodo: string } };

export const TodoReducer = (state: Todo[], action: TodoActions) => {
  switch (action.type) {
    case TodoActionType.ADD:
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case TodoActionType.REMOVE:
      return state.filter((todo) => todo.id !== action.payload);
    case TodoActionType.DONE:
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });
    case TodoActionType.EDIT:
      // [{ "id": 1682501425613, "todo": "değişti", "isDone": false}]
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.editTodo }
          : todo
      );

    default:
      return state;
  }
};
