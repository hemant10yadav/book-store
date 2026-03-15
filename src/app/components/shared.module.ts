import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewArrivalWidgetComponent } from './new-arrival-widget/new-arrival-widget.component';
import { RatingComponent } from './rating/rating.component';
import { WishListButtonComponent } from './wish-list-button/wish-list-button.component';
import { HemantSliderComponent } from './hemant-slider/hemant-slider.component';
import { BookWidgetComponent } from './book-widget/book-widget.component';
import { PopularWidgetComponent } from './popular-widget/popular-widget.component';
import { AppFooterComponent } from './my-footer/app-footer.component';
import { AgeWidgetComponent } from './browse-by-age/age-widget.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { SearchWidgetComponent } from './search-widget/search-widget.component';

@NgModule({
  declarations: [
    NewArrivalWidgetComponent,
    RatingComponent,
    WishListButtonComponent,
    HemantSliderComponent,
    AgeWidgetComponent,
    BookWidgetComponent,
    PopularWidgetComponent,
    AppFooterComponent,
    PageLoaderComponent,
    SearchWidgetComponent,
  ],
  exports: [
    NewArrivalWidgetComponent,
    RatingComponent,
    WishListButtonComponent,
    HemantSliderComponent,
    AgeWidgetComponent,
    BookWidgetComponent,
    PopularWidgetComponent,
    AppFooterComponent,
    PageLoaderComponent,
    SearchWidgetComponent,
    RouterModule,
  ],
  imports: [CommonModule, NgOptimizedImage, RouterModule],
})
export class SharedModule {}
