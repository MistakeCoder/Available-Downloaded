import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PageInterface } from 'src/libs/interfaces/page';

@Component({
    selector: 'app-paginate',
    templateUrl: './paginate.component.html',
    styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {

    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;

    @Input() loading = false;
    @Input() page: PageInterface = {
        perPage: 10,
        total: 0,
        from: 0,
        to: 0,
        last: 0,
        current: 1
    };

    @Output('pageChange') pageChange = new EventEmitter<any>();

    pageSizeOptions: number[] = [20, 50, 100, 200, 500];

    constructor() {
    }

    onPageChange(event: any) {
        event.pageIndex = event.pageIndex + 1;
        this.pageChange.emit(event);
    }
}
