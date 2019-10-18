import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORM_ROUTES } from './form.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../../shared';

import { FormComponent } from './form.component';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(FORM_ROUTES),
    ReactiveFormsModule,
    SelectModule
  ]
})
export class FormModule {
}
