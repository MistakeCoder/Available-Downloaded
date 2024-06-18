import { Component } from '@angular/core';
import { DownloadDataService } from './download-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download-data',
  templateUrl: './download-data.component.html',
  styleUrls: ['./download-data.component.scss']
})
export class DownloadDataComponent {
  download_source_id: any = '';
  downloadPoint: any;
  downloadSources: any;
  download_source_link: string = '';
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    public downloadDataService: DownloadDataService,
    private fb: FormBuilder,
    public messageService: MessageService,
  ) {

  }



  ngOnInit(): void {

    this.form = this.fb.group({
      download_source_id: this.download_source_id,
      download_source_link: null
    });

    this.getDownloadPoint();
    this.getDownloadSources();
  }


  onCheckedRadioButton(event: any) {
    this.form.get('download_source_id')?.patchValue(parseInt(event));
  }

  getDownloadPoint() {
    this.setLoading(true);
    this.downloadDataService.getDownloadPoint().subscribe(res => {
      if (res.status) {
        this.downloadPoint = res.data;
        this.setLoading(false);
      }
    })
  }

  getDownloadSources() {
    this.setLoading(true);
    this.downloadDataService.getDownloadSources().subscribe(res => {
      if (res.status) {
        this.downloadSources = res.data;
        this.setLoading(false);
      }
    });
  }

  onSubmit() {
    this.setLoading(true);
    const valueForm = this.form.value;

    this.downloadDataService.downloadResources(valueForm).subscribe(res => {
      if (res.status) {

        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: res.message });
        this.download(res.data.link);

      } else {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
      }
      this.setLoading(false);
    })
  }


  download(filePath: string, fileName: string = 'downloaded_file', target: string = '_blank'): void {
    const objectUrl = filePath;
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    a.target = target;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }


  /**
   * Set trạng thái loading cho trang
   * @param loadingStatus
   */
  setLoading(loadingStatus: boolean) {
    this.loading = loadingStatus;
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = loadingStatus ? 'flex' : 'none';
    }
  }

}
