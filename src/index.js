// Payhip books database - you'll update this via admin panel
let booksDatabase = [
  {
    id: 1,
    title: "Mastering Bloodstrike: Advanced FPS Tactics",
    description: "Become a pro in Bloodstrike with these advanced gaming strategies and techniques",
    url: "https://payhip.com/b/bloodstrike",
    keywords: ["gaming", "fps", "bloodstrike", "shooter", "esports"]
  },
  {
    id: 2,
    title: "Passive Crypto Income: A Beginner's Guide",
    description: "Learn how to generate passive income through cryptocurrency investments",
    url: "https://payhip.com/b/crypto",
    keywords: ["crypto", "bitcoin", "passive income", "investing", "blockchain"]
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    description: "Complete guide to modern web development",
    url: "https://payhip.com/b/webdev",
    keywords: ["web development", "programming", "coding", "javascript", "html"]
  }
];

// HTML Templates
const templates = {
  index: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SITE_NAME}} - URL Shortener</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            width: 100%;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            text-align: center;
        }
        .subtitle {
            color: #666;
            text-align: center;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 500;
        }
        input, textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        input:focus, textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        textarea {
            min-height: 80px;
            resize: vertical;
        }
        .keywords-hint {
            font-size: 12px;
            color: #888;
            margin-top: 4px;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .result {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            display: none;
        }
        .result.show {
            display: block;
        }
        .short-url {
            font-size: 18px;
            color: #667eea;
            word-break: break-all;
            margin-bottom: 10px;
        }
        .copy-btn {
            background: #28a745;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        .api-note {
            margin-top: 30px;
            padding: 15px;
            background: #e8f4fd;
            border-radius: 10px;
            font-size: 14px;
            color: #31708f;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #888;
            font-size: 14px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔗 {{SITE_NAME}}</h1>
        <p class="subtitle">Shorten URLs with smart discovery</p>
        
        <form id="shortenForm">
            <div class="form-group">
                <label for="url">Long URL to shorten</label>
                <input type="url" id="url" name="url" required 
                       placeholder="https://example.com/very-long-url-path">
            </div>
            
            <div class="form-group">
                <label for="keywords">Optional Keywords (comma separated)</label>
                <textarea id="keywords" name="keywords" 
                          placeholder="gaming, fps, crypto, programming"></textarea>
                <div class="keywords-hint">Keywords help match relevant books from our store</div>
            </div>
            
            <button type="submit" class="btn">Generate Short Link</button>
        </form>
        
        <div id="result" class="result">
            <div class="short-url" id="shortUrl"></div>
            <button class="copy-btn" onclick="copyToClipboard()">Copy Link</button>
        </div>
        
        <div class="api-note">
            <strong>API Access:</strong> POST to {{DOMAIN}}/api/create with JSON body:<br>
            <code>{"url": "your-url", "keywords": "optional,keywords"}</code>
        </div>
        
        <div class="footer">
            Every shortened link shows relevant books before redirecting
        </div>
    </div>
    
    <script>
        document.getElementById('shortenForm').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                url: formData.get('url'),
                keywords: formData.get('keywords')
            };
            
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            if (result.success) {
                document.getElementById('shortUrl').textContent = result.shortUrl;
                document.getElementById('result').classList.add('show');
            } else {
                alert('Error: ' + result.error);
            }
        };
        
        function copyToClipboard() {
            const url = document.getElementById('shortUrl').textContent;
            navigator.clipboard.writeText(url).then(() => {
                alert('Copied to clipboard!');
            });
        }
    </script>
