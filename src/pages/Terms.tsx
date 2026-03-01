import { useTranslation } from 'react-i18next'

export function Terms() {
  const { t } = useTranslation()

  return (
    <div className="legal-page">
      <h2>{t('footer.terms')}</h2>
      <p className="muted">Last updated: March 2026</p>
      <p>
        By using LearnReadGood.com you agree to these terms. The site is provided
        as-is, without warranty of any kind, for educational purposes only.
      </p>
      <p>
        We reserve the right to update these terms at any time. Continued use of
        the site constitutes acceptance of any changes.
      </p>
      <p>For questions, contact us at hello@learnreadgood.com.</p>
    </div>
  )
}
