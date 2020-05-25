import {Injectable} from '@angular/core';
import {IdService} from './id.service';
import {LocalStorageService} from '../services/local-storage.service';
import {Todo} from './classes/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public incomplete: number;
  public todos: Todo[] = [];

  constructor(
    private idService: IdService,
    private localStorageService: LocalStorageService
  ) {
  }

  public addTodo(todo: Todo) {
    if (this.todos.indexOf(todo) === -1) {
      this.todos.unshift(todo);
    }
    this.calculateIncompleteTodos();
  }

  public buildTodoList(data): void {
    this.todos = data ? data : [];
    this.calculateIncompleteTodos();
  }

  public calculateIncompleteTodos(): void {
    this.incomplete = this.todos.reduce((a, todo) => {
      return (todo.complete) ? a : (a + 1);
    }, 0);
    this.saveTodosToStorage();
  }

  public deleteCompleted(): void {
    this.todos = this.todos.filter(item => item.complete !== true);
    this.saveTodosToStorage();
  }

  public getAllTodos(): void {
    this.localStorageService
      .getDataFromStorageById('todos')
      .subscribe((data) => {
        if (data === undefined) {
          data = [];
        }
        this.buildTodoList(data);
      });
  }

  public saveTodosToStorage(): void {
    this.localStorageService.addDataToStorage('todos', this.todos);
  }

  public toggleComplete(todo: Todo): void {
    if (todo) {
      todo.complete = !todo.complete;
      this.calculateIncompleteTodos();
    }
  }

  public getTodos(): Todo[] {
    return this.todos;
  }

  public getIncomplete(): number {
    return this.incomplete;
  }

  public removeTodo(todo) {
    this.todos = this.todos.filter(item => item.id !== todo.id);
    this.calculateIncompleteTodos();
  }
}

