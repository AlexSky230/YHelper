import {Component, OnInit} from '@angular/core';
import {TodoService} from 'helpers/todo.service';
import {ButtonIcons, CoreLabels} from 'shared/constants/constants';
import {Todo} from 'shared/classes/todo';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {TodoHeaderComponent} from './todo-header/todo-header.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public buttonIcons = ButtonIcons;
  public todoLabels = CoreLabels;

  constructor(
    private todoService: TodoService,
    private bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit() {
    this.todoService.getAllTodos();
  }

  public deleteCompleted() {
    this.todoService.deleteCompleted();
  }

  public openMenu() {
    this.bottomSheet.open(TodoHeaderComponent, {
      closeOnNavigation: true
    });
  }

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  get incomplete(): number {
    return this.todoService.getIncomplete();
  }

  get completedExist(): boolean {
    return this.todos.length !== this.incomplete;
  }

}
