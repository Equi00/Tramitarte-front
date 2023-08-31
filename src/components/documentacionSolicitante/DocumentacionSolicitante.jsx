import InputFile from "./InputFile";
import { Box, Center, Flex } from "@chakra-ui/react";

function DocumentacionSolicitante({
  agregarDocumentacionSolicitante,
}) {
  const handleInputDniFrente = (e) => {
    agregarDocumentacionSolicitante({
      id: "dni-frente",
      archivo: e.target.files[0],
    });
  };

  const handleInputDniDorso = (e) => {
    agregarDocumentacionSolicitante({
      id: "dni-dorso",
      archivo: e.target.files[0],
    });
  };

  const handleInputCertificadoNacimiento = (e) => {
    agregarDocumentacionSolicitante({
      id: "certificado-nacimiento",
      archivo: e.target.files[0],
    });
  };

  return (
    <Box w="100%" borderRadius="30px" bg="teal.100">
      <Center flexWrap="wrap" gap={2} w="100%" p="2%">
        <InputFile handleOnInput={handleInputDniFrente} accion="dni frente" />
        <InputFile handleOnInput={handleInputDniDorso} accion="dni dorso" />
        <InputFile handleOnInput={handleInputCertificadoNacimiento} accion="certificado de nacimiento" />
      </Center>
    </Box>
  );
}

export default DocumentacionSolicitante;
