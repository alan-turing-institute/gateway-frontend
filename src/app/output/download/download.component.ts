import { Component, OnInit, Input } from '@angular/core';
import { OutputService } from '../output.service';
import * as FileSaver from 'file-saver';
import "clarity-icons";

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
      switch (this.data.output_type) {
        case 'interface': {
          this.downloadFilename = 'interface.stl'
          this.buttonLabel = 'Interface (.stl)'
          break;
        }
        case 'csv': {
          this.downloadFilename = 'output.csv'
          this.buttonLabel = 'Diagnostics (.csv)'
          break;
        }
        case 'video': {
          this.downloadFilename = 'video.mp4'
          this.buttonLabel = 'Video (.mp4)'
          break;
        }
        case 'zip': {
          this.downloadFilename = 'siMulate.zip'
          this.buttonLabel = 'Zip (.zip)'
          break;
        }
        default: {
          this.downloadFilename = "Unknown file type"
        }
      }
    }

    private fileExtension() {

    }

    private downloadFile() {
      console.log('downloading data')
      // this.outputService.downloadFile(this.fileUrl).subscribe(blob=>{
      //   FileSaver.saveAs(blob, this.downloadFilename)
      // })
      this.outputService.getFileAccess().subscribe(access=> {
        console.log(access);
        this.outputService.downloadFile(access[0].destination_path).subscribe(blob=> {
          FileSaver.saveAs(blob, this.downloadFilename)
        },
        error => {
          console.log ("File not downloaded.");
        });
      },
      error => {
        console.log ("No access to file");
      });
    }

}
