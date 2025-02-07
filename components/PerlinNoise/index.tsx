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
uniform float u_brightness;
uniform float u_flashness;

// Basic noise for subtle variation
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Single wave function
float createWave(vec2 p, float t, float offset, float speed, float scale) {
    float diagonal = (p.x + p.y) * scale;
    float curve = sin(diagonal * 0.5 + offset) * 0.3;
    
    float wave = sin(diagonal - t * speed + curve + offset) * 0.5;
    wave += sin(diagonal * 1.5 - t * (speed * 0.6) + curve * 2.0 + offset) * 0.2;
    wave += sin(diagonal * 0.7 + t * (speed * 0.4) + offset) * 0.15;
    
    vec2 curveDir = normalize(vec2(1.0 + curve, 1.0 - curve));
    float distFromCurve = dot(p - vec2(wave), vec2(-curveDir.y, curveDir.x));
    
    float thickness = 0.04 + 0.02 * sin(diagonal * 2.0 - t * 0.6 + offset);
    
    return smoothstep(thickness, 0.0, abs(distFromCurve));
}

// Multiple waves
float signalWave(vec2 p, float t) {
    float waves = 0.0;
    
    // Create 5 waves with different offsets and speeds
    waves += createWave(p, t, 0.0, 1.2, 1.4) * 0.5;
    waves += createWave(p, t, 2.0, 1.0, 1.2) * 0.4;
    waves += createWave(p, t, 4.0, 1.4, 1.6) * 0.3;
    waves += createWave(p, t, 6.0, 0.8, 1.0) * 0.4;
    waves += createWave(p, t, 8.0, 1.6, 1.8) * 0.3;
    
    return waves;
}

// Enhanced particle effect for multiple waves
float particles(vec2 p, float t) {
    float dots = 0.0;
    
    // Create particles for each wave
    for(float i = 0.0; i < 5.0; i++) {
        float offset = i * 2.0;
        float speed = 1.0 + i * 0.2;
        float scale = 1.2 + i * 0.2;
        
        float diagonal = (p.x + p.y) * scale;
        float curve = sin(diagonal * 0.5 + offset) * 0.3;
        vec2 pos = p;
        
        float wave = sin(diagonal - t * speed + curve + offset) * 0.5;
        vec2 curveDir = normalize(vec2(1.0 + curve, 1.0 - curve));
        pos += curveDir * wave * 0.6;
        
        float particleLayer = noise(pos * 8.0 + t * 0.7 + offset);
        float distFromWave = dot(p - vec2(wave), vec2(-curveDir.y, curveDir.x));
        particleLayer *= smoothstep(0.08, 0.0, abs(distFromWave));
        
        dots = max(dots, particleLayer * (1.0 - i * 0.15));
    }
    
    return dots;
}

// Layered noise for textured background
float texturedNoise(vec2 p, float t) {
    float noise1 = noise(p * 4.0 + t * 0.15);    // Increased frequency and speed
    float noise2 = noise(p * 8.0 - t * 0.2);     // Increased frequency
    float noise3 = noise(p * 16.0 + t * 0.25);   // Increased frequency
    float noise4 = noise(p * 32.0 - t * 0.1);    // Added higher frequency layer
    
    return noise1 * 0.4 + noise2 * 0.3 + noise3 * 0.2 + noise4 * 0.1;
}

// Cellular noise for grainy effect
float cellular(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float minDist = 1.0;
    
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            // Generate a random offset using our noise function
            float noiseVal = noise(i + neighbor);
            vec2 point = vec2(noiseVal, fract(noiseVal * 34.233));
            vec2 diff = neighbor + point - f;
            float dist = length(diff);
            minDist = min(minDist, dist);
        }
    }
    return minDist;
}

half4 main(vec2 fragCoord) {
    vec2 uv = fragCoord/u_resolution.xy;
    vec2 p = (uv * 2.0 - 1.0) * 2.0;
    p.x *= u_resolution.x/u_resolution.y;
    
    float t = u_time * 0.5;
    
    // Create textured background with more intensity
    float background = texturedNoise(p * 2.0, t);  // Increased overall scale
    background += cellular(p * 12.0 + t * 0.15) * 0.3;  // Increased cellular noise scale and intensity
    background = smoothstep(0.2, 0.8, background);  // Increased contrast
    
    float signal = signalWave(p, t);
    float parts = particles(p, t);
    
    float final = signal * 0.9 + parts * 0.3;
    
    float brightness = u_brightness + u_flashness * sin(t * 1.2);
    final *= brightness;
    
    // Mix background with signal
    vec3 bgColor = mix(
        vec3(0.06, 0.06, 0.08),   // Slightly darker background
        vec3(0.18, 0.18, 0.2),    // Slightly lighter background
        background * 0.8          // Increased background intensity
    );
    
    vec3 signalColor = mix(
        bgColor,
        vec3(0.7, 0.7, 0.75),    // Signal color
        final
    );
    
    // Add more pronounced color variation to background
    float colorVar = noise(p * 6.0 + t * 0.3);  // Increased frequency and speed
    bgColor += vec3(colorVar * 0.05);  // Increased color variation intensity
    
    // Combine background and signal
    vec3 color = signalColor;
    
    float pulse = 1.0 + 0.25 * sin(t * 2.0);
    color *= pulse;
    
    float glow = signal * (0.6 + 0.1 * sin(t * 1.5));
    color += vec3(glow * 0.4);
    
    // Enhanced vignette with more noise
    float vignette = 1.0 - length(uv - 0.5) * 0.5;
    vignette *= (1.0 + noise(p * 15.0) * 0.15); // Increased noise frequency and intensity
    color *= smoothstep(0.0, 0.6, vignette);
    
    return half4(color, 1.0);
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
