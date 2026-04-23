const fallbackServices = [
  {
    id: 'fallback-1',
    name: 'Esthétique dentaire',
    slug: 'esthetique-dentaire',
    short_description: 'Sublimez votre sourire avec des soins précis et un rendu naturel.',
    description: 'Solutions esthétiques haut de gamme pour améliorer l’harmonie du sourire, la teinte et la confiance du patient.',
    price: 900,
    duration_minutes: 60,
    image_url: 'assets/images/service-esthetique.svg',
    featured: true,
    sort_order: 1
  },
  {
    id: 'fallback-2',
    name: 'Orthodontie',
    slug: 'orthodontie',
    short_description: 'Alignement moderne et plan de suivi clair pour enfants et adultes.',
    description: 'Traitements orthodontiques pour corriger l’alignement, améliorer le confort et optimiser la santé bucco-dentaire.',
    price: 1200,
    duration_minutes: 45,
    image_url: 'assets/images/service-ortho.svg',
    featured: true,
    sort_order: 2
  },
  {
    id: 'fallback-3',
    name: 'Implantologie',
    slug: 'implantologie',
    short_description: 'Remplacement durable des dents manquantes avec accompagnement personnalisé.',
    description: 'Implants dentaires conçus pour restaurer la fonction mastiquatoire et l’esthétique avec précision.',
    price: 3500,
    duration_minutes: 90,
    image_url: 'assets/images/service-implant.svg',
    featured: true,
    sort_order: 3
  },
  {
    id: 'fallback-4',
    name: 'Prothèses dentaires',
    slug: 'protheses-dentaires',
    short_description: 'Restauration fixe ou amovible pensée pour la fonction et l’esthétique.',
    description: 'Prothèses personnalisées pour retrouver confort, mastication et sourire harmonieux.',
    price: 2400,
    duration_minutes: 75,
    image_url: 'assets/images/service-protheses.svg',
    featured: false,
    sort_order: 4
  },
  {
    id: 'fallback-5',
    name: 'Parodontologie',
    slug: 'parodontologie',
    short_description: 'Prise en charge complète des gencives et des tissus de soutien.',
    description: 'Prévention et traitement des maladies parodontales pour préserver les dents durablement.',
    price: 750,
    duration_minutes: 60,
    image_url: 'assets/images/service-parodontologie.svg',
    featured: false,
    sort_order: 5
  },
  {
    id: 'fallback-6',
    name: 'Pédodontie',
    slug: 'pedodontie',
    short_description: 'Soins dentaires adaptés aux enfants dans un cadre rassurant.',
    description: 'Approche douce et pédagogique pour la prévention, les soins et le suivi des plus jeunes.',
    price: 500,
    duration_minutes: 40,
    image_url: 'assets/images/service-pedodontie.svg',
    featured: false,
    sort_order: 6
  },
  {
    id: 'fallback-7',
    name: 'Blanchiment dentaire',
    slug: 'blanchiment-dentaire',
    short_description: 'Éclaircissement professionnel pour un sourire plus lumineux.',
    description: 'Traitement supervisé pour améliorer la teinte des dents sans négliger le confort du patient.',
    price: 1500,
    duration_minutes: 60,
    image_url: 'assets/images/service-blanchiment.svg',
    featured: false,
    sort_order: 7
  },
  {
    id: 'fallback-8',
    name: 'Chirurgie dentaire',
    slug: 'chirurgie-dentaire',
    short_description: 'Actes de chirurgie avec protocole clair et suivi structuré.',
    description: 'Interventions ciblées réalisées dans un cadre moderne avec information et sécurité.',
    price: 1800,
    duration_minutes: 90,
    image_url: 'assets/images/service-chirurgie.svg',
    featured: false,
    sort_order: 8
  },
  {
    id: 'fallback-9',
    name: 'Soins dentaires',
    slug: 'soins-dentaires',
    short_description: 'Consultations, détartrage, prévention et traitements courants.',
    description: 'Base de la santé bucco-dentaire avec des soins précis et des conseils adaptés au quotidien.',
    price: 400,
    duration_minutes: 45,
    image_url: 'assets/images/service-soins.svg',
    featured: false,
    sort_order: 9
  },
  {
    id: 'fallback-10',
    name: 'Invisalign',
    slug: 'invisalign',
    short_description: 'Alignement discret avec gouttières transparentes et suivi expert.',
    description: 'Solution esthétique pour corriger l’alignement avec un confort élevé et une discrétion maximale.',
    price: 2200,
    duration_minutes: 60,
    image_url: 'assets/images/service-invisalign.svg',
    featured: false,
    sort_order: 10
  }
];

