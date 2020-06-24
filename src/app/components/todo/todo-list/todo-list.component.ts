import {Component, ViewChild} from '@angular/core';
import {Todo} from '../../../helpers/classes/todo';
import {ButtonIcons} from '../../../constants/constants';
import {TodoService} from '../../../helpers/todo.service';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {TodoHeaderComponent} from '../todo-header/todo-header.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  buttonIcons = ButtonIcons;

  public menuData: Todo;

  constructor(
    private todoService: TodoService,
    private bottomSheet: MatBottomSheet
  ) { }

  public editTodo(todo: Todo) {
    this.bottomSheet.open(TodoHeaderComponent, {
      data: todo,
    });
  }

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

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }
}
