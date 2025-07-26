precision highp float;

uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 uMouse;


void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;

    float distortion = sin(pos.x * 2.0 + uTime * 0.5) * 0.15;
    distortion += sin(pos.y * 1.5 + uTime * 0.4) * 0.1;
    distortion += sin((pos.x + pos.y) * 1.2 + uTime * 0.3) * 0.1;
    pos.z += distortion;

    pos.y += sin(pos.x * 1.5 + uTime * 0.2) * 0.1;
    pos.y += cos(pos.y * 1.2 + uTime * 0.1) * 0.05;
    pos.y += sin((pos.x - pos.y) * 1.0 + uTime * 0.4) * 0.05;

    pos.x += (uMouse.x - 0.5) * 1.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}