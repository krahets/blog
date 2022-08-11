---
title: NeuralRecon-W 笔记
subtitle: NeuralRecon in the wild. SIGGRAPH 2022
author: Krahets
date: 2022-06-28
tags: 
  - PaperNotes

layout: Post
useHeaderImage: false
headerImage: /img/header/2022-06-19-neuralrecon_w.png
headerMask: rgba(40, 57, 101, .4)
catalog: true
giscus: true
---

![image-20220802000327184](https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659369807.png)

近年来，神经隐式表达在计算机视觉和图形学中很火，已应用于形状生成、视图渲染等。然而，目前基于神经隐式表达的重建方法仅适用于带约束的 3D 环境，例如相机大致均匀分布、光剑变化较小等。本文提出一种高精度三维重建方法，适用于具有不同光线条件的网络图片集。主要工作有：

- 提出一种体积引导 + 表面引导的混合采样技术，采样效率、模型重建质量得到大幅提升；
- 提出一个新的数据基准，以及针对于野外场景的评价指标；
- 实验表明本方法在精度、效率指标上超越了各类传统和基于学习的重建方法；

## 2  RELATED WORK

#### 多视图立体重建 (Multi-View Stereo (MVS))

经典 MVS 方法 (PMVS, PatchMatch) 、基于学习 MVS 方法 (MVSNet) 的重建 pipeline 包括深度估计、点云融合、Mesh 重建。此类方法对深度图的不一致性较为敏感，容易产生高噪声、不完整的重建结果。

端到端基于学习 MVS 方法 (Atlas，NeuralRecon) 直接预测 3D 表面。此类方法需要 ground-truth 监督训练，泛化性问题显著，例如无法从从室内数据泛化至室外数据。

本工作使用全局表示对整个场景进行建模，并通过神经渲染端到端地优化几何。

#### 大场景三维重建 (Reconstruction in the wild)

NeRF-W 使用神经辐射场建模，适合野外大场景图片渲染，但无法提取高质量几何表面。

本工作旨在直接提取高精度的 3D mesh 。

#### 神经隐式表达 (Neural Implicit Representations)

近年来，神经隐式表达在 3D 建模中展现出巨大潜力。由于内参一致性和表达连续性，建模中可以还原非常细节。神经隐式表达已经应用于模型生成与补全 (OccupancyNet, DeepSDF) 、新视图生成 (NeRF) 、相机姿态估计 (BARF) 、内参分解等任务。

神经隐式表达的主流优化方法是可微分渲染 (differentiable rendering) ，其大体分为两种类型，表面渲染 (surface rendering) 和体积渲染 (volume rendering) 。

- 表面渲染 (DVR, IDR) 重建的几何相对精确，但需要输入额外约束，例如 ground truth masks
- 体积渲染 (NeRF) 的视图渲染效果惊艳，但出于神经辐射场的 soft 体积属性定义，提取几何表面的精度较低。
- 近一年来，有数篇工作整合表面和体积渲染优势 (UNISURF, NeuS, VolSDF) ，实现在无需 mask 下的精确表面重建，但仍局限在实验室小场景下。

本工作拓展了 NeuS 的表达，可良好适应无约束网络图片集输入。

## 3  方法

受到 NeRF 启发，本方法基于神经辐射场建模 3D 场景。特别地，使用了 NeRF-W 中的 latent appearance modeling 来提升场景建模在无约束网络图片输入下的适应性。另外，为了高精度几何表面建模，我们拓展了 NeuS 的场景表达方法，使用两个神经隐式函数表示场景，函数使用 MLP 拟合。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659370060.png" alt="image-20220802000740289" style="zoom: 50%;" />

使用函数 $d$ 近似到真实表面的 SDF 场，表面 $s$ 通过本函数的 zero level set 提取。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659370072.png" alt="image-20220802000752899" style="zoom: 50%;" />

通过计算输入图片和渲染图片之间的颜色一致性，来 MLP 和 appearance embeddings 的参数。 给定一个射线 $r(t)$ ，可以根据以下公式渲染此射线在图片 $i$ 中的颜色 $\hat{C}(r)$ 。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659370086.png" alt="image-20220802000806026" style="zoom:50%;" />

### 3.1  高效采样训练

NeuS 为每个场景定义一个单位球体，来划分前景部分和后景部分。粗采样在射线与单位球体的两个交点形成的线段上开展，精细采样基于上一层的粗采样结果迭代生成。此策略在实验室数据集（例如 DTU ）上表现很好，因为其相机均匀地分布在半球面上。然而此策略无法适用在野外数据集上，因为相机分布往往是不均匀的、单向的。 例如，如果我们使用相同的采样数来训练 NeuS ，预计需要使用 32 个 GPU 训练 ~10 日。本文介绍一种体素 & 表面混合的采样策略，以提升训练效率。各类采样策略如下图所示。

![image-20220802001410628](https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659370450.png)

> Figure 2: 球面采样、体积引导采样、表面引导采样. NeuS 采用的球面采样 (a) 在整个场景中均匀生成样本，大多数在空区域的样本是不需要的。体积采样 (b) 仅在 SfM 输出的点云周围形成的体素中采样，从而避免不必要的样本。为了进一步提升在表面周围的采样密度，我们提出了一种表面引导采样 (c) ，在先前训练的稀疏体素中保存 SDF 值，并且在以表面为中心的附近较小区间内生成样本。

**体素引导采样。** SfM 不仅提供相机内外参，还通过输出稀疏点云来提供粗略的初始表面估计。因此，在训练开始前我们借助 SfM 输出的稀疏点云来生成粗略体素 $V_{sfm}$ 。通过 3D 扩张操作，来确保绝大部分的可视区域被包含在粗略体素中。将射线与 $V_{sfm}$ 两个交点形成的线段作为采样区间，并采样 $n_v$ 个点。此外，我们发现构造的粗略体素可将场景大致划分为前景和后景区域，通过移除与 $V_{sfm}$ 无交点的射线（例如天空背景射线），需要训练的射线往往可以减少超过 30% 。

