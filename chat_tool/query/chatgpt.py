from langchain_openai import ChatOpenAI  
from langchain.schema import HumanMessage, SystemMessage
from dotenv import dotenv_values


def query_chatgpt(user_query: str, system_prompt: str|None = None) -> str:
    """
    使用 LangChain 向 ChatGPT 發送查詢並獲得回應
    .env 內需含 OPENAI_API_KEY 變數

    參數:
        user_query (str): 用戶問題或提示
        system_prompt (str, 可選): 系統提示，定義助手的行為
        
    返回:
        str: ChatGPT 的回應文本
    """

    # 載入環境變數到字典
    config = dotenv_values(".env")
    if not config["OPENAI_API_KEY"]:
        print("未找到環境變數文件 .env 或 .env 內無 OPENAI_API_KEY")
        return "系統錯誤 請回報"
    
    # 默認系統提示
    if system_prompt is None:
        system_prompt = "你是一個聊天機器人，請提供簡潔明確的回答。"
    
    # 初始化 OpenAI 模型
    llm = ChatOpenAI(
        model="gpt-3.5-turbo", 
        openai_api_key=config["OPENAI_API_KEY"],
        temperature=0.4
    )
    
    # 創建消息列表
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_query)
    ]
    
    # 發送請求並獲取回應
    response = llm.invoke(messages).content
    
    return response

# 使用範例
if __name__ == "__main__":
    response = query_chatgpt(
        user_query="什麼是人工智能?", 
        system_prompt=None,
    )
    
    print(response)