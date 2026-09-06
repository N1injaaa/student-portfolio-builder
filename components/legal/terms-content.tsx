"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { SITE_NAME, SITE_AUTHOR, CONTACT_EMAIL } from "@/lib/site-config";

export function TermsContent() {
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

        <h1 className="mt-6 font-display text-3xl font-semibold text-ink">Условия использования</h1>
        <p className="mt-2 text-sm text-ink-soft">Обновлено: {updatedDate}</p>

        <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
          <p>
            {SITE_NAME} — независимый проект, которым занимается {SITE_AUTHOR}, а не
            зарегистрированная компания. Используя {SITE_NAME}, ты соглашаешься с этими
            условиями. Если не согласен — пожалуйста, не пользуйся сервисом.
          </p>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Сервис</h2>
            <p className="mt-2">
              {SITE_NAME} помогает собрать резюме и публичное портфолио из одного профиля.
              Сервис предоставляется "как есть" — мы стараемся поддерживать его стабильную
              работу, но не гарантируем бесперебойную доступность, а функции могут меняться по
              мере развития продукта.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Твой аккаунт</h2>
            <p className="mt-2">
              Вход осуществляется через Google. Ты отвечаешь за контент, который добавляешь в
              профиль, и за безопасность своего аккаунта. Ты должен быть совершеннолетним по
              законам, применимым к тебе, чтобы самостоятельно соглашаться с этими условиями.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Твой контент</h2>
            <p className="mt-2">
              Всё, что ты добавляешь в резюме и портфолио, принадлежит тебе. Мы только храним
              это и показываем обратно тебе (а если ты опубликуешь — то и всем с ссылкой) — мы не
              претендуем на владение этим контентом и не используем его ни для чего, кроме
              работы продукта.
            </p>
            <p className="mt-2">
              Не используй {SITE_NAME} для публикации незаконного контента, выдачи себя за
              другого человека без разрешения или нарушения чьих-либо прав.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Покупка Pro</h2>
            <p className="mt-2">
              Pro — это разовая покупка, которая открывает дополнительные шаблоны, темы,
              безлимитный экспорт резюме и аналитику. Оплату обрабатывает{" "}
              <strong className="text-ink">Lemon Squeezy</strong>, выступающий продавцом записи
              (merchant of record) — это значит, что юридически покупка совершается у Lemon
              Squeezy, а не напрямую у {SITE_AUTHOR}. Вопросы по оплате, чеки и запросы на
              возврат обрабатываются через собственную поддержку и правила Lemon Squeezy.
            </p>
            <p className="mt-2">
              Pro-доступ привязан к email твоего аккаунта и выдаётся автоматически вскоре после
              успешной оплаты. Если он не появился в разумный срок, напиши на{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Публичные портфолио</h2>
            <p className="mt-2">
              Публикация портфолио делает его видимым всем, у кого есть ссылка. Ты можешь снять
              его с публикации в любой момент в настройках портфолио — оно сразу перестанет быть
              доступным.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Допустимое использование</h2>
            <p className="mt-2">
              Пожалуйста, не пытайся нарушить работу сервиса, получить доступ к чужим аккаунтам
              или данным, либо использовать {SITE_NAME} для чего-либо незаконного. Мы оставляем
              за собой право заблокировать аккаунты, которые это делают.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Ограничение ответственности</h2>
            <p className="mt-2">
              {SITE_NAME} предоставляется без каких-либо гарантий. В максимально допустимой
              законом степени {SITE_AUTHOR} не несёт ответственности за любые косвенные убытки,
              возникшие в результате использования сервиса — включая, например, результаты
              заявок на работу или поступление, поданных с использованием контента, собранного
              здесь.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Изменения условий</h2>
            <p className="mt-2">
              Эти условия могут обновляться по мере развития продукта. Продолжение
              использования сервиса после обновления означает согласие с новыми условиями.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Контакты</h2>
            <p className="mt-2">
              Вопросы об этих условиях — пиши на{" "}
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

      <h1 className="mt-6 font-display text-3xl font-semibold text-ink">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {updatedDate}</p>

      <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
        <p>
          {SITE_NAME} is an independent project built and run by {SITE_AUTHOR}, not a
          registered company. By using {SITE_NAME}, you agree to these terms. If you don't
          agree, please don't use the service.
        </p>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">The service</h2>
          <p className="mt-2">
            {SITE_NAME} helps you build a resume and a public portfolio page from a single
            profile. It's provided "as is" — we do our best to keep it reliable, but we don't
            guarantee uninterrupted availability, and features may change as the product
            evolves.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Your account</h2>
          <p className="mt-2">
            You sign in with Google. You're responsible for the content you add to your profile
            and for keeping your account secure. You must be old enough, under the laws that
            apply to you, to agree to these terms on your own.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Your content</h2>
          <p className="mt-2">
            You own everything you put into your resume and portfolio. We only store and
            display it back to you (and, if you publish it, to anyone with the link) — we don't
            claim any ownership over it, and we don't use it for anything besides running the
            product.
          </p>
          <p className="mt-2">
            Don't use {SITE_NAME} to publish content that's illegal, impersonates someone else
            without authorization, or infringes someone else's rights.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Pro purchases</h2>
          <p className="mt-2">
            Pro is a one-time purchase that unlocks additional templates, themes, unlimited
            resume exports, and analytics. Payments are processed by{" "}
            <strong className="text-ink">Lemon Squeezy</strong>, who acts as the merchant of
            record — meaning your purchase is legally made from Lemon Squeezy, not directly from
            {" " + SITE_AUTHOR}. Billing questions, receipts, and refund requests are handled
            through Lemon Squeezy's own support and policies.
          </p>
          <p className="mt-2">
            Pro access is tied to your account's email and is granted automatically shortly
            after a successful purchase. If it doesn't appear within a reasonable time, contact{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Public portfolios</h2>
          <p className="mt-2">
            Publishing your portfolio makes it visible to anyone with the link. You can
            unpublish it at any time from Portfolio Settings, which takes it offline
            immediately.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Acceptable use</h2>
          <p className="mt-2">
            Please don't attempt to disrupt the service, access other users' accounts or data,
            or use {SITE_NAME} for anything unlawful. We reserve the right to suspend accounts
            that do.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Limitation of liability</h2>
          <p className="mt-2">
            {SITE_NAME} is provided without warranties of any kind. To the fullest extent
            permitted by law, {SITE_AUTHOR} isn't liable for any indirect or consequential
            damages arising from your use of the service — including, for example, outcomes of
            job or university applications made using content built here.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Changes to these terms</h2>
          <p className="mt-2">
            These terms may be updated as the product changes. Continued use after an update
            means you accept the revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Contact</h2>
          <p className="mt-2">
            Questions about these terms — reach out at{" "}
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
