import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  Easing,
  interpolate,
  runOnJS,
  runOnUI,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import { Canvas, Fill, Shader, Skia, vec } from '@shopify/react-native-skia'

// Get device width and height
const { width, height } = Dimensions.get('window')

// Props for the PerlinNoise component
interface PerlinNoiseProps {
  isOn: SharedValue<boolean>
  color1: string // First color to be used
  color2: string // Second color to be used
}

const PerlinNoise: React.FC<PerlinNoiseProps> = ({ color1, color2, isOn }) => {
  // Create a Skia Runtime Effect for the noise shader
  const noiseShader = Skia.RuntimeEffect.Make(`uniform float2 u_resolution;
uniform float u_time;
uniform float u_brightness;
uniform float u_flashness;

// Rotation function
float2 rotate(float2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    float2x2 m = float2x2(c, -s, s, c);
    return m * v;
}

half4 main(float2 fragCoord) {
    float2 uv = fragCoord / u_resolution;
    float2 p = (uv * 2.0 - 1.0) * float2(u_resolution.x / u_resolution.y, 1.0);

    // New control variables
    float zoom = 0.1;     // Zoom level (1.0 is original, larger values zoom out)
    float2 offset = float2(0.0, 0.0); // X and Y offset
    float rotation = 135.06; // Rotation angle in radians

    // Existing control variables
    float spacing = 0.5;
    float amplitude = 3.0;
    float intensity = 2.0;
    float speed = 0.009;
    float brightness = u_brightness + u_flashness * sin(u_time); // New brightness control (1.0 is original, larger values increase brightness)

    // Apply transformations
    p = rotate(p, rotation);
    p = p * zoom + offset;

    float3 col = float3(0.0);
    const int iterations = 200; // Fixed number of iterations

    for (int i = 0; i < iterations; i++) {
        float r = float(i) * 0.01 * spacing;

        float2 waveOffset = float2(0, sin(-u_time * speed + float(i) * 0.03 / spacing) * float(i) * 0.008 / spacing * amplitude);

        col += float3(1.0) / (3.0 + 3000.0 * intensity * (abs(length(
            sin(p.x * 3237.0 + p.y * 100.888) * 0.020 * amplitude + p - waveOffset
        ) - r)));
    }

    col *= spacing * intensity;

    // Apply brightness
    col *= brightness;

    // Clamp the final color to prevent over-saturation
    col = clamp(col, float3(0.0), float3(1.0));

    return half4(col, 1.9);
}

`)! // Assert non-null with `!`

  // Time variable for animation using Reanimated's shared value
  const time = useSharedValue(1)
  const u_brightness = useSharedValue(0)
  const u_flashness = useSharedValue(0)

  // Start a repeating animation for the time variable
  useEffect(() => {
    runOnUI(() => {
      time.value = withRepeat(
        withTiming(50, {
          duration: 80000,
          easing: Easing.elastic() // Removed any easing effect
        }),
        -1,
        true
      )
    })()
  }, [isOn])

  useDerivedValue(() => {
    const brightness = interpolate(Number(isOn.value), [0, 1], [0.4, 1.0])
    const flasshness = interpolate(Number(isOn.value), [0, 1], [0.0, 0.5])
    u_brightness.value = withTiming(brightness, {
      duration: 400,
      easing: Easing.elastic() // Removed any easing effect
    })
    u_flashness.value = withTiming(flasshness, {
      duration: 400,
      easing: Easing.elastic() // Removed any easing effect
    })
  }, [isOn.value]) // Track correct dependencies

  const uniforms = useDerivedValue(() => {
    return {
      u_time: time.value, // Time value for animation
      u_resolution: vec(width, height), // Screen resolution
      u_brightness: u_brightness.value, // Directly using the interpolated value
      u_flashness: u_flashness.value // Directly using the interpolated value
    }
  }, [time.value, width, height, isOn.value]) // Track correct dependencies

  // Render the canvas with the noise shader applied
  return (
    <Canvas style={styles.canvas}>
      <Fill>
        <Shader source={noiseShader} uniforms={uniforms} />
      </Fill>
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject
  }
})

export default PerlinNoise
