import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  static inputFieldForm = new FormGroup({
    headerInput: new FormControl('', [
      Validators.maxLength(22),
      Validators.required
    ])
  });

  static get headerInput(): FormControl {
    return this.inputFieldForm.get('headerInput') as FormControl;
  }
}
