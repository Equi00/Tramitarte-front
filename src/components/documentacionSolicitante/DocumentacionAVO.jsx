import { Box, Center, useDisclosure } from "@chakra-ui/react";
import InputFile from "./InputFile";
import InputCertficadoNoObligatorio from "./InputCertificadoNoObligatorio";
import tramiteService from "../../services/TramiteService";
import { useEffect, useState } from "react";
import ModalError from "../ModalError";
import ModalIsLoading from "../ModalIsLoading";

function DocumentacionAVO({ agregarDocumentacionAVO, isOpenNO1, onToggle1, isOpenNO2, onToggle2}) {
  const [nombre1, setNombre1] = useState("certificado defuncion")
  const [nombre2, setNombre2] = useState("certificado matrimonio")
  const [nombre3, setNombre3] = useState("certificado nacimiento")
  const [estaCargando, setEstaCargando] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputCertificadoDefuncion = async (e) => {
    let archivo = e.target.files[0]
    setEstaCargando(true)
    let verificacion = await tramiteService.esCertificado(archivo)
    if(verificacion === false){
      setEstaCargando(false)
      onOpen()
    }else{
    agregarDocumentacionAVO({
      id: "certificado-defuncion",
      archivo: archivo,
    });
    const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 30) + '...' : archivo.name;
    setNombre1(nombreRecortado)
  }
  setEstaCargando(false)
  };

  const handleInputCertificadoMatrimonio = async (e) => {
    let archivo = e.target.files[0]
    setEstaCargando(true)
    let verificacion = await tramiteService.esCertificadoMatrimonio(archivo)
    if(verificacion === false){
      setEstaCargando(false)
      onOpen()
    }else{
    agregarDocumentacionAVO({
      id: "certificado-matrimonio",
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
    agregarDocumentacionAVO({
      id: "certificado-nacimiento",
      archivo: archivo,
    });
    const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 30) + '...' : archivo.name;
    setNombre3(nombreRecortado)
  }
  setEstaCargando(false)
  };

  useEffect(() => {
    if(isOpenNO1 === false){
      setNombre1("certificado defuncion")
    }
  }, [isOpenNO1])

  useEffect(() => {
    if(isOpenNO2 === false){
      setNombre2("certificado matrimonio")
    }
  }, [isOpenNO2])

  return (
    <Box w="100%" borderRadius="30px" bg="teal.100">
      <Center flexWrap="wrap" gap={2} w="100%" p="2%">
        <InputCertficadoNoObligatorio
          handleOnInput={handleInputCertificadoDefuncion}
          preguntaConfirmacion={"¿Ha fallecido?"}
          accion={nombre1}
          isOpen={isOpenNO1}
          onToggle={onToggle1}
        />
        <InputCertficadoNoObligatorio
          handleOnInput={handleInputCertificadoMatrimonio}
          preguntaConfirmacion={"¿Estaba en relación de matrimonio?"}
          accion={nombre2}
          isOpen={isOpenNO2}
          onToggle={onToggle2}
        />
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

export default DocumentacionAVO;
