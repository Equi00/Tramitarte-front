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
        let usuario= await axios?.get(`${this.urlBackend}/usuario`, { params: body })
        return usuario
    }
    async traerDocumentacionCargada(id){
        let documentacion= await axios?.get(`${this.urlBackend}/documentacion/${id}`)
        return documentacion.data.documentList
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

    async buscarSolicitudTraduccionSolicitante(idSolicitante, idTraductor){
        let solicitudes = await axios.get(`${this.urlBackend}/usuario/solicitud-traduccion/solicitante/${idSolicitante}/traductor/${idTraductor}`)
        return solicitudes.data
    }

    async buscarSolicitudPorSolicitante(idSolicitante){
        let solicitud = await axios.get(`${this.urlBackend}/usuario/solicitud/solicitante/${idSolicitante}`)
        return solicitud.data
    }

    async eliminarAlerta(idAlerta){
        await axios.delete(`${this.urlBackend}/notificacion/alerta/${idAlerta}` )
    }

    async eliminarSolicitudTraduccion(idSolicitudTraduccion){
        await axios.delete(`${this.urlBackend}/notificacion/solicitud/${idSolicitudTraduccion}`)
    }

    async eliminarSolicitudTraduccionPorSolicitante(idSolicitante){
        await axios.delete(`${this.urlBackend}/notificacion/solicitud/solicitante/${idSolicitante}`)
    }

    async crearPedidoTraduccion(idSolicitante, idTraductor){
        let pedidoTraduccion = await axios.post(`${this.urlBackend}/pedido/solicitante/${idSolicitante}/traductor/${idTraductor}`)
        return pedidoTraduccion.data
    }

    async buscarPedidoTraduccion(idTraductor){
        let pedido = await axios.get(`${this.urlBackend}/pedido/traductor/${idTraductor}`)
        return pedido.data
    }

    async eliminarPedidoTraduccion(idPedido){
        await axios.delete(`${this.urlBackend}/pedido/${idPedido}`)
    }

    async crearSolicitudDescarga(idSolicitante, idTraductor, documentos){
        let response = await axios.post(
            `${this.urlBackend}/solicitud-descarga/solicitante/${idSolicitante}/traductor/${idTraductor}`,
                    JSON.stringify(documentos),
                { headers: { "Content-Type": "application/json" } })
        console.log(response.data)
        return response
    }

    async buscarSolicitudDescargaPorSolicitante(idSolicitante){
        let solicitudDescarga = await axios.get(`${this.urlBackend}/solicitud-descarga/solicitante/${idSolicitante}`)
        return solicitudDescarga.data
    }

    async eliminarSolicitudDescarga(id){
        await axios.delete(`${this.urlBackend}/solicitud-descarga/${id}`)
        console.log("se elimino la solicitud de descarga")
    }
    
    async actualizarDataUsuario(body) {
        let usuarioAux = JSON.parse(window.localStorage.getItem('usuarioLogueado'));
        let id = usuarioAux.id;
        try {
            let usuario = await axios?.post(`${this.urlBackend}/usuario/${id}`, body);
            return usuario.data;
        } catch (error) {
            console.error("Error al actualizar el nombre de usuario:", error);
            throw error;
        }
    }
 
}

const usuarioService = new UsuarioService();

export default usuarioService;
