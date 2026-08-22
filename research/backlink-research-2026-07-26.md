# 外链建设研究报告 — 2026-07-26

本文是对 [tools-backlink-plan-2026-07-20.md](./tools-backlink-plan-2026-07-20.md) 的实测复核与扩写。7 月 20 日那份是策略框架,方向正确;本次做了外部实测,补上它缺的三件事:**当前真实基线**、**有名有姓的具体落点**、**新增资产与新增渠道**。

---

## 一、实测基线:引荐域名约等于零

用多组查询实测(域名精确匹配、reddit/forum/blog 组合、行业资源盘点类查询),结果:

- **搜不到任何第三方论坛帖、Reddit 帖、博客文章提及本域名。** 目前处于"零外链起步"状态,不是"外链少"。
- **但 AI 搜索已经在准确引用本站。** 多个查询的 AI 摘要能说出"207 条文档记录、246 个文件、含 7 月 10 日 War.gov 第四次发布"——数字精确到与站内一致。说明**内容与结构化数据这一层已经过关,卡点纯粹在链接层**。
- 结论:GEO(AI 引用)已跑通,SEO 权重通道未启动。这两件事目前是脱节的,外链是把 AI 引用变现为搜索排名的那根缺失的杠杆。

## 二、竞品实测:差异化是真实存在的,而且没被讲出来

同类站点排在同一批查询结果里的有:`ufofiles.fyi`、`ufo.thedarkelite.com`、`jasperbernaers.com`、`todaywhy.com`、`doolly.com`。其中 **ufofiles.fyi 是唯一的正面对手**(同为 5 月 8 日起的 PURSUE 档案站)。实测它的形态:

| 维度 | ufofiles.fyi | 本站 |
|---|---|---|
| 收录量 | 158 个文件(120 PDF / 32 图 / 6 视频) | 207 条记录 / 246 文件,已含 Release 04 |
| 摘要 | AI 生成摘要 | 人工分析文章 25 篇 |
| 数据集 | **无 CSV、无 API、无批量下载** | `/dataset/uap-documents.csv` 已上线 |
| 引用支持 | 无 citation 块 | 文档页 + `/tools/stats` + `/tools/map` 均有 |
| 证据分级 | 无 | **Evidence Explorer(已证实/官方说法/未验证 8 类标签)** |
| 外链姿态 | 只外链 war.gov;页脚挂着无关项目(AI 涂鸦生成器、汉坦病毒地图) | 独立专题站 |

**可用的判断**:对手是"批量抓取 + AI 摘要"型站点,页脚的无关项目暴露了它是站群式产物。本站的**证据分级 + 可引用数据集**这两点,它短期内做不出来,而这恰好是记者和怀疑论者唯一在乎的东西。所有外联话术都应该压在这两点上,而不是"我们收录得更全"(收录量是会被追平的,方法论不会)。

## 三、7 月 20 日方案的执行状态复核

| 项 | 状态 |
|---|---|
| 11. 工具页专属 OG 图 | ✅ 已完成(commit `b3bbcfd`,5 张) |
| 12. stats/map 引用块 | ✅ 已完成 |
| 13. stats CSV 下载 | ✅ 已完成,线上 `/dataset/uap-documents.csv` 返回 200 |
| 8. 开放数据集发 GitHub 公开仓库 | ❌ **未做**,GitHub 账号下无对应仓库 |
| 9. Kaggle / data.world | ❌ 未做 |
| 1–7 外联类 | ❌ 未见任何执行痕迹(外部零提及) |

**第四层级(站内前置)已经全部备好了。也就是说,现在挡住外链的不是资产,是外联动作没开始。** 这是本次复核最重要的一条。

## 四、新增发现(7 月 20 方案里没有的)

### 4.1 Metabunk 有稳定的"每次 Release 一个主题帖"结构 —— 这是最具体的落点

实测到的真实帖子 URL:

- Release 1:`metabunk.org/threads/war-gov-ufo-department-of-war-releases-uap-files-2026-release-1.14870/`(已到第 4 页)
- Release 3:`metabunk.org/threads/war-gov-ufo-department-of-war-releases-uap-files-2026-release-3.14949/`
- 标签聚合页:`metabunk.org/tags/uap/`

含义:**不需要自己开帖,Release 05 落地后几小时内就会有现成的高活跃帖子。** Metabunk 的社区文化是"技术性证伪"——它是全网唯一会主动欢迎"这条记录只是官方公开渲染版、不是原始传感器数据"这种表述的地方。Evidence Explorer 的标签体系(`public-rendition`、`partial-explanation`、`context-gap`)几乎是为这个受众写的。