const fallbackGallery = [
  { id: 'g1', title: 'Accueil du cabinet', image_url: 'assets/images/gallery-1.svg', alt_text: 'Accueil élégant du cabinet', sort_order: 1 },
  { id: 'g2', title: 'Salle de soin', image_url: 'assets/images/gallery-2.svg', alt_text: 'Salle de soin moderne', sort_order: 2 },
  { id: 'g3', title: 'Espace consultation', image_url: 'assets/images/gallery-3.svg', alt_text: 'Espace consultation haut de gamme', sort_order: 3 },
  { id: 'g4', title: 'Stérilisation', image_url: 'assets/images/gallery-4.svg', alt_text: 'Zone stérilisation', sort_order: 4 },
  { id: 'g5', title: 'Smile studio', image_url: 'assets/images/gallery-5.svg', alt_text: 'Studio esthétique dentaire', sort_order: 5 },
  { id: 'g6', title: 'Espace enfants', image_url: 'assets/images/gallery-6.svg', alt_text: 'Espace pédodontie', sort_order: 6 }
];

const fallbackReviews = [
  { id: 'r1', patient_name: 'Sara B.', role_label: 'Patiente', rating: 5, comment: 'Cabinet très professionnel, accueil rassurant et réservation simple.' },
  { id: 'r2', patient_name: 'Yassine M.', role_label: 'Patient', rating: 5, comment: 'Le suivi est sérieux, les horaires sont respectés et le résultat est top.' },
  { id: 'r3', patient_name: 'Nadia A.', role_label: 'Patiente', rating: 5, comment: 'Design moderne, équipe à l’écoute et explications claires avant chaque séance.' }
];

const fallbackOffice = {
  name: 'Kerviqo Dentaire',
  tagline: 'Cabinet dentaire moderne et humain',
  phone: '0679889108',
  email: 'aymenabidar21@gmail.com',
  instagram: 'https://www.instagram.com/kerviqo/',
  workDays: [1, 2, 3, 4, 5],
  dayStart: '10:00',
  dayEnd: '18:00',
  slotMinutes: 60,
  slotStep: 30,
  closedDaysLabel: 'Samedi et dimanche'
};

const LOCAL_STORE_KEY = 'kerviqo_dentaire_local_store_v2';
window.__kerviqoLocalMode = false;

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function buildDefaultLocalStore() {
  return {
    services: cloneData(fallbackServices),
    gallery: cloneData(fallbackGallery),
    reviews: cloneData(fallbackReviews),
    office: cloneData(fallbackOffice),
    reservations: []
  };
}

function getLocalStore() {
  try {
    const raw = localStorage.getItem(LOCAL_STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const seeded = buildDefaultLocalStore();
    return {
      services: Array.isArray(parsed.services) && parsed.services.length ? parsed.services : seeded.services,
      gallery: Array.isArray(parsed.gallery) && parsed.gallery.length ? parsed.gallery : seeded.gallery,
      reviews: Array.isArray(parsed.reviews) && parsed.reviews.length ? parsed.reviews : seeded.reviews,
      office: parsed.office && typeof parsed.office === 'object' ? { ...seeded.office, ...parsed.office } : seeded.office,
      reservations: Array.isArray(parsed.reservations) ? parsed.reservations : []
    };
  } catch {
    return buildDefaultLocalStore();
  }
}

function setLocalStore(store) {
  localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(store));
}

