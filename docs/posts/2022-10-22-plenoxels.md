---
title: 「论文笔记」Plenoxels
subtitle: Alex Xu, et al. Plenoxels Radiance Fields without Neural Networks. CVPR 2022
author: Krahets
date: 2022-10-22
tags: 
  - PaperReading

layout: Post
useHeaderImage: false
headerImage: 2022-10-22-plenoxels.assets/upgit_20221022_1666368586.png
catalog: true
giscus: true
---


## Motivation

NeRF 面对一个典型小场景，在单个 GPU 上，训练要持续一天以上，渲染每帧需要 30 秒。PlenOctrees 的目标是提升渲染速度，而本文目标是提升训练速度。根据本文的实验结果，作者给出两点思考：

1. 体积重建可使用逆向问题的标准工具来实现，包括数据表示、正向模型、正则化函数和优化器。
2. NeRF 的核心元素是可微体积渲染，而不是神经网络。

## Method

**Plenoxels 模型。** 在 PlenOctrees 中，球谐函数系数 $k$ 是通过 MLP 推理得到的；而在 Plenoxels 中，作者舍弃了 MLP ，直接将空间建模为体素网格，每个网格顶点保存不透明度 $\sigma$ 和球谐函数系数 $k$ 。Plenoxels 本质上是 PlenOctrees 的一种推广，使之可以支持任意体素分辨率下的建模。

<img src="/2022-10-22-plenoxels.assets/upgit_20221022_1666368586.png" alt="Untitled" style="zoom:50%;" />

**三线性插值。** 给定空间任意位置，根据临近 8 个网格顶点，通过三线性插值计算得到此位置的参数。插值的好处有两个：对于渲染，插值可以增加有效分辨率；对于训练，插值产生一个连续近似，有利于优化过程。

**Coarse-To-Fine 训练策略。** 从一个粗网格开始训练优化，剪除不必要的体素，将剩余的体素一分为八，并继续优化。体素剪枝采用和 PlenOctrees 相同的方法，即剪除低于透射率阈值 $T_i$ 的体素。此剪枝策略会影响物体表面附近的三线性差值质量，为了解决此问题，作者采用了一个松弛条件，即只有当一个体素和它的邻居都没有被占用时才会被修剪。

**优化。** Loss 包含两项，RGB 颜色的 MSE loss 、 total variation(TV) 正则项。在 TV 正则项中，$\triangle_x^2(v,d)$ 表示体素 $v :=(i, j, k)$ 中的第 $d$ 个值与根据分辨率归一化后的体素 $(i + 1, j, k)$ 中的第 $d$ 个值之间的平方差，$\triangle_y^2(v,d)$ , $\triangle_z^2(v,d)$ 也类似 。

<img src="/2022-10-22-plenoxels.assets/upgit_20221022_1666368580.png" alt="Untitled" style="zoom:50%;" />

TV 正则项对相邻不一致的体素网格进行惩罚，有助于减少渲染伪影。

<img src="/2022-10-22-plenoxels.assets/upgit_20221022_1666368570.png" alt="Untitled" style="zoom:50%;" />

**无界场景。** 作者通过小幅改动，将 Plenoxels 拓展至包括前向场景、360º 场景的无界场景。

## Results

**训练提速约 100 倍。** 对于一个典型有界场景，Plenoxels 训练需要 11 分钟，而原生 NeRF 需要约 1 天；而对于一个无界场景，Plenoxels 训练需要 27 分钟，而原生 NeRF 需要约 4 天。

<img src="/2022-10-22-plenoxels.assets/upgit_20221022_1666368573.png" alt="Untitled" style="zoom:50%;" />