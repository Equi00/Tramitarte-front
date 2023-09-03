import { useEffect, useState } from "react";
import InputCertficadoNoObligatorio from "./InputCertificadoNoObligatorio";
import InputFile from "./InputFile";
import { Box, Center, useDisclosure } from "@chakra-ui/react";
import tramiteService from "../../services/TramiteService";
import ModalError from "../ModalError";

function DocumentacionAscendentesArchivo({ cantidadAscendentes, personas, agregarDocumentacionDescendiente, setPersonas }) {
  const [nombre1, setNombre1] = useState("certificado defuncion")
  const [nombre2, setNombre2] = useState("certificado matrimonio")
  const [nombre3, setNombre3] = useState("certificado nacimiento")
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleInputCertificadoDefuncion = async (e, index) => {
    let archivo = e.target.files[0]
    let verificacion = await tramiteService.esCertificado(archivo)
    if(verificacion === false){
      onOpen()
    }else{
    agregarDocumentacionDescendiente({
      index: index,
      id: "certificado-defuncion",
      archivo: archivo,
    });
    const nombreRecortado =
      archivo.name.length > 20
        ? archivo.name.substring(0, 50) + "..."
        : archivo.name;
    setPersonas((prevPersonas) => {
      const newPersonas = [...prevPersonas];
      newPersonas[index].nombre1 = nombreRecortado;
      return newPersonas;
    });
  }
}

  const handleInputCertificadoMatrimonio = async (e, index) => {
    let archivo = e.target.files[0]
    let verificacion = await tramiteService.esCertificado(archivo)
    if(verificacion === false){
      onOpen()
    }else{
      agregarDocumentacionDescendiente({
      index: index,
      id: "certificado-matrimonio",
      archivo: archivo,
    });
    const nombreRecortado =
      archivo.name.length > 20
        ? archivo.name.substring(0, 50) + "..."
        : archivo.name;
    setPersonas((prevPersonas) => {
      const newPersonas = [...prevPersonas];
      newPersonas[index].nombre2 = nombreRecortado;
      return newPersonas;
    });
  }
  };

  const handleInputCertificadoNacimiento = async (e, index) => {
    let archivo = e.target.files[0]
    let verificacion = await tramiteService.esCertificado(archivo)
    if(verificacion === false){
      onOpen()
    }else{
      agregarDocumentacionDescendiente({
      index: index,
      id: "certificado-nacimiento",
      archivo: archivo,
    });
    const nombreRecortado =
      archivo.name.length > 20
        ? archivo.name.substring(0, 50) + "..."
        : archivo.name;
    setPersonas((prevPersonas) => {
      const newPersonas = [...prevPersonas];
      newPersonas[index].nombre3 = nombreRecortado;
      return newPersonas;
    });
  }
  };

  const toggleOpen = (field, index) => {
    setPersonas((prevPersonas) => {
      const newPersonas = [...prevPersonas];
      newPersonas[index][field] = !newPersonas[index][field];
      return newPersonas;
    });
  };

  useEffect(() => {
    console.log(personas);
  }, [personas]);

  return (
    <Box borderRadius="30px" bg="teal.100">
      {personas.map((persona, index) => (
        <Box key={index}>
          <Center py="2%">
            <InputCertficadoNoObligatorio
              preguntaConfirmacion={"¿Ha fallecido?"}
              accion={nombre1}
              handleOnInput={(e) => handleInputCertificadoDefuncion(e, index)}
              isOpen={persona.opcional1}
              onToggle={() => toggleOpen("opcional1", index)}
            />
          </Center>
          <Center py="2%">
            <InputCertficadoNoObligatorio
              preguntaConfirmacion={"¿Estaba en relación de matrimonio?"}
              accion={nombre2}
              handleOnInput={(e) => handleInputCertificadoMatrimonio(e, index)}
              isOpen={persona.opcional2}
              onToggle={() => toggleOpen("opcional2", index)}
            />
          </Center>
          <Center py="2%">
            <InputFile
              accion={nombre3}
              handleOnInput={(e) => handleInputCertificadoNacimiento(e, index)}
            />
          </Center>
        </Box>
      ))}
      <ModalError
        pregunta={"El archivo seleccionado no es valido"}
        datoAConfirmar={
          "Por favor elija el archivo correspondiente para continuar"
        }
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}

export default DocumentacionAscendentesArchivo;
