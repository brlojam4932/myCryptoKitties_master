// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./Ownable.sol";


contract myKittiesContract is IERC721, Ownable {

  // Mapping from token ID to owner address
  mapping(uint256 => address) public kittyIndexToOwner; //owners Of TokenId

  // Mapping owner address to token count
  mapping(address => uint256) ownershipTokenCount;

  mapping(address => uint256[]) ownerToCats;
  

  string private _name;
  string private _symbol;

  struct Kitty{
    uint64 birthTime;
    uint32 mumId;
    uint32 dadId;
    uint16 generation;
    uint256 genes;
  }

  Kitty[] kitties;

  constructor (string memory name_, string memory symbol_) {
    name_ = _name;
    symbol_ = _symbol;
    owner = msg.sender;

  }


  function balanceOf(address owner) public view override returns (uint256 balance) {
    return ownershipTokenCount[owner];
  }

  function totalSupply() public view override returns (uint256 total) {
    return kitties.length;
  }

  function name() external view override returns (string memory tokenName) {
    return _name;
  }

  function symbol() external view override returns (string memory tokenSymbol) {
    return _symbol;
  }

  // private functions are cheaper but public allows to execute function from within this contract
  function ownerOf(uint256 tokenId) public override view returns (address owner) {
    address _owner = kittyIndexToOwner[tokenId]; // local variable 
    require(_owner != address(0), "ERC721: owner query for nonexistent token");

    return _owner;

  }

  function transfer(address to, uint256 tokenId) external override {
    require(to != address(0), "ERC721: transfer to the zero address");
    require(to != address(this), "to cannot be the contract address");
    // `tokenId` token must be owned by `msg.sender`.
    require(_owns(msg.sender, tokenId));

    _transfer(msg.sender, to, tokenId);

  }

  function _transfer(address from, address to, uint256 tokenId) internal {

    ownershipTokenCount[to] += 1; // increase count of recipient

    kittyIndexToOwner[tokenId] = to;

     // SEMD tokenId # => an address to a number of cats in an array
     ownerToCats[to].push(tokenId);

     // decrease token count from person A to person B
     if (from != address(0)) { // if from is not address(0), is okay to remove token
       ownershipTokenCount[from] -= 1;
       _removeTokenIdFromOwner(from, tokenId);
       delete kittyIndexToOwner[tokenId];
     }

     emit Transfer(msg.sender, to, tokenId);

  }

  function  _removeTokenIdFromOwner(address owner, uint256 tokenId) internal {
    uint256 lastId = ownerToCats[owner][ownerToCats[owner].length -1];
    for (uint256 i = 0; i < ownerToCats[owner].length -1; i++) {
      if (ownerToCats[owner][i] == tokenId) {
        ownerToCats[owner][i] = lastId;
        ownerToCats[owner].pop();
      }
    }
  }



  function _owns(address _claimant, uint256 tokenId ) internal view returns(bool) {
    return kittyIndexToOwner[tokenId] == _claimant;
  }



}