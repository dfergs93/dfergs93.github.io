interface ImportMetaEnv {
  /** Where the page reports anonymous opens (the radref Worker). Unset: no reports. */
  readonly PUBLIC_COUNT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
