pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

abstract contract Ownable {
  address public owner;

  modifier onlyOwner() {
    require(msg.sender == owner, "Ownable: caller is not the owner");
    _;
  }
}