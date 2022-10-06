import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class PrinterService {
  private win: any;
  private defaultTimeout: Number = 100;

  constructor(private platform: Platform) {
    this.win = window;
    this.platform.ready().then(() => {
      if (this.win.cordova && !this.win.DatecsPrinter) {
        console.warn("DatecsPrinter plugin is missing. Have you installed the plugin? \nRun 'cordova plugin add cordova-plugin-datecs-printer'");
      }
    });
  }

  listBluetoothDevices() {
    return new Promise<any>((resolve, reject) => {
      this.win.DatecsPrinter.listBluetoothDevices((success) => resolve(success), (error) => reject(error));
    });
  }

  connect(deviceAddress: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => this.win.DatecsPrinter.connect(deviceAddress, (success) => resolve(success), (error) => reject(error)), this.defaultTimeout);
    });
  }

  disconnect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.win.DatecsPrinter.disconnect((success) => resolve(success), (error) => reject(error))
    });
  }

  feedPaper(lines: Number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.win.DatecsPrinter.feedPaper(lines, (success) => resolve(success), (error) => reject(error));
    });
  }

  printText(text: string, charset: string = 'ISO-8859-1'): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.win.DatecsPrinter.printText(text, charset, (success) => resolve(success), (error) => reject(error));
    });
  }
}
