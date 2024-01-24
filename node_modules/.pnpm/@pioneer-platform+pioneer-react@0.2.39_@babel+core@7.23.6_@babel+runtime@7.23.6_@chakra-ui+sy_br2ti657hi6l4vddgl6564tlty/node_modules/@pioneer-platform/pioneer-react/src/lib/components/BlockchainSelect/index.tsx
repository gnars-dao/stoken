import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  HStack,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePioneer } from "lib/context/Pioneer";
import MiddleEllipsis from "lib/components/MiddleEllipsis";

//@ts-ignore
export default function BlockchainSelect({ onClose }) {
  const { state, dispatch } = usePioneer();
  const { api, app, user } = state;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showOwnedAssets, setShowOwnedAssets] = useState(false);
  const [timeOut, setTimeOut] = useState(null); // Added timeout state
  const itemsPerPage = 6;

  const handleSelectClick = async (asset: any) => {
    try {
      //console.log("asset select: ", asset.name);
      const changeAssetContext = await app.setAssetContext(asset);
      //console.log("changeAssetContext: ", changeAssetContext);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const onSearch = async function (searchQuery: string) {
    try {
      if (!api) {
        alert("Failed to init API!");
        return;
      }
      //console.log("searchQuery: ", searchQuery);
      const search = {
        limit: itemsPerPage,
        skip: currentPageIndex * itemsPerPage, // Use currentPageIndex for pagination
        collection: "blockchains",
        searchQuery: searchQuery,
        searchFields: ["name", "symbol"],
      };

      const info = await api.SearchAtlas(search);
      const currentPageData = info.data.results;
      setCurrentPage(currentPageData);
      setTotalBlockchains(info.data.total); // Update total assets count
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPage = async (pageIndex: number) => {
    try {
      if (!api) {
        alert("Failed to init API!");
        return;
      }

      const search = {
        limit: itemsPerPage,
        skip: pageIndex * itemsPerPage,
        collection: "blockchains",
        ownedBy: showOwnedAssets ? user.id : undefined,
      };

      const info = await api.SearchAtlas(search);
      const currentPageData = info.data.results;
      setCurrentPage(currentPageData);
      setTotalBlockchains(info.data.total); // Update total assets count
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPage(currentPageIndex);
  }, [currentPageIndex, showOwnedAssets]);

  const [totalBlockchains, setTotalBlockchains] = useState(0);

  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Bitcoin..."
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (timeOut) {
              clearTimeout(timeOut);
            }
            setTimeOut(
              // @ts-ignore
              setTimeout(() => {
                setCurrentPageIndex(0); // Reset pageIndex when searching
                onSearch(e.target.value);
              }, 1000)
            );
          }}
        />
      </InputGroup>
      <Box>
        <Text fontSize="2xl">Total Chains: {totalBlockchains}</Text>
        <Checkbox
          isChecked={showOwnedAssets}
          onChange={() => setShowOwnedAssets(!showOwnedAssets)}
        >
          Show only blockchains you have assets on
        </Checkbox>
        {currentPage.map((blockchain: any, index: number) => (
          <Box key={index}>
            <HStack spacing={4} alignItems="center">
              <Avatar src={blockchain?.image} />
              <Box>
                <small>
                  blockchain: <MiddleEllipsis text={blockchain?.caip} />
                </small>
                <br />
                <small>name: {blockchain.name}</small>
              </Box>
            </HStack>
            <HStack mt={2} spacing={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSelectClick(blockchain)}
              >
                Select
              </Button>
            </HStack>
          </Box>
        ))}
      </Box>
      <HStack mt={4}>
        <Button
          isDisabled={currentPageIndex === 0}
          onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
        >
          Previous Page
        </Button>
        <Button
          isDisabled={currentPage.length < itemsPerPage}
          onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
        >
          Next Page
        </Button>
      </HStack>
    </Stack>
  );
}
