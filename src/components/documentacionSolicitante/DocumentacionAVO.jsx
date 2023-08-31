import { Box, Center } from "@chakra-ui/react";
import InputFile from "./InputFile";
import InputCertficadoNoObligatorio from "./InputCertificadoNoObligatorio";

function DocumentacionAVO({ agregarDocumentacionAVO }) {
  const handleInputCertificadoDefuncion = (e) => {
    agregarDocumentacionAVO({
      id: "certificado-defuncion",
      archivo: e.target.files[0],
    });
  };

  const handleInputCertificadoMatrimonio = (e) => {
    agregarDocumentacionAVO({
      id: "certificado-matrimonio",
      archivo: e.target.files[0],
    });
  };

  const handleInputCertificadoNacimiento = (e) => {
    agregarDocumentacionAVO({
      id: "certificado-nacimiento",
      archivo: e.target.files[0],
    });
  };
  return (
    <Box w="100%" borderRadius="30px" bg="teal.100">
      <Center flexWrap="wrap" gap={2} w="100%" p="2%">
        <InputCertficadoNoObligatorio
          handleOnInput={handleInputCertificadoDefuncion}
          preguntaConfirmacion={"¿Ha fallecido?"}
          accion="certificado de defunción"
        />
        <InputCertficadoNoObligatorio
          handleOnInput={handleInputCertificadoMatrimonio}
          preguntaConfirmacion={"¿Estaba en relación de matrimonio?"}
          accion="certificado de matrimonio"
        />
        <InputFile handleOnInput={handleInputCertificadoNacimiento} accion="certificado de nacimiento" />
      </Center>
    </Box>
  );
}

export default DocumentacionAVO;
