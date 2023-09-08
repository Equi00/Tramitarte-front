import {
  Box,
  Center,
  Image,
  Flex,
  IconButton,
  Text,
  Wrap,
  WrapItem,
  VStack,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { ArrowBack, Send } from "@mui/icons-material";
import { useNavigate } from "react-router";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import usuarioService from "../services/UsuarioService";
import CardAviso from "../components/CardAviso";

function TraductoresRegistrados() {
  const navigate = useNavigate();

  const [traductores, setTraductores] = useState([]) 

  const handleBack = () => {
    navigate(-1);
  };

  const traduct = async () =>{
    try{
      let traductoresRegistrados = await usuarioService.traerTraductores()
      setTraductores(traductoresRegistrados)
    }catch(e){
      navigate("/network-error");
    }
  }

  const traductoresBuscados = async (mail) =>{
    try{
      let traductoresRegistrados = await usuarioService.buscarTraductores(mail)
      setTraductores(traductoresRegistrados)
    }catch(e){
      navigate("/network-error");
    }
  }

  useEffect(() => {
    traduct()
  }, [])

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
        <SearchBar funcion={traductoresBuscados}/>
      </Flex>
      <Wrap
        spacing={"1.2rem"}
        bg="teal.200"
        p="1.4rem"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {traductores.length === 0 ? <CardAviso text={"No hay Traductores disponibles"}/> :
        traductores.map((traductor, index) => (
          <WrapItem
            w="sm"
            borderRadius="45px"
            bg="whiteAlpha.800"
            key={index}
            border="2px solid"
            borderColor="blue.900"
          >
            <Center flexBasis="30%">
              <Image
                borderLeftRadius="43px"
                boxSize="40%"
                w="100%"
                objectFit={"contain"}
                src={traductor.fotoPerfil}
              />
            </Center>
            <Center h="100%" flexBasis="50%">
              <VStack alignItems="center" justifyContent="center">
                <Heading textAlign="center" fontSize={15}>{traductor.nombre + ' ' + traductor.apellido}</Heading>
                <Text color="teal.400">{traductor.precio}</Text>
              </VStack>
            </Center>
            <Flex justifyContent="flex-end" h="100%" w="20%" flexBasis="30%">
              <IconButton
                color="white"
                bg="teal.400"
                h="100%"
                w="100%"
                borderRightRadius="43px"
                borderLeftRadius="0"
                icon={<Send />}
              />
            </Flex>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

export default TraductoresRegistrados;