**表面引导采样。** 为了训练几何 MLP $d$ ，使其精确地拟合 3D 表面，最好在表面周围尽可能多地生成样本。通过将当前模型的 SDF 预测值缓存至稀疏体素 $V_{cache}$ ，并从 $V_{cache}$ 查询表面位置，进而利用估计的表面位置来生成新样本。在 $V_{sfm}$ 上建立深度为 $l$ 的八叉树得到 $V_{cache}$ 。给定查询表面位置 $\hat{x}$ ，在表面周围窄区间 $(\hat{x} - t_s, \hat{x} + t_s)$ 内生成 $n_s$ 个样本。 $V_{cache}$ 在训练中周期性更新，来保证 SDF 值最新。表面引导采样指导网络来解释在表面周围的样本的渲染颜色，从而使网络更准确地拟合几何表面。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659369891.png" alt="image-20220802000451719" style="zoom:50%;" />

> 左边四张图展示了右图红色区域内射线采样的样本。NeuS 分层采样（左上）使用了冗余样本（共 1024 个）；表面引导采样仅使用 24 个样本。在精细采样的最后一轮迭代，表面引导采样的样本相比 NeuS 更加密集、接近表面，指导网络更加精确地拟合几何表面。

左边四张图展示了右图红色区域内射线采样的样本。NeuS 分层采样（左上）使用了冗余样本（共 1024 个）；表面引导采样仅使用 24 个样本。在精细采样的最后一轮迭代，表面引导采样的样本相比 NeuS 更加密集、接近表面，指导网络更加精确地拟合几何表面。

**混合采样。** 由于对空间监督不足，仅使用表面引导采样将导致体素边界周围出现伪影。相比表面引导采样，体素引导采样的样本要稀疏的多，这是因为体素引导的采样范围更大。在曲面引导采样之后进行另一次重要采样迭代，以确保良好的采样密度，使每条射线的采样总数达到 $n_v + 2 n_s$ 。

### 3.2   其他细节

**处理动态物体。** 如果直接使用 NeRF-W 的 transient NeRF head ，那么 transient NeRF 将会主导颜色，导致所有场景结构将会被建模为视角相关的瞬态效果而不是几何 MLP $d$ ，因为函数 $d$ 收敛比 NeRF 更慢。我们使用分割 masks 来在训练中移除属于动态物体的射线。

**监督信号和处理无纹理天空。** 跟随 NeuS ，我们使用 $L_1$ loss 来监督渲染颜色图片 ( $L_{COLOR}$ ) 并使用 eikonal term $L_{REG}$ 来正则化 SDF 。由于弱纹理天空缺少运动时差，若直接类似 NeuS 使用一个背景 NeRF 来分离前后景，将会导致天空重建在球体内。 剩余在 $V_{sfm}$ 中的背景射线（绝大部分是天空）被标记在语义 mask 中，并被 $L_{MASK}$ 当作自由空间来惩罚。由于背景语义 mask 往往不是完美的，通常包含一些前景结构，因此我们仅给 $L_{MASK}$ 设定较小的权重。我们经验性发现这一可以在移除天空的同时保留前景几何结构。

## 4  HERITAGE-RECON 数据集

当前没有现成可用的带有真值 3D 点云的网络图片数据集。因此，我们提出新数据集 Heritage-Recon 。本文介绍了数据采集、坐标系对齐、可视性检查等数据集处理方法与步骤。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659369916.png" alt="image-20220802000516197" style="zoom:50%;" />

## 5  实验

### 5.2  基准方法

- 传统 MVS 方法：COLMAP (patch-match) ；
- 基于学习 MVS 方法：Vis-MVSNet ；
- 体积渲染方法：NeRF-W ；

**Mesh 重建方法：**

- MVS 方法：使用 octree depth = 13 参数 Poisson 重建 Mesh 。
- NeRF-W：预先定义相机轨迹，将生成的 RGB-D 序列数据输入 Open3D 实现的 KinectFusion 来获取 Mesh 。

### 5.3  评估

**重建质量。** 本方法在几乎所有场景和阈值下都达到最优或次优的结果。

- 虽然 COLMAP 在 PE, PBA 场景的指标更好，但本方法生成模型的视觉观感明显更好。
- 重建模型更加完整，甚至可以在缺少充足观测的区域生成填充几何，而其他基准方法无法实现。

![image-20220802000601009](https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659369961.png)

**重建效率。** 如下图所示，本方法建模速度明显更快。COLMAP 在 CPU 上点云合成占用了大部分时间，这也体现了本方法端到端的优势。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659369980.png" alt="image-20220802000620503" style="zoom:50%;" />

**采样方法。** 对比了混合采样、球面采样、体积引导采样。结果显示，为了达到 ~3.2 AUC ，体积引导采样需要时长为混合采样的 2~3 倍，而球面采样无法在合理时间内达到这一精度。

<img src="https://raw.githubusercontent.com/krahets/krahets-giscus/main/2022/08/upgit_20220802_1659369998.png" alt="image-20220802000638036" style="zoom:50%;" />

## 6 局限与总结

**局限。** 本方法继承了 NeRF 方法的局限性。例如，对相机内外参精度要求高。由于本方法仅从已知图像中学习表面位置，因此无法生成未观测区域的精确几何。

**总结。** 我们提出一种用于网络图片集下的高质量 3D 重建的新型神经网络方法。介绍了一种体素-表面混个引导采样技术，其大幅提升了训练效率。