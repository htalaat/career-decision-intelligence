import * as Burnt from "burnt";

/** Show a native success toast */
export function showSuccessToast(title: string) {
  Burnt.toast({ title, preset: "done" });
}

/** Show a native error toast */
export function showErrorToast(title: string, message?: string) {
  Burnt.alert({ title, message: message ?? "", preset: "error" });
}
