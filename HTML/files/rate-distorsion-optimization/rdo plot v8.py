import numpy as np, matplotlib.pyplot as plt
from matplotlib import font_manager

fig, axes = plt.subplots(1, 2, figsize=(16, 7), dpi=150)
fig.patch.set_facecolor('#0d0d0d')
font_path = r"C:\Users\iAvoe\AppData\Local\Microsoft\Windows\Fonts\方正韵动中黑_GBK.ttf"
my_font = font_manager.FontProperties(fname=font_path)
plt.rcParams['font.family'] = my_font.get_name()
plt.rcParams['axes.titleweight'] = 'bold'

# 图表 1：平行线散点  y = -x + c
# 根据 RDO 公式 J = D + λ⋅R，方程 y = -x + c 可解释为 D = -R + c
# 对应 λ=1，J = c。
ax1 = axes[0]
ax1.set_facecolor('#000')

np.random.seed(42)

intercepts = [0.333, 0.667, 1.0, 1.333, 1.667, 2.0]
colors = ['#06587c', '#087fb4', '#0ba7ed', '#17b0f4', '#4fc3f7', '#87d6fa']
total_points = 3500
points_per_line = total_points // len(intercepts)

# 用于注释的点
annotate_x, annotate_y = None, None
annotate_j = None
bad_point_xy = None
good_point_xy = None

for c, color in zip(intercepts, colors):
    x = np.random.uniform(0.1, 2.0, points_per_line) # 将 x 范围限制为 xlim，避免越界
    y_line = -x + c
    noise_scale = 0.08 + 0.035 * x
    y_noise = np.random.normal(0, noise_scale, points_per_line)
    y = y_line + y_noise
    mask = (y > 0.01) & (y < 2.0)
    x, y = x[mask], y[mask]
    ax1.scatter(x, y, marker='x', s=12, alpha=0.7,
                c=color, label=f'c = {c:.3f}', linewidths=0.8)

    # 保存注释点 (c = 1.0)
    if c == 1.0:
        if len(x) > 10:
            annotate_x, annotate_y = x[10], y[10]
            annotate_j = c

    # 保存用于比较的点
    if c == 1.667:
        mask_r = (x > 1.2) & (x < 1.4)
        if mask_r.any():
            bad_point_xy = (x[mask_r][0], y[mask_r][0])
    if c == 0.667:
        mask_r = (x > 0.3) & (x < 0.5)
        if mask_r.any():
            good_point_xy = (x[mask_r][0], y[mask_r][0])

# 修改 1：坐标系 label 和标题算式
ax1.set_title('RDO: J = D + $\lambda$·R', fontsize=16, color='#eee', pad=12)
ax1.set_xlabel('Bitrate (R)', fontsize=13, color='#aaa')
ax1.set_ylabel('Distortion (D)', fontsize=13, color='#aaa')
ax1.set_xlim(0.1, 2.0)
ax1.set_ylim(0, 2.0)
ax1.tick_params(colors='#777', labelsize=9)
for spine in ax1.spines.values(): spine.set_edgecolor('#333')
ax1.grid(alpha=0.12, color='#fff')
ax1.legend(loc='upper right', fontsize=11, framealpha=0.2,
            labelcolor='white')

x_curve = np.linspace(0.1, 2.0, 500)
y_curve = (500 * np.exp(-1.5 * (x_curve - 0.2))) * (2.0 / 420)
ax1.plot(x_curve, y_curve, color='#fff', lw=1.7,
         linestyle='-.', alpha=0.9,
         label=r'R-D 曲线：$\frac{2}{420}\cdot500\,e^{-1.5(x-0.2)}$')

