<p align="center">
  <a href="https://kylehue.github.io/rigme/">
    <img style="text-align:center" alt="Logo" src="src/client/assets/svg/rigme-text.svg" height="140">
  </a>
</p>

<p align="center">
  An easy to use and very simple animator web application. (This app is only a school project so don't expect too much from it)
</p>

<p align="center">
  <img alt="Sample gif" src="sample.gif" width="640">
</p>

#

### Features
- Video Overlays
- Auto-Rotoscope using AI
- Rig Skinning
- Forward kinematics

### Supported export formats
- Spritesheet
- Frames
- GIF

### Libraries used
- [Vue.js](https://vuejs.org/)
- [Canvas-to-Blob](https://github.com/blueimp/JavaScript-Canvas-to-Blob)
- [gif.js](https://github.com/jnordberg/gif.js)
- [StreamSaver](https://github.com/jimmywarting/StreamSaver.js?utm_source=recordnotfound.com)
- [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)
- [Tensorflow](https://github.com/tensorflow/tfjs)

### Tips
- Hold <kbd>Shift</kbd> while adding a joint to mirror it horizontally
- Hold <kbd>Space</kbd> to pan camera
- Drag the blue vertical lines on the timeline to change loop region
- Drag the timeline's scrollbar from its left or right side to resize
- Focus to a joint's position by double-clicking joints on Joint Pane
- Scroll on timeline to toggle zoom

>The app autosaves your work in the browser everytime you make a move. However, it doesn't autosave the video overlay and images

### Browser Support
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Opera

### License
MIT License

Copyright (c) 2021 Kyle A.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
