Adding a cosmos sdk coins


Adding a cosmos sdk coins
    
    0. add feature flag to .env
    
    coins/*coin
    
    1. write network module
        core functions
    
    2. add to pioneer-server         
        src-api/controllers/1-pioneer-public.controller.ts
            
    3. write crypto module  
        Load with test seed
    
    4. send mainnet to test seed address    
    
    5. build reference transactions in HDwallet   
        
    6. Bump/publish hdwallet
    
    7. update pioneer stack with new HDwallet version
    
    8. begin e2e test process
    
