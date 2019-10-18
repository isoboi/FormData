import { createReducer, on, ReducerManager } from '@ngrx/store';
import { formDataAction } from '../actions/form.actions';

export interface State {
  name?: string;
  email?: string;
  postSubject?: string;
  post?: string;
}

export let initialState: State;

const formReduce = createReducer(initialState,
  on(formDataAction, (state, {payload}) => {
    return {
      ...state,
      ...payload
    };
  })
);

export function reducer(state, action): State {
  return formReduce(state, action);
}
