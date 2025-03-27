# Flask 聊天機器人模組

這是一個可重用的 Flask 聊天機器人模組，提供漂亮的懸浮聊天界面。

## 功能特點

- 右下角懸浮聊天按鈕
- 可展開/收起的聊天窗口
- 響應式設計
- 易於整合到現有的 Flask 應用


## 移植方法
在想加入 icon 的 html body 中 加入
```
<!-- 引入聊天圖標組件 -->
    <script src="https://example.com/ycm_chat_icon.js"></script>
```

## 注意
每次改動需到 static/js/ycm_chat_icon.js 中改動 baseUrl = ''