# 修改 2：给一个数据点添加 annotate
if annotate_x is not None and annotate_y is not None:
    # 标注文本框和箭头
    ax1.annotate(f'R={annotate_x:.2f}, D={annotate_y:.2f}',
                 xy=(annotate_x, annotate_y), xytext=(annotate_x - 0.5, annotate_y + 0.3),
                 arrowprops=dict(facecolor='#4fc3f7', shrink=0.05, width=1.5, headwidth=6, headlength=7, edgecolor='#fff'),
                 color='#fff', fontsize=12,
                 bbox=dict(facecolor='#0d0d0d', edgecolor='#4fc3f7', alpha=0.7))
    # 添加水平和垂直辅助线
    ax1.axvline(x=annotate_x, color='#777', linestyle='--', linewidth=0.8, alpha=0.6)
    ax1.axhline(y=annotate_y, color='#777', linestyle='-', linewidth=0.8, alpha=0.6)

# 修改 3：添加比较两个数据点的说明
if bad_point_xy is not None and good_point_xy is not None:
    # 标记坏点
    ax1.scatter(bad_point_xy[0], bad_point_xy[1], marker='o', s=100,
                 facecolor='none', edgecolor='#ee4444', linewidths=2.0)
    ax1.annotate('中高码率，中低失真',
                 xy=bad_point_xy, xytext=(bad_point_xy[0] + 0.1, bad_point_xy[1] + 0.3),
                 arrowprops=dict(facecolor='#ee4444', shrink=0.05, width=1.5, headwidth=6, headlength=7, edgecolor='#fff'),
                 color='#ee4444', fontsize=12,
                 bbox=dict(facecolor='#0d0d0d', edgecolor='#ee4444', alpha=0.7))

    # 标记好点
    ax1.scatter(good_point_xy[0], good_point_xy[1], marker='o', s=100,
                 facecolor='none', edgecolor='#44ee44', linewidths=2.0)
    ax1.annotate('低码率，低失真',
                 xy=good_point_xy, xytext=(good_point_xy[0] - 0.46, good_point_xy[1] + 0.2),
                 arrowprops=dict(facecolor='#44ee44', shrink=0.05, width=1.5, headwidth=6, headlength=7, edgecolor='#fff'),
                 color='#44ee44', fontsize=12,
                 bbox=dict(facecolor='#0d0d0d', edgecolor='#44ee44', alpha=0.7))

# 图表 2：扇形散点 D = a × Qstep^b (保持原样)
ax2 = axes[1]
ax2.set_facecolor('#000')

np.random.seed(3)
n = 3500

b = np.concatenate([
    np.random.normal(0.25, 0.1, int(n * 0.03)),
    np.random.normal(0.5, 0.1, int(n * 0.09)),
    np.random.normal(0.80, 0.16, int(n * 0.12)),
    np.random.normal(1.20, 0.15, int(n * 0.40)),
    np.random.normal(1.50, 0.12, int(n * 0.26)),
    np.random.normal(1.79, 0.08, int(n * 0.09)),
])
b = np.clip(b, 0, 2)

target = 500 * np.exp(-1.5 * (b - 0.2))
spread_scale = 222 * (np.maximum(1.9 - b, 0)) ** 1.8
direction = np.random.beta(1.15, 4.7, size=len(b))
spread = direction * (spread_scale - b + 0.222)

a = target - spread
a += np.random.normal(0, 2.5 / (b + 0.25), size=len(b))
a = np.clip(a, 0, 421)

sc = ax2.scatter(b, a, marker='x', s=10, alpha=0.8, c=b, cmap='plasma', linewidths=0.8)

cbar = fig.colorbar(sc, ax=ax2, fraction=0.035, pad=0.02)
cbar.set_label('b value', color='#bbb', fontsize=12)
cbar.ax.yaxis.set_tick_params(color='#777', labelsize=8)
plt.setp(cbar.ax.yaxis.get_ticklabels(), color='#777')
cbar.outline.set_edgecolor('#333')

ax2.set_title('D = a × Qstep$^b$', fontsize=16, color='#eee', pad=12)
ax2.set_xlabel('b', fontsize=13, color='#bbb')
ax2.set_ylabel('a', fontsize=13, color='#bbb')
ax2.set_xlim(0, 2)
ax2.set_ylim(0, 420)
ax2.tick_params(colors='#777', labelsize=9)
for spine in ax2.spines.values(): spine.set_edgecolor('#333')
ax2.grid(alpha=0.12, color='#fff')
plt.show()