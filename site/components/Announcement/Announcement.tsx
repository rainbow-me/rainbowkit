import { Box, type BoxProps } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Text } from 'components/Text/Text';
import Link from 'next/link';
import React from 'react';
import { announcement } from './Announcement.css';

type AnnouncementProps = {
  heading: string;
  subheading: string;
  actionTitle: string;
  actionUrl: string;
  props?: BoxProps;
};

export function Announcement({
  actionTitle,
  actionUrl,
  heading,
  props,
  subheading,
}: AnnouncementProps) {
  return (
    <Box
      as="div"
      borderColor="fillElevated"
      borderRadius="3"
      borderWidth="1"
      className={announcement}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      marginBottom="8"
      paddingBottom="5"
      paddingTop="5"
      paddingX="5"
      {...props}
    >
      <Box display="flex" flexDirection="column" gap="2">
        <Text as="h4" display="inline" variant="title3" weight="medium">
          {heading}
        </Text>
        <Text as="p" color="labelSecondary" style={{ fontWeight: 500 }}>
          {subheading}
        </Text>
      </Box>
      <Box alignItems="center" display="flex" justifyContent="center">
        <Link href={actionUrl}>
          <Button size="m" variant="blue">
            {actionTitle}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
