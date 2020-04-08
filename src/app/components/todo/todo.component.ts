import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {IdService} from '../../helpers/id.service';
import {Todo} from '../../helpers/classes/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public incomplete: number;
  public todos: Todo[] = [];

  constructor(
    private idService: IdService,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.getAllTodos();
  }

  public buildTodoList(data): void {
    this.todos = data ? data : [];
    this.calculateIncompleteTodos();
  }


  public calculateIncompleteTodos(): void {
    this.incomplete = this.todos.reduce((a, todo) => {
      return (todo.complete) ? a : (a + 1);
    }, 0);
    this.localStorageService.addDataToStorage('todos', this.todos);
  }

  private getAllTodos(): void {
    this.localStorageService
      .getDataFromStorageById('todos')
      .subscribe((data) => {
        if (data === undefined) {
          data = [];
        }
        this.buildTodoList(data);
      });
  }

  private removeTodo(todo) {
    this.todos = this.todos.filter(item => item.id !== todo.id);
    this.calculateIncompleteTodos();
  }
}
