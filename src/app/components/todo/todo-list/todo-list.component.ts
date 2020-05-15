import {Component, OnInit, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {Todo} from '../../../helpers/classes/todo';
import {buttonIcons} from '../../../constants/constants';
import {TodoService} from '../../../helpers/todo.service';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  buttonIcons = buttonIcons;

  public menuData: Todo;

  constructor(
    private todoService: TodoService,
  ) { }

  public removeTodo(todo: Todo): void {
    this.todoService.removeTodo(todo);
  }

  public setMenuData(todo: Todo): void {
    event.stopPropagation();
    this.menuData = todo;
  }

  public toggleTodoComplete(todo: Todo): void {
    this.todoService.toggleComplete(todo);
  }

  // public longPressMenu(todo: Todo) {
  //   this.menuData = todo;
  //   console.log(this.menuData);
  //   this.trigger.openMenu();
  // }

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  public editTodo(todo: Todo) {
    this.todoService.editTodo(todo);
  }
}
