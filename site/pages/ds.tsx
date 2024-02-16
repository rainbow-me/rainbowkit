import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Code } from 'components/Code/Code';
import { Link } from 'components/Link/Link';
import { Text } from 'components/Text/Text';
import { Wrapper } from 'components/Wrapper/Wrapper';
import React, { useEffect, useState } from 'react';

export default function DS() {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  return (
    <Wrapper marginY="11" position="relative">
      <Box position="absolute" top="4" right="4">
        <Button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          type="button"
        >
          {mode}
        </Button>
      </Box>

      <Text as="h1" variant="titleLarge">
        Design System
      </Text>

      <Text as="h2" variant="title1" marginTop="11" marginBottom="8">
        Button
      </Text>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Contrast
      </Text>
      <Box display="flex" alignItems="center" gap="4">
        <Button variant="contrast" size="xs">
          Button
        </Button>
        <Button variant="contrast" size="s">
          Button
        </Button>
        <Button variant="contrast" size="m">
          Button
        </Button>
        <Button variant="contrast" size="l">
          Button
        </Button>
        <Button variant="contrast" size="xl">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Gray
      </Text>
      <Box display="flex" alignItems="center" gap="4">
        <Button variant="gray" size="xs">
          Button
        </Button>
        <Button variant="gray" size="s">
          Button
        </Button>
        <Button variant="gray" size="m">
          Button
        </Button>
        <Button variant="gray" size="l">
          Button
        </Button>
        <Button variant="gray" size="xl">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Blue
      </Text>
      <Box display="flex" alignItems="center" gap="4">
        <Button variant="blue" size="xs">
          Button
        </Button>

        <Button variant="blue" size="s">
          Button
        </Button>
        <Button variant="blue" size="m">
          Button
        </Button>
        <Button variant="blue" size="l">
          Button
        </Button>
        <Button variant="blue" size="xl">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Purple Gradient
      </Text>
      <Box display="flex" alignItems="center" gap="4">
        <Button variant="purpleGradient" size="xs">
          Button
        </Button>

        <Button variant="purpleGradient" size="s">
          Button
        </Button>
        <Button variant="purpleGradient" size="m">
          Button
        </Button>
        <Button variant="purpleGradient" size="l">
          Button
        </Button>
        <Button variant="purpleGradient" size="xl">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Blue Gradient
      </Text>
      <Box display="flex" alignItems="center" gap="4">
        <Button variant="blueGradient" size="xs">
          Button
        </Button>

        <Button variant="blueGradient" size="s">
          Button
        </Button>
        <Button variant="blueGradient" size="m">
          Button
        </Button>
        <Button variant="blueGradient" size="l">
          Button
        </Button>
        <Button variant="blueGradient" size="xl">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Pink Gradient
      </Text>
      <Box display="flex" alignItems="center" gap="4">
        <Button variant="pinkGradient" size="xs">
          Button
        </Button>

        <Button variant="pinkGradient" size="s">
          Button
        </Button>
        <Button variant="pinkGradient" size="m">
          Button
        </Button>
        <Button variant="pinkGradient" size="l">
          Button
        </Button>
        <Button variant="pinkGradient" size="xl">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Outline
      </Text>
      <Box display="flex" alignItems="center" gap="4">
        <Button variant="outline" size="xs">
          Button
        </Button>
        <Button variant="outline" size="s">
          Button
        </Button>
        <Button variant="outline" size="m">
          Button
        </Button>
        <Button variant="outline" size="l">
          Button
        </Button>
        <Button variant="outline" size="xl">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Ghost
      </Text>
      <Box display="flex" alignItems="center" gap="4">
        <Button variant="ghost" size="xs">
          Button
        </Button>
        <Button variant="ghost" size="s">
          Button
        </Button>
        <Button variant="ghost" size="m">
          Button
        </Button>
        <Button variant="ghost" size="l">
          Button
        </Button>
        <Button variant="ghost" size="xl">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        With Shadow
      </Text>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button shadow variant="contrast" size="xs">
          Button
        </Button>
        <Button shadow variant="gray" size="xs">
          Button
        </Button>
        <Button shadow size="xs" variant="blue">
          Button
        </Button>
        <Button shadow size="xs" variant="outline">
          Button
        </Button>
        <Button shadow size="xs" variant="ghost">
          Button
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button shadow variant="contrast" size="s">
          Button
        </Button>
        <Button shadow variant="gray" size="s">
          Button
        </Button>
        <Button shadow size="s" variant="blue">
          Button
        </Button>
        <Button shadow size="s" variant="outline">
          Button
        </Button>
        <Button shadow size="s" variant="ghost">
          Button
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button shadow variant="contrast" size="m">
          Button
        </Button>
        <Button shadow variant="gray" size="m">
          Button
        </Button>
        <Button shadow size="m" variant="blue">
          Button
        </Button>
        <Button shadow size="m" variant="outline">
          Button
        </Button>
        <Button shadow size="m" variant="ghost">
          Button
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button shadow variant="contrast" size="l">
          Button
        </Button>
        <Button shadow variant="gray" size="l">
          Button
        </Button>
        <Button shadow size="l" variant="blue">
          Button
        </Button>
        <Button shadow size="l" variant="outline">
          Button
        </Button>
        <Button shadow size="l" variant="ghost">
          Button
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button shadow variant="contrast" size="xl">
          Button
        </Button>
        <Button shadow variant="gray" size="xl">
          Button
        </Button>
        <Button shadow size="xl" variant="blue">
          Button
        </Button>
        <Button shadow size="xl" variant="outline">
          Button
        </Button>
        <Button shadow size="xl" variant="ghost">
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        With prefix/suffix combinations
      </Text>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" prefix={<IconTag />}>
          Button
        </Button>
        <Button size="xs" suffix={<IconQR />}>
          Button
        </Button>
        <Button size="xs" prefix={<IconTag />} suffix={<IconQR />}>
          Button
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="s" prefix={<IconTag />}>
          Button
        </Button>
        <Button size="s" suffix={<IconQR />}>
          Button
        </Button>
        <Button size="s" prefix={<IconTag />} suffix={<IconQR />}>
          Button
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="m" prefix={<IconTag />}>
          Button
        </Button>
        <Button size="m" suffix={<IconQR />}>
          Button
        </Button>
        <Button size="m" prefix={<IconTag />} suffix={<IconQR />}>
          Button
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="l" prefix={<IconTag />}>
          Button
        </Button>
        <Button size="l" suffix={<IconQR />}>
          Button
        </Button>
        <Button size="l" prefix={<IconTag />} suffix={<IconQR />}>
          Button
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xl" prefix={<IconTag />}>
          Button
        </Button>
        <Button size="xl" suffix={<IconQR />}>
          Button
        </Button>
        <Button size="xl" prefix={<IconTag />} suffix={<IconQR />}>
          Button
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Shape Circle
      </Text>

      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" shape="circle" aria-label="action">
          <IconTag />
        </Button>
        <Button size="s" shape="circle" aria-label="action">
          <IconTag />
        </Button>
        <Button size="m" shape="circle" aria-label="action">
          <IconTag />
        </Button>
        <Button size="l" shape="circle" aria-label="action">
          <IconTag />
        </Button>
        <Button size="xl" shape="circle" aria-label="action">
          <IconTag />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" shape="circle" variant="blue" aria-label="action">
          <IconTag />
        </Button>
        <Button size="s" shape="circle" variant="blue" aria-label="action">
          <IconTag />
        </Button>
        <Button size="m" shape="circle" variant="blue" aria-label="action">
          <IconTag />
        </Button>
        <Button size="l" shape="circle" variant="blue" aria-label="action">
          <IconTag />
        </Button>
        <Button size="xl" shape="circle" variant="blue" aria-label="action">
          <IconTag />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" shape="circle" variant="outline" aria-label="action">
          <IconTag />
        </Button>
        <Button size="s" shape="circle" variant="outline" aria-label="action">
          <IconTag />
        </Button>
        <Button size="m" shape="circle" variant="outline" aria-label="action">
          <IconTag />
        </Button>
        <Button size="l" shape="circle" variant="outline" aria-label="action">
          <IconTag />
        </Button>
        <Button size="xl" shape="circle" variant="outline" aria-label="action">
          <IconTag />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" shape="circle" shadow aria-label="action">
          <IconTag />
        </Button>
        <Button size="s" shape="circle" shadow aria-label="action">
          <IconTag />
        </Button>
        <Button size="m" shape="circle" shadow aria-label="action">
          <IconTag />
        </Button>
        <Button size="l" shape="circle" shadow aria-label="action">
          <IconTag />
        </Button>
        <Button size="xl" shape="circle" shadow aria-label="action">
          <IconTag />
        </Button>
      </Box>

      <Text
        as="h3"
        variant="headline"
        color="labelSecondary"
        marginTop="8"
        marginBottom="4"
      >
        Shape Square
      </Text>

      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" shape="square" aria-label="action">
          <IconTag />
        </Button>
        <Button size="s" shape="square" aria-label="action">
          <IconTag />
        </Button>
        <Button size="m" shape="square" aria-label="action">
          <IconTag />
        </Button>
        <Button size="l" shape="square" aria-label="action">
          <IconTag />
        </Button>
        <Button size="xl" shape="square" aria-label="action">
          <IconTag />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" shape="square" variant="blue" aria-label="action">
          <IconTag />
        </Button>
        <Button size="s" shape="square" variant="blue" aria-label="action">
          <IconTag />
        </Button>
        <Button size="m" shape="square" variant="blue" aria-label="action">
          <IconTag />
        </Button>
        <Button size="l" shape="square" variant="blue" aria-label="action">
          <IconTag />
        </Button>
        <Button size="xl" shape="square" variant="blue" aria-label="action">
          <IconTag />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" shape="square" variant="outline" aria-label="action">
          <IconTag />
        </Button>
        <Button size="s" shape="square" variant="outline" aria-label="action">
          <IconTag />
        </Button>
        <Button size="m" shape="square" variant="outline" aria-label="action">
          <IconTag />
        </Button>
        <Button size="l" shape="square" variant="outline" aria-label="action">
          <IconTag />
        </Button>
        <Button size="xl" shape="square" variant="outline" aria-label="action">
          <IconTag />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Button size="xs" shape="square" shadow aria-label="action">
          <IconTag />
        </Button>
        <Button size="s" shape="square" shadow aria-label="action">
          <IconTag />
        </Button>
        <Button size="m" shape="square" shadow aria-label="action">
          <IconTag />
        </Button>
        <Button size="l" shape="square" shadow aria-label="action">
          <IconTag />
        </Button>
        <Button size="xl" shape="square" shadow aria-label="action">
          <IconTag />
        </Button>
      </Box>

      <Text as="h2" variant="title1" marginTop="11" marginBottom="8">
        Text
      </Text>

      <Text marginBottom="4" variant="titleLarge">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="titleLarge" weight="medium">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="titleLarge" weight="bold">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="titleLarge" weight="heavy">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title1">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title1" weight="medium">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title1" weight="bold">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title1" weight="heavy">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title2">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title2" weight="medium">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title2" weight="bold">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title2" weight="heavy">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title3">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title3" weight="medium">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title3" weight="bold">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="title3" weight="heavy">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="headline">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="headline" weight="medium">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="headline" weight="bold">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="headline" weight="heavy">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="body">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="body" weight="medium">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="body" weight="bold">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="body" weight="heavy">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="subhead">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="subhead" weight="medium">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="subhead" weight="bold">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="subhead" weight="heavy">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="footnote">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="footnote" weight="medium">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="footnote" weight="bold">
        Explore the new world of Ethereum
      </Text>
      <Text marginBottom="4" variant="footnote" weight="heavy">
        Explore the new world of Ethereum
      </Text>

      <Text as="h2" variant="title1" marginTop="11" marginBottom="8">
        Link
      </Text>

      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Link href="#">click here</Link>
      </Box>

      <Text as="h2" variant="title1" marginTop="11" marginBottom="8">
        Code
      </Text>

      <Box display="flex" alignItems="center" gap="4" marginY="4">
        <Code>RainbowKitProvider</Code>
        <Code variant="secondary">RainbowKitProvider</Code>
      </Box>
    </Wrapper>
  );
}

