pragma solidity 0.4.24;

import 'zeppelin/contracts/token/MintableToken.sol';

contract PizzaPartyPoints is MintableToken {
    string public name = "Pizza Party Points";
    string public symbol = "DEPI";
    uint8 public decimals = 15;
}
