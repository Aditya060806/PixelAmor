export interface PuzzleTile {
  id: number
  position: number
  correctPosition: number
  imageUrl: string
  backgroundPosition: string
}

export interface GameStats {
  moves: number
  time: number
  completed: boolean
} 