const IconTag = ({ size = '17' }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: safely ignored
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M0.5 16.12H16.5V0.12H0.5V16.12Z" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_223_5959" transform="scale(0.015625)" />
      </pattern>
      <image
        id="image0_223_5959"
        width="64"
        height="64"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const IconQR = () => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: safely ignored
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.14648 6.56543H4.89453C5.97461 6.56543 6.4873 6.0459 6.4873 4.94531V2.23828C6.4873 1.14453 5.97461 0.625 4.89453 0.625H2.14648C1.07324 0.625 0.553711 1.14453 0.553711 2.23828V4.94531C0.553711 6.0459 1.07324 6.56543 2.14648 6.56543ZM9.10547 6.56543H11.8535C12.9268 6.56543 13.4463 6.0459 13.4463 4.94531V2.23828C13.4463 1.14453 12.9268 0.625 11.8535 0.625H9.10547C8.03223 0.625 7.5127 1.14453 7.5127 2.23828V4.94531C7.5127 6.0459 8.03223 6.56543 9.10547 6.56543ZM2.0918 5.39648C1.83887 5.39648 1.72266 5.27344 1.72266 5.00684V2.17676C1.72266 1.91699 1.83887 1.79395 2.0918 1.79395H4.94922C5.20215 1.79395 5.3252 1.91699 5.3252 2.17676V5.00684C5.3252 5.27344 5.20215 5.39648 4.94922 5.39648H2.0918ZM9.05762 5.39648C8.79785 5.39648 8.68164 5.27344 8.68164 5.00684V2.17676C8.68164 1.91699 8.79785 1.79395 9.05762 1.79395H11.9082C12.1611 1.79395 12.2773 1.91699 12.2773 2.17676V5.00684C12.2773 5.27344 12.1611 5.39648 11.9082 5.39648H9.05762ZM2.8916 4.37109H4.14258C4.25195 4.37109 4.2998 4.32324 4.2998 4.2002V2.9834C4.2998 2.86035 4.25195 2.81934 4.14258 2.81934H2.8916C2.78223 2.81934 2.74805 2.86035 2.74805 2.9834V4.2002C2.74805 4.32324 2.78223 4.37109 2.8916 4.37109ZM9.87793 4.37109H11.1289C11.2383 4.37109 11.2861 4.32324 11.2861 4.2002V2.9834C11.2861 2.86035 11.2383 2.81934 11.1289 2.81934H9.87793C9.76855 2.81934 9.73438 2.86035 9.73438 2.9834V4.2002C9.73438 4.32324 9.76855 4.37109 9.87793 4.37109ZM2.14648 13.5176H4.89453C5.97461 13.5176 6.4873 13.0049 6.4873 11.9043V9.19727C6.4873 8.10352 5.97461 7.58398 4.89453 7.58398H2.14648C1.07324 7.58398 0.553711 8.10352 0.553711 9.19727V11.9043C0.553711 13.0049 1.07324 13.5176 2.14648 13.5176ZM7.99805 9.4502H9.25586C9.36523 9.4502 9.41309 9.40918 9.41309 9.2793V8.0625C9.41309 7.93945 9.36523 7.89844 9.25586 7.89844H7.99805C7.89551 7.89844 7.85449 7.93945 7.85449 8.0625V9.2793C7.85449 9.40918 7.89551 9.4502 7.99805 9.4502ZM11.6826 9.4502H12.9404C13.0498 9.4502 13.0908 9.40918 13.0908 9.2793V8.0625C13.0908 7.93945 13.0498 7.89844 12.9404 7.89844H11.6826C11.5732 7.89844 11.5391 7.93945 11.5391 8.0625V9.2793C11.5391 9.40918 11.5732 9.4502 11.6826 9.4502ZM2.0918 12.3555C1.83887 12.3555 1.72266 12.2324 1.72266 11.9727V9.13574C1.72266 8.87598 1.83887 8.75293 2.0918 8.75293H4.94922C5.20215 8.75293 5.3252 8.87598 5.3252 9.13574V11.9727C5.3252 12.2324 5.20215 12.3555 4.94922 12.3555H2.0918ZM9.85742 11.2891H11.1152C11.2246 11.2891 11.2656 11.248 11.2656 11.1182V9.90137C11.2656 9.78516 11.2246 9.7373 11.1152 9.7373H9.85742C9.75488 9.7373 9.71387 9.78516 9.71387 9.90137V11.1182C9.71387 11.248 9.75488 11.2891 9.85742 11.2891ZM2.8916 11.3301H4.14258C4.25195 11.3301 4.2998 11.2822 4.2998 11.1592V9.94238C4.2998 9.81934 4.25195 9.77832 4.14258 9.77832H2.8916C2.78223 9.77832 2.74805 9.81934 2.74805 9.94238V11.1592C2.74805 11.2822 2.78223 11.3301 2.8916 11.3301ZM7.99805 13.1279H9.25586C9.36523 13.1279 9.41309 13.0869 9.41309 12.957V11.7402C9.41309 11.624 9.36523 11.5762 9.25586 11.5762H7.99805C7.89551 11.5762 7.85449 11.624 7.85449 11.7402V12.957C7.85449 13.0869 7.89551 13.1279 7.99805 13.1279ZM11.6826 13.1279H12.9404C13.0498 13.1279 13.0908 13.0869 13.0908 12.957V11.7402C13.0908 11.624 13.0498 11.5762 12.9404 11.5762H11.6826C11.5732 11.5762 11.5391 11.624 11.5391 11.7402V12.957C11.5391 13.0869 11.5732 13.1279 11.6826 13.1279Z"
      fill="currentColor"
    />
  </svg>
);
