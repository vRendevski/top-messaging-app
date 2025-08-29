import { type LinkProps, useRouter } from "@tanstack/react-router"

export type RouterLink = LinkProps<ReturnType<typeof useRouter>>["to"];