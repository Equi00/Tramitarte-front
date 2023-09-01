import axios from "axios";

class TramiteService {
  urlBackend = "http://localhost:8585/api";

  async guardarTramite(idUsuario) {
    let tramite = await axios.post(`${this.urlBackend}/tramite/${idUsuario}`);
    return tramite;
  }

  async cargarAVO(avo, idTramite) {
    let avoPersistido = await axios.post(
      `${this.urlBackend}/carga-avo/${idTramite}`,
      avo
    );
    return avoPersistido;
  }

  async cargarDocumentacionPersonal(documentacion, idUsuario) {
    let documentacionGenerada = await axios.post(
      `${this.urlBackend}/carga/documentacion/usuario/${idUsuario}`,
      JSON.stringify(documentacion),
      { headers: { "Content-Type": "application/json" } }
    );
    return documentacionGenerada;
  }

  async cargarDocumentacionAVO(documentacion, idUsuario) {
    let documentacionGenerada = await axios.post(
      `${this.urlBackend}/carga/documentacion/avo/${idUsuario}`,
      documentacion
    );
    return documentacionGenerada;
  }

  async cargarDocumentacionAncestros(documentacion, idUsuario) {
    let documentacionGenerada = await axios.post(
      `${this.urlBackend}/carga/documentacion/descendientes/${idUsuario}`,
      documentacion
    );
    return documentacionGenerada;
  }

  async buscarPorUsuario(idUsuario) {
    let tramitePersistido = await axios.get(
      `${this.urlBackend}/tramite/usuario/${idUsuario}`
    );
    return tramitePersistido;
  }

  async esDniFrente(imgFile) {
    const formData = new FormData();
    formData.append("img", imgFile);
  
    const response = await axios.post(`${this.urlBackend}/ocr/image/is_dni_frente`, formData);
    return response.data;
  }

  async esDniDorso(imgFile) {
    const formData = new FormData();
    formData.append("img", imgFile);
  
    const response = await axios.post(`${this.urlBackend}/ocr/image/is_dni_dorso`, formData);
    return response.data;
  }

  async esCertificado(pdfFile) {
    const formData = new FormData();
    formData.append("pdf", pdfFile); // Cambia "img" a "pdf" para reflejar el nombre del campo en tu backend
  
    try {
      const response = await axios.post(`${this.urlBackend}/ocr/pdf/is_certificate`, formData); // Cambia la URL para reflejar la ruta correcta en tu backend
      return response.data;
    } catch (error) {
      // Captura errores Axios
      if (error.response) {
        // La solicitud fue realizada y el servidor respondió con un código de estado diferente de 2xx
        console.error("Error de respuesta del servidor:", error.response.data);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta del servidor
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        // Ocurrió un error antes de que se realizara la solicitud
        console.error("Error al procesar la solicitud:", error.message);
      }
      throw error;
    }
  }

  async eliminar(idTramite) {
    await axios.delete(`${this.urlBackend}/tramite/${idTramite}`);
  }
}

const tramiteService = new TramiteService();

export default tramiteService;
