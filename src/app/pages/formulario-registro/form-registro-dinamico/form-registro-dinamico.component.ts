import { Component, OnInit } from '@angular/core';
import { ApiPublicService } from '../../../rest-apis/public/api-public.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-registro-dinamico',
  templateUrl: './form-registro-dinamico.component.html',
  styleUrls: ['./form-registro-dinamico.component.css'],
})
export class FormRegistroDinamicoComponent implements OnInit {
  nombreModelo = 'categorias';

  constructor(private route: ActivatedRoute, private __ws: ApiPublicService) {}

  ngOnInit(): void {
    this.obtenerParamsRouter();

    this.obtenerColumnasByModelo(this.nombreModelo);
  }

  private obtenerParamsRouter() {
    this.route.params.subscribe((params) => {
      if (params['model'] == '') this.nombreModelo = 'categorias';
      this.nombreModelo = params['model'];
      if (this.nombreModelo == 'categorias') {
        this.onbtenerListaCategoriasPadres();
      }
    });
  }

  listaColumnas: ItemColumns[] = [];
  listaDB: ItemColumns[] = [];
  listaCategorias = [];
  listaCategoriasPadres = [];

  selectValueIMGBase64(ITEM_IMG: any) {
    // this.modo1();
    this.modo2(ITEM_IMG);
    this.estadoCarga = 0;
  }
  selectedImage: string | ArrayBuffer | null = null;
  imageBlobString: string | null = null;
  modo2(ITEM_IMG: any) {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpeg';

    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      // let files = Array.from(input.files);
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            this.selectedImage = reader.result;
            this.convertToBlobString(reader.result, ITEM_IMG);
            this.estadoCarga = 50;
          };
          reader.readAsDataURL(file);
        }
      }
    };
    input.click();
  }

  private convertToBlobString(
    dataUrl: string | ArrayBuffer | null,
    ITEM_IMG: any
  ): void {
    if (typeof dataUrl === 'string') {
      this.estadoCarga = 75;

      const byteString = atob(dataUrl.split(',')[1]);
      const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });

      // this.imageBlobString = this.blobToString(blob, ITEM_IMG);

      this.blobToBase64(blob, (base64String) => {
        this.imageBlobString = base64String;
        // this.sendImageBlob(base64String);
        ITEM_IMG.valor_columna = base64String;
        if (ITEM_IMG.valor_columna != '') this.estadoCarga = 100;
      });
    }
  }

  estadoCarga = 0;

  private blobToBase64(
    blob: Blob,
    callback: (base64String: string) => void
  ): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(blob);
  }

  private obtenerColumnasByModelo(categoria: string) {
    this.__ws.getColumnasByModelo(categoria).subscribe(
      (res: any) => {
        this.listaDB = [];
        this.listaColumnas = [];
        this.listaDB = res;
        this.listaDB.forEach((itemDB) => {
          if (
            itemDB['COLUMN_KEY'] != 'PRI' &&
            itemDB['tipo'] != 'date' &&
            itemDB['nombre'] != 'estado'
          ) {
            itemDB.valor_columna = '';
            this.listaColumnas.push(itemDB);
          }
        });

        if (this.nombreModelo == 'producto') {
          this.onbtenerListaCategorias();
        }
      },
      (err) => {
        alert(err.message);
      },
      () => {
        console.log('complete');
      }
    );
  }

  private onbtenerListaCategorias() {
    this.__ws.getListaCategoriasHijosPublic().subscribe((data: any) => {
      this.listaCategorias = data;
    });
  }

  onVerifcarFormularioClickListener() {
    this.sendSaveModelWS(this.createObjectModel());
  }

  error = 0;
  private createObjectModel() {
    let objectJsonString = '{';
    this.error = 0;
    this.listaColumnas.forEach((item, rowNumber) => {
      if (item.nombre != 'parent_id' && item.valor_columna.length > 0)
        this.error++;

      objectJsonString += `"${item.nombre}":"${item.valor_columna}"`;
      if (rowNumber < this.listaColumnas.length - 1) {
        objectJsonString += ',';
      }
    });
    objectJsonString += `}`;
    if (this.error > 0) return JSON.parse(objectJsonString);
    else return null;
  }

  onCancelarFormularioClickListener() {}

  private sendSaveModelWS(body: any) {
    if (body == null) {
      Swal.fire('Datos Incompletos al guardarDatos');
      return;
    }
    this.__ws.sendModelSave(this.nombreModelo, body).subscribe(
      (res: any) => {
        if (res.id > 0) {
          this.handlerSuccess(res);
        } else {
          this.handlerError();
        }
      },
      (err) => {
        alert(err.message);
      },
      () => {
        console.log('complete');
      }
    );
  }

  handlerError() {
    Swal.fire('Error al guardarDatos');
  }

  handlerSuccess(res: any) {
    let timerInterval: string | number | NodeJS.Timeout | undefined;
    Swal.fire({
      title: 'Acciones Correctas',
      html: 'Datos Guardados, recargando pagina',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }

  getTipoDatoInput(item: ItemColumns) {
    return item.tipo == 'decimal' || item.tipo == 'int' ? 'number' : 'text';
  }

  obtenerMaximoInput(item: ItemColumns) {
    let max_leght = item['max_length'];

    if (item.tipo == 'decimal' || item.tipo == 'int') {
      // @ts-ignore
      max_leght = item['NUMERIC_PRECISION'];
    }

    return max_leght;
  }

  verificarTipoInput(item: ItemColumns, tipoInput: string) {
    let isInput = false;

    if (tipoInput == 'inp') {
      if (
        item['max_length'] <= 150 &&
        item['nombre'] != 'tipo_unidad' &&
        item['nombre'] != 'id_categoria' &&
        item['nombre'] != 'parent_id' &&
        item['nombre'] != 'imgProducto'
      ) {
        isInput = true;
      }
    }
    if (tipoInput == 'sel') {
      if (item.nombre == 'id_categoria') {
        isInput = true;
      }
    }

    return isInput;
  }

  private onbtenerListaCategoriasPadres() {
    this.__ws.getListaCategoriasPadresPublic().subscribe((data: any) => {
      // let listaTemp=data
      this.listaCategoriasPadres = data;
    });
  }
}

export interface ItemColumns {
  nombre: string;
  COLUMN_KEY: string;
  tipo: string;
  max_length: number;
  valor_columna: string;
  IS_NULLABLE: string;
}
