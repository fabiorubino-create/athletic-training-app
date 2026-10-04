const STORAGE_KEY = 'athletic_training_manager_v3';
const chartInstances = {};

const defaultState = {
  athletes: [
    {
      id: 'ath-1',
      name: 'Atleta Demo 1',
      dob: '2007-05-12',
      category: 'Senior',
      notes: 'Ottima resistenza generale, attenzione al recupero.'
    },
    {
      id: 'ath-2',
      name: 'Atleta Demo 2',
      dob: '2009-02-22',
      category: 'Junior',
      notes: 'Buona forza esplosiva, monitorare ginocchia.'
    }
  ],
  workouts: [
    {
      id: 'wo-1',
      athleteId: 'ath-1',
      date: getTodayISO(-4),
      notes: 'Seduta di forza superiore.',
      exercises: [
        { id: 'ex-1', name: 'Panca piana', sets: 4, reps: 6, weight: 70, rest: 2 },
        { id: 'ex-2', name: 'Stacco da terra', sets: 5, reps: 5, weight: 90, rest: 3 }
      ]
    },
    {
      id: 'wo-2',
      athleteId: 'ath-2',
      date: getTodayISO(-2),
      notes: 'Lavoro su squat e press.',
      exercises: [
        { id: 'ex-3', name: 'Squat', sets: 4, reps: 8, weight: 55, rest: 2 },
        { id: 'ex-4', name: 'Press militare', sets: 3, reps: 8, weight: 40, rest: 2 }
      ]
    }
  ],
  physio: [
    {
      id: 'ph-1',
      athleteId: 'ath-1',
      date: getTodayISO(-3),
      bodyPart: 'Spalla',
      cause: 'Dolore da sovraccarico',
      treatment: 'Mobilizzazione scapolo-omerale e stretching del deltoide.',
      exercises: 'Rotazioni esterne con elastico e lavoro con band.',
      followUp: getTodayISO(2),
      notes: 'Nessun dolore nel movimento.'
    }
  ]
};

const state = loadState();

function getTodayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return structuredClone(defaultState);
    }
  }
  return structuredClone(defaultState);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString + 'T12:00:00');
  return new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

function formatShortDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString + 'T12:00:00');
  return new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: '2-digit' }).format(date);
}

function getAthleteById(id) {
  return state.athletes.find((a) => a.id === id);
}

function calculateExerciseTL(exercise) {
  const sets = Number(exercise.sets || 0);
  const reps = Number(exercise.reps || 0);
  const weight = Number(exercise.weight || 0);
  return sets * reps * weight;
}

function calculateWorkoutVolume(workout) {
  return (workout.exercises || []).reduce((sum, ex) => sum + calculateExerciseTL(ex), 0);
}

function updateDashboardStats() {
  document.getElementById('total-athletes').textContent = state.athletes.length;
  document.getElementById('total-workouts').textContent = state.workouts.length;
  document.getElementById('total-physio').textContent = state.physio.length;

  const lastWorkout = [...state.workouts].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  document.getElementById('last-update').textContent = lastWorkout ? formatDate(lastWorkout.date) : 'Nessuno';
}

function connectionState() {
  const athleteSelects = [
    document.getElementById('training-athlete'),
    document.getElementById('physio-athlete'),
    document.getElementById('filter-athlete'),
    document.getElementById('physio-athlete-filter'),
    document.getElementById('report-athlete')
  ];

  athleteSelects.forEach((select) => {
    if (!select) return;
    const valueBefore = select.value;
    const isDefaultFill = select.id === 'training-athlete' || select.id === 'physio-athlete';

    let options = `<option value="">${select.id.includes('filter') || select.id === 'report-athlete' ? 'Tutte le atlete' : 'Seleziona atleta'}</option>`;

    if (!state.athletes.length) {
      select.disabled = true;
      select.innerHTML = options;
      return;
    }

    select.disabled = false;

    state.athletes.forEach((athlete) => {
      options += `<option value="${athlete.id}">${athlete.name}</option>`;
    });

    select.innerHTML = options;

    if (valueBefore) {
      select.value = valueBefore;
    } else if (isDefaultFill && state.athletes.length) {
      select.value = state.athletes[0].id;
    }
  });
}

