import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/interface/empleado';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  empleados: any;

  displayedColumns: string[] = [
    'primer_nombre',
    'otros_nombres',
    'primer_apellido',
    'segundo_apellido',
    'pais_empleo',
    'tipo_identificacion',
    'numero_identificacion',
    'correo_electronico',
    'fecha_ingreso',
    'nombre_area',
    'estado',
    'accion'
  ];


  constructor(
    private empleadoService: EmpleadoService,
  ) { }

  async ngOnInit() {
    this.empleadoService.obtener().subscribe((res: any) => {
      console.log(res.result);
      this.empleados = new MatTableDataSource<Empleado>(res.result);
      this.empleados.paginator = this.paginator;
    })
  }

  async getEmployes() {
    const result = await this.empleadoService.obtener()
    console.log(result);
  }

  edit(empleado: Empleado){
    console.log(empleado);
  }


  delete(empleado: Empleado){
    console.log(empleado);
  }
}
