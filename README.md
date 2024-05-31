# 原创 x265 压制教程 HTML 网页版

## [点此打开](https://iavoe.github.io/x265-web-tutorial/HTML/index.html)

- 建立于 [x264-x265-QAAC-ffprobe-Ultimatetutorial](https://github.com/iAvoe/x264-x265-QAAC-ffprobe-Ultimatetutorial) 的 x265 教程 2024.60 版，并大幅改进了内容

### HTML 版特点

- [x] 基于 docx 版教程的手工移植，考量了每一处段落的实现
- [x] 支持如 [Dark Reader](https://darkreader.org) 的暗黑模式浏览器插件
- [x] 响应式网站设计 + 点击图片的排版变更系统：点击图片轮询三种大小和对应段落的排版格式（左右环绕↔上下环绕），调整浏览器窗口轮询横↔竖式排版
- [x] HTML 版教程会因显示方案变更而区别于 docx，但仍然会为减少维护难度而延用英文/半角标点符号。
- [x] 解决了诸多文书规范性和阅读排版的问题，包括一些无法简单修复（如标题 1 被大版块用完）的历史遗留问题
- [x] 解决了难以通过 git 的变更跟踪系统检查更改内容的版本管理问题，尤其影响协作检查和撰写
- [x] 大幅改良了内容，包括多平台自动排版适配，JavaScript 排版切换互动，CSS 响应式设计，语法去简练化（不再需要通过字数限制控制排版），错误纠正
- [x] 100% LaTex 公式（使用 MathJax 实现，支持复制为 MathML 以及 LaTex，见下）
- [x] 高速 CI/CD。摆脱传统 docx-PDF 版教程的网盘和 QQ 群等间接发布，间接下载，每次更新要重复下载的困难
- [x] 利用 Github 透明化的代码区别检查

### 字体系统

分为正文黑体，注解圆体和代码段字体共三套字体集。

- 正文黑体为首选[煮豆黑体 Zhudou Sans](https://github.com/Buernia/Zhudou-Sans)（中文）附件  
  - 辅以系统 Sans Serif（英文
- 注解圆体为 Windows 的幼圆（中英文）附件
- 代码段的字体为传统代码段的 SFMono-Regular，Menlo，Monaco，Consolas（英文）  
辅以[狮尾圆体 Light](https://github.com/max32002/swei-gothic/blob/master)（中文）附件
- 公式段的字体为 [KaTeX Math Regular](https://github.com/KaTeX/katex-fonts/blob/master)（英文）附件（适配安卓）  
  - 辅以 Cochin，Georgia，Times，Times New Roman，serif

### 公式转换

- 目前引入了 [MathJax JavaScript]("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js") 附件做公式转换，同时因为 MathML Tag 占据 HTML 源码的面积太大而重写为 LaTex。工具为 [Text2Latex.com]("https://www.text2latex.com")
- 一开始因为没有转换 LaTex 的工具链而使用了手写转 MathML 的处理。工具为 [ConvertMathToLaTexMathML]("https://webdemo.myscript.com/views/math/index.html")
- 注：刚好只有 Word 2016 不支持复制 LaTex 格式的公式，也不支持 Word 2010 支持的第三方转换插件...

### 内容范围

ffmpeg，Vapoursynth，avs2yuv 传递参数，ffmpeg 字幕渲染，IPCM-CU，U 和 B 的区别，分块，1D 傅里叶变换，2D 傅里叶变换，二维离散余弦变换，帧间 - 动态搜索，DMD，Jain & Jain/十字搜索（含计算过程），LDSP-SDSP搜索（含计算过程），六边形Hex搜索（含计算过程），UMH搜索（含计算过程），搜索迭代与merange的关系，帧间-运动补偿，FIR，hpel-8tap，qpel-7tapα，qpel-7tapβ，时域架网-mctf，mcstf，高斯模糊，正态分布，中值滤镜，双边滤镜，显加权预测，隐加权预测，AMVP，merge-mode，GOP结构建立，PPS，SPS，VPS，SS，IDR，CRA，DRA，BLA，RAP，RASL，RADL，3-tap滤镜（含计算过程），强力平滑滤镜（含计算过程），趋平插值/billinear模式（含计算过程），夹角插值模式（含计算过程），DC插值模式，对数log(x)，对数-指数交换率，指数增长，上层量化模式，CRF模式（含计算过程），cplxBlur与qcomp，cplxBase，下层量化模式，近无损压缩，真无损压缩，2pass-ABR，Analysis-2pass-ABR，Analysis-Npass调优模式，Analysis-pass2-ABR-Ladder模式，率失真优化量化，jpsdr-Mod-AQ，MSE，峰值信噪比PSNR，边界强度，平滑0，平滑1，平滑4，取样迁就偏移，锐-带偏移EO-BO，明暗色深带，中间色深带，振铃，CABAC，算数编码，自适应与对等概率（含计算过程），上下文自适应：Prediction by partial matching（含计算过程），上下文自适应：有限状态机，伯努利试验，几何分布，小数取整法与取模法，一元码与截短二进制码，哥伦布 - 莱斯编码，零阶指数哥伦布编码 EGk0，游程编码与游标编码，二进制算数编码，汉明距离与欧几里得距离，软判决与硬判决解码，Trellis 的歧义，软判决率失真优化 CABAC 的再量化：SDQ-Trellis，SEI，SEI 分类，线程节点控制，3D V-Cache CPU，多线程 vs 多参考，色彩空间转换，VUI-HDR 调试，软件下载，GCC，RC，for 循环批量压制，x265 设置参数，杜比视界配置，preset 表格，tune 表格

### 繁体中文支持

本教程由简体中文编写，设计上通过自行安装浏览器插件转换为繁体。转换效果不理想则请截图，并发送到本教程 Github 仓库中的 Issues，或 QQ 群里。

### 暗黑模式支持

设计上通过将图片的白色背景改为透明，并给剩下的内容添加白色描边实现。目前已验证了 [Dark Reader](https://darkreader.org) 的效果。如果转换效果不理想则请截图，并发送到本教程 Github 仓库中的 Issues，或 QQ 群里。

### 打印机支持

TODO

### 打赏

<p align="center"><img src="bmc_qr.png"><br><img src="pp_tip_qr.png"></p>

——[Buy me a coffee 链接](https://buymeacoffee.com/iavoe)

——[PayPal 链接](https://www.paypal.com/qrcodes/managed/3e3e8b7f-27ed-4edc-a0fa-1b469e854a3c?utm_source=consapp)

<p align="center"><font size=1>——新纪录！这玩意现在年收入 20 人民币</font></p>

-----

当前版本（年，版，改）：2024.130.0<br>
联系方式：[Github：iAvoe]("https://github.com/iAvoe/iAvoe)，[QQ 群]("https://jq.qq.com/?_wv=1027&k=5YJFXyf")  
欢迎提交 pull-request 和 issues 指正
