import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CreateComponent } from '../create/create.component';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, TableModule, TagModule, InputTextModule, ButtonModule, DynamicDialogModule,DialogModule],
  providers:[DialogService,MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
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


  ngOnInit() {

  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return 'danger';
      default:
        return 'danger'
    }
  }

  constructor(public dialogService: DialogService, public messageService: MessageService) { }

  ref: DynamicDialogRef | undefined;

  show() {
    this.ref = this.dialogService.open(CreateComponent, {
      header: 'Yeni Destek Oluştur',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex:10000,
      maximizable:false
    });

    this.ref.onClose.subscribe((data: any) => {
      let summary_and_detail;
      if (data) {
        const buttonType = data?.buttonType;
        summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data };
      } else {
        summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
      }
      this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
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
