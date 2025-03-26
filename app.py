from flask import Flask, render_template, jsonify, request, send_from_directory
from chat_tool.query.chatgpt import query_chatgpt
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) # 允許跨域

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    print(data)
    user_message = data.get('message', '')
    
    # 這裡可以添加聊天機器人的邏輯
    # 目前簡單返回一個固定回覆

    bot_response = query_chatgpt(user_message)
    
    return jsonify({
        'response': bot_response
    })

@app.route('/ycm_chat_icon.js')
def serve_js():
    print(456)
    response = send_from_directory('static/js', 'ycm_chat_icon.js')
    response.headers['Access-Control-Allow-Origin'] = '*'  # 響應跨域
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    print(123)
    return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)