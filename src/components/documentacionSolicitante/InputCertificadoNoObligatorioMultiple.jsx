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
import { useEffect, useState } from "react";

function InputCertficadoNoObligatorioMultiple({ preguntaConfirmacion, accion, handleOnInput, handleCheckbox, index }) {
    const [isChecked, setIsChecked] = useState(false);
  
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
      handleCheckbox((prevChecks) => { //aca agarro la lista de checks y seteo el cambio en el valor del index
        const nuevosChecks = [...prevChecks];
        nuevosChecks[index] = !isChecked;
        return nuevosChecks;
      });
    };
  
    return (
      <Flex color="blue.900" flexDirection="column" justifyContent="space-between">
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={1}>
          <GridItem colSpan={1}>
            <Text overflowWrap={"anywhere"} textAlign="center">
              {preguntaConfirmacion}
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Checkbox isChecked={isChecked} onChange={toggleCheckbox}>
              {"Sí"}
            </Checkbox>
            <Checkbox isChecked={!isChecked} onChange={toggleCheckbox}>
              No
            </Checkbox>
          </GridItem>
          <GridItem colSpan={2}>
            {isChecked && (
              <InputFile handleOnInput={handleOnInput} accion={accion} />
            )}
          </GridItem>
        </Grid>
      </Flex>
    );
  }

  export default InputCertficadoNoObligatorioMultiple