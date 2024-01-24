import {
  chakra,
  Stack,
  CircularProgress,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  Image,
  MenuButton,
  MenuDivider,
  Icon,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaCog } from "react-icons/fa";
import { Img } from "react-image";
import { KeepKeyIcon } from "lib/assets/Icons/KeepKeyIcon";
// @ts-ignore
import KEEPKEY_ICON from "lib/assets/png/keepkey.png";
// @ts-ignore
import METAMASK_ICON from "lib/assets/png/metamask.png";
// @ts-ignore
import PIONEER_ICON from "lib/assets/png/pioneer.png";
//@ts-ignore
import { ModalContext } from "lib/components/modals";
import SettingsModal from "lib/components/modals/SettingsModal";
import { MiddleEllipsis } from "lib/components/utils";
import { usePioneer } from "lib/context/Pioneer";

import Balances from "./Pioneer/Balances";
import Wallets from "./Pioneer/Wallets";

const getWalletType = (user: { walletDescriptions: any[] }, context: any) => {
  if (user && user.walletDescriptions) {
    const wallet = user.walletDescriptions.find((w) => w.id === context);
    return wallet ? wallet.type : null;
  }
  return null;
};

const getWalletBadgeContent = (walletType: string) => {
  const icons: any = {
    metamask: METAMASK_ICON,
    keepkey: KEEPKEY_ICON,
    native: PIONEER_ICON,
  };

  const icon = icons[walletType];

  return (
    <AvatarBadge boxSize="1.25em" bg="green.500">
      <Image rounded="full" src={icon} />
    </AvatarBadge>
  );
};

const getWalletSettingsContent = (walletType: string) => {
  const icons: any = {
    metamask: METAMASK_ICON,
    keepkey: KEEPKEY_ICON,
    native: PIONEER_ICON,
  };

  const icon = icons[walletType];

  if (!icon) {
    return <div />;
  }

  return icon;
};

