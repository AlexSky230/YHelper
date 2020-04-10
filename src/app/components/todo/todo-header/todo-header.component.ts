import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {buttonIcons} from '../../../constants/constants';
import {Todo} from '../../../helpers/classes/todo';
import {IdService} from '../../../helpers/id.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {

  @Input() todos: Todo[];
  @Output() addTodoOutput = new EventEmitter();

  public newTodo: Todo;
  public buttonIcons = buttonIcons;

  constructor(
    private idService: IdService
  ) { }

  ngOnInit(): void {
    this.newTodo = new Todo();
  }

  public addTodo(newTodo: Todo): void {
    const todo = newTodo;

    if (todo.title !== '') {
      todo.id = this.idService.getId();
      this.todos.unshift(todo);
      this.addTodoOutput.emit();
    }
    this.newTodo = new Todo();
  }

}
