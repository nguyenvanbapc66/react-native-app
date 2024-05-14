import { images } from '@/assets/images';
import IntroScreenItem from '@/components/IntroScreenItem';
import Paginator from '@/components/Paginator';
import { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  FlatListProps,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';

export type SlideItemType = {
  id: string;
  source: ImageSourcePropType;
  text: string;
};

const slides: SlideItemType[] = [
  {
    id: '1',
    source: images.introImage,
    text: 'Welcome to Buff Ticket!',
  },
  {
    id: '2',
    source: images.introImage,
    text: "You'll be able to safely enter the concert with the ticket or bracelet through the ‘Buff Ticket’ app.",
  },
  {
    id: '3',
    source: images.introImage,
    text: 'Buff up your day with BuffTicket!',
  },
];

type IntroScreenProps = NativeStackScreenProps<RootStackParamList, 'Intro'>;

export default function IntroScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation<IntroScreenProps['navigation']>();

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
      <View style={styles.wrapperButton}>
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={() => navigation.push('Login')}
        >
          <Text style={styles.textButton}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperButton: {
    padding: 16,
    shadowColor: '#1b1b1b',
    shadowRadius: 10,
    shadowOpacity: 0.6,
  },
  buttonSubmit: {
    backgroundColor: '#1b1b1b',
    borderRadius: 6,
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 18,
  },
});
