/* eslint-disable react/no-unknown-property */
import { animated } from '@react-spring/three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function lerpRGB(color1, color2, t) {
  let color = [0, 0, 0];
  color[0] = color1[0] + (color2[0] - color1[0]) * t;
  color[1] = color1[1] + (color2[1] - color1[1]) * t;
  color[2] = color1[2] + (color2[2] - color1[2]) * t;
  return color;
}

function circle(et, radius, acceleration) {
  var angle = (et * acceleration) % 360;
  var x = radius * Math.sin((Math.PI * 2 * angle) / 360);
  var y = radius * Math.cos((Math.PI * 2 * angle) / 360);
  return [x, y];
}

const sNoise = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0; //2.8
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}
`;

const fragmentShader = `
    vec3 rgb(float r, float g, float b) {
        return vec3(r / 255., g / 255., b / 255.);
    }

    vec3 rgb(float c) {
        return vec3(c / 255., c / 255., c / 255.);
    }

    uniform vec3 u_c1;
    uniform vec3 u_c2;
    uniform vec3 u_c3;
    uniform float u_time;

    varying vec2 vUv;
    varying float vDistortion;

    void main() {
        vec3 c1 = rgb(u_c1.r, u_c1.g, u_c1.b);
        vec3 c2 = rgb(u_c2.r, u_c2.g, u_c2.b);
        vec3 c3 = rgb(u_c3.r, u_c3.g, u_c3.b);

        float noise1 = snoise(vUv + u_time * 0.15); // controls speed of texture color change
        float noise2 = snoise(vUv * 2. + u_time * 0.04);

        vec3 color = c1;
        color = mix(c2, color, noise1 * 0.6);
        color = mix(color, c3, noise2 * 0.4);

        color = mix(color, mix(c2, c1, vUv.x), vDistortion);

        float border = smoothstep(0.1, 0.9, vUv.x);

        color = mix(color, c3, 1. -border);

        gl_FragColor = vec4(color, 1.0);
    }
  `;

const vertexShader = `
    uniform float u_time;
    uniform vec2 u_randomisePosition;
    varying float vDistortion;
    varying float xDistortion;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        vDistortion = snoise(vUv.xx * 4. + u_randomisePosition * 0.5);
        xDistortion = snoise(vUv.yy * 3. - u_randomisePosition * 0.2);
        vec3 pos = position;
        pos.z += (vDistortion * 20.);
        pos.x += (xDistortion * 20.);
        // pos.y += (xDistortion * 10.);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

class Gradient extends THREE.ShaderMaterial {
  constructor() {
    super({
      fragmentShader: sNoise + fragmentShader,
      uniforms: {
        u_c1: { type: 'v3', value: undefined },
        u_c2: { type: 'v3', value: undefined },
        u_c3: { type: 'v3', value: undefined },
        u_randomisePosition: { type: 'v2', value: [undefined, undefined] },
        u_time: { type: 'f', value: 0 },
      },
      vertexShader: sNoise + vertexShader,
    });
  }

  get u_c1() {
    return this.uniforms.u_c1.value;
  }
  set u_c1(v) {
    this.uniforms.u_c1.value = v;
  }

  get u_c2() {
    return this.uniforms.u_c2.value;
  }
  set u_c2(v) {
    this.uniforms.u_c2.value = v;
  }

  get u_c3() {
    return this.uniforms.u_c3.value;
  }
  set u_c3(v) {
    this.uniforms.u_c3.value = v;
  }

  get u_randomisePosition() {
    return this.uniforms.u_randomisePosition.value;
  }
  set u_randomisePosition(v) {
    this.uniforms.u_randomisePosition.value = v;
  }

  get u_time() {
    return this.uniforms.u_time.value;
  }
  set u_time(v) {
    this.uniforms.u_time.value = v;
  }
}

// register element in r3f (<gradient />)
extend({ Gradient });

function Mesh(props) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (typeof ref.current !== 'undefined') {
      var et = clock.getElapsedTime() + 40;
      var pos = circle(et, 2, 2);

      // Animate the gradient position
      ref.current.material.u_time = pos[0]; // This seems to be clamped to 2 dec places

      // Animate the mesh shape
      ref.current.material.u_randomisePosition = [pos[0], pos[1]];

      // console.log(clock.getElapsedTime() )

      // Animate colors
      ref.current.material.u_c1 = lerpRGB(
        ref.current.material.u_c1,
        props.u_c1,
        props.transitionSpeed
      );
      ref.current.material.u_c2 = lerpRGB(
        ref.current.material.u_c2,
        props.u_c2,
        props.transitionSpeed
      );
      ref.current.material.u_c3 = lerpRGB(
        ref.current.material.u_c3,
        props.u_c3,
        props.transitionSpeed
      );
    }
  });

  return (
    <animated.mesh
      position={[0, 100, -280]}
      ref={ref}
      rotation={[0, 0, 80]}
      scale={5}
    >
      <planeGeometry args={[400, 400, 400, 400]} attach="geometry" />
      <gradient
        attach="material"
        u_c1={[29, 100, 192]}
        u_c2={[47, 9, 148]}
        u_c3={[14, 116, 253]}
        u_randomisePosition={[1, 2]}
        u_time={1}
      />
    </animated.mesh>
  );
}

export function MeshGradient({ backgroundColor, u_c1, u_c2, u_c3 }) {
  const [devicePixelRatio, setDevicePixelRatio] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-undef
      setDevicePixelRatio(window.devicePixelRatio);
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor,
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          height: '100%',
          opacity: devicePixelRatio ? 1 : 0,
          transition: 'opacity 5s ease',
          width: '100%',
        }}
      >
        {devicePixelRatio ? (
          <Canvas
            camera={{ fov: 90, near: 0.1, position: [0, 0, 0] }}
            dpr={devicePixelRatio}
          >
            <Mesh transitionSpeed={0.025} u_c1={u_c1} u_c2={u_c2} u_c3={u_c3} />
          </Canvas>
        ) : null}
      </div>
    </div>
  );
}
