pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

abstract contract Ownable {
  address private owner;

  modifier onlyOwner() {
    require(owner == msg.sender, "Ownable: caller is not the owner");
    _;
  }
}