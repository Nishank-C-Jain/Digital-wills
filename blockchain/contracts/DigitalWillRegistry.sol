// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DigitalWillRegistry {
    
    struct WillHash {
        string docHash;
        uint256 timestamp;
        bool isDeceased;
    }

    // Mapping from user ID (string) to their Will Hash
    mapping(string => WillHash) public wills;

    event WillRegistered(string indexed userId, string docHash, uint256 timestamp);
    event DeathVerified(string indexed userId, uint256 timestamp);

    // Register a new hash for a will
    function registerWill(string memory _userId, string memory _docHash) public {
        wills[_userId] = WillHash({
            docHash: _docHash,
            timestamp: block.timestamp,
            isDeceased: false
        });

        emit WillRegistered(_userId, _docHash, block.timestamp);
    }

    // Trigger execution
    function verifyDeath(string memory _userId) public {
        require(bytes(wills[_userId].docHash).length > 0, "Will does not exist");
        require(!wills[_userId].isDeceased, "Already verified");

        wills[_userId].isDeceased = true;

        emit DeathVerified(_userId, block.timestamp);
    }

    // Get will status
    function getWill(string memory _userId) public view returns (string memory, uint256, bool) {
        WillHash memory w = wills[_userId];
        return (w.docHash, w.timestamp, w.isDeceased);
    }
}