function enableLocalMode() {
  if (!window.__kerviqoLocalMode) {
    window.__kerviqoLocalMode = true;
    document.dispatchEvent(new CustomEvent('kerviqo-local-mode'));
  }
}

function makeId(prefix = 'id') {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function slugifyText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeBoolean(value) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

const PHONE_REGEX = /^(0\d{9}|\+212\d{9})$/;

function normalizePhone(value = '') {
  return String(value || '').trim().replace(/[\s.-]+/g, '');
}

function isValidPhone(value = '') {
  return PHONE_REGEX.test(normalizePhone(value));
}


function timeToMinutes(time) {
  const [h, m] = String(time).slice(0, 5).split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const safe = Math.max(0, Number(minutes || 0));
  const h = String(Math.floor(safe / 60)).padStart(2, '0');
  const m = String(safe % 60).padStart(2, '0');
  return `${h}:${m}:00`;
}

function formatTimeLabel(time) {
  return String(time || '').slice(0, 5);
}

function addMinutesToTime(time, minutesToAdd) {
  const total = timeToMinutes(time) + Number(minutesToAdd || 0);
  return minutesToTime(total).slice(0, 5);
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function normalizeWeekday(dateString) {
  const jsDay = new Date(`${dateString}T12:00:00`).getDay();
  return jsDay === 0 ? 7 : jsDay;
}

function isOpenDay(dateString, workDays = [1, 2, 3, 4, 5]) {
  return workDays.includes(normalizeWeekday(dateString));
}

function buildCandidateSlots(dayStart, dayEnd, stepMinutes, durationMinutes) {
  const slots = [];
  let cursor = timeToMinutes(dayStart);
  const end = timeToMinutes(dayEnd);
  while (cursor + durationMinutes <= end) {
    slots.push({
      time: minutesToTime(cursor),
      end_time: minutesToTime(cursor + durationMinutes)
    });
    cursor += Number(stepMinutes || 30);
  }
  return slots;
}

function sortByOrder(items) {
  return [...items].sort((a, b) => {
    const aOrder = normalizeNumber(a.sort_order, 0);
    const bOrder = normalizeNumber(b.sort_order, 0);
    if (aOrder !== bOrder) return aOrder - bOrder;
    return String(a.name || a.title || a.patient_name || '').localeCompare(String(b.name || b.title || b.patient_name || ''));
  });
}

function sortReservations(items) {
  return [...items].sort((a, b) => {
    const aDate = `${a.session_date || ''} ${String(a.session_time || '').slice(0, 5)}`;
    const bDate = `${b.session_date || ''} ${String(b.session_time || '').slice(0, 5)}`;
    return aDate.localeCompare(bDate);
  });
}

function isLikelyDirectImageUrl(value = '') {
  const url = String(value || '').trim();
  if (!url) return false;
  return /^data:image\//i.test(url)
    || /^assets\//i.test(url)
    || /^\/assets\//i.test(url)
    || /^https?:\/\/.+\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(url);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Impossible de lire le fichier image.'));
    reader.readAsDataURL(file);
  });
}

async function getImageValueFromForm(form, { urlField = 'image_url', fileField = 'image_file' } = {}) {
  const fileInput = form.elements[fileField];
  if (fileInput?.files?.[0]) {
    return fileToDataUrl(fileInput.files[0]);
  }
  return String(form.elements[urlField]?.value || '').trim();
}

function setImagePreview(previewElement, value, fallback = 'Aucune image sélectionnée.') {
  if (!previewElement) return;
  const image = previewElement.querySelector('img');
  const caption = previewElement.querySelector('span');
  if (value) {
    previewElement.classList.add('has-image');
    if (image) image.src = value;
    if (image) image.alt = 'Prévisualisation';
    if (caption) caption.textContent = 'Prévisualisation';
  } else {
    previewElement.classList.remove('has-image');
    if (image) image.removeAttribute('src');
    if (caption) caption.textContent = fallback;
  }
}

