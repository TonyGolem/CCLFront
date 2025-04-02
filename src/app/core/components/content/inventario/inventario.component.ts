import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConsumoHTTPService } from '../../../services/content/consumo-http.service';

@Component({
  selector: 'app-inventario',
  imports: [ToastModule],
  providers: [MessageService],
  standalone: true,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {

  consumoHTTPService: ConsumoHTTPService = inject(ConsumoHTTPService);

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.consumoHTTPService.obtenerInventario().subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Inventario cargado', detail: 'El inventario se ha cargado correctamente', life: 3000 });
        console.log(response.body);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error al cargar el inventario', detail: 'No se pudo cargar el inventario', life: 3000 });
      }
    })
  }

}
