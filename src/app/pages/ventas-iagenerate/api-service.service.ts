import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private categoriasKey = 'categorias';
  private productosKey = 'productos';

  private obtenerCategoriasDesdeLocalStorage(): any[] {
    return this.obtenerDesdeLocalStorage(this.categoriasKey);
  }

  private obtenerProductosDesdeLocalStorage(): any[] {
    return this.obtenerDesdeLocalStorage(this.productosKey);
  }

  private guardarCategoriasEnLocalStorage(categorias: any[]): void {
    localStorage.setItem(this.categoriasKey, JSON.stringify(categorias));
  }

  private guardarProductosEnLocalStorage(productos: any[]): void {
    localStorage.setItem(this.productosKey, JSON.stringify(productos));
  }

  obtenerCategorias(): Observable<any> {
    return of(this.obtenerCategoriasDesdeLocalStorage());
  }

  private localStorageKeyPrefix = 'mi_app_'; // Puedes cambiar esto a algo más específico

  private obtenerDesdeLocalStorage<T>(tabla: string): T[] {
    const key = this.localStorageKeyPrefix + tabla;
    const datosStr = localStorage.getItem(key);

    console.table(datosStr);

    return datosStr ? JSON.parse(datosStr) : [];
  }

  // crearCategoria(categoria: any): Observable<any> {
  //   const categorias = this.obtenerCategoriasDesdeLocalStorage();
  //   // Obtener el último ID y realizar el incremento
  //   const ultimoId = this.buscarUltimoId();
  //   const nuevoId = this.incrementarId(ultimoId);
  //   // Asignar el nuevo ID a la categoría
  //   categoria.id = nuevoId;
  //   // Agregar la nueva categoría al array y guardar en Local Storage
  //   categorias.push(categoria);
  //   this.guardarCategoriasEnLocalStorage(categorias);
  //   return of(categoria);
  // }

  private guardarEnLocalStorage<T>(tabla: string, datos: T[]): void {
    const key = this.localStorageKeyPrefix + tabla;
    localStorage.setItem(key, JSON.stringify(datos));
  }

  private buscarUltimoId<T>(tabla: string): number {
    const datos: any = this.obtenerDesdeLocalStorage<T>(tabla);
    if (datos.length === 0) {
      return 0; // Si no hay elementos, empieza desde el ID 0
    }
    return datos[datos.length - 1].id;
  }

  private incrementarId(id: number): number {
    return id + 1;
  }

  private registrarElemento<T>(tabla: string, elemento: T) {
    const datos = this.obtenerDesdeLocalStorage<T>(tabla);

    // Obtener el último ID y realizar el incremento
    const ultimoId = this.buscarUltimoId<T>(tabla);
    const nuevoId = this.incrementarId(ultimoId);

    // Asignar el nuevo ID al elemento
    (elemento as any).id = nuevoId;

    // Agregar el nuevo elemento al array y guardar en Local Storage
    datos.push(elemento);
    this.guardarEnLocalStorage<T>(tabla, datos);
    return of(elemento);
  }

  crearCategoria(categoria: any) {
    return this.registrarElemento<any>(this.categoriasKey, categoria);
  }

  crearProducto(producto: any) {
    return this.registrarElemento<any>(this.productosKey, producto);
  }

  actualizarCategoria(id: number, categoria: any): Observable<any> {
    const categorias = this.obtenerCategoriasDesdeLocalStorage();
    const index = categorias.findIndex((c) => c.id === id);
    if (index !== -1) {
      categorias[index] = { ...categorias[index], ...categoria };
      this.guardarCategoriasEnLocalStorage(categorias);
      return of(categorias[index]);
    }
    return of(null);
  }

  eliminarCategoria(id: number): Observable<any> {
    const categorias = this.obtenerCategoriasDesdeLocalStorage();
    const index = categorias.findIndex((c) => c.id === id);
    if (index !== -1) {
      const categoriaEliminada = categorias.splice(index, 1)[0];
      this.guardarCategoriasEnLocalStorage(categorias);
      return of(categoriaEliminada);
    }
    return of(null);
  }

  obtenerProductosPorCategoria(idCategoria: number): Observable<any> {
    const productos: any = this.obtenerDesdeLocalStorage(this.productosKey);

    const productosFiltrados = productos.filter(
      (p: any) => p.idCategoria == idCategoria
    );
    return of(productosFiltrados);
  }

  eliminarDatos(): void {
    localStorage.removeItem(this.categoriasKey);
    localStorage.removeItem(this.productosKey);
  }

  eliminarCategorias(): Observable<any> {
    const categorias: any[] = [];
    // Limpiar el LocalStorage o realizar cualquier lógica específica
    localStorage.setItem('categorias', JSON.stringify(categorias));
    return of(true);
  }

  eliminarProductos(): Observable<any> {
    const productos: any[] = [];
    // Limpiar el LocalStorage o realizar cualquier lógica específica
    localStorage.setItem('productos', JSON.stringify(productos));
    return of(true);
  }
}