</body>
</html>`,

  admin: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - {{SITE_NAME}}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #667eea;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .stat-label {
            font-size: 14px;
            opacity: 0.9;
        }
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        .tab {
            padding: 10px 20px;
            background: #f0f0f0;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
        }
        .tab.active {
            background: #667eea;
            color: white;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #555;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
        }
        .btn-primary {
            background: #667eea;
            color: white;
        }
        .btn-primary:hover {
            background: #5a67d8;
        }
        .btn-danger {
            background: #e53e3e;
            color: white;
        }
        .btn-danger:hover {
            background: #c53030;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #555;
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            border: 2px solid #e1e5e9;
            border-radius: 6px;
            font-size: 14px;
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        .message {
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            display: none;
        }
        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            display: block;
        }
        .message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Admin Panel - {{SITE_NAME}}</h1>
        
        <div id="message" class="message"></div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="totalLinks">0</div>
                <div class="stat-label">Total Short Links</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="totalBooks">0</div>
                <div class="stat-label">Books in Store</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="totalClicks">0</div>
                <div class="stat-label">Total Clicks</div>
            </div>
        </div>
        
        <div class="tabs">
            <button class="tab active" onclick="switchTab('books')">📚 Manage Books</button>
            <button class="tab" onclick="switchTab('links')">🔗 View Links</button>
            <button class="tab" onclick="switchTab('add-book')">➕ Add Book</button>
        </div>
        
        <div id="books-tab" class="tab-content active">
            <div id="booksLoading" class="loading">Loading books...</div>
            <table id="booksTable" style="display: none;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Keywords</th>
                        <th>Payhip URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="booksBody"></tbody>
            </table>
        </div>
        
        <div id="links-tab" class="tab-content">
            <div id="linksLoading" class="loading">Loading links...</div>
            <table id="linksTable" style="display: none;">
                <thead>
                    <tr>
                        <th>Short Code</th>
                        <th>Original URL</th>
                        <th>Matched Book</th>
                        <th>Keywords</th>
                        <th>Clicks</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody id="linksBody"></tbody>
            </table>
        </div>
        
        <div id="add-book-tab" class="tab-content">
            <form id="addBookForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="title">Book Title *</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="url">Payhip URL *</label>
                        <input type="url" id="url" name="url" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="3"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="keywords">Keywords (comma separated) *</label>
                    <input type="text" id="keywords" name="keywords" required 
                           placeholder="gaming, fps, crypto, programming">
                </div>
                
                <button type="submit" class="btn btn-primary">Add Book</button>
            </form>
        </div>
    </div>
    
    <script>
        let books = [];
        let links = [];
        
        async function loadStats() {
            try {
                const [booksRes, linksRes] = await Promise.all([
                    fetch('/api/admin/books'),
                    fetch('/api/admin/links')
                ]);
                
                if (booksRes.ok) {
                    books = await booksRes.json();
                    document.getElementById('totalBooks').textContent = books.length;
                }
                
                if (linksRes.ok) {
                    const data = await linksRes.json();
                    links = data.links || [];
                    document.getElementById('totalLinks').textContent = links.length;
                    document.getElementById('totalClicks').textContent = data.totalClicks || 0;
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }
        
        async function loadBooks() {
            try {
                const response = await fetch('/api/admin/books');
                if (response.ok) {
                    books = await response.json();
                    renderBooksTable();
                }
            } catch (error) {
                console.error('Error loading books:', error);
            }
        }
        
        async function loadLinks() {
            try {
                const response = await fetch('/api/admin/links');
                if (response.ok) {
                    const data = await response.json();
                    links = data.links || [];
                    renderLinksTable();
                }
            } catch (error) {
                console.error('Error loading links:', error);
            }
        }
        
        function renderBooksTable() {
            const tbody = document.getElementById('booksBody');
            tbody.innerHTML = '';
            
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = \`
                    <td>\${book.id}</td>
                    <td><strong>\${book.title}</strong></td>
                    <td>\${book.description || '-'}</td>
                    <td><small>\${book.keywords?.join(', ') || '-'}</small></td>
                    <td><a href="\${book.url}" target="_blank">View</a></td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteBook(\${book.id})">Delete</button>
                    </td>
                \`;
                tbody.appendChild(row);
            });
            
            document.getElementById('booksLoading').style.display = 'none';
            document.getElementById('booksTable').style.display = 'table';
        }
        
        function renderLinksTable() {
            const tbody = document.getElementById('linksBody');
            tbody.innerHTML = '';
            
            links.forEach(link => {
                const row = document.createElement('tr');
                row.innerHTML = \`
                    <td><code>\${link.code}</code></td>
                    <td><a href="\${link.originalUrl}" target="_blank">\${link.originalUrl.substring(0, 50)}...</a></td>
                    <td>\${link.book?.title || 'Random'}</td>
                    <td>\${link.keywords || '-'}</td>
                    <td>\${link.clicks || 0}</td>
                    <td>\${new Date(link.createdAt).toLocaleDateString()}</td>
                \`;
                tbody.appendChild(row);
            });
            
            document.getElementById('linksLoading').style.display = 'none';
            document.getElementById('linksTable').style.display = 'table';
        }
        
        function switchTab(tabName) {
            // Update active tab button
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Show active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName + '-tab').classList.add('active');
            
            // Load data if needed
            if (tabName === 'books') {
                loadBooks();
            } else if (tabName === 'links') {
                loadLinks();
            }
        }
        
        document.getElementById('addBookForm').onsubmit = async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const book = {
                title: formData.get('title'),
                description: formData.get('description'),
                url: formData.get('url'),
                keywords: formData.get('keywords').split(',').map(k => k.trim()).filter(k => k)
            };
            
            try {
                const response = await fetch('/api/admin/books', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(book)
                });
                
                if (response.ok) {
                    showMessage('Book added successfully!', 'success');
                    e.target.reset();
                    loadBooks();
                    loadStats();
                    switchTab('books');
                } else {
                    const error = await response.json();
                    showMessage('Error: ' + (error.error || 'Failed to add book'), 'error');
                }
            } catch (error) {
                showMessage('Network error: ' + error.message, 'error');
            }
        };
        
        async function deleteBook(id) {
            if (!confirm('Are you sure you want to delete this book?')) return;
            
            try {
                const response = await fetch(\`/api/admin/books/\${id}\`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    showMessage('Book deleted successfully!', 'success');
                    loadBooks();
                    loadStats();
                } else {
                    const error = await response.json();
                    showMessage('Error: ' + (error.error || 'Failed to delete book'), 'error');
                }
            } catch (error) {
                showMessage('Network error: ' + error.message, 'error');
            }
        }
        
        function showMessage(text, type) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = 'message ' + type;
            
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 5000);
        }
        
        // Initial load
        loadStats();
        loadBooks();
    </script>
</body>
</html>`,

  discover: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discover - {{SITE_NAME}}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .book-container {
            max-width: 900px;
            width: 100%;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .book-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .book-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .book-description {
            font-size: 16px;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }
        .book-content {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
            padding: 40px;
        }
        .book-cover {
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .book-details h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 24px;
        }
        .book-details p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .book-price {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 20px;
        }
        .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            flex: 1;
            text-decoration: none;
            text-align: center;
        }
        .btn-buy {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .btn-buy:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        .btn-explore {
            background: white;
            color: #667eea;
            border: 2px solid #667eea;
        }
        .btn-explore:hover {
            background: #f8f9fa;
        }
        
        /* Overlay Controls */
        .overlay-controls {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            gap: 15px;
            z-index: 1000;
        }
        .overlay-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            flex: 1;
            max-width: 200px;
        }
        .btn-continue {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white;
        }
        .btn-stay {
            background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
            color: white;
        }
        .timer {
            color: white;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
            opacity: 0.8;
        }
        .countdown {
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            .book-content {
                grid-template-columns: 1fr;
                padding: 20px;
            }
            .book-header {
                padding: 20px;
            }
            .book-title {
                font-size: 22px;
            }
            .overlay-controls {
                flex-direction: column;
                align-items: stretch;
            }
            .overlay-btn {
                max-width: none;
            }
        }
    </style>
