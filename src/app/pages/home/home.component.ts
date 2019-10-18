import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFormData, State } from '../../core/store';
import { State as formState } from '../../core/store/reducers/form.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formData: formState;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.pipe(select(getFormData))
      .subscribe(res => this.formData = res);
  }

}
