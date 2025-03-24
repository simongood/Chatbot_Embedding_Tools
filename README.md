# Flask 聊天機器人模組

這是一個可重用的 Flask 聊天機器人模組，提供漂亮的懸浮聊天界面。

## 功能特點

- 右下角懸浮聊天按鈕
- 可展開/收起的聊天窗口
- 響應式設計
- 易於整合到現有的 Flask 應用

## 如何整合到你的 Flask 應用

1. 複製 `chat` 目錄到你的項目中
2. 在你的 Flask 應用中註冊 Blueprint：

```python
from flask import Flask
from chat import chat_bp

app = Flask(__name__)
app.register_blueprint(chat_bp)
```

3. 在你想要添加聊天功能的頁面中加入：

```html
<iframe src="/chat" style="display:none;"></iframe>
```

## 示例

查看 `example.py` 了解完整的使用示例。

## 自定義

- 修改 `chat/static/css/style.css` 來自定義外觀
- 在 `chat/__init__.py` 中的 `send_message` 函數添加你的聊天邏輯