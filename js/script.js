const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

async function loadImages() {
  try {

    const res = await fetch(
      "https://startknowledge-api.82749sondeep.workers.dev/list"
    );

    const data = await res.json();

    gallery.innerHTML = "";

    data.reverse().forEach(img => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${img.url}" loading="lazy">
        <div class="meta">
          <span>${img.date}</span>
          <span>${img.time}</span>
        </div>
      `;

      // CLICK LARGE VIEW
      card.querySelector("img").onclick = () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.url;
      };

      gallery.appendChild(card);
    });

  } catch (e) {
    console.error("Image load error:", e);
  }
}

// CLOSE LIGHTBOX
lightbox.onclick = () => {
  lightbox.style.display = "none";
};

loadImages();
setInterval(loadImages, 10000);
