"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscription_logs = exports.admins = exports.holidays = exports.assistants = exports.works = exports.editors = exports.healthCheck = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.healthCheck = (0, pg_core_1.pgTable)("health_check", {
    id: (0, pg_core_1.serial)().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});
exports.editors = (0, pg_core_1.pgTable)("editors", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    price: (0, pg_core_1.numeric)("price", { precision: 10, scale: 2 }).notNull().default("16.00"),
    default_count: (0, pg_core_1.integer)("default_count").notNull().default(1),
    is_active: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true }),
}, (table) => [(0, pg_core_1.index)("editors_is_active_idx").on(table.is_active)]);
exports.works = (0, pg_core_1.pgTable)("works", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    editor_id: (0, pg_core_1.integer)("editor_id").notNull().references(() => exports.editors.id, { onDelete: "cascade" }),
    date: (0, pg_core_1.date)("date").notNull(),
    count: (0, pg_core_1.integer)("count").notNull().default(0),
    title: (0, pg_core_1.varchar)("title", { length: 200 }).notNull().default("常规剪辑稿件"),
    price: (0, pg_core_1.numeric)("price", { precision: 10, scale: 2 }).notNull(),
    is_overtime: (0, pg_core_1.boolean)("is_overtime").default(false).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true }),
}, (table) => [
    (0, pg_core_1.index)("works_editor_id_idx").on(table.editor_id),
    (0, pg_core_1.index)("works_date_idx").on(table.date),
    (0, pg_core_1.index)("works_date_editor_idx").on(table.date, table.editor_id),
]);
exports.assistants = (0, pg_core_1.pgTable)("assistants", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.varchar)("username", { length: 50 }).notNull().unique(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    is_active: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true }),
}, (table) => [(0, pg_core_1.index)("assistants_is_active_idx").on(table.is_active)]);
exports.holidays = (0, pg_core_1.pgTable)("holidays", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    date: (0, pg_core_1.date)("date").notNull().unique(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }),
    year: (0, pg_core_1.integer)("year").notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
    (0, pg_core_1.index)("holidays_date_idx").on(table.date),
    (0, pg_core_1.index)("holidays_year_idx").on(table.year),
]);
exports.admins = (0, pg_core_1.pgTable)("admins", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    openid: (0, pg_core_1.varchar)("openid", { length: 100 }).notNull().unique(),
    nickname: (0, pg_core_1.varchar)("nickname", { length: 100 }),
    is_active: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true }),
}, (table) => [
    (0, pg_core_1.index)("admins_openid_idx").on(table.openid),
    (0, pg_core_1.index)("admins_is_active_idx").on(table.is_active),
]);
exports.subscription_logs = (0, pg_core_1.pgTable)("subscription_logs", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    admin_id: (0, pg_core_1.integer)("admin_id").notNull().references(() => exports.admins.id, { onDelete: "cascade" }),
    template_id: (0, pg_core_1.varchar)("template_id", { length: 100 }),
    date: (0, pg_core_1.date)("date").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 20 }).notNull(),
    error_message: (0, pg_core_1.varchar)("error_message", { length: 500 }),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
    (0, pg_core_1.index)("subscription_logs_admin_id_idx").on(table.admin_id),
    (0, pg_core_1.index)("subscription_logs_date_idx").on(table.date),
    (0, pg_core_1.index)("subscription_logs_status_idx").on(table.status),
]);
//# sourceMappingURL=schema.js.map