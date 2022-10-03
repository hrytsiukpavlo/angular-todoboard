import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(public modalService: ModalService) {
    this.visible = () => {
      console.log('chcahschas');
    };
    this.formValues = () => {
      console.log('form values');
    };
  }

  @Input() visible: (args?: any) => void | undefined;
  @Input() formValues: (title: string, description: string) => void | undefined;

  get title() {
    return this.form.controls.title as FormControl;
  }

  get description() {
    return this.form.controls.description as FormControl;
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
    this.visible();
    if (this.form.value.title && this.form.value.description) {
      this.formValues(this.form.value.title, this.form.value.description);
    }
  }
}
