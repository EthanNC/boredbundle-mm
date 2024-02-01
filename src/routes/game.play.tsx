import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/play')({
  component: () => <div>Hello /game/play!</div>
})