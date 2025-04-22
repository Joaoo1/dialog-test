import { Box, Text } from '@chakra-ui/react';

interface Props {
  postText: string;
}

export const PostContent: React.FC<Props> = ({ postText }) => {
  const renderPostContentConsideringBreakLines = () => {
    return postText.split('\n').map(line => (
      <Text key={line} mb="2">
        {line || <>&nbsp;</>}
      </Text>
    ));
  };

  return <Box mt="6">{renderPostContentConsideringBreakLines()}</Box>;
};
