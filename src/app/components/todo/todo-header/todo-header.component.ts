import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {buttonIcons, coreLabels} from '../../../constants/constants';
import {Todo} from '../../../helpers/classes/todo';
import {IdService} from '../../../helpers/id.service';
import {TodoService} from '../../../helpers/todo.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {

  public newTodo: Todo;
  public buttonIcons = buttonIcons;
  public todoLabels = coreLabels;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public todo: Todo,
    private bottomSheetRef: MatBottomSheetRef<TodoHeaderComponent>,
    private todoService: TodoService,
    private idService: IdService
  ) { }

  ngOnInit(): void {
    this.newTodo = new Todo();
    if (this.todo && this.todo.title) {
      this.newTodo = this.todo;
      console.log(this.newTodo);
    }
  }

  public addTodo(newTodo: Todo): void {
    const localTodo = newTodo;

    if (localTodo.title !== '') {
      localTodo.id = this.idService.getId();
      this.todoService.addTodo(localTodo);
    }
    this.newTodo = new Todo();
  }

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  get incomplete(): number {
    return this.todoService.getIncomplete();
  }

}
