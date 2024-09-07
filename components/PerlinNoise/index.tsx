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
  const noiseShader = Skia.RuntimeEffect.Make(`
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_color1;
uniform vec4 u_color2;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

vec4 main(vec2 fragCoord) {
    vec2 st = fragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(.0);

    // Scale
    st *= 5.;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 0.4;  // minimum distance
    for (int j= -1; j <= 1; j++ ) {
        for (int i= -1; i <= 1; i++ ) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(i),float(j));

            // Random position from current + neighbor place in the grid
            vec2 offset = random2(i_st + neighbor);

            // Animate the offset
            offset = 0.5 + 0.5*sin(u_time + 6.2831*offset);

            // Position of the cell
            vec2 pos = neighbor + offset - f_st;

            // Cell distance
            float dist = length(pos);

            // Metaball it!
            m_dist = min(m_dist, m_dist*dist);
        }
    }

    // Draw cells
    color = mix(u_color1.rgb, u_color2.rgb, smoothstep(0.0, 0.2, m_dist));

    return vec4(color,1.0);
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
