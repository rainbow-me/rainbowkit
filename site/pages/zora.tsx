/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '90vh',
        width: '100vw',
        background: 'white',
        flexDirection: 'column',
        color: 'rgb(128, 128, 128)',
      }}
    >
      <Head>
        <title>ZORA - The NFT Marketplace Protocol</title>
      </Head>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 30px',
          minHeight: 66,
          borderBottom: '2px solid rgb(242, 242, 242)',
          gap: 20,
        }}
      >
        <div
          style={{
            height: 30,
            width: 30,
            borderRadius: 9999,
            background:
              'radial-gradient(75.29% 75.29% at 64.96% 24.36%,#dcc8d0 15.62%,#78c8cf 30.21%,#4d959e 42.71%,#305eb9 55.73%,#311f12 79.69%,#684232 90.62%,#2d1c13 100%)',
            marginRight: 10,
          }}
        />
        <span
          style={{ fontFamily: 'Inter', WebkitFontSmoothing: 'antialiased' }}
        >
          Explore
        </span>
        <span
          style={{ fontFamily: 'Inter', WebkitFontSmoothing: 'antialiased' }}
        >
          Manifesto
        </span>
        <span
          style={{ fontFamily: 'Inter', WebkitFontSmoothing: 'antialiased' }}
        >
          Developers
        </span>
        <span
          style={{ fontFamily: 'Inter', WebkitFontSmoothing: 'antialiased' }}
        >
          Zine
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <ConnectButton />
        </div>
        <img src="https://zora.co/assets/icon/ellipsis.svg" />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 675, margin: '0 auto', flex: 1 }}>
          <Logo />
          <div style={{ position: 'relative' }}>
            <img
              src="https://zora.co/assets/icon/search.svg"
              style={{
                pointerEvents: 'none',
                position: 'absolute',
                left: 20,
                top: '50%',
                width: 16,
                height: 16,
                transform: 'translateY(-50%)',
              }}
            />
            <input
              style={{
                border: '1px solid rgb(179, 179, 179)',
                height: 42,
                borderRadius: 8,
                width: '100%',
                paddingLeft: 52,
                fontFamily: 'Inter',
                fontSize: 14,
                WebkitFontSmoothing: 'antialiased',
              }}
              placeholder="Search the metaverse..."
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                margin: '0 auto',
                paddingTop: '32px',
                color: 'black',
                fontSize: 16,
                borderBottom: '2px solid',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              or explore
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const Logo = () => (
  <svg
    width="328"
    height="72"
    viewBox="0 0 328 72"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: '0 auto 64px' }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M139.781 35.9295C139.781 23.8826 129.963 14.09 117.92 14.09C105.841 14.09 96.023 23.8826 96.0583 35.9295C96.0583 47.9413 105.841 57.7338 117.92 57.7338C129.963 57.7338 139.781 47.9765 139.781 35.9295ZM115.361 0.0893737C116.206 0.0301249 117.059 0 117.92 0C118.8 0 119.673 0.031545 120.537 0.0935625L135.417 0.105606H201.954C206.828 0.105606 210.889 1.09191 214.139 3.06451C217.388 5.03711 219.86 7.53809 221.59 10.497C223.321 13.4559 224.239 16.7318 224.38 20.2191C224.522 23.7416 223.921 26.9823 222.544 30.0117C221.167 33.0058 219.012 35.5068 216.081 37.5498C213.15 39.5577 209.512 40.6144 205.097 40.6496L198.67 40.7553L224.875 55.7157V18.4932C224.875 14.1605 225.97 10.5676 228.195 7.67914C230.384 4.79068 233.174 2.74763 236.529 1.51476C239.885 0.281878 243.522 -0.105597 247.407 0.387553C251.292 0.880704 254.965 2.32493 258.32 4.79068L327.648 54.775V72.0001L249.561 15.7105C248.113 14.6889 246.736 14.0901 245.465 13.9492C244.193 13.8083 243.028 13.9844 242.039 14.4776C241.05 14.9707 240.273 15.7809 239.708 16.8024C239.143 17.8592 238.86 19.0216 238.86 20.3602L239.143 71.7887H225.016V71.9419L154.341 28.6026V27.8018L203.155 27.6868C205.698 27.6868 207.605 26.9823 208.947 25.5733C210.254 24.1643 210.96 22.6144 211.031 20.9236C211.101 19.2328 210.536 17.6829 209.3 16.2739C208.099 14.8649 206.227 14.1604 203.685 14.1604L146.459 14.0694C151.11 20.1268 153.872 27.7073 153.872 35.9295C153.872 55.7612 137.768 71.8239 117.884 71.8239C117.232 71.8239 116.583 71.8066 115.939 71.7724L115.922 71.8239H20.6712C16.8216 71.8239 13.5018 71.0137 10.6765 69.4286C7.88641 67.8435 5.62611 65.7652 3.9662 63.2642C2.27098 60.728 1.17615 57.9452 0.611077 54.8807C0.0460025 51.8161 0.116637 48.8219 0.787662 45.863C1.45869 42.9394 2.76542 40.227 4.70786 37.7613C6.65031 35.2955 9.29909 33.4286 12.6189 32.1605L64.5351 13.9844H4.95508V1.61958e-05L115.361 0.0893737ZM86.0058 19.2575L18.1284 45.5108C16.6804 46.1096 15.6915 47.0959 15.1617 48.4345C14.632 49.773 14.526 51.1468 14.8792 52.5206C15.2324 53.8944 16.0093 55.1272 17.1395 56.184C18.2696 57.2407 19.7883 57.7691 21.6601 57.7691L89.3726 57.8414C84.6842 51.7803 81.8961 44.1812 81.8961 35.9295C81.8961 29.9136 83.3814 24.2412 86.0058 19.2575Z"
    />
  </svg>
);
