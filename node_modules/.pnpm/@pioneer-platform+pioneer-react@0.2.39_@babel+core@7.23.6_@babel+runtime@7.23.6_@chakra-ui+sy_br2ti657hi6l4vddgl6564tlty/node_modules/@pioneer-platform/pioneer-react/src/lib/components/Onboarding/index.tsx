import {
    Box,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    Card,
    CardBody,
    TabPanel,
    Avatar,
    SimpleGrid,
    AvatarBadge,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    VStack,
    Radio,
    RadioGroup
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import * as bip39 from 'bip39';
// @ts-ignore
import KEEPKEY_ICON from "lib/assets/png/keepkey.png";
// @ts-ignore
import METAMASK_ICON from "lib/assets/png/metamask.png";
// @ts-ignore
import PIONEER_ICON from "lib/assets/png/pioneer.png";

import { usePioneer } from "lib/context/Pioneer";

interface ModalProps {
    onClose: () => void;
}
//@ts-ignore
const Onboarding: React.FC<ModalProps> = ({ onClose }) => {
    const { state, dispatch } = usePioneer();
    const { api, app, user, context } = state;
    const [walletDescriptions, setWalletDescriptions] = useState([]);
    const [balances, setBalances] = useState([]);
    const [metamaskPaired, setMetamaskPaired] = useState(false);
    const [keepkeyPaired, setKeepkeyPaired] = useState(false);
    const [nativePaired, setNativePaired] = useState(false);
    const [walletType, setWalletType] = useState("");
    const [pubkeyContext, setPubkeyContext] = useState("");
    const [seedPhrase, setSeedPhrase] = useState('');
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [action, setAction] = useState(null);

    const setUser = async function () {
        try {
            if (user && user.wallets) {
                const { wallets, walletDescriptions, balances, pubkeys } = user;
                setWalletDescriptions(walletDescriptions);
                setBalances(balances);
            }
        } catch (e) {
            console.error("header e: ", e);
        }
    };

    const setContextWallet = async function (wallet: string) {
        try {
            //console.log("setContextWallet: ", wallet);
            // eslint-disable-next-line no-console
            //console.log("wallets: ", app.wallets);
            const matchedWallet = app.wallets.find(
                (w: { type: string }) => w.type === wallet
            );
            //console.log("matchedWallet: ", matchedWallet);
            if (matchedWallet) {
                setWalletType(matchedWallet.type);
                const context = await app.setContext(matchedWallet.wallet);
                //console.log("result change: ", context);
                //console.log("app.context: ", app.context);

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
            } else {
                //console.log("No wallet matched the type of the context");
            }
        } catch (e) {
            console.error("header e: ", e);
        }
    };

    useEffect(() => {
        setUser();
    }, [user]); // once on startup

    useEffect(() => {
        const words = seedPhrase.trim().split(' ');
        if (words.length === 12 && words.every(word => word.length > 0)) {
            setError(null);
            setIsValid(true);
        } else {
            // @ts-ignore
            setError('Seed phrase must be exactly 12 words');
            setIsValid(false);
        }
    }, [seedPhrase]);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (isValid) {
            console.log('Seed Phrase Submitted:', seedPhrase);
            //save to local storage
            localStorage.setItem("seedPhrase", seedPhrase);
            // @ts-ignore
            localStorage.setItem("isOnboarded", "true");
            alert("Wallet Saved to localstorage. please restart app /n (Note: this is not secure! use a hardware wallet!)");
            onClose()
        }
    };

    const handleActionSelection = (value: string) => {
        console.log("value: ", value);
        // @ts-ignore
        setAction(value);
        if (value === 'import'){
            setSeedPhrase('');
        }
    };

    const handleImport = () => {
        setSeedPhrase("");
        // @ts-ignore
        setAction('import')
    };

    const handleGenerate = () => {
        const newSeedPhrase = bip39.generateMnemonic();
        setSeedPhrase(newSeedPhrase);
        // @ts-ignore
        setAction('generate');
    };

    return (
        <Box>
            Welcome to Pioneer SDK! Please select a wallet to continue.
            <br/>
            <Avatar size="lg" src={PIONEER_ICON}>
            </Avatar>
            {action ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!error}>
                            <FormLabel htmlFor="seedPhrase">Seed Phrase</FormLabel>
                            <Input
                                id="seedPhrase"
                                name="seedPhrase"
                                type="text"
                                value={seedPhrase}
                                onChange={(e) => setSeedPhrase(e.target.value)}
                                borderColor={isValid ? 'green.500' : 'red.500'}
                            />
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormControl>
                        <Button mt={4} colorScheme="teal" type="submit">
                            Submit
                        </Button>
                    </form>
                    <Button mt={4} onClick={() => setAction(null)}>
                        Go Back
                    </Button>
                </>
            ) : (
                <VStack spacing={4}>
                    <Button colorScheme="teal" onClick={handleGenerate}>
                        Generate New Seed Phrase
                    </Button>
                    <Button colorScheme="teal" onClick={handleImport}>
                        Import Seed Phrase
                    </Button>
                </VStack>
            )}
            {/*<SimpleGrid columns={3} row={1}>*/}
            {/*    <Card align="center" onClick={() => setContextWallet("native")}>*/}
            {/*        <CardBody>*/}
            {/*            <Avatar src={PIONEER_ICON}>*/}
            {/*                {nativePaired ? (*/}
            {/*                    <div>*/}
            {/*                        <AvatarBadge boxSize="1.25em" bg="green.500" />*/}
            {/*                    </div>*/}
            {/*                ) : (*/}
            {/*                    <div>*/}
            {/*                        <AvatarBadge boxSize="1.25em" bg="red.500" />*/}
            {/*                    </div>*/}
            {/*                )}*/}
            {/*            </Avatar>*/}
            {/*        </CardBody>*/}
            {/*        <small>Pioneer</small>*/}
            {/*    </Card>*/}
            {/*    <Card align="center" onClick={() => setContextWallet("metamask")}>*/}
            {/*        <CardBody>*/}
            {/*            <Avatar src={METAMASK_ICON}>*/}
            {/*                {metamaskPaired ? (*/}
            {/*                    <div>*/}
            {/*                        <AvatarBadge boxSize="1.25em" bg="green.500" />*/}
            {/*                    </div>*/}
            {/*                ) : (*/}
            {/*                    <div>*/}
            {/*                        <AvatarBadge boxSize="1.25em" bg="red.500" />*/}
            {/*                    </div>*/}
            {/*                )}*/}
            {/*            </Avatar>*/}
            {/*        </CardBody>*/}
            {/*        <small>MetaMask</small>*/}
            {/*    </Card>*/}
            {/*    <Card align="center" onClick={() => setContextWallet("keepkey")}>*/}
            {/*        <CardBody>*/}
            {/*            <Avatar src={KEEPKEY_ICON}>*/}
            {/*                {keepkeyPaired ? (*/}
            {/*                    <div>*/}
            {/*                        <AvatarBadge boxSize="1.25em" bg="green.500" />*/}
            {/*                    </div>*/}
            {/*                ) : (*/}
            {/*                    <div>*/}
            {/*                        <AvatarBadge boxSize="1.25em" bg="red.500" />*/}
            {/*                    </div>*/}
            {/*                )}*/}
            {/*            </Avatar>*/}
            {/*        </CardBody>*/}
            {/*        <small>KeepKey</small>*/}
            {/*    </Card>*/}
            {/*</SimpleGrid>*/}
        </Box>
    );
};

export default Onboarding;
