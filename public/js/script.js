const modal = document.getElementById("deleteModal");
const cancelButton = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");
const editModal = document.getElementById("editModal");
const cancelEdit = document.getElementById("cancelEdit");
const confirmEdit = document.getElementById("confirmEdit");
let formToSubmit = null;

document.querySelectorAll(".delete-post-form").forEach((form) => {
  addEventListener("submit", (e) => {
    e.preventDefault();
    formToSubmit = form;
    modal.classList.remove("hidden");
  });
});

function close() {
  modal.classList.add("hidden");
  formToSubmit = null;
}
modal.addEventListener("click", (e) => {
  if (e.target === modal) close();
});
cancelButton.addEventListener("click", (e) => {
  close();
});

confirmDelete.addEventListener("click", (e) => {
  formToSubmit.submit();
  close();
});

const ta = document.getElementById("edit-postContent");

function autoGrow(el) {
  el.style.height = "auto"; // reset
  el.style.height = el.scrollHeight + "px"; // grow
}

autoGrow(ta); // عند تحميل الصفحة (مهم عشان المحتوى القديم)
ta.addEventListener("input", () => autoGrow(ta));
