import { SlideItemType } from '@/app';
import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

type PaginatorPropsType = {
  data: SlideItemType[];
  scrollX: Animated.Value;
};

export default function Paginator({ data, scrollX }: PaginatorPropsType) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: 'row', height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#493d8a',
    marginHorizontal: 8,
  },
});
