import React, { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import {
  Easing,
  runOnUI,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  useTouchHandler,
  vec
} from '@shopify/react-native-skia'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

// Get device width and height
const { width, height } = Dimensions.get('window')

// Props for the PerlinNoise component
interface PerlinNoiseProps {
  color1: string // First color to be used
  color2: string // Second color to be used
}

const PerlinNoise: React.FC<PerlinNoiseProps> = ({ color1, color2 }) => {
  // Create a Skia Runtime Effect for the noise shader
  const noiseShader = Skia.RuntimeEffect.Make(`uniform float2 u_resolution;
uniform float u_time;
uniform half4 u_color1; // First color
uniform half4 u_color2; // Second color

// Fade function for smooth interpolation
float fade(float t) { 
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); 
}

// Smooth transition for 2D vectors
float2 _smooth(float2 x) { 
    return float2(fade(x.x), fade(x.y)); 
}

// Hash function to generate pseudo-random vectors based on input coordinates
float2 hash(float2 co, float u_time) {
    float m = dot(co, float2(12.9898, 78.233));
    return fract(float2(sin(m), cos(m)) * 43758.5453 * (u_time + 50.0) * 0.000003) * 2.0 - 1.0;
}

// 2D Perlin Noise function
float perlinNoise(float2 uv, float u_time) {
    float2 PT  = floor(uv);
    float2 pt  = fract(uv);
    float2 mmpt = _smooth(pt);
    
    float4 grads = float4(
        dot(hash(PT + float2(0.0, 1.0), u_time), pt - float2(0.0, 1.0)), 
        dot(hash(PT + float2(1.0, 1.0), u_time), pt - float2(1.0, 1.0)),
        dot(hash(PT + float2(0.0, 0.0), u_time), pt - float2(0.0, 0.0)), 
        dot(hash(PT + float2(1.0, 0.0), u_time), pt - float2(1.0, 0.0))
    );

    return mix(
        mix(grads.z, grads.w, mmpt.x), 
        mix(grads.x, grads.y, mmpt.x), 
        mmpt.y
    );
}

// Fractal Brownian Motion (fbm) function
float fbm(float2 uv, float u_time) {
    float finalNoise = 0.0;
    finalNoise += 0.50000 * perlinNoise(2.0 * uv, u_time);
    finalNoise += 0.25000 * perlinNoise(4.0 * uv, u_time);
    finalNoise += 0.12500 * perlinNoise(8.0 * uv, u_time);
    finalNoise += 0.06250 * perlinNoise(16.0 * uv, u_time);
    finalNoise += 0.03125 * perlinNoise(32.0 * uv, u_time);
    
    return finalNoise;
}

half4 main(float2 fragCoord) {
    float2 uv = fragCoord.xy / u_resolution.y;

    // Calculate noise sample
    float noiseSample = fbm(2.0 * uv, u_time) + 0.5;
    float x = fbm(2.0 * uv * (0.5 - noiseSample), u_time) + 0.5;

    // Base color interpolation between u_color1 and u_color2
    half4 fragColor = mix(u_color1, u_color2, x);

    // Adjust the color based on conditions without overriding the base colors
    if (x > -1.0)
        fragColor = mix(fragColor, u_color1 * half4(0.0, 0.0, 0.0, 0.0), 1.0); // Darker tone of u_color1
    
    if (x > 0.3)
        fragColor = mix(fragColor, u_color2 * half4(0.25, 1.5, 1.0, 1.0), 0.5); // Brighter tone of u_color2
    
    if (x > 0.4)
        fragColor = mix(fragColor, half4(0.9, 0.9, 0.3, 1.0), 0.7); // Blend in a custom yellowish tone
    
    if (x > clamp(abs(sin(0.5 * u_time)), 0.45, 1.0))
        fragColor = mix(fragColor, half4(0.8, 0.1, 0.3, 1.0), 0.7); // Blend in a reddish tone

    return fragColor; // Output the final color
}
`)! // Assert non-null with `!`

  // Time variable for animation using Reanimated's shared value
  const time = useSharedValue(0)
  const randomValue = Math.random() * 60 // Generate the random value on the JS thread

  // Start a repeating animation for the time variable

  useEffect(() => {
    runOnUI(() => {
      time.value = withRepeat(
        withTiming(randomValue, {
          duration: 8000,
          easing: Easing.elastic() // Removed any easing effect
        }),
        -1,
        true,
        () => {
          // Generate a new random value after each repeat cycle
          time.value = Math.random() * 30 // This will be triggered after each cycle
        }
      )
    })()
  }, [time])

  // Convert the color props to Skia's color format
  const skiaColor1 = Skia.Color(color1)
  const skiaColor2 = Skia.Color(color2)

  const uniforms = useDerivedValue(() => ({
    u_time: time.value, // Time value for animation
    u_resolution: vec(width, height), // Screen resolution
    u_color1: skiaColor1, // First color
    u_color2: skiaColor2 // Second color
  }))

  const tap = Gesture.Tap().onStart(() => {
    if (time.value === 0) {
      time.value = withRepeat(
        withTiming(randomValue, {
          duration: 8000,
          easing: Easing.elastic() // Removed any easing effect
        }),
        -1,
        true,
        () => {
          // Generate a new random value after each repeat cycle
          time.value = Math.random() * 30 // This will be triggered after each cycle
        }
      )
    } else {
      time.value = 0 // Randomize the time value on tap
    }
  })

  // Render the canvas with the noise shader applied
  return (
    <GestureDetector gesture={tap}>
      <Canvas style={styles.canvas}>
        <Fill>
          <Shader source={noiseShader} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject
  }
})

export default PerlinNoise
