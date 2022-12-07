---
title: 「论文笔记」Volume Rendering Digest (for NeRF)
subtitle: Andrea Tagliasacchi, et al. Volume Rendering Digest (for NeRF). arXiv 2022
author: Krahets
date: 2022-10-05
tags: 
  - PaperReading

layout: Post
useHeaderImage: false
headerImage: /img/header/paper_notes.jpg
catalog: true
giscus: true
---

::: link [Volume Rendering Digest (for NeRF)](https://arxiv.org/pdf/2209.02417.pdf)
:::

神经辐射场假设场景是由具有变化体积密度的发光粒子云组成（在 physically-based rendering 中，被描述为具有吸收和发射但没有散射的体积）。为了表述简洁性，不失一般性地，本文假设发射光线不随视角方向变化。

设密度场 $\sigma(x)$ ，$x \in R^3$ 代表在有限距离内击中粒子的概率。对于一个射线 $r(o, d)$ ，时间 $t$ ，则任意时间的粒子为 $r(t) = o + td$ ，因此可将密度场参数化为 $\sigma(t)$ 。密度和透射率函数 $T(t)$ 关系密切，表示在间隔 $[0, t)$ 内不击中任意粒子的概率。我们添加一个微分步长 $dt$ ，则有以下公式关系：

$$
T(t + dt) = T(t) \cdot (1 - dt \cdot \sigma(t)) \\
\frac{T(t + dt) - T(t)}{dt} = T'(t) =  -T(t) \cdot \sigma(t)
$$

解此微分方程得到 $T(a \rightarrow b)$ ，定义为射线从 $a$ 到 $b$ 不击中任何粒子的概率，且记 $T(t) = T(0 \rightarrow t)$ 。

$$
\begin{aligned}
T'(t) & = -T(t) \cdot \sigma(t) \\
\frac{T'(t)}{T(t)} & = -\sigma(t) \\
\int_{a}^{b} \frac{T'(t)}{T(t)} \,dt & = - \int_a^b \sigma(t) dt \\
\log T(t) |^b_a & = - \int_a^b \sigma(t) dt \\
T(a \rightarrow b) & = \frac{T(b)}{T(a)} = \exp(-\int_a^b \sigma(t) dt) \\
\end{aligned}
$$

「**概率解释**」我们可以将 $1 - T(t)$ （通常称为透明度）解释为累积分布函数（CDF），表示射线在达到 $t$ 之前击中粒子的概率； $T(t) \cdot \sigma(t)$ 则是对应的概率密度函数（PDF），给定了射线在时刻 $t$ 终止的似然。

「**体积渲染**」设背景颜色 $c_{bg}$ ，射线沿着 $t = 0 \rightarrow D$ ，由于在 $t$ 处终止的概率密度为 $T(t) \cdot \sigma(t)$ ，因此预计颜色为

$$
C = \int_0^D T(t) \cdot \sigma(t) \cdot c(t) \,dt + T(D) \cdot c_{bg}
$$

「**均匀介质**」假设射线片段 $[a, b]$ 内有恒定颜色 $c_a$ 和密度 $\sigma_a$ ，则可按照如下公式计算累积颜色：

$$
\begin{aligned}
C(a \rightarrow b) & = \int_a^b T(a \rightarrow t) \cdot \sigma(t) \cdot c(t) \,dt \\
& = \sigma_a \cdot c_a \int_a^b T(a \rightarrow t) \,dt && \text{恒定颜色密度} \\
& = \sigma_a \cdot c_a \int_a^b \exp(-\int_a^t \sigma(u) \,du) \,dt \\
& = \sigma_a \cdot c_a \int_a^b \exp(-\sigma_a u |^t_a) \,dt && \text{恒定密度} \\
& = \sigma_a \cdot c_a \int_a^b \exp(-\sigma_a (t - a)) \,dt \\
& = \sigma_a \cdot c_a \frac{\exp(-\sigma_a (t - a))}{-\sigma_a} |^b_a \\
& = c_a \cdot (1 - \exp(-\sigma_a(b - a)))
\end{aligned}
$$

::: tip
上述公式给定了在均匀片段 $a \rightarrow b$ 累计颜色的计算方法，结合射线之前累积的透射率 $T(0 \rightarrow a)$ ，即可得到 NeRF 体积渲染公式。
:::

「**透射率具有乘性**」射线在 $[a, c]$ 内未击中任何粒子的概率等于两段独立事件 $[a, b]$ 和 $[b, c]$ 的概率乘积。

$$
T(a \rightarrow c) = T(a \rightarrow b) \cdot T(b \rightarrow c)
$$

「**分段恒定数据的体积渲染**」综上所述，我们可以计算通过分段恒定颜色和密度的介质的体积渲染积分。注意，此处光线是从 $t_1$ 发射的，因此透射率为 $T(t_1 \rightarrow t)$ 而非 $T(t_{n} \rightarrow t)$ 。

$$
\begin{aligned}
C(t_{N+1}) & = \sum_{n=1}^N \int_{t_n}^{t_{n+1}} T(t) \cdot \sigma_n \cdot c_n \, dt \\
& = \sum_{n=1}^N \int_{t_n}^{t_{n+1}} T(0 \rightarrow t_n) \cdot T(t_n \rightarrow t) \cdot \sigma_n \cdot c_n \, dt \\
& = \sum_{n=1}^N T(0 \rightarrow t_n) \int_{t_n}^{t_{n+1}} T(t_n \rightarrow t) \cdot \sigma_n \cdot c_n \, dt \\
& = \sum_{n=1}^N T(0 \rightarrow t_n) \cdot (1 - \exp(-\sigma_n(t_{n+1} - t_n))) \cdot c_n
\end{aligned}
$$

::: tip
将射线分为 $N$ 段，分别计算每一段的累积颜色，即累积透射率 $T(0 \rightarrow t_n)$ 乘以当前均匀介质片段的累积颜色 $C(t_n \rightarrow t_{n+1})$ 。

$$
C(t_{N+1}) = \sum_{n=1}^N T(0 \rightarrow t_n) \cdot C(t_n \rightarrow t_{n+1})
$$
:::

由此便能引出 NeRF 中的体积渲染公式：

$$
C(t_{N+1}) = \sum_{n=1}^N T_n \cdot (1 - exp(-\sigma_n \delta_n)) \cdot c_n , \\
T_n = \exp(\sum_{k=1}^{n-1} -\sigma_k \delta_k)
$$

最后，我们也可以使用 $\alpha$ 合成权重 $\alpha_n = 1 - \exp(- \sigma_n \gamma_n)$ 来表示以上公式：

$$
C(t_{n+1}) = \sum_{n=1}^N T_n \cdot \alpha_n \cdot c_n \\
T_n = \prod_{n=1}^{N-1} (1 - \alpha_n)
$$

## 小结

- 射线 $r(o,d)$ 有 $r(t) = o + td$ ，则将空间密度场 $\sigma(x)$ 参数化为体积密度 $\sigma(t)$

- 透射率 $T(t) = \exp(- \int_0^t \sigma(t) \, dt)$ ，$T(a \rightarrow b) = \frac{T(b)}{T(a)} = \exp(-\int_a^b \sigma(t) dt)$ ，具有乘性 $T(a \rightarrow c) = T(a \rightarrow b) \cdot T(b \rightarrow c)$

- 透射率与体积密度的概率解释：累计分布函数 CDF（透明度）$1 - T(t)$ ，概率密度函数 PDF（在 $t$ 处终止的似然）$T(t) \cdot \sigma(t)$

- 体积渲染 $C = \int_0^D T(t) \cdot \sigma(t) \cdot c(t) \,dt + T(D) \cdot c_{bg}$ ，片段均匀介质下 $C(a \rightarrow b) = c_a \cdot (1 - \exp(-\sigma_a(b - a))) = c_a \cdot (1 - T(a \rightarrow b))$

- 分段恒定（均匀介质） $C(t_{N+1}) = \sum_{n=1}^N T(0 \rightarrow t_n) \cdot (1 - \exp(-\sigma_n(t_{n+1} - t_n))) \cdot c_n$ ，令时间间隔恒为 $\delta_n$ ，则可以得到 NeRF 论文的体积渲染公式 $C(t_{N+1}) = \sum_{n=1}^N T_n \cdot (1 - exp(-\sigma_n \delta_n)) \cdot c_n$  ，其中 $T_n = \exp(\sum_{k=1}^{n-1} -\sigma_k \delta_k)$
