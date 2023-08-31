import {
  Stack,
  Checkbox,
  Box,
  useDisclosure,
  Text,
  Flex,
  Collapse,
  Center,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import InputFile from "./InputFile";

function InputCertficadoNoObligatorio({ preguntaConfirmacion, accion, handleOnInput }) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex
      color="blue.900"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={1}
      >
        <GridItem colSpan={1}>
          <Text overflowWrap={"anywhere"} textAlign="center">
            {preguntaConfirmacion}
          </Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Checkbox isChecked={isOpen} onChange={onToggle}>
            {"Sí"}
          </Checkbox>
          <Checkbox isChecked={!isOpen} onChange={onToggle}>
            No
          </Checkbox>
        </GridItem>
        <GridItem colSpan={2}>
          <Collapse in={isOpen}>
            <InputFile handleOnInput={handleOnInput} accion={accion} />
          </Collapse>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default InputCertficadoNoObligatorio;
