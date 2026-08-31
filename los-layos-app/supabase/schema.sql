-- Tabla de días ocupados de la agenda.
-- La presencia de una fila para una fecha significa "ocupado";
-- la ausencia significa "libre".
create table if not exists busy_dates (
  id uuid primary key default gen_random_uuid(),
  event_date date not null unique,
  title text,
  created_at timestamptz not null default now()
);

alter table busy_dates enable row level security;

-- Cualquiera (incluso sin login) puede leer la agenda.
create policy "Lectura pública de la agenda"
  on busy_dates
  for select
  to anon, authenticated
  using (true);

-- Solo un usuario logueado (el admin) puede crear/editar/borrar días.
create policy "Solo admin logueado puede escribir"
  on busy_dates
  for insert
  to authenticated
  with check (true);

create policy "Solo admin logueado puede actualizar"
  on busy_dates
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Solo admin logueado puede borrar"
  on busy_dates
  for delete
  to authenticated
  using (true);
