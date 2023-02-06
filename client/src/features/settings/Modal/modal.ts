import { ModalProps } from "antd"
import { useAppDispatch } from "../../../app/hooks"

export type ModalSettings = Partial<ModalProps> & {
  id: string
  dispatch: ReturnType<typeof useAppDispatch>
}
