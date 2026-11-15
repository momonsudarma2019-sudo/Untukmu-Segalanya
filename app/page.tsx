"use client";

import { useState } from "react";
import { Music, Sparkles } from "lucide-react";

export default function HomePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    recipientName: "",
    senderName: "",
    whatsapp: "",
    occasion: "Ulang Tahun",
    genre: "Pop Akustik",
    story: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-slate-800 p-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 font-bold text-2xl text-rose-600 mb-2">
            <Music className="w-8 h-8" />
            <span>Lagu Ini Untukmu</span>
          </div>
          <p className="text-slate-600 text-sm">
            Buat lagu kustom spesial untuk orang tersayang dengan mudah.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-rose-100 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
            <h2 className="text-xl font-bold text-slate-900">Pesanan Berhasil Dibuat!</h2>
            <p className="text-sm text-slate-600">
              Terima kasih, <b>{form.senderName}</b>. Cerita untuk <b>{form.recipientName}</b> telah kami terima dan akan segera diproses ke tahap pembuatan lagu.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-rose-600 text-sm font-semibold underline hover:text-rose-700"
            >
              Buat pesanan lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-rose-100 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nama Penerima Lagu</label>
              <input
                type="text"
                required
                placeholder="Misal: Dinda"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={form.recipientName}
                onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Nama Pengirim (Kamu)</label>
              <input
                type="text"
                required
                placeholder="Nama kamu"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={form.senderName}
                onChange={(e) => setForm({ ...form, senderName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1">Momen</label>
                <select
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm bg-white"
                  value={form.occasion}
                  onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                >
                  <option>Ulang Tahun</option>
                  <option>Anniversary</option>
                  <option>Pernikahan</option>
                  <option>Ungkapan Cinta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Genre</label>
                <select
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm bg-white"
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                >
                  <option>Pop Akustik</option>
                  <option>Ballad Piano</option>
                  <option>Indie Folk</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Cerita & Pesan Spesial</label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan kenangan atau pesan singkat..."
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Nomor WhatsApp</label>
              <input
                type="tel"
                required
                placeholder="08123456789"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Lanjut ke Pesanan
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
