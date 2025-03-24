from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    user_message = data.get('message', '')
    
    # 這裡可以添加聊天機器人的邏輯
    # 目前簡單返回一個固定回覆
    bot_response = f"收到你的訊息：{user_message}"
    
    return jsonify({
        'response': bot_response
    })

if __name__ == '__main__':
    app.run(debug=True)