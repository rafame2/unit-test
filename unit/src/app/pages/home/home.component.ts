import { Component, TemplateRef, ViewChild } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dataSource = new MatTableDataSource()
  @ViewChild('dialogAdd') public dialogAdd: TemplateRef<any>;
  data = new Category;

  constructor(private apiService: APIService, public dialog: MatDialog) {
    this.updateData()
  }

  openDialogAdd() {    
    const dialogRef = this.dialog.open(this.dialogAdd);
    dialogRef.afterClosed().subscribe(result => {    
      
      if (result)
        this.apiService.post('category', result).subscribe(x => this.updateData())
    })
  }

  updateData() {
    this.apiService.get('category').subscribe((data: []) =>  this.dataSource.data = data )
  }
}