function getToken() {
  return sessionStorage.getItem('kerviqo_admin_token') || null;
}
function setToken(token) {
  sessionStorage.setItem('kerviqo_admin_token', token);
  localStorage.removeItem('kerviqo_admin_token');
}
function clearToken() {
  sessionStorage.removeItem('kerviqo_admin_token');
  localStorage.removeItem('kerviqo_admin_token');
}

function isLocalToken(token) {
  return String(token || '').startsWith('local-admin::');
}

function showNotice(id, message, type = 'success') {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (!el) return;
  el.className = `notice ${type}`;
  el.textContent = message;
}

function formatPrice(value) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(Number(value || 0));
}

function formatStars(rating = 5) {
  return '★'.repeat(Math.max(1, Math.min(5, rating)));
}

function toggleMobileMenu() {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}

function setActiveNav() {
  const links = document.querySelectorAll('.nav-links a[data-page]');
  const page = document.body.dataset.page;
  links.forEach(link => link.classList.toggle('active', link.dataset.page === page));
}

function setOfficeContact(office) {
  document.querySelectorAll('[data-office-phone]').forEach(el => el.textContent = office.phone || fallbackOffice.phone);
  document.querySelectorAll('[data-office-email]').forEach(el => el.textContent = office.email || fallbackOffice.email);
  document.querySelectorAll('[data-office-instagram]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = office.instagram || fallbackOffice.instagram;
      el.textContent = '@kerviqo';
    } else {
      el.textContent = office.instagram || fallbackOffice.instagram;
    }
  });
}

function createServiceCard(service, compact = false) {
  const serviceParam = encodeURIComponent(service.slug || service.id || service.name);
  return `
    <article class="service-card">
      <img class="thumb" src="${service.image_url || 'assets/images/service-esthetique.svg'}" alt="${service.name}">
      <div class="content">
        <h3>${service.name}</h3>
        <p>${compact ? service.short_description : service.description}</p>
        <div class="price-row">
          <strong>${formatPrice(service.price)}</strong>
          <span class="helper">${service.duration_minutes || 60} min</span>
        </div>
        <div class="service-actions">
          <a class="btn secondary small-action" href="reservation.html?service=${serviceParam}">Réserver ce service</a>
        </div>
      </div>
    </article>
  `;
}

function createReviewCard(review) {
  return `
    <article class="review-card">
      <div class="content">
        <div class="stars">${formatStars(review.rating)}</div>
        <p>“${review.comment}”</p>
        <h3>${review.patient_name}</h3>
        <span class="helper">${review.role_label || 'Patient'}</span>
      </div>
    </article>
  `;
}

function localRequireAdmin(options = {}) {
  const token = options.token || options.headers?.Authorization?.replace('Bearer ', '') || options.headers?.authorization?.replace('Bearer ', '');
  if (!token || !isLocalToken(token)) {
    throw new Error('Authentification requise.');
  }
}

