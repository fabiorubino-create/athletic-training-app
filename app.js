const STORAGE_KEY = 'athletic_training_manager_v3';
const chartInstances = {};
const DASHBOARD_EXERCISES = ['Squat', 'Stacco da terra', 'Push Press', 'TRX', 'Panca Piana', 'Affondi'];
const IPPS48_ITEMS = [
  { key: 'confidence', label: 'Fiducia' },
  { key: 'goalSetting', label: 'Goal-setting' },
  { key: 'selfTalk', label: 'Self-talk' },
  { key: 'mentalPractice', label: 'Pratica mentale' },
  { key: 'emotionalArousalControl', label: 'Controllo arousal emozionale' },
  { key: 'competitionPreparation', label: 'Preparazione alla gara' },
  { key: 'worry', label: 'Preoccupazione' },
  { key: 'concentrationDisruption', label: 'Disturbi concentrazione' }
];
const ATHLETE_NAME_NORMALIZATION = {
  'Lia Casali': 'Casali Lia',
  'Francesca Ongaro': 'Ongaro Francesca',
  'Sofia Piazzini': 'Piazzini Sofia',
  'Rossella Locatelli': 'Locatelli Rossella',
  'Giulia Arsuffi': 'Arsuffi Giulia',
  'Elisa Olivari': 'Olivari Elisa',
  'Michela Rota': 'Rota Michela',
  'Benedetta Frambrosi': 'Frambrosi Benedetta',
  'Arianna Milesi': 'Milesi Arianna',
  'Ebosetale Alemenzou': 'Alemenzou Ebosetale',
  'Viviene Tarca': 'Tarca Viviene',
  'Anna Garruto': 'Garruto Anna',
  'Gloria Carrara': 'Carrara Gloria'
};

const INITIAL_ATHLETES = [
  ...[
    { name: 'Alemenzou Ebosetale', id: 'roster-u19-17-17' },
    { name: 'Angelini Sara', id: 'roster-u19-17-01' },
    { name: 'Arsuffi Giulia', id: 'roster-u19-17-12' },
    { name: 'Bresciani Martina', id: 'roster-u19-17-04' },
    { name: 'Carrara Gloria', id: 'roster-u19-17-20' },
    { name: 'Casali Lia', id: 'roster-u19-17-08' },
    { name: 'Cecconi Martina', id: 'roster-u19-17-06' },
    { name: 'Cortinovis Marta', id: 'roster-u19-17-07' },
    { name: 'Frambrosi Benedetta', id: 'roster-u19-17-15' },
    { name: 'Garruto Anna', id: 'roster-u19-17-19' },
    { name: 'Locatelli Rossella', id: 'roster-u19-17-11' },
    { name: 'Milesi Arianna', id: 'roster-u19-17-16' },
    { name: 'Olivari Elisa', id: 'roster-u19-17-13' },
    { name: 'Ongaro Francesca', id: 'roster-u19-17-09' },
    { name: 'Pesenti Nicole', id: 'roster-u19-17-03' },
    { name: 'Piazzini Sofia', id: 'roster-u19-17-10' },
    { name: 'Rota Michela', id: 'roster-u19-17-14' },
    { name: 'Tarca Viviene', id: 'roster-u19-17-18' },
    { name: 'Villa Martina', id: 'roster-u19-17-02' },
    { name: 'Zambelli Giada', id: 'roster-u19-17-05' }
  ].map((item) => ({
    id: item.id,
    name: item.name,
    squad: 'U19/17',
    category: 'U19/17',
    notes: ''
  })),
  ...[
    { name: 'Alemenzhou Divine', id: 'roster-u15-09' },
    { name: 'Bellini Matilde', id: 'roster-u15-15' },
    { name: 'Bresciani Giulia', id: 'roster-u15-06' },
    { name: 'Brundì Benedetta', id: 'roster-u15-03' },
    { name: 'Cagliani Arianna', id: 'roster-u15-13' },
    { name: 'Cecconi Camilla', id: 'roster-u15-14' },
    { name: 'Diana Matilda', id: 'roster-u15-04' },
    { name: 'Esemoghie Divine', id: 'roster-u15-10' },
    { name: 'Fiorani Anna', id: 'roster-u15-02' },
    { name: 'Morosini Anna', id: 'roster-u15-16' },
    { name: 'Nava Anna', id: 'roster-u15-05' },
    { name: 'Orsini Ines', id: 'roster-u15-01' },
    { name: 'Repetto Maddalena', id: 'roster-u15-12' },
    { name: 'Sandionigi Sofia', id: 'roster-u15-11' },
    { name: 'Solomoni Obehi Andrea', id: 'roster-u15-08' },
    { name: 'Tirogo Eleonora', id: 'roster-u15-07' }
  ].map((item) => ({
    id: item.id,
    name: item.name,
    squad: 'U15',
    category: 'U15',
    notes: ''
  })),
  ...[
    { name: 'Andronache Alessia', id: 'roster-u14-11' },
    { name: 'Arnoldi Isabel', id: 'roster-u14-08' },
    { name: 'Bana Giorgia', id: 'roster-u14-14' },
    { name: 'Baroni Sofia', id: 'roster-u14-05' },
    { name: 'Bertulessi Ilaria', id: 'roster-u14-09' },
    { name: 'Cavagnis Greta', id: 'roster-u14-12' },
    { name: 'Crevenna Lucia', id: 'roster-u14-07' },
    { name: 'Dipalma Amalia', id: 'roster-u14-01' },
    { name: 'Fassi Ginevra', id: 'roster-u14-06' },
    { name: 'Invernici Celeste', id: 'roster-u14-13' },
    { name: 'Luiselli Martina', id: 'roster-u14-04' },
    { name: 'Mascheretti Emma', id: 'roster-u14-02' },
    { name: 'Perico Anna', id: 'roster-u14-03' },
    { name: 'Plebani Benedetta', id: 'roster-u14-10' },
    { name: 'Tartaglione Vittoria', id: 'roster-u14-15' }
  ].map((item) => ({
    id: item.id,
    name: item.name,
    squad: 'U14',
    category: 'U14',
    notes: ''
  }))
];
let bodyMapView = 'front';
let editingAthleteId = null;
let editingWorkoutId = null;
let editingPhysioId = null;

const defaultState = {
  athletes: INITIAL_ATHLETES,
  workouts: [],
  physio: [],
  attendanceSessions: [],
  psychologicalAssessments: [],
  competitions: [],
  schoolPeriods: [],
  rosterVersion: 2
};

function sortAthletes(athletes = []) {
  return [...athletes].sort((a, b) => a.name.localeCompare(b.name, 'it'));
}

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
      const savedState = JSON.parse(raw);
      let renamedExercise = false;
      (savedState.workouts || []).forEach((workout) => {
        (workout.exercises || []).forEach((exercise) => {
          if (/^pressa?\s+militare$/i.test(exercise.name.trim())) {
            exercise.name = 'Push Press';
            renamedExercise = true;
          }
        });
      });
      if (renamedExercise) localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      savedState.athletes ||= [];
      savedState.workouts ||= [];
      savedState.physio ||= [];
      savedState.attendanceSessions ||= [];
      savedState.psychologicalAssessments ||= [];
      savedState.competitions ||= [];
      savedState.schoolPeriods ||= [];
      if (!savedState.rosterVersion || savedState.rosterVersion < 2) {
        const demoAthleteIds = new Set(
          savedState.athletes
            .filter((athlete) => (
              (athlete.id === 'ath-1' && athlete.name === 'Atleta Demo 1') ||
              (athlete.id === 'ath-2' && athlete.name === 'Atleta Demo 2')
            ))
            .map((athlete) => athlete.id)
        );
        savedState.athletes = savedState.athletes.filter((athlete) => !demoAthleteIds.has(athlete.id));
        savedState.workouts = savedState.workouts.filter((workout) => !demoAthleteIds.has(workout.athleteId));
        savedState.physio = savedState.physio.filter((entry) => !demoAthleteIds.has(entry.athleteId));
        savedState.attendanceSessions = savedState.attendanceSessions.flatMap((session) => {
          const attendance = Object.fromEntries(
            Object.entries(session.attendance || {}).filter(([athleteId]) => !demoAthleteIds.has(athleteId))
          );
          return Object.keys(attendance).length ? [{ ...session, attendance }] : [];
        });
        const athleteIds = new Set(savedState.athletes.map((athlete) => athlete.id));
        INITIAL_ATHLETES.forEach((athlete) => {
          if (!athleteIds.has(athlete.id)) savedState.athletes.push({ ...athlete });
        });
        savedState.athletes.forEach((athlete) => {
          if (ATHLETE_NAME_NORMALIZATION[athlete.name]) {
            athlete.name = ATHLETE_NAME_NORMALIZATION[athlete.name];
          }
        });
        savedState.athletes = sortAthletes(savedState.athletes);
        savedState.rosterVersion = 2;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      }
      return savedState;
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
  return new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date);
}

function formatShortDate(dateString) {
  return formatDate(dateString);
}

function getAthleteById(id) {
  return state.athletes.find((a) => a.id === id);
}

function getAthleteSquad(athlete) {
  const squad = athlete.squad || athlete.category || '';
  return ['U19/U17', 'U19/17', 'U19-U17'].includes(squad) ? 'U19/17' : squad;
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

function isWithinDateRange(date, from, to) {
  return (!from || date >= from) && (!to || date <= to);
}

function canonicalExerciseName(name = '') {
  const value = name.trim().toLocaleLowerCase('it-IT').replace(/\s+/g, ' ');
  if (value === 'trx' || value === 'tr x') return 'TRX';
  if (value.includes('squat') && !value.includes('jump')) return 'Squat';
  if (value.includes('stacco')) return 'Stacco da terra';
  if (value.includes('push press') || value.includes('pressa militare')) return 'Push Press';
  if (value.includes('panca')) return 'Panca Piana';
  if (value.includes('affond')) return 'Affondi';
  return '';
}

function estimateOneRepMax(exercise) {
  const weight = Number(exercise.weight || 0);
  const reps = Number(exercise.reps || 0);
  if (weight <= 0 || reps <= 0) return 0;
  return reps === 1 ? weight : weight * (1 + reps / 30);
}

function getAvailableSquads() {
  const baseSquads = ['U19/17', 'U15', 'U14', 'U13', 'SCUOLA DI PALLAVOLO'];
  const fromAthletes = (state.athletes || []).map((a) => getAthleteSquad(a)).filter(Boolean);
  return Array.from(new Set([...baseSquads, ...fromAthletes]));
}

const SQUAD_SELECT_IDS = [
  'dashboard-squad-filter',
  'filter-squad',
  'attendance-filter-squad',
  'technical-squad-filter',
  'psychological-squad-filter',
  'physio-squad-filter',
  'report-squad',
  'schedule-squad',
  'period-squad',
  'ipi-squad',
  'ipi-comp-squad',
  'attendance-squad-filter'
];

function populateSquadSelects() {
  const squads = getAvailableSquads();
  SQUAD_SELECT_IDS.forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;
    const valueBefore = select.value;
    let options = '<option value="">Tutte le squadre</option>';
    squads.forEach((sq) => {
      options += `<option value="${escapeHtml(sq)}">${escapeHtml(sq)}</option>`;
    });
    select.innerHTML = options;
    if (valueBefore && squads.includes(valueBefore)) {
      select.value = valueBefore;
    }
  });
}

function syncAthleteSelect(squadSelectId, athleteSelectId, defaultPrompt = 'Tutte le atlete') {
  const squadSelect = document.getElementById(squadSelectId);
  const athleteSelect = document.getElementById(athleteSelectId);
  if (!athleteSelect) return;

  const selectedSquad = squadSelect ? squadSelect.value : '';
  const currentAthleteVal = athleteSelect.value;

  const filteredAthletes = sortAthletes(
    selectedSquad
      ? state.athletes.filter((a) => getAthleteSquad(a) === selectedSquad)
      : state.athletes
  );

  let options = `<option value="">${defaultPrompt}</option>`;
  filteredAthletes.forEach((athlete) => {
    options += `<option value="${athlete.id}">${athlete.name} · ${getAthleteSquad(athlete) || 'Squadra non indicata'}</option>`;
  });

  athleteSelect.innerHTML = options;

  if (currentAthleteVal && filteredAthletes.some((a) => a.id === currentAthleteVal)) {
    athleteSelect.value = currentAthleteVal;
  } else {
    athleteSelect.value = '';
  }
}

function getDashboardData() {
  const squad = document.getElementById('dashboard-squad-filter')?.value || '';
  const athleteId = document.getElementById('dashboard-athlete-filter')?.value || '';
  const dateFrom = document.getElementById('dashboard-date-from')?.value || '';
  const dateTo = document.getElementById('dashboard-date-to')?.value || '';
  const squadAthleteIds = squad ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squad).map((a) => a.id)) : null;

  const workouts = state.workouts.filter((workout) =>
    (!athleteId ? (!squadAthleteIds || squadAthleteIds.has(workout.athleteId)) : workout.athleteId === athleteId) &&
    isWithinDateRange(workout.date, dateFrom, dateTo)
  );
  const exerciseFilter = document.getElementById('dashboard-exercise-filter')?.value || '';
  const metrics = new Map(DASHBOARD_EXERCISES.map((name) => [name, []]));
  workouts.forEach((workout) => {
    (workout.exercises || []).forEach((exercise) => {
      const name = canonicalExerciseName(exercise.name);
      if (!name) return;
      metrics.get(name).push({
        workoutId: workout.id,
        exerciseId: exercise.id,
        date: workout.date,
        athleteId: workout.athleteId,
        actualLoad: Number(exercise.weight || 0),
        trainingLoad: calculateExerciseTL(exercise),
        oneRepMax: estimateOneRepMax(exercise),
        sets: Number(exercise.sets || 0),
        reps: Number(exercise.reps || 0)
      });
    });
  });
  return { squad, athleteId, dateFrom, dateTo, exerciseFilter, workouts, metrics };
}

function dashboardTotalTrainingLoad(data = getDashboardData()) {
  const selectedMetrics = data.exerciseFilter
    ? [data.metrics.get(data.exerciseFilter)].filter(Boolean)
    : [...data.metrics.values()];
  return selectedMetrics.reduce((total, sessions) =>
    total + sessions.reduce((sum, session) => sum + session.trainingLoad, 0), 0);
}

const physioCauses = {
  Traumatologica: ['Distorsione', 'Contusione', 'Lussazione', 'Frattura', 'Lacerazione/Sfilacciamento muscolare'],
  Overuse: ['Tendinopatia rotulea', 'Tendinopatia achillea', 'Sindrome da sovraccarico', 'Fascite', 'Borsite', 'Contrattura/Ipertono', 'Stress osseo'],
  Altro: ['Altro']
};

function inferCauseCategory(cause = '') {
  const value = cause.toLocaleLowerCase('it-IT');
  if (['distors', 'contusion', 'lussaz', 'frattur', 'laceraz', 'sfilacci'].some((term) => value.includes(term))) {
    return 'Traumatologica';
  }
  if (['tendinop', 'sovraccarico', 'fascit', 'borsit', 'contrattur', 'iperton', 'stress osseo'].some((term) => value.includes(term))) {
    return 'Overuse';
  }
  return 'Altro';
}

function populateCauseOptions(category, selected = '') {
  const select = document.getElementById('physio-cause');
  const causes = physioCauses[category] || [];
  select.replaceChildren(new Option('Seleziona causa', ''));
  causes.forEach((cause) => select.add(new Option(cause, cause)));
  if (selected && !causes.includes(selected)) {
    select.add(new Option(selected, selected));
  }
  select.value = selected;
}

function updateDashboardStats() {
  const squad = document.getElementById('dashboard-squad-filter')?.value || '';
  const athleteFilter = document.getElementById('dashboard-athlete-filter')?.value || '';
  const exerciseFilter = document.getElementById('dashboard-exercise-filter')?.value || '';
  const dateFrom = document.getElementById('dashboard-date-from')?.value || '';
  const dateTo = document.getElementById('dashboard-date-to')?.value || '';

  const filteredAthletes = state.athletes.filter((athlete) =>
    (!squad || getAthleteSquad(athlete) === squad) &&
    (!athleteFilter || athlete.id === athleteFilter)
  );
  const athleteIds = new Set(filteredAthletes.map((athlete) => athlete.id));
  const filteredWorkouts = state.workouts.filter((workout) =>
    athleteIds.has(workout.athleteId) &&
    isWithinDateRange(workout.date, dateFrom, dateTo) &&
    (!exerciseFilter || (workout.exercises || []).some((exercise) => canonicalExerciseName(exercise.name) === exerciseFilter))
  );
  const filteredPhysio = state.physio.filter((entry) =>
    athleteIds.has(entry.athleteId) && isWithinDateRange(entry.date, dateFrom, dateTo)
  );

  document.getElementById('total-athletes').textContent = filteredAthletes.length;
  document.getElementById('total-workouts').textContent = filteredWorkouts.length;
  document.getElementById('total-physio').textContent = filteredPhysio.length;

  const lastWorkout = [...filteredWorkouts].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  document.getElementById('last-update').textContent = lastWorkout ? formatDate(lastWorkout.date) : 'Nessuno';

  document.getElementById('dashboard-total-tl').textContent =
    dashboardTotalTrainingLoad().toLocaleString('it-IT');
}

function connectionState() {
  populateSquadSelects();

  syncAthleteSelect('dashboard-squad-filter', 'dashboard-athlete-filter');
  syncAthleteSelect('filter-squad', 'filter-athlete');
  syncAthleteSelect('attendance-filter-squad', 'attendance-athlete-filter');
  syncAthleteSelect('technical-squad-filter', 'technical-athlete-filter');
  syncAthleteSelect('psychological-squad-filter', 'psychological-athlete-filter');
  syncAthleteSelect('physio-squad-filter', 'physio-athlete-filter');
  syncAthleteSelect('report-squad', 'report-athlete');
  syncAthleteSelect('schedule-squad', 'schedule-athlete');
  syncAthleteSelect('period-squad', 'period-athlete');
  syncAthleteSelect('ipi-squad', 'ipi-athlete');

  ['training-athlete', 'physio-athlete'].forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;
    const valueBefore = select.value;
    const sortedAthletes = sortAthletes(state.athletes);
    let options = '<option value="">Seleziona atleta</option>';
    sortedAthletes.forEach((athlete) => {
      options += `<option value="${athlete.id}">${athlete.name} · ${getAthleteSquad(athlete) || 'Squadra non indicata'}</option>`;
    });
    select.innerHTML = options;
    if (valueBefore && sortedAthletes.some((a) => a.id === valueBefore)) {
      select.value = valueBefore;
    } else if (sortedAthletes.length) {
      select.value = sortedAthletes[0].id;
    }
  });

  renderAttendanceAthleteInputs();
  renderTrainingAssignment();
}

function renderAthletes() {
  const list = document.getElementById('athletes-list');

  if (!state.athletes.length) {
    list.innerHTML = '<div class="empty-state">Nessuna atleta registrata.</div>';
    return;
  }

  const sortedAthletes = sortAthletes(state.athletes);

  list.innerHTML = sortedAthletes.map((athlete) => {
    const workouts = state.workouts.filter((w) => w.athleteId === athlete.id);
    const volume = workouts.reduce((sum, workout) => sum + calculateWorkoutVolume(workout), 0);

    return `
      <article class="card">
        <div class="card-top">
          <h4>${athlete.name}</h4>
          <span class="badge">${athlete.squad || athlete.category || 'Generica'}</span>
        </div>
        <div class="meta-list">
          <span>📅 Nascita: ${athlete.dob ? formatDate(athlete.dob) : 'Non inserita'}</span>
          ${athlete.role ? `<span>🏐 Ruolo: ${athlete.role}</span>` : ''}
          <span>💪 Allenamenti: ${workouts.length}</span>
          <span>📈 Volume totale: ${volume.toLocaleString('it-IT')} TL</span>
        </div>
        <div class="notes">${athlete.notes || 'Nessuna nota disponibile.'}</div>
      </article>
    `;
  }).join('');
}

function getCurrentAttendanceSelections() {
  const map = {};
  const rows = document.querySelectorAll('#attendance-athlete-list [data-attendance-row]');
  rows.forEach((row) => {
    const id = row.dataset.athleteId;
    const status = row.querySelector('.attendance-status')?.value || '';
    const reason = row.querySelector('.attendance-reason')?.value || '';
    if (id && status) {
      map[id] = { status, reason };
    }
  });
  return map;
}

