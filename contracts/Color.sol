// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721 {
  
  string[] public colors;

  mapping(string => bool) _colorExists;

  constructor() ERC721("Color", "CLRS") {}

  // E.G. color = "#FFFFFF"
  function mint(string memory _color) public {
    //Require unique color
    require(!_colorExists[_color]); // here, we are reading a value from the mapping (true or false)
    // so we require that color does not exist | if it's true, it errors
    colors.push(_color);
    uint256 _id = colors.length -1;
   
    _mint(msg.sender, _id);
    _colorExists[_color] = true; // color exists, we are setting a value in the mapping
  }

}