</head>
<body>
    <div class="book-container">
        <div class="book-header">
            <h1 class="book-title">{{bookTitle}}</h1>
            <p class="book-description">{{bookDescription}}</p>
        </div>
        
        <div class="book-content">
            <div>
                <iframe src="{{bookUrl}}" style="width:100%; height:500px; border:none; border-radius:10px;"></iframe>
            </div>
            <div class="book-details">
                <h2>About This Book</h2>
                <p>{{bookDescription}}</p>
                <div class="action-buttons">
                    <a href="{{bookUrl}}" target="_blank" class="btn btn-buy">🔍 View Full Details on Payhip</a>
                    <button onclick="showExploreOptions()" class="btn btn-explore">📚 Explore More Books</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="overlay-controls">
        <div style="flex: 1;">
            <button onclick="stayOnPage()" class="overlay-btn btn-stay">⏸️ Stay & Explore</button>
            <div class="timer">Click to remove overlay and browse freely</div>
        </div>
        <div style="flex: 1; text-align: right;">
            <button onclick="continueToOriginal()" class="overlay-btn btn-continue">
                ⏩ Continue to Original Link
            </button>
            <div class="timer">Auto-continue in <span class="countdown">10</span> seconds</div>
        </div>
    </div>
    
    <script>
        let countdown = 10;
        let autoRedirectTimer;
        let overlayTimer;
        
        function startCountdown() {
            const countdownEl = document.querySelector('.countdown');
            
            overlayTimer = setTimeout(() => {
                // Show buttons after 15 seconds
                document.querySelector('.overlay-controls').style.opacity = '1';
                startAutoRedirect();
            }, 5000);
            
            function startAutoRedirect() {
                autoRedirectTimer = setInterval(() => {
                    countdown--;
                    countdownEl.textContent = countdown;
                    
                    if (countdown <= 0) {
                        continueToOriginal();
                    }
                }, 1000);
            }
        }
        
        function continueToOriginal() {
            clearTimeout(overlayTimer);
            clearInterval(autoRedirectTimer);
            window.location.href = '{{originalUrl}}';
        }
        
        function stayOnPage() {
            clearTimeout(overlayTimer);
            clearInterval(autoRedirectTimer);
            document.querySelector('.overlay-controls').style.display = 'none';
        }
        
        function showExploreOptions() {
            alert('More books coming soon! Currently showing: ' + '{{bookTitle}}');
        }
        
        // Start countdown when page loads
        window.onload = startCountdown;
        
        // Prevent right-click context menu
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Prevent keyboard shortcuts for refresh
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R')) {
                e.preventDefault();
            }
        });
    </script>
