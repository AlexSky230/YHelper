import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {buttonIcons, coreLabels} from '../../../constants/constants';
import {Todo} from '../../../helpers/classes/todo';
import {IdService} from '../../../helpers/id.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {

  @Input() todos: Todo[];
  @Input() incomplete: number;
  @Output() addTodoOutput = new EventEmitter();

  public newTodo: Todo;
  public buttonIcons = buttonIcons;
  public todoLabels = coreLabels;

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
      this.addTodoOutput.emit(todo);
    }
    this.newTodo = new Todo();
  }

}