做法:在既有帖里针对**具体某条记录**的争论,给出本站的证据标签与依据说明,链接落在该记录页而非首页。不要开新帖自我介绍。

### 4.2 Wikipedia 的外部链接区是空的 —— 但只能走 Talk 页

实测 `United States UFO files` 词条:**External links 只有 DOD 和 National Archives 两个政府站,没有任何一个独立档案站。** 正文提到 NICAP、SETI 但未外链,并且有 Wikisource 全文托管。

这是一个真实空位,但纪律不变:**不要自己编辑正文加链接**。在 Talk 页发提案 + 声明 COI。Wikipedia 是 nofollow,价值不在权重,在于**它是记者和 AI 引擎做背景调研的第一站**,进入后会持续产生二次引用。

### 4.3 Zenodo(CERN 运营)是被漏掉的高价值数据集落点

搜索 "PURSUE release UFO declassified documents archive 2026",**排在第一位的是 Zenodo 上一份由外部作者自行上传的 PURSUE 分析报告**(Abhijeet Sarkar / Synaptic AI Lab)。这份东西只有二手叙述,没有可用的一手数据集。

含义有两层:

1. Zenodo 在这个主题上**已被验证能拿到首位排名**,而且对任何人开放上传;
2. 上面目前那份是"论述型",**没有人上传过一份真正的 PURSUE 结构化目录**。

本站的 207 条 CSV 上传 Zenodo 会拿到 **DOI**,进入 Google Scholar 与 Google Dataset Search 的可引用层。这是比 Kaggle 更高价值、更持久的一步(学术引用永不失效,且 DOI 会被学术工具自动解析)。建议**把 Zenodo 提到 Tier 3 首位,排在 GitHub 之前**。

> 注:自动抓取工具对该 Zenodo 记录给出过"内容为虚构"的判断,那是模型知识截止于 2026 年之前造成的误判(它不认识 2026 年发生的 PURSUE 事件),不是对该记录本身的可信结论。此处只取"Zenodo 可发、且能排到首位"这一事实。

### 4.4 资源盘点型媒体存在且在这个赛道活跃

实测到 `newspaceeconomy.ca` 发布过 "Top 10 Online Communities for UAP Discussion" 这类清单文。这类"资源盘点"文章是标准的链接获取目标——它们持续更新、乐于收录工具型资源,且天然给 dofollow 外链。7 月 20 方案里完全没有这一类。

### 4.5 Evidence Explorer 需要进入资产表(它是目前最强的外链诱饵)

7 月 23 日上线的 Evidence Explorer 晚于那份方案,因此不在它的资产匹配表里。但按上面的竞品分析,**它才是本站唯一无法被批量站群复制的资产**。补进资产表:

| 工具 | 谁会主动链接它 | 一句话卖点 |
|---|---|---|
| /tools/evidence | Metabunk、记者、Wikipedia 编辑、科普作者 | "唯一给每条 PURSUE 记录标注来源性质的档案——区分官方渲染版与原始数据、区分已解释与未解决,每条标签都给依据" |

### 4.6 站内待修:llms.txt 已经落后两个 Release

`public/llms.txt` 目前仍写着"Release 01 和 Release 02",且**完全没有列出任何 /tools 页面、没有列出任何一篇博客分析**。

这是个低成本高影响的修复:llms.txt 正是 AI 引擎和真人调研者用来快速理解"这个站有什么"的入口,而现在它对本站最值得被链接的资产(五个工具 + Evidence Explorer + 25 篇分析)只字未提。既然 AI 引用已跑通(见第一节),这一处的信息损失是纯浪费。

---

## 五、修订后的执行序列

### 立刻(不依赖 Release 05,本周内)

1. ~~**修 llms.txt**~~ ✅ **已完成(2026-07-26)** —— 更新到 Release 04 / 207 条(1948–2026、9 个机构),新增 Research Tools 段(含 Evidence Explorer)、Open Dataset 段(CSV + 字段定义 + 完整构成)、Source-Status Labels 段(两层标签体系与计数)、25 篇分析文章分组列出。全部 70 个 URL 实测 200。
2. ~~**Zenodo 发布数据集**~~ ✅ **已完成(2026-07-26)** —— v1 已发布。
   - **Concept DOI(对外引用用这个,永远指向最新版):`10.5281/zenodo.21605258`**
   - 版本 DOI(v1):`10.5281/zenodo.21605259`
   - 记录页已被 OpenAIRE 索引。素材保留在 `dataset/`,后续版本走 `refresh.sh` + Zenodo "New version",concept DOI 不变。