function renderAttendanceAthleteInputs(preservedSelections = null) {
  const container = document.getElementById('attendance-athlete-list');
  if (!container) return;
  if (!state.athletes.length) {
    container.innerHTML = '<div class="empty-state">Registra prima almeno un’atleta.</div>';
    return;
  }

  const selections = preservedSelections !== null ? preservedSelections : getCurrentAttendanceSelections();
  const squadFilter = document.getElementById('attendance-squad-filter')?.value || '';
  const filteredAthletes = squadFilter
    ? state.athletes.filter((athlete) => getAthleteSquad(athlete) === squadFilter)
    : state.athletes;
  const sortedAthletes = sortAthletes(filteredAthletes);

  if (!sortedAthletes.length) {
    container.innerHTML = `<div class="empty-state">Nessuna atleta registrata per la squadra ${escapeHtml(squadFilter)}.</div>`;
    return;
  }

  container.innerHTML = `
    <table class="attendance-table">
      <thead><tr><th>Atleta</th><th>Squadra</th><th>Stato</th><th>Motivazione assenza (facoltativa)</th></tr></thead>
      <tbody>${sortedAthletes.map((athlete) => {
        const saved = selections[athlete.id];
        const status = saved?.status || '';
        const reason = saved?.reason || '';
        const isAbsent = status === 'Assente';
        return `
        <tr data-attendance-row data-athlete-id="${escapeHtml(athlete.id)}">
          <th scope="row">${escapeHtml(athlete.name)}</th>
          <td><span class="badge">${escapeHtml(getAthleteSquad(athlete) || '—')}</span></td>
          <td><select class="attendance-status" aria-label="Stato presenza ${escapeHtml(athlete.name)}" required>
            <option value=""${status === '' ? ' selected' : ''}>Seleziona</option>
            <option value="Presente"${status === 'Presente' ? ' selected' : ''}>Presente</option>
            <option value="Assente"${status === 'Assente' ? ' selected' : ''}>Assente</option>
          </select></td>
          <td><select class="attendance-reason${isAbsent ? '' : ' hidden'}" aria-label="Motivazione assenza ${escapeHtml(athlete.name)}">
            <option value=""${reason === '' ? ' selected' : ''}>Nessuna motivazione</option>
            <option value="Infortunio"${reason === 'Infortunio' ? ' selected' : ''}>Infortunio</option>
            <option value="Malattia"${reason === 'Malattia' ? ' selected' : ''}>Malattia</option>
            <option value="Giustificato"${reason === 'Giustificato' ? ' selected' : ''}>Giustificato</option>
            <option value="Non Giustificato"${reason === 'Non Giustificato' ? ' selected' : ''}>Non Giustificato</option>
          </select></td>
        </tr>`;
      }).join('')}
      </tbody>
    </table>`;
}

function getFilteredTechnicalStats() {
  const squad = document.getElementById('technical-squad-filter')?.value || '';
  const athleteId = document.getElementById('technical-athlete-filter')?.value || '';
  const dateFrom = document.getElementById('technical-date-from')?.value || '';
  const dateTo = document.getElementById('technical-date-to')?.value || '';
  const squadAthleteIds = squad ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squad).map((a) => a.id)) : null;
  // Replace this empty data source with the online database query once its API is available.
  const technicalStats = [];
  return technicalStats
    .filter((entry) => (athleteId ? entry.athleteId === athleteId : (!squadAthleteIds || squadAthleteIds.has(entry.athleteId))) && isWithinDateRange(entry.date, dateFrom, dateTo))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getFilteredPsychologicalAssessments() {
  const squad = document.getElementById('psychological-squad-filter')?.value || '';
  const athleteId = document.getElementById('psychological-athlete-filter')?.value || '';
  const dateFrom = document.getElementById('psychological-date-from')?.value || '';
  const dateTo = document.getElementById('psychological-date-to')?.value || '';
  const squadAthleteIds = squad ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squad).map((a) => a.id)) : null;

  return (state.psychologicalAssessments || [])
    .filter((entry) => (athleteId ? entry.athleteId === athleteId : (!squadAthleteIds || squadAthleteIds.has(entry.athleteId))))
    .filter((entry) => isWithinDateRange(entry.date, dateFrom, dateTo))
    .sort((a, b) => b.date.localeCompare(a.date));
}

function renderPsychologicalArea() {
  const assessments = getFilteredPsychologicalAssessments();
  const canvas = document.getElementById('ipps48-chart');
  const emptyNote = document.getElementById('ipps48-empty');
  const details = document.getElementById('ipps48-selection-detail');
  const squadFilter = document.getElementById('psychological-squad-filter')?.value || '';
  const athleteFilter = document.getElementById('psychological-athlete-filter')?.value || '';
  const dateFrom = document.getElementById('psychological-date-from')?.value || '';
  const dateTo = document.getElementById('psychological-date-to')?.value || '';
  const ambiguousAthleteSelection = !athleteFilter && assessments.length > 1;
  const selectedAssessment = ambiguousAthleteSelection ? null : assessments[0];

  if (!selectedAssessment) {
    if (chartInstances['ipps48-chart']) {
      chartInstances['ipps48-chart'].destroy();
      delete chartInstances['ipps48-chart'];
    }
    canvas.hidden = true;
    emptyNote.hidden = false;
    details.textContent = ambiguousAthleteSelection
      ? 'Seleziona un’atleta per visualizzare la rilevazione nel periodo scelto.'
      : athleteFilter || squadFilter || dateFrom || dateTo
      ? 'Nessuna rilevazione iPPS-48 corrisponde ai filtri selezionati.'
      : 'Il grafico si popolerà dopo il caricamento delle rilevazioni iPPS-48.';
    emptyNote.textContent = details.textContent;
    return;
  }

  const scores = selectedAssessment.scores || selectedAssessment;
  const values = IPPS48_ITEMS.map(({ key }) => {
    const rawValue = scores[key];
    if (rawValue === '' || rawValue === null || rawValue === undefined) return null;
    const value = Number(rawValue);
    return Number.isFinite(value) ? value : null;
  });
  const athlete = getAthleteById(selectedAssessment.athleteId);
  const missingValues = values.filter((value) => value === null).length;
  canvas.hidden = false;
  emptyNote.hidden = true;
  details.textContent = `${athlete?.name || 'Atleta sconosciuta'} · ${formatDate(selectedAssessment.date)}${missingValues ? ` · ${missingValues} punteggi non disponibili` : ''}`;
  renderChart('ipps48-chart', {
    type: 'bar',
    data: {
      labels: IPPS48_ITEMS.map(({ label }) => label),
      datasets: [{
        label: 'Punteggio iPPS-48',
        data: values,
        backgroundColor: ['#075a78', '#258f91', '#6175a8', '#bf8746', '#258f91', '#075a78', '#6175a8', '#bf8746'],
        borderRadius: 5,
        maxBarThickness: 54
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { autoSkip: false, maxRotation: 35, minRotation: 0 } },
        y: { beginAtZero: true, title: { display: true, text: 'Punteggio' } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => IPPS48_ITEMS[items[0].dataIndex].label,
            label: (item) => `Punteggio: ${item.formattedValue}`
          }
        }
      }
    }
  });
}

function technicalSettingEfficiency(entry) {
  const denominator = Number(entry.receptionsDefenses || 0);
  return denominator > 0 ? (Number(entry.positiveSets || 0) / denominator) * 100 : 0;
}

function renderTechnicalArea() {
  const entries = getFilteredTechnicalStats();
  const totalSets = entries.reduce((sum, entry) => sum + Number(entry.sets || 0), 0);
  const totalIndex = entries.reduce((sum, entry) => sum + Number(entry.sets || 0) * Number(entry.coefficient || 0), 0);
  document.getElementById('technical-total-index').textContent = totalIndex.toLocaleString('it-IT', { maximumFractionDigits: 2 });
  document.getElementById('technical-average-index').textContent =
    (totalSets > 0 ? totalIndex / totalSets : 0).toLocaleString('it-IT', { maximumFractionDigits: 2 });
  document.getElementById('technical-total-sets').textContent = totalSets.toLocaleString('it-IT');
  const categoryOrder = ['Provinciali', 'Regionali', 'Nazionali', 'B2'];
  const categoryTotals = categoryOrder.map((category) =>
    `${category}: ${entries.filter((entry) => entry.category === category).reduce((sum, entry) => sum + Number(entry.sets || 0), 0)}`
  );
  document.getElementById('technical-category-sets').textContent = categoryTotals.join(' · ');

  const labels = entries.map((entry) =>
    `${formatShortDate(entry.date)}${entry.opponent ? ` · ${entry.opponent}` : ''}`
  );
  const chartDefinitions = [
    ['technical-pos-chart', 'POS %', 'pos', '#5d8bff', true],
    ['technical-perf-chart', 'PERF %', 'perf', '#3dd4a5', true],
    ['technical-attack-chart', 'Attacco %', 'attack', '#ffa85b', true],
    ['technical-block-chart', 'Punti muro', 'blockPoints', '#9d7dff', false],
    ['technical-serve-chart', 'Punti battuta', 'servePoints', '#ff7171', false],
    ['technical-setting-chart', 'Efficienza alzata %', null, '#45c4d8', true]
  ];
  chartDefinitions.forEach(([id, label, key, color, percentage]) => {
    const values = entries.map((entry) => key ? Number(entry[key] || 0) : technicalSettingEfficiency(entry));
    renderChart(id, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data: values,
          borderColor: color,
          backgroundColor: `${color}33`,
          fill: true,
          tension: 0.25,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ...(percentage ? { max: 100, ticks: { callback: (value) => `${value}%` } } : { ticks: { precision: 0 } })
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  });

  const list = document.getElementById('technical-records');
  const filteredRecords = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  list.innerHTML = filteredRecords.length ? filteredRecords.map((entry) => {
    const athlete = getAthleteById(entry.athleteId);
    return `<article class="record">
      <div class="record-header">
        <h4>${escapeHtml(athlete?.name || 'Atleta sconosciuta')} · ${escapeHtml(entry.category)}</h4>
        <div class="record-actions"><span class="kpi">${formatDate(entry.date)} · ${Number(entry.sets)} set</span><button type="button" class="secondary-btn delete-technical-btn" data-technical-id="${escapeHtml(entry.id)}">Elimina</button></div>
      </div>
      <div class="meta-row"><span>${escapeHtml(entry.opponent || 'Partita')}</span><span>WEI/IQS ${ (Number(entry.sets) * Number(entry.coefficient)).toLocaleString('it-IT', { maximumFractionDigits: 2 }) }</span><span>POS ${Number(entry.pos)}%</span><span>PERF ${Number(entry.perf)}%</span><span>Attacco ${Number(entry.attack)}%</span><span>Muro ${Number(entry.blockPoints)} pt</span><span>Battuta ${Number(entry.servePoints)} pt</span><span>Efficienza alzata ${technicalSettingEfficiency(entry).toLocaleString('it-IT', { maximumFractionDigits: 1 })}%</span></div>
    </article>`;
  }).join('') : '<div class="empty-state">Nessun dato partita nel periodo selezionato.</div>';
}

function getFilteredAttendanceSessions() {
  const squad = document.getElementById('attendance-filter-squad')?.value || '';
  const athleteId = document.getElementById('attendance-athlete-filter')?.value || '';
  const dateFrom = document.getElementById('attendance-date-from')?.value || '';
  const dateTo = document.getElementById('attendance-date-to')?.value || '';
  const squadAthleteIds = squad ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squad).map((a) => a.id)) : null;

  return state.attendanceSessions
    .filter((session) => isWithinDateRange(session.date, dateFrom, dateTo))
    .filter((session) => {
      if (athleteId) return Boolean(session.attendance?.[athleteId]);
      if (squad) {
        if (session.squad && session.squad === squad) return true;
        return Object.keys(session.attendance || {}).some((id) => squadAthleteIds.has(id));
      }
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function renderAttendance() {
  const squad = document.getElementById('attendance-filter-squad')?.value || '';
  const athleteId = document.getElementById('attendance-athlete-filter')?.value || '';
  const squadAthleteIds = squad ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squad).map((a) => a.id)) : null;

  const sessions = getFilteredAttendanceSessions();
  const attendanceRows = sessions.flatMap((session) => Object.entries(session.attendance || {})
    .filter(([id]) => {
      if (athleteId) return id === athleteId;
      if (squadAthleteIds) return squadAthleteIds.has(id);
      return true;
    })
    .map(([id, item]) => ({ session, athleteId: id, ...item })));
  const present = attendanceRows.filter((row) => row.status === 'Presente').length;
  const absent = attendanceRows.filter((row) => row.status === 'Assente').length;
  const total = present + absent;
  const presentRate = total ? (present / total) * 100 : 0;
  const absentRate = total ? (absent / total) * 100 : 0;
  document.getElementById('attendance-present-total').textContent = present;
  document.getElementById('attendance-absent-total').textContent = absent;
  document.getElementById('attendance-present-rate').textContent = `${presentRate.toLocaleString('it-IT', { maximumFractionDigits: 1 })}%`;
  document.getElementById('attendance-absent-rate').textContent = `${absentRate.toLocaleString('it-IT', { maximumFractionDigits: 1 })}%`;
  renderChart('attendance-donut-chart', {
    type: 'doughnut',
    data: {
      labels: ['Presenze', 'Assenze'],
      datasets: [{ data: [present, absent], backgroundColor: ['#3dd4a5', '#ffa85b'], borderColor: ['#3dd4a5', '#ffa85b'] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });

  const list = document.getElementById('attendance-records');
  list.innerHTML = sessions.length ? sessions.map((session) => {
    const items = Object.entries(session.attendance || {})
      .filter(([id]) => {
        if (athleteId) return id === athleteId;
        if (squadAthleteIds) return squadAthleteIds.has(id);
        return true;
      })
      .map(([id, item]) => {
        const athlete = getAthleteById(id);
        return `${escapeHtml(athlete?.name || 'Atleta rimossa')}: ${escapeHtml(item.status)}${item.reason ? ` (${escapeHtml(item.reason)})` : ''}`;
      }).join(' · ');
    return `<article class="record">
      <div class="record-header">
        <h4>${escapeHtml(session.type)}${session.squad ? ` · ${escapeHtml(session.squad)}` : ''}${session.label ? ` · ${escapeHtml(session.label)}` : ''}</h4>
        <div class="record-actions"><span class="kpi">${formatDate(session.date)}</span><button type="button" class="secondary-btn delete-attendance-btn" data-attendance-id="${escapeHtml(session.id)}">Elimina</button></div>
      </div>
      <div class="text-block">${items || 'Nessun dato presenze registrato.'}</div>
    </article>`;
  }).join('') : '<div class="empty-state">Nessuna sessione nel periodo selezionato.</div>';
}

function renderWorkouts() {
  const list = document.getElementById('trainings-list');
  const squadFilter = document.getElementById('filter-squad')?.value || '';
  const athleteFilter = document.getElementById('filter-athlete')?.value || '';
  const dateFrom = document.getElementById('filter-date-from')?.value || '';
  const dateTo = document.getElementById('filter-date-to')?.value || '';
  const squadAthleteIds = squadFilter ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squadFilter).map((a) => a.id)) : null;

  const filtered = [...state.workouts]
    .filter((w) => (athleteFilter ? w.athleteId === athleteFilter : (!squadAthleteIds || squadAthleteIds.has(w.athleteId))))
    .filter((w) => isWithinDateRange(w.date, dateFrom, dateTo))
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
      const volumePerSet = Number(ex.reps || 0) * Number(ex.weight || 0);
      return `<div><strong>${escapeHtml(ex.name)}</strong> — ${ex.sets}x${ex.reps} @ ${ex.weight} kg · Recupero ${Number(ex.rest || 0)} min · Volume/serie ${volumePerSet.toLocaleString('it-IT')} kg · TL ${tl.toLocaleString('it-IT')}</div>`;
    }).join('');

    return `
      <article class="record">
        <div class="record-header">
          <h4>${athlete ? athlete.name : 'Atleta sconosciuta'}</h4>
          <div class="record-actions">
            <span class="kpi">Volume ${volume.toLocaleString('it-IT')} kg · TL ${volume.toLocaleString('it-IT')}</span>
            <button type="button" class="secondary-btn edit-workout-btn" data-workout-id="${workout.id}">Modifica</button>
          </div>
        </div>
        <div class="meta-row">
          <span>📅 ${formatDate(workout.date)}</span>
          <span>👥 ${getAthleteSquad(athlete || {}) || 'Squadra non indicata'}</span>
          <span>🏋️ ${(workout.exercises || []).length} esercizi</span>
          <span>⏱ Recupero ${totalRest} min</span>
        </div>
        <div class="exercise-list">${exercisesHtml}</div>
        ${workout.notes ? `<div class="text-block"><strong>Note:</strong> ${escapeHtml(workout.notes)}</div>` : ''}
      </article>
    `;
  }).join('');
}

const scheduleState = { anchor: new Date() };
const SCHEDULE_COLORS = ['#075a78', '#258f91', '#6175a8', '#bf8746', '#c65353', '#7a6bb0'];

function toLocalISO(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function getMondayOf(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

function getScheduleWindow() {
  const view = document.getElementById('schedule-view')?.value || '2';
  const anchor = scheduleState.anchor;
  if (view === 'month') {
    const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1, 12);
    const monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0, 12);
    const first = getMondayOf(monthStart);
    const weeks = Math.ceil((Math.round((monthEnd - first) / 86400000) + 1) / 7);
    return { start: first, weeks, month: anchor.getMonth(), year: anchor.getFullYear(), view };
  }
  return { start: getMondayOf(anchor), weeks: Number(view), month: null, year: null, view };
}

function shiftSchedule(direction) {
  const view = document.getElementById('schedule-view')?.value || '2';
  const a = scheduleState.anchor;
  scheduleState.anchor = view === 'month'
    ? new Date(a.getFullYear(), a.getMonth() + direction, 1, 12)
    : new Date(a.getFullYear(), a.getMonth(), a.getDate() + direction * 7 * Number(view), 12);
  renderSchedule();
}

function groupWorkoutsForSchedule(workouts) {
  const groups = new Map();
  workouts.forEach((workout) => {
    const signature = (workout.exercises || [])
      .map((ex) => [ex.name, ex.sets, ex.reps, ex.weight, ex.rest].join('|')).join(';');
    const key = `${workout.date}#${signature}#${workout.notes || ''}`;
    if (!groups.has(key)) groups.set(key, { date: workout.date, exercises: workout.exercises || [], notes: workout.notes || '', items: [] });
    groups.get(key).items.push(workout);
  });
  return [...groups.values()];
}

function describeScheduleGroup(group) {
  const athletes = group.items.map((w) => getAthleteById(w.athleteId)).filter(Boolean);
  const bySquad = new Map();
  athletes.forEach((a) => {
    const squad = getAthleteSquad(a) || 'Senza squadra';
    bySquad.set(squad, (bySquad.get(squad) || 0) + 1);
  });
  const totalBySquad = new Map();
  state.athletes.forEach((a) => {
    const squad = getAthleteSquad(a) || 'Senza squadra';
    totalBySquad.set(squad, (totalBySquad.get(squad) || 0) + 1);
  });
  const fullSquads = [...bySquad].filter(([squad, n]) => n === totalBySquad.get(squad));
  let title;
  if (athletes.length === state.athletes.length && athletes.length > 0 && bySquad.size > 1) {
    title = 'Tutte le squadre';
  } else if (fullSquads.length === bySquad.size) {
    title = [...bySquad.keys()].join(' + ');
  } else if (athletes.length === 1) {
    title = athletes[0].name;
  } else {
    title = [...bySquad].map(([squad, n]) => `${squad} (${n}/${totalBySquad.get(squad)})`).join(' + ');
  }
  return { title, athletes, firstSquad: [...bySquad.keys()][0] || '' };
}

const periodState = { selected: new Set(), metric: 'weight', initialized: false, deltas: {}, step: 1, sig: '', keys: [], mode: 'progress' };
const PERIOD_EDITABLE = {
  sets: { field: 'sets', min: 1, steps: [1, 2, 3, 5] },
  reps: { field: 'reps', min: 1, steps: [1, 2, 3, 5] },
  weight: { field: 'weight', min: 0, steps: [1, 2.5, 5, 10] },
  rest: { field: 'rest', min: 0, steps: [0.5, 1, 2, 5] }
};
const PERIOD_METRICS = {
  sets: { label: 'Serie', unit: '', value: (ex) => Number(ex.sets || 0) },
  reps: { label: 'Ripetizioni', unit: '', value: (ex) => Number(ex.reps || 0) },
  weight: { label: 'Carico', unit: ' kg', value: (ex) => Number(ex.weight || 0) },
  tl: { label: 'Training Load', unit: '', value: (ex) => calculateExerciseTL(ex) },
  volumePerSet: { label: 'Volume/serie', unit: ' kg', value: (ex) => Number(ex.reps || 0) * Number(ex.weight || 0) },
  rest: { label: 'Recupero', unit: ' min', value: (ex) => Number(ex.rest || 0) }
};
const PERIOD_COLORS = ['#075a78', '#258f91', '#bf8746', '#6175a8', '#c65353', '#7a6bb0', '#3c8d4f', '#d17a9b'];

function getPeriodWorkouts() {
  const squad = document.getElementById('period-squad')?.value || '';
  const athleteId = document.getElementById('period-athlete')?.value || '';
  const from = document.getElementById('period-date-from')?.value || '';
  const to = document.getElementById('period-date-to')?.value || '';
  const squadIds = squad ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squad).map((a) => a.id)) : null;
  return state.workouts.filter((w) =>
    (athleteId ? w.athleteId === athleteId : (!squadIds || squadIds.has(w.athleteId))) &&
    isWithinDateRange(w.date, from, to)
  );
}

