import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as form from './reducers/form.reducer';


export interface State {
  formData: form.State;
}

export const reducers: ActionReducerMap<State> = {
  formData: form.reducer
};


/* Selectors */
const featureSelector = createFeatureSelector<form.State>('formData');
export const getFormData = createSelector(featureSelector, f => f);
