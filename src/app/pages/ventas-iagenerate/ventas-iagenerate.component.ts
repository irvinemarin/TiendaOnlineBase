import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { ApiService } from './api/api-service.service';

interface Categoria {
  id: number;
  nombre: string;
  idPadre?: number;
}

interface Producto {
  id: number;
  nombre: string;
  idCategoria?: number;
}

@Component({
  selector: 'app-ventas-iagenerate',
  templateUrl: './ventas-iagenerate.component.html',
  styleUrls: ['./ventas-iagenerate.component.css'],
})
export class VentasIAGenerateComponent implements OnInit {
  categorias: Categoria[] | any[] = [];
  categoriasPadres: Categoria[] | any[] = [];
  categoriasHijos: Categoria[] | any[] = [];
  productos: Producto[] = [];

  // Variables para el formulario de categoría
  nuevaCategoria: Categoria = { id: 0, nombre: '', idPadre: -1 };
  categoriaSeleccionada: Categoria | any = null;

  // Variables para el formulario de producto
  nuevoProducto: Producto = { id: 0, nombre: '', idCategoria: 0 };

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.apiService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;

        this.categorias.forEach((dbItem) => {
          if (dbItem.idPadre == -1) this.categoriasPadres.push(dbItem);
        });
        // this.categoriasPadres = data;

        this.categoriasPadres.forEach((parent) => {
          parent['expanded'] = false;
          parent.categoriasHijos = [];
          this.categorias.forEach((dbItem) => {
            if (parent.id == dbItem.idPadre)
              parent.categoriasHijos.push(dbItem);
          });
        });
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  obtenerProductosPorCategoria(idCategoria: number) {
    this.apiService.obtenerProductosPorCategoria(idCategoria).subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos por categoría:', error);
      }
    );
  }

  // CRUD para categorías
  crearCategoria() {
    this.apiService.crearCategoria(this.nuevaCategoria).subscribe(
      (data: Categoria) => {
        this.categorias.push(data);
        this.nuevaCategoria = { id: 0, nombre: '', idPadre: -1 };
      },
      (error) => {
        console.error('Error al crear categoría:', error);
      }
    );
  }

  actualizarCategoria() {
    if (this.categoriaSeleccionada) {
      this.apiService
        .actualizarCategoria(
          this.categoriaSeleccionada.id,
          this.categoriaSeleccionada
        )
        .subscribe(
          () => {
            // Actualizar la lista de categorías después de la actualización
            this.obtenerCategorias();
            this.categoriaSeleccionada = null;
          },
          (error) => {
            console.error('Error al actualizar categoría:', error);
          }
        );
    }
  }

  eliminarCategoria(idCategoria: number) {
    this.apiService.eliminarCategoria(idCategoria).subscribe(
      () => {
        // Actualizar la lista de categorías después de la eliminación
        this.obtenerCategorias();
        this.productos = []; // Limpiar la lista de productos
      },
      (error) => {
        console.error('Error al eliminar categoría:', error);
      }
    );
  }

  // CRUD para productos
  crearProducto() {
    this.apiService.crearProducto(this.nuevoProducto).subscribe(
      (data: Producto) => {
        this.productos.push(data);
        this.nuevoProducto = {
          id: 0,
          nombre: '',
          idCategoria: this.categoriaSeleccionada?.id,
        };
      },
      (error) => {
        console.error('Error al crear producto:', error);
      }
    );
  }

  actualizarProducto() {
    // Implementa la actualización de productos si es necesario
  }

  eliminarProducto(idProducto: number) {
    // Implementa la eliminación de productos si es necesario
  }

  obtenerNombreCategoriaPadre(idPadre: number): string {
    // alert(idPadre);
    const categoriaPadre = this.categorias.find(
      (categoria) => categoria.id == idPadre
    );
    return categoriaPadre ? categoriaPadre.nombre : 'Sin Padre';
  }

  eliminarDatos(): void {
    this.apiService.eliminarDatos();
    // También puedes reiniciar tus variables locales si es necesario
    this.categorias = [];
    this.productos = [];
  }

  eliminarCategorias(): void {
    // Lógica para eliminar categorías
    this.apiService.eliminarCategorias().subscribe(() => {
      // Actualizar la lista de categorías después de eliminar
      this.obtenerCategorias();
    });
  }

  eliminarProductos(): void {
    // Lógica para eliminar productos
    this.apiService.eliminarProductos().subscribe(() => {
      // Obtener productos después de eliminar
      if (this.categoriaSeleccionada) {
        this.obtenerProductosPorCategoria(this.categoriaSeleccionada.id);
      }
    });
  }

  nuevaCategoriaModal: any = {}; // Variable para el formulario de nueva categoría
  nuevoProductoModal: any = {}; // Variable para el formulario de nuevo producto

  constructor(private apiService: ApiService) {}

  // Funciones para abrir y cerrar los modals
  mostrarModal(idModal: string): void {
    const modal = document.getElementById(idModal);
    if (modal) {
      modal.classList.add('is-visible');
    }
  }

  ocultarModal(idModal: string): void {
    const modal = document.getElementById(idModal);
    if (modal) {
      modal.classList.remove('is-visible');
    }
  }

  // Funciones para crear categoría y producto
  crearCategoriaModal(): void {
    // Lógica para crear categoría desde nuevaCategoriaModal
    this.nuevaCategoriaModal.idPadre = parseInt(
      this.nuevaCategoriaModal.idPadre
    );

    this.apiService.crearCategoria(this.nuevaCategoriaModal).subscribe(() => {
      // Actualizar la lista de categorías después de crear
      this.obtenerCategorias();
      // Cerrar el modal
      this.ocultarModal('agregarCategoriaModal');
    });
  }

  crearProductoModal(): void {
    // Lógica para crear producto desde nuevoProductoModal
    this.apiService.crearProducto(this.nuevoProductoModal).subscribe(() => {
      // Actualizar la lista de productos después de crear
      if (this.categoriaSeleccionada) {
        this.obtenerProductosPorCategoria(this.categoriaSeleccionada.id);
      }
      // Cerrar el modal
      this.ocultarModal('agregarProductoModal');
    });
  }
}
