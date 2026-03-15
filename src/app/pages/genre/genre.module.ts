import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreRoutingModule } from './genre-routing.module';
import { GenreComponent } from './genre.component';
import { SharedModule } from '../../components/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [GenreComponent],
  imports: [CommonModule, GenreRoutingModule, SharedModule, InfiniteScrollModule],
})
export class GenreModule {}
