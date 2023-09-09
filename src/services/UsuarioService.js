import axios from "axios";

class UsuarioService {
    urlBackend = 'http://localhost:8585/api';

    async guardarUsuario(usuario) {
        console.log(usuario)
        let usuarioNuevo = await axios.post(`${this.urlBackend}/usuario`, usuario)
        console.log(usuarioNuevo)
        return usuarioNuevo;
    }

    async traerUsuarioXMail(mail) {
        let body= {"correoElectronico" : mail}
        console.log(body)
        let usuario= await axios?.get(`${this.urlBackend}/usuario`, { params: body })
        console.log(usuario)
        return usuario
    }

    async traerTraductores(){
        let traductores = await axios.get(`${this.urlBackend}/usuario/traductores`)
        return traductores.data
    }

    async buscarTraductores(mail){
        let body= {"correoElectronico" : mail}
        let traductor = await axios?.get(`${this.urlBackend}/usuario/traductor-correo`, { params: body })
        return traductor.data
    }

    async traerNotificaciones(id){
        let notificaciones = await axios.get(`${this.urlBackend}/usuario/${id}/notificaciones`)
        return notificaciones.data
    }

    async enviarNotificacion(idOrigen, idDestino, texto){
        await axios.post(`${this.urlBackend}/notificacion/alerta-traductor/${idOrigen}/${idDestino}?descripcion=${texto}` )
    }

    async enviarAlerta(idOrigen, idDestino, texto){
        await axios.post(`${this.urlBackend}/notificacion/alerta/${idOrigen}/${idDestino}?descripcion=${texto}` )
    }

    async buscarSolicitudTraduccion(idTraductor){
        let solicitudes = await axios.get(`${this.urlBackend}/usuario/${idTraductor}/solicitud-traduccion`)
        return solicitudes.data
    }

    async buscarSolicitudTraduccionSolicitante(idSolicitante){
        let solicitudes = await axios.get(`${this.urlBackend}/usuario/${idSolicitante}/solicitud-traduccion/solicitante`)
        return solicitudes.data
    }

    async eliminarAlerta(idAlerta){
        await axios.delete(`${this.urlBackend}/notificacion/alerta/${idAlerta}` )
    }

    async eliminarSolicitudTraduccion(idSolicitudTraduccion){
        await axios.delete(`${this.urlBackend}/notificacion/solicitud/${idSolicitudTraduccion}`)
    }
    
}

const usuarioService = new UsuarioService();

export default usuarioService;