function renderAthletes() {
  const list = document.getElementById('athletes-list');

  if (!state.athletes.length) {
    list.innerHTML = '<div class="empty-state">Nessuna atleta registrata.</div>';
    return;
  }

  list.innerHTML = state.athletes.map((athlete) => {
    const workouts = state.workouts.filter((w) => w.athleteId === athlete.id);
    const volume = workouts.reduce((sum, workout) => sum + calculateWorkoutVolume(workout), 0);

    return `
      <article class="card">
        <div class="card-top">
          <h4>${athlete.name}</h4>
          <span class="badge">${athlete.category || 'Generica'}</span>
        </div>
        <div class="meta-list">
          <span>📅 Nascita: ${athlete.dob ? formatDate(athlete.dob) : 'Non inserita'}</span>
          <span>💪 Allenamenti: ${workouts.length}</span>
          <span>📈 Volume totale: ${volume.toLocaleString('it-IT')} TL</span>
        </div>
        <div class="notes">${athlete.notes || 'Nessuna nota disponibile.'}</div>
      </article>
    `;
  }).join('');
}

function renderWorkouts() {
  const list = document.getElementById('trainings-list');
  const athleteFilter = document.getElementById('filter-athlete').value;
  const dateFilter = document.getElementById('filter-date').value;

  const filtered = [...state.workouts]
    .filter((w) => (athleteFilter ? w.athleteId === athleteFilter : true))
    .filter((w) => (dateFilter ? w.date === dateFilter : true))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!filtered.length) {
    list.innerHTML = '<div class="empty-state">Nessun allenamento registrato con i filtri attuali.</div>';
    return;
  }

  list.innerHTML = filtered.map((workout) => {
    const athlete = getAthleteById(workout.athleteId);
    const volume = calculateWorkoutVolume(workout);
    const totalRest = (workout.exercises || []).reduce((sum, ex) => sum + Number(ex.rest || 0), 0);

    const exercisesHtml = (workout.exercises || []).map((ex) => {
      const tl = calculateExerciseTL(ex);
      return `<div><strong>${ex.name}</strong> — ${ex.sets}x${ex.reps} @ ${ex.weight} kg · TL ${tl}</div>`;
    }).join('');

    return `
      <article class="record">
        <div class="record-header">
          <h4>${athlete ? athlete.name : 'Atleta sconosciuta'}</h4>
          <span class="kpi">Volume ${volume.toLocaleString('it-IT')} TL</span>
        </div>
        <div class="meta-row">
          <span>📅 ${formatDate(workout.date)}</span>
          <span>🏋️ ${(workout.exercises || []).length} esercizi</span>
          <span>⏱ Recupero ${totalRest} min</span>
        </div>
        <div class="exercise-list">${exercisesHtml}</div>
        ${workout.notes ? `<div class="text-block"><strong>Note:</strong> ${workout.notes}</div>` : ''}
      </article>
    `;
  }).join('');
}

function renderPhysio() {
  const list = document.getElementById('physio-list');
  const athleteFilter = document.getElementById('physio-athlete-filter').value;
  const dateFilter = document.getElementById('physio-date-filter').value;

  const filtered = [...state.physio]
    .filter((entry) => (athleteFilter ? entry.athleteId === athleteFilter : true))
    .filter((entry) => (dateFilter ? entry.date === dateFilter : true))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!filtered.length) {
    list.innerHTML = '<div class="empty-state">Nessun trattamento fisioterapico registrato.</div>';
    return;
  }

  list.innerHTML = filtered.map((entry) => {
    const athlete = getAthleteById(entry.athleteId);
    return `
      <article class="record">
        <div class="record-header">
          <h4>${athlete ? athlete.name : 'Atleta sconosciuta'}</h4>
          <span class="kpi">${entry.bodyPart}</span>
        </div>
        <div class="meta-row">
          <span>📅 ${formatDate(entry.date)}</span>
          <span>⚠️ ${entry.cause}</span>
          <span>📌 Controllo ${entry.followUp ? formatDate(entry.followUp) : 'non definito'}</span>
        </div>
        <div class="text-block"><strong>Trattamento:</strong> ${entry.treatment}</div>
        <div class="text-block"><strong>Esercizi consigliati:</strong> ${entry.exercises || 'Nessuno'}</div>
        ${entry.notes ? `<div class="text-block"><strong>Note:</strong> ${entry.notes}</div>` : ''}
      </article>
    `;
  }).join('');
}

