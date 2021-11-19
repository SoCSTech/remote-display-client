precision mediump float;

uniform vec2 resolution;
uniform float u_time;

float hash(float n) { return fract(sin(n) * 1e4); }
float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

void main() 
{
    vec2 res = vec2(1920, 1080);

    float v = hash(gl_FragCoord.xy / res.xy + u_time);

    gl_FragColor = vec4(v, v, v, 1);
}
