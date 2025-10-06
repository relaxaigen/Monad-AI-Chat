// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ChatHistory {
    struct Message {
        string role;
        string content;
        uint256 timestamp;
    }

    struct Chat {
        string chatId;
        string title;
        Message[] messages;
        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(address => mapping(string => Chat)) private userChats;
    mapping(address => string[]) private userChatIds;

    event ChatSaved(address indexed user, string chatId, uint256 timestamp);
    event ChatDeleted(address indexed user, string chatId, uint256 timestamp);

    function saveChat(
        string memory chatId,
        string memory title,
        string[] memory roles,
        string[] memory contents,
        uint256[] memory timestamps
    ) public {
        require(roles.length == contents.length && roles.length == timestamps.length, "Array lengths must match");

        Chat storage chat = userChats[msg.sender][chatId];
        
        // If this is a new chat, add to user's chat IDs
        if (bytes(chat.chatId).length == 0) {
            userChatIds[msg.sender].push(chatId);
            chat.chatId = chatId;
            chat.createdAt = block.timestamp;
        }

        chat.title = title;
        chat.updatedAt = block.timestamp;

        // Clear existing messages
        delete chat.messages;

        // Add new messages
        for (uint256 i = 0; i < roles.length; i++) {
            chat.messages.push(Message({
                role: roles[i],
                content: contents[i],
                timestamp: timestamps[i]
            }));
        }

        emit ChatSaved(msg.sender, chatId, block.timestamp);
    }

    function getChat(string memory chatId) public view returns (
        string memory title,
        string[] memory roles,
        string[] memory contents,
        uint256[] memory timestamps,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Chat storage chat = userChats[msg.sender][chatId];
        require(bytes(chat.chatId).length > 0, "Chat not found");

        uint256 messageCount = chat.messages.length;
        roles = new string[](messageCount);
        contents = new string[](messageCount);
        timestamps = new uint256[](messageCount);

        for (uint256 i = 0; i < messageCount; i++) {
            roles[i] = chat.messages[i].role;
            contents[i] = chat.messages[i].content;
            timestamps[i] = chat.messages[i].timestamp;
        }

        return (
            chat.title,
            roles,
            contents,
            timestamps,
            chat.createdAt,
            chat.updatedAt
        );
    }

    function getUserChatIds() public view returns (string[] memory) {
        return userChatIds[msg.sender];
    }

    function deleteChat(string memory chatId) public {
        require(bytes(userChats[msg.sender][chatId].chatId).length > 0, "Chat not found");

        delete userChats[msg.sender][chatId];

        // Remove from chat IDs array
        string[] storage chatIds = userChatIds[msg.sender];
        for (uint256 i = 0; i < chatIds.length; i++) {
            if (keccak256(bytes(chatIds[i])) == keccak256(bytes(chatId))) {
                chatIds[i] = chatIds[chatIds.length - 1];
                chatIds.pop();
                break;
            }
        }

        emit ChatDeleted(msg.sender, chatId, block.timestamp);
    }

    function getChatCount() public view returns (uint256) {
        return userChatIds[msg.sender].length;
    }
}

