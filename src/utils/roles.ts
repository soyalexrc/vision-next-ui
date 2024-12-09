export function getAllowedRoutesByRole(role: string) {
  let routes: { path: string; title: string }[] = [];
  if (role === 'Administrador') {
    routes = [
      {
        path: '/administracion',
        title: 'Inicio',
      },
      {
        path: '/administracion/clientes',
        title: 'Clientes',
      },
      {
        path: '/administracion/usuarios',
        title: 'Usuarios',
      },
      {
        path: '/administracion/asesores-externos',
        title: 'Asesores Externos',
      },
      {
        path: '/administracion/aliados',
        title: 'Aliados',
      },
      {
        path: '/administracion/inmuebles',
        title: 'Inmuebles',
      },
      {
        path: '/administracion/administracion-interna',
        title: 'Administracion Interna',
      },
      {
        path: '/administracion/flujo-de-caja',
        title: 'Flujo de Caja',
      },
      {
        path: '/administracion/propietarios',
        title: 'Propietarios',
      },
      {
        path: '/administracion/calculo-de-comisiones',
        title: 'Calculo de Comisiones',
      },
      {
        path: '/administracion/gestion-de-archivos',
        title: 'Gestion de Archivos',
      },
    ];
  }

  if (role === 'Asesor inmobiliario') {
    routes = [
      {
        path: '/administracion',
        title: 'Inicio',
      },
      {
        path: '/administracion/inmuebles',
        title: 'Inmuebles',
      },
      {
        path: '/administracion/clientes',
        title: 'Clientes',
      },
    ];
  }

  if (role === 'Coordinador de servicios') {
    routes = [
      {
        path: '/administracion',
        title: 'Inicio',
      },
      {
        path: '/administracion/inmuebles',
        title: 'Inmuebles',
      },
      {
        path: '/administracion/clientes',
        title: 'Clientes',
      },
      {
        path: '/administracion/calculo-de-comisiones',
        title: 'Calculo de Comisiones',
      },
      {
        path: '/administracion/propietarios',
        title: 'Propietarios',
      },
      {
        path: '/administracion/asesores-externos',
        title: 'Asesores Externos',
      },
      {
        path: '/administracion/gestion-de-archivos',
        title: 'Gestion de Archivos',
      },
      {
        path: '/administracion/usuarios',
        title: 'Usuarios',
      },
      {
        path: '/administracion/aliados',
        title: 'Aliados',
      },
    ];
  }

  if (role === 'Administrador de empresa') {
    routes = [
      {
        path: '/administracion',
        title: 'Inicio',
      },
      {
        path: '/administracion/administracion-interna',
        title: 'Administracion Interna',
      },
      {
        path: '/administracion/flujo-de-caja',
        title: 'Flujo de Caja',
      },
      {
        path: '/administracion/calculo-de-comisiones',
        title: 'Calculo de Comisiones',
      },
      {
        path: '/administracion/gestion-de-archivos',
        title: 'Gestion de Archivos',
      },
    ];
  }

  if (role === 'Asistente operativo') {
    routes = [
      {
        path: '/administracion',
        title: 'Inicio',
      },
      {
        path: '/administracion/gestion-de-archivos',
        title: 'Gestion de Archivos',
      },
      {
        path: '/administracion/inmuebles',
        title: 'Inmuebles',
      },
      {
        path: '/administracion/clientes',
        title: 'Clientes',
      },
    ];
  }

  if (role === 'Asesor inmobiliario vision') {
    routes = [
      {
        path: '/administracion',
        title: 'Inicio',
      },
      {
        path: '/administracion/inmuebles',
        title: 'Inmuebles',
      },
      {
        path: '/administracion/clientes',
        title: 'Clientes',
      },
    ];
  }

  return routes;
}
