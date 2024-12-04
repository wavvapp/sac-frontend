import React, { useEffect } from "react"
import { Dimensions, StyleSheet } from "react-native"
import {
  Easing,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { Canvas, Fill, Shader, Skia, vec } from "@shopify/react-native-skia"

// Get device width and height
const { width, height } = Dimensions.get("window")

// Props for the PerlinNoise component
interface PerlinNoiseProps {
  isOn: SharedValue<boolean>
  color1: string // First color (not directly used here but part of props)
  color2: string // Second color (not directly used here but part of props)
}

const PerlinNoise: React.FC<PerlinNoiseProps> = ({ isOn }) => {
  // Create a Skia Runtime Effect for the noise shader
  const noiseShader = Skia.RuntimeEffect.Make(`uniform float2 u_resolution;
uniform float u_time;
uniform float u_brightness;
uniform float u_flashness;

float2 rotate(float2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    float2x2 m = float2x2(c, -s, s, c);
    return m * v;
}

half4 main(float2 fragCoord) {
    float2 uv = fragCoord / u_resolution;
    float2 p = (uv * 2.0 - 1.0) * float2(u_resolution.x / u_resolution.y, 1.0);

    float zoom = 0.1;     
    float2 offset = float2(0.0, 0.0); 
    float rotation = 135.06; 
    float spacing = 0.5;
    float amplitude = 3.0;
    float intensity = 2.0;
    float speed = 0.009;
    float brightness = u_brightness + u_flashness * sin(u_time);

    p = rotate(p, rotation);
    p = p * zoom + offset;

    float3 col = float3(0.0);
    const int iterations = 100; // Reduced iterations for performance

    for (int i = 0; i < iterations; i++) {
        float r = float(i) * 0.01 * spacing;
        float2 waveOffset = float2(0, sin(-u_time * speed + float(i) * 0.03 / spacing) * float(i) * 0.008 / spacing * amplitude);
        col += float3(1.0) / (3.0 + 3000.0 * intensity * (abs(length(
            sin(p.x * 3237.0 + p.y * 100.888) * 0.020 * amplitude + p - waveOffset
        ) - r)));
    }

    col *= spacing * intensity;
    col *= brightness;
    col = clamp(col, float3(0.0), float3(1.0));

    return half4(col, 1.0);
}`)! // Assert non-null with `!`

  // Time variable for animation using Reanimated's shared value
  const time = useSharedValue(0)
  const u_brightness = useSharedValue(0)
  const u_flashness = useSharedValue(0)

  // Manage animation updates at 30 FPS
  const frameRate = 30
  useEffect(() => {
    const interval = setInterval(() => {
      time.value = (time.value + 0.1) % 10 // Limit time range for efficiency
    }, 1000 / frameRate) // Update at 30 FPS
    return () => clearInterval(interval)
  }, [])

  // Update brightness and flashness values when `isOn` changes
  useDerivedValue(() => {
    const brightness = isOn.value ? 1.0 : 0.4
    const flashness = isOn.value ? 0.5 : 0.0
    u_brightness.value = withTiming(brightness, {
      duration: 400,
      easing: Easing.linear, // Simplified easing for performance
    })
    u_flashness.value = withTiming(flashness, {
      duration: 400,
      easing: Easing.linear, // Simplified easing for performance
    })
  })

  // Define uniforms for the shader
  const uniforms = useDerivedValue(() => ({
    u_time: time.value,
    u_resolution: vec(width * 0.5, height * 0.5), // Reduced resolution for better performance
    u_brightness: u_brightness.value,
    u_flashness: u_flashness.value,
  }))

  // Render the canvas with the noise shader
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
    ...StyleSheet.absoluteFillObject,
  },
})

export default PerlinNoise
