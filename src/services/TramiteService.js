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

  async cargarDocumentacionTraducida(documentacion, idUsuario) {
    let documentacionGenerada = await axios.post(
      `${this.urlBackend}/carga/documentacion/traducida/${idUsuario}`,
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
    formData.append("pdf", pdfFile);
  
    const response = await axios.post(`${this.urlBackend}/ocr/pdf/is_certificate`, formData);
    return response.data;
  }

  async esCertificadoNacimiento(pdfFile) {
    const formData = new FormData();
    formData.append("pdf", pdfFile);
  
    const response = await axios.post(`${this.urlBackend}/ocr/pdf/is_birth`, formData);
    return response.data;
  }

  async esCertificadoMatrimonio(pdfFile) {
    const formData = new FormData();
    formData.append("pdf", pdfFile);
  
    const response = await axios.post(`${this.urlBackend}/ocr/pdf/is_marriage`, formData);
    return response.data;
  }

  async esCertificadoDefuncion(pdfFile) {
    const formData = new FormData();
    formData.append("pdf", pdfFile);
  
    const response = await axios.post(`${this.urlBackend}/ocr/pdf/is_death`, formData);
    return response.data;
  }

  async esCertificadoNacimientoItaliano(pdfFile){
    const formData = new FormData();
    formData.append("pdf", pdfFile);

    const response = await axios.post(`${this.urlBackend}/ocr/pdf/is_birth_italy`, formData);
    return response.data;
  }

  async esCertificadoMatrimonioItaliano(pdfFile) {
    const formData = new FormData();
    formData.append("pdf", pdfFile);
  
    const response = await axios.post(`${this.urlBackend}/ocr/pdf/is_marriage_italy`, formData);
    return response.data;
  }

  async esCertificadoDefuncionItaliano(pdfFile) {
    const formData = new FormData();
    formData.append("pdf", pdfFile);
  
    const response = await axios.post(`${this.urlBackend}/ocr/pdf/is_death_italy`, formData);
    return response.data;
  }

  async eliminar(idTramite) {
    await axios.delete(`${this.urlBackend}/tramite/${idTramite}`);
  }

  async traerDatosAvo(idUsuario){
    let avo= await axios?.get(`${this.urlBackend}/solicitud/usuario/${idUsuario}`)
    return avo.data
  }

  async modificarArchivo(idArchivo,archivo){
    await axios.post(`${this.urlBackend}/modificar/documento/${idArchivo}`, archivo)
  }
}

const tramiteService = new TramiteService();

export default tramiteService;
