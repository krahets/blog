---
title: 「论文笔记」ManhattanSDF
subtitle: Haoyu Guo, et al. Neural 3D Scene Reconstruction with the Manhattan-world Assumption. CVPR 2022 (Oral)
author: Krahets
date: 2022-06-28
tags: 
  - PaperReading

layout: Post
useHeaderImage: false
headerImage: 2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274191.png
catalog: true
giscus: true
---

::: link [Neural 3D Scene Reconstruction with the Manhattan-world Assumption](http://zju3dv.github.io/manhattan_sdf/)
:::

## Motivation

- 之前的许多方法对于弱纹理区域的重建仍有难度。
- 在 MVS 方法中，向深度估计引入平面约束，效率和视图一致性较差。

### Contribution

- 将曼哈顿世界约束（即假设重建表面服从三个互相垂直的正交方向）引入到神经隐式表达的优化中。
- 提出一种新 loss ，在优化场景几何的同时优化语义标签。

<!-- <img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274122.png" alt="image-20220731212842789" style="zoom:25%;" /> -->

## Method

![image-20220731212951540](/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274191.png)

### Model

使用 MLP 构建 3 个隐式场，

- SDF 值 $(d(x), z(x)) = F_d(x)$
- 颜色 $c(x) = F_c(x, v, n(x), z(x))$
- 语义标签 $s(x) = F_s(x)$

使用体积渲染（NeRF）来得到 RGB 图和语义分割图，

- 将 SDF 映射到概率密度 $d(x) \rightarrow \sigma(x)$ ；

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274432.png" alt="image-20220731213352859" style="zoom: 25%;" />

- RGB 渲染：沿着射线积分，聚合概率密度和颜色 $\hat{C}(r)$ ；

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274456.png" alt="image-20220731213416014" style="zoom: 25%;" />

- 语义分割渲染：聚合概率密度和语义标签 $\hat{S}(r)$ （NeRF 体积渲染）； 并通过 softmax 计算分类概率 $\hat{p_f} , \hat{p_w} , \hat{p_b}$ 分别为地板、墙体、其他区域；

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274513.png" alt="image-20220731213512993" style="zoom: 25%;" />

### Loss

**颜色 loss** $L_{img}$：渲染像素颜色和真实像素颜色之间的差值；

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274612.png" alt="image-20220731213652374" style="zoom:25%;" />

**Eikonal loss ：**

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274624.png" alt="image-20220731213704627" style="zoom:25%;" />

**深度 loss** $L_d$ ：COLMAP SfM 深度和渲染深度之间的差值；

**几何 loss（曼哈顿世界假设）$L_f$ ,** $L_w$ ：任意空间点都有三种语义标签，即地面 $F$ 、墙体 $W$ 、其他，

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274650.png" alt="image-20220731213729967" style="zoom:25%;" />

- 地面垂直于 z 轴 n_f = (0, 0, 1) ；

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274667.png" alt="image-20220731213747390" style="zoom:25%;" />

- 墙体平行或垂直于可学习法向量 n_w ；将 n_w 的 z 坐标固定为 0 ，代表与地面垂直。

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274677.png" alt="image-20220731213757072" style="zoom:25%;" />

**联合优化 loss ：** 以地面为例，如果 $\hat{p_f}(r)$ 正确，那么很容易优化 $L_f(r)$ ；否则，梯度将会推动 $\hat{p_f}(r)$ 减小，随之优化语义标签。

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274698.png" alt="image-20220731213818347" style="zoom:25%;" />

**语义分割 loss（交叉熵损失)：** 对于联合优化 loss ，有一种无效解是 $\hat{p_f}$ ，$\hat{p_w}$ 同时消失。为了避免此情况，添加 loss 计算渲染语义标签和输入语义标签（使用 DeepLabV3+ 得到）的差值。

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274713.png" alt="image-20220731213833024" style="zoom:25%;" />

## Experiments

**Datasets:** ScanNet, 7-Scenes

**Metrics:** 标准重建指标，包括 accuracy, completeness, precision, recall and F-score ；

**Baselines:**

- 传统 MVS 方法：Colmap，泊松重建（sPSR）；
- 引入平面拟合的 MVS 方法：Colmap*(PlaneRCNN)；
- 平面正则化 MVS 方法：ACMP ；
- SOTA 基于体积渲染的重建方法：NeRF/UNISURF/NeuS/VolSDF，Marching Cubes 提取 Mesh；渲染深度图再使用 TSDF 融合（KinectFusion）。

### Ablation Study

VolSDF-D 添加了深度 loss ，VolSDF-D-G 添加了本文提出的几何 loss ，VolSDF-D-S 添加了语义学习。

- VolSDF v.s. VolSDF-D ：加入深度 loss 后，重建质量得到一定提升，但总体仍较差；
- VolSDF-D v.s. VolSDF-D-G ：加入几何 loss 后，重建模型更加完整、平滑，但丢失了一些非平面区域的细节；
- VolSDF-D v.s. VolSDF-D-S ：加入语义学习后，重建精度和完整性都得到了提升；
- VolSDF-D-G v.s. Ours ：本方法在平面区域和非平面区域的重建质量都更优；

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274280.png" alt="image-20220731213119946" style="zoom:25%;" />

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659274297.png" alt="image-20220731213137300" style="zoom: 33%;" />

### Comparisons with SOTA methods

**室内 3D 重建对比：** 综合考虑精度和完整性，ManhattanSDF 的重建指标和视觉效果最优。

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659275664.png" alt="image-20220731215424037" style="zoom: 50%;" />

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659275747.png" alt="image-20220731215547709" style="zoom: 50%;" />

**语义分割对比：** 优化后的 semantic labels 指标更好。

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659275774.png" alt="image-20220731215614112" style="zoom: 50%;" />

**视图合成对比：** 相比于 NeRF 和 VolSDF ，本方法生成图片更加还原真实。

<img src="/2022-06-28-manhattan_sdf.assets/upgit_20220731_1659275786.png" alt="image-20220731215626235" style="zoom: 50%;" />

## Conclusion

**Limitations.** 本工作仅考虑了曼哈顿世界假设，而大部分场景不符合此假设，有些场景需要更通用的假设，例如亚特拉大世界假设。可以通过修改 loss 中的几何约束，将本框架拓展到其他假设。
