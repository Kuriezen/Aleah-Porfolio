// Loads each section from /sections into its placeholder:
//   <div data-include="sections/about.html"></div>
// The placeholder is replaced by the file's content, so no extra wrapper is left.
export async function loadIncludes() {
  const slots = [...document.querySelectorAll("[data-include]")];

  await Promise.all(
    slots.map(async (slot) => {
      const url = slot.getAttribute("data-include");
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const template = document.createElement("template");
        template.innerHTML = await res.text();
        slot.replaceWith(template.content);
      } catch (err) {
        console.error(`Could not load ${url}:`, err);
        slot.remove();
      }
    })
  );

  // Sections arrive after the browser tried to jump to #anchor, so jump now
  if (location.hash) {
    document.querySelector(location.hash)?.scrollIntoView();
  }
}