3. ~~**GitHub 公开仓库**~~ ✅ **已完成(2026-07-26)** —— <https://github.com/Starmadebydata/pursue-uap-documents-dataset>
   - 公开,10 个 topics(uap / ufo / pursue / dataset / open-data / declassified / government-transparency / foia / open-government-data / csv-dataset),homepage 指向 `/tools/stats`
   - LICENSE 用 SPDX 原文,GitHub 已识别为 **CC-BY-4.0**(侧栏显示徽章);`CITATION.cff` 已触发 **"Cite this repository"** 按钮;README 顶部 DOI badge 正常
   - `dataset/` 目录即该仓库内容的镜像,后续用 `refresh.sh` 更新后两边同步
4. ~~**/tools/stats 与文档页的 citation 块补上 DOI**~~ ✅ **已完成(2026-07-26)** —— DOI 已回填至 `src/config.ts`(Dataset JSON-LD 的 `identifier`/`sameAs`/`distribution`)、`/tools/stats` 下载按钮下方与 How to Cite 块(拆为"This page"/"The dataset"两段)、`llms.txt` 的 Open Dataset 段、以及 `dataset/` 的 README 与 CITATION.cff。
5. **修正 /terms 的授权冲突** ✅ **已完成(2026-07-26)** —— 原 /terms 禁止未经书面许可复制"organizational structure",与 Zenodo 上刚发布的 CC BY 4.0 直接矛盾。已加入目录数据集的 CC BY 4.0 明确豁免条款,书面许可限制只保留给设计与文章。**这条是发布 CC BY 数据集的必要前提,否则任何想复用数据的人会在 /terms 撞到反向条款。**

### Release 05 窗口 —— 复盘:整个错过了

Release 05 于 2026-08-07 落地。站内内容(41 条记录入库、数据集镜像升级)直到 2026-08-16 才提交,**晚了 9 天**;期间没有发布 first-look 分析文章,Metabunk、r/UFOs、记者外联均无执行痕迹。这一轮 72 小时窗口完全放空。

诊断:不是没人执行,是**每次都要从空白开始写**——文章框架、工具页内链、外联文案,没有一样是提前准备好的,导致"等新闻周期冷却了才想起来做"。

### Release 06 窗口(72 小时,时间敏感)—— 这次提前备好了

模板已就绪,发布当天只需要填数据,不用重新构思:

- **[release-first-look.md](templates/release-first-look.md)** —— first-look 文章骨架,frontmatter、结构、语气规则齐全,**并且把"Explore This Release"段落设为必填项**——这是此前 01–04 四篇文章都没做的:没有一篇链接过任何 /tools 页面。复制到 `src/content/blog/war-gov-ufo-release-0N-first-look.md`,填 `[[TOKEN]]` 即可。
- **[release-window-outreach.md](templates/release-window-outreach.md)** —— Metabunk 回帖、r/UFOs 评论、记者邮件三份可直接发的文案,附 T+0 到 T+72h 的执行时间表和发布当天的技术清单(toolData.ts 加新 release、数据集刷新、Zenodo 发新版、llms.txt 更新)。

`pursue-release-05-watch` 定时任务命中 Release 06 时,会在推送里直接指向这两个文件。

### 月度滴灌

9. **Wikipedia Talk 页提案**(带 COI 声明),目标是 `United States UFO files` 的 External links。
10. **资源盘点媒体外联** —— newspaceeconomy.ca 一类,每月 3–5 个,逐一单独撰写。
11. **同生态专业站** —— The Black Vault、UAP Logbook、The Debrief,同行式介绍信,不要求互链。
12. **Kaggle / data.world** —— 复用同一份 CSV,规范链接指回站内。

## 六、纪律(不变,且在恢复期尤其重要)

不买链接、不互换链接、不群发模板邮件、不在多个论坛贴同一份文案。当前处于 6 月核心更新压制后的恢复观察期,这些行为触发的正是我们正在等待重估的那类算法评估。

## 七、度量

- **每周 15 分钟**:GSC 链接报告 + Bing 站长工具,记录新增引荐域名,标注来源资产。当前基线为零,任何一条都是可归因的信号。
- **30 天目标**:Zenodo DOI 上线并被 Google Dataset Search 收录;GitHub 仓库上线;引荐域名 ≥ 3。
- **90 天目标**:引荐域名 10–20,其中 ≥3 来自专业媒体/研究者层级;Wikipedia Talk 提案有回应;至少 1 篇第三方文章引用本站的证据标签方法论(这是"方法论被采纳"的信号,比链接数本身更重要)。
