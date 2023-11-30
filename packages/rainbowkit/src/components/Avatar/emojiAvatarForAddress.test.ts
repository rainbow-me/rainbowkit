import { describe, expect, it } from 'vitest';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';

describe('emojiAvatarForAddress', () => {
  it('supports valid addresses', () => {
    expect(
      emojiAvatarForAddress('0xDE7F309DE0F69C49E7C065BB4AE6DFFE0F5E32F4'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#B6B1B6",
        "emoji": "🐭",
      }
    `);

    expect(
      emojiAvatarForAddress('0xDEc7420D9b155E35a458236215fE8C617d6499F8'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#A8CE63",
        "emoji": "🐲",
      }
    `);

    expect(
      emojiAvatarForAddress('0xad7fFe8769843B4C6126C81D06555cE501ed85Df'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FFD95A",
        "emoji": "🤑",
      }
    `);

    expect(
      emojiAvatarForAddress('0x5c8b0C466680158a82fdd9dcCDE04901D662B5c3'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#EC66FF",
        "emoji": "🦄",
      }
    `);

    expect(
      emojiAvatarForAddress('0x078EF6C1edf4612068eA385cb4a48F998491D51e'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#6A87C8",
        "emoji": "🫐",
      }
    `);

    expect(
      emojiAvatarForAddress('0x4799e23B8CC73c3eC111B15FBEE0ef43C90080c1'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#5FD0F3",
        "emoji": "🐳",
      }
    `);

    expect(
      emojiAvatarForAddress('0xBC16282f3154EA0c112ecD8E68Ece25dEFc4912a'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FF8CBC",
        "emoji": "🐷",
      }
    `);

    expect(
      emojiAvatarForAddress('0xca50b80894e7d5A3e8c93D87cA4b5486B329f0Cc'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#E95D72",
        "emoji": "🐙",
      }
    `);

    expect(
      emojiAvatarForAddress('0xdf670d7499074a3C75ef397bD76C8144e2d20f6B'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FF949A",
        "emoji": "🐵",
      }
    `);

    expect(
      emojiAvatarForAddress('0xb1BE66E870aB51B7852846C95679875F2556Dd31'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#71ABFF",
        "emoji": "🌎",
      }
    `);

    expect(
      emojiAvatarForAddress('0x71bbA3B0a1De57A3Cd36E20954aA176FF3726c10'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#4D82FF",
        "emoji": "⛵️",
      }
    `);

    expect(
      emojiAvatarForAddress('0xD4223D8dC920F8280E8C1b35607059c5C3CF4BAe'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FF6780",
        "emoji": "🍣",
      }
    `);

    expect(
      emojiAvatarForAddress('0xe1916C98FEd1B7b76B7d46E34A20B195aBEc7Fe1'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FF949A",
        "emoji": "🐵",
      }
    `);

    expect(
      emojiAvatarForAddress('0x5fDc4AEBC4fb5A8f3900a0E8e6e405617681a35b'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#9BA1A4",
        "emoji": "🐼",
      }
    `);

    expect(
      emojiAvatarForAddress('0x0796246FDc6Ba5A76F39f3858c6E42C292216C00'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FF8024",
        "emoji": "🦊",
      }
    `);

    expect(
      emojiAvatarForAddress('0xBAD149B6E6a9dB5C15AE4E69dEEeD3D2147725cb'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FFD95A",
        "emoji": "🤑",
      }
    `);

    expect(
      emojiAvatarForAddress('0xb1A9eBC3ad4195d25E39736ed676C48a72754b61'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FC5C54",
        "emoji": "🎈",
      }
    `);

    expect(
      emojiAvatarForAddress('0x1AbF88FAd2f4Ba062b736bf65bA575Ae486831Ea'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FF8CBC",
        "emoji": "🐷",
      }
    `);

    expect(
      emojiAvatarForAddress('0x847F1f4f924894C30c40355f808EDF2AC08c46bb'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#9BA1A4",
        "emoji": "🐼",
      }
    `);

    expect(
      emojiAvatarForAddress('0x7c9d8e2d0381840559c2548C843b143E623447a3'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FF8CBC",
        "emoji": "🐷",
      }
    `);

    expect(
      emojiAvatarForAddress('0x6b499da4A349700DCE0034659D2e906c6B39Ef1B'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FC5C54",
        "emoji": "👹",
      }
    `);

    expect(
      emojiAvatarForAddress('0x67150FDcf02565d89BBA39b71A67d5634aaee727'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FC5C54",
        "emoji": "🌶",
      }
    `);

    expect(
      emojiAvatarForAddress('0xcFc8CDEE48F00339d49656967371aa88D66dd5dF'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#B6B1B6",
        "emoji": "🐭",
      }
    `);

    expect(
      emojiAvatarForAddress('0xb084259F9518525b33E4b4bC2273493997dD61da'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FF8024",
        "emoji": "🦊",
      }
    `);

    expect(
      emojiAvatarForAddress('0x4B0D2d8e66D83938169e3E6C79b29d3F57D06Fab'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#4D82FF",
        "emoji": "⛵️",
      }
    `);

    expect(
      emojiAvatarForAddress('0xF4525e643b8A8cc67F1aEB925Be9049974f58846'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FC5C54",
        "emoji": "🌶",
      }
    `);

    expect(
      emojiAvatarForAddress('0x2e3f23d510673c058e994F1976A82D95F898e3d6'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#FFE279",
        "emoji": "🙀",
      }
    `);

    expect(
      emojiAvatarForAddress('0x2261BB44f0d3E33421068d16cb2Bf3a805D5285F'),
    ).toMatchInlineSnapshot(`
      {
        "color": "#A575FF",
        "emoji": "👾",
      }
    `);
  });

  it('gracefully handles invalid data', () => {
    // @ts-expect-error
    expect(emojiAvatarForAddress(undefined)).toMatchInlineSnapshot(`
      {
        "color": "#FC5C54",
        "emoji": "🌶",
      }
    `);

    // @ts-expect-error
    expect(emojiAvatarForAddress(null)).toMatchInlineSnapshot(`
      {
        "color": "#FC5C54",
        "emoji": "🌶",
      }
    `);

    // @ts-expect-error
    expect(emojiAvatarForAddress(123)).toMatchInlineSnapshot(`
      {
        "color": "#FC5C54",
        "emoji": "🌶",
      }
    `);

    expect(emojiAvatarForAddress('not an address')).toMatchInlineSnapshot(`
      {
        "color": "#E95D72",
        "emoji": "🐙",
      }
    `);
  });
});
