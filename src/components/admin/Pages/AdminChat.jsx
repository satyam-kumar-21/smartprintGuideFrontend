import React, { useState } from 'react';
import { Search, Send, User, MoreVertical, Phone, Video } from 'lucide-react';

const AdminChat = () => {
    // Dummy Chat Data
    const [chats] = useState([
        { id: 1, name: 'Sarah Connor', lastMsg: 'When will my order arrive?', time: '10:30 AM', unread: 2, status: 'online' },
        { id: 2, name: 'John Wick', lastMsg: 'I need to return this item.', time: 'Yesterday', unread: 0, status: 'offline' },
        { id: 3, name: 'Ellen Ripley', lastMsg: 'Thanks for the quick response!', time: 'Yesterday', unread: 0, status: 'busy' },
    ]);

    const [activeChat, setActiveChat] = useState(chats[0]);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'user', text: 'Hi, I have a question about my order.', time: '10:28 AM' },
        { id: 2, sender: 'admin', text: 'Hello Sarah! Sure, I can help with that. What is your order ID?', time: '10:29 AM' },
        { id: 3, sender: 'user', text: 'It is ORD-7782. When will it arrive?', time: '10:30 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, {
            id: messages.length + 1,
            sender: 'admin',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setNewMessage('');
    };

    return (
        <div className="flex h-[calc(100vh-100px)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={`p-4 flex gap-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 ${activeChat.id === chat.id ? 'bg-blue-50/50' : ''}`}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                    {chat.name.charAt(0)}
                                </div>
                                <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${chat.status === 'online' ? 'bg-green-500' :
                                        chat.status === 'busy' ? 'bg-red-500' : 'bg-slate-400'
                                    }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-sm text-slate-900 truncate">{chat.name}</h4>
                                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{chat.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate mt-0.5">{chat.lastMsg}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="flex flex-col justify-center">
                                    <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                        {chat.unread}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/30">
                {/* Chat Header */}
                <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                {activeChat.name.charAt(0)}
                            </div>
                            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${activeChat.status === 'online' ? 'bg-green-500' :
                                    activeChat.status === 'busy' ? 'bg-red-500' : 'bg-slate-400'
                                }`} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">{activeChat.name}</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                {activeChat.status === 'online' ? 'Active now' : 'Last seen recently'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <button className="p-2 hover:bg-slate-100 rounded-full"><Phone size={18} /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-full"><Video size={18} /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-full"><MoreVertical size={18} /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.sender === 'admin'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                                }`}>
                                <p>{msg.text}</p>
                                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'admin' ? 'text-blue-100' : 'text-slate-400'}`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-shadow shadow-md"
                        >
                            <Send size={18} className="translate-x-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminChat;
