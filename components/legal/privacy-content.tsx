"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { SITE_NAME, SITE_AUTHOR, CONTACT_EMAIL } from "@/lib/site-config";

export function PrivacyContent() {
  const { lang } = useLanguage();

  const updatedDate =
    lang === "ru"
      ? new Date().toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })
      : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  if (lang === "ru") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <Link href="/" className="text-sm text-teal hover:underline">
          ← Назад на {SITE_NAME}
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-ink">Политика конфиденциальности</h1>
        <p className="mt-2 text-sm text-ink-soft">Обновлено: {updatedDate}</p>

        <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
          <p>
            {SITE_NAME} — независимый студенческий проект, которым занимается {SITE_AUTHOR}, а не
            компания. Этот документ объясняет, какая информация собирается при использовании
            сайта и как она обрабатывается. Это не юридическая консультация — если у тебя есть
            вопросы по конкретной ситуации, обратись к специалисту, — но здесь честно описано,
            что реально происходит с твоими данными.
          </p>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Что мы собираем</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-ink">Данные аккаунта</strong> — при входе через Google мы
                получаем твоё имя, email и фото профиля от Google.
              </li>
              <li>
                <strong className="text-ink">Содержимое резюме и портфолио</strong> — всё, что ты
                вводишь в редакторе (образование, проекты, навыки, био и т.д.), сохраняется,
                чтобы показывать это тебе, а если ты опубликуешь портфолио — то и на публичной
                странице.
              </li>
              <li>
                <strong className="text-ink">События использования</strong> — базовые события,
                вроде просмотров портфолио и скачиваний резюме, чтобы ты видел аналитику по
                своему портфолио на Pro.
              </li>
              <li>
                <strong className="text-ink">Данные об оплате</strong> — если ты покупаешь Pro,
                оплата полностью обрабатывается Lemon Squeezy (см. ниже) — мы никогда не видим и
                не храним данные твоей карты.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Как это используется</h2>
            <p className="mt-2">
              Исключительно для работы продукта: авторизация, сохранение и отображение резюме и
              портфолио, разблокировка Pro-функций после оплаты. Мы не продаём твои данные и не
              показываем рекламу на {SITE_NAME}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">С кем мы делимся данными</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-ink">Supabase</strong> — хранит нашу базу данных и
                обрабатывает авторизацию.
              </li>
              <li>
                <strong className="text-ink">Vercel</strong> — хостит сам сайт.
              </li>
              <li>
                <strong className="text-ink">Lemon Squeezy</strong> — обрабатывает оплату Pro как
                продавец записи (merchant of record). Они напрямую получают данные твоей оплаты и
                чек; мы получаем только подтверждение, что покупка совершена, привязанное к
                твоему email.
              </li>
              <li>
                <strong className="text-ink">Google</strong> — обеспечивает вход в аккаунт.
              </li>
            </ul>
            <p className="mt-2">
              Ни один из этих сервисов не имеет права использовать твои данные в своих целях за
              пределами предоставления услуги нам.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Твоё портфолио публично, если ты его опубликуешь</h2>
            <p className="mt-2">
              Если ты включишь "Опубликовано" в настройках портфолио, содержимое портфолио станет
              видно всем, у кого есть ссылка (в этом и смысл — поделиться с приёмной комиссией и
              рекрутёрами). До этого момента портфолио видно только тебе.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Cookies и локальное хранилище</h2>
            <p className="mt-2">
              Мы используем локальное хранилище браузера, чтобы запоминать небольшие настройки
              (например, выбранный язык и тему оформления), и авторизационные cookies Supabase,
              чтобы держать тебя в системе. Мы не используем сторонние рекламные или
              трекинговые cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Твой выбор</h2>
            <p className="mt-2">
              Ты можешь редактировать или удалить любой контент в своём профиле в любой момент
              прямо в редакторе. Чтобы полностью удалить аккаунт и все связанные данные, напиши на{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              — мы всё удалим.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Изменения</h2>
            <p className="mt-2">
              Если этот документ существенно изменится, мы обновим дату в начале страницы.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Контакты</h2>
            <p className="mt-2">
              Вопросы об этой политике или твоих данных — пиши на{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link href="/" className="text-sm text-teal hover:underline">
        ← Back to {SITE_NAME}
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {updatedDate}</p>

      <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
        <p>
          {SITE_NAME} is an independent, student-built project run by {SITE_AUTHOR} — not a
          company. This policy explains what information is collected when you use it and how
          it's handled. It isn't legal advice, and if you have concerns about a specific
          situation you should consult a professional — but it reflects, honestly, what
          actually happens with your data here.
        </p>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">What we collect</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">Account info</strong> — when you sign in with
              Google, we receive your name, email address, and profile photo from Google.
            </li>
            <li>
              <strong className="text-ink">Resume &amp; portfolio content</strong> — everything
              you type into the editor (education, projects, skills, bio, etc.) is stored so it
              can be shown back to you and, if you choose to publish, on your public portfolio
              page.
            </li>
            <li>
              <strong className="text-ink">Usage events</strong> — basic events like portfolio
              page views and resume downloads, so you can see analytics about your own
              portfolio if you're on Pro.
            </li>
            <li>
              <strong className="text-ink">Payment info</strong> — if you purchase Pro, payment
              is handled entirely by Lemon Squeezy (see below) — we never see or store your
              card details.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">How it's used</h2>
          <p className="mt-2">
            Solely to run the product: authenticating you, saving and displaying your resume
            and portfolio, and unlocking Pro features once you've paid. We don't sell your data,
            and we don't run ads on {SITE_NAME}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Who we share it with</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">Supabase</strong> — hosts our database and handles
              authentication.
            </li>
            <li>
              <strong className="text-ink">Vercel</strong> — hosts the website itself.
            </li>
            <li>
              <strong className="text-ink">Lemon Squeezy</strong> — processes Pro payments as
              the merchant of record. They handle your payment details and receipt directly;
              we only receive confirmation that a purchase happened, tied to your email.
            </li>
            <li>
              <strong className="text-ink">Google</strong> — provides sign-in.
            </li>
          </ul>
          <p className="mt-2">
            None of these providers are permitted to use your data for their own purposes
            beyond providing their service to us.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Your portfolio is public if you publish it</h2>
          <p className="mt-2">
            If you turn on "Published" in Portfolio Settings, the content of your portfolio
            becomes visible to anyone with the link (that's the point — sharing it with
            admissions officers and recruiters). Until then, only you can see it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Cookies &amp; local storage</h2>
          <p className="mt-2">
            We use your browser's local storage to remember small preferences (like your
            chosen language and light/dark theme) and Supabase's authentication cookies to keep
            you signed in. We don't use third-party advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Your choices</h2>
          <p className="mt-2">
            You can edit or delete any content in your profile at any time from the editor. To
            delete your account and all associated data entirely, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">
              {CONTACT_EMAIL}
            </a>{" "}
            and we'll remove it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Changes</h2>
          <p className="mt-2">
            If this policy changes in a meaningful way, we'll update the date at the top of
            this page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this policy or your data — reach out at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
