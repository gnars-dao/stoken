const { GraphQLClient } = require('graphql-request');
const symbolIDMap = require('./symbolIDMap');

const graphql = new GraphQLClient('https://graphql.coincap.io/');

const getMarketDataForIDs = async (ids) => {
  const query = /* GraphQL */ `
    {
      assets(first: ${ids.length}, where: {
        id_in: ${JSON.stringify(ids)}
      }) {
        edges {
          node {
            id,
            symbol,
            priceUsd,
            changePercent24Hr
          }
        }
      }
    }`;

  return await graphql.request(query);
}

const getIDForSymbol = async (symbol) => {
  try {
    const query = `{
      assets(
        first: 1, 
        where: {
          symbol_starts_with: "${symbol}"
        }, 
        sort: rank, 
        direction: ASC) 
      {
        edges {
          node {
            id,
          }
        }
      }
    }`;

    const ret = await graphql.request(query);
    const ID = ret.assets.edges[0].node.id;
    // Cache
    symbolIDMap[symbol] = ID;
    return ID;

  } catch (err) {
    return symbol;
  }
}

const getMarketDataForSymbols = async (symbols) => {
  let ids = symbols.map(symbol => {
    return symbolIDMap[symbol] !== undefined ? 
           symbolIDMap[symbol] :
           getIDForSymbol(symbol);
  });
  ids = await Promise.all(ids);
  const ret = await getMarketDataForIDs(ids);
  const marketDatas = ret.assets.edges.map(edge => edge.node);
  return marketDatas;
}

getHistoryForSymbol = async (symbol) => {
  const id = await getIDForSymbol(symbol);

  const query = /* GraphQL */ `
  {
    assetHistories(assetId: "${id}" interval: h1, limit: 24)
    {
      priceUsd,
      date,
      timestamp
    }
  }`;
      
  const ret = await graphql.request(query);
  return ret.assetHistories;
}

module.exports = {
  getMarketDataForIDs,
  getIDForSymbol,
  getMarketDataForSymbols,
  getHistoryForSymbol
}
