import { createAction, props } from '@ngrx/store';
import { IUserData } from '../../models';

export const formDataAction = createAction('[Form Component] Data', props<{payload: {formData: IUserData}}>());
