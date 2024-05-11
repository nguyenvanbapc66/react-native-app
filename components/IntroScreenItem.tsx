import { SlideItemType } from '@/app-example/(tabs)';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

type IntroScreenItemPropsType = {
  item: SlideItemType;
};

export default function IntroScreenItem({ item }: IntroScreenItemPropsType) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.source}
        style={[styles.image, { width, resizeMode: 'contain' }]}
      />

      <View style={{ flex: 0.3 }}>
        <Text style={{ fontSize: 22, textAlign: 'center', color: '#1B1B1B' }}>{item.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginTop: 160,
    marginBottom: 40,
  },
});
