import InputCertficadoNoObligatorio from "./InputCertificadoNoObligatorio";
import InputFile from "./InputFile";
import { Box, Center } from "@chakra-ui/react";

function DocumentacionAscendentes({ cantidadAscendentes }) {
  return (
    <Box key={cantidadAscendentes} borderRadius="30px" bg="teal.100">
      {[...Array(cantidadAscendentes).keys()].map((item) => (
        <Box key={item}>
          <Center py="2%">
            <InputCertficadoNoObligatorio
              preguntaConfirmacion={"¿Ha fallecido?"}
              accion="certificado de defunción"
            />
          </Center>
          <Center py="2%">
            <InputCertficadoNoObligatorio
              preguntaConfirmacion={"¿Estaba en relación de matrimonio?"}
              accion="certificado de matrimonio"
            />
          </Center>
          <Center py="2%">
            <InputFile accion="certificado de nacimiento" />
          </Center>
        </Box>
      ))}
    </Box>
  );
}

export default DocumentacionAscendentes;