</body>
</html>`
};

// Utility functions
function generateShortCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function normalizeString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ');
}

async function findRelevantBook(keywords, originalUrl) {
  try {
    // Try AI matching first
    const aiKeywords = await getAIKeywords(originalUrl, keywords);
    const searchTerms = aiKeywords ? aiKeywords.split(',') : 
                        keywords ? keywords.split(',') : [];
    
    let bestMatch = null;
    let bestScore = 0;
    
    for (const book of booksDatabase) {
      let score = 0;
      const bookText = normalizeString(book.title + ' ' + book.description + ' ' + book.keywords.join(' '));
      
      for (const term of searchTerms) {
        const normalizedTerm = normalizeString(term);
        if (bookText.includes(normalizedTerm)) {
          score += normalizedTerm.length * 2;
        }
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = book;
      }
    }
    
    // Return best match or random book if no good match
    if (bestScore > 10) {
      return bestMatch;
    } else {
      return booksDatabase[Math.floor(Math.random() * booksDatabase.length)];
    }
    
  } catch (error) {
    console.error('AI matching failed:', error);
    // Fallback to fuzzy match
    return fuzzyMatchBook(keywords);
  }
}

async function getAIKeywords(url, userKeywords) {
  if (userKeywords) return userKeywords;
  
  try {
    // Fetch page content
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract title and description (simplified)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    
    let text = '';
    if (titleMatch) text += titleMatch[1] + ' ';
    if (descriptionMatch) text += descriptionMatch[1];
    
    if (!text.trim()) return null;
    
    // Use Pollinations.ai for keyword extraction
    const encodedText = encodeURIComponent(`Extract 5 main keywords from this text, comma separated: ${text}`);
    const aiResponse = await fetch(`https://text.pollinations.ai/${encodedText}`);
    
    if (aiResponse.ok) {
      const keywords = await aiResponse.text();
      return keywords.trim();
    }
    
    return null;
  } catch (error) {
    console.error('Error getting AI keywords:', error);
    return null;
  }
}

