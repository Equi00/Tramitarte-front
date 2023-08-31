import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { Search } from "@mui/icons-material";

function SearchBar() {
  return (
    <InputGroup maxW={"md"} borderRadius={"45px"} size="sm">
      <InputLeftElement
        borderLeftRadius={"45px"}
        pointerEvents="none"
        bg="teal.400"
        color="white"
        children={<Search />}
      />
      <Input borderLeftRadius={"45px"} type="text" placeholder="Buscar..." border="1px solid" borderColor="white" />
      <InputRightAddon borderRightRadius={"45px"} p={0} border="none">
        <Button
          size="sm"
          borderLeftRadius={0}
          borderRightRadius={"45px"}
          border="1px solid"
          bg='teal.400'
          color="whiteAlpha.900"
        >
          Buscar
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
}

export default SearchBar;
