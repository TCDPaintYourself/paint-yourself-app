import React, { useState, useCallback } from 'react'
import { FlatList, ImageBackground, Dimensions, StyleSheet } from 'react-native'

import { Text, View, Icon } from 'components/Themed'
import { IProjectTheme } from 'constants/ProjectThemes'
const { width } = Dimensions.get('screen')

const imageW = width * 0.8
const imageH = imageW * 1.54

interface Props {
  data: IProjectTheme[]
  setProjectTheme: (nextProjectTheme: IProjectTheme) => void
}

export default function ThemePicker({ data, setProjectTheme }: Props) {
  const [page, setPage] = useState<number>(0)

  const onScrollEnd = useCallback(
    (e: { nativeEvent: { contentOffset: { x: number } } }) => {
      let pageIndex = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5), 0), data.length)
      if (page !== pageIndex) {
        setPage(pageIndex)
        setProjectTheme(data[page])
      }
    },
    [page, setPage, setProjectTheme, data]
  )

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={onScrollEnd}
        scrollEventThrottle={32}
        renderItem={({ item }: { item: IProjectTheme }) => {
          return (
            <View style={{ width, alignItems: 'center' }}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.cardImage}
                imageStyle={{ borderRadius: 16, opacity: 0.7 }}
              >
                <Text style={styles.subtitle}>{item.name}</Text>
              </ImageBackground>
            </View>
          )
        }}
      />
      <View style={styles.circleSelector}>
        {[...Array(data.length)].map((_, i) => (
          <Icon
            key={`circle-selector-${i}`}
            name={i === page ? 'circle' : 'circle-o'}
            size={i === page ? 9 : 8}
            style={{ margin: 12 }}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 5,
    fontWeight: 'bold',
    position: 'relative',
    top: imageH - 48,
    left: 12,
    fontSize: 24,
  },
  circleSelector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  cardImage: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
  },
})
