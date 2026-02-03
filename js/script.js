const gallery = document.getElementById("gallery");

async function loadImages() {
  const res = await fetch("api/images");
  const data = await res.json();

  gallery.innerHTML = "";

  data.reverse().forEach(img => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${img.url}">
      <div class="meta">
        <span>${img.date}</span>
        <span>${img.time}</span>
      </div>
    `;

    gallery.appendChild(div);
  });
}

loadImages();
setInterval(loadImages, 8000); // auto refresh every 8 sec