const Pioneer = () => {
  const { state, dispatch, connectWallet } = usePioneer();
  const { api, app, user, status } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // local
  const [walletsAvailable, setWalletsAvailable] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [walletType, setWalletType] = useState("");
  const [walletDescriptions, setWalletDescriptions] = useState([]);
  const [metamaskPaired, setMetamaskPaired] = useState(false);
  const [keepkeyPaired, setKeepkeyPaired] = useState(false);
  const [nativePaired, setNativePaired] = useState(false);
  const [pioneerImage, setPioneerImage] = useState("");
  const [walletSettingsContext, setWalletSettingsContext] = useState("");
  const [context, setContext] = useState("");
  const [assetContext, setAssetContext] = useState("");
  const [assetContextImage, setAssetContextImage] = useState("");
  const [blockchainContext, setBlockchainContext] = useState("");
  const [pubkeyContext, setPubkeyContext] = useState("");
  const [blockchainContextImage, setBlockchainContextImage] = useState("");
  const [isSynced, setIsSynced] = useState(false);
  const [isPioneer, setIsPioneer] = useState(false);
  const [isFox, setIsFox] = useState(false);
  const [pubkeys, setPubkeys] = useState([]);
  const [balances, setBalances] = useState([]);

  const handleWalletClick = (wallet: {
    type: any;
    icon?: string | undefined;
    isConnected?: any;
  }) => {
    console.log("Clicked wallet:", wallet.type);
    connectWallet(wallet.type);
    // Here you can use the 'connectMethodName' to handle specific click actions
    // For example: if (wallet.wallet.connectMethodName === 'connectKeepKey') { ... }
  };

  const renderWallets = () => {
    console.log("rendering wallets!");
    console.log("rendering wallets!", app?.wallets);
    return walletsAvailable.map(
      (wallet: any) => (
        <Card
          key={wallet.type}
          align="center"
          onClick={() => handleWalletClick(wallet)}
        >
          <CardBody>
            <Avatar src={wallet.icon}>
              {wallet.isConnected ? (
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              ) : (
                <AvatarBadge boxSize="1.25em" bg="red.500" />
              )}
            </Avatar>
          </CardBody>
          <small>{wallet.type}</small>
        </Card>
      )
    );
  };

  const onStart = async function () {
    try {
      console.log("onStart");
      if (app && app.wallets) {
        console.log("wallets", app.wallets);
        setWalletsAvailable(app.wallets);
        connectWallet('KEEPKEY')
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    onStart();
  }, [app, app?.wallets]);

  const settingsSelected = async function () {
    try {
      //console.log("settingsSelected");
      onOpen();
    } catch (e) {
      console.error(e);
    }
  };

  const setContextWallet = async function (wallet: string) {
    try {
    } catch (e) {
      console.error("header e: ", e);
    }
  };

  const setUser = async function () {
    try {
      console.log("wallets: ", app?.wallets);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-console
      console.error("header e: ", e);
      // setKeepKeyError("Bridge is offline!");
    }
  };

  useEffect(() => {
    setUser();
  }, [status, app, app?.wallets]);

  useEffect(() => {
    dispatch({ type: "SET_CONTEXT", payload: context });
    setContext(app?.context);
  }, [app?.context]); // once on startup

  useEffect(() => {
    dispatch({ type: "SET_ASSET_CONTEXT", payload: app?.assetContext });
    setAssetContext(app?.assetContext?.symbol);
    //console.log(app?.assetContext);
  }, [app?.assetContext?.name]); // once on startup

  useEffect(() => {
    dispatch({
      type: "SET_BLOCKCHAIN_CONTEXT",
      payload: app?.blockchainContext,
    });
    setBlockchainContext(app?.blockchainContext?.name);
    //console.log(app?.blockchainContext);
  }, [app?.blockchainContext?.name]); // once on startup

  useEffect(() => {
    dispatch({ type: "SET_PUBKEYS_CONTEXT", payload: app?.pubkeyContext });
    setPubkeyContext(app?.pubkeyContext?.master || app?.pubkeyContext?.pubkey);
  }, [app?.pubkeyContext?.pubkey]); // once on startup

  const avatarContent = api ? (
    getWalletBadgeContent(walletType)
  ) : (
    <AvatarBadge boxSize="1em" bg="red.500">
      <CircularProgress isIndeterminate size="1em" color="white" />
    </AvatarBadge>
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        minW={100}
      >
        <Avatar size="lg">
          {isPioneer ? (
            <Avatar size="lg" src={pioneerImage}>
              {avatarContent}
            </Avatar>
          ) : (
            <Avatar size="lg" src={PIONEER_ICON}>
              {avatarContent}
            </Avatar>
          )}
        </Avatar>
      </MenuButton>
      <MenuList>
        <Box borderBottomWidth="1px" p="4">
          <HStack justifyContent="space-between">
            <Button
              leftIcon={
                <Avatar size="xs" src={getWalletSettingsContent(walletType)}>
                  <AvatarBadge boxSize="0.75em" bg="green.500" />
                </Avatar>
              }
            >
              <small>
                <MiddleEllipsis text={context} />
              </small>
            </Button>
            <IconButton
              icon={<FaCog />}
              isRound
              onClick={() => settingsSelected()}
              aria-label="Settings"
            />
            <SettingsModal isOpen={isOpen} onClose={onClose} />
          </HStack>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="md"
          p="4"
          textAlign="left"
          maxWidth="300px"
          width="100%"
        >
          <div>
            <Flex alignItems="center">
              <small>status: {status}</small>
            </Flex>
            <Card
              p={2}
              borderRadius="md"
              boxShadow="sm"
              mb={2}
              className="caip"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <Avatar size="md" src={app?.assetContext?.image} mr={2} />
                  <Box fontSize="sm" fontWeight="bold">
                    Asset:
                  </Box>
                </Flex>
                <Box fontSize="sm" textAlign="right">
                  {app?.assetContext?.symbol}
                </Box>
              </Flex>
              <Flex justifyContent="space-between">
                <Box fontSize="xs"></Box>
                <Box fontSize="xs" textAlign="right">
                  caip:
                  <MiddleEllipsis text={app?.assetContext?.caip} />
                </Box>
              </Flex>
            </Card>

            {/* Blockchain Card */}
            <Card
              p={2}
              borderRadius="md"
              boxShadow="sm"
              mb={2}
              className="caip"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <Avatar
                    size="md"
                    src={app?.blockchainContext?.image}
                    mr={2}
                  />
                  <Box fontSize="sm" fontWeight="bold">
                    Blockchain:
                  </Box>
                </Flex>
                <Box fontSize="sm" textAlign="right">
                  {app?.blockchainContext?.name}
                </Box>
              </Flex>
              <Flex justifyContent="space-between">
                <Box fontSize="xs"></Box>
                <Box fontSize="xs" textAlign="right">
                  caip:
                  <MiddleEllipsis text={app?.blockchainContext?.caip} />
                </Box>
              </Flex>
            </Card>

            {/* Pubkey Card */}
            <Card p={2} borderRadius="md" boxShadow="sm" className="caip">
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  {/*<Img*/}
                  {/*    src={[app?.pubkeyContext?.walletImage]}*/}
                  {/*    //@ts-ignore*/}
                  {/*    loader={() => <Avatar size="md" src={app?.pubkeyContext?.walletImage} />} // Fixed: Make sure <Avatar /> returns an Element*/}
                  {/*    //@ts-ignore*/}
                  {/*    unloader={() => <Avatar size="md" src={app?.pubkeyContext?.walletImage} />} // Fixed: Make sure <Avatar /> returns an Element*/}
                  {/*    container={(children) => (*/}
                  {/*        <div*/}
                  {/*            style={{*/}
                  {/*              width: "32px",*/}
                  {/*              height: "32px",*/}
                  {/*              borderRadius: "50%",*/}
                  {/*              overflow: "hidden",*/}
                  {/*            }}*/}
                  {/*        >*/}
                  {/*          {children}*/}
                  {/*        </div>*/}
                  {/*    )}*/}
                  {/*/>*/}
                  <Box fontSize="sm" fontWeight="bold">
                    Pubkey Path:
                  </Box>
                </Flex>
                <Box fontSize="sm" textAlign="right">
                  <MiddleEllipsis text={app?.pubkeyContext?.path} />
                </Box>
              </Flex>
              <Flex justifyContent="space-between">
                <Box fontSize="xs">Pubkey:</Box>
                <Box fontSize="xs" textAlign="right">
                  <MiddleEllipsis text={app?.pubkeyContext?.pubkey} />
                </Box>
              </Flex>
            </Card>
          </div>
        </Box>

        <MenuItem>
          <SimpleGrid columns={3} row={1}>
            {renderWallets()}
          </SimpleGrid>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Pioneer;
