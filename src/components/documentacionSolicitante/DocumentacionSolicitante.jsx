import { useEffect, useState } from "react";
import InputFile from "./InputFile";
import { Box, Center, Flex, useDisclosure } from "@chakra-ui/react";
import tramiteService from "../../services/TramiteService";
import ModalError from "../ModalError";
import ModalIsLoading from "../ModalIsLoading";

function DocumentacionSolicitante({
  agregarDocumentacionSolicitante,
}) {
  const [nombre1, setNombre1] = useState("dni frente")
  const [nombre2, setNombre2] = useState("dni dorso")
  const [nombre3, setNombre3] = useState("certificado de nacimiento")
  const [estaCargando, setEstaCargando] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputDniFrente = async (e) => {
    let archivo = e.target.files[0]
    setEstaCargando(true)
    let verificacion = await tramiteService.esDniFrente(archivo)
    if(verificacion === false){
      setEstaCargando(false)
      onOpen()
    }else{
    agregarDocumentacionSolicitante({
      id: "dni-frente",
      archivo: archivo,
    });
    const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 30) + '...' : archivo.name;
    setNombre1(nombreRecortado)
    }
    setEstaCargando(false)
  };

  const handleInputDniDorso = async (e) => {
    let archivo = e.target.files[0]
    setEstaCargando(true)
    let verificacion = await tramiteService.esDniDorso(archivo)
    if(verificacion === false){
      setEstaCargando(false)
      onOpen()
    }else{
    agregarDocumentacionSolicitante({
      id: "dni-dorso",
      archivo: archivo,
    });
    const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 30) + '...' : archivo.name;
    setNombre2(nombreRecortado)
    }
    setEstaCargando(false)
  };

  const handleInputCertificadoNacimiento = async (e) => {
    let archivo = e.target.files[0]
    setEstaCargando(true)
    let verificacion = await tramiteService.esCertificadoNacimiento(archivo)
    if(verificacion === false){
      setEstaCargando(false)
      onOpen()
    }else{
    agregarDocumentacionSolicitante({
      id: "certificado-nacimiento",
      archivo: archivo,
    });
    const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 30) + '...' : archivo.name;
    setNombre3(nombreRecortado)
    }
    setEstaCargando(false)
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
          "Por favor elija el archivo correspondiente para continuar. En caso de que el archivo sea el correcto, vuelva a intentarlo con imagenes en mejor resolucion y mas claras."
        }
        isOpen={isOpen}
        onClose={onClose}
      />
      <ModalIsLoading
        mensaje={"Esperanos mientras guardamos la documentación ;)"}
        isOpen={estaCargando}
      />
    </Box>
  );
}

export default DocumentacionSolicitante;
