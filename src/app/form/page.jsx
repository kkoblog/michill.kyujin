"use client";
import React from 'react';
import Link from 'next/link';

export default function ApplicationForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // フォームの送信処理をここに実装
    console.log('フォーム送信');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <Link 
          href="/" 
          className="inline-block mb-6 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← 戻る
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          応募フォーム
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 既存のフォーム要素 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D3B58D] focus:border-[#D3B58D]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D3B58D] focus:border-[#D3B58D]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D3B58D] focus:border-[#D3B58D]"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              美容師経験年数
            </label>
            <select
              id="experience"
              name="experience"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D3B58D] focus:border-[#D3B58D]"
            >
              <option value="">選択してください</option>
              <option value="0-3">0-3年</option>
              <option value="4-7">4-7年</option>
              <option value="8-10">8-10年</option>
              <option value="11+">11年以上</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              志望動機
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D3B58D] focus:border-[#D3B58D]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300"
          >
            送信する
          </button>
        </form>
      </div>
    </div>
  );
} 