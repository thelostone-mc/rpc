const { ethers } = require("ethers");
const { cpSync } = require("fs");
const { performance } = require('perf_hooks');

const GrantRegistryABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint96",
          "name": "id",
          "type": "uint96"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct MetaPtr",
          "name": "metaPtr",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "GrantCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint96",
          "name": "id",
          "type": "uint96"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct MetaPtr",
          "name": "metaPtr",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "GrantUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_payee",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "internalType": "struct MetaPtr",
          "name": "_metaPtr",
          "type": "tuple"
        }
      ],
      "name": "createGrant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllGrants",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint96",
              "name": "id",
              "type": "uint96"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint48",
              "name": "createdAt",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "lastUpdated",
              "type": "uint48"
            },
            {
              "internalType": "address",
              "name": "payee",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "protocol",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "pointer",
                  "type": "string"
                }
              ],
              "internalType": "struct MetaPtr",
              "name": "metaPtr",
              "type": "tuple"
            }
          ],
          "internalType": "struct GrantRegistry.Grant[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "_id",
          "type": "uint96"
        }
      ],
      "name": "getGrantPayee",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "_startId",
          "type": "uint96"
        },
        {
          "internalType": "uint96",
          "name": "_endId",
          "type": "uint96"
        }
      ],
      "name": "getGrants",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint96",
              "name": "id",
              "type": "uint96"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint48",
              "name": "createdAt",
              "type": "uint48"
            },
            {
              "internalType": "uint48",
              "name": "lastUpdated",
              "type": "uint48"
            },
            {
              "internalType": "address",
              "name": "payee",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "protocol",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "pointer",
                  "type": "string"
                }
              ],
              "internalType": "struct MetaPtr",
              "name": "metaPtr",
              "type": "tuple"
            }
          ],
          "internalType": "struct GrantRegistry.Grant[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "grantCount",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "name": "grants",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "id",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint48",
          "name": "createdAt",
          "type": "uint48"
        },
        {
          "internalType": "uint48",
          "name": "lastUpdated",
          "type": "uint48"
        },
        {
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "internalType": "struct MetaPtr",
          "name": "metaPtr",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "_id",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_payee",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "internalType": "struct MetaPtr",
          "name": "_metaPtr",
          "type": "tuple"
        }
      ],
      "name": "updateGrant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "_id",
          "type": "uint96"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "internalType": "struct MetaPtr",
          "name": "_metaPtr",
          "type": "tuple"
        }
      ],
      "name": "updateGrantMetaPtr",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "_id",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "updateGrantOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "_id",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "_payee",
          "type": "address"
        }
      ],
      "name": "updateGrantPayee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

const GrantRoundABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_metadataAdmin",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_payoutAdmin",
          "type": "address"
        },
        {
          "internalType": "contract GrantRegistry",
          "name": "_registry",
          "type": "address"
        },
        {
          "internalType": "contract IERC20",
          "name": "_donationToken",
          "type": "address"
        },
        {
          "internalType": "contract IERC20",
          "name": "_matchingToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endTime",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "internalType": "struct MetaPtr",
          "name": "_metaPtr",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "contributor",
          "type": "address"
        }
      ],
      "name": "AddMatchingFunds",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct MetaPtr",
          "name": "oldMetaPtr",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct MetaPtr",
          "name": "newMetaPtr",
          "type": "tuple"
        }
      ],
      "name": "MetadataUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaidOutGrants",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "addMatchingFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donationToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "hasPaidOut",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "matchingToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "metaPtr",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "protocol",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "pointer",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "metadataAdmin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "payoutAdmin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_payoutAddress",
          "type": "address"
        }
      ],
      "name": "payoutGrants",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "registry",
      "outputs": [
        {
          "internalType": "contract GrantRegistry",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "protocol",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "pointer",
              "type": "string"
            }
          ],
          "internalType": "struct MetaPtr",
          "name": "_newMetaPtr",
          "type": "tuple"
        }
      ],
      "name": "updateMetadataPtr",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];


const stressCount = 50;
const alchemy_rpc = 'https://polygon-mainnet.g.alchemy.com/v2/EDGl6ZSI39a9rlwQwfxlWcLsgYkac02v';
const moralis_rpc = 'https://speedy-nodes-nyc.moralis.io/a2586e6a4965d7035a097eaf/polygon/mainnet';

// --- UTILS ---
const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

// --- Grant Registry ---

async function grantCount(url, address, abi) {
    const provider = new ethers.providers.JsonRpcProvider(url);
    const registry = new ethers.Contract(address, abi, provider)
    
    // Grant Count
    let startTime = performance.now()
    const grantsCount = await registry.grantCount()
    let endTime = performance.now()

    const grantCountTime = endTime - startTime;
    return grantCountTime ;
}


async function getAllGrants(url, address, abi) {
  const provider = new ethers.providers.JsonRpcProvider(url);
  const registry = new ethers.Contract(address, abi, provider)

  // Get All Grants
  startTime = performance.now()
  const getAllGrants = await registry.getAllGrants();
  endTime = performance.now()

  const getAllGrantsTime = endTime - startTime;
  return getAllGrantsTime;
}


async function stress(func, count) {
  let times = []
  let slowest;
  let fastest;


  for(let i = 0 ; i < count; i++) {
    const time = await func();
    if (!slowest || time > slowest) {
      slowest = time;
    } else if (!fastest || time  < fastest) {
      fastest = time;
    }
    times.push(time);
  }

  return {
    'slowest': slowest,
    'fastest': fastest,
    'avg': average(times)
  }
}

async function grantRegistry(url) {
    const address = '0x7D6263A49B8C35fB149f0a536BDEFE8A22E841C0';

    const grantCountTime = await stress(
      async function() { return grantCount(url, address, GrantRegistryABI) },
      stressCount
    )
    const getAllGrantsTime = await stress(
      async function() { return getAllGrants(url, address, GrantRegistryABI) },
      stressCount
    )
    
    console.log("rpc", url);
    console.log("grantsCount" , grantCountTime);
    console.log("getAllGrants" , getAllGrantsTime);
};


console.log("Each function has been called", stressCount, "times");
grantRegistry(alchemy_rpc);
grantRegistry(moralis_rpc);
