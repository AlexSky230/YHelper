import {NgModule} from '@angular/core';
import {SharedModule} from 'shared/shared.module';
import {SearchComponent} from './search.component';
import {SearchHeaderComponent} from './search-header/search-header.component';
import {ShortcutListComponent} from './shortcut-list/shortcut-list.component';
import {ShortcutFormComponent} from './shortcut-form/shortcut-form.component';
import {ShortcutIconPipe} from 'helpers/pipes/shortcut-icon.pipe';
import {ShortcutTitlePipe} from 'helpers/pipes/shortcut-title.pipe';


@NgModule({
  declarations: [
    SearchComponent,
    SearchHeaderComponent,
    ShortcutListComponent,
    ShortcutFormComponent,
    ShortcutIconPipe,
    ShortcutTitlePipe,
  ],
  imports: [SharedModule],
  entryComponents: [
    ShortcutFormComponent
  ],
  providers: [
    ShortcutTitlePipe,
    ShortcutIconPipe,
  ],
})
export class SearchModule {
}
