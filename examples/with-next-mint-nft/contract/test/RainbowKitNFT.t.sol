// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {RainbowKitNFT} from "../src/RainbowKitNFT.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

contract RainbowKitNFTTest is Test, IERC1155Receiver {
    RainbowKitNFT public nft;

    function setUp() public {
        nft = new RainbowKitNFT();
    }

    function test_Mint() public {
        uint256 initialSupply = nft.totalSupply();
        nft.mint();
        assertEq(nft.totalSupply(), initialSupply + 1);
    }

    function test_BalanceAfterMint() public {
        nft.mint();
        assertEq(nft.balanceOf(address(this), 1), 1);
    }

    // ERC1155Receiver implementation
    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return interfaceId == type(IERC1155Receiver).interfaceId;
    }
}
