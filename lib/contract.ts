// Chat History Contract Configuration
export const CHAT_HISTORY_CONTRACT = {
  address: '0x93555e5c4377C89b81B5158ED32402DCf43FfDB2', // Deployed on Monad Testnet
  abi: [
    {
      "inputs": [
        { "internalType": "string", "name": "chatId", "type": "string" },
        { "internalType": "string", "name": "title", "type": "string" },
        { "internalType": "string[]", "name": "roles", "type": "string[]" },
        { "internalType": "string[]", "name": "contents", "type": "string[]" },
        { "internalType": "uint256[]", "name": "timestamps", "type": "uint256[]" }
      ],
      "name": "saveChat",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "chatId", "type": "string" }
      ],
      "name": "getChat",
      "outputs": [
        { "internalType": "string", "name": "title", "type": "string" },
        { "internalType": "string[]", "name": "roles", "type": "string[]" },
        { "internalType": "string[]", "name": "contents", "type": "string[]" },
        { "internalType": "uint256[]", "name": "timestamps", "type": "uint256[]" },
        { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
        { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserChatIds",
      "outputs": [
        { "internalType": "string[]", "name": "", "type": "string[]" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "chatId", "type": "string" }
      ],
      "name": "deleteChat",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getChatCount",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
        { "indexed": false, "internalType": "string", "name": "chatId", "type": "string" },
        { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
      ],
      "name": "ChatSaved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
        { "indexed": false, "internalType": "string", "name": "chatId", "type": "string" },
        { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
      ],
      "name": "ChatDeleted",
      "type": "event"
    }
  ] as const
}

