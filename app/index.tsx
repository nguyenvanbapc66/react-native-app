import IntroScreenItem from '@/components/IntroScreenItem';
import Paginator from '@/components/Paginator';
import { useRef, useState } from 'react';
import { Animated, FlatList, FlatListProps, ImageSourcePropType, Text, View } from 'react-native';

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

export default function IntroScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef<FlatListProps<any>['onViewableItemsChanged']>(
    ({ viewableItems }) => {
      setCurrentIndex(viewableItems[0]?.index ?? 0);
    },
  ).current;

  const viewConfig = useRef<FlatListProps<any>['viewabilityConfig']>({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 3 }}>
        <FlatList
          ref={slidesRef}
          data={slides}
          renderItem={({ item }) => <IntroScreenItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          scrollEventThrottle={32}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Paginator
          data={slides}
          scrollX={scrollX}
        />
      </View>
    </View>
  );
}
