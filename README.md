# Sidebar Recent · 侧栏最近会话

[![npm](https://img.shields.io/npm/v/dsh-sidebar-recent.svg)](https://www.npmjs.com/package/dsh-sidebar-recent)
[![GitHub release](https://img.shields.io/github/v/release/ydfq7217/dsh-sidebar-recent.svg)](https://github.com/ydfq7217/dsh-sidebar-recent/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ydfq7217/dsh-sidebar-recent/blob/main/LICENSE)
[![](https://img.shields.io/badge/powered_by-dsh-4D6BFE?style=flat-square&logo=deepseek&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)

为 **DeepSeek Harness (DSH)** 侧栏提供「项目 + 最近」双栏会话浏览器：既能按项目分组翻会话，也能按最近使用时间从上到下（新 → 旧）一眼扫到全部会话。

> 这是一个 DSH Client 插件，通过 `sidebar.workspaces` 槽位接管侧栏会话浏览区。停用插件即恢复 DSH 原生浏览器，不修改安装目录、不改动任何官方文件。

## 功能

- **项目栏**：按项目分组（工作区 / 工作区树 / 单列表三种视图），组内按最近更新或手动排序，可折叠，可拖拽调整高度。
- **最近栏**：跨所有项目 + 未分组会话，按 `updatedAt` 倒序排列，右侧显示相对时间（刚刚 / N 分钟 / N 小时 / N 天 / 日期）。
- **双向定位**：在任一栏点击会话，另一栏自动展开对应分组并平滑滚动到该行。
- **搜索**：按名称检索会话（含历史消息片段），带防抖与中止请求。
- **会话操作**：打开、分叉、重命名、归档 / 取消归档、置顶 / 取消置顶、复制 Session ID。
- **项目管理**：新建会话、重命名、删除工作区、添加工作区目录。
- **状态指示**：进行中显示旋转圆环，需要用户交互时显示橙色问号圆环，有未读完成时显示小蓝点（会话获焦后自动消失）。
- **外观**：字号三级独立调节（区块标题 / 项目文件夹 / 会话，8–22px 连续可调）、面板背景三态（毛玻璃 / 与侧栏融合 / 增强对比）、状态标识左右可切换、中文 / English。

## 安装/卸载（无需重启DSH）

为 DSH Web 端 ：

```
dsh plugin --profile web add dsh-sidebar-recent #安装
```
```
dsh plugin --profile web remove dsh-sidebar-recent #卸载
```

为 DSH 桌面端：

```
dsh plugin --profile desktop add dsh-sidebar-recent #安装
```
```
dsh plugin --profile desktop remove dsh-sidebar-recent #卸载
```

## 恢复原生

直接停用或卸载本插件后 DSH 原生工作区浏览器立即回到原位（插件以 `priority: -100` 抢占槽位，官方注册始终存活）。

## 配置

外观参数在侧栏右上角的「视图选项」菜单里调整，改动即时保存。

## 兼容性

- DSH Desktop / Web （ >=0.2.x <0.3.0 可用 ）
- 依赖槽位：`sidebar.workspaces`（`single`），并以 `children` 声明 `sidebar.workspaces.directoryFlow`、`sidebar.workspaces.session.menu.item`、`sidebar.workspaces.session.row.action`、`sidebar.session.row.leading`、`sidebar.session.row.hover`，与官方 ui-workspace 的槽位契约保持一致。
- 使用主题 token（`--dsw-alias-*`）着色，浅色 / 深色主题均可读

## 隐私

纯前端插件：不联网、不上报、不修改。

