---
title: 「论文笔记」PlenOctrees
subtitle: Alex Xu, et al. PlenOctrees for Real-time Rendering of Neural Radiance Fields. ICCV 2021
author: Krahets
date: 2022-10-22
tags: 
  - PaperNotes

layout: Post
useHeaderImage: false
headerImage: https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/10/upgit_20221022_1666368528.png
catalog: true
giscus: true
---

## Motivation

NeRF 渲染效率低下，使用主流高端 GPU 渲染一张 800x800 的图片需要 30s ，无法达到实时渲染效果。

## Method

### **基于球谐函数的 NeRF 模型**

原生 NeRF 直接将位置和方向 $(x, y, z, \theta, \phi )$ 映射到体积密度和颜色 $(\sigma, c)$ 。球谐函数常被用于建模朗伯体表面、甚至光泽表面。作者将球谐函数引入 NeRF 建模。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/10/upgit_20221022_1666368528.png" alt="Untitled" style="zoom:33%;" />

与原始 NeRF 不同，NeRF-SH 先将位置 $x$ 输入到 MLP 中获得体积密度 $\sigma$ 和球谐函数系数 $k$ 。每个 $k_l^m \in \R^3$ 都包含 RGB 的 3 个系数。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/10/upgit_20221022_1666368531.png" alt="Untitled" style="zoom: 33%;" />

输入方向 $d$ 和参数 $k_l^m$ ，通过球谐函数 $Y_l^m$ ，计算得到颜色 $c$ 。$S$ 是 sigmoid 函数，用于将颜色归一化。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/10/upgit_20221022_1666368539.png" alt="Untitled" style="zoom: 33%;" />

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/10/upgit_20221022_1666368537.png" alt="Untitled" style="zoom: 50%;" />

如果仅用 RGB loss 训练，那么模型在未被观测空间生成的几何将缺少约束。为了解决此问题，作者在 loss 中加入了一个正则项，鼓励 NeRF 在某个空间可能是 empty 或 solid 时选择呈现 empty ，

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/10/upgit_20221022_1666368559.png" alt="Untitled" style="zoom: 50%;" />

整体 Loss 函数变为 $L_{RGB} + \beta_{sparsity} L_{sparsity}$ ，其中 $\beta_{sparsity}$ 是超参数。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/10/upgit_20221022_1666368562.png" alt="Untitled" style="zoom:50%;" />

### **基于八叉树的实时渲染**

**八叉树渲染。** 对于每条射线，先计算与体素的所有交点，输出根据体素边界划分的射线片段序列，随后采用 NeRF 的分段恒定渲染公式即可。八叉树模型使采样变得自适应，射线可以一步穿越大体素，也保证了在小体素内的高频采样。

**从 NeRF-SH 模型生成八叉树。** 给定一个训练好的 NeRF 模型，作者的想法是将其转化成一个体素化的八叉树模型，这样可以使采样聚焦在有物体的区域。整个八叉树提取过程使用约 15 分钟。

1. **评估。** 使用 3D 网格均匀采样点，获得每个区域的体积密度 $\sigma$ 。
2. **过滤。** 使用所有训练图像的视角渲染 alpha map ，记录射线上每个体素的权重 $1 - \exp(- \sigma_i \delta)$ （含义是射线第 $i$ 片段的不透明度），并删除权重低于阈值 $\tau_w$ 的体素。由此完成八叉树的建立，未被删除的体素作为八叉树的叶子结点，其余位置为空。
3. **采样。** 在每个剩余体素中随机采样 256 个点，以采样点平均值作为叶子结点的值。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/10/upgit_20221022_1666368598.png" alt="Untitled" style="zoom:40%;" />

**模型微调。** 由于整个模型是可微的，我们可以直接在建立好的八叉树模型上进行微调，以提升渲染图像质量。

## Results

- **细节增强。** 将 NeRF 转化为 PlenOctrees 后，文字之类的细节的渲染效果得到进一步优化。
- **图像质量领先。** 对比 NeRF, NVSF, Neural Volumes, AutoInt，PlenOctrees 的图片 PSNR 总体处于领先。
- **渲染速度提升 4-5个 数量级。** PlenOctrees 渲染速度比原生 NeRF 快 3000 倍，比其他对比方法快 30 倍。
