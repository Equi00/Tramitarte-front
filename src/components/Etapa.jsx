import {
  CircularProgress,
  CircularProgressLabel,
  Card,
  CardBody,
  CardHeader,
  Heading,
  CardFooter,
  Button,
  IconButton,
  HStack,
  Box,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";

import { Delete } from "@mui/icons-material";
import banderaItailiana from "../assets/baneraItaliana.png";
import { useNavigate, useParams } from "react-router";
import tramiteService from "../services/TramiteService";
import { useState, useCallback, useEffect } from "react";
import ModalConfirmacion from "./ModalConfirmacion";
import ModalIsLoading from "./ModalIsLoading";
import CardAviso from "./CardAviso";
import usuarioService from "../services/UsuarioService";

const BanderaItaliana = ({ height }) => (
  <Box zIndex={-1} position="" left={0} bottom={1} h={height}>
    <Box
      display="inline-block"
      borderRadius="10px 0 0 10px"
      w="33%"
      h="100%"
      bg="green.200"
    />
    <Box display="inline-block" w="33%" h="100%" bg="white" />
    <Box
      display="inline-block"
      borderRadius="0 10px 10px 0"
      w="33%"
      h="100%"
      bg="red.300"
    />
  </Box>
);

function Etapa({ tramite }) {
  const navigate = useNavigate();
  const { idUsuario } = useParams();
  const [estaCargando, setEstaCargando] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pedidos, setPedidos] = useState([])
  const [pedidoGuardado, setPedidoGuardado] = useState()
  const [estaEliminarAbierto, setEstaEliminarAbierto] = useState(false);
  const [estaAceptarAbierto, setEstaAceptarAbierto] = useState(false);

  const abrirModalEnviar = (pedidoEnganchado) => {
    let pedido = pedidoEnganchado
    setPedidoGuardado(pedido)
    console.log("pedido enganchado: ",pedidoEnganchado)
    setEstaAceptarAbierto(true);
  };

  const cerrarModalEnviar = () => {
    setEstaAceptarAbierto(false);
  };

const abrirModalCancelar = (pedidoEnganchado) => {
    let pedido = pedidoEnganchado
    setPedidoGuardado(pedido)
    console.log("pedido enganchado: ",pedidoEnganchado)
    setEstaEliminarAbierto(true);
  };

  const cerrarModalCancelar = () => {
    setEstaEliminarAbierto(false);
  };

  const handleConfirmacion = useCallback(() => {
    setEstaCargando(true);
    return tramiteService
      .eliminar(tramite.id)
      .then((response) => {
        setEstaCargando(false);
        navigate(`/home/solicitante/${idUsuario}`, { replace: true });
        window.location.replace('')
        return response;
      })
      .catch((error) => navigate("/network-error"));
  }, []);

  const traerSolicitudDescarga = async () => {
    let solicitudDescarga = await usuarioService.buscarSolicitudDescargaPorSolicitante(idUsuario)
    setPedidos(solicitudDescarga)
  }

  const eliminarSolicitud = async () => {
    await usuarioService.eliminarSolicitudDescarga(pedidoGuardado.id)
    cerrarModalCancelar()
  }

  const enviarSolicitudDescarga = () => {
    console.log("todo descargado")
    cerrarModalEnviar()
  }

  useEffect(() => {
    traerSolicitudDescarga()
  }, [pedidos])

  function elegirRuta(descripcionEtapa) {
    let basePath = `/home/solicitante/${idUsuario}`;
    let completePath;
    switch (descripcionEtapa.toUpperCase()) {
      case "CARGAR AVO":
        completePath = `${basePath}/solicitud-avo`;
        break;
      case "CARGAR DOCUMENTACION DE USUARIO":
        completePath = `${basePath}/documentacion-personal`;
        break;
      case "CARGAR DOCUMENTACIÓN DE AVO":
        completePath = `${basePath}/documentacion-avo`;
        break;
      case "CARGAR DOCUMENTACIÓN DE DESCENDIENTES":
        completePath = `${basePath}/documentacion-ascendentes`;
        break;
      case "CARGAR DOCUMENTACIÓN TRADUCIDA":
        completePath = `${basePath}/documentacion-traducida`;
        break;
    }
    return completePath;
  }

  function calcularPorcentaje(descripcionEtapa) {
    let porcentaje;
    switch (descripcionEtapa.toUpperCase()) {
      case "CARGAR AVO":
        porcentaje = "1";
        break;
      case "CARGAR DOCUMENTACION DE USUARIO":
        porcentaje = "20";
        break;
      case "CARGAR DOCUMENTACIÓN DE AVO":
        porcentaje = "55";
        break;
      case "CARGAR DOCUMENTACIÓN DE DESCENDIENTES":
        porcentaje = "70";
        break;
      case "CARGAR DOCUMENTACIÓN TRADUCIDA":
        porcentaje = "90";
        break;
    }
    return porcentaje;
  }

  return (
    <Box >
      <Card borderRadius="45px" bg="rgba(255, 255, 255, 0.8)" align="center">
        <CardHeader>
          <HStack spacing="2%">
            <Heading size="md">{tramite.codigo}</Heading>
            <IconButton
              aria-label="Borrar trámite"
              color="red.500"
              size="lg"
              icon={<Delete fontSize="large" />}
              onClick={onOpen}
            ></IconButton>
          </HStack>
        </CardHeader>
        <CardBody align="center">
          <CircularProgress
            capIsRound
            trackColor="blue.100"
            size="300px"
            value={calcularPorcentaje(tramite.etapa.descripcion)}
            color="blue.900"
            thickness="10%"
          >
            <CircularProgressLabel>
              {calcularPorcentaje(tramite.etapa.descripcion)}%
            </CircularProgressLabel>
          </CircularProgress>
        </CardBody>
        <CardFooter w="100%">
          <Button
            onClick={() => {
              navigate(elegirRuta(tramite.etapa.descripcion));
            }}
            textTransform="uppercase"
            borderRadius="45px"
            w={{ base: "100%", md: "md"}}
            color="white"
            bg="red.900"
            whiteSpace={'normal'}
          >
            {tramite.etapa.descripcion}
          </Button>
        </CardFooter>

        <ModalConfirmacion
          isOpen={isOpen}
          handleConfirmacion={() => handleConfirmacion()}
          pregunta={"¿Estás seguro de eliminar el trámite?"}
          datoAConfirmar={"Al borrarlo, no podrás recuperar sus datos"}
          onClose={onClose}
        />
        <ModalIsLoading estaCargando={estaCargando} />
      </Card>
      {pedidos.length === 0 ? <div></div> :
        pedidos.map((pedido, index) => (
      <Card
          borderRadius="45px"
          bg="rgba(255, 255, 255, 0.8)"
          align="center"
          key={index}
          h={"10rem"}
          marginTop={"1rem"}
        >
          <CardHeader>
            <Heading textAlign="center" size="md">{"Documentos listos para descargar"}</Heading>
          </CardHeader>
          <CardFooter w="20rem" justifyContent={"space-around"}>
            <Button
              borderRadius="45px"
              color="white"
              w="6rem"
              bg="green.400"
              onClick={() => abrirModalEnviar(pedido)}
            >
              {"Descargar"}
            </Button>
            <Button
              borderRadius="45px"
              color="white"
              w="6rem"
              bg="red.900"
              onClick={() => abrirModalCancelar(pedido)}
            >
              {"Eliminar"}
            </Button>
          </CardFooter>
        </Card>
        ))}
        <ModalConfirmacion
              id="modal-confirmacion"
              pregunta={"¿Estás seguro de eliminar la entrega de documentos?"}
              isOpen={estaEliminarAbierto}
              handleConfirmacion={eliminarSolicitud}
              onClose={cerrarModalCancelar}
      />
      <ModalConfirmacion
              id="modal-confirmacion"
              pregunta={"¿Estás seguro de descargar los documentos?"}
              isOpen={estaAceptarAbierto}
              handleConfirmacion={enviarSolicitudDescarga} //falta logica de descarga
              onClose={cerrarModalEnviar}
      />
    </Box>
  );
}

export default Etapa;
