import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from 'src/pipes/safeHtml.pipe';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { PaginateComponent } from './paginate/paginate.component';

@NgModule({
  declarations: [
    TableComponent,
    PaginateComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule
  ],
  exports: [
    TableComponent,
    PaginateComponent,
    SafeHtmlPipe
  ]
})

export class TableModule { }
