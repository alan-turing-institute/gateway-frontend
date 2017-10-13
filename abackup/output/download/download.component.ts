import { Component, OnInit, Input } from '@angular/core';
import { OutputService } from '../output.service';
import * as FileSaver from 'file-saver';

@Component({
    providers: [OutputService],
    selector: 'output-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.css']
})

export class DownloadComponent implements OnInit {

    @Input() data: any;
    private fileUrl: string;
    private downloadFilename: string;
    private buttonLabel: string;

    constructor(private outputService:OutputService) {}

    public ngOnInit(): void {
      this.fileUrl = this.data.destination_path;
      if (this.data.type=='interface') {
        this.downloadFilename = 'interface.stl'
        this.buttonLabel = 'Interface STL'
      } else if (this.data.type=='csv')  {
        this.downloadFilename = 'output.csv'
        this.buttonLabel = 'Diagnostics CSV'
      } else {
        this.downloadFilename = '_'
      }
    }

    private fileExtension() {

    }

    private downloadFile() {
      console.log('downloading data')
      this.outputService.downloadFile(this.fileUrl).subscribe(blob=>{
        FileSaver.saveAs(blob, this.downloadFilename)
      })
    }

}