function renderDashboardCharts() {
  const labels = [];
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split('T')[0];
    labels.push(formatShortDate(iso));
    data.push(state.workouts.filter((w) => w.date === iso).length);
  }

  renderChart('activityChart', {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Allenamenti',
        data,
        fill: true,
        borderColor: '#5d8bff',
        backgroundColor: 'rgba(93, 139, 255, 0.15)',
        tension: 0.35
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const athleteNames = state.athletes.map((a) => a.name);
  const athleteCounts = state.athletes.map((a) => state.workouts.filter((w) => w.athleteId === a.id).length);

  renderChart('distributionChart', {
    type: 'bar',
    data: {
      labels: athleteNames,
      datasets: [{
        label: 'Allenamenti',
        data: athleteCounts,
        backgroundColor: ['#5d8bff', '#3dd4a5', '#9d7dff', '#ffa85b']
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

function renderReportCharts() {
  const athleteId = document.getElementById('report-athlete').value;
  const filteredWorkouts = athleteId
    ? state.workouts.filter((w) => w.athleteId === athleteId)
    : state.workouts;

  const progressLabels = filteredWorkouts.map((w) => formatShortDate(w.date));
  const progressData = filteredWorkouts.map((w) => calculateWorkoutVolume(w));

  renderChart('progressChart', {
    type: 'line',
    data: {
      labels: progressLabels,
      datasets: [{
        label: 'Volume TL',
        data: progressData,
        borderColor: '#3dd4a5',
        backgroundColor: 'rgba(61, 212, 165, 0.15)',
        tension: 0.35,
        fill: true
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const monthlyMap = new Map();
  filteredWorkouts.forEach((workout) => {
    const d = new Date(workout.date + 'T12:00:00');
    const key = `${d.getMonth() + 1}/${d.getFullYear()}`;
    monthlyMap.set(key, (monthlyMap.get(key) || 0) + calculateWorkoutVolume(workout));
  });

  renderChart('volumeChart', {
    type: 'bar',
    data: {
      labels: [...monthlyMap.keys()],
      datasets: [{
        label: 'Volume totale',
        data: [...monthlyMap.values()],
        backgroundColor: '#5d8bff'
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const frequencyMap = new Map();
  filteredWorkouts.forEach((workout) => {
    frequencyMap.set(workout.date, (frequencyMap.get(workout.date) || 0) + 1);
  });

  renderChart('frequencyChart', {
    type: 'radar',
    data: {
      labels: [...frequencyMap.keys()].map((date) => formatShortDate(date)),
      datasets: [{
        label: 'Allenamenti',
        data: [...frequencyMap.values()],
        borderColor: '#ffa85b',
        backgroundColor: 'rgba(255, 168, 91, 0.18)'
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const exerciseMap = new Map();
  filteredWorkouts.forEach((workout) => {
    (workout.exercises || []).forEach((exercise) => {
      exerciseMap.set(exercise.name, (exerciseMap.get(exercise.name) || 0) + 1);
    });
  });

  const topExercises = [...exerciseMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  renderChart('exerciseChart', {
    type: 'doughnut',
    data: {
      labels: topExercises.map(([name]) => name),
      datasets: [{
        data: topExercises.map(([, count]) => count),
        backgroundColor: ['#5d8bff', '#3dd4a5', '#9d7dff', '#ffa85b', '#66d4ff']
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

function renderChart(id, config) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  if (chartInstances[id]) chartInstances[id].destroy();
  chartInstances[id] = new Chart(canvas, config);
}

function createExerciseBlock() {
  const block = document.createElement('div');
  block.className = 'exercise-block';
  block.innerHTML = `
    <div class="exercise-block-header">
      <h4>Esercizio</h4>
      <button type="button" class="remove-exercise">Rimuovi</button>
    </div>
    <div class="field-row">
      <div class="field">
        <label>Nome esercizio</label>
        <input type="text" class="exercise-name" placeholder="Es. Panca piana" required />
      </div>
      <div class="field">
        <label>Serie</label>
        <input type="number" class="exercise-sets" min="1" value="3" required />
      </div>
    </div>
    <div class="field-row">
      <div class="field">
        <label>Ripetizioni</label>
        <input type="number" class="exercise-reps" min="1" value="8" required />
      </div>
      <div class="field">
        <label>Peso (kg)</label>
        <input type="number" class="exercise-weight" min="0" step="0.5" value="0" required />
      </div>
    </div>
    <div class="field-row">
      <div class="field">
        <label>Recupero (min)</label>
        <input type="number" class="exercise-rest" min="0" step="0.5" value="2" />
      </div>
      <div class="field">
        <label>TL</label>
        <input type="text" class="exercise-tl" readonly value="0" />
      </div>
    </div>
  `;

  const onInput = () => updateExerciseTL(block);
  block.querySelectorAll('input').forEach((input) => input.addEventListener('input', onInput));

  block.querySelector('.remove-exercise').addEventListener('click', () => {
    const blocks = document.querySelectorAll('#exercise-list .exercise-block');
    if (blocks.length > 1) {
      block.remove();
      updateWorkoutVolume();
    }
  });

  updateExerciseTL(block);
  return block;
}

function updateExerciseTL(block) {
  const sets = Number(block.querySelector('.exercise-sets').value || 0);
  const reps = Number(block.querySelector('.exercise-reps').value || 0);
  const weight = Number(block.querySelector('.exercise-weight').value || 0);
  const tl = sets * reps * weight;
  block.querySelector('.exercise-tl').value = tl.toLocaleString('it-IT');
  updateWorkoutVolume();
}

function updateWorkoutVolume() {
  const blocks = document.querySelectorAll('#exercise-list .exercise-block');
  let total = 0;
  blocks.forEach((block) => {
    const sets = Number(block.querySelector('.exercise-sets').value || 0);
    const reps = Number(block.querySelector('.exercise-reps').value || 0);
    const weight = Number(block.querySelector('.exercise-weight').value || 0);
    total += sets * reps * weight;
  });
  document.getElementById('training-volume').value = total.toLocaleString('it-IT');
}

function resetTrainingForm() {
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';
  list.appendChild(createExerciseBlock());
  document.getElementById('training-form').reset();
  document.getElementById('training-date').value = getTodayISO();
  document.getElementById('training-volume').value = '0';
}

function resetPhysioForm() {
  document.getElementById('physio-form').reset();
  document.getElementById('physio-date').value = getTodayISO();
}

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

function addAthlete(event) {
  event.preventDefault();
  const name = document.getElementById('athlete-name').value.trim();
  if (!name) return;

  state.athletes.push({
    id: generateId('athlete'),
    name,
    dob: document.getElementById('athlete-dob').value,
    category: document.getElementById('athlete-category').value.trim(),
    notes: document.getElementById('athlete-notes').value.trim()
  });

  saveState();
  renderAll();
  closeModal('athlete-modal');
  document.getElementById('athlete-form').reset();
}

function addWorkout(event) {
  event.preventDefault();
  const athleteId = document.getElementById('training-athlete').value;
  const date = document.getElementById('training-date').value;
  if (!athleteId || !date) return;

  const blocks = document.querySelectorAll('#exercise-list .exercise-block');
  const exercises = [...blocks].map((block) => ({
    id: generateId('ex'),
    name: block.querySelector('.exercise-name').value.trim(),
    sets: Number(block.querySelector('.exercise-sets').value || 0),
    reps: Number(block.querySelector('.exercise-reps').value || 0),
    weight: Number(block.querySelector('.exercise-weight').value || 0),
    rest: Number(block.querySelector('.exercise-rest').value || 0)
  })).filter((ex) => ex.name && ex.sets > 0 && ex.reps > 0);

  if (!exercises.length) return;

  state.workouts.push({
    id: generateId('wo'),
    athleteId,
    date,
    notes: document.getElementById('training-notes').value.trim(),
    exercises
  });

  saveState();
  renderAll();
  closeModal('training-modal');
  resetTrainingForm();
}

function addPhysio(event) {
  event.preventDefault();
  const athleteId = document.getElementById('physio-athlete').value;
  const date = document.getElementById('physio-date').value;
  const bodyPart = document.getElementById('physio-body-part').value.trim();
  const cause = document.getElementById('physio-cause').value.trim();
  const treatment = document.getElementById('physio-treatment').value.trim();

  if (!athleteId || !date || !bodyPart || !cause || !treatment) return;

  state.physio.push({
    id: generateId('ph'),
    athleteId,
    date,
    bodyPart,
    cause,
    treatment,
    exercises: document.getElementById('physio-exercises').value.trim(),
    followUp: document.getElementById('physio-followup').value,
    notes: document.getElementById('physio-notes').value.trim()
  });

  saveState();
  renderAll();
  closeModal('physio-modal');
  resetPhysioForm();
}

function exportCsv() {
  const rows = [['Tipo', 'Atleta', 'Data', 'Dettagli']];

  state.athletes.forEach((athlete) => {
    rows.push(['Atleta', athlete.name, athlete.dob || '', athlete.notes || '']);
  });

  state.workouts.forEach((workout) => {
    const athleteName = getAthleteById(workout.athleteId)?.name || '';
    const details = workout.exercises.map((ex) => `${ex.name}: ${ex.sets}x${ex.reps} @ ${ex.weight} kg, TL ${calculateExerciseTL(ex)}`).join(' | ');
    rows.push(['Allenamento', athleteName, workout.date, details]);
  });

  state.physio.forEach((entry) => {
    const athleteName = getAthleteById(entry.athleteId)?.name || '';
    rows.push(['Fisioterapia', athleteName, entry.date, `${entry.bodyPart} | ${entry.cause} | ${entry.treatment}`]);
  });

  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dati_atletic_training.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function printReport() {
  window.print();
}

function renderAll() {
  connectionState();
  updateDashboardStats();
  renderAthletes();
  renderWorkouts();
  renderPhysio();
  renderDashboardCharts();
  renderReportCharts();
}

function bindEvents() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      const pageId = button.dataset.page;
      document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');
      document.getElementById('page-title').textContent = button.textContent.trim();
    });
  });

  document.getElementById('add-athlete-btn').addEventListener('click', () => openModal('athlete-modal'));
  document.getElementById('athlete-form').addEventListener('submit', addAthlete);

  document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', (event) => {
      const modal = event.target.closest('.modal');
      if (modal) modal.classList.add('hidden');
    });
  });

  document.getElementById('add-training-btn').addEventListener('click', () => openModal('training-modal'));
  document.getElementById('training-form').addEventListener('submit', addWorkout);
  document.getElementById('add-exercise-btn').addEventListener('click', () => {
    document.getElementById('exercise-list').appendChild(createExerciseBlock());
  });

  document.getElementById('add-physio-btn').addEventListener('click', () => openModal('physio-modal'));
  document.getElementById('physio-form').addEventListener('submit', addPhysio);

  document.getElementById('filter-athlete').addEventListener('change', renderWorkouts);
  document.getElementById('filter-date').addEventListener('change', renderWorkouts);
  document.getElementById('clear-filters').addEventListener('click', () => {
    document.getElementById('filter-athlete').value = '';
    document.getElementById('filter-date').value = '';
    renderWorkouts();
  });

  document.getElementById('physio-athlete-filter').addEventListener('change', renderPhysio);
  document.getElementById('physio-date-filter').addEventListener('change', renderPhysio);
  document.getElementById('clear-physio-filters').addEventListener('click', () => {
    document.getElementById('physio-athlete-filter').value = '';
    document.getElementById('physio-date-filter').value = '';
    renderPhysio();
  });

  document.getElementById('report-athlete').addEventListener('change', renderReportCharts);
  document.getElementById('export-btn').addEventListener('click', exportCsv);
  document.getElementById('export-csv-btn').addEventListener('click', exportCsv);
  document.getElementById('export-pdf-btn').addEventListener('click', printReport);
}

function init() {
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';
  list.appendChild(createExerciseBlock());

  document.getElementById('training-date').value = getTodayISO();
  document.getElementById('physio-date').value = getTodayISO();

  bindEvents();
  renderAll();
}

init();
