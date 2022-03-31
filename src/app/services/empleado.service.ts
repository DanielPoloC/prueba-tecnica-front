import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Empleado } from '../interface/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http: HttpClient
  ) { }

  obtener() {
    return this.http.get(environment.domain + environment.apis.obtener)
  }

  crear(body: Empleado) {
    return this.http.post(environment.domain + environment.apis.crear, body)
  }

  eliminar(identificacion: any) {
    return this.http.delete(environment.domain + `/${identificacion}` + environment.apis.eliminar)
  }

  modificar(body: Empleado) {
    return this.http.put(environment.domain + environment.apis.modificar, body)
  }

}
