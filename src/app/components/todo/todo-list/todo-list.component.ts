import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Todo} from '../../../helpers/classes/todo';
import {buttonIcons} from '../../../constants/constants';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[];
  @Input() incomplete: number;
  @Output() removeItem = new EventEmitter();
  @Output() toggleItem = new EventEmitter();

  buttonIcons = buttonIcons;

  constructor() { }

  ngOnInit(): void {
  }

  public removeTodo(todo: Todo): void {
    this.removeItem.emit(todo);
  }

  public toggleTodoComplete(todo: Todo): void {
    todo.complete = !todo.complete;
    this.toggleItem.emit();
  }

}
