//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

contract SimpleStorage {
    uint256 public storedData;
    address public owner = msg.sender;
    mapping(address => uint) public counter;

    function getStoredData() public view returns (uint256) {
        return storedData;
    }

    function getCount(address _address) public view returns (uint) {
        return counter[_address];
    }

    function setStoredData(uint256 x) public {
        storedData = x;
    }
}
