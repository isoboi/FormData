import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services';
import { Observable, Subject } from 'rxjs';
import { IOption } from '../../core/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  options: Observable<IOption[]>;
  submitted = false;

  private _destroy$ = new Subject<boolean>();

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _apiService: ApiService) {
  }

  ngOnInit(): void {
    this._initForm();
    this._getFormData();
    this._getOptions();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this._apiService.setFormData(this.form.value);
      this._router.navigate(['/']);
    }
  }

  selectChange(e: IOption): void {
    this.form.patchValue({postSubject: e.value});
  }

  resetForm(): void {
    this.form.reset();
  }

  private _initForm(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      postSubject: ['', Validators.required],
      post: ['', Validators.required]
    });
  }

  private _getFormData(): void {
    this._apiService.getFormData()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => this.form.patchValue(res || {}));
  }

  private _getOptions(): void {
    this.options = this._apiService.getOptions();
  }
}
