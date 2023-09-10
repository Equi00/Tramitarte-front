import {
    Card,
    Text,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    Button,
    Flex,
    useDisclosure,
    Grid,
    HStack,
    IconButton,
  } from "@chakra-ui/react";
  
  import ModalConfirmacion from "./ModalConfirmacion";
  import tramiteService from "../services/TramiteService";
  import { useNavigate, useParams } from "react-router";
  import { useState, useCallback, useEffect } from "react";
  import ModalIsLoading from "./ModalIsLoading";
import CardAviso from "./CardAviso";
import { Close, Delete } from "@mui/icons-material";
import usuarioService from "../services/UsuarioService";
import { useAuth0 } from "@auth0/auth0-react";
  
  function CardTraduccion() {
    const { idUsuario } = useParams();
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([])
    const [pedidoGuardado, setPedidoGuardado] = useState()
    const [estaEliminarAbierto, setEstaEliminarAbierto] = useState(false);
    const [estaAceptarAbierto, setEstaAceptarAbierto] = useState(false);
    const {user}=useAuth0()

    const abrirModalEnviar = (pedidoEnganchado) => {
        let pedido = pedidoEnganchado
        setPedidoGuardado(pedido)
        console.log("pedido enganchado: ",pedidoEnganchado.tramite.usuario.nombre)
        setEstaAceptarAbierto(true);
      };
    
      const cerrarModalEnviar = () => {
        setEstaAceptarAbierto(false);
      };
    
    const abrirModalCancelar = (pedidoEnganchado) => {
        let pedido = pedidoEnganchado
        setPedidoGuardado(pedido)
        console.log("pedido enganchado: ",pedidoEnganchado.tramite.usuario.nombre)
        setEstaEliminarAbierto(true);
      };
    
      const cerrarModalCancelar = () => {
        setEstaEliminarAbierto(false);
      };

    const traerPedidos = async () => {
        try{
            let pedidosTraduccion = await usuarioService.buscarPedidoTraduccion(idUsuario)
            setPedidos(pedidosTraduccion)
        }catch(e){
            navigate("network-error")
        }
    }

    const enviarNotificacionCancelar = async () => {
        await usuarioService.eliminarPedidoTraduccion(pedidoGuardado.id)
        await usuarioService.enviarAlerta(idUsuario, pedidoGuardado.tramite.usuario.id, "El traductor "+user.name+" ha rechazado su pedido de traducción")
        cerrarModalCancelar()
      }

    const enviarSolicitudDescarga = async () => {
        await usuarioService.crearSolicitudDescarga(pedidoGuardado.tramite.usuario.id, idUsuario)
        console.log("se envio")
        await usuarioService.eliminarPedidoTraduccion(pedidoGuardado.id)
        await usuarioService.enviarAlerta(idUsuario, pedidoGuardado.tramite.usuario.id, "El traductor "+user.name+" ha enviado los documentos traducidos")
        setEstaAceptarAbierto(false);
    }

    useEffect(() => {
        traerPedidos()
    }, [pedidos])
  
    return (
      <Grid py="1.2rem" justifyContent="center">
        {pedidos.length === 0 ? <CardAviso text={"No hay trabajos para traducción"}/> :
        pedidos.map((pedido, index) => (
        <Card
          key={index}
          borderRadius="45px"
          bg="rgba(255, 255, 255, 0.8)"
          align="center"
          p="1.6rem"
          w={"20rem"}
          marginBottom={"1rem"}
        >
            <HStack spacing="2%" justifyContent={"right"} width={"100%"}>
                <IconButton
                    aria-label="Borrar trámite"
                    color="red.500"
                    size="lg"
                    onClick={() => abrirModalCancelar(pedido)}
                    icon={<Delete fontSize="large" />}
                    
            ></IconButton>
            </HStack>
          <CardHeader>
            <Heading textAlign="center" size="md">{"Solicitud de traducción"}</Heading>
          </CardHeader>
          <CardBody align="center">
            <Text>{"Correo del solicitante: "+pedido.tramite.usuario.nombre}</Text>
          </CardBody>
          <CardFooter w="20rem" justifyContent={"space-between"}>
            <Button
              onClick={() => abrirModalEnviar(pedido)}
              borderRadius="45px"
              color="white"
              w="6rem"
              bg="green.500"
            >
              {"Enviar"}
            </Button>

            <Button
              borderRadius="45px"
              color="white"
              w="6rem"
              bg="red.900"
            >
              {"Descargar"}
            </Button>
          </CardFooter>
        </Card>
        ))}
        <ModalConfirmacion
              id="modal-confirmacion"
              pregunta={pedidoGuardado && "¿Estás seguro de rechazar el pedido de "+pedidoGuardado.tramite.usuario.nombre+"?"}
              isOpen={estaEliminarAbierto}
              handleConfirmacion={enviarNotificacionCancelar}
              onClose={cerrarModalCancelar}
      />
      <ModalConfirmacion
              id="modal-confirmacion"
              pregunta={pedidoGuardado && "¿Estás seguro de enviar el pedido de "+pedidoGuardado.tramite.usuario.nombre+"?"}
              isOpen={estaAceptarAbierto}
              handleConfirmacion={enviarSolicitudDescarga}
              onClose={cerrarModalEnviar}
      />
      </Grid>
    );
  }
  
  export default CardTraduccion;