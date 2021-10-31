//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

contract SimpleStorage {
    uint256 public storedData;
    address owner = msg.sender;

    constructor(uint256 _num) public {
        storedData = _num;
    }

    function getStoredData() public view returns (uint256) {
        return storedData;
    }

    function setStoredData(uint256 x) public {
        require(msg.sender == owner, "Not the owner!");
        storedData = x;
    }
}
