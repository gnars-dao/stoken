import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Stack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePioneer } from "lib/context/Pioneer";

// @ts-ignore
export default function WalletSelect({ onClose }) {
  const { state, dispatch } = usePioneer();
  const { api, app, user } = state;
  const [context, setContext] = useState<any>(null);
  const [walletType, setWalletType] = useState("");
  const [pubkeyContext, setPubkeyContext] = useState("");

  const handleSelectClick = async (wallet: any) => {
    try {
      //
      //console.log("wallet selected! wallet: ", wallet.context);
      //console.log("setContextWallet: ", wallet);
      // eslint-disable-next-line no-console
      //console.log("wallets: ", app.wallets);
      const matchedWallet = app.wallets.find(
        (w: { context: string }) => w.context === wallet.context
      );
      //console.log("matchedWallet: ", matchedWallet);
      if (matchedWallet) {
        setWalletType(matchedWallet.type);
        const context = await app.setContext(matchedWallet.wallet);
        //console.log("result change: ", context);
        //console.log("app.context: ", app.context);
        setContext(app.context);
        //console.log(
        //   "app.pubkeyContext: ",
        //   app.pubkeyContext.master || app.pubkeyContext.pubkey
        // );
        const pubkeyContext =
          app.pubkeyContext.master || app.pubkeyContext.pubkey;
        setPubkeyContext(pubkeyContext);
        dispatch({ type: "SET_CONTEXT", payload: app.context });
        dispatch({ type: "SET_PUBKEY_CONTEXT", payload: app.pubkeyContext });
        // dispatch({ type: "SET_WALLET", payload: wallet });
        onClose();
      } else {
        //console.log("No wallet matched the type of the context");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onRender = async () => {
    try {
      //console.log("context: ", app?.context);
      //console.log("wallets: ", app?.wallets);
      //
      dispatch({ type: "SET_CONTEXT", payload: context });
      setContext(app?.context);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onRender();
  }, [app, app?.context, app?.wallets]); // once on startup

  return (
    <Stack spacing={4}>
      <Box>
        {app?.wallets.map((wallet: any, index: number) => (
          <Box key={index}>
            <HStack spacing={4} alignItems="center">
              {/*<Avatar src={balance.image} />*/}
              <Box>
                <small>type: {wallet.type}</small>
                <br />
                <small>context: {wallet.context}</small>
              </Box>
            </HStack>
            <HStack mt={2} spacing={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSelectClick(wallet)}
              >
                Select
              </Button>
            </HStack>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