function parsePath(path) {
  const url = new URL(path, 'https://local.kerviqo');
  return { endpoint: url.pathname.replace(/^\//, ''), query: url.searchParams };
}

function validateReservationPayloadLocal(body, store, reservationId = null) {
  const office = { ...fallbackOffice, ...(store.office || {}) };
  const workDays = office.workDays || [1, 2, 3, 4, 5];
  const dayStart = office.dayStart || '10:00';
  const dayEnd = office.dayEnd || '18:00';
  const defaultDuration = normalizeNumber(office.slotMinutes, 60);

  if (!body.full_name?.trim()) throw new Error('Veuillez renseigner le nom complet.');
  if (String(body.full_name || '').trim().length < 3) throw new Error('Le nom complet doit contenir au moins 3 caractères.');
  if (!body.phone?.trim()) throw new Error('Veuillez renseigner le téléphone.');
  if (!isValidPhone(body.phone)) throw new Error('Le numéro doit être au format 0123456789 ou +212123456789.');
  if (!body.session_date) throw new Error('Veuillez choisir une date.');
  if (!body.session_time) throw new Error('Veuillez choisir une heure.');
  if (!isOpenDay(body.session_date, workDays)) throw new Error('Le cabinet est fermé ce jour-là.');

  const service = store.services.find(item => String(item.id) === String(body.service_id))
    || store.services.find(item => String(item.slug) === String(body.service_id));
  const durationMinutes = normalizeNumber(body.duration_minutes || service?.duration_minutes, defaultDuration);
  const sessionTime = String(body.session_time).slice(0, 5);
  const sessionEndTime = addMinutesToTime(sessionTime, durationMinutes);
  const start = timeToMinutes(sessionTime);
  const end = timeToMinutes(sessionEndTime);
  if (start < timeToMinutes(dayStart) || end > timeToMinutes(dayEnd)) {
    throw new Error('Cette heure n’est pas disponible dans les horaires du cabinet.');
  }

  const conflicts = store.reservations.some(item => {
    if (reservationId && String(item.id) === String(reservationId)) return false;
    if (item.session_date !== body.session_date) return false;
    if (item.status === 'cancelled') return false;
    return overlaps(start, end, timeToMinutes(item.session_time), timeToMinutes(item.session_end_time));
  });
  if (conflicts) {
    throw new Error('Ce créneau est déjà réservé.');
  }

  return {
    ...body,
    id: body.id || makeId('reservation'),
    full_name: String(body.full_name).trim(),
    phone: normalizePhone(body.phone),
    birth_date: body.birth_date || null,
    city: body.city || null,
    cin: body.cin || null,
    insurance: body.insurance || null,
    company: body.company || null,
    emergency_contact: body.emergency_contact || null,
    antecedents: body.antecedents || null,
    allergies: body.allergies || null,
    notes: body.notes || null,
    service_id: service?.id || body.service_id || null,
    service_name: service?.name || body.service_name || 'Consultation',
    duration_minutes: durationMinutes,
    session_time: `${sessionTime}:00`,
    session_end_time: `${sessionEndTime}:00`,
    status: body.status || 'reserved',
    updated_at: new Date().toISOString(),
    created_at: body.created_at || new Date().toISOString()
  };
}

function computeLocalAvailability(store, date, serviceId = null) {
  const office = { ...fallbackOffice, ...(store.office || {}) };
  const workDays = office.workDays || [1, 2, 3, 4, 5];
  const dayStart = office.dayStart || '10:00';
  const dayEnd = office.dayEnd || '18:00';
  const slotStep = normalizeNumber(office.slotStep, 30);
  const defaultDuration = normalizeNumber(office.slotMinutes, 60);
  const service = store.services.find(item => String(item.id) === String(serviceId));
  const durationMinutes = normalizeNumber(service?.duration_minutes, defaultDuration);

  if (!isOpenDay(date, workDays)) {
    return { date, closed: true, slots: [], office, durationMinutes, slotStep };
  }

  const reserved = store.reservations.filter(item => item.session_date === date && item.status !== 'cancelled');
  const slots = buildCandidateSlots(dayStart, dayEnd, slotStep, durationMinutes).map(slot => {
    const slotStart = timeToMinutes(slot.time);
    const slotEnd = timeToMinutes(slot.end_time);
    const available = !reserved.some(item => overlaps(slotStart, slotEnd, timeToMinutes(item.session_time), timeToMinutes(item.session_end_time)));
    return { ...slot, available };
  });

  return { date, closed: false, slots, office, durationMinutes, slotStep };
}

async function localApi(path, options = {}) {
  enableLocalMode();
  const { endpoint, query } = parsePath(path);
  const method = (options.method || 'GET').toUpperCase();
  const body = typeof options.body === 'string' ? JSON.parse(options.body || '{}') : (options.body || {});
  const store = getLocalStore();

  if (endpoint === 'admin-login' && method === 'POST') {
    const password = String(body.password || '').trim();
    if (!password) throw new Error('Mot de passe requis.');
    return { token: `local-admin::${makeId('token')}`, localMode: true };
  }

  if (endpoint === 'office') {
    if (method === 'GET') return store.office;
    localRequireAdmin(options);
    if (method === 'PUT') {
      store.office = { ...fallbackOffice, ...body, slotMinutes: normalizeNumber(body.slotMinutes, 60), slotStep: normalizeNumber(body.slotStep, 30), workDays: [1, 2, 3, 4, 5] };
      setLocalStore(store);
      return { message: 'Paramètres sauvegardés localement.', localMode: true };
    }
  }

  if (endpoint === 'services') {
    if (method === 'GET') return sortByOrder(store.services);
    localRequireAdmin(options);
    if (method === 'POST') {
      const item = {
        id: makeId('service'),
        name: String(body.name || '').trim(),
        slug: slugifyText(body.slug || body.name),
        short_description: String(body.short_description || '').trim(),
        description: String(body.description || '').trim(),
        price: normalizeNumber(body.price, 0),
        duration_minutes: normalizeNumber(body.duration_minutes, 60),
        image_url: body.image_url || null,
        featured: normalizeBoolean(body.featured),
        sort_order: normalizeNumber(body.sort_order, 0)
      };
      if (!item.name) throw new Error('Veuillez renseigner le nom du service.');
      if (!item.slug) item.slug = slugifyText(item.name);
      store.services.push(item);
      setLocalStore(store);
      return item;
    }
    if (method === 'PUT') {
      const index = store.services.findIndex(item => String(item.id) === String(body.id));
      if (index === -1) throw new Error('Service introuvable.');
      store.services[index] = {
        ...store.services[index],
        ...body,
        slug: slugifyText(body.slug || body.name || store.services[index].name),
        price: normalizeNumber(body.price, store.services[index].price),
        duration_minutes: normalizeNumber(body.duration_minutes, store.services[index].duration_minutes),
        featured: normalizeBoolean(body.featured),
        sort_order: normalizeNumber(body.sort_order, store.services[index].sort_order)
      };
      setLocalStore(store);
      return store.services[index];
    }
    if (method === 'DELETE') {
      store.services = store.services.filter(item => String(item.id) !== String(query.get('id')));
      setLocalStore(store);
      return { message: 'Service supprimé localement.' };
    }
  }

  if (endpoint === 'gallery') {
    if (method === 'GET') return sortByOrder(store.gallery);
    localRequireAdmin(options);
    if (method === 'POST') {
      if (!body.title?.trim()) throw new Error('Veuillez renseigner un titre.');
      if (!body.image_url?.trim()) throw new Error('Veuillez ajouter une image ou une URL directe.');
      const item = {
        id: makeId('gallery'),
        title: String(body.title).trim(),
        image_url: String(body.image_url).trim(),
        alt_text: body.alt_text || null,
        sort_order: normalizeNumber(body.sort_order, 0)
      };
      store.gallery.push(item);
      setLocalStore(store);
      return item;
    }
    if (method === 'PUT') {
      const index = store.gallery.findIndex(item => String(item.id) === String(body.id));
      if (index === -1) throw new Error('Image introuvable.');
      store.gallery[index] = {
        ...store.gallery[index],
        ...body,
        sort_order: normalizeNumber(body.sort_order, store.gallery[index].sort_order)
      };
      setLocalStore(store);
      return store.gallery[index];
    }
    if (method === 'DELETE') {
      store.gallery = store.gallery.filter(item => String(item.id) !== String(query.get('id')));
      setLocalStore(store);
      return { message: 'Image supprimée localement.' };
    }
  }

  if (endpoint === 'reviews') {
    if (method === 'GET') return [...store.reviews].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
    localRequireAdmin(options);
    if (method === 'POST') {
      const item = {
        id: makeId('review'),
        patient_name: String(body.patient_name || '').trim(),
        role_label: body.role_label || null,
        rating: Math.max(1, Math.min(5, normalizeNumber(body.rating, 5))),
        comment: String(body.comment || '').trim(),
        created_at: new Date().toISOString()
      };
      if (!item.patient_name || !item.comment) throw new Error('Veuillez renseigner le nom et le commentaire.');
      store.reviews.unshift(item);
      setLocalStore(store);
      return item;
    }
    if (method === 'PUT') {
      const index = store.reviews.findIndex(item => String(item.id) === String(body.id));
      if (index === -1) throw new Error('Avis introuvable.');
      store.reviews[index] = { ...store.reviews[index], ...body, rating: Math.max(1, Math.min(5, normalizeNumber(body.rating, store.reviews[index].rating))) };
      setLocalStore(store);
      return store.reviews[index];
    }
    if (method === 'DELETE') {
      store.reviews = store.reviews.filter(item => String(item.id) !== String(query.get('id')));
      setLocalStore(store);
      return { message: 'Avis supprimé localement.' };
    }
  }

  if (endpoint === 'availability' && method === 'GET') {
    const date = query.get('date');
    const serviceId = query.get('serviceId');
    if (!date) throw new Error('Date requise.');
    return computeLocalAvailability(store, date, serviceId);
  }

  if (endpoint === 'reservations') {
    if (method === 'GET') {
      localRequireAdmin(options);
      return sortReservations(store.reservations);
    }
    if (method === 'POST') {
      const payload = validateReservationPayloadLocal(body, store);
      store.reservations.push(payload);
      setLocalStore(store);
      return { message: 'Réservation enregistrée localement.', reservation: payload, localMode: true };
    }
    localRequireAdmin(options);
    if (method === 'PUT') {
      const payload = validateReservationPayloadLocal(body, store, body.id);
      const index = store.reservations.findIndex(item => String(item.id) === String(body.id));
      if (index === -1) throw new Error('Réservation introuvable.');
      store.reservations[index] = payload;
      setLocalStore(store);
      return payload;
    }
    if (method === 'DELETE') {
      store.reservations = store.reservations.filter(item => String(item.id) !== String(query.get('id')));
      setLocalStore(store);
      return { message: 'Réservation supprimée localement.' };
    }
  }

  throw new Error('Cette action n’est pas disponible en mode local.');
}

function shouldFallbackToLocal(path, response, dataOrError) {
  const { endpoint } = parsePath(path);

  // Never store booking logic locally, otherwise reservations made on one device
  // will not appear on another device.
  if (['admin-login', 'availability', 'reservations'].includes(endpoint)) {
    return false;
  }

  const supported = ['office', 'services', 'gallery', 'reviews'];
  if (!supported.includes(endpoint)) return false;
  if (!response) return true;
  if ([401, 403, 409].includes(response.status)) return false;
  if (response.status >= 500 || response.status === 404) return true;
  const message = String(dataOrError?.error || dataOrError?.details || dataOrError?.message || '');
  return /DATABASE_URL|JWT_SECRET|Erreur .*API|Unexpected token|fetch/i.test(message);
}

async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`/api/${path}`, { ...options, headers });
    const data = await response.json().catch(() => ({}));
    if (response.ok) return data;
    if (shouldFallbackToLocal(path, response, data)) {
      return localApi(path, { ...options, headers, token: options.token });
    }
    throw new Error(data.error || data.details || 'Erreur API');
  } catch (error) {
    if (shouldFallbackToLocal(path, null, error)) {
      return localApi(path, { ...options, headers, token: options.token });
    }
    throw error;
  }
}

async function loadCollection(path, fallback = [], options = {}) {
  const { fallbackOnError = true, fallbackOnEmpty = true } = options;
  try {
    const data = await api(path);
    if (Array.isArray(data)) {
      return data.length || !fallbackOnEmpty ? data : fallback;
    }
    return fallbackOnError ? fallback : [];
  } catch {
    return fallbackOnError ? fallback : [];
  }
}

async function loadOffice(options = {}) {
  const { fallbackOnError = true } = options;
  try {
    const data = await api('office');
    return Object.keys(data || {}).length ? data : fallbackOffice;
  } catch {
    return fallbackOnError ? fallbackOffice : {};
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  toggleMobileMenu();
  setActiveNav();
  const office = await loadOffice();
  setOfficeContact(office);
});
