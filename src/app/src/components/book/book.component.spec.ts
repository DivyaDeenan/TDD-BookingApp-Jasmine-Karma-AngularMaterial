import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { spyOnClass } from 'jasmine-es6-spies';
import { BookComponent } from './book.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData;
  let dataService: DataService;
  let dialogRefService: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let snackBarService: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,HttpClientModule,MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule],
       declarations: [ BookComponent ],
        providers: [
          { provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef) },
          { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) },
          { provide: MAT_DIALOG_DATA, useValue: {} }
          ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    dataService = TestBed.get(DataService);
    dialogRefService = TestBed.get(MatDialogRef);
    snackBarService = TestBed.get(MatSnackBar);
    component = fixture.componentInstance;
    const homes = require('../../../../assets/homes.json');
    dialogData.home = homes[0];
    fixture.detectChanges();
  });

  it('should show title', () => {
    const title =  fixture.nativeElement.querySelector('[data-test="title"]');
    expect(title.textContent).toContain("Book Home 1");
  });
  it('should show price', () => {
    const price =  fixture.nativeElement.querySelector('[data-test="price"]');
    expect(price.textContent).toContain("$125 per night");
  });
  it('should show check in dt', () => {
    const checkIn =  fixture.nativeElement.querySelector('[data-test="checkIn"]');
    expect(checkIn).toBeTruthy();
  });
  it('should show check out dt', () => {
    const checkOut =  fixture.nativeElement.querySelector('[data-test="checkOut"]');
    expect(checkOut).toBeTruthy();
  });
  it('should show total', () => {
    const checkIn =  fixture.nativeElement.querySelector('[data-test="checkIn"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));
    const checkOut =  fixture.nativeElement.querySelector('[data-test="checkOut"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const total =  fixture.nativeElement.querySelector('[data-test="total"]');
    expect(total.textContent).toContain("Total: $375");
  });
  it('should show -- for total when dates are invalid', () => {
    const checkIn =  fixture.nativeElement.querySelector('[data-test="checkIn"] input');
    checkIn.value = '';
    checkIn.dispatchEvent(new Event('input'));
    const checkOut =  fixture.nativeElement.querySelector('[data-test="checkOut"] input');
    checkOut.value = '';
    checkOut.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const total =  fixture.nativeElement.querySelector('[data-test="total"]');
    expect(total.textContent).toContain("--");
  });
  it('should show book button', () => {
    const bookBtn =  fixture.nativeElement.querySelector('[data-test="book-btn"] button');
    expect(bookBtn).toBeTruthy();
     });
  it('should book home after clicking the book button', () => {
     spyOn(dataService,'bookHome$').and.returnValue(of(null));
    const bookBtn =  fixture.nativeElement.querySelector('[data-test="book-btn"]');
    expect(bookBtn).toBeTruthy();
    const checkIn =  fixture.nativeElement.querySelector('[data-test="checkIn"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));
    const checkOut =  fixture.nativeElement.querySelector('[data-test="checkOut"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const bookButton =  fixture.nativeElement.querySelector('[data-test="book-btn"] button');
    bookButton.click();
    expect(dataService.bookHome$).toHaveBeenCalled();

  });
  it('should close dialog after clicking the book button and show notiication', () => {
    spyOn(dataService,'bookHome$').and.returnValue(of(null));
   
    const bookBtn =  fixture.nativeElement.querySelector('[data-test="book-btn"]');
    expect(bookBtn).toBeTruthy();
    const checkIn =  fixture.nativeElement.querySelector('[data-test="checkIn"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));
    const checkOut =  fixture.nativeElement.querySelector('[data-test="checkOut"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const bookButton =  fixture.nativeElement.querySelector('[data-test="book-btn"] button');
    bookButton.click();
    expect(dialogRefService.close).toHaveBeenCalled();
    expect(snackBarService.open).toHaveBeenCalled();
  });
});
