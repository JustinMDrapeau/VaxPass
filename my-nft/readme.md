Edit the contract to do whatever the hell you want
'''
Under ./contracts/vaxNFT.sol
'''

Compile using

'''
npx hardhat compile
'''

This command generates hardhat specific interfaces to interact with your NFT and also checks for syntax (i think)

Run this command to deploy contract
'''
npx hardhat run scripts/deploy.js --network ropsten
'''
This returns a contract address, go to ropsten etherscan website and paste it in to see your contract details


Paste in you newly created contract address in the contractAddress variable, inside scripts/mint-nft.js. Run this shit after. You can change the token URI that you mint with to anything.

'''
node scripts/mint-nft.js 
'''

