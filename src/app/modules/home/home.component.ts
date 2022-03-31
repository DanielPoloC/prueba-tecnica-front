import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/interface/empleado';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  empleados: any;
  accion: any;

  displayedColumns: string[] = [
    'id',
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
    // 'fecha_registro',
    // 'fecha_edicion',
    'accion'
  ];


  constructor(
    private empleadoService: EmpleadoService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getEmployes()
  }

  getEmployes() {
    this.empleadoService.obtener().subscribe((res: any) => {
      this.empleados = new MatTableDataSource<Empleado>(res.result);
      this.empleados.paginator = this.paginator;
    })
  }

  edit(empleado: Empleado) {
    console.log(empleado);
  }

  delete(empleado: Empleado) {
    this.empleadoService.eliminar(empleado.numero_identificacion).subscribe((res: any) => { })
  }

  modalEmpleado(content: any, accion: string) {
    this.accion = accion
    this.modalService.open(
      content,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
        scrollable: true
      }
    ).result.then((result) => {
      console.log(`result: ${result}`);
    });
  }
}
