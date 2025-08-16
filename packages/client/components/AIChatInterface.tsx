"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, FileText, Clock, Star, Copy, ThumbsUp, ThumbsDown, RotateCcw, Sparkles } from 'lucide-react';

type MessageSource = {
  fileName: string;
  similarity: number;
};

type Message = {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  sources: MessageSource[];
  confidence?: number;
};

const AIChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'สวัสดีครับ! ผมเป็น AI ผู้ช่วยที่จะช่วยตอบคำถามจากเอกสารของคุณ มีอะไรให้ผมช่วยไหมครับ?',
      timestamp: new Date(),
      sources: []
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [suggestedQuestions] = useState([
    'สรุปข้อมูลยอดขายในไตรมาสนี้',
    'มีข้อมูลเกี่ยวกับ Machine Learning อะไรบ้าง?',
    'แนวโน้มตลาดในอนาคตเป็นอย่างไร?',
    'ข้อมูลลูกค้าในไฟล์ Excel มีอะไรบ้าง?',
    'สรุปจุดสำคัญในเอกสารการประชุม',
    'วิเคราะห์ข้อมูลการเงินล่าสุด'
  ]);

  useEffect(() => {
      timestamp: new Date(),
      sources: []
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
      ,
      sources: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate async AI response (replace with real API call later)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'ตัวอย่างคำตอบจากโมเดล',
        timestamp: new Date(),
        sources: [],
        confidence: 0.89
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const copyMessage = (content: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(content).catch(() => {});
    }
  };

  const MessageBubble = ({ message, isUser = false }: { message: Message; isUser?: boolean }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-600 to-blue-600'
          }`}>
            {isUser ? (
              <User className="w-6 h-6 text-white" />
            ) : (
              <Bot className="w-6 h-6 text-white" />
            )}
          </div>
        </div>

        <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block p-4 rounded-2xl max-w-full ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border shadow-sm'
          }`}>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>

            {!isUser && (
              <div className="mt-3 space-y-3">
                {message.confidence !== undefined && (
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Sparkles className="w-4 h-4" />
                    <span>ความมั่นใจ: {(message.confidence * 100).toFixed(0)}%</span>
                  </div>
                )}

                {message.sources && message.sources.length > 0 && (
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-600 mb-2 font-medium">แหล่งข้อมูล:</div>
                    <div className="space-y-1">
                      {message.sources.map((source: MessageSource, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-xs bg-gray-50 p-2 rounded-lg">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{source.fileName}</span>
                          <span className="text-gray-500">({(source.similarity * 100).toFixed(0)}% ความเกี่ยวข้อง)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 pt-2 border-t">
                  <button 
                    onClick={() => copyMessage(message.content)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="คัดลอก"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="ถูกต้อง">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="ไม่ถูกต้อง">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="ถามใหม่">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
            <Clock className="inline w-3 h-3 mr-1" />
            {new Date(message.timestamp).toLocaleTimeString('th-TH', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // ...component helpers end
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2">ประวัติการสนทนา</h2>
          <button onClick={() => { setMessages([messages[0]]); }} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>เริ่มการสนทนาใหม่</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.slice().reverse().map((m) => (
            <div key={m.id} className="text-sm text-gray-700 p-2 rounded hover:bg-gray-50 cursor-pointer">{m.content.slice(0,80)}{m.content.length>80? '...':''}</div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3 text-sm">คำถามแนะนำ</h3>
          <div className="space-y-2">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="w-full text-left text-sm text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
              <p className="text-gray-600">ถามคำถามเกี่ยวกับเอกสารของคุณ</p>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">1,247 เอกสารพร้อมใช้</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} isUser={message.type === 'user'} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 border-t bg-white">
          <div className="max-w-4xl mx-auto flex items-end space-x-3">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="พิมพ์คำถามของคุณที่นี่..."
              className="flex-1 resize-none h-16 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {isLoading ? 'กำลังส่ง...' : <Send className="w-4 h-4 inline-block" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
