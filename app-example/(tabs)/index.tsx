import IntroScreenItem from '@/components/IntroScreenItem';
import { FlatList, ImageSourcePropType, Text, View } from 'react-native';

export type SlideItemType = {
  id: string;
  source: ImageSourcePropType;
  text: string;
};

const slides: SlideItemType[] = [
  {
    id: '1',
    source: require('@/assets/images/intro-image.png'),
    text: 'Welcome to Buff Ticket!',
  },
  {
    id: '2',
    source: require('@/assets/images/intro-image.png'),
    text: "You'll be able to safely enter the concert with the ticket or bracelet through the ‘Buff Ticket’ app.",
  },
  {
    id: '3',
    source: require('@/assets/images/intro-image.png'),
    text: 'Buff up your day with BuffTicket!',
  },
];

export default function HomeScreen1() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <IntroScreenItem item={item} />}
      />
    </View>
  );
}
