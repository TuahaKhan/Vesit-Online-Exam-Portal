import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories = [];

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        //css
        this.categories = data;
        console.log(this.categories);
      },

      (error) => {
        //
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }
  deleteCategory(cId) {
    // console.log(cId);
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
       this._category.deleteCategory(cId).subscribe(
        (data)=>{
          this.categories=this.categories.filter((cat)=>cat.cid!=cId)
          Swal.fire('Success', 'Subject Deleted','success');
        },
        (error)=>{Swal.fire('Error', 'Error in deleting subject','error');
      }
        )
      }
    });
  }
}
