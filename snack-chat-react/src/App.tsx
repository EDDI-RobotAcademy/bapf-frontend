import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";

const App = () => {
        const [messages, setMessages] = useState([]); // 채팅 메시지 배열
        const [inputMessage, setInputMessage] = useState(''); // 입력창 값
        const [nickname, setNickname] = useState(''); // 닉네임
        const [isNicknameSet, setIsNicknameSet] = useState(false); // 닉네임 설정 여부

        const socketRef = useRef(null); // DOM 조작 대신 useRef 사용

        useEffect(() => {
            if (isNicknameSet) {
                socketRef.current = new WebSocket('ws://localhost:8080/chat');

                socketRef.current.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        setMessages(prev => [...prev, {
                            type: '상대방',
                            text: data.message,
                            nickname: data.nickname
                        }]);
                    } catch (e) {
                        // 일반 텍스트인 경우
                        setMessages(prev => [...prev, {type: '상대방', text: event.data}]);
                    }
                };
                return () => socketRef.current?.close();
            }
        }, [isNicknameSet]);

        const sendMessage = () => {
            if (inputMessage.trim() && socketRef.current.readyState === WebSocket.OPEN) {
                const messageWithNickname = JSON.stringify({
                    nickname: nickname,
                    message: inputMessage
                });
                socketRef.current.send(messageWithNickname);
                setMessages(prev => [...prev, {type: '나', text: inputMessage, nickname: nickname}]);
                setInputMessage('');
            }
        };

        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <div className="flex flex-col h-screen justify-center items-center px-96 space-y-20">
                            {!isNicknameSet ? (
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="text-3xl font-extrabold">실시간 채팅</div>
                                    <div className="text-xl">닉네임을 입력하세요</div>
                                    <input
                                        className="border p-2 border-gray-300 rounded-2xl"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && nickname.trim() && setIsNicknameSet(true)}
                                        placeholder="닉네임 입력"
                                    />
                                    <button
                                        onClick={() => nickname.trim() && setIsNicknameSet(true)}
                                        className="p-3 bg-[#ff6f00] text-white rounded-2xl cursor-pointer hover:bg-[#ff6f00] hover:scale-105 transition-all duration-200 ease-in-out hover:font-extrabold"
                                    >
                                        채팅 시작
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="text-3xl font-extrabold">실시간 채팅 - {nickname}</div>
                                    <div className="h-1/2 border w-96 border-gray-300 rounded-2xl p-4 overflow-y-auto">
                                        {messages.map((msg, index) => (
                                            <div key={index} className={msg.type === '나' ? 'text-right mb-2' : 'text-left mb-2'}>
                                                <strong>{msg.nickname || msg.type}:</strong> {msg.text}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-x-5">
                                        <input
                                            className="border p-2 border-gray-300 rounded-2xl"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                            placeholder="메시지 입력"
                                        />
                                        <button
                                            className="p-2 border border-gray-300 rounded-2xl hover:bg-gray-100"
                                            onClick={sendMessage}
                                        >
                                            입력
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    }></Route>
                </Routes>
            </BrowserRouter>
        );
    }
;

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App/>);

export default App;