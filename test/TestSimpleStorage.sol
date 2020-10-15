// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";


contract TestSimpleStorage {
    uint public initialBalance = 1 ether;

    SimpleStorage public ssSubject;

    function beforeEach() public
    {
        // Contract to test
        ssSubject = new SimpleStorage();
    }

    //function testTheDouglasAdamsProtocal() public returns (bool) {
        //(bool success, ) = address(ssSubject).call(abi.encodeWithSignature("setStoredData(uint256)", 42));
	//Assert.equal(success, true, "expected setStoredData to succeed");

        //(success, uint answer ) = address(ssSubject).call(abi.encodeWithSignature("getStoredData()"));
	//Assert.equal(answer, 42, "So long and thanks for all the fish");
    //}
    function testTheDouglasAdamsProtocal() public returns (bool) {
        ssSubject.setStoredData(42);
	Assert.equal(ssSubject.getStoredData(), 42, "So long and thanks for all the fish");
    }
}