function fuzzyMatchBook(keywords) {
  if (!keywords) {
    return booksDatabase[Math.floor(Math.random() * booksDatabase.length)];
  }
  
  const searchTerms = keywords.split(',').map(k => normalizeString(k.trim()));
  let bestMatch = booksDatabase[0];
  let bestScore = 0;
  
  for (const book of booksDatabase) {
    let score = 0;
    const bookText = normalizeString(book.title + ' ' + book.description);
    
    for (const term of searchTerms) {
      if (bookText.includes(term)) {
        score += term.length;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = book;
    }
  }
  
  return bestScore > 0 ? bestMatch : booksDatabase[Math.floor(Math.random() * booksDatabase.length)];
}

function renderTemplate(template, data) {
  let html = templates[template];
  for (const [key, value] of Object.entries(data)) {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return html;
}

// Main worker handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Helper to check admin auth
    const checkAdminAuth = (request) => {
      const auth = request.headers.get('Authorization');
      if (!auth || !auth.startsWith('Basic ')) return false;
      
      const credentials = atob(auth.slice(6)).split(':');
      return credentials[0] === env.ADMIN_USERNAME && 
             credentials[1] === env.ADMIN_PASSWORD;
    };
    
    // Routes
    if (path === '/' || path === '') {
      // Home page with URL shortener form
      const html = renderTemplate('index', {
        SITE_NAME: env.SITE_NAME || 'Advay Link',
        DOMAIN: env.DOMAIN || url.origin
      });
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    else if (path === '/admin') {
      // Admin panel (protected)
      if (!checkAdminAuth(request)) {
        return new Response('Unauthorized', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Admin Access"'
          }
        });
      }
      
      const html = renderTemplate('admin', {
        SITE_NAME: env.SITE_NAME || 'Advay Link'
      });
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    else if (path === '/api/create' && request.method === 'POST') {
      // Create short link API
      try {
        const data = await request.json();
        const { url: originalUrl, keywords } = data;
        
        if (!originalUrl) {
          return new Response(JSON.stringify({
            success: false,
            error: 'URL is required'
          }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        
        // Find relevant book
        const book = await findRelevantBook(keywords, originalUrl);
        
        // Generate short code
        const code = generateShortCode();
        
        // Store in KV
        await env.URL_STORE.put(code, JSON.stringify({
          originalUrl,
          bookId: book.id,
          keywords,
          createdAt: Date.now(),
          clicks: 0
        }));
        
        const shortUrl = `${env.DOMAIN || url.origin}/${code}`;
        
        return new Response(JSON.stringify({
          success: true,
          shortUrl,
          code,
          matchedBook: book.title
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }
    
    else if (path.startsWith('/api/admin/')) {
      // Admin API endpoints
      if (!checkAdminAuth(request)) {
        return new Response('Unauthorized', { status: 401 });
      }
      
      if (path === '/api/admin/books' && request.method === 'GET') {
        return new Response(JSON.stringify(booksDatabase), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      else if (path === '/api/admin/books' && request.method === 'POST') {
        try {
          const book = await request.json();
          book.id = booksDatabase.length + 1;
          booksDatabase.push(book);
          
          // In a real app, you'd store this in KV
          // await env.URL_STORE.put('books', JSON.stringify(booksDatabase));
          
          return new Response(JSON.stringify({ success: true, book }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      else if (path.match(/^\/api\/admin\/books\/\d+$/) && request.method === 'DELETE') {
        const id = parseInt(path.split('/').pop());
        booksDatabase = booksDatabase.filter(book => book.id !== id);
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      else if (path === '/api/admin/links' && request.method === 'GET') {
        try {
          const keys = await env.URL_STORE.list();
          const links = [];
          let totalClicks = 0;
          
          for (const key of keys.keys) {
            const data = await env.URL_STORE.get(key.name);
            if (data) {
              const link = JSON.parse(data);
              link.code = key.name;
              link.book = booksDatabase.find(b => b.id === link.bookId);
              links.push(link);
              totalClicks += link.clicks || 0;
            }
          }
          
          return new Response(JSON.stringify({ links, totalClicks }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      return new Response('Not Found', { status: 404 });
    }
    
    else if (path.length === 7 && path.startsWith('/')) {
      // Short link redirect (6 character code + leading slash)
      const code = path.slice(1);
      
      try {
        const data = await env.URL_STORE.get(code);
        
        if (!data) {
          return new Response('Link not found', { status: 404 });
        }
        
        const linkData = JSON.parse(data);
        
        // Update click count
        linkData.clicks = (linkData.clicks || 0) + 1;
        await env.URL_STORE.put(code, JSON.stringify(linkData));
        
        // Find the book
        const book = booksDatabase.find(b => b.id === linkData.bookId) || 
                    booksDatabase[Math.floor(Math.random() * booksDatabase.length)];
        
        // Render discovery page
        const html = renderTemplate('discover', {
          bookTitle: book.title,
          bookDescription: book.description,
          bookUrl: book.url,
          originalUrl: linkData.originalUrl,
          SITE_NAME: env.SITE_NAME || 'Advay Link'
        });
        
        return new Response(html, {
          headers: { 'Content-Type': 'text/html' }
        });
        
      } catch (error) {
        return new Response('Error loading link', { status: 500 });
      }
    }
    
    // 404 for unknown routes
    return new Response('Not Found', { status: 404 });
  }
};
