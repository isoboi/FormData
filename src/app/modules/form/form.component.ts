import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { formDataAction } from '../../core/store/actions/form.actions';
import { getFormData } from '../../core/store';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  options = [
    {key: 1, value: 'Тема 1'},
    {key: 2, value: 'Тема 2'},
    {key: 3, value: 'Тема 3'},
    {key: 4, value: 'Тема 4'},
  ];

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _store: Store<{formData}>) {
  }

  ngOnInit() {
    this._initForm();
    this._getFormData();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this._store.dispatch(formDataAction({payload: this.form.value}));
      this._router.navigate(['/']);
    }
  }

  selectChange(e) {
    this.form.patchValue({postSubject: e.value});
  }

  resetForm() {
    this.form.reset();
  }

  private _initForm() {
    this.form = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      postSubject: ['', Validators.required],
      post: ['', Validators.required]
    });
  }

  private _getFormData() {
    this._store.pipe(select(getFormData))
      .subscribe(res => {
        if (res) {
          this.form.patchValue(res);
        }
      });
  }
}
