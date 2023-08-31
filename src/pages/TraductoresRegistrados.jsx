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
} from "@chakra-ui/react";
import { ArrowBack, Send } from "@mui/icons-material";
import { useNavigate } from "react-router";
import SearchBar from "../components/SearchBar";

function TraductoresRegistrados() {
  const navigate = useNavigate();

  const traductores = [
    {
      nombre: "Leandro",
      apellido: "Gómez",
      precio: "9900",
      fotoPerfil:
        "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      nombre: "Aníbal",
      apellido: "Troilo",
      precio: "10500",
      fotoPerfil:
        "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      nombre: "Solange",
      apellido: "Estéban",
      precio: "1200",
      fotoPerfil:
        "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

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
        <SearchBar />
      </Flex>
      <Wrap
        spacing={"1.2rem"}
        bg="teal.200"
        p="1.4rem"
        justifyContent={"center"}
      >
        {traductores.map((traductor, index) => (
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
                <Heading textAlign="center">{traductor.nombre + ' ' + traductor.apellido}</Heading>
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
