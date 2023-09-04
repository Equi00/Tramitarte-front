import { useEffect, useState } from "react";
import InputCertficadoNoObligatorio from "./InputCertificadoNoObligatorio";
import InputFile from "./InputFile";
import { Box, Center, useDisclosure } from "@chakra-ui/react";
import tramiteService from "../../services/TramiteService";
import ModalError from "../ModalError";
import InputCertficadoNoObligatorioMultiple from "./InputCertificadoNoObligatorioMultiple";

function DocumentacionAscendentesArchivo({ cantidadAscendentes, personas, setDocumentacionAncestros, quitarDocumentos, setCheck1, setCheck2 }) {
  const [nombre1, setNombre1] = useState([]);
  const [nombre2, setNombre2] = useState([]);
  const [nombre3, setNombre3] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [verificado1, setVerificado1] = useState([])
  const [verificado2, setVerificado2] = useState([])

  const handleInputCertificadoDefuncion = async (e, index) => {
    const archivo = e.target.files[0];
    const verificacion = await tramiteService.esCertificado(archivo);
    
    if (verificacion === false) {
      onOpen();
    } else {
      setDocumentacionAncestros({
        id: "certificado-defuncion",
        archivo: archivo,
        index: index
      });

      const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 30) + '...' : archivo.name;
      
      setNombre1((prevNombres) => {
        const nuevosNombres = [...prevNombres];
        nuevosNombres[index] = nombreRecortado;
        return nuevosNombres;
      });
    }
  }

  const handleInputCertificadoMatrimonio = async (e, index) => {
    const archivo = e.target.files[0];
    const verificacion = await tramiteService.esCertificado(archivo);
    
    if (verificacion === false) {
      onOpen();
    } else {
      setDocumentacionAncestros({
        id: "certificado-matrimonio",
        archivo: archivo,
        index: index
      });

      const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 30) + '...' : archivo.name;
      
      setNombre2((prevNombres) => {
        const nuevosNombres = [...prevNombres];
        nuevosNombres[index] = nombreRecortado;
        return nuevosNombres;
      });
    }
  }

  const handleInputCertificadoNacimiento = async (e, index) => {
    const archivo = e.target.files[0];
    const verificacion = await tramiteService.esCertificado(archivo);
    
    if (verificacion === false) {
      onOpen();
    } else {
      setDocumentacionAncestros({
        id: "certificado-nacimiento",
        archivo: archivo,
        index: index
      });

      const nombreRecortado = archivo.name.length > 20 ? archivo.name.substring(0, 30) + '...' : archivo.name;
      
      setNombre3((prevNombres) => {
        const nuevosNombres = [...prevNombres];
        nuevosNombres[index] = nombreRecortado;
        return nuevosNombres;
      });
    }
  }

  useEffect(() => { //seteo todos los valores standar segun la cantidad de descendientes
    const nombres1 = Array(cantidadAscendentes).fill("certificado defuncion");
    const nombres2 = Array(cantidadAscendentes).fill("certificado matrimonio");
    const nombres3 = Array(cantidadAscendentes).fill("certificado nacimiento");
    const cantidadVerificados = Array(cantidadAscendentes).fill(false)
  
    setNombre1(nombres1);
    setNombre2(nombres2);
    setNombre3(nombres3);
    setVerificado1(cantidadVerificados)
    setVerificado2(cantidadVerificados)
    
  }, [cantidadAscendentes]);

  useEffect(() => { //aqui si se hace un check en "no", entonces el nombre del boton vuelve a su estado original
    verificado1.forEach((verificado, index) => {
      if (verificado1[index] === false) {
        setNombre1((prevNombres) => {
          const nuevosNombres = [...prevNombres];
          nuevosNombres[index] = "certificado defuncion";
          return nuevosNombres;
        });
        if(!(personas[index].certificadoDefuncion.nombre === "")){
          quitarDocumentos({
            id: "certificado-defuncion",
            index: index
          })
        }
      }
    });
    setCheck1(verificado1)
  }, [verificado1])

  useEffect(() => { //aqui si se hace un check en "no", entonces el nombre del boton vuelve a su estado original
    verificado2.forEach((verificado, index) => {
      if (verificado2[index] === false) {
        setNombre2((prevNombres) => {
          const nuevosNombres = [...prevNombres];
          nuevosNombres[index] = "certificado matrimonio";
          return nuevosNombres;
        });
        if(!(personas[index].certificadoMatrimonio.nombre === "")){
          quitarDocumentos({
            id: "certificado-matrimonio",
            index: index
          })
        }
      }
    });
    setCheck2(verificado2)
  }, [verificado2])

  return (
    <Box borderRadius="30px" bg="teal.100">
      {personas.map((persona, index) => (
        <Box key={index}>
          <Center py="2%">
          <InputCertficadoNoObligatorioMultiple
            preguntaConfirmacion={"¿Ha fallecido?"}
            accion={nombre1[index]}
            handleOnInput={(e) => handleInputCertificadoDefuncion(e, index)}
            handleCheckbox={setVerificado1}
            index={index}
          />
          </Center>
          <Center py="2%">
            <InputCertficadoNoObligatorioMultiple
              preguntaConfirmacion={"¿Estaba en relación de matrimonio?"}
              accion={nombre2[index]}
              handleOnInput={(e) => handleInputCertificadoMatrimonio(e, index)}
              handleCheckbox={setVerificado2}
              index={index}
            />
          </Center>
          <Center py="2%">
            <InputFile accion={nombre3[index]} handleOnInput={(e) => handleInputCertificadoNacimiento(e, index)} />
          </Center>
        </Box>
      ))}
      <ModalError
        pregunta={"El archivo seleccionado no es valido"}
        datoAConfirmar={"Por favor elija el archivo correspondiente para continuar"}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}

export default DocumentacionAscendentesArchivo;
