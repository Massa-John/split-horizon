'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/contacts`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data || []);
      if (data && data.length > 0) {
        setSelectedContact(data[0]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts');
      // Fallback to default contacts
      setContacts([
        { id: 1, name: 'Алина', status: 'online', online: true, lastMessage: 'Привет! Как ты?', avatar: 'A' },
        { id: 2, name: 'Марк', status: 'away', online: false, lastMessage: 'Скину фото проекта', avatar: 'M' },
        { id: 3, name: 'Соня', status: 'online', online: true, lastMessage: 'Встречаемся в 18:00', avatar: 'S' },
        { id: 4, name: 'Павел', status: 'offline', online: false, lastMessage: 'Ответил на почту', avatar: 'P' },
        { id: 5, name: 'Ева', status: 'online', online: true, lastMessage: 'Нужно обсудить макет', avatar: 'E' },
        { id: 6, name: 'Илья', status: 'busy', online: false, lastMessage: 'Проверяю документы', avatar: 'I' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (contactId) => {
    try {
      const response = await fetch(`${API_URL}/api/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const allMessages = await response.json();
      setMessages(allMessages || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      // Fallback to default messages
      setMessages([
        { id: 1, sender: 'them', senderId: contactId, text: 'Привет! Как твои планы на сегодня?' },
        { id: 2, sender: 'me', senderId: 1, text: 'Отлично. Я уже сделал первые наброски интерфейса.' },
        { id: 3, sender: 'them', senderId: contactId, text: 'Круто! Давай посмотрим на цветовую палитру и общую структуру.' },
        { id: 4, sender: 'me', senderId: 1, text: 'Согласен. Я хочу, чтобы всё выглядело дружелюбно и современно.' },
        { id: 5, sender: 'them', senderId: contactId, text: 'Потом добавим пару мягких анимаций и настроим список контактов.' },
      ]);
    }
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    fetchMessages(contact.id);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedContact) return;

    try {
      const newMessage = {
        senderId: 1,
        receiverId: selectedContact.id,
        text: messageText,
        time: new Date().toLocaleTimeString(),
      };

      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        setMessageText('');
        fetchMessages(selectedContact.id);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const getStatusClass = (status) => {
    const statusMap = {
      online: 'blue',
      away: 'sky',
      busy: 'cyan',
      offline: 'navy',
    };
    return statusMap[status] || 'blue';
  };

  return (
    <main className="page-shell">
      <div className="app-window">
        <aside className="sidebar panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Мессенджер</p>
              <h1>Чаты</h1>
            </div>
            <button className="add-button" aria-label="Добавить контакт">
              +
            </button>
          </div>

          <label className="search-box" aria-label="Поиск абонента">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Поиск абонента" />
          </label>

          {error && <div style={{ padding: '12px', color: '#ff6b6b', fontSize: '12px' }}>⚠️ {error}</div>}

          <div className="contacts-panel">
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#90b2dd' }}>Загрузка контактов...</div>
            ) : contacts.length > 0 ? (
              contacts.map((contact) => (
                <button
                  key={contact.id}
                  className={`contact-card ${selectedContact?.id === contact.id ? 'active' : ''}`}
                  type="button"
                  onClick={() => handleContactSelect(contact)}
                >
                  <div className={`avatar ${getStatusClass(contact.status)}`}>{contact.avatar || contact.name[0]}</div>
                  <div className="contact-body">
                    <div className="contact-meta">
                      <strong>{contact.name}</strong>
                      <span className={`status ${contact.status}`} />
                    </div>
                    <p>{contact.lastMessage}</p>
                  </div>
                </button>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#90b2dd' }}>Нет контактов</div>
            )}
          </div>
        </aside>

        <section className="chat-panel panel">
          {selectedContact ? (
            <>
              <header className="chat-header">
                <div className="chat-user">
                  <div className={`avatar ${getStatusClass(selectedContact.status)}`}>
                    {selectedContact.avatar || selectedContact.name[0]}
                  </div>
                  <div>
                    <h2>{selectedContact.name}</h2>
                    <span>{selectedContact.status}</span>
                  </div>
                </div>
                <div className="header-actions">
                  <button type="button">☎</button>
                  <button type="button">⋯</button>
                </div>
              </header>

              <div className="chat-messages">
                {messages.length > 0 ? (
                  messages.map((message, index) => {
                    const isMine = message.senderId === 1 || message.sender === 'me';
                    return (
                      <div key={index} className={`message-row ${isMine ? 'me' : 'them'}`}>
                        <div className="message-bubble">{message.text}</div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#90b2dd' }}>
                    Нет сообщений
                  </div>
                )}
              </div>

              <div className="composer">
                <button type="button" className="emoji-button">☺</button>
                <input
                  type="text"
                  placeholder="Напишите сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button type="button" className="send-button" onClick={handleSendMessage}>
                  Отправить
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#90b2dd' }}>
              Выберите контакт
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
