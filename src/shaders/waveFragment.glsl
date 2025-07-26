precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;

void main() {
    vec3 colorA = uColorA;
    vec3 colorB = uColorB;
    vec3 colorC = vec3(0.2, 0.3, 1.0);

    float wave = sin(vUv.x * 10.0 + uTime * 0.5) * 0.5 + 0.5;
    float curve = smoothstep(0.0, 1.0, vUv.y);
    vec3 mid = mix(colorB, colorC, sin(uTime + vUv.y * 10.0) * 0.5 + 0.5);
    vec3 gradient = mix(colorA, mid, curve * wave);

    gradient *= 1.2;

    gl_FragColor = vec4(gradient, uOpacity * curve);
}