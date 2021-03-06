import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, ImageBackground, Dimensions, StyleSheet } from 'react-native'

import { Text, View, Icon } from 'components/Themed'
import { IProjectTheme } from 'constants/ProjectThemes'
import { LinearGradient } from 'expo-linear-gradient'
const { width } = Dimensions.get('screen')
import { getThemesVote } from 'utils/themeVotes'
import { useForceUpdate } from 'hooks/useForceUpdate'

const imageW = width * 0.8
const imageH = imageW * 1.4

interface Props {
  data: IProjectTheme[]
  setProjectTheme: (nextProjectTheme: IProjectTheme) => void
}

export default function ThemePicker({ data, setProjectTheme }: Props) {
  const [page, setPage] = useState<number>(0)
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    updateVotes()
  }, [data])

  const onScrollEnd = useCallback(
    (e: { nativeEvent: { contentOffset: { x: number } } }) => {
      let pageIndex = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5), 0), data.length)
      if (page !== pageIndex) {
        setPage(pageIndex)
        setProjectTheme(data[pageIndex])
      }
    },
    [page, setPage, setProjectTheme, data]
  )

  const updateVotes = async () => {
    let votes = await getThemesVote()

    data.forEach((dataObject) => {
      votes.forEach((votesObject) => {
        if (dataObject.id == votesObject.theme) {
          dataObject.votes = votesObject.upvotes - votesObject.downvotes
        }
      })
    })

    // Since we are mutating the data object instead of using state hooks, we
    // need to tell React to re-render.
    forceUpdate()
  }

  return (
    <View style={{ flex: 1 }}>
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
              <ImageBackground source={item.image} style={styles.cardImage} imageStyle={{ borderRadius: 16 }}>
                <LinearGradient
                  colors={['rgba(66, 66, 74, 0.65)', 'rgba(25, 25, 25, 0.65)']}
                  style={styles.linearGradient}
                >
                  <Text style={styles.subtitle}>{item.name}</Text>
                  <Text style={styles.power}>{'Popularity: ' + item.votes}</Text>
                </LinearGradient>
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
    top: imageH - 80,
    left: 12,
    fontSize: 24,
    color: '#fff',
  },
  power: {
    marginTop: 5,
    position: 'relative',
    top: imageH - 80,
    left: 12,
    fontSize: 20,
    color: '#fff',
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
  linearGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
})
