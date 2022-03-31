import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/interface/empleado';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  empleados: any;
  accion: any;

  time: any;

  form: FormGroup
  selectedEmpleado: Empleado | undefined

  date: any;

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
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      primer_nombre: ["", [Validators.required, Validators.maxLength(20)]],
      otros_nombres: ["", [Validators.maxLength(50)]],
      primer_apellido: ["", [Validators.required, Validators.maxLength(20)]],
      segundo_apellido: ["", [Validators.required, Validators.maxLength(20)]],
      pais_empleo: ["", [Validators.required]],
      tipo_identificacion: ["", [Validators.required]],
      numero_identificacion: ["", [Validators.required, Validators.maxLength(20), Validators.pattern("^[a-zA-Z0-9-]{1,20}$")]],
      correo_electronico: ["", [Validators.required, Validators.maxLength(300), Validators.email]],
      fecha_ingreso: ["", [Validators.maxLength(255)]],
      nombre_area: ["", [Validators.required, Validators.maxLength(255)]],
      estado: ["", [Validators.required, Validators.maxLength(255)]],
    })

    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnInit() {
    this.getEmployes()
  }

  getEmployes() {
    this.empleadoService.obtener().subscribe((res: any) => {
      this.empleados = new MatTableDataSource<Empleado>(res.result);
      this.empleados.paginator = this.paginator;
    })
  }

  crear() {
    console.log("FINALIZAR");
  }

  modificar() {
    console.log("empleado");
  }

  delete(empleado: Empleado) {
    this.empleadoService.eliminar(empleado.numero_identificacion).subscribe((res: any) => { })
  }

  open(content: any, accion: any, empleado?: any) {
    this.accion = accion
    this.resetForm(empleado)

    this.date = new FormControl(new Date(empleado.fecha_ingreso))

    this.modalService.open(
      content,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
        scrollable: true
      }
    ).result.then((result) => {
      console.log(`result: ${result}`);
    }, (reason) => {
      console.log(reason);
    });
  }

  resetForm(selectedEmpleado: Empleado | undefined = undefined) {
    if (selectedEmpleado == undefined) {
      this.selectedEmpleado = undefined
      this.form.reset()
    } else {
      this.form.get("primer_nombre")?.setValue(selectedEmpleado?.primer_nombre);
      this.form.get("otros_nombres")?.setValue(selectedEmpleado?.otros_nombres);
      this.form.get("primer_apellido")?.setValue(selectedEmpleado?.primer_apellido);
      this.form.get("segundo_apellido")?.setValue(selectedEmpleado?.segundo_apellido);
      this.form.get("pais_empleo")?.setValue(selectedEmpleado?.pais_empleo);
      this.form.get("tipo_identificacion")?.setValue(selectedEmpleado?.tipo_identificacion);
      this.form.get("numero_identificacion")?.setValue(selectedEmpleado?.numero_identificacion);
      this.form.get("correo_electronico")?.setValue(selectedEmpleado?.correo_electronico);
      this.form.get("fecha_ingreso")?.setValue(selectedEmpleado?.fecha_ingreso);
      this.form.get("nombre_area")?.setValue(selectedEmpleado?.nombre_area);
      this.form.get("estado")?.setValue(selectedEmpleado?.estado);
      this.form.get("fecha_registro")?.setValue(selectedEmpleado?.fecha_registro);
      this.form.get("fecha_edicion")?.setValue(selectedEmpleado?.fecha_edicion);
    }
  }


}
