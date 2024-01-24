import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Image, VStack, HStack, Divider, Tooltip, Button } from "@chakra-ui/react";
// @ts-ignore
import { usePioneer } from "@pioneer-platform/pioneer-react";
import { Link as ChakraLink } from "@chakra-ui/react";

import axios from 'axios';

import { ContractAbi } from 'web3';
import { ethers } from "ethers";


import ERC721_ABI from "./gnars_abi.json";



const gnars_nftContract = "0x558BFFF0D583416f7C4e380625c7865821b8E95C";
const skatehive_nftContract = "0x3dEd025e441730e26AB28803353E4471669a3065"

const EthereumStats = () => {
  // Define hooks
  const { state, dispatch } = usePioneer();
  const { api, app, context, assetContext, blockchainContext, pubkeyContext } = state;

  // Ethereum stuff
  const [totalWorth, setTotalWorth] = useState<number>(0);
  const [daoPortfolio, setDaoPortfolio] = useState<any>(null);
  const [multisigETHBalance, setmultisigETHBalance] = useState<number | null>(null);
  const [ethNetworth, setEthNetworth] = useState<number | null>(null);

  const SKATEHIVE_SAFE = "0x5501838d869b125efd90dacf45cdfac4ea192c12";
  const SKATEHIVE_HOTWALLET = "0xB4964e1ecA55Db36a94e8aeFfBFBAb48529a2f6c";

  const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/w_vXc_ypxkmdnNaOO34pF6Ca8IkIFLik");
  const contract_gnars = new ethers.Contract(gnars_nftContract, ERC721_ABI, provider);
  const [currentVotes, setCurrentVotes] = useState<string | null>(null);
  const [currentHolders, setCurrentHolders] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pioneerBalance, setPioneerBalance] = useState<string | null>(null);

  //TODO: send to utils 
  async function readGnarsContract() {
    try {
      const result = await contract_gnars.getCurrentVotes("0xB4964e1ecA55Db36a94e8aeFfBFBAb48529a2f6c");

      const votes = ethers.utils.formatUnits(result, 0); // Assuming it's a uint256

      setCurrentVotes(votes);

    } catch (error) {
      console.error("Error:", error);
    }
  }

  const apiKey = process.env.VITE_ETHERSCAN_API

  const ethereumAddress = '0x5501838d869b125efd90dacf45cdfac4ea192c12';

  const etherscanEndpoint = `https://api.etherscan.io/api`;

  const [loading, setLoading] = useState(true);
  const [ethPrice, setethPrice] = useState<number | null>(null);


  async function fetchEthereumPrice() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
        params: {
          ids: 'ethereum',
          vs_currencies: 'usd',
        },
      });

      if (response.status === 200) {
        const ethereumPriceInUSD = response.data.ethereum.usd;
        setethPrice(ethereumPriceInUSD)


      } else {
        console.error('Error fetching Ethereum price:', response.statusText);
        return 'Error';
      }
    } catch (error) {
      console.error('Error fetching Ethereum price:', error);
      return 'Error';
    }
  }
  useEffect(() => {
    fetchEthereumPrice()
  }
    , [multisigETHBalance])

  const usdWorthOfMultisigBalance = multisigETHBalance && ethPrice !== null ? (multisigETHBalance * ethPrice).toFixed(2) + ' USD' : 'Loading...';


  async function getBalance(wallet: string) {
    try {
      const response = await axios.get(etherscanEndpoint, {
        params: {
          module: 'account',
          action: 'balance',
          address: wallet,
          apikey: apiKey,
        },
      });


      if (response.data.status === '1') {
        const balance = ethers.utils.formatEther(response.data.result);
        return balance;
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const [hotWalletBalance, setHotWalletBalance] = useState<number | null>(null);

  const onStart = async () => {
    try {
      if (app) {
        // use pioneer api call link directly to get the balance of the hot wallet   'https://pioneers.dev/api/v1/portfolio/0xB4964e1ecA55Db36a94e8aeFfBFBAb48529a2f6c' \
        const eth_hotwallet_call = await axios.get('https://pioneers.dev/api/v1/portfolio/0xB4964e1ecA55Db36a94e8aeFfBFBAb48529a2f6c');

        if (eth_hotwallet_call.status === 200) {
          const hotWalletBalanceAsNumber = eth_hotwallet_call.data.totalNetWorth;
          setPioneerBalance(hotWalletBalanceAsNumber);
        }
        else {
          console.error("Eth2_hotwallet is undefined");
        }

        const eth_multisig = await getBalance(SKATEHIVE_SAFE);
        if (eth_multisig !== undefined) {
          const multisigBalanceAsNumber = parseFloat(eth_multisig);

          setmultisigETHBalance(multisigBalanceAsNumber);

        } else {
          console.error("Eth_multisig is undefined");
        }


      }
    } catch (e) {
      console.error("Error in onStart:", e);
    }
  };




  useEffect(() => {
    // Call your function here
    readGnarsContract();
    onStart();

  }, [app]);



  const handleCopyClick = () => {
    // Create a temporary input element to copy the wallet address
    const tempInput = document.createElement("input");
    tempInput.value = SKATEHIVE_HOTWALLET;
    document.body.appendChild(tempInput);

    // Select and copy the value inside the input element
    tempInput.select();
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Set copied to true to show a message to the user
    setCopied(true);
    alert("Skatehive Delegation Wallet Copied to clipboard");
  };
  const totalWorthof2wallets = multisigETHBalance !== null && pioneerBalance !== null && ethPrice !== null
    ? (((multisigETHBalance) * ethPrice) + parseFloat(pioneerBalance)).toFixed(2) + ' USD'
    : 'Loading...';



  return (
    <Box
      border="2px solid #7CC4FA"
      borderRadius="12px"
      padding="10px"
      margin="0px"
      minWidth={['50%']}
    >
      <VStack spacing={4} align="stretch">

        <Flex alignItems="center" justifyContent="center" padding="10px">
          <Image
            src="https://www.pngitem.com/pimgs/m/124-1245793_ethereum-eth-icon-ethereum-png-transparent-png.png"
            boxSize="40px"
            borderRadius="50%"
          />
          <Text
            textAlign="center"
            borderRadius="12px"
            fontWeight="700"
            fontSize="18px"
            color="white"
            padding="10px"
          >
            Community's Ethereum Treasury
          </Text>
        </Flex>

        <Flex alignItems="center" justifyContent="center">
          <Text fontSize={"2xl"} fontWeight="bold" color="#7CC4FA">
            Total Worth: <Text style={{ fontSize: '48px' }}>{totalWorthof2wallets}</Text>
          </Text>
        </Flex>
        <HStack spacing={4} align="stretch">
          <BalanceDisplay
            labelTooltip="Balance of the multisig wallet in ETH"
            balanceTooltip="Transactions in our treasury are triggered by proposals on Snapshot"
            label="Multisig Balance"
            balance={`${multisigETHBalance?.toFixed(3)} ETH`} />
          <BalanceDisplay
            labelTooltip="skatehive.eth"
            labelLink='https://app.zerion.io/0xb4964e1eca55db36a94e8aeffbfbab48529a2f6c/overview?name=skatehive.eth'
            label="Hot Wallet"
            balance={typeof pioneerBalance === 'number' ? `${(pioneerBalance as number).toFixed(2)} USD` : (pioneerBalance !== null && pioneerBalance !== undefined ? "Loading..." : "")} />

        </HStack>
        <HStack spacing={4} align="stretch">
          <BalanceDisplay
            labelTooltip="How much ETH in USD we have in the Gnosis Safe multisig Contract"
            balanceTooltip="Click in the link to see the Gnosis Safe"
            labelLink='https://app.safe.global/settings/setup?safe=eth:0x5501838d869B125EFd90daCf45cDFAC4ea192c12'
            label="ETH/USD Multisig"
            balance={usdWorthOfMultisigBalance !== null ? usdWorthOfMultisigBalance : 'FUUUCK...'} />
          <BalanceDisplay
            labelTooltip="Donate to Skatehive using Giveth"
            balanceTooltip="P2P for free and get crypto back for your donations"
            labelLink='https://giveth.io/es/project/skatehive-skateboarding-community'
            label="Donate"
            balance={"on giveth"} />
        </HStack>
        <HStack margin="10px" borderRadius="10px" border="1px dashed #7CC4FA" justifyContent="center" padding="10px">
          <Image
            src="https://www.gnars.wtf/images/logo.png"
            alt="Avatar"
            width="20px"
            height="20px"
          />
          <Tooltip bg="black" color="white" borderRadius="10px" border="1px dashed limegreen" label="Voting Power of Skatehive Community on Gnars, tokens delegated by the community. Click to delegate.">
            <ChakraLink
              target='_blank'
              href="https://etherscan.io/token/0x558BFFF0D583416f7C4e380625c7865821b8E95C#writeContract#F3"
              color="white"
              fontSize="16px"
              onClick={handleCopyClick}
              style={{ cursor: "pointer" }}
            >
              Delegate Your Gnars Here | Current Votes: {currentVotes}
            </ChakraLink>
          </Tooltip>
        </HStack>
        <Tooltip bg="black" color="white" borderRadius="10px" border="1px dashed limegreen" label="Mint Page for Skatehive OG NFT. Click to Mint.">

          <HStack margin="10px" borderRadius="10px" border="1px dashed #7CC4FA" justifyContent="center" padding="10px">
            <Image
              src="https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fipfs.decentralized-content.com%2Fipfs%2Fbafkreidxxr42k6sff4ppctl4l3xvh52rf2m7vzdrjmyqhoijveevwafkau&w=3840&q=75"
              alt="Avatar"
              width="20px"
              height="20px"
            />
            <ChakraLink target="_blank" href="https://zora.co/collect/eth:0x3ded025e441730e26ab28803353e4471669a3065/1" color="white" fontSize="16px">
              Skatehive OG: 37
            </ChakraLink>
          </HStack>
        </Tooltip>
      </VStack>
    </Box>
  );
};

const BalanceDisplay = ({
  label,
  balance,
  labelTooltip,
  balanceTooltip,
  labelLink,
  balanceLink,
  labelStyle,
  balanceStyle,
}: {
  label: string;
  balance: string;
  labelTooltip?: string;
  balanceTooltip?: string;
  labelLink?: string;
  balanceLink?: string;
  labelStyle?: React.CSSProperties;
  balanceStyle?: React.CSSProperties;
}) => {
  return (
    <Box
      borderRadius="5px"
      border="1px solid #7CC4FA"
      width="100%"
      padding="10px"
      textAlign="center"
    >
      {labelTooltip ? (
        <Tooltip label={labelTooltip} bg="black" color="white" borderRadius="10px" border="1px dashed limegreen">
          {labelLink ? (
            <ChakraLink color="white" fontWeight="bold" href={labelLink} isExternal style={labelStyle}>
              {label}
            </ChakraLink>
          ) : (
            <Text color="white" fontWeight="bold" cursor="pointer" style={labelStyle}>
              {label}
            </Text>
          )}
        </Tooltip>
      ) : (
        labelLink ? (
          <ChakraLink color="white" fontWeight="bold" href={labelLink} isExternal style={labelStyle}>
            {label}
          </ChakraLink>
        ) : (
          <Text color="white" fontWeight="bold" style={labelStyle}>
            {label}
          </Text>
        )
      )}
      {balanceTooltip ? (
        <Tooltip label={balanceTooltip} bg="black" color="white" borderRadius="10px" border="1px dashed limegreen">
          {balanceLink ? (
            <ChakraLink href={balanceLink} isExternal style={balanceStyle}>
              {balance || "PEPE"}
            </ChakraLink>
          ) : (
            <Text style={balanceStyle}>{balance || "PEPE"}</Text>
          )}
        </Tooltip>
      ) : (
        balanceLink ? (
          <ChakraLink href={balanceLink} isExternal style={balanceStyle}>
            {balance || "PEPE"}
          </ChakraLink>
        ) : (
          <Text style={balanceStyle}>{balance || "Loading..."}</Text>
        )
      )}
    </Box>
  );
};

export default EthereumStats;
