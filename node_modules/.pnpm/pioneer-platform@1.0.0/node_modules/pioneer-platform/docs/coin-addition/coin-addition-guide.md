# adding an asset to pioneer platform

## token

## HDwallet notes:

HDwallet https://github.com/shapeshift/hdwallet

is a dependancie of the pioneer platform.

To Add a new asset to pioneer you must add support for hdwallet

Dev workflow:
    Make a fork of hdwallet under your username
    
    Find and replace all @shapeshiftoss to your npm username
    
    you can now lerna -> publish hdwallet
    
    Modify @bithighlander hdwallet modules in pioneer to your username
    
    (optional)Configure circleCi to publish under your username

NOTES:
    Any PR for new asset support in pioneer must FIRST be accepted to HDwallet and published


## UTXO coin
    Example PR:
    
    * /module/pioneer/pioneer-coins module
    
    Add Coin info
        Add Coin info
        
```        {
                       note:"Standard bitcoin cash default path",
                       type:"xpub",
                       script_type:"p2pkh",
                       available_scripts_types:['p2pkh'],
                       addressNList: [0x80000000 + 44, 0x80000000 + 145, 0x80000000 + 0],
                       curve: 'secp256k1',
                       showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
                       coin: 'BitcoinCash',
                       symbol: 'BCH',
                       network: 'BCH',
                   }, 
```
                   
        Publish module
    
        Bump
            pioneer
            pioneer-app
            pioneer-server
    
    coin-*network
        create new coin module with blockchain info
        
    Pioneer-network
        add info to init
    
    pioneer
        
    
    2. Build test tx
    
                
    * network module
        utxo-network
    
    3. add public nodes
    
    
## New blockchain

## cosmos network

Adding a cosmos sdk coins
    0. add feature flag to .env
    
    coins/*coin
    
    1. write network module
        core functions
    
    2. add to pioneer-server         
        
    3. write crypto module  
        Load with test seed
    
    4. send mainnet to test seed address    
    
    5. build reference transactions    
        
## DOT network
