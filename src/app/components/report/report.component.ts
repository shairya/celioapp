import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/api/api.service';
import { ExportToCsv } from 'export-to-csv';
import { environment } from 'src/environments/environment';
declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  loader = false;
  errorMessage = '';
  selected : {startDate: Date, endDate: Date};
  reportType = new Array();
  fileType = '';
  maxDate = new Date();
  downloadFileName = 'SIS-Sale.csv';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.reportType.push('Sale');
    this.reportType.push('Stock');
  }

  getFileType(e) {
    this.fileType = e.target.value;
  }

  getDate() {
    this.errorMessage = '';
    const options = { 
      fieldSeparator  : ',',
      quoteStrings    : '"',
      decimalSeparator: '.',
      filename        : '',
      showLabels      : true, 
      showTitle       : false,
      useTextFile     : false,
      useBom          : true,
      useKeysAsHeaders: false,
      headers         : ["Channel","Code","Trn Date","Ean Code","Product Cost","MRP","Sales Qty","Cost of Sales Amt","Gross Sales","Disc Amt","Net Sales","Tax","Net Margin","Original Location Code","Original Location"]
    };
    if(this.fileType=='Stock') {
      options.filename = 'SIS-SOH';
      options.headers = ["Location","Date","Barcode No","Quantity","Original Location Code","Original Location"];
    } else if(this.fileType=='Sale') {
      options.filename = 'SIS-Sale';
      options.headers = ["Channel","Code","Trn Date","Ean Code","Product Cost","MRP","Sales Qty","Cost of Sales Amt","Gross Sales","Disc Amt","Net Sales","Tax","Net Margin","Original Location Code","Original Location"];
    }
    
    if(this.fileType=='') {
      this.errorMessage = 'Select report type';
    } else if(this.selected.startDate) {
      this.loader = true;
      var fromDate = moment(this.selected.startDate.valueOf()).format('YYYY-MM-DD');
      var toDate = moment(this.selected.endDate.valueOf()).format('YYYY-MM-DD');
      var daterange = fromDate+':' + toDate;
      var a = [];
      if (daterange) {
        this.apiService.getReportData(daterange, this.fileType).subscribe((response: any) => {
          if(response.status === 200 && response.data.length) {
            const data = response.data ? response.data : '';
            const filename = response.filename;
            if(this.fileType=='Stock') {
              this.loader = false;
              FileSaver.saveAs(environment.apiUrl+'/stockfiles/SIS-SOH.csv', 'SIS-SOH.csv');
            } else {
              this.loader = false;
              FileSaver.saveAs(environment.apiUrl + '/stockfiles/SIS-Sale.csv', 'SIS-Sale.csv');
            }
          } else {
            let e = {channel:'No record found!'};
            a.push(e);
            this.loader = false;
            const csvExporter = new ExportToCsv(options);
            csvExporter.generateCsv(a);
          }
        });
      } else {
        let e = {channel:'No record found!'};
        a.push(e);
        this.loader = false;
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(a);
      }
    } else {
      this.errorMessage = 'Invalid date range';
    }
  }
}