function getPeriodKey(dateISO, group) {
  const date = new Date(`${dateISO}T12:00:00`);
  if (group === 'day') return { key: dateISO, label: formatShortDate(dateISO) };
  if (group === 'month') {
    const key = dateISO.slice(0, 7);
    return { key, label: new Intl.DateTimeFormat('it-IT', { month: 'short', year: 'numeric' }).format(date) };
  }
  const monday = toLocalISO(getMondayOf(date));
  return { key: monday, label: `Sett. ${formatShortDate(monday)}` };
}

function aggregatePeriodValues(values, mode) {
  if (!values.length) return null;
  if (mode === 'sum') return values.reduce((a, b) => a + b, 0);
  if (mode === 'max') return Math.max(...values);
  if (mode === 'min') return Math.min(...values);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function formatPeriodValue(value, unit) {
  if (value === null || value === undefined) return '–';
  return `${Number(value.toFixed(1)).toLocaleString('it-IT')}${unit}`;
}

function renderPeriodization() {
  const listEl = document.getElementById('period-exercises');
  if (!listEl) return;

  const workouts = getPeriodWorkouts();
  const counts = new Map();
  workouts.forEach((w) => {
    new Set((w.exercises || []).map((ex) => ex.name)).forEach((name) => counts.set(name, (counts.get(name) || 0) + 1));
  });
  const names = [...counts.keys()].sort((a, b) => a.localeCompare(b, 'it'));

  if (!periodState.initialized && names.length) {
    names.forEach((n) => periodState.selected.add(n));
    periodState.initialized = true;
  }
  [...periodState.selected].forEach((name) => {
    if (!counts.has(name)) periodState.selected.delete(name);
  });

  const search = (document.getElementById('period-search')?.value || '').trim().toLocaleLowerCase('it-IT');
  const visible = names.filter((n) => n.toLocaleLowerCase('it-IT').includes(search));
  listEl.innerHTML = visible.map((name) => `
    <label class="period-exercise ${periodState.selected.has(name) ? 'selected' : ''}">
      <input type="checkbox" value="${escapeHtml(name)}" ${periodState.selected.has(name) ? 'checked' : ''} />
      <span><strong>${escapeHtml(name)}</strong><small>In ${counts.get(name)} di ${workouts.length} allenamenti</small></span>
    </label>`).join('') || '<div class="empty-state">Nessun esercizio nel periodo.</div>';

  const selectAll = document.getElementById('period-select-all');
  selectAll.checked = names.length > 0 && names.every((n) => periodState.selected.has(n));
  selectAll.indeterminate = !selectAll.checked && periodState.selected.size > 0;
  document.getElementById('period-summary').textContent = `${workouts.length} allenamenti · ${names.length} esercizi`;

  document.querySelectorAll('.period-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.metric === periodState.metric);
  });

  renderPeriodChart(workouts);
  renderIPI();
}

