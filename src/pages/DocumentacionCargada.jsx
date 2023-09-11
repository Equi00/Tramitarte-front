import {
  Box,
  Flex,
  IconButton,
  Text,
  Wrap,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Center,
} from "@chakra-ui/react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import {  Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import usuarioService from "../services/UsuarioService";


function DocumentacionCargada() {
  const navigate = useNavigate();
  const [documentosCargados, setDocumentosCargados]=useState([])
  
  const cargarDocumentacion = async() => {
    const documentacion= await usuarioService.traerDocumentacionCargada(JSON.parse(window.localStorage.getItem('usuarioLogueado')).id)
    setDocumentosCargados(documentacion)
   
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    cargarDocumentacion();
  }, []); 

  return (
    <Box minH="100%" bg="teal.200">
      <Flex
        p=".8rem"
        justifyContent="space-between"
        alignItems="center"
        gap="2%"
      >
        <IconButton
          onClick={() => handleBack()}
          borderRadius="45px"
          color="blue.900"
          bg="white"
          icon={<ArrowBack />}
        />
      </Flex>
      <Wrap
        spacing={"1.2rem"}
        bg="teal.200"
        p="1.4rem"
        justifyContent={"center"}
      >
        {documentosCargados.length === 0 ? <Card text={"No hay certificados cargados aún"}/> : documentosCargados.map((documento, index) => (
          <Flex py="1.2rem" justifyContent="center">
            <Card
              borderRadius="45px"
              bg="rgba(255, 255, 255, 0.8)"
              align="center"
              p="1.6rem"
            >           
              <CardHeader>
                <Heading textAlign="center" size="md">
                  {documento.nombre}
                </Heading>
              </CardHeader>
              <CardBody align="center">
                <Text>{documento.tipo}</Text>
              </CardBody>
              <CardFooter w="100%">
                <Text color="white" w="100%" bg="red.900" borderRadius={"45px"}>
                  <Center>{documento.id}</Center>
                </Text>
              </CardFooter>
              <IconButton
                color="red.900"
                borderRadius="50%"
                size="lg"
                icon={<Edit />}
              />
            </Card>
          </Flex>
        ))}
      </Wrap>
    </Box>
  );
}

export default DocumentacionCargada;
