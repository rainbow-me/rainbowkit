// contracts/RainbowKitNFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RainbowKitNFT is ERC1155, Ownable {
    uint256 public totalSupply;

    constructor() ERC1155("https://rainbowkit-mint-nft-demo.vercel.app/nft.json") Ownable(msg.sender) {}

    function mint() public {
        unchecked {
            ++totalSupply;
        }
        _mint(msg.sender, 1, 1, "");
    }
}
