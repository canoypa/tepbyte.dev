import { Theme, hexFromArgb } from '@material/material-color-utilities'

type StyleKeys =
  | '--colors-dark-primary'
  | '--colors-dark-on-primary'
  | '--colors-dark-primary-container'
  | '--colors-dark-on-primary-container'
  | '--colors-dark-secondary'
  | '--colors-dark-on-secondary'
  | '--colors-dark-secondary-container'
  | '--colors-dark-on-secondary-container'
  | '--colors-dark-tertiary'
  | '--colors-dark-on-tertiary'
  | '--colors-dark-tertiary-container'
  | '--colors-dark-on-tertiary-container'
  | '--colors-dark-error'
  | '--colors-dark-on-error'
  | '--colors-dark-error-container'
  | '--colors-dark-on-error-container'
  | '--colors-dark-background'
  | '--colors-dark-on-background'
  | '--colors-dark-surface'
  | '--colors-dark-on-surface'
  | '--colors-dark-surface-variant'
  | '--colors-dark-on-surface-variant'
  | '--colors-dark-outline'
  | '--colors-dark-outline-variant'
  | '--colors-dark-shadow'
  | '--colors-dark-scrim'
  | '--colors-dark-inverse-surface'
  | '--colors-dark-inverse-on-surface'
  | '--colors-dark-inverse-primary'

type ContentBasedColorStyles = {
  [key in StyleKeys]: string
}

export function createContentBasedColorStyles(
  theme: Theme,
): ContentBasedColorStyles {
  const styles: ContentBasedColorStyles = {
    '--colors-dark-primary': hexFromArgb(theme.schemes.dark.primary),
    '--colors-dark-on-primary': hexFromArgb(theme.schemes.dark.onPrimary),
    '--colors-dark-primary-container': hexFromArgb(
      theme.schemes.dark.primaryContainer,
    ),
    '--colors-dark-on-primary-container': hexFromArgb(
      theme.schemes.dark.onPrimaryContainer,
    ),
    '--colors-dark-secondary': hexFromArgb(theme.schemes.dark.secondary),
    '--colors-dark-on-secondary': hexFromArgb(theme.schemes.dark.onSecondary),
    '--colors-dark-secondary-container': hexFromArgb(
      theme.schemes.dark.secondaryContainer,
    ),
    '--colors-dark-on-secondary-container': hexFromArgb(
      theme.schemes.dark.onSecondaryContainer,
    ),
    '--colors-dark-tertiary': hexFromArgb(theme.schemes.dark.tertiary),
    '--colors-dark-on-tertiary': hexFromArgb(theme.schemes.dark.onTertiary),
    '--colors-dark-tertiary-container': hexFromArgb(
      theme.schemes.dark.tertiaryContainer,
    ),
    '--colors-dark-on-tertiary-container': hexFromArgb(
      theme.schemes.dark.onTertiaryContainer,
    ),
    '--colors-dark-error': hexFromArgb(theme.schemes.dark.error),
    '--colors-dark-on-error': hexFromArgb(theme.schemes.dark.onError),
    '--colors-dark-error-container': hexFromArgb(
      theme.schemes.dark.errorContainer,
    ),
    '--colors-dark-on-error-container': hexFromArgb(
      theme.schemes.dark.onErrorContainer,
    ),
    '--colors-dark-background': hexFromArgb(theme.schemes.dark.background),
    '--colors-dark-on-background': hexFromArgb(theme.schemes.dark.onBackground),
    '--colors-dark-surface': hexFromArgb(theme.schemes.dark.surface),
    '--colors-dark-on-surface': hexFromArgb(theme.schemes.dark.onSurface),
    '--colors-dark-surface-variant': hexFromArgb(
      theme.schemes.dark.surfaceVariant,
    ),
    '--colors-dark-on-surface-variant': hexFromArgb(
      theme.schemes.dark.onSurfaceVariant,
    ),
    '--colors-dark-outline': hexFromArgb(theme.schemes.dark.outline),
    '--colors-dark-outline-variant': hexFromArgb(
      theme.schemes.dark.outlineVariant,
    ),
    '--colors-dark-shadow': hexFromArgb(theme.schemes.dark.shadow),
    '--colors-dark-scrim': hexFromArgb(theme.schemes.dark.scrim),
    '--colors-dark-inverse-surface': hexFromArgb(
      theme.schemes.dark.inverseSurface,
    ),
    '--colors-dark-inverse-on-surface': hexFromArgb(
      theme.schemes.dark.inverseOnSurface,
    ),
    '--colors-dark-inverse-primary': hexFromArgb(
      theme.schemes.dark.inversePrimary,
    ),
  }

  return styles
}
