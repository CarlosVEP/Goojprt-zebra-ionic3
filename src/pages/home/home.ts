import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PrinterService} from '../../servicios/printer.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private datecs: PrinterService) {
    
  }
  public mostrarDispositivos(): void{
    this.datecs.listBluetoothDevices().then(res=>{
      console.log('Resultados: ',res);
    }).catch(error=>{
      console.log('errorsillo: ',error);
    });
  }
  public conectarse(): void{
    //this.datecs.connect('A4:DA:32:85:6E:87').then(res=>{
    this.datecs.connect('02:30:84:CF:48:B2').then(res=>{
      console.log('conexión: ',res);
    }).catch(err=>{
      console.log('error conexion: ',err);
    });
  }
  public imprimir(): void{
    const textoZebra = `
    ^XA
    ^FX
    ^CFA,15
    ^FO20,20^FH_^FDTEXTO DE INFORMACIA_e0N^FS
    ^CFA,20
    ^FO60,50^FH_^FDDIRECCI_e0N DE GESTI_e0N DE MOVILIDAD^FS
    ^FO220,80^FDURBANA^FS
    ^CFA,25
    ^FO70,110^FH_^FDBOLETA DE INFRACCI_e0N^FS
    ^CFA,20
    ^FO20,140^FDFecha registro: ^FS
    ^FO20,170^FD27-07-2022   16:05:23^FS
    ^CFA,35
    ^FO20,200^FH_^FDCOD: Nro 12345^FS
    ^CFA,20
    ^FO10,240^FH_^FDIDENTIFICACI_e0N DEL CONTRIBUYENTE:^FS
    ^FO10,270^FH_^FDJuan Ramirez L_eopez ^FS
    ^FO10,300^FH_^FDIdentificaci_eon del veh_eiculo:^FS
    ^FO10,330^FH_^FDPlaca: 123xxx^FS
    ^FO0,360^FH_^FDINFRACCI_e0N COMETIDA:^FS
    ^FO0,390^FB580,15,1,J^FH_^FDD.M. 307/2022 Art. 101, 11 \\& Estacionar en v_eias de señalizadas con prohibici_eon de estacionamiento.^FS
    ^CFA,20
    ^FO10,510^FB600,15,2,L^FH_^FDMONTO DE LA MULTA: 255 Bs.
      \\&SON Doscientos cincuenta y cinco bolivianos
    ^FS
    ^FO140,555
    ^BQN,2,10
    ^FDMM,AAVillca Pancho José 12345^FS
    ^FS
    ^FO0,830^FB580,16,1,J^FH_^FD
    \\&\\&La presente, se constituye en instrumento legal, cuyo incumplimiento ser_ea sancionado D.M. 144/2019.
      ^FS
    ^XZ
    `;
    const textoGOOJPRT = `
    Hola mundo desde Ionic 3
    `
    this.datecs.printText(textoGOOJPRT).then(res=>{
      console.log('print: ',res);
    }).catch(error=>{
      console.log('error print: ',error);
    });
  }
}
