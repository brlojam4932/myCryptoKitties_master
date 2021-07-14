// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "./IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract myKittiesContract is Ownable {

  // Mapping from token ID to owner address
  mapping(uint256 => address) public kittyIndexToOwner; //owners Of TokenId

  // Mapping owner address to token count
  mapping(address => uint256) ownershipTokenCount;

  // Mapping from token ID to approved address
  mapping(uint256 => address) public kittyIndexToApproved;

  // MYADDR => OPERATOR => TRUE/FALSE
  // _operatorApprovals[MYADDR][OPERATORADDR] = true or false;
  // _operatorApprovals[MYADDR][BOBS_ADDR] = true;
  // _operatorApprovals[MYADDR][ALICE_ADDR] = false;
  // _operatorApprovals[MYADDR][LISA_ADDR] = true;

  // Mapping from owner to operator approvals
  mapping(address => mapping(address => bool)) private _operatorApprovals;

  //an address to a number of cats in an array
  mapping(address => uint256[]) ownerToCats;


  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
  event Birth(address owner, uint256 newKittenId, uint256 mumId, uint256 dadId, uint256 genes);
  

  string constant _name = "My Crypto Cats";
  string constant _symbol = "MCRC";

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
  ) public returns(uint256) {
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

  //-------------------------------

  function getAllCatsFor(address owner) public view returns (uint[] memory) {
    return ownerToCats[owner];
  }
  
  function balanceOf(address owner) public view returns (uint256 balance) {
    return ownershipTokenCount[owner];
  }

  function totalSupply() public view returns (uint256 total) {
    return kitties.length;
  }

  function name() external pure returns (string memory tokenName) {
    return _name;
  }

  function symbol() external pure returns (string memory tokenSymbol) {
    return _symbol;
  }

  // private functions are cheaper but public allows to execute function from within this contract
  function ownerOf(uint256 tokenId) public view returns (address owner) {
    address _owner = kittyIndexToOwner[tokenId]; // local variable 
    require(_owner != address(0), "ERC721: owner query for nonexistent token");

    return _owner;

  }

  function transfer(address to, uint256 tokenId) external {
    require(to != address(0), "ERC721: transfer to the zero address");
    require(to != address(this), "transfer to the zero address");
    // `tokenId` token must be owned by `msg.sender`.
    require(_owns(msg.sender, tokenId));

    _transfer(msg.sender, to, tokenId);

  }

  /*

   /// @notice Change or reaffirm the approved address for an NFT
    /// @dev The zero address indicates there is no approved address.
    ///  Throws unless `msg.sender` is the current NFT owner, or an authorized
    ///  operator of the current owner.
  function approve(address _approved, uint256 _tokenId) external {
    require(msg.sender == _owns() || _authOperator() );

    _getApproved(_approved, _tokenId);

  }

  function _getApproved(address _appoved, uint256 _tokenId ) internal returns (bool) {
     return _operatorApprovals[_appoved][_tokenId] = true ;

  }

  function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return _operatorApprovals[_owner][_operator] = true;
    }

   
  function _nftOwner(address a, address b) internal view returns(bool) {
    return _operatorApprovals[a][b] = true;
  }
  */

  // transferFrom - how it is used:
  //trader calls approve(dexAddress, amount)
  //dex calls transferFrom(traderAddress, dexAddress, amount)

  // must transfer from address 0
  function _transfer(address from, address to, uint256 tokenId) internal {
    //_approve(address(0), tokenId);

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