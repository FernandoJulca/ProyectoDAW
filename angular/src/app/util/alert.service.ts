import Swal from 'sweetalert2';

export class AlertService {
  
  static success(message: string, title = 'Éxito') {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  static error(message: string, title = 'Error') {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }

  static info(message: string, title = 'Info') {
    Swal.fire({
      icon: 'info',
      title,
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }
}
