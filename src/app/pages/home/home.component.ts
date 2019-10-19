import { Component, OnDestroy, OnInit } from '@angular/core';
import { State as formState } from '../../core/store/reducers/form.reducer';
import { ApiService } from '../../core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  formData: formState;
  private _destroy$ = new Subject();

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getFormData()
      .pipe(takeUntil(this._destroy$))
      .subscribe((res: formState) => this.formData = res);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

}
