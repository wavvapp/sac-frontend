import React, { useEffect } from "react"
import { StyleSheet } from "react-native"
import {
  Easing,
  interpolate,
  runOnUI,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  vec,
} from "@shopify/react-native-skia"
import { height, width } from "@/utils/dimensions"

// Props for the PerlinNoise component
interface PerlinNoiseProps {
  isOn: SharedValue<boolean>
  color1: string // First color to be used
  color2: string // Second color to be used
}

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
    float speed = 0.05;
    float brightness = u_brightness + u_flashness * sin(u_time); // New brightness control (1.0 is original, larger values increase brightness)

    // Apply transformations
    p = rotate(p, rotation);
    p = p * zoom + offset;

    float3 col = float3(0.0);
    const int iterations = 100; // Fixed number of iterations

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

`)! 

const shaderCode = Skia.RuntimeEffect.Make(`
uniform float u_time;
uniform vec2 u_resolution;

// Perlin Noise Function
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = dot(i, vec2(127.1, 311.7));
    float b = dot(i + vec2(1.0, 0.0), vec2(127.1, 311.7));
    float c = dot(i + vec2(0.0, 1.0), vec2(127.1, 311.7));
    float d = dot(i + vec2(1.0, 1.0), vec2(127.1, 311.7));

    return mix(mix(fract(sin(a) * 43758.5453123), fract(sin(b) * 43758.5453123), u.x),
               mix(fract(sin(c) * 43758.5453123), fract(sin(d) * 43758.5453123), u.x), u.y);
}

// Smooth Perlin Noise
float perlinNoise(vec2 p) {
    return noise(p) * 0.5 + noise(p * 2.0) * 0.25 + noise(p * 4.0) * 0.125;
}

half4 main(vec2 fragCoord) {
    vec2 uv = fragCoord / u_resolution.xy; // Normalize coordinates
    uv.x -= u_time * 0.1;                  // Animate right to left

    // Scale and translate the noise pattern
    vec2 scaledUV = uv * 5.0 - vec2(2.5, 2.5); // Increase scaling factor to reduce blurriness
    float n = perlinNoise(scaledUV);

    // Create soft bubble-like shapes
    float bubbles = smoothstep(0.4, 0.6, n) - smoothstep(0.6, 0.8, n); // Adjust thresholds to sharpen edges

    // Add translucency and glowing effect
    vec3 color = vec3(1.0) * bubbles * (0.8 + 0.2 * sin(u_time)); // Pulsing luminance
    float alpha = bubbles * 0.9; // Increase opacity for sharper edges

    return half4(color, alpha); // Return final color with alpha
}`)!;




const PerlinNoise: React.FC<PerlinNoiseProps> = ({ isOn }) => {
  
  // Time variable for animation using Reanimated's shared value
  const time = useSharedValue(1)
  const u_brightness = useSharedValue(0)
  const u_flashness = useSharedValue(0)

  // Start a repeating animation for the time variable
  useEffect(() => {
    runOnUI(() => {
      time.value = withRepeat(
        withTiming(60, {
          duration: 80000,
          easing: Easing.linear, // Removed any easing effect
        }),
        -1,
        false,
      )
    })()
  }, [isOn])

  useDerivedValue(() => {
    const brightness = interpolate(Number(isOn.value), [0, 1], [0.4, 1.0])
    const flasshness = interpolate(Number(isOn.value), [0, 1], [0.0, 0.5])
    u_brightness.value = withTiming(brightness, {
      duration: 400,
      easing: Easing.elastic(), // Removed any easing effect
    })
    u_flashness.value = withTiming(flasshness, {
      duration: 400,
      easing: Easing.elastic(), // Removed any easing effect
    })
  }, [isOn.value]) // Track correct dependencies

  const uniforms = useDerivedValue(() => {
    return {
      u_time: time.value, // Time value for animation
      u_resolution: vec(width, height), // Screen resolution
      u_brightness: u_brightness.value, // Directly using the interpolated value
      u_flashness: u_flashness.value, // Directly using the interpolated value
    }
  }, [time.value, width, height, isOn.value]) // Track correct dependencies

  // Render the canvas with the noise shader applied
  return (
    <Canvas style={styles.canvas}>
      <Fill>
        <Shader source={shaderCode} uniforms={uniforms} />
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