function renderPeriodChart(workouts) {
  const metric = PERIOD_METRICS[periodState.metric];
  const group = document.getElementById('period-group').value;
  const agg = document.getElementById('period-agg').value;
  const selected = [...periodState.selected].sort((a, b) => a.localeCompare(b, 'it'));
  const buckets = new Map();

  workouts.forEach((w) => {
    const { key, label } = getPeriodKey(w.date, group);
    (w.exercises || []).forEach((ex) => {
      if (!periodState.selected.has(ex.name)) return;
      if (!buckets.has(key)) buckets.set(key, { label, values: new Map() });
      const map = buckets.get(key).values;
      if (!map.has(ex.name)) map.set(ex.name, []);
      map.get(ex.name).push(metric.value(ex));
    });
  });

  const keys = [...buckets.keys()].sort();
  const empty = document.getElementById('period-empty');
  const cards = document.getElementById('period-cards');
  const wrap = document.querySelector('.period-chart-wrap');
  empty.classList.toggle('hidden', keys.length > 0);
  wrap.classList.toggle('hidden', keys.length === 0);

  if (!keys.length) {
    if (chartInstances['period-chart']) {
      chartInstances['period-chart'].destroy();
      delete chartInstances['period-chart'];
    }
    cards.innerHTML = '';
    document.getElementById('period-editor').classList.add('hidden');
    return;
  }

  const editable = PERIOD_EDITABLE[periodState.metric];
  const sig = [periodState.metric, group, ...['period-squad', 'period-athlete', 'period-date-from', 'period-date-to'].map((id) => document.getElementById(id).value)].join('|');
  if (sig !== periodState.sig) {
    periodState.sig = sig;
    periodState.deltas = {};
    periodState.step = editable ? editable.steps[0] : 1;
  }
  periodState.keys = keys;
  const hasDraft = Object.values(periodState.deltas).some((d) => d);
  const draftOf = (value, key) => {
    if (value === null) return null;
    return Math.max(editable.min, value + (periodState.deltas[key] || 0));
  };

  const datasets = [];
  selected.forEach((name, index) => {
    const color = PERIOD_COLORS[index % PERIOD_COLORS.length];
    const original = keys.map((key) => aggregatePeriodValues(buckets.get(key).values.get(name) || [], agg));
    const base = {
      tension: 0.3,
      spanGaps: true,
      pointRadius: 5,
      pointHoverRadius: 7
    };
    if (editable && hasDraft) {
      datasets.push({ ...base, label: `${name} (originale)`, data: original, borderColor: color + '88', backgroundColor: color + '88', borderDash: [6, 5], pointRadius: 3 });
      datasets.push({ ...base, label: `${name} (bozza)`, data: original.map((v, i) => draftOf(v, keys[i])), borderColor: color, backgroundColor: color, borderWidth: 3 });
    } else {
      datasets.push({ ...base, label: name, data: original, borderColor: color, backgroundColor: color });
    }
  });

  renderChart('period-chart', {
    type: 'line',
    data: { labels: keys.map((key) => buckets.get(key).label), datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatPeriodValue(ctx.parsed.y, metric.unit)}`
          }
        }
      },
      scales: {
        y: { beginAtZero: false, title: { display: true, text: `${metric.label}${metric.unit ? ` (${metric.unit.trim()})` : ''}` } }
      }
    }
  });

  cards.innerHTML = keys.map((key) => {
    const bucket = buckets.get(key);
    const rows = selected.map((name, index) => {
      const value = aggregatePeriodValues(bucket.values.get(name) || [], agg);
      if (value === null) return '';
      return `<div class="period-card-row"><i style="background:${PERIOD_COLORS[index % PERIOD_COLORS.length]}"></i><span>${escapeHtml(name)}</span><strong>${formatPeriodValue(value, metric.unit)}</strong></div>`;
    }).join('');
    return `<div class="period-card"><h5>${escapeHtml(bucket.label)}</h5>${rows}</div>`;
  }).join('');

  renderPeriodEditor(buckets, selected, keys, agg, editable, draftOf, metric);
}

function renderPeriodEditor(buckets, selected, keys, agg, editable, draftOf, metric) {
  const editor = document.getElementById('period-editor');
  editor.classList.toggle('hidden', !editable);
  if (!editable) return;

  document.getElementById('period-step').innerHTML = `<span>Step</span>` + editable.steps.map((s) =>
    `<button type="button" class="period-step-btn ${s === periodState.step ? 'active' : ''}" data-step="${s}">${String(s).replace('.', ',')}</button>`
  ).join('');
  document.getElementById('period-editor-hint').textContent =
    `Parametro: ${metric.label}. Le frecce cambiano il valore di ±${String(periodState.step).replace('.', ',')}${metric.unit}.`;

  document.getElementById('period-steps').innerHTML = keys.map((key) => {
    const delta = periodState.deltas[key] || 0;
    const lines = selected.map((name, index) => {
      const orig = aggregatePeriodValues(buckets.get(key).values.get(name) || [], agg);
      if (orig === null) return '';
      const draft = draftOf(orig, key);
      return `<div class="${draft !== orig ? 'changed' : ''}"><i style="background:${PERIOD_COLORS[index % PERIOD_COLORS.length]}"></i>${formatPeriodValue(draft, '')}</div>`;
    }).join('');
    const arrows = (a, b, ua, ub) => `
      <div class="period-arrows">
        <button type="button" data-key="${key}" data-dir="${ua}" title="Solo questo periodo">${a}</button>
        <button type="button" data-key="${key}" data-dir="${ub}" title="Questo periodo e i successivi">${b}</button>
      </div>`;
    return `<div class="period-step-col ${delta ? 'modified' : ''}">
      <div class="period-step-label">${escapeHtml(buckets.get(key).label)}</div>
      ${arrows('↑', '↗', 'up', 'up-follow')}
      <div class="period-step-values">${lines}${delta ? `<small>${delta > 0 ? '+' : ''}${Number(delta.toFixed(2)).toLocaleString('it-IT')}</small>` : ''}</div>
      ${arrows('↓', '↘', 'down', 'down-follow')}
    </div>`;
  }).join('');
}

function adjustPeriodDraft(key, dir) {
  const sign = dir.startsWith('up') ? 1 : -1;
  const index = periodState.keys.indexOf(key);
  if (index < 0) return;
  const targets = dir.endsWith('follow') ? periodState.keys.slice(index) : [key];
  targets.forEach((k) => {
    const next = Math.round(((periodState.deltas[k] || 0) + sign * periodState.step) * 100) / 100;
    if (next) periodState.deltas[k] = next; else delete periodState.deltas[k];
  });
  renderPeriodization();
}

function applyPeriodDraft() {
  const editable = PERIOD_EDITABLE[periodState.metric];
  if (!editable) return;
  const group = document.getElementById('period-group').value;
  const workouts = getPeriodWorkouts().filter((w) => periodState.deltas[getPeriodKey(w.date, group).key]);
  const touched = workouts.filter((w) => (w.exercises || []).some((ex) => periodState.selected.has(ex.name)));
  if (!touched.length) {
    alert('Nessuna modifica da applicare: usa le frecce per creare una bozza.');
    return;
  }
  const athletes = new Set(touched.map((w) => w.athleteId)).size;
  if (!confirm(`Applicare la bozza (${PERIOD_METRICS[periodState.metric].label}) a ${touched.length} allenamenti di ${athletes} atlete?`)) return;

  touched.forEach((w) => {
    const delta = periodState.deltas[getPeriodKey(w.date, group).key];
    w.exercises.forEach((ex) => {
      if (!periodState.selected.has(ex.name)) return;
      ex[editable.field] = Math.round(Math.max(editable.min, Number(ex[editable.field] || 0) + delta) * 100) / 100;
      ex.volumePerSet = Number(ex.reps || 0) * Number(ex.weight || 0);
      ex.tl = calculateExerciseTL(ex);
    });
  });
  periodState.deltas = {};
  saveState();
  renderAll();
}

const IPI_WEIGHTS = { V: 0.20, I: 0.20, D: 0.15, T: 0.05, G: 0.10, C: 0.15, S: 0.10, A: 0.05 };
const IPI_LABELS = {
  V: 'Andamento volume', I: 'Andamento intensità', D: 'Numero e distribuzione sedute', T: 'Coerenza del taper',
  G: 'Importanza e prossimità gare', C: 'Densità calendario competitivo', S: 'Calendario scolastico', A: 'Presenza e continuità'
};
const IPI_K = {
  'Provinciale': { girone: 0.10, playoff: 0.15, semifinale: 0.20, finale: 0.30 },
  'Regionale': { girone: 0.20, playoff: 0.40, semifinale: 0.60, finale: 0.60 },
  'Nazionale': { girone: 0.50, playoff: 0.70, semifinale: 0.80, finale: 1.00 },
  'Serie D': { girone: 0.25, playoff: 0, semifinale: 0, finale: 0 },
  'Serie B2': { girone: 0.40, playoff: 0, semifinale: 0, finale: 0 }
};
const IPI_PHASES = {
  girone: 'Gironi / regular season', playoff: 'Ottavi / quarti / playoff', semifinale: 'Semifinale', finale: 'Finale'
};
const IPI_LOWER = ['Squat', 'Stacco da terra', 'Affondi', 'Jump Squat', 'Clean'];
const IPI_JUMPS = ['Jump Squat'];
const IPI_KIND = { misurato: 'Misurato', derivato: 'Derivato', stimato: 'Stima / assunzione', mancante: 'Dato mancante' };

const ipiDayDiff = (a, b) => Math.round((new Date(`${b}T12:00:00`) - new Date(`${a}T12:00:00`)) / 864e5);
const ipiAddDays = (iso, n) => {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + n);
  return toLocalISO(d);
};
const ipiClamp = (v) => Math.max(0, Math.min(100, v));
const ipiMean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);
const ipiFmt = (v) => (v === null || v === undefined ? '–' : String(Math.round(v)));
const ipiNum = (v, d = 2) => Number(v.toFixed(d)).toLocaleString('it-IT');
const ipiGetK = (c) => IPI_K[c.level]?.[c.phase] ?? 0;
const ipiIsLower = (ex) => IPI_LOWER.includes(canonicalExerciseName(ex.name));
const ipiIsJump = (ex) => IPI_JUMPS.includes(canonicalExerciseName(ex.name));

function ipiProximity(days) {
  if (days > 42) return 0.25;
  if (days > 28) return 0.40;
  if (days > 14) return 0.60;
  if (days > 7) return 0.80;
  return 1.00;
}

function ipiClosenessCoeff(days) {
  if (days >= 5) return 1.00;
  if (days === 4) return 1.10;
  if (days === 3) return 1.20;
  if (days === 2) return 1.35;
  return 1.50;
}

function ipiCompetitionsFor(squad) {
  return state.competitions
    .filter((c) => !c.squad || !squad || c.squad === squad)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function ipiWindowLoad(items) {
  if (!items.length) return 0;
  const sum = items.reduce((acc, item) => acc + item.load, 0);
  const champs = new Set(items.map((item) => item.c.championship));
  return sum * (champs.size > 1 ? 1.1 : 1) * (items.length >= 2 ? 1.1 : 1);
}

function ipiCalendar(comps, ref) {
  if (!comps.length) return null;
  const items = comps.map((c, i) => {
    const prev = comps[i - 1];
    const R = prev ? ipiClosenessCoeff(ipiDayDiff(prev.date, c.date)) : 1;
    const K = ipiGetK(c);
    return { c, K, R, load: K * R };
  });
  const weeks = new Map();
  items.forEach((item) => {
    const key = toLocalISO(getMondayOf(new Date(`${item.c.date}T12:00:00`)));
    if (!weeks.has(key)) weeks.set(key, []);
    weeks.get(key).push(item);
  });
  const baseline = ipiMean([...weeks.values()].map(ipiWindowLoad));
  const past = items.filter((it) => it.c.date >= ipiAddDays(ref, -6) && it.c.date <= ref);
  const next = items.filter((it) => it.c.date > ref && it.c.date <= ipiAddDays(ref, 7));
  let focus = (ipiWindowLoad(past) + ipiWindowLoad(next)) / 2;
  if (past.length >= 2 && next.length >= 2) focus *= 1.1;
  return { baseline, focus, past, next, ratio: baseline ? focus / baseline : null };
}

function ipiWeeklyMetrics(athleteId, ref, filter) {
  const weeks = [0, 1, 2, 3].map(() => ({ tl: 0, sets: 0, wsets: 0 }));
  state.workouts.forEach((w) => {
    if (w.athleteId !== athleteId) return;
    const age = ipiDayDiff(w.date, ref);
    if (age < 0 || age > 27) return;
    const week = weeks[Math.floor(age / 7)];
    (w.exercises || []).forEach((ex) => {
      if (filter && !filter(ex)) return;
      const sets = Number(ex.sets || 0);
      week.tl += calculateExerciseTL(ex);
      week.sets += sets;
      week.wsets += sets * Number(ex.weight || 0);
    });
  });
  return weeks;
}

function ipiRatios(weeks) {
  const base = weeks.slice(1).filter((w) => w.tl > 0);
  const cur = weeks[0];
  const out = { vol: null, int: null };
  if (!base.length) return out;
  out.vol = cur.tl / ipiMean(base.map((w) => w.tl));
  const baseInt = base.filter((w) => w.sets > 0).map((w) => w.wsets / w.sets);
  if (baseInt.length && ipiMean(baseInt) > 0) {
    out.int = cur.sets > 0 ? (cur.wsets / cur.sets) / ipiMean(baseInt) : 0;
  }
  return out;
}

function ipiVolScore(r, taper) {
  if (r === null) return null;
  if (taper) return r < 0.4 ? 30 : r < 0.6 ? 70 : r <= 0.85 ? 100 : r <= 0.95 ? 80 : r <= 1.05 ? 50 : 20;
  return r > 1.5 ? 20 : r > 1.3 ? 40 : r > 1.15 ? 75 : r >= 0.9 ? 100 : r >= 0.75 ? 75 : r >= 0.5 ? 50 : 25;
}

function ipiIntScore(r, taper) {
  if (r === null) return null;
  if (taper) return r >= 0.95 ? 100 : r >= 0.85 ? 75 : r >= 0.75 ? 50 : 25;
  return r > 1.2 ? 60 : r > 1.1 ? 80 : r >= 0.97 ? 100 : r >= 0.9 ? 75 : r >= 0.8 ? 55 : 30;
}

// Intensità relativa stimata sul massimo carico registrato dall'atleta per esercizio (1RM non disponibile)
function ipiExposure(athleteId, ref) {
  const maxByExercise = new Map();
  const entries = [];
  state.workouts.forEach((w) => {
    if (w.athleteId !== athleteId || w.date > ref) return;
    (w.exercises || []).forEach((ex) => {
      const weight = Number(ex.weight || 0);
      if (weight <= 0) return;
      const name = canonicalExerciseName(ex.name) || ex.name;
      maxByExercise.set(name, Math.max(maxByExercise.get(name) || 0, weight));
      entries.push({ name, weight, age: ipiDayDiff(w.date, ref) });
    });
  });
  const recent = entries.filter((e) => e.age <= 13);
  if (entries.length < 4 || !recent.length) return null;
  const high = recent.filter((e) => e.weight >= 0.85 * maxByExercise.get(e.name)).length;
  return { high, score: high > 0 ? 100 : 40 };
}

function ipiAttendance(athleteId, ref) {
  const sessions = state.attendanceSessions.filter((s) => {
    const age = ipiDayDiff(s.date, ref);
    return s.type === 'Allenamento' && age >= 0 && age <= 27 && s.attendance?.[athleteId];
  });
  if (!sessions.length) return null;
  const present = sessions.filter((s) => s.attendance[athleteId].status === 'Presente').length;
  const reasons = {};
  sessions.forEach((s) => {
    const row = s.attendance[athleteId];
    if (row.status === 'Assente') reasons[row.reason || 'Non indicato'] = (reasons[row.reason || 'Non indicato'] || 0) + 1;
  });
  const pct = (present / sessions.length) * 100;
  const score = pct >= 95 ? 100 : pct >= 85 ? 80 : pct >= 70 ? 60 : pct >= 50 ? 35 : 10;
  return { total: sessions.length, present, pct, score, reasons };
}

function computeIPI(athlete, ref) {
  const id = athlete.id;
  const squad = getAthleteSquad(athlete);
  const comps = ipiCompetitionsFor(squad);
  const future = comps
    .map((c) => ({ c, days: ipiDayDiff(ref, c.date), K: ipiGetK(c) }))
    .filter((x) => x.days >= 0)
    .map((x) => ({ ...x, P: ipiProximity(x.days), E: x.K * ipiProximity(x.days) }));
  const guide = [...future].sort((a, b) => b.E - a.E || a.days - b.days)[0] || null;
  const taperEvent = future.filter((x) => x.K >= 0.4 && x.days <= 14).sort((a, b) => a.days - b.days)[0] || null;
  const taper = Boolean(taperEvent);
  const comp = {};

  const rAll = ipiRatios(ipiWeeklyMetrics(id, ref, null));
  const rLow = ipiRatios(ipiWeeklyMetrics(id, ref, ipiIsLower));
  const rJump = ipiRatios(ipiWeeklyMetrics(id, ref, ipiIsJump));
  const exposure = ipiExposure(id, ref);

  const vParts = [['totale', rAll.vol], ['lower body', rLow.vol], ['salti', rJump.vol]]
    .map(([label, ratio]) => ({ label, ratio, score: ipiVolScore(ratio, taper) }))
    .filter((p) => p.score !== null);
  comp.V = vParts.length
    ? { score: ipiMean(vParts.map((p) => p.score)), kind: 'derivato',
      note: `${vParts.map((p) => `${p.label} ${ipiNum(p.ratio)}×`).join(' · ')} (settimana corrente / media delle 3 precedenti)` }
    : { score: null, kind: 'mancante', note: 'Servono allenamenti registrati nelle ultime 4 settimane.' };

  const intRatioScore = ipiIntScore(rAll.int, taper);
  comp.I = intRatioScore !== null
    ? { score: exposure ? 0.7 * intRatioScore + 0.3 * exposure.score : intRatioScore, kind: 'derivato',
      note: `Carico medio/serie ${ipiNum(rAll.int)}× la media recente${exposure ? ` · richiami ≥85% del max registrato: ${exposure.high}` : ' · richiami alta intensità: dati insufficienti'}` }
    : { score: null, kind: 'mancante', note: 'Servono carichi (kg) registrati nelle ultime 4 settimane.' };

  const workoutsWindow = state.workouts.filter((w) => w.athleteId === id && ipiDayDiff(w.date, ref) >= 0 && ipiDayDiff(w.date, ref) <= 27);
  const days = [...new Set(workoutsWindow.map((w) => w.date))].sort();
  const lowDays = [...new Set(workoutsWindow.filter((w) => (w.exercises || []).some(ipiIsLower)).map((w) => w.date))].sort();
  if (days.length) {
    const perWeek = days.length / 4;
    const freq = perWeek >= 2 && perWeek <= 3 ? 100 : (perWeek >= 1.5 && perWeek < 2) || (perWeek > 3 && perWeek <= 4) ? 80
      : perWeek >= 1 && perWeek < 1.5 ? 55 : perWeek > 4 && perWeek <= 5 ? 60 : perWeek > 5 ? 40 : 30;
    const gapShare = (ds) => (ds.length < 2 ? null : (ds.slice(1).filter((d, i) => ipiDayDiff(ds[i], d) >= 2).length / (ds.length - 1)) * 100);
    const spacingParts = [gapShare(days), gapShare(lowDays)].filter((v) => v !== null);
    const spacing = spacingParts.length ? ipiMean(spacingParts) : null;
    const matchDates = new Set(comps.map((c) => c.date));
    const clashes = days.filter((d) => matchDates.has(d) || matchDates.has(ipiAddDays(d, 1))).length;
    const clash = comps.length ? 100 * (1 - clashes / days.length) : null;
    const parts = [[freq, 0.4], [spacing, 0.3], [clash, 0.3]].filter(([v]) => v !== null);
    comp.D = {
      score: parts.reduce((a, [v, w]) => a + v * w, 0) / parts.reduce((a, [, w]) => a + w, 0), kind: 'derivato',
      note: `${days.length} sedute in 4 sett. (${ipiNum(perWeek, 1)}/sett.)${spacing !== null ? ` · distanza ≥2 giorni: ${Math.round(spacing)}%` : ''}${clash !== null ? ` · sedute in/giorno prima di una gara: ${clashes}` : ' · gare non inserite: sovrapposizione non valutata'}`
    };
  } else {
    comp.D = { score: null, kind: 'mancante', note: 'Nessuna seduta registrata nelle ultime 4 settimane.' };
  }

  if (!taper) {
    comp.T = { score: 50, kind: 'stimato', note: 'Nessuna gara importante (K ≥ 0,40) nei prossimi 14 giorni: valore neutro.' };
  } else {
    const rv = ipiVolScore(rAll.vol, true);
    const miRatio = ipiIntScore(rAll.int, true);
    const mi = miRatio !== null ? (exposure ? 0.7 * miRatio + 0.3 * exposure.score : miRatio) : null;
    if (rv === null) {
      comp.T = { score: null, kind: 'mancante', note: 'Taper non valutabile: dati di volume insufficienti.' };
    } else {
      let score = mi !== null ? 0.7 * rv + 0.3 * mi : rv;
      const excess = rAll.vol < 0.5 && rAll.int !== null && rAll.int < 0.85;
      if (excess) score *= 0.6;
      comp.T = { score, kind: 'derivato',
        note: `R_V ${ipiFmt(rv)} (volume ${ipiNum(rAll.vol)}×) · M_I ${mi !== null ? ipiFmt(mi) : '–'}${excess ? ' · riduzione eccessiva di volume e intensità' : ''}` };
    }
  }

  comp.G = guide
    ? { score: 100 * guide.E, kind: 'derivato', note: `Gara guida ${formatDate(guide.c.date)} · K ${ipiNum(guide.K)} × P ${ipiNum(guide.P)} = ${ipiNum(guide.E)}` }
    : { score: null, kind: 'mancante', note: comps.length ? 'Nessuna gara futura inserita.' : 'Calendario gare non inserito.' };

  const cal = ipiCalendar(comps, ref);
  comp.C = cal && cal.baseline > 0
    ? { score: ipiClamp(50 * cal.ratio), kind: 'derivato',
      note: `Carico pesato (7gg prima + 7gg dopo)/2 = ${ipiNum(cal.focus)} vs abituale ${ipiNum(cal.baseline)} (${ipiNum(cal.ratio)}×) · gare ultimi 7gg: ${cal.past.length}, prossimi 7gg: ${cal.next.length}` }
    : { score: null, kind: 'mancante', note: 'Calendario gare non inserito o senza coefficienti.' };

  const scrutini = state.schoolPeriods.find((p) => ref >= p.from && ref <= p.to);
  comp.S = {
    score: scrutini ? 75 : 100,
    kind: state.schoolPeriods.length ? 'misurato' : 'stimato',
    note: scrutini ? 'Periodo vicino agli scrutini.' : state.schoolPeriods.length ? 'Periodo scolastico ordinario.' : 'Nessun periodo scrutini inserito: assunto periodo ordinario.'
  };

  const att = ipiAttendance(id, ref);
  comp.A = att
    ? { score: att.score, kind: 'misurato',
      note: `Presenza ${Math.round(att.pct)}% (${att.present}/${att.total} sedute in 4 sett.)${Object.keys(att.reasons).length ? ' · assenze: ' + Object.entries(att.reasons).map(([r, n]) => `${r} ${n}`).join(', ') : ''}` }
    : { score: null, kind: 'mancante', note: 'Nessuna presenza registrata ad allenamenti nelle ultime 4 settimane.' };

  const available = Object.keys(IPI_WEIGHTS).filter((k) => comp[k].score !== null);
  const totalWeight = available.reduce((a, k) => a + IPI_WEIGHTS[k], 0);
  const ipi = totalWeight ? available.reduce((a, k) => a + comp[k].score * IPI_WEIGHTS[k], 0) / totalWeight : null;
  const reliableWeight = Object.keys(IPI_WEIGHTS)
    .filter((k) => ['misurato', 'derivato'].includes(comp[k].kind))
    .reduce((a, k) => a + IPI_WEIGHTS[k], 0);
  const missing = Object.keys(IPI_WEIGHTS).filter((k) => comp[k].kind === 'mancante');
  const estimated = Object.keys(IPI_WEIGHTS).filter((k) => comp[k].kind === 'stimato');

  return { athlete, squad, ref, comp, ipi, guide, taperEvent, cal, att, rAll, reliability: reliableWeight, missing, estimated, provisional: missing.length > 0 };
}

function ipiInterpretation(ipi) {
  if (ipi === null) return 'Dati insufficienti per calcolare l\'indice.';
  if (ipi >= 90) return 'Profilo estremamente favorevole';
  if (ipi >= 75) return 'Profilo molto coerente con l\'avvicinamento all\'evento';
  if (ipi >= 60) return 'Avvicinamento positivo, ma con elementi da controllare';
  if (ipi >= 40) return 'Fase di costruzione o transizione';
  return 'Preparazione lontana dal picco o poco coerente';
}

function ipiBand(ipi) {
  if (ipi === null) return 'none';
  return ipi >= 75 ? 'high' : ipi >= 60 ? 'mid' : ipi >= 40 ? 'low' : 'bad';
}

function ipiReliabilityLabel(r) {
  return r >= 0.85 ? 'Alta' : r >= 0.6 ? 'Media' : 'Bassa';
}

function ipiInsights(res) {
  const { comp, rAll, guide, taperEvent, cal, att } = res;
  const positives = [];
  const risks = [];
  const s = (k) => comp[k].score;
  if (s('V') !== null) {
    if (s('V') >= 75) positives.push('Volume coerente con la media recente e con la fase di avvicinamento.');
    else if (rAll.vol > 1.3) risks.push(`Picco di volume (${ipiNum(rAll.vol)}× la media recente): rischio di accumulo prima delle gare.`);
    else if (s('V') <= 50) risks.push('Volume poco coerente con la fase (troppo ridotto o non ridotto in avvicinamento al taper).');
  }
  if (s('I') !== null) {
    if (s('I') >= 75) positives.push('Intensità mantenuta rispetto alle ultime settimane.');
    else if (s('I') <= 55) risks.push('Intensità in calo marcato o sbilanciata: mancano richiami ad alta intensità.');
  }
  if (s('D') !== null) {
    if (s('D') >= 75) positives.push('Numero e distribuzione delle sedute adeguati.');
    else if (s('D') < 60) risks.push('Frequenza/distribuzione delle sedute da rivedere (sedute ravvicinate o vicino alle gare).');
  }
  if (taperEvent && s('T') !== null) {
    if (s('T') >= 75) positives.push('Taper coerente: volume ridotto con intensità mantenuta.');
    else if (s('T') < 60) risks.push('Taper poco coerente con la gara importante in arrivo.');
  }
  if (guide && guide.E >= 0.4) positives.push(`Gara guida di rilievo (${formatDate(guide.c.date)}, E = ${ipiNum(guide.E)}): obiettivo chiaro per la programmazione.`);
  if (cal && cal.ratio !== null && cal.ratio > 1.3) risks.push(`Densità competitiva elevata (${ipiNum(cal.ratio)}× l'abituale): poco recupero tra le gare.`);
  if (s('S') === 75) risks.push('Periodo vicino agli scrutini: maggiore pressione scolastica.');
  if (att) {
    if (att.score >= 80) positives.push(`Buona continuità di presenza (${Math.round(att.pct)}%).`);
    else risks.push(`Presenza ${Math.round(att.pct)}% nelle ultime 4 settimane: continuità ridotta.`);
  }
  return { positives, risks };
}

function ipiPractical(res) {
  const { comp, rAll, taperEvent, guide, att } = res;
  const lines = [];
  if (taperEvent) {
    if (rAll.vol !== null && rAll.vol > 0.95) lines.push('Gara importante entro 14 giorni: ridurre il volume (indicativamente 15–40%) mantenendo l\'intensità e 1–2 richiami qualitativi.');
    else if (rAll.int !== null && rAll.int < 0.85) lines.push('Volume già ridotto: non abbassare ulteriormente l\'intensità, mantenere richiami ad alto carico a basso volume.');
    else lines.push('Taper in linea: mantenere volume contenuto e richiami di intensità fino alla gara.');
  } else if (guide && guide.days <= 28) lines.push(`Gara guida tra ${guide.days} giorni: pianificare l'inizio del taper nelle ultime 1–2 settimane evitando picchi di volume.`);
  else lines.push('Fase di costruzione: proseguire la progressione evitando incrementi di volume superiori a circa il 15–30% rispetto alla media recente.');
  if (att && att.score < 80) lines.push('Presenza ridotta: programmare un rientro graduale in base al motivo delle assenze.');
  if (comp.S.score === 75) lines.push('Periodo scrutini: preferire sedute brevi e ben distribuite nei giorni di maggior carico scolastico.');
  if (res.provisional) lines.push('Inserire i dati mancanti (vedi sotto) per ottenere un indice completo.');
  return lines;
}

function ipiDetailHtml(res) {
  const { comp, ipi, guide, cal, att } = res;
  const band = ipiBand(ipi);
  const rel = ipiReliabilityLabel(res.reliability);
  const { positives, risks } = ipiInsights(res);
  const rows = Object.keys(IPI_WEIGHTS).map((k) => {
    const c = comp[k];
    return `<tr><td><strong>${k}</strong> · ${IPI_LABELS[k]}</td><td class="num">${ipiFmt(c.score)}</td><td class="num">${Math.round(IPI_WEIGHTS[k] * 100)}%</td>
      <td class="num">${c.score === null ? '–' : ipiNum(c.score * IPI_WEIGHTS[k], 1)}</td><td><span class="ipi-kind ipi-kind-${c.kind}">${IPI_KIND[c.kind]}</span></td><td class="ipi-note-cell">${escapeHtml(c.note)}</td></tr>`;
  }).join('');
  const guideCard = guide
    ? `<strong>${formatDate(guide.c.date)}</strong> · ${escapeHtml(guide.c.level)} · ${IPI_PHASES[guide.c.phase]}${guide.c.opponent ? ` · vs ${escapeHtml(guide.c.opponent)}` : ''}<br>K = ${ipiNum(guide.K)} · prossimità P = ${ipiNum(guide.P)} (${guide.days} giorni) · E = ${ipiNum(guide.E)}<br><small>Selezionata perché ha il valore E = K×P più alto tra le gare future.</small>`
    : 'Nessuna gara futura inserita.';
  const calCard = cal
    ? `Gare ultimi 7gg: <strong>${cal.past.length}</strong> · prossimi 7gg: <strong>${cal.next.length}</strong><br>Carico pesato ${ipiNum(cal.focus)} vs abituale ${ipiNum(cal.baseline)} (${cal.ratio === null ? '–' : ipiNum(cal.ratio) + '×'})`
    : 'Calendario gare non inserito.';
  const missingList = [
    ...res.missing.map((k) => `<li><strong>${k}</strong> ${IPI_LABELS[k]} — ${escapeHtml(comp[k].note)}</li>`),
    ...res.estimated.map((k) => `<li><strong>${k}</strong> ${IPI_LABELS[k]} — stimato: ${escapeHtml(comp[k].note)}</li>`)
  ].join('');

  return `
    <div class="ipi-hero">
      <div class="ipi-score ipi-band-${band}">${ipiFmt(ipi)}<small>/100</small></div>
      <div>
        <h4>${escapeHtml(res.athlete.name)} <span class="ipi-squad">${escapeHtml(res.squad || '')}</span></h4>
        <p>${ipiInterpretation(ipi)}</p>
        <span class="ipi-reliab">Affidabilità: <strong>${rel}</strong> (${Math.round(res.reliability * 100)}% del peso su dati misurati/derivati)${res.provisional ? ' · <strong>indice provvisorio</strong>' : ''} · riferimento ${formatDate(res.ref)}</span>
      </div>
    </div>
    <div class="ipi-chart-wrap"><canvas id="ipi-chart"></canvas></div>
    <div class="ipi-table-wrap"><table class="ipi-table">
      <thead><tr><th>Componente</th><th>Punteggio</th><th>Peso</th><th>Contributo</th><th>Tipo di dato</th><th>Dettaglio</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <div class="ipi-cards">
      <div class="ipi-card"><h5>🏆 Gara guida</h5>${guideCard}</div>
      <div class="ipi-card"><h5>📅 Densità gare (due campionati)</h5>${calCard}</div>
      <div class="ipi-card"><h5>🏫 Scuola</h5>${comp.S.score === 75 ? 'Periodo vicino agli scrutini (S = 75)' : 'Periodo ordinario (S = 100)'}${state.schoolPeriods.length ? '' : '<br><small>Assunzione: nessun periodo scrutini inserito.</small>'}</div>
      <div class="ipi-card"><h5>✅ Presenza (4 sett.)</h5>${att ? `<strong>${Math.round(att.pct)}%</strong> · ${att.present}/${att.total} sedute${Object.keys(att.reasons).length ? '<br>Assenze: ' + Object.entries(att.reasons).map(([r, n]) => `${escapeHtml(r)} ${n}`).join(', ') : ''}` : 'Nessuna presenza registrata.'}</div>
    </div>
    <div class="ipi-two">
      <div class="ipi-card good"><h5>👍 Fattori positivi</h5>${positives.length ? `<ul>${positives.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>` : '<small>Nessun fattore positivo rilevato.</small>'}</div>
      <div class="ipi-card risk"><h5>⚠️ Fattori di rischio</h5>${risks.length ? `<ul>${risks.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>` : '<small>Nessun fattore di rischio rilevato.</small>'}</div>
    </div>
    <div class="ipi-card practical"><h5>🧭 Indicazione pratica per la programmazione</h5><ul>${ipiPractical(res).map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul></div>
    ${missingList ? `<div class="ipi-card"><h5>ℹ️ Dati mancanti e assunzioni</h5><ul>${missingList}</ul></div>` : ''}
    <p class="ipi-disclaimer">Formula: IPI = 0,20·V + 0,20·I + 0,15·D + 0,05·T + 0,10·G + 0,15·C + 0,10·S + 0,05·A. Se un componente non è calcolabile i pesi vengono riproporzionati sui dati disponibili. L'indice indica la coerenza del profilo, non dimostra che l'atleta sia al picco. Fatica, dolore e readiness non sono considerati.</p>`;
}

function renderIPILists() {
  const comps = [...state.competitions].sort((a, b) => a.date.localeCompare(b.date));
  document.getElementById('ipi-comp-count').textContent = `(${comps.length})`;
  document.getElementById('ipi-comp-list').innerHTML = comps.length
    ? `<table class="ipi-table"><thead><tr><th>Data</th><th>Squadra</th><th>Camp.</th><th>Livello</th><th>Fase</th><th>K</th><th>Avversario</th><th></th></tr></thead><tbody>${comps.map((c) =>
      `<tr><td>${formatDate(c.date)}</td><td>${escapeHtml(c.squad || 'Tutte')}</td><td>${escapeHtml(c.championship)}</td><td>${escapeHtml(c.level)}</td><td>${IPI_PHASES[c.phase] || ''}</td><td class="num">${ipiNum(ipiGetK(c))}</td><td>${escapeHtml(c.opponent || '')}</td><td><button type="button" class="secondary-btn" data-del-comp="${c.id}">Elimina</button></td></tr>`).join('')}</tbody></table>`
    : '<div class="empty-state">Nessuna gara inserita.</div>';
  const periods = [...state.schoolPeriods].sort((a, b) => a.from.localeCompare(b.from));
  document.getElementById('ipi-school-count').textContent = `(${periods.length})`;
  document.getElementById('ipi-school-list').innerHTML = periods.length
    ? periods.map((p) => `<div class="ipi-list-row">${formatDate(p.from)} – ${formatDate(p.to)} <button type="button" class="secondary-btn" data-del-school="${p.id}">Elimina</button></div>`).join('')
    : '';
}

function renderIPI() {
  const report = document.getElementById('ipi-report');
  if (!report || periodState.mode !== 'ipi') return;
  const refInput = document.getElementById('ipi-ref');
  if (!refInput.value) refInput.value = getTodayISO();
  const ref = refInput.value;
  renderIPILists();

  const squad = document.getElementById('ipi-squad').value;
  const athleteId = document.getElementById('ipi-athlete').value;
  const athletes = sortAthletes(state.athletes.filter((a) => (!squad || getAthleteSquad(a) === squad) && (!athleteId || a.id === athleteId)));
  const results = athletes.map((a) => computeIPI(a, ref));

  let html = '';
  if (athleteId && results[0]) {
    html = ipiDetailHtml(results[0]);
  } else {
    const valid = results.filter((r) => r.ipi !== null);
    const avg = ipiMean(valid.map((r) => r.ipi));
    html = `<div class="ipi-hero"><div class="ipi-score ipi-band-${ipiBand(avg)}">${ipiFmt(avg)}<small>/100</small></div>
      <div><h4>${squad ? escapeHtml(squad) : 'Tutte le squadre'} · media IPI</h4><p>${valid.length} atlete con dati su ${results.length}. Seleziona un'atleta (o clicca una riga) per il report completo.</p></div></div>
      <div class="ipi-table-wrap"><table class="ipi-table ipi-clickable"><thead><tr><th>Atleta</th><th>Squadra</th><th>IPI</th>${Object.keys(IPI_WEIGHTS).map((k) => `<th title="${IPI_LABELS[k]}">${k}</th>`).join('')}<th>Affidabilità</th></tr></thead><tbody>${results.map((r) =>
      `<tr data-ipi-athlete="${r.athlete.id}"><td>${escapeHtml(r.athlete.name)}</td><td>${escapeHtml(r.squad || '')}</td><td class="num"><strong class="ipi-band-${ipiBand(r.ipi)}-text">${ipiFmt(r.ipi)}</strong></td>${Object.keys(IPI_WEIGHTS).map((k) => `<td class="num">${ipiFmt(r.comp[k].score)}</td>`).join('')}<td>${ipiReliabilityLabel(r.reliability)}${r.provisional ? ' · provv.' : ''}</td></tr>`).join('')}</tbody></table></div>
      <p class="ipi-disclaimer">Ogni atleta è calcolata con il calendario gare della propria squadra. Le celle "–" indicano dati mancanti.</p>`;
  }
  const gran = periodState.ipiGran === 'month' ? 'month' : 'week';
  const trend = `<div class="ipi-card ipi-trend">
      <div class="ipi-trend-head"><h5>📈 Andamento IPI ${athleteId ? '' : '(media)'}</h5>
        <div class="ipi-gran">
          <button type="button" class="period-mode ${gran === 'week' ? 'active' : ''}" data-ipi-gran="week">Settimana</button>
          <button type="button" class="period-mode ${gran === 'month' ? 'active' : ''}" data-ipi-gran="month">Mese</button>
        </div></div>
      <div class="ipi-chart-wrap"><canvas id="ipi-trend-chart"></canvas></div>
      <small>Ogni punto è l'IPI calcolato alla data indicata, nell'intervallo scelto con "Andamento dal / al" (passo settimanale o mensile). Le date senza dati sufficienti restano vuote.</small></div>`;
  report.innerHTML = html;
  const heroEnd = report.querySelector('.ipi-hero');
  if (heroEnd) heroEnd.insertAdjacentHTML('afterend', trend);

  const fromInput = document.getElementById('ipi-from');
  const toInput = document.getElementById('ipi-to');
  if (!toInput.value) toInput.value = ref;
  if (!fromInput.value) fromInput.value = ipiAddDays(toInput.value, -77);
  let from = fromInput.value;
  let to = toInput.value;
  if (to < from) [from, to] = [to, from];
  const dates = [];
  for (let k = 0; k < 120; k++) {
    let d;
    if (gran === 'week') d = ipiAddDays(from, 7 * k);
    else {
      const x = new Date(`${from}T12:00:00`);
      x.setMonth(x.getMonth() + k);
      d = toLocalISO(x);
    }
    if (d > to) break;
    dates.push(d);
  }
  if (dates[dates.length - 1] !== to) dates.push(to);
  const trendValues = dates.map((d) => {
    const vals = athletes.map((a) => computeIPI(a, d).ipi).filter((v) => v !== null);
    return vals.length ? Math.round(ipiMean(vals) * 10) / 10 : null;
  });
  renderChart('ipi-trend-chart', {
    type: 'line',
    data: {
      labels: dates.map((d) => formatDate(d)),
      datasets: [{
        label: 'IPI',
        data: trendValues,
        borderColor: '#075a78',
        backgroundColor: 'rgba(7,90,120,0.12)',
        pointBackgroundColor: '#bf8746',
        pointRadius: 4,
        tension: 0.3,
        fill: true,
        spanGaps: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { min: 0, max: 100, title: { display: true, text: 'IPI (0–100)' } } }
    }
  });

  if (athleteId && results[0]) {
    const r = results[0];
    const keys = Object.keys(IPI_WEIGHTS);
    renderChart('ipi-chart', {
      type: 'bar',
      data: {
        labels: keys.map((k) => `${k} · ${IPI_LABELS[k]}`),
        datasets: [{
          label: 'Punteggio (0–100)',
          data: keys.map((k) => (r.comp[k].score === null ? 0 : Math.round(r.comp[k].score))),
          backgroundColor: keys.map((k) => (r.comp[k].kind === 'stimato' ? '#bf8746' : r.comp[k].kind === 'mancante' ? '#c9d3d8' : '#075a78'))
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 100 } }
      }
    });
  }
}

function addIpiCompetition() {
  const date = document.getElementById('ipi-comp-date').value;
  if (!date) {
    alert('Inserisci la data della gara.');
    return;
  }
  state.competitions.push({
    id: generateId('comp'),
    date,
    squad: document.getElementById('ipi-comp-squad').value,
    championship: document.getElementById('ipi-comp-champ').value,
    level: document.getElementById('ipi-comp-level').value,
    phase: document.getElementById('ipi-comp-phase').value,
    opponent: document.getElementById('ipi-comp-opp').value.trim()
  });
  document.getElementById('ipi-comp-opp').value = '';
  saveState();
  renderIPI();
}

function addIpiSchoolPeriod() {
  const from = document.getElementById('ipi-school-from').value;
  const to = document.getElementById('ipi-school-to').value;
  if (!from || !to || to < from) {
    alert('Inserisci un periodo valido (Dal ≤ Al).');
    return;
  }
  state.schoolPeriods.push({ id: generateId('school'), from, to, type: 'scrutini' });
  saveState();
  renderIPI();
}

function renderSchedule() {
  const grid = document.getElementById('schedule-grid');
  if (!grid) return;

  const squadFilter = document.getElementById('schedule-squad')?.value || '';
  const athleteFilter = document.getElementById('schedule-athlete')?.value || '';
  const squadIds = squadFilter ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squadFilter).map((a) => a.id)) : null;
  const win = getScheduleWindow();

  const workouts = state.workouts.filter((w) =>
    athleteFilter ? w.athleteId === athleteFilter : (!squadIds || squadIds.has(w.athleteId))
  );
  const byDate = new Map();
  groupWorkoutsForSchedule(workouts).forEach((group) => {
    if (!byDate.has(group.date)) byDate.set(group.date, []);
    byDate.get(group.date).push(group);
  });

  const squads = getAvailableSquads();
  const todayISO = toLocalISO(new Date());
  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const lastDay = new Date(win.start);
  lastDay.setDate(lastDay.getDate() + win.weeks * 7 - 1);

  document.getElementById('schedule-range').textContent = win.view === 'month'
    ? new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(new Date(win.year, win.month, 1, 12))
    : `${formatDate(toLocalISO(win.start))} – ${formatDate(toLocalISO(lastDay))}`;

  let html = '<div class="schedule-head"><span></span>' + dayNames.map((n) => `<span>${n}</span>`).join('') + '</div>';
  for (let w = 0; w < win.weeks; w += 1) {
    const weekStart = new Date(win.start);
    weekStart.setDate(weekStart.getDate() + w * 7);
    html += `<div class="schedule-week"><div class="schedule-week-label">${formatShortDate(toLocalISO(weekStart))}</div>`;
    for (let d = 0; d < 7; d += 1) {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + d);
      const iso = toLocalISO(day);
      const dim = win.month !== null && day.getMonth() !== win.month;
      const groups = byDate.get(iso) || [];
      html += `<div class="schedule-day ${iso === todayISO ? 'today' : ''} ${dim ? 'dim' : ''}">
        <div class="schedule-day-head"><span>${day.getDate()}${win.view === 'month' && day.getDate() === 1 ? ' ' + new Intl.DateTimeFormat('it-IT', { month: 'short' }).format(day) : ''}</span>
        <button type="button" class="schedule-add-day" data-date="${iso}" title="Aggiungi allenamento">+</button></div>`;
      groups.forEach((group) => {
        const info = describeScheduleGroup(group);
        const color = SCHEDULE_COLORS[Math.max(0, squads.indexOf(info.firstSquad)) % SCHEDULE_COLORS.length];
        const exercises = group.exercises.map((ex) =>
          `<li><strong>${escapeHtml(ex.name)}</strong><span>${ex.sets}×${ex.reps}${Number(ex.weight) ? ` @ ${ex.weight} kg` : ''}${Number(ex.rest) ? ` · rec ${ex.rest}'` : ''}</span></li>`
        ).join('');
        const chips = [...group.items]
          .sort((a, b) => (getAthleteById(a.athleteId)?.name || '').localeCompare(getAthleteById(b.athleteId)?.name || '', 'it'))
          .map((item) => `<button type="button" class="schedule-chip" data-workout-id="${escapeHtml(item.id)}">${escapeHtml(getAthleteById(item.athleteId)?.name || 'Atleta sconosciuta')}</button>`)
          .join('');
        html += `<article class="schedule-card" style="--card-color:${color}">
          <h5>${escapeHtml(info.title)}</h5>
          <ul>${exercises}</ul>
          ${group.notes ? `<p class="schedule-note">${escapeHtml(group.notes)}</p>` : ''}
          <details><summary>👥 ${group.items.length} ${group.items.length === 1 ? 'atleta' : 'atlete'}</summary><div class="schedule-chips">${chips}</div></details>
        </article>`;
      });
      html += '</div>';
    }
    html += '</div>';
  }
  grid.innerHTML = html;
}

function renderPhysio() {
  const list = document.getElementById('physio-list');
  const filtered = getFilteredPhysio();

  if (!filtered.length) {
    list.innerHTML = '<div class="empty-state">Nessun trattamento fisioterapico registrato.</div>';
    return;
  }

  list.innerHTML = filtered.map((entry) => {
    const athlete = getAthleteById(entry.athleteId);
    const painSummary = entry.painRest ? ` · Riposo ${entry.painRest}/10 · Allenamento ${entry.painTraining}/10 · Dopo ${entry.painAfter}/10` : '';
    return `
      <article class="record">
        <div class="record-header">
          <h4>${escapeHtml(athlete ? athlete.name : 'Atleta sconosciuta')}</h4>
          <div class="record-actions">
            <span class="kpi">${escapeHtml(painDistrictLabel(entry))}</span>
            <button type="button" class="secondary-btn edit-physio-btn" data-physio-id="${escapeHtml(entry.id)}">Modifica</button>
          </div>
        </div>
        <div class="meta-row">
          <span>📅 ${formatDate(entry.date)}</span>
          <span>👥 ${escapeHtml(getAthleteSquad(athlete || {}) || 'Squadra non indicata')}</span>
          <span>⚠️ ${escapeHtml(entry.causeCategory || inferCauseCategory(entry.cause))} · ${escapeHtml(entry.cause)}</span>
          <span>📌 Controllo ${entry.followUp ? formatDate(entry.followUp) : 'non definito'}</span>
          ${entry.painFreeMinutes !== undefined ? `<span>🏐 ${entry.painFreeMinutes} min senza dolore</span>` : ''}
        </div>
        ${painSummary ? `<div class="text-block"><strong>Dolore:</strong>${painSummary}</div>` : ''}
        <div class="text-block"><strong>Trattamento:</strong> ${entry.treatmentType ? `${escapeHtml(entry.treatmentType)} · ` : ''}${escapeHtml(entry.treatment)}</div>
        <div class="text-block"><strong>Esercizi consigliati:</strong> ${escapeHtml(entry.exercises || 'Nessuno')}</div>
        ${entry.notes ? `<div class="text-block"><strong>Note:</strong> ${escapeHtml(entry.notes)}</div>` : ''}
      </article>
    `;
  }).join('');
}

function getFilteredPhysio() {
  const squadFilter = document.getElementById('physio-squad-filter')?.value || '';
  const athleteFilter = document.getElementById('physio-athlete-filter')?.value || '';
  const dateFrom = document.getElementById('physio-date-from')?.value || '';
  const dateTo = document.getElementById('physio-date-to')?.value || '';
  const squadAthleteIds = squadFilter ? new Set(state.athletes.filter((a) => getAthleteSquad(a) === squadFilter).map((a) => a.id)) : null;

  return [...state.physio]
    .filter((entry) => (athleteFilter ? entry.athleteId === athleteFilter : (!squadAthleteIds || squadAthleteIds.has(entry.athleteId))))
    .filter((entry) => isWithinDateRange(entry.date, dateFrom, dateTo))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function painDistrictLabel(entry) {
  const bodyPart = entry.bodyPart || 'Distretto non specificato';
  const side = entry.bodySide && !['Non specificato', 'Centrale'].includes(entry.bodySide)
    ? ` ${entry.bodySide === 'Destra' ? 'DX' : entry.bodySide === 'Sinistra' ? 'SX' : 'Bilaterale'}`
    : '';
  return `${bodyPart}${side}`;
}

function getBodyRegion(entry, view) {
  const part = (entry.bodyPart || '').toLocaleLowerCase('it-IT');
  if (part.includes('spalla') || part.includes('cuffia')) return 'shoulder';
  if (part.includes('gomito')) return 'elbow';
  if (part.includes('polso') || part.includes('mano')) return 'wrist';
  if (part.includes('bicipite') || part.includes('tricipite')) return 'upper-arm';
  if (part.includes('anca')) return 'hip';
  if (part.includes('ginocchio')) return 'knee';
  if (part.includes('caviglia')) return 'ankle';
  if (part.includes('polpaccio') || part.includes('soleo')) return 'calf';
  if (part.includes('quadricipite')) return 'thigh-front';
  if (part.includes('femorali')) return 'thigh-back';
  if (part.includes('pettoral')) return view === 'front' ? 'chest' : 'upper-back';
  if (part.includes('addominal')) return view === 'front' ? 'abdomen' : 'lower-back';
  if (part.includes('cervical')) return 'neck';
  if (part.includes('lombare')) return 'lower-back';
  return view === 'front' ? 'abdomen' : 'lower-back';
}

function getBodyMapValues(entries, view) {
  const values = new Map();
  entries.forEach((entry) => {
    const pain = Number(entry.painRest);
    if (!Number.isFinite(pain) || pain < 1 || pain > 10) return;
    const region = getBodyRegion(entry, view);
    const isMidline = ['neck', 'chest', 'abdomen', 'upper-back', 'lower-back'].includes(region);
    const sides = isMidline
      ? ['mid']
      : entry.bodySide === 'Destra' ? ['right']
        : entry.bodySide === 'Sinistra' ? ['left']
          : ['right', 'left'];
    sides.forEach((side) => {
      const key = `${region}-${side}`;
      values.set(key, Math.max(values.get(key) || 0, pain));
    });
  });
  return values;
}

function bodyZoneDefinitions(view) {
  const definitions = [
    { region: 'neck', label: 'Rachide cervicale', side: 'mid', x: 100, y: 87, rx: 12, ry: 10 },
    { region: 'shoulder', side: 'right', x: 72, y: 106, rx: 18, ry: 14 },
    { region: 'shoulder', side: 'left', x: 128, y: 106, rx: 18, ry: 14 },
    { region: 'upper-arm', side: 'right', x: 62, y: 132, rx: 11, ry: 20 },
    { region: 'upper-arm', side: 'left', x: 138, y: 132, rx: 11, ry: 20 },
    { region: 'elbow', side: 'right', x: 56, y: 157, rx: 12, ry: 11 },
    { region: 'elbow', side: 'left', x: 144, y: 157, rx: 12, ry: 11 },
    { region: 'wrist', side: 'right', x: 48, y: 187, rx: 10, ry: 12 },
    { region: 'wrist', side: 'left', x: 152, y: 187, rx: 10, ry: 12 },
    { region: view === 'front' ? 'chest' : 'upper-back', side: 'mid', x: 100, y: 124, rx: 25, ry: 18 },
    { region: view === 'front' ? 'abdomen' : 'lower-back', side: 'mid', x: 100, y: 158, rx: 21, ry: 17 },
    { region: 'hip', side: 'right', x: 87, y: 181, rx: 13, ry: 12 },
    { region: 'hip', side: 'left', x: 113, y: 181, rx: 13, ry: 12 },
    { region: view === 'front' ? 'thigh-front' : 'thigh-back', side: 'right', x: 84, y: 213, rx: 12, ry: 25 },
    { region: view === 'front' ? 'thigh-front' : 'thigh-back', side: 'left', x: 116, y: 213, rx: 12, ry: 25 },
    { region: 'knee', side: 'right', x: 83, y: 247, rx: 12, ry: 10 },
    { region: 'knee', side: 'left', x: 117, y: 247, rx: 12, ry: 10 },
    { region: 'calf', side: 'right', x: 81, y: 278, rx: 10, ry: 22 },
    { region: 'calf', side: 'left', x: 119, y: 278, rx: 10, ry: 22 },
    { region: 'ankle', side: 'right', x: 79, y: 310, rx: 10, ry: 9 },
    { region: 'ankle', side: 'left', x: 121, y: 310, rx: 10, ry: 9 }
  ];
  return definitions;
}

function renderBodyMap(entries) {
  const container = document.getElementById('body-map-content');
  const values = getBodyMapValues(entries, bodyMapView);
  document.getElementById('body-map-detail').textContent = 'Seleziona un distretto sulla mappa.';
  const details = bodyMapView === 'front'
    ? '<path class="body-detail" d="M100 104 L100 169"/><circle class="body-detail-dot" cx="100" cy="157" r="2.5"/>'
    : '<path class="body-detail" d="M100 91 L100 174 M81 111 Q90 101 99 112 M101 112 Q110 101 119 111 M84 166 Q100 178 116 166"/>';
  const parts = bodyMapView === 'front'
    ? '<circle class="body-silhouette" cx="100" cy="46" r="21"/><path class="body-silhouette" d="M82 72 Q100 64 118 72 L132 93 124 169 Q100 180 76 169 L68 93 Z"/><path class="body-silhouette" d="M68 84 Q55 84 51 99 L38 158 Q35 169 44 172 Q51 173 55 162 L73 120 M132 84 Q145 84 149 99 L162 158 Q165 169 156 172 Q149 173 145 162 L127 120"/><path class="body-silhouette" d="M78 164 Q72 184 74 218 L72 244 93 246 100 184 107 246 128 244 126 218 Q128 184 122 164"/><path class="body-silhouette" d="M74 242 L72 305 Q72 316 84 316 L94 315 94 249 M106 249 L106 315 116 316 Q128 316 128 305 L126 242"/>'
    : '<circle class="body-silhouette" cx="100" cy="46" r="21"/><path class="body-silhouette" d="M82 72 Q100 64 118 72 L132 93 124 169 Q100 180 76 169 L68 93 Z"/><path class="body-silhouette" d="M68 84 Q55 84 51 99 L38 158 Q35 169 44 172 Q51 173 55 162 L73 120 M132 84 Q145 84 149 99 L162 158 Q165 169 156 172 Q149 173 145 162 L127 120"/><path class="body-silhouette" d="M78 164 Q72 184 74 218 L72 244 93 246 100 184 107 246 128 244 126 218 Q128 184 122 164"/><path class="body-silhouette" d="M74 242 L72 305 Q72 316 84 316 L94 315 94 249 M106 249 L106 315 116 316 Q128 316 128 305 L126 242"/>';
  const zones = bodyZoneDefinitions(bodyMapView).map((zone) => {
    const id = `${zone.region}-${zone.side}`;
    const x = zone.side === 'right' && bodyMapView === 'back' ? 200 - zone.x
      : zone.side === 'left' && bodyMapView === 'back' ? 200 - zone.x
        : zone.x;
    const pain = values.get(id) || 0;
    const color = pain ? painScaleColor(pain) : '#dbe3ee';
    const sideLabel = zone.side === 'mid' ? '' : ` · lato ${zone.side === 'right' ? 'destro' : 'sinistro'}`;
    const label = `${zone.label || bodyRegionLabels[zone.region]}${sideLabel}`;
    return `<ellipse class="body-zone" role="button" data-zone="${id}" data-label="${label}" data-pain="${pain || ''}" cx="${x}" cy="${zone.y}" rx="${zone.rx}" ry="${zone.ry}" fill="${color}" aria-label="${label}: ${pain ? `${pain} su 10` : 'nessun dato'}" tabindex="0"><title>${label}: ${pain ? `${pain}/10` : 'nessun dato'}</title></ellipse>`;
  }).join('');
  container.innerHTML = `<svg class="body-map-svg" viewBox="0 0 200 335" role="group" aria-label="Mappa del corpo vista ${bodyMapView === 'front' ? 'frontale' : 'posteriore'}">${parts}${details}${zones}</svg>`;
}

const bodyRegionLabels = {
  neck: 'Rachide cervicale', shoulder: 'Spalla', 'upper-arm': 'Braccio',
  elbow: 'Gomito', wrist: 'Polso/Mano', chest: 'Pettorali', abdomen: 'Addominali',
  'upper-back': 'Rachide dorsale', 'lower-back': 'Rachide lombare', hip: 'Anca',
  'thigh-front': 'Quadricipite', 'thigh-back': 'Femorali', knee: 'Ginocchio',
  calf: 'Polpaccio/Soleo', ankle: 'Caviglia'
};

function painScaleColor(value) {
  const ratio = Math.min(1, Math.max(0, (value - 1) / 9));
  const start = [54, 200, 144];
  const end = [139, 0, 0];
  const rgb = start.map((channel, index) => Math.round(channel + (end[index] - channel) * ratio));
  return `rgb(${rgb.join(',')})`;
}

function renderPhysioAnalytics() {
  const entries = getFilteredPhysio().sort((a, b) => a.date.localeCompare(b.date));
  const total = entries.length;
  const districtCounts = new Map();
  entries.forEach((entry) => {
    const label = painDistrictLabel(entry);
    districtCounts.set(label, (districtCounts.get(label) || 0) + 1);
  });
  document.getElementById('physio-filtered-total').textContent =
    `Totale trattamenti nel periodo: ${total}`;
  const sortedDistricts = [...districtCounts.entries()].sort((a, b) => a[0].localeCompare(b[0], 'it'));
  document.getElementById('physio-district-breakdown').innerHTML = sortedDistricts.length
    ? sortedDistricts.map(([district, count]) =>
      `<li><span>${escapeHtml(district)}</span><strong>${count}</strong></li>`
    ).join('')
    : '<li>Nessun distretto nel periodo selezionato.</li>';

  if (chartInstances['physioPainHistoryChart']) {
    chartInstances['physioPainHistoryChart'].destroy();
    delete chartInstances['physioPainHistoryChart'];
  }

  renderBodyMap(entries);
}

function renderDashboardCharts() {
  const { metrics, exerciseFilter } = getDashboardData();
  const container = document.getElementById('dashboard-exercise-charts');
  const colors = ['#5d8bff', '#ffa85b', '#9d7dff', '#3dd4a5', '#66d4ff', '#f1779b'];

  if (!container.childElementCount) {
    const exerciseCard = (exercise) => {
      const index = DASHBOARD_EXERCISES.indexOf(exercise);
      const slug = `exercise-${index + 1}`;
      return `
        <article class="panel exercise-performance-card" data-exercise="${exercise}">
          <div class="exercise-performance-heading">
            <h3>${exercise}</h3>
            <span class="exercise-one-rm" id="${slug}-max">1RM stimato max: —</span>
          </div>
          <div class="exercise-charts">
            <div><h4>1RM stimato e carico reale (kg)</h4><canvas id="${slug}-1rm"></canvas></div>
            <div><h4>Training Load</h4><canvas id="${slug}-tl"></canvas></div>
          </div>
        </article>`;
    };
    const fundamentalExercises = DASHBOARD_EXERCISES.filter((exercise) => exercise !== 'Affondi');
    const complementaryExercises = DASHBOARD_EXERCISES.filter((exercise) => exercise === 'Affondi');
    container.innerHTML = `
      <section class="panel exercise-group" aria-labelledby="fundamental-exercises-title">
        <h3 id="fundamental-exercises-title">FONDAMENTALI</h3>
        <div class="exercise-group-grid">${fundamentalExercises.map(exerciseCard).join('')}</div>
      </section>
      <section class="panel exercise-group" aria-labelledby="complementary-exercises-title">
        <h3 id="complementary-exercises-title">COMPLEMENTARI</h3>
        <div class="exercise-group-grid">${complementaryExercises.map(exerciseCard).join('')}</div>
      </section>`;
  }

  DASHBOARD_EXERCISES.forEach((exercise, index) => {
    const slug = `exercise-${index + 1}`;
    const sessions = [...(metrics.get(exercise) || [])].sort((a, b) =>
      a.date.localeCompare(b.date) || a.workoutId.localeCompare(b.workoutId)
    );
    const sessionCounts = new Map();
    const labels = sessions.map((session) => {
      const occurrence = (sessionCounts.get(session.date) || 0) + 1;
      sessionCounts.set(session.date, occurrence);
      return `${formatShortDate(session.date)} · #${occurrence}`;
    });
    const color = colors[index % colors.length];
    const maxOneRep = Math.max(0, ...sessions.map((session) => session.oneRepMax));
    const card = container.querySelector(`[data-exercise="${exercise}"]`);
    card.classList.toggle('is-focused', exerciseFilter === exercise);
    document.getElementById(`${slug}-max`).textContent =
      `1RM stimato max: ${maxOneRep ? `${maxOneRep.toFixed(1)} kg` : '—'}`;

    ['1rm', 'tl'].forEach((metric) => {
      const oneRm = metric === '1rm';
      const datasets = oneRm
        ? [{
          label: '1RM stimato (kg)',
          data: sessions.map((session) => session.oneRepMax || null),
          borderColor: color,
          backgroundColor: `${color}26`,
          pointBackgroundColor: color,
          fill: false,
          tension: 0.3
        }, {
          label: 'Carico reale (kg)',
          data: sessions.map((session) => session.actualLoad),
          borderColor: '#ffa85b',
          backgroundColor: '#ffa85b',
          pointBackgroundColor: '#ffa85b',
          borderDash: [5, 4],
          fill: false,
          tension: 0.3
        }]
        : [{
          label: 'Training Load',
          data: sessions.map((session) => session.trainingLoad),
          borderColor: color,
          backgroundColor: `${color}26`,
          pointBackgroundColor: color,
          fill: true,
          tension: 0.3
        }];
      renderChart(`${slug}-${metric}`, {
        type: oneRm ? 'line' : 'bar',
        data: {
          labels,
          datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } },
          plugins: { legend: { display: oneRm } }
        }
      });
    });
  });
}

function getReportData() {
  const squad = document.getElementById('report-squad')?.value || '';
  const athleteId = document.getElementById('report-athlete')?.value || '';
  const dateFrom = document.getElementById('report-date-from')?.value || '';
  const dateTo = document.getElementById('report-date-to')?.value || '';

  const athletes = state.athletes.filter((athlete) =>
    (!squad || getAthleteSquad(athlete) === squad) &&
    (!athleteId || athlete.id === athleteId)
  );
  const targetAthleteIds = new Set(athletes.map((a) => a.id));

  const workouts = state.workouts.filter((workout) =>
    targetAthleteIds.has(workout.athleteId) &&
    isWithinDateRange(workout.date, dateFrom, dateTo)
  ).sort((a, b) => a.date.localeCompare(b.date));
  const physio = state.physio.filter((entry) =>
    targetAthleteIds.has(entry.athleteId) &&
    isWithinDateRange(entry.date, dateFrom, dateTo)
  ).sort((a, b) => a.date.localeCompare(b.date));
  const psychologicalAssessments = (state.psychologicalAssessments || [])
    .filter((entry) =>
      targetAthleteIds.has(entry.athleteId) &&
      isWithinDateRange(entry.date, dateFrom, dateTo)
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  const attendanceSessions = state.attendanceSessions
    .filter((session) => isWithinDateRange(session.date, dateFrom, dateTo))
    .map((session) => ({
      ...session,
      attendance: Object.fromEntries(Object.entries(session.attendance || {})
        .filter(([id]) => targetAthleteIds.has(id)))
    }))
    .filter((session) => Object.keys(session.attendance).length > 0);
  const attendanceRows = attendanceSessions.flatMap((session) =>
    Object.entries(session.attendance)
      .filter(([, item]) => ['Presente', 'Assente'].includes(item.status))
      .map(([id, item]) => ({ session, athleteId: id, ...item }))
  );
  const present = attendanceRows.filter((row) => row.status === 'Presente').length;
  const absent = attendanceRows.filter((row) => row.status === 'Assente').length;
  const painScores = physio.map((entry) => Number(entry.painRest))
    .filter((pain) => Number.isFinite(pain) && pain >= 1 && pain <= 10);
  const trainingLoad = workouts.reduce((total, workout) =>
    total + (workout.exercises || []).reduce((sum, exercise) => sum + calculateExerciseTL(exercise), 0), 0);
  return {
    squad,
    athleteId,
    dateFrom,
    dateTo,
    athletes,
    workouts,
    physio,
    psychologicalAssessments,
    attendanceSessions,
    attendanceRows,
    present,
    absent,
    trainingLoad,
    averageRestPain: painScores.length
      ? painScores.reduce((sum, pain) => sum + pain, 0) / painScores.length
      : null
  };
}

function renderReportSummary(data = getReportData()) {
  const athlete = data.athleteId ? getAthleteById(data.athleteId) : null;
  const titleTarget = athlete
    ? athlete.name
    : data.squad
    ? `Squadra ${data.squad}`
    : 'Tutte le atlete';
  document.getElementById('report-athlete-title').textContent =
    `Riepilogo generale · ${titleTarget}`;
  const period = data.dateFrom || data.dateTo
    ? `${data.dateFrom ? formatDate(data.dateFrom) : 'Senza limite'} – ${data.dateTo ? formatDate(data.dateTo) : 'Senza limite'}`
    : 'Tutto lo storico';
  document.getElementById('report-period-label').textContent = `Periodo: ${period}`;

  const attendanceTotal = data.present + data.absent;
  const attendanceRate = attendanceTotal ? (data.present / attendanceTotal) * 100 : 0;
  const sessionsWithAttendance = new Set(data.attendanceRows.map((row) => row.session.id));
  document.getElementById('report-athlete-count').textContent = data.athletes.length;
  document.getElementById('report-attendance-rate').textContent =
    `${attendanceRate.toLocaleString('it-IT', { maximumFractionDigits: 1 })}%`;
  document.getElementById('report-attendance-counts').textContent = `${data.present} / ${data.absent}`;
  document.getElementById('report-session-count').textContent = sessionsWithAttendance.size;
  renderChart('report-attendance-chart', {
    type: 'doughnut',
    data: {
      labels: ['Presenze', 'Assenze'],
      datasets: [{
        data: attendanceTotal ? [data.present, data.absent] : [1],
        backgroundColor: attendanceTotal ? ['#258f91', '#bf8746'] : ['#d9e5eb'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: { legend: { display: false }, tooltip: { enabled: attendanceTotal > 0 } }
    }
  });
  document.getElementById('report-attendance-detail').textContent = attendanceTotal
    ? `${data.present} presenze e ${data.absent} assenze su ${attendanceTotal} stati registrati in ${sessionsWithAttendance.size} sessioni.`
    : 'Nessun dato di presenza nel periodo selezionato.';
  document.getElementById('report-workout-count').textContent = data.workouts.length;
  document.getElementById('report-training-load').textContent = data.trainingLoad.toLocaleString('it-IT');
  document.getElementById('report-physio-count').textContent = data.physio.length;
  document.getElementById('report-physio-average-pain').textContent = data.averageRestPain === null
    ? '—'
    : `${data.averageRestPain.toLocaleString('it-IT', { maximumFractionDigits: 1 })}/10`;
  document.getElementById('report-psychological-status').textContent = data.psychologicalAssessments.length
    ? `${data.psychologicalAssessments.length} rilevazioni iPPS-48`
    : 'Dati iPPS-48 non ancora caricati';
  document.getElementById('report-psychological-detail').textContent = data.psychologicalAssessments.length
    ? `Ultima rilevazione nel periodo: ${formatDate(data.psychologicalAssessments[data.psychologicalAssessments.length - 1].date)}.`
    : 'I punteggi iPPS-48 saranno riepilogati quando saranno importati da un foglio di calcolo o dal database online.';
}

function renderReportCharts() {
  const data = getReportData();
  const { workouts: filteredWorkouts, physio: filteredPhysio } = data;
  renderReportSummary(data);

  const reportExercises = [
    { name: 'Squat', chartId: 'report-squat-1rm', color: '#5d8bff' },
    { name: 'Stacco da terra', chartId: 'report-deadlift-1rm', color: '#ffa85b' },
    { name: 'Push Press', chartId: 'report-push-press-1rm', color: '#9d7dff' }
  ];
  reportExercises.forEach(({ name, chartId, color }) => {
    const sessions = filteredWorkouts.flatMap((workout) =>
      (workout.exercises || [])
        .filter((exercise) => canonicalExerciseName(exercise.name) === name)
        .map((exercise) => ({
          date: workout.date,
          workoutId: workout.id,
          oneRepMax: estimateOneRepMax(exercise),
          actualLoad: Number(exercise.weight || 0)
        }))
    ).sort((a, b) => a.date.localeCompare(b.date) || a.workoutId.localeCompare(b.workoutId));
    const sessionCounts = new Map();
    const labels = sessions.map((session) => {
      const occurrence = (sessionCounts.get(session.date) || 0) + 1;
      sessionCounts.set(session.date, occurrence);
      return `${formatShortDate(session.date)} · #${occurrence}`;
    });
    renderChart(chartId, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '1RM stimato (kg)',
          data: sessions.map((session) => session.oneRepMax || null),
          borderColor: color,
          backgroundColor: `${color}26`,
          pointBackgroundColor: color,
          fill: false,
          tension: 0.3
        }, {
          label: 'Carico reale (kg)',
          data: sessions.map((session) => session.actualLoad),
          borderColor: '#ffa85b',
          backgroundColor: '#ffa85b',
          pointBackgroundColor: '#ffa85b',
          borderDash: [5, 4],
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: true } }
      }
    });
  });

  const anatomyCounts = new Map();
  filteredPhysio.forEach((entry) => {
    const bodyPart = entry.bodyPart.trim() || 'Parte anatomica non specificata';
    anatomyCounts.set(bodyPart, (anatomyCounts.get(bodyPart) || 0) + 1);
  });
  const sortedAnatomy = [...anatomyCounts.entries()].sort((a, b) => b[1] - a[1]);
  document.getElementById('physio-treatment-total').textContent =
    `${filteredPhysio.length} ${filteredPhysio.length === 1 ? 'trattamento' : 'trattamenti'}`;
  document.getElementById('physio-anatomy-breakdown').innerHTML = sortedAnatomy.length
    ? sortedAnatomy.map(([bodyPart, count]) => `<li><span>${bodyPart}</span><strong>${count}</strong></li>`).join('')
    : '<li>Nessun trattamento nel periodo selezionato.</li>';

  const causes = new Map();
  filteredPhysio.forEach((entry) => {
    const category = entry.causeCategory || inferCauseCategory(entry.cause);
    causes.set(category, (causes.get(category) || 0) + 1);
  });
  renderChart('physioCauseChart', {
    type: 'doughnut',
    data: {
      labels: [...causes.keys()],
      datasets: [{
        data: [...causes.values()],
        backgroundColor: ['#ffa85b', '#9d7dff', '#5d8bff']
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const monthlyPhysioCounts = new Map();
  filteredPhysio.forEach((entry) => {
    const month = entry.date.slice(0, 7);
    monthlyPhysioCounts.set(month, (monthlyPhysioCounts.get(month) || 0) + 1);
  });
  const sortedMonths = [...monthlyPhysioCounts.entries()].sort(([a], [b]) => a.localeCompare(b));

  renderChart('physioMonthlyChart', {
    type: 'bar',
    data: {
      labels: sortedMonths.map(([month]) => {
        const [year, monthNumber] = month.split('-');
        return new Intl.DateTimeFormat('it-IT', { month: 'short', year: 'numeric' })
          .format(new Date(Number(year), Number(monthNumber) - 1, 1));
      }),
      datasets: [{
        label: 'Numero di trattamenti',
        data: sortedMonths.map(([, count]) => count),
        backgroundColor: '#9d7dff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });
}

function renderChart(id, config) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  if (chartInstances[id]) chartInstances[id].destroy();
  chartInstances[id] = new Chart(canvas, config);
}

function createExerciseBlock(exercise = null) {
  const block = document.createElement('div');
  block.className = 'exercise-block';
  const standardExercises = ['Squat', 'Stacco da terra', 'Push Press', 'TRX', 'Panca Piana', 'Affondi', 'Jump Squat', 'Clean'];
  const legacyOption = exercise?.name && !standardExercises.includes(exercise.name)
    ? `<option value="${exercise.name}" selected>${exercise.name}</option>`
    : '';
  block.innerHTML = `
    <div class="exercise-block-header">
      <h4>Esercizio</h4>
      <button type="button" class="remove-exercise">Rimuovi</button>
    </div>
    <div class="field-row">
      <div class="field">
        <label>Esercizio</label>
        <select class="exercise-name" required>
          <option value="">Seleziona esercizio</option>
          ${legacyOption}
          <option value="Squat">Squat</option>
          <option value="Stacco da terra">Stacco da terra</option>
          <option value="Panca Piana">Panca Piana</option>
          <option value="Jump Squat">Jump Squat</option>
          <option value="Clean">Clean</option>
          <option value="Push Press">Push Press</option>
          <option value="TRX">TRX</option>
          <option value="Affondi">Affondi</option>
        </select>
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
    <div class="field exercise-rest-field">
      <label>Recupero (min)</label>
      <input type="number" class="exercise-rest" min="0" step="0.5" value="2" />
    </div>
  `;

  if (exercise) {
    block.querySelector('.exercise-name').value = exercise.name;
    block.querySelector('.exercise-sets').value = exercise.sets ?? 3;
    block.querySelector('.exercise-reps').value = exercise.reps ?? 8;
    block.querySelector('.exercise-weight').value = exercise.weight ?? 0;
    block.querySelector('.exercise-rest').value = exercise.rest ?? 2;
    block.dataset.exerciseId = exercise.id || '';
  }

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

function renderTrainingAssignment() {
  const squadsPanel = document.getElementById('training-squads-panel');
  const athletesPanel = document.getElementById('training-athletes-panel');
  if (!squadsPanel || !athletesPanel) return;

  const checkedSquads = new Set([...squadsPanel.querySelectorAll('input:checked')].map((i) => i.value));
  const checkedAthletes = new Set([...athletesPanel.querySelectorAll('.assign-athlete:checked')].map((i) => i.value));
  const athletes = sortAthletes(state.athletes);
  const squads = getAvailableSquads();

  squadsPanel.innerHTML = squads.map((squad) => {
    const count = athletes.filter((a) => getAthleteSquad(a) === squad).length;
    return `<label class="assign-option"><input type="checkbox" class="assign-squad" value="${escapeHtml(squad)}" ${checkedSquads.has(squad) ? 'checked' : ''} /> ${escapeHtml(squad)} <span class="assign-count">(${count})</span></label>`;
  }).join('');

  const groups = [...squads, ''].map((squad) => ({
    squad,
    list: athletes.filter((a) => (getAthleteSquad(a) || '') === squad)
  })).filter((group) => group.list.length);

  athletesPanel.innerHTML = groups.map((group) => `
    <div class="assign-group">
      <label class="assign-group-title"><input type="checkbox" class="assign-group-toggle" data-squad="${escapeHtml(group.squad)}" /> ${escapeHtml(group.squad || 'Squadra non indicata')}</label>
      <div class="assign-athlete-grid">
        ${group.list.map((a) => `<label class="assign-option"><input type="checkbox" class="assign-athlete" value="${a.id}" data-squad="${escapeHtml(group.squad)}" ${checkedAthletes.has(a.id) ? 'checked' : ''} /> ${escapeHtml(a.name)}</label>`).join('')}
      </div>
    </div>`).join('') || '<p class="assign-summary">Nessuna atleta in rosa.</p>';

  syncAssignGroupToggles();
  updateTrainingAssignmentUI();
}

function syncAssignGroupToggles() {
  document.querySelectorAll('#training-athletes-panel .assign-group-toggle').forEach((toggle) => {
    const boxes = [...document.querySelectorAll('#training-athletes-panel .assign-athlete')]
      .filter((box) => box.dataset.squad === toggle.dataset.squad);
    const checked = boxes.filter((box) => box.checked).length;
    toggle.checked = boxes.length > 0 && checked === boxes.length;
    toggle.indeterminate = checked > 0 && checked < boxes.length;
  });
}

function getAssignedAthleteIds() {
  const target = document.querySelector('input[name="training-target"]:checked')?.value || 'all';
  const athletes = state.athletes;
  if (target === 'all') return athletes.map((a) => a.id);
  if (target === 'squads') {
    const squads = new Set([...document.querySelectorAll('#training-squads-panel .assign-squad:checked')].map((i) => i.value));
    return athletes.filter((a) => squads.has(getAthleteSquad(a))).map((a) => a.id);
  }
  return [...document.querySelectorAll('#training-athletes-panel .assign-athlete:checked')].map((i) => i.value);
}

function updateTrainingAssignmentUI() {
  const target = document.querySelector('input[name="training-target"]:checked')?.value || 'all';
  document.getElementById('training-squads-panel').classList.toggle('hidden', target !== 'squads');
  document.getElementById('training-athletes-panel').classList.toggle('hidden', target !== 'athletes');
  const count = getAssignedAthleteIds().length;
  document.getElementById('training-assign-summary').textContent =
    count === 1 ? "L'allenamento verrà assegnato a 1 atleta." : `L'allenamento verrà assegnato a ${count} atlete.`;
}

function setTrainingEditMode(isEditing) {
  document.getElementById('training-form').classList.toggle('editing-workout', isEditing);
  document.getElementById('training-assign').classList.toggle('hidden', isEditing);
  document.getElementById('training-athlete-field').classList.toggle('hidden', !isEditing);
  document.getElementById('training-athlete').required = isEditing;
}

function resetTrainingForm() {
  editingWorkoutId = null;
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';
  list.appendChild(createExerciseBlock());
  document.getElementById('training-form').reset();
  document.getElementById('training-date').value = getTodayISO();
  document.getElementById('training-volume').value = '0';
  document.querySelectorAll('#training-assign input[type="checkbox"]').forEach((box) => {
    box.checked = false;
    box.indeterminate = false;
  });
  setTrainingEditMode(false);
  updateTrainingAssignmentUI();
  document.querySelector('#training-modal .modal-header h3').textContent = 'Nuovo allenamento';
  document.querySelector('#training-form button[type="submit"]').textContent = 'Salva allenamento';
}

function resetPhysioForm() {
  editingPhysioId = null;
  document.getElementById('physio-form').reset();
  document.getElementById('physio-body-part-other').classList.add('hidden');
  document.getElementById('physio-body-part-other').required = false;
  document.getElementById('physio-cause-other').classList.add('hidden');
  document.getElementById('physio-cause-other').required = false;
  populateCauseOptions('');
  document.getElementById('physio-date').value = getTodayISO();
  document.querySelector('#physio-modal .modal-header h3').textContent = 'Nuovo trattamento fisioterapico';
  document.querySelector('#physio-form button[type="submit"]').textContent = 'Salva';
}

function openModal(id) {
  if (id === 'athlete-modal') resetAthleteForm();
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  if (id === 'athlete-modal') resetAthleteForm();
  if (id === 'training-modal') resetTrainingForm();
  if (id === 'physio-modal') resetPhysioForm();
}

function editWorkout(workoutId) {
  const workout = state.workouts.find((entry) => entry.id === workoutId);
  if (!workout) return;

  editingWorkoutId = workoutId;
  setTrainingEditMode(true);
  document.getElementById('training-athlete').value = workout.athleteId;
  document.getElementById('training-date').value = workout.date;
  document.getElementById('training-notes').value = workout.notes || '';
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';
  (workout.exercises || []).forEach((exercise) => list.appendChild(createExerciseBlock(exercise)));
  if (!workout.exercises?.length) list.appendChild(createExerciseBlock());
  updateWorkoutVolume();
  document.querySelector('#training-modal .modal-header h3').textContent = 'Modifica allenamento';
  document.querySelector('#training-form button[type="submit"]').textContent = 'Salva modifiche';
  openModal('training-modal');
}

function editPhysio(physioId) {
  const entry = state.physio.find((item) => item.id === physioId);
  if (!entry) return;

  editingPhysioId = physioId;
  document.getElementById('physio-athlete').value = entry.athleteId;
  document.getElementById('physio-date').value = entry.date;
  const bodyPartSelect = document.getElementById('physio-body-part');
  const knownBodyPart = [...bodyPartSelect.options].some((option) => option.value === entry.bodyPart);
  bodyPartSelect.value = knownBodyPart ? entry.bodyPart : 'Altro';
  document.getElementById('physio-body-part-other').value = knownBodyPart ? '' : entry.bodyPart;
  document.getElementById('physio-body-part-other').classList.toggle('hidden', knownBodyPart);
  document.getElementById('physio-body-part-other').required = !knownBodyPart;
  const category = entry.causeCategory || inferCauseCategory(entry.cause);
  document.getElementById('physio-cause-category').value = category;
  populateCauseOptions(category, entry.cause);
  document.getElementById('physio-cause-other').value = '';
  document.getElementById('physio-cause-other').classList.toggle('hidden', entry.cause !== 'Altro');
  document.getElementById('physio-cause-other').required = entry.cause === 'Altro';
  const treatmentTypes = [...document.getElementById('physio-treatment-type').options].map((option) => option.value);
  document.getElementById('physio-treatment-type').value = treatmentTypes.includes(entry.treatmentType) ? entry.treatmentType : 'Altro';
  document.getElementById('physio-body-side').value = entry.bodySide || 'Non specificato';
  document.getElementById('physio-treatment').value = entry.treatment;
  document.getElementById('physio-pain-rest').value = entry.painRest ?? '';
  document.getElementById('physio-pain-training').value = entry.painTraining ?? '';
  document.getElementById('physio-pain-after').value = entry.painAfter ?? '';
  document.getElementById('physio-pain-free-minutes').value = entry.painFreeMinutes ?? '';
  document.getElementById('physio-exercises').value = entry.exercises || '';
  document.getElementById('physio-followup').value = entry.followUp || '';
  document.getElementById('physio-notes').value = entry.notes || '';
  document.querySelector('#physio-modal .modal-header h3').textContent = 'Modifica trattamento fisioterapico';
  document.querySelector('#physio-form button[type="submit"]').textContent = 'Salva modifiche';
  openModal('physio-modal');
}

function resetAthleteForm() {
  editingAthleteId = null;
  document.getElementById('athlete-form').reset();
  const select = document.getElementById('athlete-roster-select');
  select.replaceChildren(new Option('Seleziona un’atleta', ''));
  sortAthletes(state.athletes)
    .forEach((athlete) => select.add(new Option(
      `${athlete.name} · ${getAthleteSquad(athlete) || 'Squadra non indicata'}`,
      athlete.id
    )));
  select.add(new Option('Aggiungi una nuova atleta…', '__new__'));
  document.getElementById('new-athlete-name-field').classList.add('hidden');
  document.getElementById('athlete-name').required = false;
  document.querySelector('#athlete-modal .modal-header h3').textContent = 'Seleziona o aggiungi atleta';
  document.querySelector('#athlete-form button[type="submit"]').textContent = 'Continua';
}

function selectAthleteForForm() {
  const select = document.getElementById('athlete-roster-select');
  const selectedId = select.value;
  const newNameField = document.getElementById('new-athlete-name-field');
  const newNameInput = document.getElementById('athlete-name');
  newNameField.classList.toggle('hidden', selectedId !== '__new__');
  newNameInput.required = selectedId === '__new__';
  newNameInput.value = '';

  if (!selectedId || selectedId === '__new__') {
    editingAthleteId = null;
    document.getElementById('athlete-dob').value = '';
    document.getElementById('athlete-squad').value = '';
    document.getElementById('athlete-role').value = '';
    document.getElementById('athlete-notes').value = '';
    document.querySelector('#athlete-modal .modal-header h3').textContent =
      selectedId === '__new__' ? 'Nuova atleta' : 'Seleziona o aggiungi atleta';
    document.querySelector('#athlete-form button[type="submit"]').textContent =
      selectedId === '__new__' ? 'Aggiungi atleta' : 'Continua';
    return;
  }

  const athlete = state.athletes.find((entry) => entry.id === selectedId);
  if (!athlete) {
    resetAthleteForm();
    return;
  }
  editingAthleteId = athlete.id;
  document.getElementById('athlete-dob').value = athlete.dob || '';
  document.getElementById('athlete-squad').value = getAthleteSquad(athlete);
  document.getElementById('athlete-role').value = athlete.role || '';
  document.getElementById('athlete-notes').value = athlete.notes || '';
  document.querySelector('#athlete-modal .modal-header h3').textContent = `Modifica ${athlete.name}`;
  document.querySelector('#athlete-form button[type="submit"]').textContent = 'Salva modifiche';
}

function addAthlete(event) {
  event.preventDefault();
  const selection = document.getElementById('athlete-roster-select').value;
  const name = selection === '__new__'
    ? document.getElementById('athlete-name').value.trim()
    : state.athletes.find((athlete) => athlete.id === editingAthleteId)?.name;
  if (!name) return;

  const duplicate = state.athletes.find((athlete) =>
    athlete.name.trim().toLocaleLowerCase('it-IT') === name.trim().toLocaleLowerCase('it-IT') &&
    athlete.id !== editingAthleteId
  );
  if (duplicate) {
    window.alert(`${duplicate.name} è già presente nella rosa.`);
    document.getElementById('athlete-roster-select').value = duplicate.id;
    selectAthleteForForm();
    return;
  }

  const athleteData = {
    name,
    dob: document.getElementById('athlete-dob').value,
    squad: document.getElementById('athlete-squad').value,
    role: document.getElementById('athlete-role').value,
    category: document.getElementById('athlete-squad').value,
    notes: document.getElementById('athlete-notes').value.trim()
  };

  if (editingAthleteId) {
    const athlete = state.athletes.find((entry) => entry.id === editingAthleteId);
    if (!athlete) return;
    Object.assign(athlete, athleteData);
  } else {
    state.athletes.push({ id: generateId('athlete'), ...athleteData });
  }

  state.athletes = sortAthletes(state.athletes);
  saveState();
  renderAll();
  closeModal('athlete-modal');
}

function addWorkout(event) {
  event.preventDefault();
  const date = document.getElementById('training-date').value;
  const athleteIds = editingWorkoutId
    ? [document.getElementById('training-athlete').value]
    : getAssignedAthleteIds();
  if (!date) return;
  if (!athleteIds.length || !athleteIds[0]) {
    window.alert('Seleziona almeno un destinatario per l\'allenamento.');
    return;
  }

  const blocks = document.querySelectorAll('#exercise-list .exercise-block');
  const exercises = [...blocks].map((block) => {
    const sets = Number(block.querySelector('.exercise-sets').value || 0);
    const reps = Number(block.querySelector('.exercise-reps').value || 0);
    const weight = Number(block.querySelector('.exercise-weight').value || 0);
    return {
      id: block.dataset.exerciseId || '',
      name: block.querySelector('.exercise-name').value.trim(),
      sets,
      reps,
      weight,
      rest: Number(block.querySelector('.exercise-rest').value || 0),
      volumePerSet: reps * weight,
      tl: sets * reps * weight
    };
  }).filter((ex) => ex.name && ex.sets > 0 && ex.reps > 0);

  if (!exercises.length) return;

  const notes = document.getElementById('training-notes').value.trim();
  const buildExercises = () => exercises.map((ex) => ({ ...ex, id: ex.id || generateId('ex') }));

  if (editingWorkoutId) {
    const index = state.workouts.findIndex((workout) => workout.id === editingWorkoutId);
    if (index === -1) return;
    state.workouts[index] = {
      ...state.workouts[index],
      athleteId: athleteIds[0],
      date,
      notes,
      exercises: buildExercises()
    };
  } else {
    athleteIds.forEach((athleteId) => {
      state.workouts.push({
        id: generateId('wo'),
        athleteId,
        date,
        notes,
        exercises: exercises.map((ex) => ({ ...ex, id: generateId('ex') }))
      });
    });
  }

  saveState();
  renderAll();
  closeModal('training-modal');
  resetTrainingForm();
}

function addPhysio(event) {
  event.preventDefault();
  const athleteId = document.getElementById('physio-athlete').value;
  const date = document.getElementById('physio-date').value;
  const selectedBodyPart = document.getElementById('physio-body-part').value;
  const bodyPart = selectedBodyPart === 'Altro'
    ? document.getElementById('physio-body-part-other').value.trim()
    : selectedBodyPart;
  const causeCategory = document.getElementById('physio-cause-category').value;
  const selectedCause = document.getElementById('physio-cause').value;
  const cause = selectedCause === 'Altro'
    ? document.getElementById('physio-cause-other').value.trim()
    : selectedCause;
  const treatmentType = document.getElementById('physio-treatment-type').value;
  const treatment = document.getElementById('physio-treatment').value.trim();
  const painRest = Number(document.getElementById('physio-pain-rest').value);
  const painTraining = Number(document.getElementById('physio-pain-training').value);
  const painAfter = Number(document.getElementById('physio-pain-after').value);
  const painFreeMinutes = Number(document.getElementById('physio-pain-free-minutes').value);

  if (!athleteId || !date || !bodyPart || !causeCategory || !cause || !treatmentType || !treatment ||
      ![painRest, painTraining, painAfter].every((value) => Number.isInteger(value) && value >= 1 && value <= 10) ||
      !Number.isFinite(painFreeMinutes)) return;

  const updatedEntry = {
    athleteId,
    date,
    bodyPart,
    cause,
    causeCategory,
    treatmentType,
    treatment,
    bodySide: document.getElementById('physio-body-side').value,
    painRest,
    painTraining,
    painAfter,
    painFreeMinutes,
    exercises: document.getElementById('physio-exercises').value.trim(),
    followUp: document.getElementById('physio-followup').value,
    notes: document.getElementById('physio-notes').value.trim()
  };
  if (editingPhysioId) {
    const index = state.physio.findIndex((entry) => entry.id === editingPhysioId);
    if (index === -1) return;
    state.physio[index] = { ...state.physio[index], ...updatedEntry };
  } else {
    state.physio.push({ id: generateId('ph'), ...updatedEntry });
  }

  saveState();
  renderAll();
  closeModal('physio-modal');
  resetPhysioForm();
}

function addAttendanceSession(event) {
  event.preventDefault();
  const rows = [...document.querySelectorAll('#attendance-athlete-list [data-attendance-row]')];
  if (!rows.length) return;
  const attendance = {};
  for (const row of rows) {
    const status = row.querySelector('.attendance-status').value;
    if (!['Presente', 'Assente'].includes(status)) return;
    attendance[row.dataset.athleteId] = {
      status,
      reason: status === 'Assente' ? row.querySelector('.attendance-reason').value : ''
    };
  }
  const date = document.getElementById('attendance-date').value;
  if (!date) return;
  const squad = document.getElementById('attendance-squad-filter')?.value || '';
  state.attendanceSessions.push({
    id: generateId('attendance'),
    date,
    type: document.getElementById('attendance-type').value,
    squad,
    label: document.getElementById('attendance-label').value.trim(),
    attendance
  });
  saveState();
  event.currentTarget.reset();
  document.getElementById('attendance-date').value = getTodayISO();
  renderAttendanceAthleteInputs({});
  renderAttendance();
}

function exportCsv() {
  const rows = [['Tipo', 'Atleta', 'Squadra', 'Data', 'Dettagli']];

  sortAthletes(state.athletes).forEach((athlete) => {
    rows.push(['Atleta', athlete.name, getAthleteSquad(athlete), athlete.dob || '', athlete.notes || '']);
  });

  state.workouts.forEach((workout) => {
    const athleteName = getAthleteById(workout.athleteId)?.name || '';
    const details = workout.exercises.map((ex) => `${ex.name}: ${ex.sets}x${ex.reps} @ ${ex.weight} kg, TL ${calculateExerciseTL(ex)}`).join(' | ');
    rows.push(['Allenamento', athleteName, getAthleteSquad(getAthleteById(workout.athleteId) || {}), workout.date, details]);
  });

  state.physio.forEach((entry) => {
    const athleteName = getAthleteById(entry.athleteId)?.name || '';
    rows.push(['Fisioterapia', athleteName, getAthleteSquad(getAthleteById(entry.athleteId) || {}), entry.date,
      `${painDistrictLabel(entry)} | ${entry.causeCategory || inferCauseCategory(entry.cause)}: ${entry.cause} | ${entry.treatmentType || ''}: ${entry.treatment} | Dolore riposo/durante/dopo: ${entry.painRest ?? ''}/${entry.painTraining ?? ''}/${entry.painAfter ?? ''} | Minuti senza dolore: ${entry.painFreeMinutes ?? ''}`]);
  });

  state.attendanceSessions.forEach((session) => {
    Object.entries(session.attendance || {}).forEach(([athleteId, item]) => {
      const athlete = getAthleteById(athleteId);
      rows.push(['Registro Presenze', athlete?.name || '', getAthleteSquad(athlete || {}), session.date,
        `${session.type}${session.squad ? ` · ${session.squad}` : ''}${session.label ? ` · ${session.label}` : ''} | ${item.status}${item.reason ? ` · ${item.reason}` : ''}`]);
    });
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
  document.body.classList.add('printing-report');
  window.print();
}

function exportReportExcel() {
  const data = getReportData();
  const athleteName = data.athleteId
    ? getAthleteById(data.athleteId)?.name || 'Atleta sconosciuta'
    : data.squad
    ? `Squadra ${data.squad}`
    : 'Tutte le atlete';
  const period = data.dateFrom || data.dateTo
    ? `${data.dateFrom ? formatDate(data.dateFrom) : 'Senza limite'} - ${data.dateTo ? formatDate(data.dateTo) : 'Senza limite'}`
    : 'Tutto lo storico';
  const makeTable = (headers, rows) => {
    const header = `<tr>${headers.map((cell) => `<th>${escapeExcelCell(cell)}</th>`).join('')}</tr>`;
    const body = rows.map((row) =>
      `<tr>${row.map((cell) => `<td>${escapeExcelCell(cell)}</td>`).join('')}</tr>`
    ).join('');
    return `<table>${header}${body}</table>`;
  };
  const attendanceTotal = data.present + data.absent;
  const attendanceRate = attendanceTotal ? (data.present / attendanceTotal) * 100 : 0;
  const sessionsWithAttendance = new Set(data.attendanceRows.map((row) => row.session.id)).size;
  const athleteRows = data.athletes.map((athlete) => [
    athlete.name,
    getAthleteSquad(athlete),
    athlete.role || '',
    athlete.dob || ''
  ]);
  const attendanceRows = data.attendanceRows.map((row) => [
    getAthleteById(row.athleteId)?.name || 'Atleta rimossa',
    formatDate(row.session.date),
    row.session.type || '',
    row.session.label || '',
    row.status,
    row.reason || ''
  ]);
  const workoutRows = data.workouts.flatMap((workout) => {
    const athlete = getAthleteById(workout.athleteId);
    return (workout.exercises || []).map((exercise) => [
      athlete?.name || 'Atleta rimossa',
      formatDate(workout.date),
      exercise.name || '',
      exercise.sets || 0,
      exercise.reps || 0,
      exercise.weight || 0,
      calculateExerciseTL(exercise),
      workout.notes || ''
    ]);
  });
  const physioRows = data.physio.map((entry) => [
    getAthleteById(entry.athleteId)?.name || 'Atleta rimossa',
    formatDate(entry.date),
    painDistrictLabel(entry),
    entry.causeCategory || inferCauseCategory(entry.cause),
    entry.cause || '',
    entry.treatmentType || '',
    entry.treatment || '',
    entry.painRest ?? '',
    entry.painTraining ?? '',
    entry.painAfter ?? '',
    entry.painFreeMinutes ?? '',
    entry.exercises || '',
    entry.followUp ? formatDate(entry.followUp) : '',
    entry.notes || ''
  ]);
  const psychologicalRows = data.psychologicalAssessments.map((assessment) => {
    const scores = assessment.scores || assessment;
    return [
      getAthleteById(assessment.athleteId)?.name || 'Atleta rimossa',
      formatDate(assessment.date),
      ...IPPS48_ITEMS.map(({ key }) => scores[key] ?? '')
    ];
  });
  const workbook = `<!doctype html><html><head><meta charset="utf-8"></head><body>
    <h1>Dashboard report generale - Chorus Life Volley Bergamo Academy</h1>
    <p>Atleta: ${escapeExcelCell(athleteName)} | Periodo: ${escapeExcelCell(period)}</p>
    <h2>AREA GENERALE</h2>
    ${makeTable(['Indicatore', 'Valore'], [
      ['Atlete incluse', data.athletes.length],
      ['Sessioni con presenze', sessionsWithAttendance],
      ['Presenze', data.present],
      ['Assenze', data.absent],
      ['Percentuale di presenza', `${attendanceRate.toLocaleString('it-IT', { maximumFractionDigits: 1 })}%`]
    ])}
    ${makeTable(['Atleta', 'Squadra', 'Ruolo', 'Data di nascita'], athleteRows)}
    <h3>Registro presenze</h3>
    ${makeTable(['Atleta', 'Data', 'Tipo sessione', 'Descrizione', 'Stato', 'Motivazione'], attendanceRows)}
    <h2>AREA ATLETICA</h2>
    ${makeTable(['Indicatore', 'Valore'], [
      ['Allenamenti', data.workouts.length],
      ['Training Load totale', data.trainingLoad]
    ])}
    ${makeTable(['Atleta', 'Data', 'Esercizio', 'Serie', 'Ripetizioni', 'Carico (kg)', 'Training Load', 'Note seduta'], workoutRows)}
    <h2>AREA TECNICA</h2>
    ${makeTable(['Stato'], [['Dati non disponibili: collegamento al database online non configurato.']])}
    <h2>AREA MENTALE</h2>
    ${data.psychologicalAssessments.length
      ? makeTable(['Atleta', 'Data', ...IPPS48_ITEMS.map(({ label }) => label)], psychologicalRows)
      : makeTable(['Stato'], [['Dati iPPS-48 non ancora caricati.']])}
    <h2>AREA FISIOTERAPICA</h2>
    ${makeTable(['Indicatore', 'Valore'], [
      ['Trattamenti', data.physio.length],
      ['Dolore medio a riposo (1-10)', data.averageRestPain === null
        ? 'Non disponibile'
        : data.averageRestPain.toLocaleString('it-IT', { maximumFractionDigits: 1 })]
    ])}
    ${makeTable([
      'Atleta', 'Data', 'Distretto', 'Categoria causa', 'Causa', 'Tipo trattamento',
      'Trattamento', 'Dolore riposo (1-10)', 'Dolore durante (1-10)', 'Dolore dopo (1-10)',
      'Minuti senza dolore', 'Esercizi consigliati', 'Follow-up', 'Note'
    ], physioRows)}
  </body></html>`;
  const blob = new Blob(['\ufeff', workbook], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'chorus-report-generale.xls';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function printDashboard() {
  document.body.classList.add('printing-dashboard');
  window.print();
}

function printPhysio() {
  document.body.classList.add('printing-physio');
  window.print();
}

function escapeExcelCell(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function exportDashboardExcel() {
  const { athleteId, metrics } = getDashboardData();
  const athleteName = athleteId ? getAthleteById(athleteId)?.name || '' : 'Tutte le atlete';
  const rows = [['Atleta', 'Data', 'Seduta', 'Esercizio', 'Serie', 'Ripetizioni', 'Carico reale (kg)', '1RM stimato (kg)', 'Training Load']];
  DASHBOARD_EXERCISES.forEach((exercise) => {
    const sessions = [...(metrics.get(exercise) || [])].sort((a, b) =>
      a.date.localeCompare(b.date) || a.workoutId.localeCompare(b.workoutId)
    );
    sessions.forEach((session) => {
      rows.push([
        getAthleteById(session.athleteId)?.name || athleteName,
        session.date,
        session.workoutId,
        exercise,
        session.sets,
        session.reps,
        session.actualLoad,
        session.oneRepMax ? session.oneRepMax.toFixed(1) : '',
        session.trainingLoad
      ]);
    });
  });
  const table = rows.map((row, rowIndex) =>
    `<tr>${row.map((cell) => `<${rowIndex ? 'td' : 'th'}>${escapeExcelCell(cell)}</${rowIndex ? 'td' : 'th'}>`).join('')}</tr>`
  ).join('');
  const workbook = `<!doctype html><html><head><meta charset="utf-8"></head><body><table>${table}</table></body></html>`;
  const blob = new Blob(['\ufeff', workbook], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'chorus-dashboard-performance.xls';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportPhysioExcel() {
  const entries = getFilteredPhysio().sort((a, b) =>
    a.date.localeCompare(b.date) || String(a.id).localeCompare(String(b.id))
  );
  const districtCounts = new Map();
  entries.forEach((entry) => {
    const district = painDistrictLabel(entry);
    districtCounts.set(district, (districtCounts.get(district) || 0) + 1);
  });
  const athleteFilter = document.getElementById('physio-athlete-filter').value;
  const athleteName = athleteFilter ? getAthleteById(athleteFilter)?.name || '' : 'Tutte le atlete';
  const escape = escapeExcelCell;
  const table = (headers, rows) => {
    const header = `<tr>${headers.map((cell) => `<th>${escape(cell)}</th>`).join('')}</tr>`;
    const body = rows.map((row) =>
      `<tr>${row.map((cell) => `<td>${escape(cell)}</td>`).join('')}</tr>`
    ).join('');
    return `<table>${header}${body}</table>`;
  };
  const districtRows = [...districtCounts.entries()].sort((a, b) => a[0].localeCompare(b[0], 'it'));
  const treatmentRows = entries.map((entry) => [
    getAthleteById(entry.athleteId)?.name || 'Atleta sconosciuta',
    formatDate(entry.date),
    painDistrictLabel(entry),
    entry.painRest ?? '',
    entry.painTraining ?? '',
    entry.painAfter ?? '',
    entry.painFreeMinutes ?? '',
    entry.causeCategory || inferCauseCategory(entry.cause),
    entry.cause || '',
    entry.treatmentType || '',
    entry.treatment || '',
    entry.followUp ? formatDate(entry.followUp) : '',
    entry.notes || ''
  ]);
  const historyRows = entries.filter((entry) =>
    Number.isInteger(Number(entry.painRest)) && Number(entry.painRest) >= 1
  ).map((entry) => [
    getAthleteById(entry.athleteId)?.name || 'Atleta sconosciuta',
    formatDate(entry.date),
    painDistrictLabel(entry),
    Number(entry.painRest),
    Number(entry.painTraining) || '',
    Number(entry.painAfter) || '',
    Number(entry.painFreeMinutes) || 0
  ]);
  const workbook = `<!doctype html><html><head><meta charset="utf-8"></head><body>
    <h1>Report fisioterapia - Chorus Life Volley Bergamo Academy</h1>
    <p>Atleta: ${escape(athleteName)} | Periodo: ${escape(document.getElementById('physio-date-from').value || 'inizio')}
    - ${escape(document.getElementById('physio-date-to').value || 'oggi')}</p>
    <h2>Totale trattamenti: ${entries.length}</h2>
    <h2>Distribuzione per distretto</h2>${table(['Distretto', 'Trattamenti'], districtRows)}
    <h2>Storico completo dei trattamenti</h2>${table([
      'Atleta', 'Data', 'Distretto', 'Dolore riposo (1-10)', 'Dolore durante (1-10)',
      'Dolore dopo (1-10)', 'Minuti senza dolore', 'Categoria causa', 'Causa',
      'Tipo trattamento', 'Trattamento', 'Follow-up', 'Note'
    ], treatmentRows)}
    <h2>Storico analitico del dolore (un record per trattamento)</h2>${table([
      'Atleta', 'Data', 'Distretto', 'Dolore riposo (1-10)', 'Dolore durante (1-10)',
      'Dolore dopo (1-10)', 'Minuti senza dolore'
    ], historyRows)}
  </body></html>`;
  const blob = new Blob(['\ufeff', workbook], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'chorus-report-fisioterapia.xls';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderAll() {
  connectionState();
  updateDashboardStats();
  renderAthletes();
  renderWorkouts();
  renderSchedule();
  renderPeriodization();
  renderPhysio();
  renderPhysioAnalytics();
  renderTechnicalArea();
  renderPsychologicalArea();
  renderAttendance();
  renderDashboardCharts();
  renderReportCharts();
}

function refreshDashboard() {
  updateDashboardStats();
  renderDashboardCharts();
}

function showPage(pageId, activeNavPageId, title) {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.page === activeNavPageId);
  });
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });
  document.getElementById('page-title').textContent = title;
}

function bindEvents() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      showPage(button.dataset.page, button.dataset.page, button.textContent.trim());
    });
  });

  document.getElementById('open-training-btn').addEventListener('click', () => {
    showPage('training', 'dashboard', 'Allenamenti');
  });
  document.getElementById('back-to-athletics-btn').addEventListener('click', () => {
    const athleticsNavItem = document.querySelector('.nav-item[data-page="dashboard"]');
    showPage('dashboard', 'dashboard', athleticsNavItem.textContent.trim());
  });

  document.getElementById('add-athlete-btn').addEventListener('click', () => openModal('athlete-modal'));
  document.getElementById('athlete-roster-select').addEventListener('change', selectAthleteForForm);
  document.getElementById('athlete-form').addEventListener('submit', addAthlete);
  document.getElementById('dashboard-squad-filter').addEventListener('change', () => {
    syncAthleteSelect('dashboard-squad-filter', 'dashboard-athlete-filter');
    refreshDashboard();
  });
  document.getElementById('dashboard-athlete-filter').addEventListener('change', refreshDashboard);
  document.getElementById('dashboard-exercise-filter').addEventListener('change', refreshDashboard);
  document.getElementById('dashboard-date-from').addEventListener('change', refreshDashboard);
  document.getElementById('dashboard-date-to').addEventListener('change', refreshDashboard);

  document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', (event) => {
      const modal = event.target.closest('.modal');
      if (modal) closeModal(modal.id);
    });
  });

  document.getElementById('trainings-list').addEventListener('click', (event) => {
    const button = event.target.closest('.edit-workout-btn');
    if (button) editWorkout(button.dataset.workoutId);
  });

  document.getElementById('period-modes').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-mode]');
    if (!btn) return;
    periodState.mode = btn.dataset.mode;
    document.querySelectorAll('.period-mode').forEach((b) => b.classList.toggle('active', b === btn));
    document.getElementById('period-mode-progress').classList.toggle('hidden', periodState.mode !== 'progress');
    document.getElementById('period-mode-ipi').classList.toggle('hidden', periodState.mode !== 'ipi');
    renderPeriodization();
  });
  document.getElementById('ipi-squad').addEventListener('change', () => {
    syncAthleteSelect('ipi-squad', 'ipi-athlete');
    renderIPI();
  });
  ['ipi-athlete', 'ipi-ref', 'ipi-from', 'ipi-to'].forEach((id) => document.getElementById(id).addEventListener('change', renderIPI));
  document.getElementById('ipi-comp-add').addEventListener('click', addIpiCompetition);
  document.getElementById('ipi-school-add').addEventListener('click', addIpiSchoolPeriod);
  document.getElementById('ipi-comp-list').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-del-comp]');
    if (!btn) return;
    state.competitions = state.competitions.filter((c) => c.id !== btn.dataset.delComp);
    saveState();
    renderIPI();
  });
  document.getElementById('ipi-school-list').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-del-school]');
    if (!btn) return;
    state.schoolPeriods = state.schoolPeriods.filter((p) => p.id !== btn.dataset.delSchool);
    saveState();
    renderIPI();
  });
  document.getElementById('ipi-report').addEventListener('click', (event) => {
    const gran = event.target.closest('[data-ipi-gran]');
    if (gran) {
      periodState.ipiGran = gran.dataset.ipiGran;
      renderIPI();
      return;
    }
    const row = event.target.closest('[data-ipi-athlete]');
    if (!row) return;
    document.getElementById('ipi-athlete').value = row.dataset.ipiAthlete;
    renderIPI();
  });
  document.getElementById('period-squad').addEventListener('change', () => {
    syncAthleteSelect('period-squad', 'period-athlete');
    periodState.initialized = false;
    periodState.selected.clear();
    renderPeriodization();
  });
  ['period-athlete', 'period-date-from', 'period-date-to'].forEach((id) => {
    document.getElementById(id).addEventListener('change', () => {
      periodState.initialized = false;
      periodState.selected.clear();
      renderPeriodization();
    });
  });
  document.getElementById('period-clear').addEventListener('click', () => {
    ['period-squad', 'period-athlete', 'period-date-from', 'period-date-to', 'period-search'].forEach((id) => {
      document.getElementById(id).value = '';
    });
    syncAthleteSelect('period-squad', 'period-athlete');
    periodState.initialized = false;
    periodState.selected.clear();
    renderPeriodization();
  });
  document.getElementById('period-search').addEventListener('input', renderPeriodization);
  document.getElementById('period-group').addEventListener('change', renderPeriodization);
  document.getElementById('period-agg').addEventListener('change', renderPeriodization);
  document.getElementById('period-select-all').addEventListener('change', (event) => {
    const names = [...document.querySelectorAll('#period-exercises input')].map((i) => i.value);
    names.forEach((n) => (event.target.checked ? periodState.selected.add(n) : periodState.selected.delete(n)));
    renderPeriodization();
  });
  document.getElementById('period-exercises').addEventListener('change', (event) => {
    const input = event.target.closest('input');
    if (!input) return;
    if (input.checked) periodState.selected.add(input.value); else periodState.selected.delete(input.value);
    renderPeriodization();
  });
  document.getElementById('period-step').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-step]');
    if (!btn) return;
    periodState.step = Number(btn.dataset.step);
    renderPeriodization();
  });
  document.getElementById('period-steps').addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-dir]');
    if (btn) adjustPeriodDraft(btn.dataset.key, btn.dataset.dir);
  });
  document.getElementById('period-reset').addEventListener('click', () => {
    periodState.deltas = {};
    renderPeriodization();
  });
  document.getElementById('period-apply').addEventListener('click', applyPeriodDraft);
  document.getElementById('period-tabs').addEventListener('click', (event) => {
    const tab = event.target.closest('.period-tab');
    if (!tab) return;
    periodState.metric = tab.dataset.metric;
    document.getElementById('period-agg').value = periodState.metric === 'tl' ? 'sum' : 'avg';
    renderPeriodization();
  });

  document.getElementById('schedule-squad').addEventListener('change', () => {
    syncAthleteSelect('schedule-squad', 'schedule-athlete');
    renderSchedule();
  });
  document.getElementById('schedule-athlete').addEventListener('change', renderSchedule);
  document.getElementById('schedule-view').addEventListener('change', renderSchedule);
  document.getElementById('schedule-prev').addEventListener('click', () => shiftSchedule(-1));
  document.getElementById('schedule-next').addEventListener('click', () => shiftSchedule(1));
  document.getElementById('schedule-today').addEventListener('click', () => {
    scheduleState.anchor = new Date();
    renderSchedule();
  });
  document.getElementById('schedule-add-btn').addEventListener('click', () => openModal('training-modal'));
  document.getElementById('schedule-grid').addEventListener('click', (event) => {
    const chip = event.target.closest('.schedule-chip');
    if (chip) {
      editWorkout(chip.dataset.workoutId);
      return;
    }
    const addButton = event.target.closest('.schedule-add-day');
    if (addButton) {
      openModal('training-modal');
      document.getElementById('training-date').value = addButton.dataset.date;
    }
  });
  document.getElementById('physio-list').addEventListener('click', (event) => {
    const button = event.target.closest('.edit-physio-btn');
    if (button) editPhysio(button.dataset.physioId);
  });
  document.getElementById('attendance-records').addEventListener('click', (event) => {
    const button = event.target.closest('.delete-attendance-btn');
    if (!button) return;
    state.attendanceSessions = state.attendanceSessions.filter((session) => session.id !== button.dataset.attendanceId);
    saveState();
    renderAttendance();
  });

  document.getElementById('technical-squad-filter').addEventListener('change', () => {
    syncAthleteSelect('technical-squad-filter', 'technical-athlete-filter');
    renderTechnicalArea();
  });
  document.getElementById('technical-athlete-filter').addEventListener('change', renderTechnicalArea);
  document.getElementById('technical-date-from').addEventListener('change', renderTechnicalArea);
  document.getElementById('technical-date-to').addEventListener('change', renderTechnicalArea);

  document.getElementById('psychological-squad-filter').addEventListener('change', () => {
    syncAthleteSelect('psychological-squad-filter', 'psychological-athlete-filter');
    renderPsychologicalArea();
  });
  document.getElementById('psychological-athlete-filter').addEventListener('change', renderPsychologicalArea);
  document.getElementById('psychological-date-from').addEventListener('change', renderPsychologicalArea);
  document.getElementById('psychological-date-to').addEventListener('change', renderPsychologicalArea);
  document.getElementById('attendance-form').addEventListener('submit', addAttendanceSession);
  document.getElementById('attendance-squad-filter').addEventListener('change', () => {
    renderAttendanceAthleteInputs();
  });
  document.getElementById('attendance-filter-squad').addEventListener('change', () => {
    syncAthleteSelect('attendance-filter-squad', 'attendance-athlete-filter');
    renderAttendance();
  });
  document.getElementById('attendance-athlete-filter').addEventListener('change', renderAttendance);
  document.getElementById('attendance-date-from').addEventListener('change', renderAttendance);
  document.getElementById('attendance-date-to').addEventListener('change', renderAttendance);
  document.getElementById('attendance-athlete-list').addEventListener('change', (event) => {
    if (!event.target.matches('.attendance-status')) return;
    const row = event.target.closest('[data-attendance-row]');
    const reason = row.querySelector('.attendance-reason');
    const isAbsent = event.target.value === 'Assente';
    reason.classList.toggle('hidden', !isAbsent);
    if (!isAbsent) reason.value = '';
  });

  document.getElementById('add-training-btn').addEventListener('click', () => openModal('training-modal'));
  document.getElementById('training-form').addEventListener('submit', addWorkout);
  document.getElementById('training-assign').addEventListener('change', (event) => {
    const input = event.target;
    if (input.classList.contains('assign-group-toggle')) {
      document.querySelectorAll('#training-athletes-panel .assign-athlete').forEach((box) => {
        if (box.dataset.squad === input.dataset.squad) box.checked = input.checked;
      });
    }
    syncAssignGroupToggles();
    updateTrainingAssignmentUI();
  });
  document.getElementById('add-exercise-btn').addEventListener('click', () => {
    document.getElementById('exercise-list').appendChild(createExerciseBlock());
  });

  document.getElementById('add-physio-btn').addEventListener('click', () => openModal('physio-modal'));
  document.getElementById('physio-form').addEventListener('submit', addPhysio);

  document.getElementById('filter-squad').addEventListener('change', () => {
    syncAthleteSelect('filter-squad', 'filter-athlete');
    renderWorkouts();
  });
  document.getElementById('filter-athlete').addEventListener('change', renderWorkouts);
  document.getElementById('filter-date-from').addEventListener('change', renderWorkouts);
  document.getElementById('filter-date-to').addEventListener('change', renderWorkouts);
  document.getElementById('clear-filters').addEventListener('click', () => {
    document.getElementById('filter-squad').value = '';
    syncAthleteSelect('filter-squad', 'filter-athlete');
    document.getElementById('filter-date-from').value = '';
    document.getElementById('filter-date-to').value = '';
    renderWorkouts();
  });

  const refreshPhysio = () => {
    renderPhysio();
    renderPhysioAnalytics();
  };
  document.getElementById('physio-squad-filter').addEventListener('change', () => {
    syncAthleteSelect('physio-squad-filter', 'physio-athlete-filter');
    refreshPhysio();
  });
  document.getElementById('physio-athlete-filter').addEventListener('change', refreshPhysio);
  document.getElementById('physio-date-from').addEventListener('change', refreshPhysio);
  document.getElementById('physio-date-to').addEventListener('change', refreshPhysio);
  document.getElementById('clear-physio-filters').addEventListener('click', () => {
    document.getElementById('physio-squad-filter').value = '';
    syncAthleteSelect('physio-squad-filter', 'physio-athlete-filter');
    document.getElementById('physio-date-from').value = '';
    document.getElementById('physio-date-to').value = '';
    refreshPhysio();
  });

  document.getElementById('report-squad').addEventListener('change', () => {
    syncAthleteSelect('report-squad', 'report-athlete');
    renderReportCharts();
  });
  document.getElementById('report-athlete').addEventListener('change', renderReportCharts);
  document.getElementById('report-date-from').addEventListener('change', renderReportCharts);
  document.getElementById('report-date-to').addEventListener('change', renderReportCharts);
  document.getElementById('report-photo-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      window.alert('Seleziona un file immagine per la foto atleta.');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const preview = document.getElementById('report-photo-preview');
      preview.src = reader.result;
      preview.hidden = false;
      document.getElementById('report-photo-placeholder').hidden = true;
    });
    reader.addEventListener('error', () => {
      window.alert('Impossibile leggere il file immagine selezionato.');
      event.target.value = '';
    });
    reader.readAsDataURL(file);
  });
  document.querySelectorAll('.body-map-tab').forEach((button) => {
    button.addEventListener('click', () => {
      bodyMapView = button.dataset.bodyView;
      document.querySelectorAll('.body-map-tab').forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      renderBodyMap(getFilteredPhysio());
    });
  });
  document.getElementById('body-map-content').addEventListener('click', (event) => {
    const zone = event.target.closest('.body-zone');
    if (!zone) return;
    document.querySelectorAll('.body-zone').forEach((item) => item.classList.toggle('selected', item === zone));
    const pain = zone.dataset.pain ? `${zone.dataset.pain}/10` : 'nessun punteggio registrato';
    document.getElementById('body-map-detail').textContent = `${zone.dataset.label}: ${pain}`;
  });
  document.getElementById('body-map-content').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const zone = event.target.closest('.body-zone');
      if (zone) zone.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });
  document.getElementById('physio-body-part').addEventListener('change', (event) => {
    const isOther = event.target.value === 'Altro';
    const field = document.getElementById('physio-body-part-other');
    field.classList.toggle('hidden', !isOther);
    field.required = isOther;
  });
  document.getElementById('physio-cause-category').addEventListener('change', (event) => {
    populateCauseOptions(event.target.value);
    const field = document.getElementById('physio-cause-other');
    field.classList.add('hidden');
    field.required = false;
  });
  document.getElementById('physio-cause').addEventListener('change', (event) => {
    const isOther = event.target.value === 'Altro';
    const field = document.getElementById('physio-cause-other');
    field.classList.toggle('hidden', !isOther);
    field.required = isOther;
  });
  document.getElementById('export-btn').addEventListener('click', exportCsv);
  document.getElementById('export-csv-btn').addEventListener('click', exportCsv);
  document.getElementById('export-pdf-btn').addEventListener('click', printReport);
  document.getElementById('export-excel-btn').addEventListener('click', exportReportExcel);
  document.getElementById('dashboard-pdf-btn').addEventListener('click', printDashboard);
  document.getElementById('dashboard-excel-btn').addEventListener('click', exportDashboardExcel);
  document.getElementById('physio-pdf-btn').addEventListener('click', printPhysio);
  document.getElementById('physio-excel-btn').addEventListener('click', exportPhysioExcel);
  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing-dashboard', 'printing-report', 'printing-physio');
  });
}

