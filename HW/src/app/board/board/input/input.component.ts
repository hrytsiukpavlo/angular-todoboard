import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-add',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    public modalService: ModalService,
    public boardService: BoardService
  ) {
    this.visible = () => {
      console.log('chcahschas');
    };

    this.formValues = () => {
      console.log('form values');
    };
  }

  @Input() visible: (args?: any) => void | undefined;
  @Input() formValues: (title: string, id: number) => void | undefined;
  @Input() testVal: number | undefined;
  @Input() colId: any;
  @Output() emitText: EventEmitter<any> = new EventEmitter();

  get title() {
    return this.form.controls.title as FormControl;
  }

  ngOnInit(): void {}

  submit(event) {
    this.visible();
    console.log(this.testVal)
    // this.emitText.emit(event);
    // console.log(this.form.value);
    if (this.form.value.title && this.testVal) {
      this.formValues(this.form.value.title, this.testVal);
    }
  }
}
