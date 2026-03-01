import { useTranslation } from 'react-i18next'

export function Privacy() {
  const { t } = useTranslation()

  return (
    <div className="legal-page">
      <h2>{t('footer.privacy')}</h2>
      <p className="muted">Last updated: March 2026</p>
      <p>Your privacy matters. Here is what you should know:</p>
      <ul>
        <li>Your progress is stored locally in your browser. It does not leave your device.</li>
        <li>We do not collect personal data. No account is required.</li>
        <li>We do not use tracking cookies or analytics at this time.</li>
      </ul>
      <p>For questions, contact us at hello@learnreadgood.com.</p>
    </div>
  )
}
