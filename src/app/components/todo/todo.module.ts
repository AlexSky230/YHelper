import {NgModule} from '@angular/core';
import {SharedModule} from 'shared/shared.module';
import {TodoComponent} from './todo.component';
import {TodoHeaderComponent} from './todo-header/todo-header.component';
import {TodoListComponent} from './todo-list/todo-list.component';


@NgModule({
  declarations: [
    TodoComponent,
    TodoHeaderComponent,
    TodoListComponent,
  ],
  entryComponents: [
    TodoHeaderComponent,
  ],
  imports: [SharedModule]
})
export class TodoModule {
}
