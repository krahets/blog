---
title: 「论文笔记」SLAM-oriented ICP Algorithm
subtitle: Hao Bai, et al. ICP Algorithm - Theory, Practice And Its SLAM-oriented Taxonomy. arXiv 2022
author: Krahets
date: 2022-09-03
tags: 
  - PaperReading

layout: Post
useHeaderImage: false
headerImage: 2022-09-03-slam_oriented_icp.assets/upgit_20220904_1662298381-0436519.png
catalog: true
giscus: true
---

::: link [ICP Algorithm: Theory, Practice And Its SLAM-oriented Taxonomy](https://arxiv.org/pdf/2206.06435.pdf)
:::

## 1  Introduction

ICP 通常用来配准两个平面（通常用 Mesh 网格表示）。

现有多种 ICP 算法，例如从 point2point/point2line,/point2surface，或多尺度多分辨率加速 ICP ，或引入额外数据（例如色调）。

**贡献：** 作者提出一种新的面向 SLAM 的 ICP 分类方法。

## 2  Related Works

根据特征点对应关系是否已知，可将 ICP 问题分为两类。对于已知对应关系的数据，无需启发式算法，可以直接使用 SVD 方法求解。设源点云 $S = \{ s_1, s_2, …, s_I \}$ ，目标点云 $D = \{ d_1, d_2, …, d_J \}$ ，已知对应关系 $C(s_i) = \{ (i, j) \}$ ，需求解相对平移向量 $t$ 和旋转矩阵 $R$ 。使得所有对应点距离之和最小，将此操作记为 $F$ ，
$$
F(C(S), S, D) = \argmin_{R,t} \sum_{i, j \in C} || d_i - R \cdot s_j - t ||_2^2
$$
对于未知对应关系的数据，我们需要“猜测”其对应性。此问题无直接解法，需要使用启发式方法求解，例如数值牛顿法、遗传算法、以及常见针对 SLAM 系统研发的 ICP 算法变种（本文主要研究对象）。

## 3  基本 ICP 算法和以往分类方法

### 3.1 基本 ICP 算法

ICP 算法基本思想：若源点云和目标点云之间的对应关系已知，则容易解出两者的相对位姿。问题是点之间对应关系是不确定的，因此我们需要在 while 循环中迭代执行猜测。

基本 ICP 算法分为三步：一，生成一个初始猜测；二，多次迭代，在每轮迭代中移动源点云，使之更加靠近目标点云；三，当达到收敛阈值时，返回相对位姿，包括平移向量和旋转矩阵。

具体上看，给定源点云 $S = \{ s_1, s_2, …, s_I \}$ 、目标点云 $D = \{ d_1, d_2, …, d_J \}$ ，设收敛阈值 $\theta_0$ 、质心算子 $M$ 、已知对应关系下的位子求解算子 $F$ 、配准误差 $\epsilon$ 、对应关系 $C(s_i) = \{ (i, j) \}$ ，位姿变换算子 $T_{R,t}$ 。基本 ICP 算法流程如下图所示。

<img src="/2022-09-03-slam_oriented_icp.assets/upgit_20220904_1662298381-0436519.png" alt="image-20220904213301106" style="zoom: 50%;" />

### 3.2 以往分类方法

Marc Levoy 等人提出一种 ICP 的经典分类法 *Efficient Variants of the ICP Algorithm* ，分为算法六个阶段：点选择阶段、对应点匹配阶段、对应点置信度判断阶段、异常点排除阶段、误差分配阶段、误差最小化阶段。而本文作者参考 SLAM 应用派生出 ICP 算法分类，主要专注于应用在 SLAM 中的 ICP 算法。

## 5  面向 SLAM 的 ICP 分类法

现有多种 SLAM 变种，例如 ORB-SLAM, Mono-SLAM, LSD-SLAM 。各 SLAM 系统在精度、能耗、效率、数据处理模式方便有着不同的侧重。

### 5.1  在线 / 离线 SLAM

在线 SLAM 重视实时性，因此需要使用高效率 ICP 算法：

- Sharf et al, 2006, Soft-ICP.
- Holz et al, 2010, 无预处理 ICP. 可判断新采集照片中哪些点已经包含在模型中，从而仅添加提供新信息的点。

离线 SLAM 更注重精度，对效率需求不高。

- Moosmann et al, 2011, Velodyne SLAM model. 使用滤波步骤来精化 map 和 ICP 。此方法提出 de-skewing 应该在每轮 ICP 中执行，根据实验结果，de-skewing 仅两次已经足够。
- Dai et al,  coarse-to-fine SLAM model. 如下图所示，在 local optimization 部分，原始点云被分割为多个片段，将其中一个片段作为参考，使用 point-to-plane ICP 将其他片段按序注册到此片段。在 pose graph construction 部分，具有高相似度的点云片段集也会通过 ICP 来配准到一起。

<img src="/2022-09-03-slam_oriented_icp.assets/upgit_20220904_1662298403.png" alt="image-20220904213323029" style="zoom:50%;" />

### 5.2  有 / 无 路标 SLAM

<img src="/2022-09-03-slam_oriented_icp.assets/upgit_20220904_1662298424.png" alt="image-20220904213343998" style="zoom:50%;" />

基于路标的 SLAM 利用在图片中检测到的路标信息，例如树木、建筑、障碍物、或人工路标，路标提供了高置信度的信息。

- Holder et al, 2019, A real-time pose-graph-based SLAM system. 此工作使用 point-to-point ICP 匹配 Radar 采集的数据和路标，因为路标整体是由 3D 点构成的 — 如下图所示，在 sub-maps 上只有很少的点和面特征。

<img src="/2022-09-03-slam_oriented_icp.assets/upgit_20220905_1662313240.png" alt="image-20220904213415103" style="zoom:50%;" />

- Masahiro Tomono, 2009. 此方法将双目相机采集图像中的边缘点看作人造路标，将 3D 点投影到 2D 图像上，使得投影 2D 点和图像检测边缘点误差最小化。此工作还使用 ICP 来调整关键帧的图像位姿。

非基于路标的 SLAM 系统由于缺少高置信度特征，精度相对较低，研究主要方向是改善精度。

- Cho et al, 2018, Geo-ICP. 包含两个子方法，几何匹配方法和 ICP 方法，作为缺少路标的补偿。在此方法中，ICP 的角色不是 registration ，而是减少误差的工具；先使用几何匹配计算得到位置，再使用 point2line ICP 进行位置优化。此研究表明 ICP 本质上是一种统计方法，因此引入几何方法可能可以提升性能。

## 6  总结

本文回顾了 ICP 算法和之前的分类法，讨论如何在 SLAM 任务中使用 ICP 方法，介绍了一种面向 SLAM 任务的 ICP 分类方法。

- 在线 / 离线 SLAM 。ICP 算法可以分类为高精度+低效率、低精度+高效率。
- 有 / 无路标 SLAM 。ICP 算法可以根据路标数据类型，分类为 point2point, point2line/point2surface 等。
