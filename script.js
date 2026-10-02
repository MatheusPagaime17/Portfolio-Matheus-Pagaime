document.documentElement.classList.add('js');

const sectionLinks = [...document.querySelectorAll('[data-section]')];
const panels = [...document.querySelectorAll('.panel')];
const validSections = panels.map(panel => panel.id);
const indexDisplay = document.getElementById('top-index');

function showSection(id, updateHistory = false) {
  const selected = validSections.includes(id) ? id : 'inicio';
  const index = validSections.indexOf(selected);

  panels.forEach(panel => {
    const active = panel.id === selected;
    panel.classList.toggle('is-active', active);
    panel.setAttribute('aria-hidden', String(!active));
    panel.inert = !active;
    if (active) panel.scrollTop = 0;
  });

  sectionLinks.forEach(link => {
    const active = link.dataset.section === selected;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  indexDisplay.textContent = `${String(index + 1).padStart(2, '0')} / ${String(validSections.length).padStart(2, '0')}`;
  document.body.dataset.section = selected;
  if (updateHistory && location.hash !== `#${selected}`) history.pushState(null, '', `#${selected}`);
  if (window.matchMedia('(max-width: 760px)').matches) {
    sectionLinks[index].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href').slice(1);
    if (!validSections.includes(id)) return;
    event.preventDefault();
    showSection(id, true);
  });
});

window.addEventListener('popstate', () => showSection(location.hash.slice(1)));
window.addEventListener('hashchange', () => showSection(location.hash.slice(1)));
showSection(location.hash.slice(1));

document.addEventListener('keydown', event => {
  if (!['ArrowDown', 'ArrowUp'].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest('input, textarea, button, select, [contenteditable="true"]')) return;
  const current = validSections.indexOf(document.body.dataset.section);
  const next = (current + (event.key === 'ArrowDown' ? 1 : -1) + validSections.length) % validSections.length;
  event.preventDefault();
  showSection(validSections[next], true);
  sectionLinks[next].focus({ preventScroll: true });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('formulario').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const nome = form.elements.nome.value.trim();
  const mensagem = form.elements.mensagem.value.trim();
  if (!nome || !mensagem) return;
  const texto = `Olá, meu nome é ${nome}. Entrei em contato pelo seu portfólio. ${mensagem}`;
  const url = `https://wa.me/5511977035162?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});
