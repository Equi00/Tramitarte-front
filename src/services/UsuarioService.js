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
        return usuario.data
    }
    async traerDocumentacionCargada(id){
        let documentacion= await axios?.get(`${this.urlBackend}/documentacion/${id}`)
        return documentacion.data.documentList
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
