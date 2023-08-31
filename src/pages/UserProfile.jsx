import { useAuth0 } from "@auth0/auth0-react";
import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  VStack,
  Avatar,
  IconButton,
  Center,
  Heading,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { AccountCircle, Close, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router";

function UserProfile() {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleEdit = () => console.log("acá");
  const {user}=useAuth0()

  return (
    <Box minH="100%" h="100%" p="3%" bg="blue.800">
      <Flex minH="100%" bg="whiteAlpha.700" borderRadius="20px">
        <VStack w="100%">
          <Flex w="100%" p=".8rem" justify="space-between">
            <IconButton
              onClick={() => handleBack()}
              color="white"
              bg="blue.900"
              borderRadius="50%"
              size="lg"
              icon={<Close />}
            />
            <IconButton
              onClick={() => handleEdit() }
              color="blue.900"
              borderRadius="50%"
              size="lg"
              icon={<Edit />}
            />
          </Flex>
          <Flex py="2%" w="100%" justifyContent="space-around">
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src={user ? user.picture : JSON.parse(window.localStorage.getItem('usuarioLogueado').fotoPerfil)}
            />
            <Center>
              <Heading color="blue.900" as="h1" size="xl">
                {user.nickname}
              </Heading>
            </Center>
          </Flex>
          <Wrap py="5%" color="blue.900" justifyContent="center">
            <WrapItem p="2.4rem" w="sm">
              <Box justifyContent="center" marginRight="2.4rem">
                <AccountCircle size="lg" />
              </Box>
              <Heading size="md">{user ? user.name : JSON.parse(window.localStorage.getItem('usuarioLogueado').username)}  </Heading>
            </WrapItem>
            <WrapItem p="2.4rem" w="sm">
              <Box justifyContent="center" marginRight="2.4rem">
                <CalendarIcon />
              </Box>
              <Heading size="md">{user ? user.birthdate : JSON.parse(window.localStorage.getItem('usuarioLogueado').fechaDeNacimiento)}</Heading>
            </WrapItem>
          </Wrap>
          
        </VStack>
      </Flex>
      {/* <Circle zIndex="-1" size="40px" bg="teal.200" /> */}
    </Box>
  );
}

export default UserProfile;
