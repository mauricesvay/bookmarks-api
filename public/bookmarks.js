function getLinks() {
  return window.fetch("/api/links").then(function (response) {
    return response.json();
  });
}

function addLink(url) {
  const formData = new FormData();
  formData.append("url", url);
  return window
    .fetch("/api/links", {
      method: "POST",
      body: new URLSearchParams(formData),
    })
    .then(function (response) {
      return response.json();
    });
}

function deleteLink(id) {
  return window
    .fetch(`/api/links/${id}`, {
      method: "DELETE",
    })
    .then(function (response) {
      return response.json();
    });
}

const formEl = document.querySelector("#links-form");
const urlEl = document.querySelector("#url");
formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = urlEl.value;
  addLink(url).then(() => {
    urlEl.value = "";
    getLinks().then((data) => renderList(data.data));
  });
});

const renderList = (links) => {
  const listEl = document.querySelector("#list");
  const html = links
    .map(function (link) {
      return `
<tr>
  <td>${link.id}</td>
  <td><a href="${link.url}">${link.url}</a></td>
  <td>${link.createdAt}</td>
  <td>
    <button type="button" data-action="delete" data-id="${link.id}">Delete</button>
  </td>
</tr>`;
    })
    .reverse()
    .join("\n");
  listEl.innerHTML = html;
};

getLinks().then((data) => renderList(data.data));

const timer = setInterval(
  () => getLinks().then((data) => renderList(data.data)),
  10000,
);
const listEl = document.querySelector("#list");
listEl.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  if (id && action === "delete") {
    deleteLink(id).then(() => getLinks().then((data) => renderList(data.data)));
  }
});
