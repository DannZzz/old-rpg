export interface DrawerSettings {
  open?: boolean
  extra?: JSX.Element
  title?: string
  onClose?: (e: any) => void
  placement?: "right" | "bottom" | "top" | "left"
  content?: JSX.Element
}
