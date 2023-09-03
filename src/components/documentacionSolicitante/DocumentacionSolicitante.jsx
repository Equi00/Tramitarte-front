import { useEffect, useState } from "react";
import InputFile from "./InputFile";
import { Box, Center, Flex, useDisclosure } from "@chakra-ui/react";
import tramiteService from "../../services/TramiteService";
import ModalError from "../ModalError";

function DocumentacionSolicitante({
  agregarDocumentacionSolicitante,
}) {
  const [nombre1, setNombre1] = useState("dni frente")
  const [nombre2, setNombre2] = useState("dni dorso")
  const [nombre3, setNombre3] = useState("certificado de nacimiento")
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputDniFrente = async (e) => {
    let archivo = e.target.files[0]
    let verificacion = await tramiteService.esDniFrente(archivo)
    if(verificacion === false){
      onOpen()
    }else{
    agregarDocumentacionSolicitante({
      id: "dni-frente",
      archivo: archivo,
    });
    const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 50) + '...' : archivo.name;
    setNombre1(nombreRecortado)
    }
  };

  const handleInputDniDorso = async (e) => {
    let archivo = e.target.files[0]
    let verificacion = await tramiteService.esDniDorso(archivo)
    if(verificacion === false){
      onOpen()
    }else{
    agregarDocumentacionSolicitante({
      id: "dni-dorso",
      archivo: archivo,
    });
    const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 50) + '...' : archivo.name;
    setNombre2(nombreRecortado)
    }
  };

  const handleInputCertificadoNacimiento = async (e) => {
    let archivo = e.target.files[0]
    let verificacion = await tramiteService.esCertificado(archivo)
    if(verificacion === false){
      onOpen()
    }else{
    agregarDocumentacionSolicitante({
      id: "certificado-nacimiento",
      archivo: archivo,
    });
    const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 50) + '...' : archivo.name;
    setNombre3(nombreRecortado)
    }
  };

  return (
    <Box w="100%" borderRadius="30px" bg="teal.100">
      <Center flexWrap="wrap" gap={2} w="100%" p="2%">
        <InputFile handleOnInput={handleInputDniFrente} accion={nombre1} />
        <InputFile handleOnInput={handleInputDniDorso} accion={nombre2} />
        <InputFile handleOnInput={handleInputCertificadoNacimiento} accion={nombre3} />
      </Center>
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

export default DocumentacionSolicitante;
