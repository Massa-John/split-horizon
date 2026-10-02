const contacts = [
  { name: 'Алина', status: 'online', lastMessage: 'Привет! Как ты?', accent: 'blue' },
  { name: 'Марк', status: 'away', lastMessage: 'Скину фото проекта', accent: 'sky' },
  { name: 'Соня', status: 'online', lastMessage: 'Встречаемся в 18:00', accent: 'cyan' },
  { name: 'Павел', status: 'offline', lastMessage: 'Ответил на почту', accent: 'navy' },
  { name: 'Ева', status: 'online', lastMessage: 'Нужно обсудить макет', accent: 'blue' },
  { name: 'Илья', status: 'busy', lastMessage: 'Проверяю документы', accent: 'sky' },
];

const messages = [
  { sender: 'them', text: 'Привет! Как твои планы на сегодня?' },
  { sender: 'me', text: 'Отлично. Я уже сделал первые наброски интерфейса.' },
  { sender: 'them', text: 'Круто! Давай посмотрим на цветовую палитру и общую структуру.' },
  { sender: 'me', text: 'Согласен. Я хочу, чтобы всё выглядело дружелюбно и современно.' },
  { sender: 'them', text: 'Потом добавим пару мягких анимаций и настроим список контактов.' },
];

export default function Home() {
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

          <div className="contacts-panel">
            {contacts.map((contact) => (
              <button key={contact.name} className="contact-card" type="button">
                <div className={`avatar ${contact.accent}`}>{contact.name[0]}</div>
                <div className="contact-body">
                  <div className="contact-meta">
                    <strong>{contact.name}</strong>
                    <span className={`status ${contact.status}`} />
                  </div>
                  <p>{contact.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="chat-panel panel">
          <header className="chat-header">
            <div className="chat-user">
              <div className="avatar blue">А</div>
              <div>
                <h2>Алина</h2>
                <span>online</span>
              </div>
            </div>
            <div className="header-actions">
              <button type="button">☎</button>
              <button type="button">⋯</button>
            </div>
          </header>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message-row ${message.sender}`}>
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}
          </div>

          <div className="composer">
            <button type="button" className="emoji-button">☺</button>
            <input type="text" placeholder="Напишите сообщение..." />
            <button type="button" className="send-button">Отправить</button>
          </div>
        </section>
      </div>
    </main>
  );
}
