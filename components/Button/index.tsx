import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native'

import Colors from 'constants/Colors'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  fullWidth?: boolean
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'info'
}

export default function Button({ title, fullWidth, variant = 'primary', ...props }: ButtonProps) {
  const backgroundColor = Colors[variant].background

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        backgroundColor,
        padding: 12,
        borderRadius: 16,
        width: fullWidth ? '100%' : 'auto',
      }}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
})
