import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  })
export class BookComponent implements OnInit {

  checkIn;
  checkOut;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dataService:DataService,
  public dialogRefService:MatDialogRef<BookComponent>,
  public snackBarService: MatSnackBar) { }

  ngOnInit(): void {
    
  }

  calculateTotal(checkIn,checkOut){
    const checkInDt = moment(checkIn,'MM-DD-YY');
    const checkOutDt = moment(checkOut,'MM-DD-YY');
    
    const nights = checkOutDt.diff(checkInDt,'days');
    const total = nights * this.data.home.price;

    if (total > 0 && total < 900000) {
      return '$' + total;
    } else {
      return '--';
    }
  }
  bookHome(){
    this.dataService.bookHome$().subscribe(()=>{
     this.dialogRefService.close();
     this.snackBarService.open('Booking Confirmed',null,{duration:2000});
    });
  }

}
