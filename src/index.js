'use strict'
let webglUtils = require('./webgl-utils')
//SHADERS
const vertexShaderSource = require('raw-loader!glslify-loader!./shader-vert.glsl')
const fragmentShaderSource = require('raw-loader!glslify-loader!./shader-frag.glsl')

const positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
]
const width = 1920
const height = 1080

function main() {
  // Get A WebGL context
  var canvas = document.getElementById('canvas')
  var gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }

  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = webglUtils.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  var fragmentShader = webglUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  // Link the two shaders into a program
  var program = webglUtils.createProgram(gl, vertexShader, fragmentShader)

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer()

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  // code above this line is initialization code.
  // code below this line is rendering code.

  webglUtils.resizeCanvasToDisplaySize(gl.canvas, width, height)

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program)

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation)

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2          // 2 components per iteration
  var type = gl.FLOAT   // the data is 32bit floats
  var normalize = false // don't normalize the data
  var stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

  // draw
  var primitiveType = gl.TRIANGLES
  var count = 3
  gl.drawArrays(primitiveType, offset, count)
}

main()