function enhanceDateInputs() {
  const valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    if (input.dataset.dateEnhanced) return;
    input.dataset.dateEnhanced = '1';
    const wrapper = document.createElement('div');
    wrapper.className = 'date-display';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    const label = document.createElement('span');
    label.className = 'date-display-text';
    wrapper.appendChild(label);

    const update = () => {
      const value = valueDescriptor.get.call(input);
      label.textContent = value ? formatDate(value) : 'gg/mm/aa';
      label.classList.toggle('empty', !value);
    };
    input._updateDateDisplay = update;
    Object.defineProperty(input, 'value', {
      configurable: true,
      get() { return valueDescriptor.get.call(this); },
      set(v) { valueDescriptor.set.call(this, v); update(); }
    });
    input.addEventListener('input', update);
    input.addEventListener('change', update);
    input.addEventListener('click', () => {
      try { input.showPicker(); } catch (e) { /* non supportato */ }
    });
    update();
  });
}

document.addEventListener('reset', () => {
  setTimeout(() => document.querySelectorAll('input[type="date"]').forEach((i) => i._updateDateDisplay && i._updateDateDisplay()), 0);
});

function init() {
  enhanceDateInputs();
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';
  list.appendChild(createExerciseBlock());

  document.getElementById('training-date').value = getTodayISO();
  document.getElementById('physio-date').value = getTodayISO();
  document.getElementById('attendance-date').value = getTodayISO();

  bindEvents();
  renderAll();
}

init();
