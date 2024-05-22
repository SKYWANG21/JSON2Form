<template>
  <div>
    {{ editable ? '编辑中' : '没编辑' }}
    <button @click="edit">拉框</button>
    <button @click="marking">标注</button>
  </div>
  <canvas id="canvas" width="512px" height="512px"></canvas>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted, ref } from 'vue';
import img from '../../assets/syberponk.jpg'

var canvas
function init() {
  canvas = new fabric.Canvas('canvas',)
  var imgElement = new Image();
  imgElement.src = img

  var imgInstance = new fabric.Image(imgElement, {
    left: 0,
    top: 0,
    opacity: 1
  });

  canvas.setBackgroundImage(img, () => {
    canvas.renderAll()
  }, {
    scaleX: canvas.width / imgInstance.width, // 计算出图片要拉伸的宽度
    scaleY: canvas.height / imgInstance.height, // 计算出图片要拉伸的高度
  })
}

const editable = ref(false)
function edit() {

  editable.value = !editable.value

  if (!editable.value) {
    canvas.off('mouse:down')
    canvas.off('mouse:move')
    canvas.off('mouse:up')
    return
  }

  // 创建一个矩形选区
  var selectionRect;

  var hasClicked = false

  // 鼠标按下事件
  canvas.on('mouse:down', function (e) {
    // 标志用户正在按住鼠标左键拖拉选区
    hasClicked = true;
    // 创建一个不可见的矩形选区
    selectionRect = new fabric.Rect({
      left: e.e.layerX,
      top: e.e.layerY,
      width: 0,
      height: 0,
      fill: 'rgba(255, 255, 255, 0)', // 透明填充
      stroke: 'red', // 边框颜色
      strokeWidth: 2 // 边框大小
    });
    canvas.add(selectionRect);
  });

  // 鼠标移动事件
  canvas.on('mouse:move', function (e) {
    if (hasClicked && e && e.e) {
      // 更新矩形选区的属性
      selectionRect.set({
        width: e.e.layerX - selectionRect.left,
        height: e.e.layerY - selectionRect.top
      });
      canvas.renderAll(); // 刷新画布
    }
  });

  // 鼠标释放事件
  canvas.on('mouse:up', function (e) {
    if (hasClicked) {
      // 遍历画布上的所有元素，检查是否与选区相交
      canvas.forEachObject(function (obj) {
        // console.log(obj)
        // if (obj?.intersects(selectionRect)) {
        //   // 将相交的元素添加到选中的元素列表中
        //   // 可以根据需要对选中的元素进行操作，例如改变颜色、大小等
        //   console.log('Selected object:', obj);
        // }
      });
      hasClicked = false; // 重置标志
      // canvas.remove(selectionRect); // 移除选区
    }
  });
}

function marking() {
  // 创建一个可编辑的文本框
  canvas.on('mouse:down', function (e) {
    var text = new fabric.IText('请输入', {
      left: e.e.layerX,
      top: e.e.layerY,
      fontSize: 18, // 字体大小
      fill: 'red', // 字体颜色
      editable: true // 允许编辑
    });

    // 将文本框添加到画布
    canvas.add(text);
    canvas.off('mouse:down')
  })
}

onMounted(() => {
  init()
})

</script>

<style scoped>
#canvas {
  width: 600px;
  height: 600px;
}
</style>