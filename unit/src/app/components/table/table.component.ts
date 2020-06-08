import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'slug', 'parent', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('dialogCancel') public dialogCancel: TemplateRef<any>;
  @ViewChild('dialogEdit') public dialogEdit: TemplateRef<any>;
  @Input() dataSource;
  data; 
  ngOnInit() {
    this.dataSource.paginator = this.paginator;  
    this.dataSource.sort = this.sort;  
  }
  
  constructor(public dialog: MatDialog, private apiService: APIService) {}
  
  openDialogEdit(el) {    
    this.data = Object.assign({}, el);    
    const dialogRef = this.dialog.open(this.dialogEdit);
    dialogRef.afterClosed().subscribe(result => {      
      if (result)
        this.apiService.post('category', result).subscribe(el => this.updateDatas())
    })
  }

  openDialogCancel(id) {    
    const dialogRef = this.dialog.open(this.dialogCancel);
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.apiService.delete('category', id).toPromise().then(x => this.updateDatas())
    });

  }

  updateDatas() {
    this.apiService.get('category').subscribe(data => this.dataSource.data = data)
  }

}