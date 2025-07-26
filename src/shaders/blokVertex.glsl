uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vNormal = normal;
    vPosition = position;

    float displacement = 0.25 * sin(position.y * 6.0 + uTime * 1.5)
    + 0.15 * cos(position.x * 5.0 - uTime)
    + 0.15 * sin(position.z * 12.0 + uTime * 0.5);

    vec3 pos = position + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}