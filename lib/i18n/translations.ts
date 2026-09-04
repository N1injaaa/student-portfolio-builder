export type Lang = "en" | "ru";

/**
 * Flat key → string dictionary per language. Keys are namespaced by
 * screen (nav.*, dashboard.*, editor.*, resume.*, portfolio.*, auth.*)
 * so it's obvious where each string is used. Add new keys here first,
 * then reference them with t('namespace.key') in components.
 */
export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    "nav.dashboard": "Dashboard",
    "nav.editor": "Editor",
    "nav.resume": "Resume",
    "nav.portfolio": "Portfolio",
    "nav.admin": "Admin",
    "nav.signOut": "Sign out",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Your profile, resume, and portfolio at a glance.",
    "dashboard.upgrade.title": "Unlock the tools that actually get you interviews",
    "dashboard.upgrade.subtitle":
      "Pro unlocks every resume template, unlimited PDF exports, the full ATS breakdown, saved resume versions, portfolio view analytics, and every theme.",
    "dashboard.upgrade.button": "Upgrade to Pro",
    "dashboard.completion": "Profile completion",
    "dashboard.editProfile": "Edit profile",
    "dashboard.viewResume": "View resume",
    "dashboard.viewPortfolio": "View portfolio",
    "dashboard.portfolioSettings": "Portfolio settings",
    "dashboard.tryDemo": "Load demo data",
    "dashboard.welcomeBack": "Welcome back, {name}",
    "dashboard.welcome": "Welcome",
    "dashboard.tagline": "Here's where your resume and portfolio stand.",
    "dashboard.loadDemo": "Load demo profile",
    "dashboard.stat.projects": "Projects",
    "dashboard.stat.achievements": "Achievements",
    "dashboard.stat.certificates": "Certificates",
    "dashboard.stat.skills": "Skills",
    "dashboard.profileComplete": "Your profile is complete — nice work.",
    "dashboard.completeProfile": "Complete my profile",
    "dashboard.resumeStatus": "Resume status",
    "dashboard.template": "Template",
    "dashboard.portfolioStatus": "Portfolio status",
    "dashboard.open": "Open →",
    "dashboard.liveAt": "Live at",
    "dashboard.draft": "Draft — not published",
    "dashboard.usernameNotSet": "Username not set",
    "dashboard.educationEntries": "Education entries",
    "dashboard.onRecord": "on record",
    "dashboard.empty.title": "Nothing here yet",
    "dashboard.empty.description":
      "Fill out your profile to start building your resume and portfolio.",
    "dashboard.emptyTitle": "Your profile is empty",
    "dashboard.emptyDescription":
      "Add your first education entry or project to start building your resume and portfolio.",

    // Editor
    "editor.title": "Profile editor",
    "editor.subtitle": "Build the record your resume and portfolio pull from.",
    "editor.showPreview": "Show preview",
    "editor.hidePreview": "Hide preview",
    "editor.livePreview": "Live preview",
    "editor.livePreviewHint": "Live preview — updates as you type",
    "editor.previewPortfolio": "Portfolio",
    "editor.previewResume": "Resume",
    "editor.section.overview": "Overview",
    "editor.section.education": "Education",
    "editor.section.projects": "Projects",
    "editor.section.achievements": "Achievements",
    "editor.section.skills": "Skills",
    "editor.section.languages": "Languages",
    "editor.section.certificates": "Certificates",
    "editor.section.activities": "Activities",

    // Resume builder
    "resume.title": "Resume builder",
    "resume.subtitle": "Choose a template, tune the details, and export a print-ready PDF.",
    "resume.export": "Export PDF",
    "resume.exporting": "Preparing PDF…",
    "resume.upgradeToExport": "Upgrade to export",
    "resume.exportsLeft": "free exports left",
    "resume.limitReached": "Free export limit reached",

    // Portfolio settings
    "portfolio.title": "Portfolio builder",
    "portfolio.subtitle": "Configure your public site and preview it before publishing.",
    "portfolio.username": "Portfolio username",
    "portfolio.published": "Published",
  "portfolio.viewLive": "View live",
  "portfolio.theme": "Theme",

    // Auth
  "auth.signInWithGoogle": "Sign in with Google",
  "auth.continueWithGoogle": "Continue with Google",
  "auth.signInTitle": "Sign in to continue",
  "auth.signInDescription":
    "Your resume and portfolio data is saved to your account, so you can pick up where you left off from any device.",
  "auth.loadErrorTitle": "Couldn't load your profile",
  "auth.tryAgain": "Try again",
    "auth.signInHint": "Sign in with Google to get started — takes a few seconds.",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.add": "Add",
    "common.loading": "Loading…",

    // Landing page
    "landing.nav.features": "Features",
    "landing.nav.templates": "Templates",
    "landing.nav.howItWorks": "How it works",
    "landing.nav.faq": "FAQ",
    "landing.nav.signIn": "Sign in",
    "landing.nav.createPortfolio": "Create my portfolio",
    "landing.hero.badge": "Built for university and internship applications",
    "landing.hero.title": "Build a portfolio that gets you noticed.",
    "landing.hero.subtitle":
      "Create your student resume and portfolio in minutes — one profile, four resume templates, and a public site admissions officers and recruiters can actually visit.",
    "landing.hero.viewTemplates": "View templates",
    "landing.hero.signInHint": "Sign in with Google to get started — takes a few seconds.",
  },
  ru: {
    // Nav
    "nav.dashboard": "Дашборд",
    "nav.editor": "Редактор",
    "nav.resume": "Резюме",
    "nav.portfolio": "Портфолио",
    "nav.admin": "Админ",
    "nav.signOut": "Выйти",

    // Dashboard
    "dashboard.title": "Дашборд",
    "dashboard.subtitle": "Твой профиль, резюме и портфолио в одном месте.",
    "dashboard.upgrade.title": "Открой инструменты, которые реально помогают пройти собеседование",
    "dashboard.upgrade.subtitle":
      "Pro открывает все шаблоны резюме, безлимитный экспорт в PDF, полную ATS-проверку, сохранённые версии резюме, аналитику просмотров портфолио и все темы.",
    "dashboard.upgrade.button": "Перейти на Pro",
    "dashboard.completion": "Заполненность профиля",
    "dashboard.editProfile": "Редактировать профиль",
    "dashboard.viewResume": "Смотреть резюме",
    "dashboard.viewPortfolio": "Смотреть портфолио",
    "dashboard.portfolioSettings": "Настройки портфолио",
    "dashboard.tryDemo": "Загрузить демо-данные",
    "dashboard.welcomeBack": "С возвращением, {name}",
    "dashboard.welcome": "Добро пожаловать",
    "dashboard.tagline": "Вот как обстоят дела с твоим резюме и портфолио.",
    "dashboard.loadDemo": "Загрузить демо-профиль",
    "dashboard.stat.projects": "Проекты",
    "dashboard.stat.achievements": "Достижения",
    "dashboard.stat.certificates": "Сертификаты",
    "dashboard.stat.skills": "Навыки",
    "dashboard.profileComplete": "Профиль полностью заполнен — отлично.",
    "dashboard.completeProfile": "Заполнить профиль",
    "dashboard.resumeStatus": "Статус резюме",
    "dashboard.template": "Шаблон",
    "dashboard.portfolioStatus": "Статус портфолио",
    "dashboard.open": "Открыть →",
    "dashboard.liveAt": "Опубликовано на",
    "dashboard.draft": "Черновик — не опубликовано",
    "dashboard.usernameNotSet": "Имя пользователя не задано",
    "dashboard.educationEntries": "Записи об образовании",
    "dashboard.onRecord": "записей",
    "dashboard.empty.title": "Здесь пока пусто",
    "dashboard.empty.description":
      "Заполни профиль, чтобы начать собирать резюме и портфолио.",
    "dashboard.emptyTitle": "Твой профиль пуст",
    "dashboard.emptyDescription":
      "Добавь первую запись об образовании или проект, чтобы начать собирать резюме и портфолио.",

    // Editor
    "editor.title": "Редактор профиля",
    "editor.subtitle": "Данные отсюда используются в резюме и портфолио.",
    "editor.showPreview": "Показать превью",
    "editor.hidePreview": "Скрыть превью",
    "editor.livePreview": "Превью",
    "editor.livePreviewHint": "Превью обновляется по мере ввода",
    "editor.previewPortfolio": "Портфолио",
    "editor.previewResume": "Резюме",
    "editor.section.overview": "Основное",
    "editor.section.education": "Образование",
    "editor.section.projects": "Проекты",
    "editor.section.achievements": "Достижения",
    "editor.section.skills": "Навыки",
    "editor.section.languages": "Языки",
    "editor.section.certificates": "Сертификаты",
    "editor.section.activities": "Активности",

    // Resume builder
    "resume.title": "Конструктор резюме",
    "resume.subtitle": "Выбери шаблон, настрой детали и экспортируй готовый PDF.",
    "resume.export": "Экспорт в PDF",
    "resume.exporting": "Готовим PDF…",
    "resume.upgradeToExport": "Перейти на Pro для экспорта",
    "resume.exportsLeft": "бесплатных экспортов осталось",
    "resume.limitReached": "Лимит бесплатных экспортов исчерпан",

    // Portfolio settings
    "portfolio.title": "Конструктор портфолио",
    "portfolio.subtitle": "Настрой публичную страницу и посмотри превью перед публикацией.",
    "portfolio.username": "Имя пользователя портфолио",
    "portfolio.published": "Опубликовано",
    "portfolio.theme": "Тема",
    "portfolio.viewLive": "Открыть сайт",

    // Auth
    "auth.signInWithGoogle": "Войти через Google",
    "auth.continueWithGoogle": "Продолжить с Google",
    "auth.signInTitle": "Войдите, чтобы продолжить",
    "auth.signInDescription":
      "Данные резюме и портфолио сохраняются в твоём аккаунте — можно продолжить с любого устройства.",
    "auth.loadErrorTitle": "Не удалось загрузить профиль",
    "auth.tryAgain": "Попробовать снова",
    "auth.signInHint": "Войди через Google, чтобы начать — это займёт пару секунд.",

    // Common
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.delete": "Удалить",
    "common.add": "Добавить",
    "common.loading": "Загрузка…",

    // Landing page
    "landing.nav.features": "Возможности",
    "landing.nav.templates": "Шаблоны",
    "landing.nav.howItWorks": "Как это работает",
    "landing.nav.faq": "Вопросы",
    "landing.nav.signIn": "Войти",
    "landing.nav.createPortfolio": "Создать портфолио",
    "landing.hero.badge": "Создано для поступления в вуз и стажировок",
    "landing.hero.title": "Собери портфолио, которое тебя заметят.",
    "landing.hero.subtitle":
      "Создай студенческое резюме и портфолио за минуты — один профиль, четыре шаблона резюме и публичный сайт, который реально посмотрят приёмные комиссии и рекрутеры.",
    "landing.hero.viewTemplates": "Смотреть шаблоны",
    "landing.hero.signInHint": "Войди через Google, чтобы начать — это займёт пару секунд.",
  },
};
