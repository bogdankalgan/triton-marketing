varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(0.4, 0.8, 1.0));
    vec3 viewDir = normalize(-vPosition);

    float diff = max(dot(normal, lightDir), 0.0);

    vec3 fresnel = pow(1.0 - dot(normal, viewDir), 2.0) * vec3(0.4, 0.3, 0.7);

    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = vec3(1.8, 1.2, 2.5) * pow(max(dot(viewDir, reflect(-lightDir, normal)), 0.0), 256.0);

    vec3 base = vec3(
    0.7 + 0.3 * sin(vPosition.x * 4.0 + uTime * 0.6),
    0.4 + 0.3 * sin(vPosition.y * 6.0 + uTime * 0.8),
    0.6 + 0.2 * sin(vPosition.z * 5.0 - uTime * 1.0)
    );

    vec3 centerGlow = vec3(0.8, 0.3, 1.0) * smoothstep(0.0, 0.3, 1.0 - length(vPosition.xy));
    vec3 color = base * diff + fresnel * 0.4 + specular * 0.4 + centerGlow * 0.6;

    color = clamp(color, 0.0, 1.0);
    gl_FragColor = vec4(color, 0.9);
}