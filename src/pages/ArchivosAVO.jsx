import {
  Flex,
  Box,
  IconButton,
  Center,
  ScaleFade,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ModalConfirmacion from "../components/ModalConfirmacion";
import ModalIsLoading from "../components/ModalIsLoading";
import DocumentacionAVO from "../components/documentacionSolicitante/DocumentacionAVO";
import tramiteService from "../services/TramiteService";
import ModalError from "../components/ModalError";
function ArchivosAVO() {
  const navigate = useNavigate();
  const { isOpen } = useDisclosure();
  const [estaCargando, setEstaCargando] = useState(false);
  const [estaModalAbierto, setEstaModalAbierto] = useState(false);
  const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useDisclosure();
  const { isOpen: isOpenNoObligatorio1, onToggle: onToggle1 } = useDisclosure();
  const { isOpen: isOpenNoObligatorio2, onToggle: onToggle2 } = useDisclosure();
  const [documentacionAVO, setDocumentacionAVO] = useState({
    certificadoNacimiento: { tipo: "", nombre: "", archivoBase64: "" },
    certificadoMatrimonio: { tipo: "", nombre: "", archivoBase64: "" },
    certificadoDefuncion: { tipo: "", nombre: "", archivoBase64: "" },
  });
  const handleBack = () => navigate(-1);

  const abrirModal = () => {
    if(documentacionAVO.certificadoNacimiento.nombre === "" || (isOpenNoObligatorio1 === true && documentacionAVO.certificadoDefuncion.nombre === "") 
    || (isOpenNoObligatorio2 === true && documentacionAVO.certificadoMatrimonio.nombre === "")){
      onOpenError()
    }else{
      setEstaModalAbierto(true);
    }
  };

  const cerrarModal = () => {
    setEstaModalAbierto(false);
  };

  function fileToBase64(archivo) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const completarDocumentacionAVO = async ({ id, archivo }) => {
    if (id === "certificado-defuncion") {
      let archivoBase64 = await fileToBase64(archivo);
      setDocumentacionAVO({
        certificadoDefuncion: {
          tipo: "certificado-defuncion",
          nombre: archivo.name,
          archivoBase64: "",
        },
        certificadoMatrimonio: documentacionAVO.certificadoMatrimonio ?? {
          tipo: documentacionAVO.certificadoMatrimonio.tipo,
          nombre: documentacionAVO.certificadoMatrimonio.nombre,
          archivoBase64: documentacionAVO.certificadoMatrimonio.archivoBase64,
        },
        certificadoNacimiento: {
          tipo: documentacionAVO.certificadoNacimiento.tipo,
          nombre: documentacionAVO.certificadoNacimiento.nombre,
          archivoBase64: documentacionAVO.certificadoNacimiento.archivoBase64,
        },
      });
    }
    if (id === "certificado-matrimonio") {
      let archivoBase64 = await fileToBase64(archivo);
      setDocumentacionAVO({
        certificadoDefuncion: documentacionAVO.certificadoDefuncion && {
          tipo: documentacionAVO.certificadoDefuncion.tipo,
          nombre: documentacionAVO.certificadoDefuncion.nombre,
          archivoBase64: documentacionAVO.certificadoDefuncion.archivoBase64,
        },
        certificadoMatrimonio: {
          tipo: "certificado-matrimonio",
          nombre: archivo.name,
          archivoBase64: "",
        },
        certificadoNacimiento: {
          tipo: documentacionAVO.certificadoNacimiento.tipo,
          nombre: documentacionAVO.certificadoNacimiento.nombre,
          archivoBase64: documentacionAVO.certificadoNacimiento.archivoBase64,
        },
      });
    }
    if (id === "certificado-nacimiento") {
      let archivoBase64 = await fileToBase64(archivo);
      setDocumentacionAVO({
        certificadoDefuncion: documentacionAVO.certificadoDefuncion && {
          tipo: documentacionAVO.certificadoDefuncion.tipo,
          nombre: documentacionAVO.certificadoDefuncion.nombre,
          archivoBase64: documentacionAVO.certificadoDefuncion.archivoBase64,
        },
        certificadoMatrimonio: documentacionAVO.certificadoMatrimonio && {
          tipo: documentacionAVO.certificadoMatrimonio.tipo,
          nombre: documentacionAVO.certificadoMatrimonio.nombre,
          archivoBase64: documentacionAVO.certificadoMatrimonio.archivoBase64,
        },
        certificadoNacimiento: {
          tipo: "certificado-nacimiento",
          nombre: archivo.name,
          archivoBase64: "",
        },
      });
    }
  };

  const handleConfirmacion = async () => {
    cerrarModal();
    setEstaCargando(true);
    console.log("acá", [
      documentacionAVO.certificadoDefuncion,
      documentacionAVO.certificadoMatrimonio,
      documentacionAVO.certificadoNacimiento,
    ]);
    let tramite = JSON.parse(window.localStorage.getItem("tramite"));
    try {
      let respuesta = await tramiteService.cargarDocumentacionAVO(
        [
          documentacionAVO.certificadoDefuncion,
          documentacionAVO.certificadoMatrimonio,
          documentacionAVO.certificadoNacimiento,
        ],
        Number(tramite.id)
      );
      console.log(respuesta);
      setEstaCargando(false);
      navigate(
        `/home/solicitante/${
          JSON.parse(window.localStorage.getItem("usuarioLogueado")).id
        }`
      );
    } catch (error) {
      navigate("/network-error");
    }
  };

  useEffect(() => {
    if(isOpenNoObligatorio1 === false){
      setDocumentacionAVO({
        certificadoDefuncion: {
          tipo: "",
          nombre: "",
          archivoBase64: "",
        },
        certificadoMatrimonio: documentacionAVO.certificadoMatrimonio ?? {
          tipo: documentacionAVO.certificadoMatrimonio.tipo,
          nombre: documentacionAVO.certificadoMatrimonio.nombre,
          archivoBase64: documentacionAVO.certificadoMatrimonio.archivoBase64,
        },
        certificadoNacimiento: {
          tipo: documentacionAVO.certificadoNacimiento.tipo,
          nombre: documentacionAVO.certificadoNacimiento.nombre,
          archivoBase64: documentacionAVO.certificadoNacimiento.archivoBase64,
        },
      });
    }
  }, [isOpenNoObligatorio1])

  useEffect(() => {
    if(isOpenNoObligatorio2 === false){
      setDocumentacionAVO({
        certificadoDefuncion: documentacionAVO.certificadoDefuncion && {
          tipo: documentacionAVO.certificadoDefuncion.tipo,
          nombre: documentacionAVO.certificadoDefuncion.nombre,
          archivoBase64: documentacionAVO.certificadoDefuncion.archivoBase64,
        },
        certificadoMatrimonio: {
          tipo: "",
          nombre: "",
          archivoBase64: "",
        },
        certificadoNacimiento: {
          tipo: documentacionAVO.certificadoNacimiento.tipo,
          nombre: documentacionAVO.certificadoNacimiento.nombre,
          archivoBase64: documentacionAVO.certificadoNacimiento.archivoBase64,
        },
      });
    }
  }, [isOpenNoObligatorio2])

  return (
    <Box minH="100%" h="auto" bg="teal.200">
      <Flex w="100%" p=".8rem" justify="space-between">
        <IconButton
          onClick={() => handleBack()}
          color="blue.900"
          bg="white"
          boxShadow={"0px 4px 10px 3px rgba(26, 54, 93, .5)"}
          borderRadius="50%"
          size="lg"
          icon={<ArrowBack />}
        />
      </Flex>
      <Center p="1rem">
        <Center
          w="sm"
          borderRadius="45px"
          py=".8rem"
          bg="blue.900"
          color="white"
          fontWeight={"700"}
        >
          {JSON.parse(window.localStorage.getItem("tramite")).codigo}
        </Center>
      </Center>
      <Center flexWrap="wrap" p={{ base: "8", md: "16" }}>
        <ScaleFade
          style={{ width: "100%", minWidth: "sm" }}
          in={!isOpen}
          initialScale={1}
        >
          <Flex textAlign="center" pb="2%" w={"full"} flexWrap="wrap">
            <Flex w="100%" justifyContent="center">
              <Text
                w="85%"
                alignSelf="center"
                borderTopRadius="15px"
                bg="teal.200"
                color="white"
                borderColor="teal.300"
                borderWidth="1px"
                as={"h2"}
                fontSize={"2xl"}
                fontWeight={300}
              >
                {"Documentación AVO"}
              </Text>
            </Flex>
            <DocumentacionAVO agregarDocumentacionAVO={completarDocumentacionAVO} isOpenNO1={isOpenNoObligatorio1} onToggle1={onToggle1} isOpenNO2={isOpenNoObligatorio2} onToggle2={onToggle2} />
          </Flex>
          <Flex justifyContent="center" w="full" py="16">
            <Button
              onClick={abrirModal}
              borderRadius="45px"
              color="white"
              w="sm"
              bg="blue.900"
              textTransform={"uppercase"}
            >
              {"Guardar documentación AVO"}
            </Button>
          </Flex>
        </ScaleFade>
      </Center>
      <ModalConfirmacion
        id="modal-confirmacion"
        pregunta={"¿Estás seguro de guardar esta documentación?"}
        datoAConfirmar={
          "Podrás modificarlo desde el menú, en cualquier caso ;)"
        }
        isOpen={estaModalAbierto}
        handleConfirmacion={handleConfirmacion}
        onClose={cerrarModal}
      />
      <ModalError
        pregunta={"Falta ingresar uno o mas archivos"}
        datoAConfirmar={
          "Por favor ingrese todos los archivos necesarios para completar esta etapa"
        }
        isOpen={isOpenError}
        onClose={onCloseError}
      />
      <ModalIsLoading
        mensaje={"Esperanos mientras guardamos la documentación ;)"}
        isOpen={estaCargando}
      />
    </Box>
  );
}

export default ArchivosAVO;
