import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CreateComponent } from '../create/create.component';
import { DialogModule } from 'primeng/dialog';
import { TicketModel } from '../../models/ticket.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, TableModule, TagModule, InputTextModule, ButtonModule, DynamicDialogModule, DialogModule],
  providers: [DialogService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  tickets: TicketModel[] = [];
  ref: DynamicDialogRef | undefined;

  customers: any[] = [
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "Feltz Printing Service",
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "Feltz Printing Service",
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Balgeria",
        "code": "dz"
      },
      "company": "Feltz Printing Service",
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "Feltz Printing Service",
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "Feltz Printing Service",
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "Feltz Printing Service",
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "Feltz Printing Service",
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    }
  ];
  selectedCustomers!: any;

  constructor(

    public dialogService: DialogService,
    public messageService: MessageService,
    private error: ErrorService,
    private http: HttpClient,
    private auth: AuthService) { }


  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http.get("https://localhost:7292/api/Tickets/GetAll", {
      headers: {
        "Authorization": "Bearer " + this.auth.tokenString
      }
    })
      .subscribe({
        next: (res: any) => {
          this.tickets = res
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      })
  }

  show() {
    this.ref = this.dialogService.open(CreateComponent, {
      header: 'Yeni Destek Oluştur',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.http.post("https://localhost:7292/api/Tickets/Add", data, {
          headers: {
            "Authorization": "Bearer " + this.auth.tokenString
          }
        })
          .subscribe({
            next: (res: any) => {
              this.getAll();
              this.messageService.add({ severity: 'success', summary: 'Destek Talebi başarıyla açıldı.', detail: '' });
            },
            error: (err: HttpErrorResponse) => {
              this.error.errorHandler(err);
              ;
            }
          })
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }


}
