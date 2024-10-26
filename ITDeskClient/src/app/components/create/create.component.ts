import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast'
import { HttpClientModule } from '@angular/common/http';
import {InputTextareaModule} from 'primeng/inputtextarea'
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [InputTextModule, CommonModule, FormsModule,FileUploadModule,ToastModule,HttpClientModule,InputTextareaModule],
  providers: [MessageService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  subject: string = ""
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) { }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
