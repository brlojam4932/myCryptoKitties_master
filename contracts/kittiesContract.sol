// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";


contract myKittiesContract is IERC721 {


  mapping(address => uint256) ownershipTokenCount;

  struct Kitty{
    uint64 birthTime;
    uint32 mumId;
    uint32 dadId;
    uint16 generation;
    uint256 genes;
  }

  Kitties[] kitties;


  function balanceOf(address owner) external view override returns (uint256 balance) {
    return ownershipTokenCount[owner];
  }

  function totalSupply() external view override returns (uint256 total) {
    return kitties.length;
  }



}