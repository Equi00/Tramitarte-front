import { Button, Input } from "@chakra-ui/react";
import { FileUpload } from "@mui/icons-material";
import { useRef } from "react";

function InputFile({ accion, handleOnInput }) {
  const inputOculto = useRef(null);
  const openInput = () => {
    inputOculto.current.click();
  };
  return (
    <>
      <Button
        borderRadius="45px"
        color="white"
        bg="teal.300"
        _hover={{bg: "teal.200"}}
        w={{ base: '100%', md: 'auto'}}
        onClick={openInput}
        textTransform={"uppercase"}
        textAlign={"center"}
      >
        {accion}
        <FileUpload />
      </Button>
      <Input id={accion} onInput={handleOnInput} ref={inputOculto} type="file" accept="image/*" display="none" />
    </>
  );
}

export default InputFile;
