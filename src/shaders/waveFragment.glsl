precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uAmplitude;
uniform float uSpeed;
uniform float uOffset;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uIndex;
uniform float uOpacity;
uniform vec2 uMouse;

varying vec2 vUv;

float getWave(float x, float frequency, float amplitude, float speed, float offset) {
    return sin(x * frequency + uTime * speed + offset) * amplitude;
}

void main() {
    vec2 uv = vUv;

    // Основные волны
    float wave1 = getWave(uv.x * 10.0, 2.0, uAmplitude, uSpeed, uOffset);
    float wave2 = getWave(uv.x * 15.0, 3.5, uAmplitude * 0.6, uSpeed * 0.8, uOffset + 1.5);
    float wave3 = getWave(uv.x * 8.0, 1.5, uAmplitude * 0.4, uSpeed * 1.2, uOffset + 3.0);

    // Прогиб в зависимости только от X (горизонталь)
    float dx = uv.x - uMouse.x;
    float influence = exp(-pow(dx * 12.0, 2.0));
    float bend = -0.3 * influence;

    wave1 += bend;
    wave2 += bend * 0.8;
    wave3 += bend * 0.6;

    float wave = (wave1 + wave2 + wave3) / 3.0;
    float y = 0.5 + wave;
    float d = abs(uv.y - y);

    float glow = 0.03 / (d + 0.005);
    float rim = smoothstep(0.003, 0.0, d);
    rim = pow(rim, 2.0);
    float shadow = 1.0 - smoothstep(0.0, 0.25, d);

    vec3 baseColor = mix(uColorA, uColorB, uIndex);
    float brightness = mix(0.8, 1.0, uIndex);
    vec3 color = baseColor * brightness * (glow * 2.5 + shadow * 0.5 + rim * 1.7);

    float fadeY = smoothstep(0.0, 0.2, uv.y) * (1.0 - smoothstep(0.8, 1.0, uv.y));
    color *= fadeY;

    gl_FragColor = vec4(color, glow * uOpacity);
}