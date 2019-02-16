pragma solidity ^0.5.0;

import "./League.sol";

contract LeagueFactory {
   address[]  public  deployedLeagues;


  function deployLeague() public{
        address newLeague = address(new League(msg.sender));
        deployedLeagues.push(newLeague);
        
    }
    function GetAllLeagues() public view returns (address [] memory){
        return deployedLeagues;
    }
    function deleteAllLeagues() public {
         delete deployedLeagues;
         assert(deployedLeagues.length == 0);
    }
       
  constructor() public {
  }
}
