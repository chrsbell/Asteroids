import Shaders from './Shaders.js';

class Renderer {
  constructor(canvas) {
    if (canvas) {
      this.gl = canvas.getContext('webgl2');
      if (this.gl) {
        this.vertexShader = Shaders.createShader(
          this.gl,
          this.gl.VERTEX_SHADER,
          document.querySelector('#vertex-shader').innerHTML
        );
        this.fragmentShader = Shaders.createShader(
          this.gl,
          this.gl.FRAGMENT_SHADER,
          document.querySelector('#fragment-shader').innerHTML
        );
        this.program = Shaders.createProgram(this.gl, this.vertexShader, this.fragmentShader);
        this.gl.useProgram(this.program);
        this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);
        // bind position buffer and describe/send its data
        this.positionBuffer = this.gl.createBuffer();

        this.vaoObjOne = this.gl.createVertexArray();
        this.vaoObjTwo = this.gl.createVertexArray();

        const size = 2;
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;

        this.gl.bindVertexArray(this.vaoObjOne);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(
          this.positionAttributeLocation,
          size,
          type,
          normalize,
          stride,
          offset
        );

        var positions = [0, -0.5, 0, 0.5, 0.7, 0];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

        this.gl.bindVertexArray(this.vaoObjTwo);
        this.gl.vertexAttribPointer(
          this.positionAttributeLocation,
          size,
          type,
          normalize,
          stride,
          offset
        );
        const objTwoPos = [-1, 0.5, 0, 1.0, 0.7, 0.5];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(objTwoPos), this.gl.STATIC_DRAW);
      }
    }
  }
  draw(index) {
    if (this.gl) {
      // this.gl.bindVertexArray(this.vao);
      this.gl.clearColor(0.1, 0.1, 0.1, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      var primitiveType = this.gl.TRIANGLES;
      var offset = 0;
      var count = 3;
      if (index === 0) {
        this.gl.bindVertexArray(this.vaoObjOne);
        this.gl.drawArrays(primitiveType, offset, count);
        // this.gl.bindVertexArray(null);
      } else {
        this.gl.bindVertexArray(this.vaoObjTwo);
        this.gl.drawArrays(primitiveType, offset, count);
        // this.gl.bindVertexArray(null);
      }
    }
  }
}

export default Renderer;
