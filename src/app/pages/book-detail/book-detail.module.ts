import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailRoutingModule } from './book-detail-routing.module';
import { BookDetailComponent } from './book-detail.component';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [BookDetailComponent],
  imports: [CommonModule, BookDetailRoutingModule, SharedModule],
})
export class BookDetailModule {}
