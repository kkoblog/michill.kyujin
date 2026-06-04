'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const initialFormData = {
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    experience: '',
    desiredJobs: [],
    workPreference: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobOptions = [
    'スタイリスト',
    'アシスタント',
    '白髪ケアカラーリスト',
    'ヘッドスパスパニスト',
    'その他',
  ];

  const experienceOptions = [
    '0~2年',
    '3~5年',
    '6~8年',
    '9~12年',
    '13年以上',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      desiredJobs: checked
        ? [...prev.desiredJobs, value]
        : prev.desiredJobs.filter((job) => job !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setStatus('送信中...');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'エラーが発生しました');
      }

      setStatus('送信が完了しました');
      setFormData(initialFormData);
    } catch (error) {
      setStatus(`送信に失敗しました: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-800 mb-8 inline-block"
        >
          ← 戻る
        </Link>

        <h1 className="text-2xl font-bold mb-8 text-center">応募フォーム</h1>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                姓
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                名
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="例：090-1234-5678"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              メールアドレス（任意）
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="例：example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ①美容師歴
            </label>

            <div className="space-y-2">
              {experienceOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={`experience-${option}`}
                    name="experience"
                    value={option}
                    checked={formData.experience === option}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                    required
                  />
                  <label
                    htmlFor={`experience-${option}`}
                    className="ml-2 text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ②希望職種（複数回答可）
            </label>

            <div className="space-y-2">
              {jobOptions.map((job) => (
                <div key={job} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`job-${job}`}
                    name="desiredJobs"
                    value={job}
                    checked={formData.desiredJobs.includes(job)}
                    onChange={handleJobChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor={`job-${job}`} className="ml-2 text-gray-700">
                    {job}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="workPreference"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              ③働く時間や日数希望などありますか？
            </label>

            <div className="text-sm text-gray-500 mb-2">
              例）
              <ul className="ml-4">
                <li>週3日勤務を希望します</li>
                <li>17時までの勤務を希望します</li>
                <li>土日祝は相談したいです</li>
              </ul>
            </div>

            <textarea
              id="workPreference"
              name="workPreference"
              value={formData.workPreference}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
              placeholder="働ける曜日・時間帯・日数などがあればご記入ください"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              ④勤務に対する不安などはありますか？
            </label>

            <div className="text-sm text-gray-500 mb-2">
              例）
              <ul className="ml-4">
                <li>保育園のお迎えがあるため、17時までの勤務を希望します</li>
                <li>子どもの急な発熱で急なお休みをいただくことがあります</li>
                <li>ブランクがあり、最新のトレンドやカット技術に不安があります</li>
              </ul>
            </div>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="6"
              placeholder="不安なこと・相談したいことがあればご記入ください"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#e24a4a] text-white px-8 py-3 rounded-full w-full hover:bg-[#bd3535] transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </div>

          {status && (
            <div
              className={`text-center ${
                status.includes('完了')
                  ? 'text-green-600'
                  : status.includes('失敗')
                    ? 'text-red-600'
                    : 'text-gray-600'
              }`}
            >
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}