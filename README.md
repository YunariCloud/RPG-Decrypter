# RPG Decrypter - RPG Maker 资源还原解密工具

<p align="center">
  <img src="app_icon.png" width="160" height="160" alt="RPG Decrypter Logo" style="border-radius: 32px; box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);" />
</p>

<p align="center">
  <strong>一款基于 Node.js 22 SEA 构建的、免安装、单文件、自动破解密钥的 RPG Maker MV / MZ 游戏资源一键解密还原工具。</strong>
</p>

---

## 🌟 核心特性

- **🖥️ 免安装 & 独立运行 (Zero-Dependency)**: 采用 Node.js 官方原生的 Single Executable Applications (SEA) 技术，打包成单个 `rpg-decrypter.exe` 文件。**接收方电脑中无需安装 Node.js，双击直接运行！**
- **🎨 极美暗黑玻璃拟态 UI**: 精致的 Cyberpunk 暗黑霓虹视觉设计，视口高度自适应锁定（`100vh` 零滚动条），配合 Flexbox 弹性伸缩，提供媲美原生桌面应用的流畅体验。
- **🔑 自动识别 & 启发式密钥破解 (Heuristic Decryption)**:
  * **自动识别**：智能扫描游戏根目录下的 `System.json` 文件，自动提取游戏标题、引擎版本（MV/MZ）及内置解密密钥。
  * **启发式破解**：若 `System.json` 被删除、修改或二次加密，工具会自动定位首个加密图片资源（`.rpgmvp` 或 `.png_`），通过标准 PNG 文件头与密文进行 XOR（异或）逆向计算，**瞬间（1 毫秒内）逆向出正确的 32 位解密密钥，成功率达 100%**。
- **🛠️ 全自动解密修补 (`System.json` 自动打补丁)**: 工具在解密文件的同时，会自动拦截并修改导出的 `System.json` 配置文件，将解密标志 `"hasEncryptedImages"` 和 `"hasEncryptedAudio"` 全部重置为 `false`。**解密完成后，游戏可以直接双击游玩，不需要再次进行任何手动修复！**
- **🚀 极速无卡顿架构**:
  * **网络防抖广播**：后端 SSE (Server-Sent Events) 状态广播限频至最高 10Hz（每 100ms 更新一次进度），防止高频网络请求挂起 UI。
  * **里程碑式日志**：移除对每个文件的刷屏日志打印，改为每 500 个文件输出一条汇总进度。既能随时掌握进度，又彻底根治了浏览器 DOM 渲染导致的界面卡顿。
  * **自动调优端口**：当默认端口 `3000` 被占用或限制时，服务会自动顺延侦听下一个空闲端口，并自动弹出浏览器。

---

## 🛠️ 文件结构

```
rpg-decrypter/
├── server.js              # 本地 Node 服务器逻辑（包含内嵌 Web GUI 和解密内核）
├── compile.js             # EXE 打包编译脚本
├── run.bat                # 源码开发运行脚本
├── build.bat              # 本地编译 EXE 脚本
├── app_icon.png           # 512x512 高清应用图标（内嵌为 Favicon）
├── app_icon.ico           # Windows ICO 图标（支持多分辨率）
└── .github/workflows/     # CI/CD 自动化构建发布流水线
    └── build-release.yml
```

---

## 🚀 快速上手

### 1. 开发运行（从源码启动）
确保你的电脑安装了 Node.js (推荐 v20 或 v22 以上) 和 Python。
1. 双击 **`run.bat`** 启动。
2. 浏览器会自动弹出操作页面（一般为 `http://localhost:3000`）。

### 2. 编译打包（生成 EXE）
1. 双击 **`build.bat`**，编译器会自动执行 Node.js SEA 配置、复制运行时并调用 `postject` 模块注入资源。
2. 编译成功后，在根目录下生成 **`rpg-decrypter.exe`** 独立程序。

### 3. 如何解密游戏资源
1. 复制你的 RPG 游戏根目录（包含 `Game.exe` 的文件夹）的绝对路径。
2. 粘贴到工具界面的 **“游戏目录”** 输入框中，点击 **“扫描目录”**。
3. 系统将自动完成引擎检测和密钥破解。
4. 点击 **“开始还原解密”**，等待进度条拉满（100%）。
5. 点击 **“打开解密目录”** 即可在 Windows Explorer 中直接打开解密后生成的 `[游戏名]_decrypted` 文件夹，即可直接游玩或提取美术、音频资源！

---

## 🤖 GitHub Actions 自动化打包发行

本项目已预配置 CI/CD 发布流程：
- 当您在 GitHub 仓库中发布一个新版本（如推送 Tag 触发 `v1.0.0`），GitHub Actions 将会在 `windows-latest` 虚拟机中自动运行编译打包。
- 打包完成后的 **`rpg-decrypter.exe`** 会自动作为 Release 附件发布在你的 GitHub 仓库发行页中，用户可直接下载单文件版。

---

## 📄 免责声明

本工具仅供学习交流、个人恢复丢失的项目文件、Fan-art 制作或游戏 Mod 研究使用。请勿将本工具用于盗版分发或其他侵犯他人知识产权的行为。使用本工具解密他人商业游戏资源所产生的法律后果由使用者本人承担。
