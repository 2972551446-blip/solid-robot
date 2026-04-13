import { pgTable, serial, timestamp, varchar, numeric, boolean, integer, date, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const healthCheck = pgTable("health_check", {
  id: serial().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
})

// 剪辑师表
export const editors = pgTable(
  "editors",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull().default("16.00"),
    default_count: integer("default_count").notNull().default(1),
    is_active: boolean("is_active").default(true).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [index("editors_is_active_idx").on(table.is_active)]
)

// 稿件表
export const works = pgTable(
  "works",
  {
    id: serial("id").primaryKey(),
    editor_id: integer("editor_id").notNull().references(() => editors.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    count: integer("count").notNull().default(0),
    title: varchar("title", { length: 200 }).notNull().default("常规剪辑稿件"),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    is_overtime: boolean("is_overtime").default(false).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("works_editor_id_idx").on(table.editor_id),
    index("works_date_idx").on(table.date),
    index("works_date_editor_idx").on(table.date, table.editor_id),
  ]
)

// 助理账号表
export const assistants = pgTable(
  "assistants",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    is_active: boolean("is_active").default(true).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [index("assistants_is_active_idx").on(table.is_active)]
)

// 节假日表
export const holidays = pgTable(
  "holidays",
  {
    id: serial("id").primaryKey(),
    date: date("date").notNull().unique(),
    name: varchar("name", { length: 100 }),
    year: integer("year").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("holidays_date_idx").on(table.date),
    index("holidays_year_idx").on(table.year),
  ]
)
