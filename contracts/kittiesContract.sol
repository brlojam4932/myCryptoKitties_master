// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./myOwnable.sol";


contract myKittiesContract is IERC721, Ownable {

  // Mapping from token ID to owner address
  mapping(uint256 => address) public kittyIndexToOwner; //owners Of TokenId

  // Mapping owner address to token count
  mapping(address => uint256) ownershipTokenCount;

  //an address to a number of cats in an array
  mapping(address => uint256[]) ownerToCats;

  event Birth(address owner, uint256 newKittenId, uint256 mumId, uint256 dadId, uint256 genes);
  

  string private _name;
  string private _symbol;

  uint256 public constant CREATION_LIMIT_GEN0 = 10;

  uint256 public gen0Counter;

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
  }

  function createKittyGen0(uint256 _genes) public onlyOwner returns (uint256)
  {
    require(gen0Counter <= CREATION_LIMIT_GEN0, "Gen 0 should be less than creation limit gen 0");
    
    gen0Counter ++;

    // mum, dad and generation is 0
    // Gen0 have no owners; they are owned by the contract
    
    return _createKitty(0,0,0, _genes, msg.sender); // msg.sender could also be -- address(this) - we are giving cats to owner
  }

  // create cats by generation and by breeding
  // returns cat id
  function _createKitty(
    uint256 _mumId,
    uint256 _dadId,
    uint256 _generation, //1,2,3..etc
    uint256 _genes, // recipient
    address owner
  ) private returns(uint256) {
    Kitty memory newKitties = Kitty ({
      genes: _genes,
      birthTime: uint64(block.timestamp),
      mumId: uint32(_mumId),
      dadId: uint32(_dadId),
      generation: uint16(_generation)
    });

    kitties.push(newKitties); // returns the size of array - 1 for the first cat

    uint256 newKittenId = kitties.length -1; // 0-1

    emit Birth(owner, newKittenId, _mumId, _dadId, _genes);

    _transfer(address(0), owner, newKittenId);

    return newKittenId; //returns 256 bit integer

  }

  function myGetKitty(uint256 tokenId) public view returns (
    uint256 birthTime,
    uint256 mumId,
    uint256 dadId,
    uint256 generation,
    uint256 genes
  ) {

    Kitty storage returnKitty = kitties[tokenId];
    return (uint256(returnKitty.birthTime), uint256(returnKitty.mumId), uint256(returnKitty.dadId), uint256(returnKitty.generation), uint256(returnKitty.genes));
  }

  function getKittyFilip(uint256 _id) public view returns (
    uint256 birthTime,
    uint256 mumId,
    uint256 dadId,
    uint256 generation,
    uint256 genes
  ) {

    Kitty storage kitty = kitties[_id];
    birthTime = uint256(kitty.birthTime);
    mumId = uint256(kitty.mumId);
    dadId = uint256(kitty.dadId);
    generation = uint256(kitty.generation);
    genes = uint256(kitty.genes);
  }

  function getAllCatsFor(address owner) public view returns (uint[] memory) {
    return ownerToCats[owner];
  }



//-------------------------------
  function balanceOf(address owner) public view virtual override returns (uint256 balance) {
    return ownershipTokenCount[owner];
  }

  function totalSupply() public view virtual override returns (uint256 total) {
    return kitties.length;
  }

  function name() external view virtual override returns (string memory tokenName) {
    return _name;
  }

  function symbol() external view virtual override returns (string memory tokenSymbol) {
    return _symbol;
  }

  // private functions are cheaper but public allows to execute function from within this contract
  function ownerOf(uint256 tokenId) public view virtual override returns (address owner) {
    address _owner = kittyIndexToOwner[tokenId]; // local variable 
    require(_owner != address(0), "ERC721: owner query for nonexistent token");

    return _owner;

  }

  function transfer(address to, uint256 tokenId) external virtual override {
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