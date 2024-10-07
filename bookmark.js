const bookmarkList = document.getElementById('bookmarkList');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');


addBookmarkBtn.addEventListener('click', addBookmark);


function addBookmark() {
  const name = document.getElementById('bookmarkName').value;
  const url = document.getElementById('bookmarkURL').value;

  if (name === '' || url === '') {
    alert('Please fill in both fields');
    return;
  }

  const bookmark = {
    name: name,
    url: url
  };

  
  let bookmarks = [];
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  
  document.getElementById('bookmarkName').value = '';
  document.getElementById('bookmarkURL').value = '';

  
  renderBookmarks();
}


function renderBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarkList.innerHTML = '';

  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
      <button class="delete-btn" onclick="deleteBookmark(${index})">Delete</button>
    `;
    bookmarkList.appendChild(li);
  });
}


function deleteBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
}


renderBookmarks();