import { Component, DoCheck, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/models/Provincia';
import { EmpresaCentro } from 'src/app/models/EmpresaCentro';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css'],
})
export class PerfilusuarioComponent implements OnInit {
  public usuario!: Usuario;
  public provincia!: Provincia;
  public empresaCentro!: EmpresaCentro;
  public role!: Role;
  public tecnologias!: any[];

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('idUsuario')) {
      let id: number = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._service.findUsuario(id).subscribe((response) => {
        this.usuario = response;
        this._service
          .findProvincia(this.usuario.idProvincia)
          .subscribe((response) => {
            this.provincia = response;
          });
        if (this.usuario.idEmpresaCentro) {
          this._service
            .findEmpresaCentro(this.usuario.idEmpresaCentro)
            .subscribe((response) => {
              this.empresaCentro = response;
            });
        }
        this._service.findRole(this.usuario.idRole).subscribe((response) => {
          this.role = response;
        });
        if (this.usuario.idRole == 3) {
          // TechRider
          this._service
            .findTecnologiasTechRider(this.usuario.idUsuario)
            .subscribe((response) => {
              this.tecnologias = response;
            });
        }
      });
    } else this._router.navigate(['/']);
  }
}