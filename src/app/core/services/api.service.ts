import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFormData, State } from '../store';
import { State as formState } from '../../core/store/reducers/form.reducer';
import { Observable, of } from 'rxjs';
import { formDataAction } from '../store/actions/form.actions';
import { IOption } from '../models';

@Injectable()
export class ApiService {

  private options: IOption[] = [
    {key: 1, value: 'Тема 1'},
    {key: 2, value: 'Тема 2'},
    {key: 3, value: 'Тема 3'},
    {key: 4, value: 'Тема 4'},
  ];

  constructor(private _store: Store<State>) { }

  getFormData(): Observable<formState> {
    return this._store.pipe(select(getFormData));
  }

  getOptions(): Observable<IOption[]> {
    return of(this.options);
  }

  setFormData(data): void {
    this._store.dispatch(formDataAction({payload: data}));
  }
}
