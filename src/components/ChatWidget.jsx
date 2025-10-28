import React, { useEffect, useMemo, useRef, useState } from 'react';
import NormalImg from '../assets/Normal.PNG';
import FlyingImg from '../assets/Flying.PNG';
import ChatboxImg from '../assets/chatbox.png';
import LubiSound from '../assets/Lubi-sound.m4a';
import { getTopics, selectTopic, sendMessage } from '../services/chat';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/chat-widget.css';
import { Select } from 'antd';
import 'antd/dist/reset.css';

// Simple floating chat widget overlay
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState({}); // {key: description}
  const [selectedTopic, setSelectedTopic] = useState('');
  const [messages, setMessages] = useState([]); // {role: 'user'|'ai'|'system', text}
  const [error, setError] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const [hasGreeted, setHasGreeted] = useState(false);
  const bodyRef = useRef(null);
  // Track whether the user is actively scrolling (vs. just being at a scrolled position)
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const lubiAudioRef = useRef(null);

  // Friendly Vietnamese labels for known topic keys
  const TOPIC_LABELS = {
    company: 'Về chúng tôi',
    products: 'Về sản phẩm',
    order: 'Đặt hàng',
    shipping: 'Vận chuyển',
    payment: 'Thanh toán',
    contact: 'Liên hệ',
    sustainability: 'Bền vững',
    feedback: 'Góp ý',
    default: 'Tổng quan',
  };

  // Matching Material icon for each topic
  const TOPIC_ICONS = {
    company: 'apartment',
    products: 'shopping_bag',
    order: 'shopping_cart',
    shipping: 'local_shipping',
    payment: 'credit_card',
    contact: 'call',
    sustainability: 'eco',
    feedback: 'rate_review',
    default: 'help',
  };

  const topicKeys = useMemo(() => Object.keys(topics), [topics]);

  useEffect(() => {
    if (!open) return;
    // Lazy-load topics when the widget opens
    (async () => {
      try {
        setLoading(true);
        setError('');
        const t = await getTopics();
        setTopics(t || {});
      } catch (e) {
        setError(e?.message || 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  useEffect(() => {
    // Send a one-time greeting when the widget first opens
    if (open && !hasGreeted) {
      setMessages((prev) => ([
        ...prev,
        { role: 'system', text: 'Vui lòng chọn chủ đề!' },
      ]));
      setHasGreeted(true);
    }
  }, [open, hasGreeted]);

  useEffect(() => {
    // Ask permission for browser notifications once when opened
    if (open && typeof Notification !== 'undefined' && Notification.permission === 'default') {
      try { Notification.requestPermission(); } catch { /* ignore */ }
    }
  }, [open]);

  // Keep input focused when widget is open
  useEffect(() => {
    if (!open) return;
    const focus = () => inputRef.current?.focus();
    // Delay slightly to ensure element is rendered/enabled
    const t = setTimeout(focus, 0);
    return () => clearTimeout(t);
  }, [open]);

  // Refocus after bot finishes typing or after selecting topic
  useEffect(() => {
    if (open && !isBotTyping) {
      inputRef.current?.focus();
    }
  }, [isBotTyping, open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [selectedTopic, open]);

  useEffect(() => {
    // Auto scroll to bottom on new messages
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Show Flying image while the user is actively scrolling within the app's main scroll container; revert shortly after stop
  useEffect(() => {
    const appScrollEl = document.querySelector('.app-scroll');
    const target = appScrollEl || window;

    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 400);
    };

    target.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      setShowTeaser(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


  // Auto-hide the teaser after ~30s or when panel opens
  useEffect(() => {
    if (!showTeaser || open) return;
    const tm = setTimeout(() => setShowTeaser(false), 30000);
    return () => clearTimeout(tm);
  }, [showTeaser, open]);

  async function handleSelectTopic(key) {
    try {
      setLoading(true);
      setError('');
      const ack = await selectTopic(key);
      setSelectedTopic(key);
      setMessages((prev) => ([...prev, { role: 'system', text: String(ack) }]));
    } catch (e) {
      setError(e?.message || 'Failed to select topic');
      setMessages((prev) => ([...prev, { role: 'ai', text: '- Lubot đang bận, bạn vui lòng liên hệ lại nhé!' }]));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);


  async function handleSend(ev) {
    ev?.preventDefault?.();
    if (!selectedTopic) {
      setError('Please select a topic first.');
      return;
    }
    const text = inputRef.current?.value || '';
    if (!text.trim()) return;

    // Optimistic UI update
    setMessages((prev) => ([...prev, { role: 'user', text }]));
    inputRef.current.value = '';

    try {
      setLoading(true);
      setError('');
      setIsBotTyping(true);
      const reply = await sendMessage(text);
      setMessages((prev) => ([...prev, { role: 'ai', text: String(reply) }]));
      setIsBotTyping(false);
      // Refocus after bot reply
      inputRef.current?.focus();

      // Optional notify when widget is closed
      try {
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && !open) {
          new Notification('GreenShield Assistant', { body: 'Bot đã phản hồi tin nhắn của bạn.' });
        }
      } catch { /* ignore */ }
    } catch (e) {
      setError(e?.message || 'Failed to send message');
      // Graceful bot reply on error (e.g., 400/503)
      setMessages((prev) => ([...prev, { role: 'ai', text: '- Lubot đang bận, bạn vui lòng liên hệ lại nhé!' }]));
    } finally {
      setLoading(false);
      setIsBotTyping(false);
      // Ensure focus returns to input even if request failed
      inputRef.current?.focus();
    }
  }

  // Close when clicking outside the panel (since overlay doesn't capture clicks now)
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const panel = panelRef.current;
      if (!panel) return;
      // Ignore clicks inside Antd Select dropdown belonging to this widget
      const inSelectDropdown = e.target?.closest?.('.cwp-select-dropdown');
      if (inSelectDropdown) return;

      if (!panel.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  return (
    <>
      {/* Floating open button (hide when panel is open) */}
      {!open && showButton && (
        <button
          type="button"
          aria-label="Open chat"
          className="chat-widget-button"
          onClick={() => {
            setOpen(true);
            setShowTeaser(false);

            // 🔊 Play Lubi sound mỗi lần mở chat
            try {
              let audio = lubiAudioRef.current;
              if (!audio) {
                audio = new Audio(LubiSound);
                audio.preload = 'auto';
                audio.volume = 0.6;
                lubiAudioRef.current = audio;
              }
              audio.currentTime = 0;
              const playPromise = audio.play();
              if (playPromise && typeof playPromise.then === 'function') {
                playPromise.catch(() => {
                  // nếu bị chặn autoplay thì phát lại khi user click
                  const unlock = () => {
                    try {
                      audio.currentTime = 0;
                      audio.play().catch(() => { });
                    } catch { /* ignore */}
                  };
                  window.addEventListener('pointerdown', unlock, { once: true });
                  window.addEventListener('keydown', unlock, { once: true });
                  window.addEventListener('touchstart', unlock, { once: true });
                });
              }
            } catch (err) {
              console.warn('Cannot play Lubi sound', err);
            }
          }}
        >
          {showTeaser && (
            <div className="chat-widget-teaser" aria-hidden>
              Bạn cần gì đó có <strong>Lubi</strong> lo!
            </div>
          )}
          <img
            src={isScrolling ? FlyingImg : NormalImg}
            alt="Open chat"
            className="chat-widget-icon"
            draggable={false}
          />

        </button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Outside click overlay (sibling) */}
            <Motion.div
              key="overlay"
              className="cwp-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
            <Motion.div
              key="panel"
              className="chat-widget-panel"
              role="dialog"
              aria-label="Chat widget"
              aria-modal="false"
              initial={{ opacity: 0, x: -28, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -18, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ transformOrigin: 'right bottom' }}
              ref={panelRef}
            >
              {/* Mascot image floating above the panel */}
              <img
                src={ChatboxImg}
                alt=""
                className="cwp-mascot"
                aria-hidden
                draggable={false}
              />
              <div className="cwp-inner">
                <div className="cwp-header">
                  <div className="cwp-title">
                    Lubot
                  </div>
                  <button className="cwp-x" onClick={() => setOpen(false)} aria-label="Close">
                    <span className="material-symbols-rounded" aria-hidden>close</span>
                  </button>
                </div>

                <div className="cwp-topics">
                  {loading && topicKeys.length === 0 && (
                    <div className="cwp-hint">Loading topics…</div>
                  )}
                  {error && (
                    <div className="cwp-error" role="alert">{error}</div>
                  )}
                  {topicKeys.length > 0 && (
                    <Select
                      className="cwp-select"
                      placeholder="Chọn chủ đề…"
                      value={selectedTopic || undefined}
                      onChange={(val) => handleSelectTopic(val)}
                      disabled={loading}
                      loading={loading}
                      size="middle"
                      popupClassName="cwp-select-dropdown"
                      options={topicKeys.map((key) => ({
                        value: key,
                        label: (
                          <span className="cwp-opt" title={TOPIC_LABELS[key] || key}>
                            <span className="material-symbols-rounded cwp-opt-ic" aria-hidden>
                              {TOPIC_ICONS[key] || TOPIC_ICONS.default}
                            </span>
                            {TOPIC_LABELS[key] || key}
                          </span>
                        ),
                      }))}
                    />
                  )}
                </div>

                <div className="cwp-body" ref={bodyRef}>
                  {messages.length === 0 ? (
                    <div className="cwp-empty">Select a topic, then ask me anything.</div>
                  ) : (
                    <ScrollToBottom className="cwp-scroll">
                      <ul className="cwp-messages">
                        {messages.map((m, i) => {
                          // System notice centered outside bubbles
                          if (m.role === 'system') {
                            return (
                              <li key={i} className="cwp-notice">
                                <span>{m.text}</span>
                              </li>
                            );
                          }

                          // AI message: two rows (logo+name) then content
                          if (m.role === 'ai') {
                            return (
                              <Motion.li
                                key={i}
                                className="msg msg--ai"
                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.22, ease: 'easeOut' }}
                              >
                                <div className="msg-ai">
                                  <div className="msg-ai-head">
                                    <span className="material-symbols-rounded msg-ai-logo" aria-hidden>auto_awesome</span>
                                    <span className="msg-ai-name">Lubot</span>
                                  </div>
                                  <div className="msg-bubble msg-ai-body">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {m.text}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              </Motion.li>
                            );
                          }

                          // User message: regular bubble
                          return (
                            <Motion.li
                              key={i}
                              className="msg msg--user"
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                            >
                              <div className="msg-bubble">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {m.text}
                                </ReactMarkdown>
                              </div>
                            </Motion.li>
                          );
                        })}
                        {isBotTyping && (
                          <li className="msg msg--ai">
                            <div className="msg-bubble typing">
                              <span></span><span></span><span></span>
                            </div>
                          </li>
                        )}
                      </ul>
                    </ScrollToBottom>
                  )}
                </div>

                <form className="cwp-input" onSubmit={handleSend}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={selectedTopic ? 'Type your message…' : 'Select a topic first'}
                    disabled={!selectedTopic || loading}
                    aria-disabled={!selectedTopic || loading}
                  />
                  <button type="submit" disabled={!selectedTopic || loading}>
                    <span className="material-symbols-rounded" aria-hidden>arrow_outward</span>
                  </button>
                </form>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
