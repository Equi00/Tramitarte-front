import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  IconButton,
  Text,
  Input,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router";
import DocumentacionAVO from "../components/documentacionSolicitante/DocumentacionAVO";
import DocumentacionAscendentesArchivo from "../components/documentacionSolicitante/DocumentacionAscendentes";

function DocumentacionAscendentes() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const [cantidadAncestros, setCantidadAncestros] = useState(0);
  const [estaModalAbierto, setEstaModalAbierto] = useState(false);
  const [documentacionAncestros, setDocumentacionAncestros] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOnInput = (e) => {
    const cantidadAncestros = Number(e.target.value);
    setCantidadAncestros(cantidadAncestros);
  
    const personas = Array(cantidadAncestros).fill({
      certificadoDefuncion: { tipo: "", nombre: "", archivoBase64: "" },
      certificadoMatrimonio: { tipo: "", nombre: "", archivoBase64: "" },
      certificadoNacimiento: { tipo: "", nombre: "", archivoBase64: "" },
      opcional1: false,
      opcional2: false
    });
  
    setDocumentacionAncestros(personas);
  };

  const completarDocumentacionDescendientes = async ({ index, id, archivo }) => {
    const personasActualizadas = [...documentacionAncestros]; // Clona la lista de personas
  
    if (id === "certificado-defuncion") {
      const archivoBase64 = await fileToBase64(archivo);
      personasActualizadas[index].certificadoDefuncion = {
        tipo: "certificado-defuncion",
        nombre: archivo.name,
        archivoBase64: "",
      }
    }
    if (id === "certificado-matrimonio") {
      const archivoBase64 = await fileToBase64(archivo);
      personasActualizadas[index].certificadoMatrimonio = {
        tipo: "certificado-matrimonio",
        nombre: archivo.name,
        archivoBase64: "",
      };
    }
    if (id === "certificado-nacimiento") {
      const archivoBase64 = await fileToBase64(archivo);
      personasActualizadas[index].certificadoNacimiento = {
        tipo: "certificado-nacimiento",
        nombre: archivo.name,
        archivoBase64: "",
      };
    }
  
    setDocumentacionAncestros(personasActualizadas); // Actualiza el estado con la nueva lista de personas
  };

  const abrirModal = () => {
    setEstaModalAbierto(true);
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
      <Center w="full">
        <Center textAlign="center" flexWrap="wrap">
          <Collapse unmountOnExit={true} in={!isOpen}>
            <Flex
              w={{ base: "full", md: "sm" }}
              justifyContent={"center"}
              flexDirection="column"
              p="2%"
            >
              <Text
                as={"h2"}
                fontSize={"3xl"}
              >{`¿Cuántos ascendentes tenés hasta tu AVO?`}</Text>
              <Text as="i">{"*sin incluir a tu AVO"}</Text>
              <Box
                color="white"
                bg="teal.500"
                rounded="40px"
                shadow="md"
                pb="2%"
              >
                <Flex py="2%" px="0.8rem">
                  <Text>{"Cantidad de ancestros"}</Text>
                  <Input
                    type="number"
                    min={0}
                    value={cantidadAncestros}
                    onInput={handleOnInput}
                    rounded="45px"
                    _focus={{ bg: "teal.300" }}
                  ></Input>
                </Flex>
                <Center>
                  <Button
                    borderRadius="45px"
                    color="white"
                    bg="teal.300"
                    w="90%"
                    isDisabled={cantidadAncestros <= 0}
                    onClick={onToggle}
                    textTransform={"uppercase"}
                  >
                    {"Cargar cantidad de ancestros"}
                    <ArrowForward />
                  </Button>
                </Center>
              </Box>
            </Flex>
          </Collapse>
        </Center>
      </Center>
      <Center display={isOpen ? "flex" : "none"} flexWrap="wrap" p="2%">
        <ScaleFade in={isOpen} initialScale={1}>
          <Flex
            textAlign="center"
            flexDirection="column"
            justifyContent="center"
            pb="2%"
            w={"full"}
          >
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
              {"Documentación Ascendentes"}
            </Text>
            <DocumentacionAscendentesArchivo cantidadAscendentes={cantidadAncestros} personas={documentacionAncestros} agregarDocumentacionDescendiente={completarDocumentacionDescendientes}
            setPersonas={setDocumentacionAncestros} />
          </Flex>
          <Flex w="full" py="4">
            <Button
              onClick={abrirModal}
              borderRadius="45px"
              color="white"
              w="100%"
              bg="blue.900"
              textTransform={"uppercase"}
            >
              {"Guardar documentación"}
            </Button>
          </Flex>
        </ScaleFade>
      </Center>
    </Box>
  );
}

export default DocumentacionAscendentes;
