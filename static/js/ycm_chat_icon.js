/**
 * YCM Chat Icon Module
 * 提供網頁聊天圖標和對話窗口功能
 */

// 立即執行函數以避免變數污染全局命名空間
(function() {
    // 添加樣式到頭部
    function addStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            #chat_icon .chat-button {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background-color: #4CAF50;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                transition: transform 0.3s ease;
                z-index: 1000;
            }

            #chat_icon .chat-button:hover {
                transform: scale(1.1);
            }

            #chat_icon .chat-icon {
                font-size: 24px;
                color: white;
            }

            #chat_icon .chat-window {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 350px;
                height: 500px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                flex-direction: column;
                transition: all 0.3s ease;
                z-index: 1000;
            }

            #chat_icon .chat-window.hidden {
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
            }

            #chat_icon .chat-header {
                padding: 15px;
                background-color: #4CAF50;
                color: white;
                border-radius: 10px 10px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            #chat_icon .chat-title {
                font-weight: bold;
            }

            #chat_icon .close-button {
                cursor: pointer;
                font-size: 24px;
            }

            #chat_icon .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
            }

            #chat_icon .bot-message,
            #chat_icon .user-message {
                margin: 10px 0;
                padding: 10px 15px;
                border-radius: 15px;
                max-width: 80%;
                word-wrap: break-word;
            }

            #chat_icon .bot-message {
                background-color: #f1f1f1;
                align-self: flex-start;
                margin-right: auto;
            }

            #chat_icon .user-message {
                background-color: #4CAF50;
                color: white;
                align-self: flex-end;
                margin-left: auto;
            }

            #chat_icon .chat-input-area {
                padding: 15px;
                border-top: 1px solid #eee;
                display: flex;
                gap: 10px;
            }

            #chat_icon #user-input {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
            }

            #chat_icon #send-button {
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            #chat_icon #send-button:hover {
                background-color: #45a049;
            }
        `;
        document.head.appendChild(styleElement);
    }

    // 創建聊天圖標和窗口 HTML
    function createChatElements() {
        const chatIconDiv = document.createElement('div');
        chatIconDiv.id = 'chat_icon';
        
        chatIconDiv.innerHTML = `
            <div class="chat-button">
                <img src="http://192.168.33.68:5000/static/images/ycm_logo.png" alt="YCM Logo" width="48" height="48">
            </div>

            <div class="chat-window hidden">
                <div class="chat-header">
                    <span class="chat-title">聊天機器人</span>
                    <span class="close-button">&times;</span>
                </div>
                <div class="chat-messages">
                    <div class="bot-message">您好！我是聊天機器人，有什麼我可以幫您的嗎？</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="user-input" placeholder="輸入訊息...">
                    <button id="send-button">發送</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatIconDiv);
    }

    // 初始化事件處理
    function initEvents() {
        const chatIcon = document.getElementById('chat_icon');
        const chatButton = chatIcon.querySelector('.chat-button');
        const chatWindow = chatIcon.querySelector('.chat-window');
        const closeButton = chatIcon.querySelector('.close-button');
        const sendButton = chatIcon.querySelector('#send-button');
        const userInput = chatIcon.querySelector('#user-input');
        const chatMessages = chatIcon.querySelector('.chat-messages');

        // 切換聊天窗口
        chatButton.addEventListener('click', () => {
            chatWindow.classList.remove('hidden');
        });

        closeButton.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });

        // 發送消息功能
        function sendMessage() {
            const message = userInput.value.trim();
            if (message === '') return;

            // 添加用戶消息到聊天窗口
            appendMessage(message, 'user-message');

            // 發送消息到後端
            fetch('http://192.168.33.68:5000/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => response.json())
            .then(data => {
                // 添加機器人回覆到聊天窗口
                appendMessage(data.response, 'bot-message');
            })
            .catch(error => {
                console.error('Error:', error);
                appendMessage('抱歉，發生錯誤了。', 'bot-message');
            });

            // 清空輸入框
            userInput.value = '';
        }

        // 添加消息到聊天窗口
        function appendMessage(message, className) {
            const messageDiv = document.createElement('div');
            messageDiv.className = className;
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // 發送按鈕點擊事件
        sendButton.addEventListener('click', sendMessage);

        // Enter鍵發送消息
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // 初始化聊天圖標
    function initChatIcon() {
        // 檢查是否已存在
        if (document.getElementById('chat_icon')) {
            console.warn('Chat icon already exists in the document');
            return;
        }
        
        // 添加樣式
        addStyles();
        
        // 創建元素
        createChatElements();
        
        // 初始化事件
        initEvents();
    }

    // 監聽 DOM 內容加載完成後初始化，在頁面完全加載後才初始化的安全機制
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatIcon);
    } else {
        initChatIcon();
    }
})();