-- Anonymous open counts: one row per resource per UTC day. Nothing about the visitor.
CREATE TABLE opens (
  resource_id TEXT NOT NULL,
  day TEXT NOT NULL,
  n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (resource_id, day)
);
