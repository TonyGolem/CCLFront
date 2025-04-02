import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConsumoHTTPService } from '../../../services/content/consumo-http.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { infoInventario, formGroupValidatorRegistrarMovimiento, infoRegistrarMovimiento } from '../../../models/content/inventario.interfaces';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  imports: [ToastModule, ConfirmDialogModule, ToolbarModule, ButtonModule, TableModule, InputTextModule, TooltipModule, DialogModule, InputNumberModule, ReactiveFormsModule],
  providers: [MessageService, ConfirmationService],
  standalone: true,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {

  consumoHTTPService: ConsumoHTTPService = inject(ConsumoHTTPService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  listadoInventario: infoInventario[] = [];
  @ViewChild('dt') dt: Table | undefined;

  MovimientoDialog: boolean = false;
  elementoAModificar!: infoInventario;
  tipoMovimiento!: string;

  formGroupRegistrarMovimiento: FormGroup<formGroupValidatorRegistrarMovimiento> = new FormGroup<formGroupValidatorRegistrarMovimiento>({
    idproducto: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    nombreproducto: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    cantidadproducto: new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  });


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.consumoHTTPService.obtenerInventario().subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Inventario cargado', detail: 'El inventario se ha cargado correctamente', life: 3000 });
        console.log(response.body);
        this.listadoInventario = response.body as infoInventario[];
        console.log('this.listadoInventario: ', this.listadoInventario);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error al cargar el inventario', detail: 'No se pudo cargar el inventario', life: 3000 });
      }
    })
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  cambiarEstadoDialog(tipoMovimiento: 'entrada' | 'salida', estadoDialog: boolean, infoProducto: infoInventario) {
    this.elementoAModificar = infoProducto;
    this.MovimientoDialog = estadoDialog;

    switch (tipoMovimiento) {
      case 'entrada':
        this.tipoMovimiento = 'entrada';
        this.formGroupRegistrarMovimiento.patchValue({
          idproducto: infoProducto.idproducto,
          nombreproducto: infoProducto.nombreproducto,
          cantidadproducto: 0
        })
        break;

      case 'salida':
        this.tipoMovimiento = 'salida';
        this.formGroupRegistrarMovimiento.patchValue({
          idproducto: infoProducto.idproducto,
          nombreproducto: infoProducto.nombreproducto,
          cantidadproducto: 0
        })
        break;
    }

  }

  modificarElemento() {
    if (!this.formGroupRegistrarMovimiento.valid) {
      this.messageService.add({ severity: 'error', summary: 'Por favor completa todos los campos', life: 3000 });
    } else {

      const infoARegistrar: infoRegistrarMovimiento = {
        idProducto: this.formGroupRegistrarMovimiento.value.idproducto as number,
        tipo: this.tipoMovimiento,
        cantidad: this.formGroupRegistrarMovimiento.value.cantidadproducto as number
      }
      this.consumoHTTPService.registrarMovimiento(infoARegistrar).subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Movimiento registrado', detail: 'El movimiento se ha registrado correctamente', life: 3000 });
          this.MovimientoDialog = false;
          this.formGroupRegistrarMovimiento.reset();
          this.ngOnInit();
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error al registrar el movimiento', detail: 'No se pudo registrar el movimiento' + error.err, life: 3000 });
        }
      })
    }
  }


  confirmarCierreCreacionElementos() {
    this.confirmationService.confirm({
      message: '¿Seguro que desea cancelar el registro del movimiento?, si cierra esta ventana, perderá la información ingresada previamente',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cerrar',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.formGroupRegistrarMovimiento.reset();
        this.MovimientoDialog = false;
      },
      reject: () => {
        this.MovimientoDialog = true;
      }
    });

  }
}
